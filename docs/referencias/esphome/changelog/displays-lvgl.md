# Displays e LVGL - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Autor**: Claude Code
**Periodo coberto**: 2024.11.0 a 2026.1.x

> Este documento consolida todas as mudancas relacionadas a displays, LVGL, touchscreens,
> fontes e imagens extraidas dos changelogs oficiais do ESPHome.
> **Organizacao**: Por componente (facilitando consulta rapida).

---

## Indice de Componentes

| Componente | Secao | Breaking Changes |
|------------|-------|------------------|
| [LVGL](#lvgl) | Framework grafico | led->widget, spinbox step, dropdown symbols |
| [Display Drivers](#display-drivers) | Drivers unificados | qspi_amoled->qspi_dbi |
| [HUB75 LED Matrix](#hub75-led-matrix) | Paineis LED | - |
| [MIPI DSI](#mipi-dsi) | Displays DSI | - |
| [MIPI RGB](#mipi-rgb) | Displays RGB | - |
| [Touchscreens](#touchscreens) | Controladores touch | GT911/CST226 axis, CST816 binary, EKTF2232 pin |
| [SPI](#spi) | Configuracao SPI | mode->spi_mode |
| [Displays Especificos](#displays-especificos) | Modelos individuais | - |
| [Fontes e Imagens](#fontes-e-imagens) | Assets graficos | - |

---

## LVGL

Framework grafico Light and Versatile Graphics Library.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2024.11.0 | `led:` substituido por `widget:` em light | Breaking | Alto |
| 2024.11.0 | Software rotation melhorado | Melhoria | - |
| 2024.11.0 | QR Code widget implementado | Novo | - |
| 2024.11.0 | Keypads implementados | Novo | - |
| 2024.11.0 | Multiplas instancias permitidas | Novo | - |
| 2024.11.0 | Allow esphome::Image em lambda | Melhoria | - |
| 2024.11.0 | Roller e Dropdown enhancements | Melhoria | - |
| 2025.4.0 | Canvas widget | Novo | - |
| 2025.8.0 | Meter rotation fix | Bugfix | Baixo |
| 2025.8.0 | Color support para lv_color_t | Melhoria | - |
| 2025.9.0 | Spinbox: `step` -> `selected_digit` | Breaking | Alto |
| 2025.11.0 | Container widget | Novo | - |
| 2025.11.0 | Shorthand layout syntax | Melhoria | - |
| 2025.11.0 | Stretch support em flex | Novo | - |
| 2025.12.0 | Texto de botao direto (sem nested label) | Melhoria | - |
| 2025.12.0 | Auto row/column padding com pad_all | Melhoria | - |
| 2025.12.0 | Display sync option | Novo | - |
| 2026.1.0 | Dropdown symbols requerem Unicode >= 0x100 | Breaking | Medio |

### Breaking Changes e Migracoes

#### led -> widget (2024.11.0)

Schema de light LVGL mudou de `led:` para `widget:`:

```yaml
# ANTES (< 2024.11.0)
light:
  - platform: lvgl
    led: my_led_widget

# AGORA (>= 2024.11.0)
light:
  - platform: lvgl
    widget: my_led_widget
```

#### Spinbox step -> selected_digit (2025.9.0)

O parametro `step` foi substituido por `selected_digit`:

```yaml
# ANTES (< 2025.9.0)
lvgl:
  widgets:
    - spinbox:
        step: 10  # Incremento de 10

# AGORA (>= 2025.9.0)
lvgl:
  widgets:
    - spinbox:
        selected_digit: 1  # Indice do digito (0 = unidade, 1 = dezena, etc.)
```

#### Dropdown Symbols Unicode (2026.1.0)

Simbolos de dropdown (setas) agora requerem Unicode >= 0x100:

```yaml
# ANTES (pode causar problemas)
lvgl:
  widgets:
    - dropdown:
        symbol: "v"  # Caractere ASCII

# AGORA (recomendado)
lvgl:
  widgets:
    - dropdown:
        # Usar simbolos Unicode ou fontes com simbolos especiais
        # Os simbolos padrao do LVGL ja sao Unicode
```

#### Meter Rotation Fix (2025.8.0)

Corrigido problema de rotacao em widgets meter. Verificar configuracoes existentes em displays rotacionados.

### Novos Recursos

#### Container Widget (2025.11.0)

```yaml
lvgl:
  widgets:
    - container:
        id: my_container
        widgets:
          - label:
              text: "Item 1"
          - label:
              text: "Item 2"
```

#### Canvas Widget (2025.4.0)

```yaml
lvgl:
  widgets:
    - canvas:
        id: my_canvas
        width: 200
        height: 200
```

#### Shorthand Layout (2025.11.0)

```yaml
# ANTES
lvgl:
  widgets:
    - obj:
        layout:
          type: flex
          flex_flow: ROW_WRAP

# AGORA (shorthand)
lvgl:
  widgets:
    - obj:
        layout: flex
        flex_flow: ROW_WRAP
```

#### Texto de Botao Direto (2025.12.0)

```yaml
# ANTES
lvgl:
  widgets:
    - button:
        widgets:
          - label:
              text: "Click"

# AGORA (mais simples)
lvgl:
  widgets:
    - button:
        text: "Click"
```

#### Stretch Support (2025.11.0)

```yaml
lvgl:
  widgets:
    - obj:
        layout: flex
        widgets:
          - label:
              flex:
                grow: 1  # Stretch para preencher espaco
```

#### Display Sync (2025.12.0)

```yaml
lvgl:
  update_when_display_idle: true  # Sincroniza updates com display
```

---

## Display Drivers

Drivers de comunicacao para displays.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2024.11.0 | `qspi_amoled` renomeado para `qspi_dbi` | Breaking | Alto |
| 2025.9.0 | MIPI RGB driver unificado | Novo | - |
| 2025.8.0 | MIPI DSI para ESP32-P4 | Novo | - |

### Breaking Changes e Migracoes

#### qspi_amoled -> qspi_dbi (2024.11.0)

O componente foi renomeado e recebeu novos recursos:

```yaml
# ANTES (< 2024.11.0)
display:
  - platform: qspi_amoled
    model: RM690B0

# AGORA (>= 2024.11.0)
display:
  - platform: qspi_dbi
    model: RM690B0
```

---

## HUB75 LED Matrix

Paineis LED matrix HUB75.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.12.0 | Componente HUB75 adicionado | Novo | - |
| 2026.1.0 | Actions set_rotation e set_brightness | Novo | - |

### Exemplo de Uso

```yaml
display:
  - platform: hub75
    id: hub75_display
    width: 64
    height: 32
    chain_length: 2
    # Compativel com LVGL

lvgl:
  displays:
    - hub75_display
```

### Plataformas Suportadas

| ESP32 | Interface |
|-------|-----------|
| ESP32 original | I2S |
| ESP32-S3 | LCD CAM + GDMA |
| ESP32-C6, P4 | PARLIO |

### Actions (2026.1.0)

```yaml
# Rotation dinamica
- hub75.set_rotation:
    id: hub75_display
    rotation: 90

# Controle de brilho
- hub75.set_brightness:
    id: hub75_display
    brightness: 0.8
```

---

## MIPI DSI

Displays MIPI DSI (ESP32-P4).

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.8.0 | Suporte MIPI DSI para ESP32-P4 | Novo | - |

### Exemplo de Uso

```yaml
display:
  - platform: mipi_dsi
    id: my_dsi_display
    # Requer ESP32-P4
```

### Caracteristicas

- Hardware-accelerated rendering
- CPU overhead significativamente menor vs SPI
- Qualidade profissional

---

## MIPI RGB

Displays MIPI RGB.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.9.0 | Driver MIPI RGB unificado | Novo | - |

### Exemplo de Uso

```yaml
display:
  - platform: mipi_rgb
    id: my_display
    # Configuracao especifica do display
```

### Caracteristicas

- Hardware acceleration
- High refresh rates
- Reduced CPU overhead

---

## Touchscreens

Controladores de touch.

### Tabela de Mudancas

| Versao | Componente | Mudanca | Tipo | Impacto |
|--------|------------|---------|------|---------|
| 2024.11.0 | AXS15231 | Novo driver | Novo | - |
| 2024.11.0 | Geral | Calibration fixes | Melhoria | - |
| 2025.3.0 | GT911, CST226, EKTF2232 | Axis swap bugfix | Breaking | Alto |
| 2025.3.0 | CST816 | Binary sensor removido | Breaking | Alto |
| 2025.3.0 | CHSC6X | Novo driver | Novo | - |
| 2025.10.0 | EKTF2232 | `rts_pin` -> `reset_pin` | Breaking | Medio |

### Breaking Changes e Migracoes

#### GT911, CST226, EKTF2232 - Axis Swap Fix (2025.3.0)

Corrigido bug de troca de eixos X/Y. Se voce tinha calibracao manual para compensar o bug, pode ser necessario recalibrar ou remover a compensacao.

```yaml
# Verificar se calibracao ainda esta correta apos update
touchscreen:
  - platform: gt911
    calibration:
      x_min: 0
      x_max: 320
      y_min: 0
      y_max: 480
```

#### CST816 - Binary Sensor Removido (2025.3.0)

```yaml
# ANTES (< 2025.3.0)
binary_sensor:
  - platform: cst816
    name: "Touch"

# AGORA (>= 2025.3.0) - Usar touchscreen events ou LVGL
touchscreen:
  - platform: cst816
    on_touch:
      - logger.log: "Touched!"
```

#### EKTF2232 - rts_pin -> reset_pin (2025.10.0)

```yaml
# ANTES (< 2025.10.0)
touchscreen:
  - platform: ektf2232
    rts_pin: GPIO4

# AGORA (>= 2025.10.0)
touchscreen:
  - platform: ektf2232
    reset_pin: GPIO4
```

### Novos Drivers

#### AXS15231 (2024.11.0)

```yaml
touchscreen:
  - platform: axs15231
    interrupt_pin: GPIO4
```

#### CHSC6X (2025.3.0)

```yaml
touchscreen:
  - platform: chsc6x
    interrupt_pin: GPIO4
```

### Lista de Touchscreens Suportados

- GT911
- CST816, CST226
- FT5x06, FT6336
- EKTF2232
- AXS15231
- CHSC6X

---

## SPI

Configuracao SPI para displays.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2024.11.0 | `mode` renomeado para `spi_mode` | Breaking | Medio |
| 2025.4.0 | Suporte a SPI octal | Novo | - |

### Breaking Changes e Migracoes

#### mode -> spi_mode (2024.11.0)

Em `spi_device`, `mode` foi renomeado para `spi_mode`:

```yaml
# ANTES (< 2024.11.0)
spi_device:
  mode: 0

# AGORA (>= 2024.11.0)
spi_device:
  spi_mode: 0
```

---

## Displays Especificos

Modelos de display individuais.

### Tabela de Mudancas

| Versao | Display | Mudanca | Tipo |
|--------|---------|---------|------|
| 2025.3.0 | GC9D01N | Display circular via ili9xxx | Novo |
| 2025.8.0 | CO5300 | Novo display suportado | Novo |
| 2025.10.0 | ePaper SPI | Interface unificada | Melhoria |
| 2025.12.0 | Waveshare 4.26" e-paper | Driver SSD1677 | Novo |
| 2025.12.0 | Waveshare S3 LCD 3.16" | Novo suporte | Novo |
| 2025.12.0 | Guition JC4827W543 | 480x272 | Novo |
| 2025.12.0 | Guition JC4880P443 | 480x800 MIPI DSI | Novo |
| 2025.12.0 | M5Stack Core2 | Novo suporte | Novo |

### GC9D01N - Display Circular (2025.3.0)

```yaml
display:
  - platform: ili9xxx
    model: GC9D01N
    # Display circular
```

### Waveshare ePaper (2025.12.0)

| Modelo | Driver |
|--------|--------|
| 4.26" e-paper | SSD1677 |
| S3 LCD 3.16" | - |

### Guition (2025.12.0)

| Modelo | Resolucao | Interface |
|--------|-----------|-----------|
| JC4827W543 | 480x272 | SPI |
| JC4880P443 | 480x800 | MIPI DSI |

### Categorias de Displays

#### Displays OLED
- SSD1306, SSD1325, SSD1327, SSD1351
- SH1106, SH1107

#### Displays LCD
- ILI9xxx (ILI9341, ILI9488, etc.)
- ST7735, ST7789, ST7796
- GC9A01, GC9D01N (circulares)

#### Displays ePaper
- Waveshare (multiplos modelos)
- SSD1677, SSD1680

---

## Fontes e Imagens

Assets graficos.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2024.11.0 | Glyphsets para fontes | Novo | - |
| 2024.11.0 | Transparencia RGB565 corrigida | Bugfix | - |
| 2024.11.0 | filled_ring e filled_gauge | Novo | - |
| 2025.3.0 | Freetype ao inves de Pillow | Melhoria | - |
| 2025.7.0 | Color constant storage otimizado | Melhoria | - |
| 2026.1.0 | Brotli compression para web assets | Melhoria | - |

### Font Glyphsets (2024.11.0)

Otimiza uso de memoria incluindo apenas caracteres necessarios:

```yaml
font:
  - file: "fonts/roboto.ttf"
    id: my_font
    size: 20
    glyphsets:
      - "0123456789"
      - "ABCDEF"
```

### Display Methods (2024.11.0)

```yaml
display:
  - platform: ...
    lambda: |-
      it.filled_ring(100, 100, 50, 30, COLOR_ON);
      it.filled_gauge(100, 100, 50, 30, 0, 270, COLOR_ON);
```

### Freetype (2025.3.0)

Renderizacao de fontes agora usa Freetype diretamente, mais robusto e preciso.

### Brotli Compression (2026.1.0)

Compressao Brotli agora e padrao para web assets (incluindo fontes e imagens no web_server), economizando ~9.4KB.

---

## Checklist de Migracao

### De versao < 2024.11.0

- [ ] Renomear `qspi_amoled` para `qspi_dbi`
- [ ] Atualizar LVGL light de `led:` para `widget:`
- [ ] Renomear SPI `mode` para `spi_mode`

### De versao < 2025.3.0

- [ ] Verificar calibracao de touchscreens GT911, CST226, EKTF2232
- [ ] Remover binary_sensor do CST816 se usado

### De versao < 2025.9.0

- [ ] Atualizar LVGL spinbox de `step` para `selected_digit`

### De versao < 2025.10.0

- [ ] Renomear EKTF2232 `rts_pin` para `reset_pin`

### De versao < 2026.1.0

- [ ] Verificar fontes usadas em dropdown symbols (Unicode >= 0x100)

---

## Referencias

- [ESPHOME_CHANGELOG_COMPLETO.md](../../../src/firmware/ESPHOME_CHANGELOG_COMPLETO.md) - Changelog completo
- [ESPHOME_REFERENCE.md](../../../src/firmware/ESPHOME_REFERENCE.md) - Referencia rapida
- [ESPHome LVGL Docs](https://esphome.io/components/lvgl/)
- [ESPHome Display Docs](https://esphome.io/components/display/)
