# Código ESPHome - Termostatos UEDX48480040E-WB-A

> **⚠️ Configurações Críticas:**  
> Para evitar flicker (tremulação) e garantir cores corretas no display GC9503V:
> ```yaml
> display:
>   platform: mipi_rgb
>   pixel_mode: 18bit      # Corrige as cores
>   pclk_frequency: 14MHz  # Reduz flicker/tremulação
> ```
> Outros valores podem causar cores erradas ou tela piscando!

---

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| ⭐ `base_uedx48480040e.yml` | **Código base/template** - Todas as configurações de hardware otimizadas |
| `termostato_480x480.yml` | Interface completa do termostato para piso aquecido (LVGL) |

---

## 📦 Arquivo Base (`base_uedx48480040e.yml`)

Template com todas as configurações de hardware validadas e otimizadas:

- ✅ ESP32-S3 (240MHz, 16MB Flash, PSRAM Octal 80MHz)
- ✅ Display GC9503V com init_sequence completa
- ✅ Touchscreen FT6336U configurado
- ✅ Backlight PWM (GPIO38)
- ✅ LVGL otimizado (buffer 100%, full_refresh)
- ✅ Fontes Roboto em 4 tamanhos (18, 24, 32, 48)
- ✅ Estilos base reutilizáveis (cards, botões)
- ✅ Idle timeout para economia de energia

**Como usar:** Copie o arquivo, altere o `substitutions` e adicione suas próprias páginas LVGL!

---

## 🔥 Termostato (`termostato_480x480.yml`)

Interface completa para controle de piso aquecido:

### Funcionalidades:
- Ajuste de temperatura alvo (+/- 0.5°C)
- Leitura de temperatura atual (via Home Assistant)
- Indicador visual de aquecimento (ícone chama)
- Botão on/off do termostato
- Página de configurações (histerese, temp. mín/máx)
- Relé de aquecimento (GPIO20)

### Páginas:
1. **Principal** - Temperatura atual, alvo e controles
2. **Configurações** - Histerese, limites de temperatura

---

## 🚀 Configuração Rápida

### 1. Criar secrets.yaml

```bash
cp ../../common/secrets.yaml.example secrets.yaml
```

Edite com suas credenciais:

```yaml
wifi_ssid: "SuaRedeWiFi"
wifi_password: "SuaSenha"
```

### 2. Compilar e Upload

**Via ESPHome Dashboard:**
```bash
esphome dashboard .
```

**Via linha de comando:**
```bash
esphome run termostato_480x480.yml
```

---

## 🔧 Hardware

| Componente | Especificação |
|------------|---------------|
| **Display** | UEDX48480040E-WB-A (4" 480x480) |
| **Driver LCD** | GC9503V (RGB Paralelo) |
| **Touch** | FT6336U (I2C Capacitivo) |
| **MCU** | ESP32-S3 (16MB Flash, 8MB PSRAM) |
| **Backlight** | GPIO38 (PWM 10kHz) |

---

## 📌 Pinout

### Display (RGB Paralelo)
| Função | GPIO |
|--------|------|
| SPI CLK | 48 |
| SPI MOSI | 47 |
| SPI CS | 39 |
| Reset | 44 |
| DE | 18 |
| HSYNC | 16 |
| VSYNC | 17 |
| PCLK | 21 |
| R0-R4 | 0-4 |
| G0-G5 | 5-10 |
| B0-B4 | 11-15 |

### Touch (I2C)
| Função | GPIO |
|--------|------|
| SDA | 40 |
| SCL | 41 |

### Termostato
| Função | GPIO |
|--------|------|
| Backlight | 38 |
| Relé Aquecimento | 20 |

---

## 🐛 Troubleshooting

### Display não liga
- Verificar sequência de inicialização GC9503V
- Verificar pinos SPI (47, 48, 39)
- Verificar alimentação 5V/2A

### Touch não responde
- Verificar endereço I2C (0x38 para FT6336U)
- Verificar pinos SDA/SCL (40/41)
- Executar `i2c scan` nos logs

### Cores erradas ou flicker
- **Usar `pixel_mode: 18bit`**
- **Usar `pclk_frequency: 14MHz`**
- Verificar `color_order: RGB`

---

## 🔗 Referências

- [ESPHome Display MIPI RGB](https://esphome.io/components/display/rpi_dpi_rgb.html)
- [ESPHome LVGL](https://esphome.io/components/lvgl/)
- [ESPHome Touchscreen FT63x6](https://esphome.io/components/touchscreen/ft63x6.html)
- [Repositório VIEWESMART](https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display)

---

**Última atualização**: 13/01/2026  
**Versão**: 2.0.0
