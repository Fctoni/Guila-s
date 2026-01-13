# Interfaces LVGL - Termostatos

## 📝 GUIA PARA IA FUTURA

Este diretório contém documentação e recursos para as interfaces LVGL dos termostatos.

---

## 🎨 Design do Termostato

### Páginas:

#### 1. Página Principal (`main_page`)
- Título "Piso Aquecido"
- Botão Power (on/off)
- Temperatura alvo (fonte 140px)
- Temperatura atual (fonte 72px)
- Botões +/- para ajuste
- Ícone de chama quando aquecendo
- Botão de configurações

#### 2. Página de Configurações (`config_page`)
- Botão voltar
- Ajuste de histerese (0.1 - 2.0°C)
- Temperatura mínima (10 - 24°C)
- Temperatura máxima (25 - 35°C)
- Informações do sistema (IP, WiFi)

---

## 🎨 Estilo Visual

### Cores:
| Elemento | Cor (Hex) |
|----------|-----------|
| Fundo | `0x000000` (preto) |
| Texto principal | `0xFFFFFF` (branco) |
| Temperatura atual | `0x4FC3F7` (azul claro) |
| Aquecimento ativo | `0xFF6B35` (laranja) |
| Graus Celsius | `0x0000FF` (azul) |
| Botão power ativo | `0xFF0000` (vermelho) |
| Botão power inativo | `0x0F3460` (azul escuro) |

### Fontes:
| ID | Tamanho | Uso |
|----|---------|-----|
| `font_small` | 20px | Labels secundários |
| `font_medium` | 28px | Textos gerais |
| `font_large` | 42px | Títulos |
| `font_temp_huge` | 140px | Temperatura alvo |
| `font_temp_large` | 72px | Temperatura atual |
| `font_celsius` | 48px | Símbolo °C |

### Ícones Material Design:
| Código | Ícone | Uso |
|--------|-------|-----|
| `\U000F0238` | 🔥 fire | Aquecimento ativo |
| `\U000F050F` | 🌡️ thermometer | Botão power |
| `\U000F08BB` | ⚙️ cog | Configurações |
| `\U000F0374` | ➖ minus | Diminuir temperatura |
| `\U000F0415` | ➕ plus | Aumentar temperatura |
| `\U000F004D` | ⬅️ arrow-left | Voltar |

---

## 📐 Layout (480x480)

```
┌──────────────────────────────────────────┐
│  [Piso Aquecido]              [Power]    │  Header (70px)
├──────────────────────────────────────────┤
│                                          │
│              ┌─────────────┐             │
│              │   22.5°C    │   [🔥]      │  Card Temp (260px)
│              │  Desejada   │             │
│              └─────────────┘             │
│                                          │
├──────────────────────────────────────────┤
│   [−]        20.5°C         [+]    [⚙️]  │  Controles (160px)
│              Atual                       │
└──────────────────────────────────────────┘
```

---

## ⏰ Sleep Mode

| Timeout | Ação |
|---------|------|
| 60s | Dim backlight para 30% |
| 120s | Desliga backlight + pausa LVGL |
| Toque | Acorda display |

---

## 🔧 Componentes LVGL Utilizados

- `obj` - Containers e cards
- `label` - Textos e ícones
- `button` - Botões interativos
- `flex` - Layout flexbox

---

**Status**: 🟢 Implementado  
**Última atualização**: 13/01/2026
