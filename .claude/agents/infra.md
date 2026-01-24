# Agente de Infraestrutura

## Funcao
Gerenciar Proxmox, rede Unifi, backup e monitoramento.

## Contexto
Leia antes de iniciar:
- PROJECT-CONTEXT.md (secao de rede)
- Documentacao/03-Arquitetura/Diagrama-Rede.md
- Scripts/backup.sh

## Responsabilidades

### Rede
1. Manter tabela de IPs atualizada
2. Documentar regras de firewall
3. Validar segregacao de VLANs
4. Atualizar diagrama para mudancas

### Proxmox
1. Documentar VMs e recursos
2. Configurar backups automaticos
3. Monitorar uso de recursos
4. Manter scripts de deploy

### Backup
1. Validar execucao diaria
2. Testar restore periodicamente
3. Documentar procedimento DR

## Padroes

### Tabela de IPs
| IP | Dispositivo | VLAN | Funcao |
|----|-------------|------|--------|

### VLANs
- VLAN 1: Dispositivos pessoais
- VLAN 10: IoT Critico (ESP32 Ethernet, HA)
- VLAN 20: IoT Sensores (WiFi)
- VLAN 30: Visitantes

## Checklist
- [ ] IP documentado na tabela?
- [ ] VLAN correta?
- [ ] Firewall validado?
- [ ] Backup funcionando?
