# Changelog - Projeto Guila's

Todas as mudancas relevantes do projeto serao documentadas neste arquivo.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased]

### Adicionado
- 2026-01-27: Changelog ESPHome para Core e Frameworks em `docs/referencias/esphome/changelog/core-frameworks.md`
  - Core ESPHome (esphome:, substitutions, packages)
  - Frameworks (ESP-IDF vs Arduino)
  - Compilacao e build system
  - Logging e debug
  - External components
  - Lambda e C++ customization
  - YAML features (extends, packages, !include)
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: ESP-IDF padrao, IDF 4.x removido, StringRef em lambdas, ArduinoJson 7.x
  - Guia completo de migracao Arduino para ESP-IDF
  - Secao de troubleshooting com solucoes para erros comuns
- 2026-01-27: Changelog ESPHome para Memoria e GPIO em `docs/referencias/esphome/changelog/memoria-gpio.md`
  - Gerenciamento de memoria (PSRAM, heap, flash)
  - GPIO (pins, interrupts, pulse counter)
  - Interfaces: ADC/DAC, I2C, SPI, UART, PWM/LEDC
  - Time/RTC, Deep sleep, Watchdog
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes criticos: PSRAM explicito, priority inteiros, SPI mode renomeado
  - Exemplos de configuracao e troubleshooting completo
- 2026-01-27: Changelog ESPHome para Plataformas e Hardware em `docs/referencias/esphome/changelog/plataformas-hardware.md`
  - ESP32 (todas variantes: ESP32, C3, C5, C6, S2, S3, H2, P4)
  - ESP8266, RP2040 (Raspberry Pi Pico), nRF52 (Nordic)
  - LibreTiny (BK72xx, RTL87xx, LN882x), boards
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: ESP-IDF padrao, IDF 4.x removido, PSRAM explicito, armv7 removido
  - Novos: nRF52 via Zephyr, ESP-NOW mesh, OpenThread, LibreTiny deep sleep
- 2026-01-27: Changelog ESPHome para Wireless, IR e RF em `docs/referencias/esphome/changelog/wireless-ir-rf.md`
  - Remote Receiver/Transmitter, IR remotes, RF 433MHz, LoRa (SX126x/SX127x), CC1101, Z-Wave Proxy
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: Remote transmitter non-blocking (2025.11.0)
  - Novos recursos: LoRa (2025.7.0), Z-Wave Proxy (2025.10.0), CC1101 (2025.12.0), IR/RF Proxy (2026.1.0)
- 2026-01-27: Changelog ESPHome para Bluetooth e BLE em `docs/referencias/esphome/changelog/bluetooth-ble.md`
  - Bluetooth Low Energy (BLE), Bluetooth Proxy, BLE Beacons e Trackers
  - ESP32 BLE Client/Server, Improv BLE, BTHome devices
  - ESP32 Hosted BLE para chips sem Bluetooth nativo
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes criticos: Bluetooth Proxy active padrao true, V1 removido, BLE connection limits compartilhados
- 2026-01-27: Changelog ESPHome para Climate e HVAC em `docs/referencias/esphome/changelog/climate-hvac.md`
  - Climate, Thermostat, IR remotes para HVAC, Water Heater, OpenTherm
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: Lambda API StringRef, HeatPumpIR/Midea requerem Arduino
  - Novos recursos: Water Heater, Gree switches (turbo, light, health, xfan), Climate IR humidity sensor
- 2026-01-27: Changelog ESPHome para Audio e Voice em `docs/referencias/esphome/changelog/audio-voice.md`
  - Media Player, Microphone, Speaker, Voice Assistant
  - I2S Audio, Audio DAC (ES8311, ES8388), Audio ADC (ES7210, ES7243E)
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: Microphone sistema unificado, gain_factor 32-bit, PSRAM explicito
  - Novos recursos: TinyUSB foundation, USB CDC-ACM, ES8388, continuacao de conversa
- 2026-01-27: Changelog ESPHome para Lights e LEDs em `docs/referencias/esphome/changelog/lights-leds.md`
  - Iluminacao: binary light, monochromatic, RGB, RGBW, RGBWW
  - LED strips: WS2812, WS2811, SK6812, APA102, NeoPixel
  - Dimmers: Shelly Dimmer, AC Dimmer, Tuya
  - Bibliotecas: FastLED, NeoPixelBus, ESP32 RMT
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: Light effect name methods retornam StringRef, FastLED/NeoPixelBus incompativeis com ESP-IDF
- 2026-01-27: Changelog ESPHome para Displays e LVGL em `docs/referencias/esphome/changelog/displays-lvgl.md`
  - Displays OLED, LCD, ePaper, MIPI (DSI, RGB, SPI), HUB75 LED matrix
  - LVGL framework, touchscreens, fontes, imagens
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: qspi_amoled para qspi_dbi, LVGL spinbox step, touchscreen axis swap
- 2026-01-27: Changelog ESPHome para WiFi e Network em `docs/referencias/esphome/changelog/wifi-network.md`
  - WiFi, Ethernet, mDNS, ESP-NOW, OpenThread, Zigbee
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes criticos: WiFi nao bloqueia setup, priority requer inteiros, .local requer mDNS
  - Novos recursos: Roaming automatico, selecao inteligente de AP, ESP-NOW mesh, OpenThread
- 2026-01-27: Changelog ESPHome para API, Seguranca e OTA em `docs/referencias/esphome/changelog/api-seguranca-ota.md`
  - Native API, MQTT, OTA, Encryption, Web Server, Dashboard
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes criticos: API password removido, OTA MD5 removido, Web server URLs
  - Migracao completa para encryption e SHA256
- 2026-01-27: Changelog ESPHome para atuadores em `docs/referencias/esphome/changelog/atuadores.md`
  - Outputs, Switches, Covers, Valves, Fans, Locks, Water Heater, Servos, Steppers
  - Periodo: 2024.11.0 a 2026.1.x
  - Breaking changes: Scripts max_runs, Remote transmitter non-blocking, Fan preset order
- 2026-01-24: Firmware ESP32 para cortinas motorizadas do terreo
  - Arquivo: `src/firmware/cortinas/terreo/esp-cortinas-terreo.yaml`
  - Controle de 4 cortinas via XL9535 (8 reles)
  - Cortinas: Estar, Jantar, Office, Reserva
  - Documentacao de pinos em `mapeamento-pinos.md`
  - Usa base-config.yaml via packages
- 2026-01-24: Arquivo secrets.yaml.example criado em src/firmware/
- 2026-01-24: Proxmox configurado com pve-post-install
  - Repositorios enterprise desabilitados
  - Repositorios no-subscription habilitados
  - Popup de subscription removido
- 2026-01-24: Tailscale instalado e configurado no Proxmox
  - Conta: felipetonietto@gmail.com
  - IP Tailscale: 100.68.65.65
  - Subnet routing habilitado: 192.168.1.0/24
  - IP forwarding ativado
- 2026-01-23: Estrutura de agentes IA em `.claude/agents/`
  - docs.md - Agente de documentacao
  - esphome.md - Agente de firmware ESPHome
  - homeassistant.md - Agente de Home Assistant
  - infra.md - Agente de infraestrutura
  - review.md - Agente de revisao
- 2026-01-23: CLAUDE.md com instrucoes gerais para Claude Code
- 2026-01-23: CHANGELOG.md para registro de mudancas
- 2026-01-23: src/firmware/ESPHOME_REFERENCE.md - Referencia completa de breaking changes
  - Cobre 14 releases (2024.11.0 ate 2026.1.1)
  - Checklist de migracao
  - Configuracao recomendada para 2026.1.x

### Alterado
- (nenhum)

### Removido
- 2026-01-23: Arquivos temporarios da raiz (nul, temp_cortinas.md)

### Corrigido
- (nenhum)

---

## Legenda

- **Adicionado** para novos recursos
- **Alterado** para mudancas em recursos existentes
- **Removido** para recursos removidos
- **Corrigido** para correcoes de bugs
- **Seguranca** para vulnerabilidades corrigidas
