# Configurações Comuns - Firmware ESP32

## 📝 GUIA PARA IA FUTURA

Este diretório contém configurações compartilhadas entre todos ESP32s.

### Arquivo: `base-config.yaml`
Configurações comuns que todos ESP32s herdam:
- WiFi/Ethernet base
- API Home Assistant
- OTA (atualização remota)
- Logger
- Time (sincronização horário)

### Arquivo: `secrets.yaml.example`
Template de secrets (copiar para `secrets.yaml` e preencher):
- SSID WiFi
- Senha WiFi
- Senha API HA
- Senha OTA

### Nomenclatura:
Todos ESP32s seguem padrão:
- `esp-painel-[andar]-[area]`
- `painel-touch-[ambiente]`
- `esp-sensor-[tipo]-[ambiente]`

---

**Status**: 🔴 Criar durante Fase 3 (Desenvolvimento)

