# Scripts - Monitoring

## 📝 GUIA PARA IA FUTURA

Este diretório contém scripts e configurações de monitoramento remoto.

### Arquivos a Criar:

#### `tailscale-setup.sh`
Script para configurar Tailscale VPN:
- Instalar Tailscale no Proxmox/HA
- Configurar acesso remoto seguro
- Adicionar dispositivos à rede

#### `uptime-kuma-config.yaml`
Configuração do Uptime Kuma:
- Monitors a adicionar:
  - Home Assistant (http://192.168.10.10:8123)
  - UDM-Pro SE (ping 192.168.10.1)
  - Câmeras Unifi (via Protect API)
  - ESP32s principais (ping de cada um)
- Notificações (Telegram)
- Intervalos de verificação

#### `telegram-bot-setup.md`
Guia para criar e configurar Telegram Bot:
- Criar bot no BotFather
- Obter token
- Configurar no Home Assistant
- Tipos de notificações:
  - 🔴 Dispositivo offline >10min
  - 🟡 Temperatura anormal
  - 🔴 Backup falhou
  - 🟢 Relatório diário (tudo online)

#### `monitoring-automations.yaml`
Automações específicas de monitoramento:
- ESP32 offline → Alerta
- Temperatura fora do range → Alerta
- Bateria sensor <20% → Alerta
- Backup falhou → Alerta

---

**Status**: 🔴 Criar durante Fase 3 (Monitoramento remoto)

