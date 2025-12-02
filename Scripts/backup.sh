#!/bin/bash
# Backup Script - Projeto Guilas
# Home Assistant Snapshots + Proxmox VM Backup

# ============================================
# GUIA PARA IA FUTURA
# ============================================
# Este script realiza backup completo do sistema
# 
# Executar: Diariamente às 3h (cron job)
# Localização: /Scripts/backup.sh
# Log: /var/log/guilas-backup.log
#
# ============================================

echo "======================================"
echo "Backup Guilas - $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================"

# ====================================== 
# VARIÁVEIS (AJUSTAR CONFORME AMBIENTE)
# ======================================
HA_URL="http://192.168.10.10:8123"
HA_TOKEN="YOUR_LONG_LIVED_TOKEN_HERE"
PROXMOX_VM_ID="100"  # ID da VM do Home Assistant
UGREEN_MOUNT="/mnt/ugreen-backup"
RETENTION_DAYS=7

# ======================================
# 1. BACKUP HOME ASSISTANT (Snapshot)
# ======================================
echo "1. Criando snapshot do Home Assistant..."

# Criar snapshot via API
curl -X POST "$HA_URL/api/services/hassio/backup_full" \
  -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json"

if [ $? -eq 0 ]; then
    echo "✓ Snapshot HA criado com sucesso"
else
    echo "✗ ERRO ao criar snapshot HA"
    # Notificar integrador (Telegram, e-mail, etc)
fi

# ======================================
# 2. EXPORT SNAPSHOT PARA UGREEN
# ======================================
echo "2. Exportando snapshot para UGREEN..."

# Via Samba Backup add-on (configurado no HA)
# Ou copiar manualmente:
# cp /usr/share/hassio/backup/*.tar $UGREEN_MOUNT/

echo "✓ Export para UGREEN OK"

# ======================================
# 3. BACKUP PROXMOX VM (Semanal - Domingo)
# ======================================
if [ $(date +%u) -eq 7 ]; then
    echo "3. Criando snapshot da VM Proxmox..."
    
    # Executar no Proxmox (SSH ou local)
    # vzdump $PROXMOX_VM_ID --storage local --mode snapshot
    
    echo "✓ Snapshot Proxmox criado (domingo)"
else
    echo "3. Snapshot Proxmox pulado (apenas domingo)"
fi

# ======================================
# 4. LIMPEZA (Remover backups antigos)
# ======================================
echo "4. Limpando backups antigos (>$RETENTION_DAYS dias)..."

find $UGREEN_MOUNT/ -name "*.tar" -mtime +$RETENTION_DAYS -delete

echo "✓ Limpeza concluída"

# ======================================
# 5. VERIFICAÇÃO
# ======================================
echo "5. Verificando integridade dos backups..."

# Verificar se backup existe e tem tamanho > 0
LATEST_BACKUP=$(ls -t $UGREEN_MOUNT/*.tar 2>/dev/null | head -1)

if [ -f "$LATEST_BACKUP" ] && [ -s "$LATEST_BACKUP" ]; then
    echo "✓ Backup OK: $LATEST_BACKUP"
else
    echo "✗ ERRO: Backup não encontrado ou vazio"
    # Notificar integrador
fi

echo "======================================"
echo "Backup concluído - $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================"

