# Memoria e GPIO - ESPHome por Componente (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Fonte**: ESPHOME_CHANGELOG_COMPLETO.md

---

## Indice de Componentes

| Componente | Descricao | Breaking Changes |
|------------|-----------|------------------|
| [PSRAM](#psram) | Memoria externa | Sim (2025.11.0) |
| [GPIO](#gpio) | Pinos de entrada/saida | Nao |
| [ADC](#adc) | Conversor analogico-digital | Nao |
| [I2C](#i2c) | Barramento I2C | Sim (C5/C6/P4) |
| [SPI](#spi) | Barramento SPI | Sim (2024.11.0) |
| [UART](#uart) | Comunicacao serial | Nao |
| [PWM/LEDC](#pwmledc) | Modulacao por largura de pulso | Nao |
| [Pulse Counter](#pulse-counter) | Contador de pulsos | Nao |
| [Deep Sleep](#deep-sleep) | Modo economia energia | Nao |
| [RTC](#rtc) | Relogio tempo real | Nao |
| [Touch Sensor](#touch-sensor) | Sensor capacitivo | Nao |
| [Watchdog](#watchdog) | Timer de seguranca | Nao |
| [Preference Storage](#preference-storage) | Armazenamento persistente | Sim (2025.9.0) |

---

## PSRAM

Memoria externa para ESP32 com suporte a PSRAM.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.12.0 | ESP32-C5 PSRAM quad mode ate 120MHz | Baixo | Nova funcionalidade |
| **2025.11.0** | **PSRAM nao carrega automaticamente** | **CRITICO** | **Adicionar bloco `psram:` explicito** |
| **2025.11.0** | **ESP32-S3 requer mode quad/octal** | **CRITICO** | **Especificar mode obrigatorio** |

### Modos por Chip

| Chip | Modos Suportados | Padrao |
|------|------------------|--------|
| ESP32 | quad | quad |
| ESP32-S2 | quad | quad |
| ESP32-S3 | quad, octal | DEVE especificar |
| ESP32-C5 | quad (ate 120MHz) | quad |

### Exemplo

```yaml
# ESP32 basico - configuracao minima
psram:

# ESP32-S3 - OBRIGATORIO especificar modo
psram:
  mode: octal  # ou quad, dependendo do hardware

# Verificar se PSRAM esta ativo
sensor:
  - platform: debug
    free:
      name: "Free Heap"
    psram:
      name: "Free PSRAM"
```

### Migracao (versoes < 2025.11.0)

**ANTES** (2025.10.0 e anteriores):
```yaml
# PSRAM carregava automaticamente quando detectado
# Nenhuma configuracao necessaria
```

**AGORA** (2025.11.0+):
```yaml
# OBRIGATORIO para habilitar PSRAM
psram:
  mode: octal  # ESP32-S3 DEVE especificar
```

### Troubleshooting

**Sintoma**: Free PSRAM mostra 0 ou sensor nao aparece.
**Causa**: PSRAM nao configurado explicitamente.
**Solucao**: Adicionar bloco `psram:` com mode correto.

---

## GPIO

Pinos de entrada/saida digital.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2026.1.0 | ESP-IDF padrao (afeta GPIO timing) | Alto | Definir `framework: arduino` se timing critico |
| 2026.1.0 | ~6KB IRAM economizados | Baixo | Automatico |
| 2025.11.0 | Ultra-low latency (~12us vs ~8ms) | Baixo | Automatico |
| 2025.10.0 | GPIO Expander I2C caching | Baixo | Automatico |
| 2025.9.0 | GPIO memoria reduzida 50% | Baixo | Automatico |
| 2025.8.0 | nRF52 GPIO com interrupts | Baixo | Nova plataforma |
| 2025.7.0 | PI4IOE5V6408 GPIO expander | Baixo | Novo componente |
| 2025.2.0 | GPIOPin get_flags() obrigatorio | Medio | Custom components |

### Exemplo

```yaml
# GPIO com interrupt
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO4
      mode: INPUT_PULLUP
      inverted: true
    name: "Motion Sensor"
    device_class: motion
    on_press:
      then:
        - light.turn_on: luz_sala

# GPIO Expander PI4IOE5V6408
pi4ioe5v6408:
  id: gpio_expander
  address: 0x43

switch:
  - platform: gpio
    name: "Output 1"
    pin:
      pi4ioe5v6408: gpio_expander
      number: 4
      mode: OUTPUT

# nRF52 GPIO com interrupt
binary_sensor:
  - platform: gpio
    pin:
      number: P0.13
      mode: INPUT_PULLUP
    on_press:
      then:
        - logger.log: "Pressed"
```

### Migracao (versoes < 2026.1.0)

**Problema**: Timing de GPIO pode diferir com ESP-IDF padrao.

**Solucao** (se timing critico):
```yaml
esp32:
  board: esp32dev
  framework:
    type: arduino
```

### Migracao (versoes < 2025.2.0 - Custom Components)

```cpp
// Custom GPIO pin implementation
class MyGPIOPin : public GPIOPin {
 public:
  // OBRIGATORIO implementar
  gpio_flags_t get_flags() const override {
    return gpio_flags_t::FLAG_INPUT;
  }
};
```

### Troubleshooting

**Sintoma**: PWM flickering, interrupts atrasados.
**Causa**: Mudanca de Arduino para ESP-IDF (2026.1.0).
**Solucao**: Usar `framework: type: arduino` se necessario.

---

## ADC

Conversor analogico-digital.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.9.0 | Reset calibracao por device_id | Medio | Recalibrar se necessario |
| 2025.8.0 | nRF52 ADC com resolucao configuravel | Baixo | Nova plataforma |

### Exemplo

```yaml
# ADC com calibracao
sensor:
  - platform: adc
    pin: GPIO34
    name: "Battery Voltage"
    attenuation: 11db
    filters:
      - multiply: 2.0  # Divisor de tensao
      - sliding_window_moving_average:
          window_size: 10
          send_every: 5

# ADC com calibracao linear explicita
sensor:
  - platform: adc
    pin: GPIO34
    name: "Calibrated ADC"
    filters:
      - calibrate_linear:
          - 0.0 -> 0.0
          - 1.0 -> 3.3
```

### Migracao (versoes < 2025.9.0)

**Problema**: Valores de ADC podem mudar apos update devido a reset de preferencias.

**Solucao**: Recalibrar usando filtro `calibrate_linear`.

### Troubleshooting

**Sintoma**: Valores de ADC muito diferentes apos update.
**Causa**: Reset de preferencias (2025.9.0 device_id).
**Solucao**: Recalibrar ADC manualmente via filtros.

---

## I2C

Barramento de comunicacao I2C.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| **2025.12.0** | **I2C em ESP32-C5/C6/P4 corrigido** | **Medio** | **Verificar config multiplos barramentos** |
| 2025.12.0 | RTC BM8563 suportado | Baixo | Novo componente |
| 2025.11.0 | RTC RX8130 suportado | Baixo | Novo componente |
| 2025.7.0 | DS2484 1-Wire bus master via I2C | Baixo | Novo componente |
| 2025.7.0 | PI4IOE5V6408 GPIO expander | Baixo | Novo componente |

### Exemplo

```yaml
# Multiplos barramentos I2C
i2c:
  - id: bus_sensors
    sda: GPIO21
    scl: GPIO22
    scan: true

  - id: bus_display
    sda: GPIO16
    scl: GPIO17
    scan: true

sensor:
  - platform: bme280
    i2c_id: bus_sensors
    address: 0x76

# DS2484 - 1-Wire via I2C
i2c:
  sda: GPIO21
  scl: GPIO22

one_wire:
  - platform: ds2484
    id: hub_1wire
    address: 0x18

sensor:
  - platform: dallas_temp
    one_wire_id: hub_1wire
    address: 0x1234567890123456
    name: "Temperature"
```

### Migracao (ESP32-C5/C6/P4 - versoes < 2025.12.0)

**Problema**: Logica de portas I2C incorreta em chips com LP I2C.

**Chips afetados**: ESP32-C5, ESP32-C6, ESP32-P4

**Solucao**: Atualizar para 2025.12.0+ e verificar configuracao de multiplos barramentos.

### Troubleshooting

**Sintoma**: Dispositivos I2C nao detectados em ESP32-C6.
**Causa**: Bug em LP I2C corrigido em 2025.12.0.
**Solucao**: Atualizar para 2025.12.0+ e verificar portas.

---

## SPI

Barramento de comunicacao SPI.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| **2024.11.0** | **`mode` renomeado para `spi_mode`** | **Alto** | **Renomear no YAML** |

### Exemplo

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

display:
  - platform: ili9xxx
    model: ILI9341
    cs_pin: GPIO5
    dc_pin: GPIO4
    reset_pin: GPIO2
    spi_mode: 0  # NAO usar 'mode'
```

### Migracao (versoes < 2024.11.0)

**ANTES**:
```yaml
sensor:
  - platform: some_spi_sensor
    mode: 0
```

**AGORA**:
```yaml
sensor:
  - platform: some_spi_sensor
    spi_mode: 0
```

---

## UART

Comunicacao serial assincrona.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.12.0 | USB CDC-ACM support (ESP32-S2/S3) | Baixo | Nova funcionalidade |
| 2025.12.0 | `wake_loop_on_rx` para baixa latencia | Baixo | Nova funcionalidade |
| 2025.6.0 | USB UART (USB Host Mode) | Baixo | Nova funcionalidade |

### Exemplo

```yaml
# UART basico para sensor
uart:
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 9600

sensor:
  - platform: pmsensor
    type: PMSX003
    pm_2_5:
      name: "PM 2.5"

# USB CDC-ACM (ESP32-S3)
logger:
  level: DEBUG
  hardware_uart: USB_CDC

# UART com baixa latencia (2025.12.0+)
uart:
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 9600
  # wake_loop_on_rx: true  # Reducao ~10ms latencia
```

### Troubleshooting

**Sintoma**: Comunicacao UART falha intermitentemente.
**Causa**: Latencia alta no loop.
**Solucao**: Usar `wake_loop_on_rx: true` (2025.12.0+).

---

## PWM/LEDC

Modulacao por largura de pulso para LEDs e servos.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2026.1.0 | PWM/LEDC usa driver nativo ESP-IDF | Medio | Testar apos migracao |
| 2026.1.0 | ESP8266 PWM waveform excluido se nao usado | Baixo | Automatico |
| 2025.10.0 | PWM waveforms podem diferir (Arduino como IDF) | Medio | Testar timing |
| 2025.7.0 | PWM/LEDC usa nova API (ESP-IDF 5.x) | Medio | Testar apos update |
| 2025.2.0 | ESP32 RMT atualizado para IDF 5+ | Medio | Afeta LED strips, IR |

### Exemplo

```yaml
output:
  - platform: ledc
    pin: GPIO25
    id: pwm_output
    frequency: 1000Hz

light:
  - platform: monochromatic
    output: pwm_output
    name: "Dimmer"
```

### Migracao (versoes < 2026.1.0)

**Problema**: PWM timing pode diferir com ESP-IDF padrao.

**Solucao** (se flickering):
```yaml
esp32:
  board: esp32dev
  framework:
    type: arduino
```

---

## Pulse Counter

Contador de pulsos para medidores de fluxo, energia, etc.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.8.0 | Frequency mode adicionado | Baixo | Nova funcionalidade |

### Exemplo

```yaml
sensor:
  - platform: pulse_counter
    pin: GPIO4
    name: "Flow Rate"
    unit_of_measurement: "pulses/min"
    # Modo frequency disponivel para taxas altas
```

### Troubleshooting

**Sintoma**: Contador reseta antes do esperado.
**Causa**: Limite de 16-bit atingido.
**Solucao**: Usar frequency mode (2025.8.0+) para taxas altas.

---

## Deep Sleep

Modo de economia de energia.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2026.1.0 | LibreTiny deep sleep com GPIO wake-up | Baixo | BK7231n/t |
| 2025.11.0 | OpenThread suporta OTA durante sleep | Baixo | Thread devices |
| 2025.11.0 | Melhor handling de wake sources | Baixo | Automatico |

### Exemplo

```yaml
# Deep sleep com wake-up por GPIO
deep_sleep:
  run_duration: 60s
  sleep_duration: 10min
  wakeup_pin:
    number: GPIO4
    inverted: true
  wakeup_pin_mode: IGNORE

# Deep sleep com controle programatico
deep_sleep:
  id: deep_sleep_control
  run_duration: 60s

binary_sensor:
  - platform: gpio
    pin: GPIO4
    on_press:
      - deep_sleep.enter: deep_sleep_control

# BK7231 (LibreTiny) deep sleep
deep_sleep:
  wakeup_pin: P8
```

### Troubleshooting

**Sintoma**: Device nao acorda com GPIO.
**Causa**: Configuracao incorreta de wakeup_pin.
**Solucao**: Usar `wakeup_pin_mode: IGNORE` para evitar trigger imediato.

---

## RTC

Relogio de tempo real.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.12.0 | RTC BM8563 suportado | Baixo | Novo componente I2C |
| 2025.11.0 | RTC RX8130 suportado | Baixo | Novo componente |

### Exemplo

```yaml
# RTC BM8563
time:
  - platform: bm8563
    i2c_id: bus_a
    address: 0x51

# RTC DS1307
time:
  - platform: ds1307
    id: rtc_time
    address: 0x68
    update_interval: 60s

# NTP com fallback
time:
  - platform: sntp
    id: sntp_time
    timezone: America/Sao_Paulo
    servers:
      - pool.ntp.org
    on_time_sync:
      - logger.log: "Time synced"
```

---

## Touch Sensor

Sensor capacitivo do ESP32.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2025.8.0 | Workaround para regressao ESP-IDF 5.4 | Medio | Atualizar para 2025.8.0+ |

### Exemplo

```yaml
esp32_touch:
  setup_mode: false

binary_sensor:
  - platform: esp32_touch
    name: "Touch Pad"
    pin: GPIO4
    threshold: 1000
```

### Troubleshooting

**Sintoma**: Touch sensor nao responde.
**Causa**: Regressao ESP-IDF 5.4.
**Solucao**: Atualizar para 2025.8.0+ que inclui workaround.

---

## Watchdog

Timer de seguranca para reset automatico.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| - | Nenhuma mudanca significativa | - | - |

### Troubleshooting

**Sintoma**: Device reinicia aleatoriamente.
**Causa**: Loop muito longo bloqueando watchdog.
**Solucao**:
- Reduzir `update_interval` de sensores
- Usar filtros `sliding_window` ao inves de `median`
- Verificar lambdas bloqueantes
- Usar ESP-IDF (economia 20-30KB RAM)

```yaml
# Economia maxima para evitar watchdog
esp32:
  framework:
    type: esp-idf

psram:
  mode: octal  # ESP32-S3

sensor:
  - platform: adc
    filters:
      - sliding_window_moving_average:
          window_size: 10
```

---

## Preference Storage

Armazenamento persistente de preferencias.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| **2025.9.0** | **Preference storage inclui device_id** | **Medio** | **Recalibrar sensores** |

### Migracao (versoes < 2025.9.0)

**Problema**: Dispositivos podem perder preferencias no primeiro upgrade.

**Afetados**:
- Dados de calibracao ADC
- Configuracoes de sensores
- Contadores persistentes

**Solucao**: Recalibrar sensores e restaurar configuracoes apos upgrade.

---

## Checklist de Migracao Geral

### De versao < 2024.11.0
- [ ] SPI: Renomear `mode` para `spi_mode`

### De versao < 2025.2.0
- [ ] Custom components: Implementar `get_flags()` em GPIOPin

### De versao < 2025.7.0
- [ ] Atualizar para ESP-IDF 5.3.2+
- [ ] Verificar componentes 1-Wire (considerar DS2484)
- [ ] Testar PWM/LEDC apos atualizacao

### De versao < 2025.8.0
- [ ] Verificar touch sensors (workaround IDF 5.4)
- [ ] Considerar pulse counter frequency mode

### De versao < 2025.9.0
- [ ] Recalibrar ADC se valores mudaram
- [ ] Restaurar preferencias perdidas

### De versao < 2025.10.0
- [ ] Testar timing de GPIO se usar Arduino
- [ ] Verificar PWM waveforms

### De versao < 2025.11.0 (CRITICO)
- [ ] Adicionar bloco `psram:` explicitamente
- [ ] ESP32-S3: Especificar mode (quad/octal)
- [ ] Converter `priority` de float para inteiro
- [ ] Usar `esphome analyze-memory` para diagnostico

### De versao < 2025.12.0
- [ ] ESP32-C5/C6/P4: Verificar config I2C multiplos barramentos

### De versao < 2026.1.0
- [ ] Definir `framework: type: arduino` se timing critico
- [ ] Testar GPIO timing com ESP-IDF padrao

---

## Historico deste Documento

| Data | Versao ESPHome | Alteracao |
|------|----------------|-----------|
| 2026-01-27 | 2026.1.1 | Reestruturado para organizacao por componente |
| 2026-01-27 | 2026.1.1 | Criacao inicial (organizacao por versao) |
