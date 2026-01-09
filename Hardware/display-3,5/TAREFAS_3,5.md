# 📋 PLANO DE MIGRAÇÃO - Display 7" → Display 3.5"

## 🎯 Objetivo
Replicar a estrutura modular do Display 7" para o Display 3.5" com adaptações de hardware e resolução.

---

## 📊 Análise Comparativa

| Aspecto | Display 7" | Display 3.5" | Diferença |
|---------|------------|--------------|-----------|
| **Resolução** | 800x480 px | 480x320 px | -40% largura, -33% altura |
| **Diagonal** | 7" | 3.5" | 50% menor |
| **Interface Display** | RGB Paralelo | SPI (ST7796) | Diferente |
| **Framework** | ESP-IDF | Arduino | Diferente |
| **PSRAM** | Octal 8MB | Não configurada | Diferente |
| **Touch** | GT911 I2C | GT911 I2C | ✅ Igual |
| **Chip** | ESP32-S3 | ESP32-S3 | ✅ Igual |
| **WiFi** | Mesma | Mesma | ✅ Igual |
| **Entidades HA** | Mesmas | Mesmas | ✅ Igual |

---

## 🎨 PROPOSTAS DE ADAPTAÇÃO (Aguardando Aprovação)

### **1. Tamanho dos Botões** 📱

#### **Proposta Calculada**:
- **Display 7"**: Botões 100x100px, 7 por linha
- **Display 3.5"**: Botões **70x70px**, **5 por linha**

**Justificativa**:
- 70px é confortável para toque
- Cabem 5 botões por linha (70×5 + espaços = 450px, sobram 30px margens)
- Proporção mantida (~70% do original)

**Layout sugerido**:
```
Linha 1: [Btn1] [Btn2] [Btn3] [Btn4] [Btn5]
Linha 2: [Btn6] [Btn7] [Btn8] [Btn9] [Btn10]
Linha 3: [AC]   (se aplicável)
```

**Você aprova ou quer ajustar?**

---

### **2. Popups dos ACs** ❄️

#### **Proposta**:
- **Display 7"**: Popup 500x300px (tela 800x480)
- **Display 3.5"**: Popup **450x280px** (tela 480x320)

**Justificativa**:
- Ocupa ~94% da tela (vs 62% no 7")
- Mantém margens de 15px de cada lado
- Todos os controles visíveis
- Fica em destaque (modal)

**Conteúdo do popup (mantido)**:
- Temperatura atual (grande)
- 3 botões de modo (off/cool/heat)
- Botões +/- temperatura
- 4 botões de ventilador
- Botão X para fechar

**Você aprova ou quer ajustar?**

---

### **3. Fontes (Proporcional Automático)** 🔤

#### **Conversão Proporcional** (fator 0.65):

| Display 7" | Display 3.5" | Uso |
|------------|--------------|-----|
| roboto90 | roboto60bold | Relógio grande |
| roboto55bold | roboto35bold | Títulos |
| roboto40bold | roboto26bold | Popups AC |
| roboto40 | roboto26 | Textos grandes |
| roboto30bold | roboto20bold | Subtítulos |
| roboto30 | roboto20 | Texto médio |
| roboto24 | roboto16 | Ícones menu |
| roboto23 | roboto15 | Títulos páginas |
| roboto22 | roboto14 | Labels botões |
| light64 | light42 | Ícones grandes |
| light32 | light20 | Ícones pequenos |

**Isso será aplicado automaticamente.**

---

### **4. Imagem de Fundo** 🖼️

Vou gerar uma imagem **480x320px** com gradiente escuro.

---

## 📋 DIFERENÇAS DE HARDWARE (Crítico!)

### **Hardware do Display 7"**:
```yaml
Framework: ESP-IDF
Display: RGB Paralelo (16 pinos data)
PSRAM: Octal 8MB
Flash: 16MB
Backlight: GPIO2
Touch I2C: GPIO19/20
```

### **Hardware do Display 3.5"**:
```yaml
Framework: Arduino
Display: ST7796 via SPI (GPIO14/13/12)
PSRAM: Não configurada
Flash: 4MB
Backlight: GPIO27
Touch I2C: GPIO33/32
Display CS: GPIO15
Display DC: GPIO2
Display MISO: GPIO19
```

---

## 🚀 PLANO DE EXECUÇÃO (14 Tarefas)

### 🔴 **FASE 1: Preparação** (10 minutos)

#### ✅ Tarefa 1: Criar Estrutura de Pastas
**Tempo**: 2 minutos  
**Ação**: Criar mesma estrutura de packages/ na pasta display-3,5

```
display-3,5/
├── packages/
│   ├── core/
│   ├── ui/
│   ├── rooms/
│   ├── climate/
│   └── entities.yaml
```

---

#### ✅ Tarefa 2: Criar Hardware Config Adaptado
**Tempo**: 3 minutos  
**Arquivo**: `packages/core/hardware.yaml`  
**Mudanças críticas**:
- Framework: Arduino (não ESP-IDF)
- Display: ili9xxx ST7796 SPI
- Pinos SPI display
- Sem PSRAM (ou quad 4MB se necessário)
- Flash: 4MB (não 16MB)
- Pinos I2C touch: GPIO33/32
- Backlight: GPIO27

---

#### ✅ Tarefa 3: Copiar Core Files (Network, Time)
**Tempo**: 1 minuto  
**Ação**: Copiar identicamente:
- `packages/core/network.yaml`
- `packages/core/time.yaml`

---

#### ✅ Tarefa 4: Copiar Entities
**Tempo**: 1 minuto  
**Ação**: Copiar `packages/entities.yaml` (entidades são iguais)

---

#### ✅ Tarefa 5: Copiar Climate Sensors
**Tempo**: 1 minuto  
**Ação**: Copiar `packages/climate/ac_sensors.yaml` (entidades são iguais)

---

#### ✅ Tarefa 6: Gerar Imagem de Fundo 480x320
**Tempo**: 2 minutos  
**Ação**: Criar `images/dashboard_480x320.jpg`  
**Tamanho**: 480x320 pixels, RGB, gradiente escuro

---

### 🟠 **FASE 2: Adaptação UI** (30 minutos)

#### ✅ Tarefa 7: Adaptar Fontes Proporcionalmente
**Tempo**: 5 minutos  
**Arquivo**: `packages/ui/fonts.yaml`  
**Ação**: Criar versão com tamanhos reduzidos conforme tabela acima

---

#### ✅ Tarefa 8: Adaptar Estilos
**Tempo**: 3 minutos  
**Arquivo**: `packages/ui/styles.yaml`  
**Mudanças**:
- Barra navegação: 32px altura (vs 40px)
- Área útil: 100% height - 32px
- Estilos mantidos (cores, bordas, etc)

---

#### ✅ Tarefa 9: Adaptar Top Layer (Menu e Navegação)
**Tempo**: 5 minutos  
**Arquivo**: `packages/ui/top_layer.yaml`  
**Mudanças**:
- Relógio: 70px width, fonte menor
- Botões menu: ajustar posição para 480px largura
- Menu popup: 25% width = 120px (vs 200px)

---

#### ✅ Tarefa 10: Criar Images Config
**Tempo**: 1 minuto  
**Arquivo**: `packages/ui/images.yaml`  
**Conteúdo**:
```yaml
image:
  - file: "images/dashboard_480x320.jpg"
    id: disp_bg
    resize: 480x320
    type: RGB565
```

---

### 🟢 **FASE 3: Páginas de Cômodos** (40 minutos)

#### ✅ Tarefa 11: Adaptar Página SALA
**Tempo**: 10 minutos  
**Arquivo**: `packages/rooms/sala.yaml`  
**Layout proposto** (480x320):

```
┌─────────────────────────────────────────────┐
│ Temp  │        SALA         │     Relógio   │ ← 55px
├─────────────────────────────────────────────┤
│ [Btn1] [Btn2] [Btn3] [Btn4] [Btn5]         │ ← 70x70px, y=65
│ [Btn6] [Btn7] [Btn8] [Btn9] [Btn10]        │ ← 70x70px, y=145
│                              [AC]           │ ← 70x70px, y=225
├─────────────────────────────────────────────┤
│   ◀       🏠       ▶               💡OFF    │ ← 32px
└─────────────────────────────────────────────┘
```

**Botões**:
- Tamanho: 70x70px
- Espaçamento: 10px entre botões
- Posições X: 15, 95, 175, 255, 335 (5 por linha)
- Posições Y: 65, 145, 225

**Popup AC**:
- Tamanho: 450x280px
- Temperatura: roboto26bold
- Botões controle: 35x35px
- Mantém todos os controles

---

#### ✅ Tarefa 12: Adaptar Página COZINHA
**Tempo**: 8 minutos  
**Layout**: 6 botões em 2 linhas (3+3 ou 5+1)

---

#### ✅ Tarefa 13: Adaptar Páginas ESCRITÓRIO, SUÍTE, QUARTOS
**Tempo**: 20 minutos  
**Ação**: Adaptar cada página com layout calculado

---

### 🔵 **FASE 4: Integração e Testes** (20 minutos)

#### ✅ Tarefa 14: Criar Arquivo Principal
**Tempo**: 3 minutos  
**Arquivo**: `disp-3.5-modular.yaml`  
**Conteúdo**: Igual ao display-7-porta.yaml mas com devicename correto

---

#### ✅ Tarefa 15: Compilar e Testar
**Tempo**: 5 minutos  
**Comandos**:
```bash
cd "C:\Users\Toniezzer-PC\Meu Drive\cursor\display-3,5"
esphome compile disp-3.5-modular.yaml
```

**Validações**:
- [ ] Compilação sem erros
- [ ] Tamanho firmware < 4MB (flash disponível)
- [ ] RAM < 320KB

---

#### ✅ Tarefa 16: Upload e Validação Final
**Tempo**: 10 minutos  
**Testes no display**:
- [ ] Display inicializa (480x320)
- [ ] Touch responde
- [ ] Botões visíveis e clicáveis
- [ ] Popups AC aparecem corretamente
- [ ] Navegação funciona
- [ ] Todas as 5 páginas acessíveis

---

## 📐 ESPECIFICAÇÕES TÉCNICAS DETALHADAS

### **Posicionamento de Botões** (480x320)

#### **Layout Proposto - 5 Botões por Linha**:
```
Largura disponível: 480px
Margem lateral: 15px cada
Espaço útil: 450px
Botões: 70x70px
Espaçamento: 10px

Posições X (5 botões):
- Btn1: x=15
- Btn2: x=95
- Btn3: x=175
- Btn4: x=255
- Btn5: x=335
- AC (se tiver): x=395

Posições Y (3 linhas máx):
- Linha 1: y=65  (após título de 55px)
- Linha 2: y=145 (70px + 10px espaço)
- Linha 3: y=225 (70px + 10px espaço)
- Margem inferior: 32px (barra navegação)
```

### **Popups AC** (450x280):
```yaml
Tamanho: 450x280px
Posição: center
Margens: 15px laterais, 20px vertical

Elementos internos:
- Título: roboto20bold (vs roboto30bold)
- Temperatura: roboto26bold (vs roboto40bold)
- Botões modo/fan: 35x35px (vs 40x40px)
- Botões +/-: 35x35px (vs 40x40px)
- Espaçamentos: 8px (vs 10px)
```

### **Barra de Navegação** (480x32):
```
Altura: 32px (vs 40px)
Largura: 100%

Elementos:
- Botão anterior: x=0-80
- Botão home: x=200-280
- Botão próximo: x=400-480
- Ícones: roboto16 (vs roboto24)
```

### **Menu de Cômodos**:
```
Largura: 20% (96px vs 200px)
Botões: 90px width, 32px height (vs 150x40)
Fonte: roboto14 (vs roboto22)
```

---

## ⚙️ CONFIGURAÇÃO DE HARDWARE

### **Arquivo: packages/core/hardware.yaml (Display 3.5")**

```yaml
esp32:
  board: esp32-s3-devkitc-1
  variant: ESP32S3
  flash_size: 4MB
  framework:
    type: arduino  # ← IMPORTANTE: Não é ESP-IDF!

## Dois barramentos SPI (display tem seu próprio)
spi:
  - id: tft
    clk_pin: GPIO14
    mosi_pin: GPIO13
    miso_pin: GPIO12
  - id: touch_spi  # (se necessário)
    clk_pin: GPIO18
    mosi_pin: GPIO23
    miso_pin: GPIO19

## I2C para touch GT911
i2c:
  sda: GPIO33
  scl: GPIO32
  scan: true

## Backlight PWM
output:
  - platform: ledc
    pin: GPIO27  # ← Diferente do 7" (GPIO2)
    frequency: 300
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: ${devicename} Display Backlight
    id: back_light
    restore_mode: ALWAYS_ON

## Touchscreen GT911
touchscreen:
  - platform: gt911
    id: my_touchscreen
    interrupt_pin: GPIO21
    reset_pin: GPIO25
    address: 0x5D  # Tente 0x14 se não funcionar
    display: main_display
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - logger.log: "LVGL resuming"
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: back_light

## Display ST7796 via SPI
display:
  - platform: ili9xxx
    model: ST7796
    id: main_display
    spi_id: tft
    cs_pin: GPIO15
    dc_pin: GPIO2
    rotation: 0
    dimensions:
      width: 480
      height: 320
    invert_colors: false
    update_interval: never
    auto_clear_enabled: false
```

---

## 📊 CRONOGRAMA ESTIMADO

### **Tempo Total**: ~70 minutos

| Fase | Tarefas | Tempo |
|------|---------|-------|
| **Preparação** | 1-6 | 10 min |
| **UI** | 7-10 | 30 min |
| **Páginas** | 11-13 | 40 min |
| **Testes** | 14-16 | 20 min |

**TOTAL**: ~1h40min (inclui testes)

---

## ⚠️ DESAFIOS PREVISTOS

### **1. Memória RAM** ⚠️
- Display 7" usa PSRAM (512KB extra)
- Display 3.5" sem PSRAM configurada
- **Solução**: Otimizar imagens e fontes

**Se der erro de memória**:
- Reduzir qualidade da imagem de fundo
- Usar menos fontes carregadas
- Simplificar popups (se necessário)

### **2. Framework Diferente** ⚠️
- Display 7" usa ESP-IDF (mais recursos)
- Display 3.5" usa Arduino (limitações)
- **Solução**: Alguns componentes podem precisar ajustes

### **3. Performance SPI** ⚠️
- SPI é mais lento que RGB paralelo
- Pode haver lag ao trocar páginas
- **Solução**: `update_interval: never` já configurado

---

## ✅ APROVAÇÕES NECESSÁRIAS

Antes de começar a implementação, preciso que você aprove:

### **1. Tamanho dos Botões**: 70x70px, 5 por linha
- [ ] ✅ Aprovado
- [ ] ❌ Quero ajustar para: _____

### **2. Tamanho dos Popups**: 450x280px
- [ ] ✅ Aprovado
- [ ] ❌ Quero ajustar para: _____

### **3. Fontes**: Conversão proporcional automática (tabela acima)
- [ ] ✅ Aprovado
- [ ] ❌ Quero revisar

### **4. Layout**: Conforme especificações técnicas acima
- [ ] ✅ Aprovado e pode começar
- [ ] ❌ Tenho dúvidas sobre: _____

---

## 🎯 PRÓXIMA AÇÃO

**Aguardando sua aprovação das 4 propostas acima.**

Após aprovação, começarei pela **Tarefa 1** criando a estrutura de pastas.

---

## 📝 NOTAS IMPORTANTES

1. **Backup**: O arquivo atual `disp_3.5.yaml` será mantido como backup
2. **Novo arquivo**: `disp-3.5-modular.yaml` será criado
3. **Compatibilidade**: Todas as entidades do HA são mantidas iguais
4. **Mesma funcionalidade**: Tudo que funciona no 7" funcionará no 3.5"
5. **Documentação**: Mesma documentação será copiada e adaptada

---

## 🔄 DIFERENÇAS QUE SERÃO MANTIDAS

**NÃO vou tentar forçar**:
- ✅ Framework Arduino (não ESP-IDF) - **mantém Arduino**
- ✅ Display SPI (não RGB) - **mantém SPI**
- ✅ Sem PSRAM - **funciona sem (ou add quad se precisar)**
- ✅ Flash 4MB - **ajusto partições**

---

**📅 Criado**: 12/Outubro/2025  
**📊 Status**: ⏳ **AGUARDANDO APROVAÇÃO**  
**🎯 Pronto para**: Implementação imediata após aprovação

---

**Digite "APROVADO" para começar ou ajuste as propostas acima!** 🚀

