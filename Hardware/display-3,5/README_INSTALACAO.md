# 📱 Display ESPHome 3.5" - Guia Completo

## ✅ Arquivos Criados

### 1. **disp_3.5.yaml** (PRINCIPAL)
Arquivo principal do ESPHome adaptado para display 480x320

### 2. **COMPLEMENTO_disp_3.5.yaml**
Seções adicionais que devem ser ADICIONADAS ao arquivo principal:
- Popups AC completos (Suite, Q.Davi, Q.3)
- Binary sensors de todos os botões
- Text sensors dos ACs
- Correções de eventos dos botões

### 3. **gerar_imagem_fundo.py**
Script Python para gerar a imagem de fundo automaticamente

### 4. **images/README_IMAGEM.md**
Instruções detalhadas sobre como criar/gerar a imagem de fundo

---

## 🚀 Passos para Finalização

### PASSO 1: Gerar a Imagem de Fundo

#### Opção A: Usar o Script Python (Recomendado)
```bash
# Instalar Python e Pillow (se não tiver)
pip install Pillow

# Executar o script
python gerar_imagem_fundo.py
```

Isso irá criar: `images/dashboard_480x320.jpg`

#### Opção B: Manualmente
- Abra `images/README_IMAGEM.md`
- Siga as instruções para criar/converter a imagem
- Salve como: `images/dashboard_480x320.jpg` (480x320 pixels)

---

### PASSO 2: Completar o Arquivo disp_3.5.yaml

Abra o arquivo `COMPLEMENTO_disp_3.5.yaml` e copie as seções indicadas para o arquivo principal `disp_3.5.yaml`:

#### 2.1 Adicionar Popup AC Suite
Na página `fourth_page`, substituir o comentário:
```yaml
## Popup AC Suite (similar ao AC Sala...)
```
Pelo código completo do popup (está no COMPLEMENTO).

#### 2.2 Adicionar Popup AC Quarto Davi
Na página `fifth_page`, adicionar o popup completo no final.

#### 2.3 Adicionar Popup AC Quarto 3
Na página `seventh_page`, adicionar o popup completo no final.

#### 2.4 Corrigir Eventos dos Botões AC
Nos botões AC dos quartos (Davi e Q.3), adicionar `on_long_press` para abrir popups:
```yaml
on_long_press:
  - lvgl.widget.update: 
      id: p6_ac_popup_container  # ou p3_ac_popup_container
      hidden: false
```

#### 2.5 Adicionar Text Sensors
Na seção `text_sensor`, adicionar os sensores dos ACs (Suite, Q.Davi, Q.3).

#### 2.6 Adicionar Binary Sensors
Na seção `binary_sensor`, adicionar TODOS os botões p2, p3, p4, p5.

---

### PASSO 3: Verificar Configuração de Hardware

No arquivo `disp_3.5.yaml`, verificar se os pinos estão corretos para o **ESP32-3248S035**:

#### Display (rpi_dpi_rgb):
```yaml
display:
  - platform: rpi_dpi_rgb
    dimensions:
      width: 480
      height: 320
    de_pin: GPIO5
    hsync_pin: GPIO46
    vsync_pin: GPIO3
    pclk_pin: GPIO7
    # ... verificar data_pins conforme datasheet
```

#### Touchscreen (gt911):
```yaml
touchscreen:
  - platform: gt911
    # address: 0x5D ou 0x14 (depende do modelo)
```

#### Backlight:
```yaml
output:
  - platform: ledc
    pin: GPIO38  # Verificar no datasheet
```

> **⚠️ IMPORTANTE**: Consulte o datasheet do seu display ESP32-3248S035 específico para confirmar os pinos!

---

### PASSO 4: Compilar e Testar

```bash
# Validar sintaxe
esphome config disp_3.5.yaml

# Compilar
esphome compile disp_3.5.yaml

# Upload (USB ou OTA)
esphome upload disp_3.5.yaml
```

---

## 📊 Resumo das Mudanças vs disp_7.yaml

### Layout
- ✅ Resolução: 800x480 → **480x320**
- ✅ Botões: 100x100px → **64x64px**
- ✅ Grid: 7 por linha → **5 por linha**
- ✅ Header/Footer: 40px → **30px**

### Fontes
- ✅ Botões: roboto22-24 → **roboto16-18**
- ✅ Popups: roboto24-30 → **roboto18-24**
- ✅ Ícones: 64px → **48px**

### Páginas
- ✅ 5 páginas → **7 páginas**
  - Quartos dividido em: Q.Davi, Banheiro Social, Q.3

### Popups AC
- ✅ Tamanho: 500x300 → **460x280**
- ✅ Botões: 40px → **35px**

### Menu
- ✅ Botões: 150x40 → **110x30**
- ✅ Adicionadas 2 opções (Q.Davi, Banheiro)

---

## 🔧 Arquivos Necessários (Checklist)

```
display-3,5/
├── disp_3.5.yaml                    ← Arquivo principal
├── COMPLEMENTO_disp_3.5.yaml        ← Copiar seções daqui
├── gerar_imagem_fundo.py            ← Script para gerar imagem
├── README_INSTALACAO.md             ← Este arquivo
├── images/
│   ├── dashboard_480x320.jpg        ← GERAR ESTA IMAGEM
│   └── README_IMAGEM.md             ← Instruções da imagem
└── fonts/
    └── materialdesignicons-webfont.ttf  ← Necessário (baixar se não tiver)
```

---

## 📥 Baixar Fonte Material Design Icons

Se não tiver o arquivo de fontes:

```bash
# Criar pasta fonts
mkdir fonts

# Baixar fonte (Linux/Mac)
wget https://github.com/Templarian/MaterialDesign-Webfont/raw/master/fonts/materialdesignicons-webfont.ttf -O fonts/materialdesignicons-webfont.ttf

# Ou baixar manualmente de:
# https://github.com/Templarian/MaterialDesign-Webfont
```

---

## ⚠️ Pontos de Atenção

### 1. Configuração de Pinos
Os pinos no arquivo foram baseados em informações genéricas do ESP32-3248S035. **CONFIRME** com o datasheet do seu modelo específico!

### 2. Endereço I2C do Touchscreen
O touchscreen GT911 pode usar `0x5D` ou `0x14`. Se não funcionar, tente trocar:
```yaml
touchscreen:
  - platform: gt911
    address: 0x14  # Ou 0x5D
```

### 3. Tamanho da Imagem
Certifique-se que a imagem é **exatamente** 480x320 pixels, caso contrário pode causar erros de compilação.

### 4. Memória
Display 3.5" usa menos memória que o 7", mas ainda assim:
- Mantenha imagens JPEG com qualidade 85-90%
- Se tiver problemas de memória, reduza o número de fontes

---

## 🎯 Ordem de Prioridade

1. **ALTA**: Gerar imagem de fundo
2. **ALTA**: Adicionar popups AC completos
3. **MÉDIA**: Adicionar binary_sensors restantes
4. **MÉDIA**: Adicionar text_sensors dos ACs
5. **BAIXA**: Ajustar pinos conforme hardware específico
6. **BAIXA**: Testar e ajustar posições/tamanhos

---

## 🐛 Solução de Problemas

### Erro de compilação: "Image not found"
→ Gerar `images/dashboard_480x320.jpg`

### Erro: "Font not found"
→ Baixar `materialdesignicons-webfont.ttf` para pasta `fonts/`

### Touchscreen não responde
→ Verificar pinos e endereço I2C do GT911

### Display branco/preto
→ Verificar pinos do display e configuração de cores

### Botões não atualizam estado
→ Verificar se binary_sensors estão todos adicionados

---

## 📞 Suporte

Se tiver problemas:
1. Verifique logs do ESPHome: `esphome logs disp_3.5.yaml`
2. Consulte documentação: https://esphome.io/components/
3. Verifique o datasheet do seu display específico

---

## ✨ Status do Projeto

- [x] Arquivo base criado
- [x] Layout adaptado para 480x320
- [x] Botões redimensionados (64x64)
- [x] Fontes ajustadas
- [x] Menu atualizado (7 opções)
- [x] Páginas divididas (7 totais)
- [x] Popup AC Sala completo
- [ ] Adicionar popups AC restantes (Suite, Q.Davi, Q.3)
- [ ] Adicionar binary_sensors completos
- [ ] Adicionar text_sensors dos ACs
- [ ] Gerar imagem de fundo
- [ ] Testar no hardware

---

**Boa sorte com o projeto! 🚀**



