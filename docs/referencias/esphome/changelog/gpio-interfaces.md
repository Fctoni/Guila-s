# GPIO e Interfaces - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Fonte**: ESPHOME_CHANGELOG_COMPLETO.md

---

## Quando Consultar Este Arquivo

Consulte este documento quando:
- Configurar GPIO em qualquer plataforma
- Usar I2C com multiplos barramentos ou LP I2C
- Configurar SPI (spi_mode)
- Implementar 1-Wire (DS2484)
- Usar I/O Expanders (MCP230XX, PCF8574, PI4IOE5V6408)
- Configurar CAN bus
- Usar UART com novos recursos
- Trabalhar com USB CDC-ACM

---

## Resumo de Mudancas Criticas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | ESP32 CAN listen-only mode | Novo recurso | Nenhuma |
| 2025.12.0 | I2C em ESP32-C5/C6/P4 corrigido | LP I2C logica corrigida | Verificar config multiplos barramentos |
| 2025.12.0 | USB CDC-ACM support | ESP32-S2/S3 | Nova funcionalidade |
| 2025.12.0 | MCP3204 ADC differential mode | Novo recurso | Nenhuma |
| 2025.10.0 | EKTF2232 `rts_pin` -> `reset_pin` | BREAKING | Renomear no YAML |
| 2025.10.0 | Multiplas instancias CAN ESP32 | Novo recurso | Nenhuma |
| 2025.9.0 | GPIO memoria reduzida 50% | Bit-packing | Nenhuma |
| 2025.9.0 | GPIO expander I2C caching | Performance | Nenhuma |
| 2025.7.0 | PI4IOE5V6408 I2C GPIO expander | Novo hardware | Nova opcao |
| 2025.7.0 | DS2484 1-Wire bus master | Novo hardware | Nova opcao |
| 2025.7.0 | GPIO pin number handling atualizado | Possivel breaking | Verificar configs |
| 2025.2.0 | GPIOPin get_flags() obrigatorio | API change | Atualizar custom components |
| 2024.11.0 | SPI `mode` -> `spi_mode` | BREAKING | Renomear no YAML |

---

## Detalhes por Versao

### 2026.1.0 (Janeiro 2026)

#### ESP32 CAN Listen-Only Mode
CAN bus agora suporta modo listen-only para monitoramento passivo.

```yaml
canbus:
  - platform: esp32_can
    id: my_canbus
    tx_pin: GPIO21
    rx_pin: GPIO22
    can_id: 0
    bit_rate: 500kbps
    # Novo: modo listen-only
```

#### UART Event Component
Novo componente para eventos UART.

---

### 2025.12.0 (Dezembro 2025)

#### I2C em ESP32-C5/C6/P4 - Correcao Critica

**Problema corrigido**: Logica de portas I2C estava incorreta em chips com LP I2C (Low Power I2C).

**Chips afetados**:
- ESP32-C5
- ESP32-C6
- ESP32-P4

**Acao**: Usuarios com multiplos barramentos I2C devem verificar configuracao apos atualizar.

```yaml
# Exemplo com multiplos barramentos
i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO9
    scan: true

  - id: bus_b
    sda: GPIO10
    scl: GPIO11
    scan: true
```

#### USB CDC-ACM Support
Porta serial virtual para ESP32-S2 e ESP32-S3.

**Recursos**:
- Multi-interface
- Buffers configuraveis
- Callbacks de line state

```yaml
# ESP32-S3 USB serial
logger:
  level: DEBUG
  hardware_uart: USB_CDC
```

#### CC1101 Sub-1GHz Transceiver
433MHz com modulacao ASK/OOK via SPI.

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

cc1101:
  cs_pin: GPIO5
  gdo0_pin: GPIO4
```

#### MCP3204 ADC Differential Mode
Modo diferencial adicionado ao ADC MCP3204.

```yaml
sensor:
  - platform: mcp3204
    # Differential mode disponivel
```

#### Low-Latency UART
Flag `wake_loop_on_rx` para reducao de ~10ms em latencia.
Util para Z-Wave proxies.

---

### 2025.10.0 (Outubro 2025)

#### EKTF2232 - BREAKING CHANGE

`rts_pin` renomeado para `reset_pin`.

```yaml
# ANTES
touchscreen:
  platform: ektf2232
  rts_pin: GPIO4

# AGORA
touchscreen:
  platform: ektf2232
  reset_pin: GPIO4
```

#### Multiplas Instancias CAN em ESP32
Suporte a multiplos barramentos CAN no ESP32.

```yaml
canbus:
  - platform: esp32_can
    id: can_bus_1
    tx_pin: GPIO21
    rx_pin: GPIO22
    can_id: 1
    bit_rate: 500kbps

  - platform: esp32_can
    id: can_bus_2
    tx_pin: GPIO25
    rx_pin: GPIO26
    can_id: 2
    bit_rate: 250kbps
```

#### LAN8670 PHY Ethernet
Novo PHY Ethernet suportado.

#### QMC5883L DRDY Pin
Pin DRDY agora configuravel no magnetometro QMC5883L.

---

### 2025.9.0 (Setembro 2025)

#### GPIO Memoria Reduzida 50%
Via bit-packing interno. Melhoria automatica.

**Beneficio**: Mais GPIOs podem ser usados sem esgotar RAM.

#### GPIO Expander I2C Caching
Caching de leituras I2C para GPIO expanders.

**Beneficio**: Menos trafego I2C, menor latencia.

---

### 2025.8.0 (Agosto 2025)

#### nRF52 GPIO com Interrupts
GPIO com suporte a interrupts para plataforma nRF52.

```yaml
# nRF52
binary_sensor:
  - platform: gpio
    pin:
      number: P0.13
      mode: INPUT_PULLUP
    on_press:
      then:
        - logger.log: "Pressed"
```

---

### 2025.7.0 (Julho 2025)

#### PI4IOE5V6408 - Novo I2C GPIO Expander

I2C GPIO expander com 8 portas.

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22

pi4ioe5v6408:
  id: gpio_expander
  address: 0x43

binary_sensor:
  - platform: gpio
    name: "Input 1"
    pin:
      pi4ioe5v6408: gpio_expander
      number: 0
      mode: INPUT

switch:
  - platform: gpio
    name: "Output 1"
    pin:
      pi4ioe5v6408: gpio_expander
      number: 4
      mode: OUTPUT
```

#### DS2484 - 1-Wire Bus Master

Bus master I2C para 1-Wire, alternativa ao Dallas direto.

**Vantagens**:
- Melhor compatibilidade com cabos longos
- Timing mais preciso via hardware

```yaml
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

#### GPIO Pin Number Handling
Handling interno atualizado. Verificar configuracoes existentes.

---

### 2025.6.0 (Junho 2025)

#### USB UART (USB Host Mode)
Suporte a UART via USB Host.

---

### 2025.2.0 (Estimado - Pre-corte)

#### GPIOPin get_flags() Obrigatorio

**Para autores de custom components**:

O metodo `get_flags()` agora e obrigatorio na interface GPIOPin.

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

---

### 2024.11.0 (Novembro 2024)

#### SPI Mode Renomeado - BREAKING CHANGE

`mode` renomeado para `spi_mode` para evitar conflitos.

```yaml
# ANTES
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

sensor:
  - platform: some_spi_sensor
    mode: 0

# AGORA
sensor:
  - platform: some_spi_sensor
    spi_mode: 0
```

---

## Guia Rapido: I/O Expanders Suportados

### MCP23017 (16 GPIO, I2C)
```yaml
mcp23017:
  - id: mcp23017_hub
    address: 0x20

switch:
  - platform: gpio
    name: "MCP Output"
    pin:
      mcp23xxx: mcp23017_hub
      number: 0
      mode: OUTPUT
```

### MCP23008 (8 GPIO, I2C)
```yaml
mcp23008:
  - id: mcp23008_hub
    address: 0x20
```

### PCF8574 (8 GPIO, I2C)
```yaml
pcf8574:
  - id: pcf8574_hub
    address: 0x20
    pcf8575: false  # true para PCF8575 (16 GPIO)
```

### PI4IOE5V6408 (8 GPIO, I2C) - Novo em 2025.7.0
```yaml
pi4ioe5v6408:
  - id: pi4ioe5v6408_hub
    address: 0x43
```

### MCP23S17 (16 GPIO, SPI)
```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

mcp23s17:
  - id: mcp23s17_hub
    cs_pin: GPIO5
    deviceaddress: 0
```

---

## Guia Rapido: 1-Wire

### Dallas Direto (GPIO)
```yaml
one_wire:
  - platform: gpio
    pin: GPIO4

sensor:
  - platform: dallas_temp
    address: 0x1234567890ABCDEF
    name: "Temperature"
```

### DS2484 Bus Master (I2C) - Novo em 2025.7.0
```yaml
i2c:
  sda: GPIO21
  scl: GPIO22

one_wire:
  - platform: ds2484
    address: 0x18

sensor:
  - platform: dallas_temp
    address: 0x1234567890ABCDEF
    name: "Temperature"
```

**Quando usar DS2484**:
- Cabos longos (>5m)
- Ambiente com ruido eletrico
- Multiplos sensores na mesma linha
- Timing preciso necessario

---

## Guia Rapido: CAN Bus

### ESP32 CAN Basico
```yaml
canbus:
  - platform: esp32_can
    tx_pin: GPIO21
    rx_pin: GPIO22
    can_id: 4
    bit_rate: 500kbps
    on_frame:
      - lambda: |-
          ESP_LOGD("CAN", "ID: %x", x.can_id);
```

### Multiplos CAN (2025.10.0+)
```yaml
canbus:
  - platform: esp32_can
    id: can1
    tx_pin: GPIO21
    rx_pin: GPIO22
    can_id: 1
    bit_rate: 500kbps

  - platform: esp32_can
    id: can2
    tx_pin: GPIO25
    rx_pin: GPIO26
    can_id: 2
    bit_rate: 250kbps
```

### Listen-Only Mode (2026.1.0+)
Para monitoramento passivo sem transmissao.

---

## Guia Rapido: SPI

### Configuracao Basica
```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19
```

### spi_mode (2024.11.0+)
```yaml
# Usar spi_mode ao inves de mode
sensor:
  - platform: max31855
    cs_pin: GPIO5
    spi_mode: 0  # NAO usar 'mode'
    name: "Thermocouple"
```

---

## Guia Rapido: I2C

### Configuracao Basica
```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true
```

### Multiplos Barramentos
```yaml
i2c:
  - id: bus_a
    sda: GPIO21
    scl: GPIO22

  - id: bus_b
    sda: GPIO16
    scl: GPIO17

sensor:
  - platform: bme280
    i2c_id: bus_a
    address: 0x76
```

### Atencao: ESP32-C5/C6/P4 (2025.12.0)
Logica de LP I2C foi corrigida. Verificar configuracao de multiplos barramentos apos atualizar.

---

## Guia Rapido: UART

### Configuracao Basica
```yaml
uart:
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 9600
```

### Low-Latency (2025.12.0+)
```yaml
uart:
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 9600
  # Para proxies Z-Wave, etc.
```

### USB CDC-ACM (ESP32-S2/S3, 2025.12.0+)
```yaml
logger:
  hardware_uart: USB_CDC
```
