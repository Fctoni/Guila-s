# ESPHome - Changelogs Completos (Pos-Corte de Treinamento)

**Ultima atualizacao**: 2026-01-23
**Versao atual recomendada**: 2026.1.1
**Periodo coberto**: 2025.6.0 a 2026.1.0 (8 releases)

> Este documento complementa `ESPHOME_REFERENCE.md` com changelogs completos.
> Use ESPHOME_REFERENCE.md para consulta rapida e checklist.
> Use este documento para detalhes completos e contexto.

---

## Indice Rapido

- [Resumo de Breaking Changes Criticos](#resumo-de-breaking-changes-criticos)
- [2026.1.0 - Janeiro 2026](#20261-janeiro-2026)
- [2025.12.0 - Dezembro 2025](#202512-dezembro-2025)
- [2025.11.0 - Novembro 2025](#202511-novembro-2025)
- [2025.10.0 - Outubro 2025](#202510-outubro-2025)
- [2025.9.0 - Setembro 2025](#20259-setembro-2025)
- [2025.8.0 - Agosto 2025](#20258-agosto-2025)
- [2025.7.0 - Julho 2025](#20257-julho-2025)
- [2025.6.0 - Junho 2025](#20256-junho-2025)

---

## Resumo de Breaking Changes Criticos

### Seguranca (CRITICO)

| Versao | Mudanca | Acao Requerida |
|--------|---------|----------------|
| 2026.1.0 | API password REMOVIDO | Migrar para `encryption: key:` |
| 2026.1.0 | OTA MD5 REMOVIDO | Atualizar via 2025.10.x primeiro |
| 2025.10.0 | API password deprecado | Iniciar migracao |
| 2025.10.0 | SHA256 OTA introduzido | Preparar transicao |

### Frameworks

| Versao | Mudanca | Impacto |
|--------|---------|---------|
| 2026.1.0 | ESP-IDF e padrao (nao Arduino) | Definir `framework: type: arduino` se necessario |
| 2025.10.0 | Arduino como componente IDF | Builds Arduino mais lentos |
| 2025.8.0 | Python 3.11+ obrigatorio | Atualizar Python |
| 2025.7.0 | ESP-IDF 4.x removido | Usar IDF 5.3.2+ |
| 2025.7.0 | ArduinoJson 7.x | Atualizar lambdas customizadas |
| 2025.6.0 | Python 3.10+ obrigatorio | Atualizar Python |
| 2025.6.0 | ESP-IDF 5.3.2 padrao | Ultima versao com IDF 4.x |

### PSRAM e Memoria

| Versao | Mudanca | Configuracao |
|--------|---------|--------------|
| 2025.12.0 | ESP32-C5 PSRAM quad mode ate 120MHz | Verificar configuracao |
| 2025.11.0 | PSRAM nao auto-carrega | Adicionar bloco `psram:` explicito |
| 2025.11.0 | ESP32-S3 requer mode (quad/octal) | Especificar mode |

### WiFi

| Versao | Mudanca |
|--------|---------|
| 2026.1.0 | WiFi roaming automatico habilitado |
| 2025.12.0 | wifi_info usa callbacks (nao polling) |
| 2025.11.0 | WiFi nao bloqueia setup |
| 2025.11.0 | `priority` aceita apenas inteiros |
| 2025.11.0 | `.local` requer mDNS habilitado |

### Web Server e OTA

| Versao | Mudanca |
|--------|---------|
| 2026.1.0 | URLs usam nomes de entidades diretamente |
| 2026.1.0 | `/` proibido em nomes de entidades |
| 2026.1.0 | Limite 120 chars em nomes |
| 2026.1.0 | OTA rollback automatico ESP32 ESP-IDF |
| 2025.12.0 | Brotli compression padrao |
| 2025.7.0 | OTA extraido para platform separada |

### Scripts e Automacoes

| Versao | Mudanca |
|--------|---------|
| 2025.11.0 | Scripts `max_runs: 5` por padrao |
| 2025.11.0 | Remote transmitter modo nao-bloqueante padrao |
| 2025.11.0 | Select `.state` deprecado - usar `current_option()` |

### LVGL (Displays)

| Versao | Mudanca |
|--------|---------|
| 2026.1.1 | Dropdown symbols requerem Unicode >= 0x100 |
| 2025.11.0 | Shorthand layout, container widget, stretch |
| 2025.9.0 | Spinbox: `step` substituido por `selected_digit` |
| 2025.8.0 | LVGL meter rotation fix |

### Sensores Especificos

| Versao | Componente | Mudanca |
|--------|------------|---------|
| 2025.12.0 | Micronova | `update_interval` nas entidades, nao no hub |
| 2025.10.0 | EKTF2232 | `rts_pin` renomeado para `reset_pin` |
| 2025.9.0 | Bluetooth Proxy | `active` padrao `true` |
| 2025.8.0 | Bluetooth Proxy | Removido parsed advertisements e V1 |

---

## 2026.1.0 - Janeiro 2026

**Data de Lancamento**: Janeiro 2026
**Patch Atual**: 2026.1.1 (22 Janeiro)

### Destaques

- WiFi roaming automatico apos conexao
- ESP-IDF como framework padrao
- API password e OTA MD5 removidos
- URLs do web server usam nomes de entidades
- OTA rollback automatico para ESP32

### Breaking Changes

#### Framework Padrao ESP-IDF
ESP-IDF e agora o padrao para ESP32, ESP32-C3, ESP32-S2 e ESP32-S3. Binarios ate 40% menores e compilacao 2-3x mais rapida.

```yaml
# Se precisar Arduino explicitamente:
esp32:
  board: esp32dev
  framework:
    type: arduino
```

Componentes que requerem Arduino: heatpumpir, midea, wled effects.

#### API Password Removido
Password foi deprecado desde Maio 2022. Agora DEVE usar encryption.

```yaml
# NAO FUNCIONA MAIS
api:
  password: "minhasenha"

# CORRETO
api:
  encryption:
    key: !secret api_encryption_key
# Gerar: openssl rand -base64 32
```

#### OTA MD5 Removido
SHA256 agora obrigatorio. Dispositivos com ESPHome < 2025.10.0 NAO conseguem atualizar diretamente para 2026.1.0+. Atualizar primeiro para 2025.10.x.

#### Web Server URLs
- Nomes de entidades usados diretamente nas URLs
- Barra `/` proibida em nomes
- Limite de 120 caracteres em nomes
- URLs antigas (`/sensor/object_id`) deprecadas (remocao em 2026.7.0)

#### Lambda API Changes
Metodos que retornavam ponteiros de string agora retornam `StringRef`:
- Fan: `get_preset_mode()`
- Select: `current_option()`
- Climate: `get_custom_fan_mode()`, `get_custom_preset()`
- Event: `get_last_event_type()`
- Light: metodos de nome de efeito

Substituir verificacoes de null por `.empty()` e usar `==` ao inves de `strcmp()`.

#### ESP8266
- Serial objects excluidos por padrao (usar `enable_serial: true` se necessario em lambdas)
- Codigo PWM waveform excluido quando `esp8266_pwm` nao usado

### Performance e Memoria

- **Heap Churn Reduction**: ~6KB IRAM economizados no ESP32
- **Object ID RAM Removal**: ~886 bytes economizados no ESP8266, ~497 no ESP32
- **Zero-Copy API Protocol**: ~42% mais entidades por pacote
- **ESP32 Network Latency**: Chamadas diretas de socket bypassing VFS
- **ESP-IDF 5.5.2**: Reducao de ~35KB flash em configs tipicas
- **Logging**: 100+ componentes consolidam log statements

### Novos Recursos

- WiFi roaming automatico pos-conexao (conservador, desativa se 802.11k/v configurado)
- OTA rollback para ESP32 com ESP-IDF
- HMAC-SHA256 component
- Zigbee binary sensor/sensor/switch para nRF52
- Water Heater (core, template, web server)
- IR/RF Proxy (experimental)
- Infrared entity type (experimental)
- UART Event component

### Novo Hardware

| Hardware | Descricao |
|----------|-----------|
| RD-03D mmWave Radar | Multi-target tracking com coordenadas, velocidade, distancia |
| BTHome MiThermometer | Dados Xiaomi via Bluetooth LE |
| AQI Sensor | Calcula Air Quality Index de PM data (EPA/CAQI) |

### LibreTiny (BK72xx, RTL87xx, LN882x)

- Thread-safe logging
- Cortex-M4 atomics para RTL87xx/LN882x
- Deep sleep com GPIO wake-up (BK7231n/t)
- BLE stack desabilitado em BK7231N (economiza 21KB RAM, 225KB flash)

### Melhorias em Componentes

- AC Dimmer: suporte ESP-IDF
- DSMR: suporte ESP-IDF e bug fixes
- ESP32 Camera: ~10% mais performance, 50% menos CPU idle
- Brotli compression para web assets (~9.4KB economizados no v3)
- Templatable MQTT topics via lambdas
- Hub75 rotation e brightness actions
- ESP32 CAN listen-only mode
- Thermostat boolean heat/cool mode

### Deprecacoes

- `custom_components` folder (remocao em 2026.6.0)
- Ultrasonic `timeout` option (remocao em 2026.8.0)
- URLs antigas `/sensor/object_id` (remocao em 2026.7.0)

---

## 2025.12.0 - Dezembro 2025

**Data de Lancamento**: Dezembro 2025
**Patch Atual**: 2025.12.7 (16 Janeiro)

### Destaques

- API com respostas bidirecionais
- Packages condicionais com Jinja2
- HUB75 LED matrix display
- CC1101 Sub-1GHz transceiver
- USB CDC-ACM support
- WiFi refatorado para callbacks

### Breaking Changes

#### Micronova
- `update_interval` movido do hub para entidades individuais
- `memory_location` restrito a locais de leitura (0x00-0x79)
- `memory_write_location` removido

#### I2C em ESP32-C5/C6/P4
Logica de portas I2C corrigida. Usuarios com multiplos barramentos I2C devem verificar.

#### WiFi Info
Arquitetura baseada em callbacks substitui polling. Comportamento de timing pode mudar.

#### Prometheus
Metricas de cor de luz geradas apenas para modos de cor suportados.

#### Text Sensor
`raw_state` publico removido - usar `get_raw_state()`.

### Performance e Memoria

- **~8KB IRAM**: Funcoes FreeRTOS movidas para flash
- **~1.5KB IRAM adicional**: Ring buffer em flash
- **24-40 bytes por BLE client**: char[18] ao inves de std::string para MAC
- **24-32 bytes por text sensor**: Eliminado string duplicado sem filtros
- **Zero-copy API commands**: Select e light effects processam strings diretamente
- **ESP8266 socket latency**: Eliminado ate 16ms de delay
- **Low-latency UART**: `wake_loop_on_rx` flag (~10ms reducao para Z-Wave proxies)
- **Sensor timeout filters**: Loop-based ao inves de scheduler (~70 heap ops/s eliminados)

### Novos Recursos

#### API Action Responses
Native API agora suporta respostas estruturadas. Tres modos: fire-and-forget, status-only, ou data responses opcionais/obrigatorias.

#### Conditional Packages
Packages suportam imports condicionais via Jinja2 e booleanos.

```yaml
packages:
  base: !include
    file: base.yaml
    condition: ${use_base}
```

#### HUB75 LED Matrix
Suporte nativo para paineis HUB75 em multiplos ESP32 (I2S, LCD CAM + GDMA, PARLIO). Compativel com LVGL.

#### CC1101 Transceiver
433MHz com modulacao ASK/OOK. Funciona com remote receiver/transmitter.

#### USB CDC-ACM
Porta serial virtual para ESP32-S2/S3 com multi-interface, buffers configuraveis, callbacks de line state.

### Novo Hardware

| Tipo | Componente | Descricao |
|------|------------|-----------|
| Sensor | hlw8032 | Power metering IC single-phase |
| Sensor | stts22h | High-accuracy temperature |
| Sensor | thermopro_ble | ThermoPro BLE temp/humidity |
| Sensor | hc8 | CO2 sensor |
| RTC | bm8563 | I2C RTC |
| Display | Waveshare 4.26" e-paper | SSD1677 |
| Display | Waveshare S3 LCD 3.16" | |
| Display | Guition JC4827W543 | 480x272 |
| Display | Guition JC4880P443 | 480x800 MIPI DSI |
| Display | M5Stack Core2 | |

### Plataformas

- ESP32-C5 PSRAM support (quad mode, ate 120MHz)
- Seeed XIAO ESP32-C6 board
- RP2040 remote transmitter/receiver
- nRF52 DC-DC converter settings

### LVGL Melhorias

- Texto de botao direto sem nested widgets
- Auto row/column padding com `pad_all`
- Display sync option (`update_when_display_idle`)
- Enhanced arc widget parameters

### Outras Melhorias

- Gree Climate: turbo, light, health, xfan switches
- Climate IR: humidity sensor opcional
- SPS30: idle mode
- PCA9685 PWM: phase balancer
- Prometheus: event e text metrics
- MCP3204 ADC: differential mode

---

## 2025.11.0 - Novembro 2025

**Data de Lancamento**: Novembro 2025
**Patch Atual**: 2025.11.5

### Destaques

- Ultra-low latency (600-1300x mais rapido)
- 2-31KB RAM e 10KB+ flash economizados
- WiFi reliability melhorado
- PSRAM requer configuracao explicita

### Breaking Changes

#### PSRAM Nao Carrega Automaticamente

```yaml
# ANTES: implicito
# AGORA: explicito
psram:

# ESP32-S3 requer modo
psram:
  mode: octal  # ou quad
```

#### WiFi e Network
- WiFi/Ethernet nao bloqueiam setup ate conectar
- `priority` requer inteiros (nao floats)
- `.local` requer mDNS habilitado

#### Scripts
- `max_runs` padrao agora e 5 (era ilimitado)

#### Remote Transmitter
- Padrao agora e modo nao-bloqueante

#### Fan Preset Modes
- Preserva ordem do YAML (nao mais alfabetico)

#### Select State
- `.state` deprecado - usar `current_option()`

#### Sensores Especificos
- HM3301 AQI: EPA 2024 standard
- GDK101 firmware: reportado como string
- Uponor Smatrix: enderecos 32-bit combinados
- Pipsolar: `warnung_low_pv_energy` corrigido para `warning_low_pv_energy`

### Performance

#### Ultra-Low Latency
Latencia de evento reduzida de 0-16ms (media ~8ms) para ~12 microsegundos via thread-safe loop wake mechanism. Afeta BLE, USB, MQTT, ESP-NOW, wake word.

#### Memoria
- Sliding window filters: ate 25KB RAM economizados
- Sensor filters: 90% economia em certas configs
- Action framework: menos RAM em automations

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| HDC2010 | Temperature/humidity sensor |
| MCP3221 | I2C A-D converter |
| HLK-FM22X | Face recognition module |
| BH1900NUX | Temperature sensor |
| RX8130 | RTC chip |
| TinyUSB | Foundation para ESP32-S2/S3 |
| BLE NUS Logger | nRF52 |

### WiFi Melhorias

- Selecao inteligente de AP (historico > sinal)
- Conexoes a redes ocultas 2-6s mais rapidas
- `min_auth_mode` config (WPA2 padrao em 2026.6)
- Melhor handling de mesh networks

### Plataformas

- nRF52: I2C support, BLE logging, GPIO voltage control
- ESP32: hosted BLE para chips sem Bluetooth nativo
- ESP-NOW como transport platform
- OpenThread: OTA updates e sleep

### Ferramentas

- `esphome analyze-memory`: breakdown de uso por componente

### Framework

- ESP-IDF 5.5.1 e Arduino 3.3.2
- Brownout protection para ESP-IDF
- Main loop stack size configuravel

---

## 2025.10.0 - Outubro 2025

**Data de Lancamento**: 15 Outubro 2025

### Destaques

- Z-Wave Proxy
- Arduino como componente IDF (breaking)
- SHA256 OTA (transicao de MD5)
- API password deprecado
- Dashboard com WebSocket

### Breaking Changes

#### Arduino como IDF Component
Arduino agora integrado como componente ESP-IDF ao inves de framework separado.
- 20-30KB RAM economizados
- Binarios menores
- Arduino builds mais lentos
- ESP-IDF 2-3x mais rapido

#### OTA SHA256
- SHA256 e MD5 aceitos ate 2025.12.x
- MD5 rejeitado a partir de 2026.1.0
- Hardware acceleration suportado

#### API Password Deprecado
Password sera removido em 2026.1.0. Password e encryption sao mutuamente exclusivos.

```yaml
# Migrar de:
api:
  password: "senha"

# Para:
api:
  encryption:
    key: !secret api_key
```

#### Outros Breaking Changes
- EKTF2232: `rts_pin` renomeado para `reset_pin`
- MMC5603: fator de calculo corrigido
- Logger: compilacao condicional de tags
- Lock: representacao interna bitmask
- ConnectRequest/Response renomeados para AuthenticationRequest/Response

### Performance

- Lock component: 388 bytes flash + 23 bytes RAM por lock
- ESP32 BLE Server: 1KB flash via HashMap replacement
- Event Emitter: 2.6KB flash
- Logger: 35-72% mais rapido
- Non-blocking OTA auth

### Novos Recursos

#### Z-Wave Proxy
Conectividade Z-Wave via rede para Home Assistant ZWA-2.
- Z-Wave remoto via WiFi/Ethernet
- Serial-to-network bridging
- 50-60ms latencia tipica

#### Dashboard WebSocket
Substitui HTTP polling.
- Status instantaneo
- Logs mais rapidos
- Sem delays de update

#### Captive Portal para ESP-IDF
ESP-IDF agora tem deteccao automatica de captive portal.

#### Improv BLE Melhorias
- 26x lookup mais rapido
- 1KB flash economizado
- Nome do device visivel para passive BLE scanners

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| Z-Wave Proxy | Network bridging |
| WTS01 | UART temperature sensor |
| LM75B | I2C temperature sensor |
| ePaper SPI Display | Interface unificada |
| SHA256 | Cryptographic support |

### Outras Melhorias

- Multiplas instancias CAN em ESP32
- LAN8670 PHY Ethernet
- MAC addresses configuraveis
- QMC5883L DRDY pin
- Remote receiver demodulation (ESP32)
- Modbus courtesy responses
- HA action response receiving
- `!literal` YAML tag
- Dynamic component auto-loading

---

## 2025.9.0 - Setembro 2025

**Data de Lancamento**: 17 Setembro 2025
**Patch Atual**: 2025.9.3 (1 Outubro)

### Destaques

- MIPI RGB display driver
- Camera JPEG encoder
- Enhanced nRF52 com DFU
- Jonathan Swoboda juntou-se a Open Home Foundation full-time

### Breaking Changes

#### Core Preference Storage
Preference storage agora inclui `device_id` para evitar conflitos. Dispositivos podem perder preferencias armazenadas no primeiro upgrade. Dados de calibracao podem precisar reconfiguracao.

#### LVGL Spinbox
`step` substituido por `selected_digit`.

```yaml
# ANTES
lvgl:
  widgets:
    - spinbox:
        step: 10

# AGORA
lvgl:
  widgets:
    - spinbox:
        selected_digit: 1  # indice do digito
```

#### Bluetooth Proxy
`active` agora padrao `true` (era `false`). Definir `active: false` explicitamente para comportamento anterior.

#### String Functions
`state_class_to_string()` retorna `const char*` ao inves de `std::string`.

#### Inkplate
Componente renomeado com grayscale melhorado.

### Performance

- Strings de componentes movidos para flash (ESP8266)
- Uso de memoria GPIO reduzido 50% via bit-packing
- Memory pools de scheduler reduzem fragmentacao
- GPIO expander caching de I2C
- Otimizacoes de logging via compile-time strings

### Novos Recursos

#### MIPI RGB Display
Driver unificado para displays MIPI RGB.
- Hardware acceleration
- High refresh rates
- Reduced CPU overhead
- Professional-grade UI

#### Camera JPEG Encoder
Compressao eficiente de imagens.
- Reducao de bandwidth WiFi
- Menor storage
- Streaming melhorado
- Qualidade configuravel

#### ESPHome Builder
- Upload de YAML existente
- Configs em branco para custom setups

#### nRF52 DFU
Device Firmware Update over-the-air para Nordic.

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| Camera Encoder | JPEG compression |
| MIPI RGB Display | Driver unificado |

### Outras Melhorias

- Light effects queryable por indice
- SNTP callbacks triggerando time sync
- Display page actions com auto-generated display IDs
- Timezone offset corrections
- DNS resolution para OTA
- MAC address formatting otimizado

---

## 2025.8.0 - Agosto 2025

**Data de Lancamento**: 20 Agosto 2025
**Patch Atual**: 2025.8.4 (10 Setembro)

### Destaques

- nRF52 platform via Zephyr RTOS
- ESP-NOW mesh communication
- MIPI DSI para ESP32-P4
- Python 3.11+ obrigatorio

### Breaking Changes

#### Python 3.11+ Obrigatorio
Python 3.10 nao mais suportado.

| Ambiente | Acao |
|----------|------|
| HA Add-on | Nenhuma (usa Python 3.12) |
| Docker | Nenhuma (usa Python 3.12) |
| pip install | Atualizar Python para 3.11+ |

#### Bluetooth Proxy
- Removed parsed advertisement support
- Removed V1 connection support
- Compilacao condicional para BLE advertising e service classes

#### API
- Deprecated protobuf fields removidos
- Compilacao condicional para HA state/service subscriptions

#### Filtros de Componentes
LD2410 e LD2450 usam native filters ao inves de throttle filter.

#### ESP32 Touch Sensor
Workaround para regressao ESP-IDF v5.4.

### Performance

- 10x string encoding mais rapido com memcpy otimizado
- Scheduler com menos millis() calls
- BLE scanning com batched processing
- Zero-copy protobuf fields
- Compilacao condicional remove features nao usados

### Novos Recursos

#### nRF52 Platform
Plataforma completa para Nordic nRF52 via Zephyr.
- ADC com resolucao configuravel
- GPIO com interrupts
- Zephyr debug component

#### ESP-NOW Communication
Device-to-device sem WiFi.
- Mesh sensor networks
- Remote control systems
- Battery-efficient
- Backup communication

#### MIPI DSI Display
High-performance para ESP32-P4.
- Hardware-accelerated rendering
- CPU overhead reduzido vs SPI
- Professional-grade quality

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| nRF52 Platform | Nordic via Zephyr |
| LD2412 | Presence detection |
| Runtime Stats | Performance debugging |
| MIPI DSI | ESP32-P4 displays |
| ESP-NOW | Mesh communication |

### Outras Melhorias

- Output: `set_min_power` e `set_max_power` actions
- Switch: `switch.control` action, `control()` method, `on_state` trigger
- Sensor: timeout filter com last value, default filters, `throttle_with_priority`
- Multiple `--device` arguments para fallback
- Execute from PSRAM em ESP32
- IDF log level configuravel
- CO5300 display
- Color support para lv_color_t
- `device_id` pode ser blank
- Device class "absolute_humidity"

### Dependencias

- aioesphomeapi: 34.2.1 -> 39.0.0
- esptool: 4.9.0 -> 5.0.2
- ruff: 0.12.2 -> 0.12.8

---

## 2025.7.0 - Julho 2025

**Data de Lancamento**: 16 Julho 2025
**Patch Atual**: 2025.7.5

### Destaques

- Web server OTA extraido para platform
- ESP-IDF 4.x removido
- Arduino atualizado para 3.x
- ArduinoJson 7.x
- Sub-devices para Home Assistant
- Jinja2 em substitutions

### Breaking Changes

#### Web Server OTA Platform

```yaml
# Se usava web_server para OTA:
web_server:
  port: 80

ota:
  - platform: esphome
  - platform: web_server  # Adicionar explicitamente
```

#### ESP-IDF 4.x Removido
ESP-IDF 5.3.2+ agora obrigatorio. Usuarios com versao explicita devem atualizar.

#### Arduino 3.1.3
Major version jump pode afetar uso de memoria e bibliotecas third-party.

#### ArduinoJson 7.2.0
Custom components usando ArduinoJson diretamente requerem migracao.

#### Memoria
- Component memory reduzido 40 bytes por componente
- Sensor entity memory footprint menor
- Color constant storage otimizado
- Logger callback API modificado (inclui message length)

#### Outros
- Binary sensor invalidate state action adicionado
- Entity name uniqueness enforcement por device
- GPIO pin number handling atualizado
- SMT100: `dielectric_constant` renomeado para `permittivity`
- MQTT nao espera conexao a menos que configurado

### Novos Recursos

#### Sub-Devices
Entidades podem se organizar em sub-devices logicos no Home Assistant.

```yaml
sub_device:
  name: "Kitchen Sensors"

sensor:
  - platform: dht
    sub_device: kitchen_sensors
```

#### Jinja2 em Substitutions

```yaml
substitutions:
  base_temp: "20"
  high_temp: "${ ${base_temp} + 5 }"  # = 25
```

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| SX126x | LoRa long-range |
| SX127x | LoRa long-range |
| OPT3001 | Ambient light sensor |
| LPS22 | Barometric pressure |
| GL-R01 | Time-of-flight distance |
| Xiaomi XMWSDJ04MMC | BLE temp/humidity |
| ESP32 Hosted WiFi | ESP32 como WiFi adapter |
| PI4IOE5V6408 | I2C GPIO expander |
| DS2484 | 1-Wire bus master |
| LN882X | LibreTiny SoC family |

### Performance

- Component memory ate 40% menor
- API e networking otimizados
- Loop processing mais rapido com loop() opcional
- Batching de API communication
- Bluetooth proxy melhorado
- Interrupt handling otimizado
- Full C++20 support

---

## 2025.6.0 - Junho 2025

**Data de Lancamento**: 18 Junho 2025
**Patch Atual**: 2025.6.3

### Destaques

- ESP-IDF 5.3.2 (ultima com suporte IDF 4.x)
- OpenThread para ESP32-C6/H2
- Python 3.10+ obrigatorio
- Performance otimizacoes significativas

### Breaking Changes

#### Python 3.10+ Obrigatorio
Python 3.9 end-of-life em Outubro 2025.

| Ambiente | Acao |
|----------|------|
| HA Add-on | Nenhuma |
| Docker | Nenhuma |
| pip install | Atualizar Python |

#### ESP-IDF 5.3.2
Ultima versao com suporte IDF 4.x. 2025.7.0 requer IDF 5.x.

Novos chips suportados:
- ESP32-C6: RISC-V com Wi-Fi 6, Thread/Zigbee
- ESP32-H2: RISC-V com BLE, Thread/Zigbee
- ESP32-P4: Dual-core RISC-V high-performance

> Novos variants ainda sendo refinados. Alguns componentes podem nao ser compativeis.

#### Outros Breaking Changes
- LWIP optimization options para reducao de flash
- API deferred queue substituido por message batching
- Component/Application state: uint32_t para uint8_t
- Entity memory via bit-packing
- Application area field: std::string para const char*

### Novos Recursos

#### OpenThread
ESP32-C6 e H2 podem juntar-se a redes Thread.

Requisitos:
- Thread habilitado no Home Assistant
- OpenThread border router

Limitacoes:
- Sem modo "Sleepy End Device"
- Nao adequado para dados de alta frequencia

### Novo Hardware

| Componente | Descricao |
|------------|-----------|
| CM1106 | CUBIC NDIR CO2 sensor |
| USB UART | USB Host mode UART |
| ES8388 | Audio DAC |
| LC709203F | Battery monitor |
| ESP32-P4 LDO | Voltage regulator |
| OpenThread | Thread network protocol |

### Performance

- Native API communication melhorada
- RAM usage reduzido
- Firmware size menor

### Outras Melhorias

- BME68x BSEC2 independente de Arduino
- Melhor compatibilidade ESP-IDF

### Dependencias

- cryptography 45.0.1
- aioesphomeapi: 30.2.0 -> 32.2.3
- ruff, setuptools, ruamel-yaml atualizados

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-23 | Criacao inicial com 8 releases | Claude Code |
