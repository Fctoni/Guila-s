# ESP32 Termostatos - Piso Aquecido

## 📝 GUIA PARA IA FUTURA

Este diretório contém os firmwares dos termostatos touch para controle de piso aquecido.

---

## 🔥 Hardware

| Especificação | Detalhes |
|---------------|----------|
| **Modelo Display** | UEDX48480040E-WB-A |
| **Tamanho** | 4" quadrado (480x480 pixels) |
| **Driver LCD** | GC9503V (RGB Paralelo) |
| **Touch** | FT6336U (I2C Capacitivo) |
| **MCU** | ESP32-S3 (16MB Flash, 8MB PSRAM Octal) |
| **Quantidade** | 10 termostatos |
| **Conexão** | WiFi |
| **VLAN** | 20 (IoT Sensores) |
| **Framework** | ESPHome + LVGL |

### Repositório do Fabricante
https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display

---

## 📁 Estrutura de Pastas

```
/ESP32-Termostatos/
├── README.md                    (este arquivo)
├── codigo_esphome/
│   ├── README.md                (documentação técnica detalhada)
│   ├── base_uedx48480040e.yml   ⭐ Código base/template
│   └── termostato_480x480.yml   Interface do termostato
└── lvgl-interface/
    └── README.md                (guia de interfaces LVGL)
```

---

## 📦 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| ⭐ `codigo_esphome/base_uedx48480040e.yml` | **Template base** - Configurações de hardware otimizadas (14MHz, 18bit) para novos projetos |
| `codigo_esphome/termostato_480x480.yml` | Interface completa do termostato com controle de temperatura |

### Código Base (`base_uedx48480040e.yml`)

Arquivo template com todas as configurações de hardware validadas:

- ✅ ESP32-S3 (240MHz, PSRAM Octal 80MHz)
- ✅ Display GC9503V com init_sequence completa
- ✅ Touchscreen FT6336U configurado
- ✅ Backlight PWM (GPIO38)
- ✅ LVGL otimizado (buffer 100%, full_refresh)
- ✅ Fontes Roboto (4 tamanhos)
- ✅ Estilos base reutilizáveis
- ✅ Idle timeout para economia de energia

---

## 🎨 Interface do Termostato

### Funcionalidades:
- **Temperatura alvo** - Ajuste com botões +/- (0.5°C)
- **Temperatura atual** - Leitura do sensor via Home Assistant
- **Aquecimento** - Indicador visual (ícone de chama)
- **On/Off** - Botão para habilitar/desabilitar
- **Configurações** - Histerese, temp. mínima/máxima

### Estilo Visual:
- Fundo escuro (preto)
- Fonte grande para temperatura (140px)
- Ícones Material Design
- Animações suaves entre páginas

### Sleep Mode:
- Dim backlight: 60s (30%)
- Desliga backlight: 120s
- Toque acorda o display

---

## ⚠️ Configurações Críticas

> **Para evitar flicker e cores erradas:**
> ```yaml
> display:
>   platform: mipi_rgb
>   pixel_mode: 18bit      # Cores corretas
>   pclk_frequency: 14MHz  # Sem flicker
> ```

---

## 🔌 Pinout

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

### Outros
| Função | GPIO |
|--------|------|
| Backlight | 38 |
| Relé Aquecimento | 20 |

---

## 📋 Nomenclatura dos Dispositivos

Os termostatos seguem o padrão:
- `termostato-piso-suite-master`
- `termostato-piso-suite-1`
- `termostato-piso-suite-2`
- `termostato-piso-banheiro-master`
- `termostato-piso-banheiro-1`
- `termostato-piso-banheiro-2`
- `termostato-piso-lavabo`
- `termostato-piso-cozinha`
- `termostato-piso-sala`
- `termostato-piso-home-office`

---

## 🔗 Referências

- [ESPHome LVGL](https://esphome.io/components/lvgl/)
- [ESPHome Display MIPI RGB](https://esphome.io/components/display/rpi_dpi_rgb.html)
- [ESPHome Touchscreen FT63x6](https://esphome.io/components/touchscreen/ft63x6.html)
- [Repositório VIEWESMART](https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display)

---

**Status**: 🟢 Em desenvolvimento ativo  
**Última atualização**: 13/01/2026
