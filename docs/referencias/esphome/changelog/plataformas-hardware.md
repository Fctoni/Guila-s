# Plataformas e Hardware - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

> Documento organizado por plataforma/componente para consulta rapida.

---

## Indice de Plataformas

| Plataforma | Status | Secao |
|------------|--------|-------|
| [ESP-IDF (Framework)](#esp-idf-framework) | Padrao em 2026.1 | Framework base |
| [Arduino (Framework)](#arduino-framework) | Componente IDF | Framework alternativo |
| [ESP32 Classico](#esp32-classico) | Estavel | Chip principal |
| [ESP32-S2/S3](#esp32-s2s3) | Estavel | PSRAM, AI |
| [ESP32-C3](#esp32-c3) | Estavel | RISC-V entry-level |
| [ESP32-C5/C6](#esp32-c5c6) | Estavel | Wi-Fi 6, Thread |
| [ESP32-H2](#esp32-h2) | Estavel | Thread-only |
| [ESP32-P4](#esp32-p4) | Novo (2025.6) | High-performance |
| [ESP8266](#esp8266) | Estavel | Legacy |
| [RP2040](#rp2040) | Estavel | Raspberry Pi Pico |
| [nRF52 (Zephyr)](#nrf52-zephyr) | Estavel (2025.8+) | Nordic BLE |
| [LibreTiny](#libretiny) | Estavel | BK7231, RTL87xx, LN882X |

---

## ESP-IDF (Framework)

### Resumo
ESP-IDF e o framework oficial da Espressif. A partir de 2026.1.0, e o **padrao** para ESP32, ESP32-C3, ESP32-S2 e ESP32-S3.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2026.1.0** | ESP-IDF e padrao (nao Arduino) | **CRITICO** | Definir `framework: type: arduino` se necessario |
| **2026.1.0** | ESP-IDF 5.5.2 | Medio | Verificar compatibilidade |
| 2025.11.0 | ESP-IDF 5.5.1 | Baixo | Nenhuma |
| **2025.7.0** | ESP-IDF 4.x REMOVIDO | **CRITICO** | Usar apenas IDF 5.3.2+ |
| 2025.6.0 | ESP-IDF 5.3.2 | Alto | Ultima versao com IDF 4.x |
| 2024.12.0 | ESP-IDF 5.1.5 | Medio | Verificar compatibilidade |

### Linha do Tempo

```
ESP-IDF:
  5.1.5 ────> 5.3.2 ──────> 4.x removido ────────> 5.5.1 ──> 5.5.2 (padrao)
  (2024.12)   (2025.6)      (2025.7)               (2025.11)  (2026.1)
```

### Exemplo de Configuracao

```yaml
# ESP-IDF padrao (2026.1+)
esp32:
  board: esp32dev
  # framework nao especificado = ESP-IDF automaticamente

# ESP-IDF explicito com versao
esp32:
  board: esp32dev
  framework:
    type: esp-idf
    version: 5.5.2
```

### Beneficios do ESP-IDF

- Binarios ate **40% menores**
- Compilacao **2-3x mais rapida**
- Melhor suporte a novos recursos
- OTA rollback automatico (2026.1+)
- Reducao de ~35KB flash em configs tipicas

### Migracao: Arduino para ESP-IDF

**Passo 1**: Verificar componentes incompativeis

Componentes que **REQUEREM** Arduino:
- `heatpumpir`
- `midea`
- `wled` (efeitos)

**Passo 2**: Atualizar configuracao

```yaml
# ANTES (Arduino implicito em versoes antigas)
esp32:
  board: esp32dev

# DEPOIS (ESP-IDF implicito em 2026.1+)
esp32:
  board: esp32dev
  # Ja usa ESP-IDF por padrao
```

**Passo 3**: Se precisar Arduino

```yaml
esp32:
  board: esp32dev
  framework:
    type: arduino
```

---

## Arduino (Framework)

### Resumo
Arduino agora funciona como **componente IDF** em vez de framework standalone. Use apenas quando necessario para compatibilidade.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2026.1.0** | Arduino nao e mais padrao | **CRITICO** | Especificar explicitamente se necessario |
| 2026.1.0 | Arduino como componente IDF | Baixo | Nenhuma |

### Quando Usar Arduino

Use Arduino apenas se seu projeto depende de:
- Componentes `heatpumpir`, `midea`, `wled`
- Bibliotecas Arduino de terceiros
- Codigo legado incompativel com ESP-IDF

### Exemplo de Configuracao

```yaml
# Forcar uso de Arduino
esp32:
  board: esp32dev
  framework:
    type: arduino
    version: 2.0.9  # ou mais recente
```

---

## ESP32 Classico

### Resumo
O ESP32 original (Xtensa dual-core) e a plataforma mais madura e compativel.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2026.1.0** | ESP-IDF e padrao | **CRITICO** | Definir Arduino se necessario |
| 2026.1.0 | OTA rollback automatico | Novo recurso | Nenhuma |
| 2025.8.0 | ESP-NOW mesh | Novo recurso | Usar para device-to-device |
| 2025.7.0 | ESP32 Hosted WiFi | Novo recurso | ESP32 como adaptador WiFi |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | Xtensa dual-core |
| WiFi | Sim (802.11 b/g/n) |
| BLE | Sim (4.2) |
| Thread | Nao |
| PSRAM | Quad, 80MHz |
| Status | Maduro, estavel |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-esp32

esp32:
  board: esp32dev
  framework:
    type: esp-idf  # Padrao em 2026.1+

# Com PSRAM (opcional)
psram:
  mode: quad
  speed: 80MHz
```

### Migracao

Nenhuma migracao especifica necessaria alem de considerar ESP-IDF como padrao.

---

## ESP32-S2/S3

### Resumo
Variantes com suporte aprimorado a PSRAM. S3 inclui AI acceleration e PSRAM octal.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Chip |
|--------|---------|---------|------|
| **2026.1.0** | ESP-IDF e padrao | **CRITICO** | S2, S3 |
| 2026.1.0 | OTA rollback automatico | Novo recurso | S2, S3 |

### Especificacoes

| Caracteristica | ESP32-S2 | ESP32-S3 |
|----------------|----------|----------|
| Arquitetura | Xtensa single-core | Xtensa dual-core |
| WiFi | Sim | Sim |
| BLE | **Nao** | Sim (5.0) |
| PSRAM Mode | Quad | Quad/Octal |
| PSRAM Speed | 80MHz | 120MHz |
| AI Acceleration | Nao | Sim |

### Exemplo de Configuracao

```yaml
# ESP32-S3 com PSRAM Octal
esphome:
  name: my-esp32s3

esp32:
  board: esp32-s3-devkitc-1
  framework:
    type: esp-idf

psram:
  mode: octal
  speed: 80MHz  # ou 120MHz
```

### Casos de Uso

- **ESP32-S2**: Projetos que nao precisam de BLE
- **ESP32-S3**: Displays, cameras, AI/ML on-device

---

## ESP32-C3

### Resumo
Primeira variante RISC-V single-core. Entry-level com WiFi e BLE.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2026.1.0** | ESP-IDF e padrao | **CRITICO** | Definir Arduino se necessario |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | RISC-V single-core |
| WiFi | Sim (802.11 b/g/n) |
| BLE | Sim (5.0) |
| Thread | Nao |
| PSRAM | Nao |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-esp32c3

esp32:
  board: esp32-c3-devkitm-1
  framework:
    type: esp-idf
```

---

## ESP32-C5/C6

### Resumo
Variantes com Wi-Fi 6 (802.11ax). C6 suporta Thread/Zigbee.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Chip |
|--------|---------|---------|------|
| **2025.12.0** | ESP32-C5 PSRAM quad ate 120MHz | Novo recurso | C5 |
| **2025.12.0** | Seeed XIAO ESP32-C6 board | Novo hardware | C6 |
| **2025.12.0** | I2C logica de portas corrigida | Medio | C5, C6 |
| 2025.6.0 | OpenThread para C6 | Novo recurso | C6 |
| 2024.12.0 | Suporte inicial C6 | Novo | C6 |

### Especificacoes

| Caracteristica | ESP32-C5 | ESP32-C6 |
|----------------|----------|----------|
| Arquitetura | RISC-V single-core | RISC-V single-core |
| WiFi | Sim (Wi-Fi 6) | Sim (Wi-Fi 6) |
| BLE | Sim (5.0) | Sim (5.0) |
| Thread/Zigbee | Nao | **Sim** |
| PSRAM | Quad, 120MHz | Nao |

### Exemplo de Configuracao

```yaml
# ESP32-C5 com PSRAM
esphome:
  name: my-esp32c5

esp32:
  board: esp32-c5-devkitc-1
  framework:
    type: esp-idf

psram:
  mode: quad
  speed: 120MHz
```

```yaml
# ESP32-C6 com Thread
esphome:
  name: my-thread-device

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

openthread:
  # Requisitos:
  # - Thread habilitado no Home Assistant
  # - OpenThread border router configurado
```

### Migracao: I2C em C5/C6

A partir de 2025.12.0, a logica de portas I2C foi corrigida. Se usar multiplos barramentos I2C, verifique a configuracao:

```yaml
i2c:
  - id: bus_a
    sda: GPIO6
    scl: GPIO7
  - id: bus_b
    sda: GPIO8
    scl: GPIO9
```

### Limitacoes Thread

- Sem modo "Sleepy End Device"
- Nao adequado para dados de alta frequencia

---

## ESP32-H2

### Resumo
Chip Thread-only (sem WiFi). Ultra-baixo consumo para IoT mesh.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| 2025.6.0 | Suporte inicial | Novo | Usar para Thread |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | RISC-V single-core |
| WiFi | **Nao** |
| BLE | Sim (5.0) |
| Thread/Zigbee | **Sim** |
| PSRAM | Nao |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-thread-sensor

esp32:
  board: esp32-h2-devkitm-1
  framework:
    type: esp-idf

openthread:
  # Configuracao Thread
```

### Casos de Uso

- Sensores Thread em rede mesh
- Dispositivos ultra-baixo consumo
- Zigbee coordinators/routers

---

## ESP32-P4

### Resumo
Chip RISC-V dual-core high-performance. Suporte a MIPI DSI para displays de alta resolucao.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2025.12.0** | I2C logica de portas corrigida | Medio | Verificar multiplos I2C |
| 2025.8.0 | MIPI DSI displays | Novo recurso | Usar para displays |
| **2025.6.0** | Suporte inicial ESP32-P4 | **Novo** | Nova plataforma |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | RISC-V dual-core |
| WiFi | **Nao** (precisa coprocessor) |
| BLE | **Nao** |
| Thread | Nao |
| PSRAM | Sim (Quad/Octal) |
| Display | MIPI DSI |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-esp32p4

esp32:
  board: esp32-p4-preview  # Board name TBD
  framework:
    type: esp-idf

display:
  - platform: mipi_dsi
    # Configuracao especifica ESP32-P4
```

### Casos de Uso

- HMI (Human-Machine Interface)
- Displays high-resolution
- AI/ML on-device
- Processamento intensivo

### Nota

ESP32-P4 nao tem WiFi/BLE integrado. Precisa de coprocessor ESP32 para conectividade wireless.

---

## ESP8266

### Resumo
Plataforma legacy, ainda suportada mas com recursos limitados.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2026.1.0** | Serial objects excluidos por padrao | Medio | `enable_serial: true` se necessario |
| **2026.1.0** | PWM waveform excluido quando nao usado | Baixo | Nenhuma |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | Xtensa single-core |
| WiFi | Sim (802.11 b/g/n) |
| BLE | Nao |
| RAM | ~40KB livre |
| Status | Legacy, limitado |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-esp8266

esp8266:
  board: nodemcuv2
```

### Migracao: Serial Objects

A partir de 2026.1.0, serial objects sao excluidos por padrao para economizar RAM. Se usar serial em lambdas:

```yaml
# ANTES (automatico)
# Serial disponivel em lambdas

# DEPOIS (2026.1+)
esphome:
  name: my-esp8266

esp8266:
  board: nodemcuv2
  enable_serial: true  # Habilitar serial explicitamente
```

---

## RP2040

### Resumo
Raspberry Pi Pico. Microcontrolador de custo ultra-baixo sem wireless integrado.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2025.12.0** | Remote transmitter/receiver suportado | Novo recurso | Usar para IR/RF |

### Especificacoes

| Caracteristica | Valor |
|----------------|-------|
| Arquitetura | ARM Cortex-M0+ dual-core |
| WiFi | Nao (Pico W tem) |
| BLE | Nao |
| Status | Estavel |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-pico

rp2040:
  board: rpipico

# Remote transmitter (2025.12+)
remote_transmitter:
  pin: GPIO16
  carrier_duty_percent: 50%
```

### Casos de Uso

- Projetos simples sem wireless
- I/O extensivo
- Custo muito baixo
- IR remotes (2025.12+)

---

## nRF52 (Zephyr)

### Resumo
Plataforma Nordic nRF52 via Zephyr RTOS. Suporte completo desde 2025.8.0.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Necessaria |
|--------|---------|---------|-----------------|
| **2025.12.0** | DC-DC converter settings | Novo recurso | Configurar para eficiencia |
| **2025.11.0** | I2C support | **Novo recurso** | Usar sensores I2C |
| 2025.11.0 | BLE logging | Novo recurso | Logs via Bluetooth |
| 2025.11.0 | GPIO voltage control | Novo recurso | Configurar niveis logicos |
| **2025.9.0** | DFU over-the-air | **Novo recurso** | Atualizar via BLE |
| **2025.8.0** | Plataforma nRF52 via Zephyr | **NOVO** | Nova plataforma |

### Linha do Tempo

```
nRF52:
  Zephyr ──────> DFU ──────> I2C ──────> DC-DC
  (2025.8)       (2025.9)    (2025.11)   (2025.12)
```

### Especificacoes

| Caracteristica | nRF52840 | nRF52833 |
|----------------|----------|----------|
| Arquitetura | ARM Cortex-M4 | ARM Cortex-M4 |
| WiFi | Nao | Nao |
| BLE | Sim (5.0) | Sim (5.0) |
| Thread | Sim | Sim |
| Flash | 1MB | 512KB |

### Placas Suportadas

| Placa | Chip |
|-------|------|
| nrf52840_dk | nRF52840 |
| nrf52833_dk | nRF52833 |
| xiao_ble | nRF52840 |

### Exemplo de Configuracao

```yaml
esphome:
  name: my-nrf52

nrf52:
  board: nrf52840_dk
  dc_dc_converter: true  # Eficiencia energetica (2025.12+)

# I2C (2025.11+)
i2c:
  sda: P0.26
  scl: P0.27
  scan: true

# OTA via BLE DFU (2025.9+)
ota:
  platform: nrf_dfu

# Sensor I2C
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
```

### Migracao: Novo Projeto nRF52

**Passo 1**: Escolher board

```yaml
nrf52:
  board: nrf52840_dk  # ou xiao_ble
```

**Passo 2**: Habilitar recursos conforme versao

```yaml
# 2025.9+: DFU
ota:
  platform: nrf_dfu

# 2025.11+: I2C
i2c:
  sda: P0.26
  scl: P0.27

# 2025.12+: DC-DC
nrf52:
  board: nrf52840_dk
  dc_dc_converter: true
```

### GPIO Voltage Control (2025.11+)

Configurar niveis logicos para GPIOs:

```yaml
nrf52:
  board: nrf52840_dk
  gpio_voltage: 3.3V  # ou 1.8V
```

---

## LibreTiny

### Resumo
Plataforma para chips alternativos: BK7231 (Tuya), RTL87xx (Realtek), LN882X.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Chip |
|--------|---------|---------|------|
| **2026.1.0** | Thread-safe logging | Baixo | Todos |
| **2026.1.0** | Cortex-M4 atomics | Baixo | RTL87xx, LN882x |
| **2026.1.0** | Deep sleep GPIO wake-up | Novo recurso | BK7231n/t |
| **2026.1.0** | BLE stack desabilitado | Alto | BK7231N (economiza 21KB RAM) |
| **2025.7.0** | LN882X suportado | **Novo** | LN882X |

### Linha do Tempo

```
LibreTiny:
  BK7231 ────> LN882X ──────> Thread-safe, deep sleep, atomics
  (base)       (2025.7)       (2026.1)
```

### Chips Suportados

| Familia | Chips | Desde | Notas |
|---------|-------|-------|-------|
| BK72xx | BK7231T, BK7231N | Base | Dispositivos Tuya |
| RTL87xx | RTL8710BN, RTL8720DN | Base | Realtek |
| LN882x | LN8820 | 2025.7 | Novo |

### Exemplo de Configuracao

```yaml
# BK7231 (dispositivos Tuya)
esphome:
  name: my-bk7231

bk72xx:
  board: generic-bk7231t-qfn32-tuya

# Deep sleep (2026.1+)
deep_sleep:
  wakeup_pin:
    number: GPIO6
    inverted: true
```

```yaml
# LN882X (2025.7+)
esphome:
  name: my-ln882x

ln882x:
  board: generic-ln882x
```

### Migracao: Deep Sleep BK7231

A partir de 2026.1.0, deep sleep com GPIO wake-up esta disponivel:

```yaml
# ANTES (2026.1-): Sem deep sleep
# N/A

# DEPOIS (2026.1+)
deep_sleep:
  wakeup_pin:
    number: GPIO6
    inverted: true
  run_duration: 10s
  sleep_duration: 5min
```

### BLE Stack BK7231N

A partir de 2026.1.0, BLE stack e desabilitado por padrao em BK7231N:
- **Economia**: 21KB RAM, 225KB flash
- **Impacto**: Se precisar de BLE, use BK7231T

---

## Matriz de Compatibilidade

### Chips ESP32

| Chip | Framework | WiFi | BLE | Thread | PSRAM |
|------|-----------|------|-----|--------|-------|
| ESP32 | IDF/Arduino | Sim | Sim | Nao | Quad |
| ESP32-S2 | IDF/Arduino | Sim | Nao | Nao | Quad |
| ESP32-S3 | IDF/Arduino | Sim | Sim | Nao | Quad/Octal |
| ESP32-C3 | IDF/Arduino | Sim | Sim | Nao | Nao |
| ESP32-C5 | IDF | Sim | Sim | Nao | Quad |
| ESP32-C6 | IDF | Sim | Sim | Sim | Nao |
| ESP32-H2 | IDF | Nao | Sim | Sim | Nao |
| ESP32-P4 | IDF | Nao | Nao | Nao | Sim |

### Suporte PSRAM

| Chip | Quad | Octal | Speed Max |
|------|------|-------|-----------|
| ESP32 | Sim | Nao | 80MHz |
| ESP32-S2 | Sim | Nao | 80MHz |
| ESP32-S3 | Sim | Sim | 120MHz |
| ESP32-C5 | Sim | Nao | 120MHz |
| ESP32-P4 | Sim | Sim | TBD |

### Outras Plataformas

| Plataforma | Status | Desde | WiFi | BLE |
|------------|--------|-------|------|-----|
| ESP8266 | Legacy | - | Sim | Nao |
| RP2040 | Estavel | - | Nao | Nao |
| nRF52 | Estavel | 2025.8 | Nao | Sim |
| BK7231 | Estavel | - | Sim | Parcial |
| RTL87xx | Estavel | - | Sim | Nao |
| LN882x | Estavel | 2025.7 | Sim | Nao |

---

## Checklist de Selecao de Plataforma

### Escolher ESP32 se:
- [ ] Precisa de WiFi e BLE simultaneos
- [ ] Precisa de PSRAM para displays/camera
- [ ] Quer maior compatibilidade de componentes
- [ ] Projeto principal de automacao

### Escolher ESP32-C6 se:
- [ ] Precisa de Thread/Zigbee
- [ ] Wi-Fi 6 e importante
- [ ] Baixo consumo de energia

### Escolher ESP32-H2 se:
- [ ] Apenas Thread/Zigbee (sem WiFi)
- [ ] Ultra-baixo consumo

### Escolher ESP32-P4 se:
- [ ] Processamento intensivo
- [ ] Displays high-resolution
- [ ] AI/ML on-device

### Escolher nRF52 se:
- [ ] Apenas BLE
- [ ] Ultra-baixo consumo
- [ ] Wearables/beacons

### Escolher LibreTiny (BK72xx) se:
- [ ] Conversao de dispositivos Tuya
- [ ] Retrofit de hardware existente

### Escolher RP2040 se:
- [ ] Projeto simples sem wireless
- [ ] Precisa de I/O extensivo
- [ ] Custo muito baixo

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturado por plataforma (antes por versao) | Claude Code |
| 2026-01-27 | Criacao inicial com cobertura 2024.11 a 2026.1 | Claude Code |
