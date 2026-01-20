# Manual Técnico - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter documentação técnica completa para manutenção.

### Público-alvo:
- Integrador (você)
- Equipe de manutenção futura
- IA futura fazendo troubleshooting

### Estrutura Sugerida:

## 1. ARQUITETURA GERAL
- Diagrama de rede
- Topologia de dispositivos
- Fluxo de dados

## 2. SERVIDOR E INFRAESTRUTURA
- Proxmox: Acesso, configuração, VMs
- Home Assistant: Acesso, configurações, add-ons
- Backup: Localização, restauração, frequência
- No-break: Autonomia, alertas, shutdown

## 3. REDE
- UDM-Pro SE: Acesso, VLANs, firewall
- APs Unifi U7: Localização, SSIDs, roaming
- DNS local: Registros, nomenclatura
- IPs estáticos: Lista completa

## 4. ESP32s - PAINÉIS DE COMANDO
- Localização física (qual quadro)
- Acesso via ESPHome (OTA)
- Módulos I2C conectados
- Mapa de I/O (pino X = luz Y)
- Firmware: Repositório Git

## 5. ESP32s - PAINÉIS TOUCH
- Localização física
- Firmware LVGL
- Troubleshooting (reiniciar, re-flash)

## 6. ESP32s - SENSORES
- mmWave: Calibração, zonas de detecção
- Temperatura: Offset, calibração

## 7. SENSORES SHELLY
- Lista completa (local + função)
- Trocar bateria (procedimento)
- Re-emparelhar com HA

## 8. CÂMERAS UNIFI
- **Modelo**: Unifi G5 Turret Ultra (UVC-G5-Turret-Ultra)
- **Quantidade instalada**: 7 câmeras
- **Esperas**: 8 pontos de infraestrutura para expansão futura
- **Sistema**: Unifi Protect (UDM-Pro SE)
- Acesso Unifi Protect
- Configuração gravação
- Troubleshooting
- **Posições**: Verificar com arquiteto

## 9. INTEGRAÇÕES
- LG ThinQ (ACs)
- WebOS (TV)
- Yale (fechadura)
- Receiver Anthem

## 10. PROCEDIMENTOS DE MANUTENÇÃO
- Backup manual
- Atualização HA
- Atualização firmware ESP32s
- Teste de sensores
- Verificação de baterias

## 11. TROUBLESHOOTING AVANÇADO
- HA não inicia
- ESP32 não conecta
- Módulo I2C não responde
- Logs importantes (onde encontrar)

## 12. CONTATOS E SENHAS
- Acesso remoto (Tailscale)
- Credenciais (arquivo separado, criptografado)
- Fornecedores (contatos)

---

**Status**: 🔴 Criar durante implementação (Fase 3-4)

