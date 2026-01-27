# Lights e LEDs - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

---

## Indice de Componentes

| Componente | Descricao | Breaking Changes |
|------------|-----------|------------------|
| [Light (Core)](#light-core) | API base de iluminacao, lambda StringRef | Sim (2026.1.0) |
| [ESP32 RMT LED Strip](#esp32-rmt-led-strip) | LED strips endereraveis nativos ESP-IDF | Migracao requerida |
| [AC Dimmer](#ac-dimmer) | Dimmer AC com zero-cross | Nao |
| [Shelly Dimmer](#shelly-dimmer) | Shelly Dimmer 2 via UART | Nao |
| [HUB75 LED Matrix](#hub75-led-matrix) | Paineis LED HUB75 | Nao (novo) |
| [Output](#output) | Saidas PWM, min/max power | Nao |
| [Efeitos](#efeitos) | Addressable e lambda effects | Nao |

---

## Light (Core)

Componente base de iluminacao. Aplica-se a todos os tipos: `binary`, `monochromatic`, `rgb`, `rgbw`, `rgbww`.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2026.1.0 | Metodos de nome de efeito retornam `StringRef` | Breaking | Lambdas customizadas |
| 2025.12.0 | Zero-copy API para light effects | Performance | Automatico |
| 2025.9.0 | Effects queryable por indice | Feature | Novo recurso |
| 2025.12.0 | Metricas Prometheus por modo de cor | Feature | Automatico |

### Breaking Change: Lambda API StringRef (2026.1.0)

Metodos que retornavam ponteiros de string (`const char*`) agora retornam `StringRef`. Isso afeta lambdas que verificam nome de efeito.

**Sintoma**: Erro de compilacao em lambdas que usam `strcmp()` ou comparacao com `nullptr`.

#### Migracao

```cpp
// ANTES (nao funciona mais)
auto effect_name = id(minha_luz).get_effect_name();
if (effect_name != nullptr) {
  if (strcmp(effect_name, "Rainbow") == 0) {
    // ...
  }
}

// DEPOIS (correto para 2026.1.0+)
auto effect_name = id(minha_luz).get_effect_name();
if (!effect_name.empty()) {
  if (effect_name == "Rainbow") {
    // ...
  }
}
```

**Mudancas necessarias**:
- Substituir `!= nullptr` por `!.empty()`
- Substituir `strcmp(x, "str") == 0` por `x == "str"`

### Feature: Effects Queryable por Indice (2025.9.0)

Efeitos podem ser consultados programaticamente.

```yaml
light:
  - platform: esp32_rmt_led_strip
    id: led_strip
    effects:
      - addressable_rainbow:
          name: "Rainbow"
      - addressable_color_wipe:
          name: "Color Wipe"

# Em lambda
lambda: |-
  // Obter lista de efeitos
  auto& effects = id(led_strip).get_effects();
  // Iterar sobre efeitos disponiveis
  for (auto* effect : effects) {
    ESP_LOGD("light", "Efeito: %s", effect->get_name().c_str());
  }
```

### Exemplo Basico

```yaml
light:
  - platform: binary
    name: "Luz Simples"
    output: relay_output

  - platform: monochromatic
    name: "Luz Dimerizavel"
    output: pwm_output
    gamma_correct: 2.8
    default_transition_length: 500ms

  - platform: rgb
    name: "Luz RGB"
    red: red_output
    green: green_output
    blue: blue_output
```

---

## ESP32 RMT LED Strip

Componente nativo ESP-IDF para LED strips endereraveis. **Recomendado** para todos os projetos ESP32.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2026.1.0 | ESP-IDF padrao - FastLED/NeoPixelBus nao funcionam | Breaking | Migracao requerida |
| 2025.10.0 | Performance 2-3x melhor que FastLED | Performance | Automatico |
| 2025.7.0 | ESP-IDF 5.3.2+ obrigatorio | Breaking | Atualizar IDF |
| 2025.7.0 | Novos chips: ESP32-C6, H2, P4 | Feature | Novo suporte |

### Breaking Change: ESP-IDF Padrao (2026.1.0)

ESP-IDF agora e o framework padrao para ESP32. Componentes que **NAO funcionam** com ESP-IDF:
- `fastled_clockless`
- `fastled_spi`
- `neopixelbus`
- WLED effects

### Migracao de FastLED

```yaml
# ANTES (FastLED - nao funciona com ESP-IDF)
light:
  - platform: fastled_clockless
    chipset: WS2812B
    pin: GPIO25
    num_leds: 60
    rgb_order: GRB
    name: "LED Strip"
    effects:
      - addressable_rainbow:

# DEPOIS (ESP32 RMT - funciona com ESP-IDF)
light:
  - platform: esp32_rmt_led_strip
    chipset: ws2812       # minusculas
    pin: GPIO25
    num_leds: 60
    rgb_order: GRB
    name: "LED Strip"
    effects:
      - addressable_rainbow:
```

**Diferencas na migracao**:
- `chipset` em **minusculas**: `ws2812` (nao `WS2812B`)
- Mesmos efeitos addressable suportados
- Performance superior com ESP-IDF

### Migracao de NeoPixelBus

```yaml
# ANTES (NeoPixelBus - nao funciona com ESP-IDF)
light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO25
    num_leds: 60
    name: "LED Strip"

# DEPOIS (ESP32 RMT)
light:
  - platform: esp32_rmt_led_strip
    rgb_order: GRB        # era "type"
    chipset: ws2812       # era "variant"
    pin: GPIO25
    num_leds: 60
    name: "LED Strip"
```

### Alternativa: Manter Arduino

Se precisar manter FastLED/NeoPixelBus (ex: WLED effects):

```yaml
esp32:
  board: esp32dev
  framework:
    type: arduino  # Forcar Arduino

light:
  - platform: fastled_clockless
    chipset: WS2812B
    pin: GPIO25
    num_leds: 60
    name: "LED Strip"
```

### Chipsets Suportados

| Chipset | RGBW | Timing | Notas |
|---------|------|--------|-------|
| `ws2811` | Nao | 800kHz | Comum, dados em GRB |
| `ws2812` | Nao | 800kHz | Muito comum |
| `sk6812` | Sim | 800kHz | Suporta RGBW |
| `apa106` | Nao | 800kHz | |
| `sm16703` | Nao | 800kHz | |

### Memoria RMT por Variante

| Variante | Memoria | Tamanho Bloco |
|----------|---------|---------------|
| ESP32 | 512 symbols | 64 symbols |
| ESP32-S2 | 256 symbols | 64 symbols |
| ESP32-S3 | 192 symbols | 48 symbols |
| ESP32-C3/C5/C6 | 96 symbols | 48 symbols |
| ESP32-H2 | 96 symbols | 48 symbols |
| ESP32-P4 | 192 symbols | 48 symbols |

### Exemplo: Configuracao Basica

```yaml
light:
  - platform: esp32_rmt_led_strip
    chipset: ws2812
    pin: GPIO25
    num_leds: 60
    rgb_order: GRB
    name: "LED Strip"
```

### Exemplo: RGBW com SK6812

```yaml
light:
  - platform: esp32_rmt_led_strip
    chipset: sk6812
    pin: GPIO25
    num_leds: 60
    rgb_order: GRB
    is_rgbw: true
    name: "LED Strip RGBW"
```

### Exemplo: LED Strip Longo com DMA/PSRAM

```yaml
psram:
  mode: octal  # Para ESP32-S3

light:
  - platform: esp32_rmt_led_strip
    chipset: ws2812
    pin: GPIO25
    num_leds: 300
    rgb_order: GRB
    use_dma: true       # Habilitar DMA
    rmt_symbols: 1024   # Buffer maior
    use_psram: true     # Usar PSRAM
    name: "Long LED Strip"
```

---

## AC Dimmer

Dimmer AC com deteccao de zero-cross para lampadas incandescentes, halogenas e LEDs dimmerizaveis.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2026.1.0 | Suporte ESP-IDF | Feature | Antes apenas Arduino |

### Feature: Suporte ESP-IDF (2026.1.0)

AC Dimmer agora funciona com framework ESP-IDF. Nao requer mais Arduino.

```yaml
esp32:
  framework:
    type: esp-idf

output:
  - platform: ac_dimmer
    id: dimmer1
    gate_pin: GPIO25
    zero_cross_pin: GPIO26

light:
  - platform: monochromatic
    output: dimmer1
    name: "Luz Dimerizavel"
```

### Exemplo: Lampadas Incandescentes/Halogenas

```yaml
output:
  - platform: ac_dimmer
    id: dimmer_incandescent
    gate_pin: GPIO25
    zero_cross_pin: GPIO26
    method: leading pulse  # Padrao, bom para incandescentes

light:
  - platform: monochromatic
    output: dimmer_incandescent
    name: "Luz Halogena"
    gamma_correct: 2.8
```

### Exemplo: Lampadas LED Dimmerizaveis

```yaml
output:
  - platform: ac_dimmer
    id: dimmer_led
    gate_pin: GPIO25
    zero_cross_pin: GPIO26
    method: trailing        # Melhor para LEDs
    init_with_half_cycle: true
    min_power: 15%          # LEDs precisam minimo maior

light:
  - platform: monochromatic
    output: dimmer_led
    name: "Luz LED"
    gamma_correct: 1.8      # Menos correcao para LEDs
```

### Metodos de Dimming

| Metodo | Uso | Notas |
|--------|-----|-------|
| `leading pulse` | Incandescentes, halogenas | Padrao |
| `trailing` | LEDs dimmerizaveis | Menor flicker |
| `leading` | Cargas resistivas | |

---

## Shelly Dimmer

Shelly Dimmer 2 com comunicacao UART para o coprocessador STM32.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| - | Sem mudancas criticas no periodo | - | - |

### Exemplo: Configuracao Completa

```yaml
logger:
  baud_rate: 0  # Necessario - UART usada pelo dimmer

uart:
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 115200

light:
  - platform: shelly_dimmer
    name: "Shelly Dimmer 2"
    id: shelly_light

    # Configuracao de dimming
    leading_edge: false    # trailing edge para LEDs
    min_brightness: 100    # 10% minimo (0-1000)
    max_brightness: 1000   # 100% maximo
    warmup_brightness: 50  # Ajuda LEDs em baixa potencia

    # Sensores de energia
    power:
      name: "Potencia"
    voltage:
      name: "Tensao"
    current:
      name: "Corrente"

    # Firmware do STM32
    firmware:
      version: "51.6"
      update: true  # Flash automatico na primeira vez
```

### Notas Importantes

- **Sem reversao**: Nao ha como reverter para firmware de fabrica
- **Neutral obrigatorio**: Para medicao precisa de energia
- **trailing edge**: `leading_edge: false` recomendado para LEDs dimmerizaveis

---

## HUB75 LED Matrix

Paineis LED HUB75 com suporte nativo para multiplas variantes ESP32.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.12.0 | Componente adicionado | Feature | Novo |

### Feature: Suporte Nativo (2025.12.0)

Suporte nativo para paineis LED HUB75 em multiplas variantes ESP32.

**Variantes e drivers**:
- ESP32: I2S driver
- ESP32-S2/S3: LCD CAM + GDMA
- ESP32-P4: PARLIO

**Recursos**:
- Compativel com LVGL
- Rotation e brightness actions
- Alta performance

### Exemplo: Configuracao Basica

```yaml
display:
  - platform: hub75
    width: 64
    height: 32
    chain_length: 2
    brightness: 128
    # Pinos variam por variante ESP32
```

---

## Output

Componente de saida usado por lights para PWM e controle de potencia.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.8.0 | Actions `set_min_power` e `set_max_power` | Feature | Novo |
| 2026.1.0 | ESP8266 PWM otimizado | Performance | Automatico |

### Feature: Ajuste Dinamico de Potencia (2025.8.0)

Novas actions para ajustar limites de potencia em tempo de execucao.

**Casos de uso**:
- Modo noturno (limitar brilho maximo)
- Protecao termica de LEDs
- Economia de energia

### Exemplo: Modo Noturno com Ajuste Dinamico

```yaml
output:
  - platform: ledc
    id: dimmer_output
    pin: GPIO25
    min_power: 10%
    max_power: 100%

light:
  - platform: monochromatic
    output: dimmer_output
    name: "Luz Dimerizavel"

button:
  - platform: template
    name: "Modo Noturno"
    on_press:
      - output.set_max_power:
          id: dimmer_output
          max_power: 30%

  - platform: template
    name: "Modo Normal"
    on_press:
      - output.set_max_power:
          id: dimmer_output
          max_power: 100%
```

### Exemplo: Protecao Termica

```yaml
sensor:
  - platform: ntc
    id: temp_sensor
    # ...
    on_value_range:
      - above: 60
        then:
          - output.set_max_power:
              id: led_output
              max_power: 50%
      - below: 50
        then:
          - output.set_max_power:
              id: led_output
              max_power: 100%
```

---

## Efeitos

Efeitos de luz addressable e lambda para LED strips.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2026.1.0 | WLED effects requerem Arduino | Breaking | Definir framework |
| 2025.12.0 | Zero-copy API | Performance | Automatico |

### Breaking Change: WLED Effects (2026.1.0)

WLED effects nao funcionam com ESP-IDF. Se usar WLED effects, definir Arduino:

```yaml
esp32:
  framework:
    type: arduino

light:
  - platform: fastled_clockless
    # ...
    effects:
      - wled:
          # ...
```

### Exemplo: Efeitos Addressable

```yaml
light:
  - platform: esp32_rmt_led_strip
    # ... config basica ...
    effects:
      - addressable_rainbow:
          name: "Arco-iris"
          speed: 10
          width: 50

      - addressable_color_wipe:
          name: "Color Wipe"
          colors:
            - red: 100%
              green: 0%
              blue: 0%
              num_leds: 1
            - red: 0%
              green: 100%
              blue: 0%
              num_leds: 1
          add_led_interval: 100ms
          reverse: false

      - addressable_scan:
          name: "Scanner"
          move_interval: 100ms
          scan_width: 1

      - addressable_fireworks:
          name: "Fogos"
          update_interval: 32ms
          spark_probability: 10%
          use_random_color: true
          fade_out_rate: 120
```

### Exemplo: Efeito Lambda Customizado

```yaml
light:
  - platform: esp32_rmt_led_strip
    id: led_strip
    # ... config basica ...
    effects:
      - addressable_lambda:
          name: "Meu Efeito"
          update_interval: 16ms
          lambda: |-
            // Cor que se move pela fita
            static int position = 0;
            it.all() = Color::BLACK;
            it[position] = Color(255, 0, 0);
            position = (position + 1) % it.size();
```

### Exemplo: Lambda com Verificacao de Efeito (2026.1.0+)

```yaml
light:
  - platform: esp32_rmt_led_strip
    id: led_strip
    # ...

# Verificar efeito ativo (sintaxe 2026.1.0+)
interval:
  - interval: 1s
    then:
      - lambda: |-
          auto effect = id(led_strip).get_effect_name();
          if (!effect.empty()) {
            if (effect == "Rainbow") {
              ESP_LOGD("light", "Rainbow ativo");
            }
          }
```

---

## Compatibilidade por Framework

| Componente | Arduino | ESP-IDF | Notas |
|------------|---------|---------|-------|
| `esp32_rmt_led_strip` | N/A | **Sim** | Recomendado |
| `spi_led_strip` | Sim | **Sim** | APA102, SK9822 |
| `fastled_clockless` | Sim | **Nao** | Requer Arduino |
| `fastled_spi` | Sim | **Nao** | Requer Arduino |
| `neopixelbus` | Sim | **Nao** | Requer Arduino |
| `ac_dimmer` | Sim | **Sim** (2026.1+) | ESP-IDF novo |
| `shelly_dimmer` | Sim | Sim | |
| `monochromatic` | Sim | Sim | |
| `rgb`/`rgbw`/`rgbww` | Sim | Sim | |
| WLED effects | Sim | **Nao** | Requer Arduino |

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao por componente | Claude Code |
| 2026-01-27 | Criacao inicial | Claude Code |
