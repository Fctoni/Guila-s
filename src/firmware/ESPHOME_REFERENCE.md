# ESPHome - Referencia de Versoes e Breaking Changes

**Ultima atualizacao**: 2026-01-23
**Versao atual recomendada**: 2026.1.1
**Conhecimento base do Claude**: Maio 2025 (desatualizado)

> ⚠️ **IMPORTANTE**: Este documento existe porque o conhecimento do Claude Code
> tem corte em maio/2025. Sempre consulte este arquivo antes de desenvolver firmware.

**Documentos Relacionados**:
- Este arquivo: Resumo rapido e checklist de migracao
- [ESPHOME_CHANGELOG_COMPLETO.md](ESPHOME_CHANGELOG_COMPLETO.md): Changelogs detalhados de todas as releases (2025.6.0 a 2026.1.0)

---

## Sumario Executivo

### Mudancas Criticas para o Projeto Guila's

| Mudanca | Versao | Impacto | Acao |
|---------|--------|---------|------|
| ESP-IDF e padrao (nao Arduino) | 2026.1.0 | Alto | Remover `framework: arduino` ou definir explicitamente |
| API password removido | 2026.1.0 | Alto | Migrar para `encryption: key:` |
| OTA MD5 removido | 2026.1.0 | Alto | Atualizar dispositivos para SHA256 |
| PSRAM nao carrega automatico | 2025.11.0 | Medio | Adicionar bloco `psram:` explicitamente |
| Custom components removidos | 2025.2.0 | Alto | Usar `external_components` |
| Python 3.11 minimo | 2025.8.0 | Baixo | Atualizar Python no servidor |

---

## Breaking Changes por Release

### 2026.1.0 (Janeiro 2026) - ATUAL

**Framework Padrao**
```yaml
# ANTES (implicito Arduino)
esp32:
  board: esp32dev

# AGORA (ESP-IDF e padrao)
esp32:
  board: esp32dev
  framework:
    type: arduino  # Se precisar Arduino explicitamente
```

**Seguranca API** - Password REMOVIDO
```yaml
# ❌ NAO FUNCIONA MAIS
api:
  password: "minhasenha"

# ✅ CORRETO
api:
  encryption:
    key: !secret api_encryption_key
# Gerar chave: openssl rand -base64 32
```

**OTA MD5 Removido**
- Dispositivos com ESPHome < 2025.10.0 NAO conseguem atualizar para 2026.1.0+
- Atualizar primeiro para 2025.10.x, depois para 2026.1.x

**Web Server URLs**
- Nomes de entidades usados diretamente nas URLs
- Barra `/` proibida em nomes de entidades
- Limite de 120 caracteres em nomes

**Novos Recursos**
- WiFi roaming automatico (troca de AP apos conectar)
- OTA rollback automatico em ESP32 com ESP-IDF
- Suporte Zigbee em nRF52

---

### 2025.12.0 (Dezembro 2025)

**I2C em Chips com LP I2C**
- Corrigida logica de portas I2C em ESP32-C5, C6, P4
- Verificar atribuicao de portas se usar multiplos barramentos I2C

**Micronova**
- `update_interval` agora nas entidades, nao no hub
- `memory_location` restrito a 0x00-0x79

**Novos Recursos**
- Packages condicionais com Jinja2
- Suporte HUB75 LED matrix
- CC1101 transceiver 433MHz

---

### 2025.11.0 (Novembro 2025)

**PSRAM Nao Carrega Automaticamente**
```yaml
# ❌ ANTES (implicito)
# psram carregava automaticamente

# ✅ AGORA (explicito)
psram:

# ESP32-S3 requer modo
psram:
  mode: octal  # ou quad
```

**WiFi**
- Nao bloqueia mais setup de outros componentes
- `priority` aceita apenas inteiros (nao floats)
- ".local" requer mDNS habilitado

**Scripts**
- Padrao `max_runs: 5` (antes ilimitado)

**Remote Transmitter**
- Padrao modo nao-bloqueante

**Novos Recursos**
- Latencia ultra-baixa (~12us vs 0-16ms)
- Filtros sliding window economizam 22-25KB RAM
- Comando `esphome analyze-memory`

---

### 2025.10.0 (Outubro 2025)

**Arduino como Componente IDF**
- Builds Arduino agora compilam sobre ESP-IDF
- Builds Arduino mais lentos, ESP-IDF 2-3x mais rapido
- Possivel incompatibilidade com componentes externos

**Transicao OTA SHA256**
- MD5 aceito ate 2025.12.x
- MD5 rejeitado a partir de 2026.1.0

**API Password Deprecado**
- Password e encryption mutuamente exclusivos
- Migrar para encryption antes de 2026.1.0

---

### 2025.9.0 (Setembro 2025)

**Preferencias do Dispositivo**
- Inclui `device_id` no armazenamento
- Calibracoes podem resetar no primeiro boot

**LVGL Spinbox**
- `step` substituido por `selected_digit`

**Bluetooth Proxy**
- `active` agora padrao `true` (era `false`)

**Novos Recursos**
- Suporte displays MIPI RGB
- Encoder JPEG para camera
- Reducao 50% memoria GPIO no ESP32

---

### 2025.8.0 (Agosto 2025)

**Python 3.11 Obrigatorio**
- Python 3.10 nao suportado mais

**Bluetooth Proxy**
- Removido suporte parsed advertisements
- Removido suporte conexao V1

**Campos Protobuf Deprecados Removidos**

**Novos Recursos**
- Plataforma nRF52 (Nordic) via Zephyr
- Comunicacao mesh ESP-NOW
- Displays MIPI DSI para ESP32-P4

---

### 2025.7.0 (Julho 2025)

**Web Server OTA Extraido**
```yaml
# Se usava web_server para OTA, adicionar explicitamente:
ota:
  - platform: esphome
  - platform: http_request  # se necessario

web_server:
```

**ESP-IDF 4.x Removido**
- Apenas ESP-IDF 5.3.2+ suportado

**Arduino ESP32 Atualizado para 3.x**
- Possivel incompatibilidade com bibliotecas terceiras

**ArduinoJson 7.x**
- Atualizado de 6.x para 7.2.0
- Lambdas customizadas podem precisar ajustes

**Novos Recursos**
- Sub-devices no Home Assistant
- Expressoes Jinja2 em substitutions `${ }`
- Suporte LoRa (SX126x/SX127x)

---

### 2025.6.0 (Junho 2025)

**Python 3.10 Obrigatorio**
- Python 3.9 nao suportado

**ESP-IDF 5.3.2 Padrao**
- Ultima versao com suporte IDF 4.x

**Novos Recursos**
- OpenThread para ESP32-C6/H2
- Sensor CO2 CM1106
- Monitor bateria LC709203F

---

### 2025.5.0 (Maio 2025)

**HTTP Request**
- `headers` renomeado para `request_headers`

**Microphone**
- Sistema unificado de fonte de microfone
- Se usava 32-bit samples, adicionar `gain_factor: 4`

**Novos Recursos**
- Voice assistant com continuacao de conversa
- Packet transport (comunicacao device-to-device)
- Sensor de nivel sonoro

---

### 2025.4.0 (Abril 2025)

**BLE Connection Limit**
- Retrabalhado para evitar exceder limite de hardware

**Novos Recursos**
- MCP4461 digital potentiometer I2C
- LVGL canvas widget
- SPI modo octal

---

### 2025.3.0 (Marco 2025)

**MLX90393**
- Corrigido gain e resolution invertidos

**Touchscreen**
- Bugfix axis swap em gt911, cst226, ektf2232

**CST816**
- Binary sensor removido do componente

**Novos Recursos**
- Sensor LD2450 (presenca)
- Acelerometros MSA301/MSA311

---

### 2025.2.0 (Fevereiro 2025)

**Custom Components REMOVIDOS**
```yaml
# ❌ NAO FUNCIONA MAIS
custom_component:
  ...

# ✅ USAR EXTERNAL COMPONENTS
external_components:
  - source: github://usuario/repo
```

**armv7 Removido**
- Arquitetura 32-bit nao suportada

**ESP32 RMT**
- Atualizado para IDF 5+

**GPIOPin**
- `get_flags()` agora obrigatorio

---

### 2024.12.0 (Dezembro 2024)

**ESP-IDF 5.1.5**
- Major upgrade do framework
- Suporte ESP32-C6

**SGP30**
- `update_interval` padrao 60s (era diferente)

**Novos Recursos**
- Sensores mmWave MR60FDV2, MR60BHA2

---

### 2024.11.0 (Novembro 2024)

**qspi_amoled Renomeado**
- Agora `qspi_dbi`

**LVGL Light**
- `led:` substituido por `widget:`

**SPI Mode**
- `mode` renomeado para `spi_mode`

**Reactive Power**
- Unidade mudou de 'VAR' para 'var'

**Novos Recursos**
- OpenTherm para aquecimento
- Sensores TC74, MAX17043

---

## Checklist de Migracao

### De versao < 2025.2.0

- [ ] Migrar custom_component para external_components
- [ ] Verificar arquitetura (armv7 nao suportado)

### De versao < 2025.6.0

- [ ] Atualizar Python para 3.10+

### De versao < 2025.7.0

- [ ] Adicionar OTA platform explicitamente se usa web_server
- [ ] Verificar compatibilidade bibliotecas com Arduino 3.x
- [ ] Atualizar lambdas ArduinoJson se necessario

### De versao < 2025.8.0

- [ ] Atualizar Python para 3.11+

### De versao < 2025.10.0

- [ ] Iniciar migracao de API password para encryption
- [ ] Testar builds com Arduino como componente IDF

### De versao < 2025.11.0

- [ ] Adicionar bloco `psram:` explicitamente
- [ ] Verificar scripts com `max_runs` se precisar ilimitado
- [ ] Atualizar priority WiFi para inteiro

### De versao < 2026.1.0

- [ ] Remover `api: password:` - usar encryption
- [ ] Atualizar dispositivos para OTA SHA256 (via 2025.10.x)
- [ ] Verificar nomes de entidades (sem `/`, max 120 chars)
- [ ] Definir framework explicitamente se precisar Arduino

---

## Configuracao Recomendada para Projeto Guila's

```yaml
# base-config.yaml atualizado para 2026.1.x

substitutions:
  device_name: "esp-device-name"
  friendly_name: "Nome Amigavel"

esphome:
  name: ${device_name}
  friendly_name: ${friendly_name}

esp32:
  board: esp32dev
  framework:
    type: esp-idf  # Recomendado para 2026.1+

# PSRAM explicito (se aplicavel)
# psram:

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  # Roaming automatico habilitado por padrao em 2026.1+

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

logger:
  level: INFO
```

---

## Links Uteis

- [ESPHOME_CHANGELOG_COMPLETO.md](ESPHOME_CHANGELOG_COMPLETO.md) - Changelogs detalhados locais
- [Changelog Oficial](https://esphome.io/changelog/)
- [GitHub Releases](https://github.com/esphome/esphome/releases)
- [Guia de Migracao](https://esphome.io/guides/migrate.html)

---

## Historico deste Documento

| Data | Versao ESPHome | Autor |
|------|----------------|-------|
| 2026-01-23 | 2026.1.1 | Claude Code (pesquisa web) |
