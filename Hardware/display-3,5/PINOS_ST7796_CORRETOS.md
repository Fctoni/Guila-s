# 📌 Configuração Correta - XH-32S + ST7796

## ✅ CONFIGURAÇÃO APLICADA

Seu display usa **ST7796** (interface SPI), não RGB paralelo!

---

## 🔌 Pinos Configurados

### Display ST7796 (SPI):
```yaml
SPI:
  CLK:  GPIO18  # Clock
  MOSI: GPIO23  # Data Out
  MISO: GPIO19  # Data In

Display:
  CS:    GPIO15  # Chip Select
  DC:    GPIO2   # Data/Command
  RESET: GPIO4   # Reset
```

### Touch GT911 (I2C Capacitivo):
```yaml
I2C:
  SDA: GPIO33  # Data
  SCL: GPIO32  # Clock
  Address: 0x5D  # Ou 0x14/0x38
```

### Backlight:
```yaml
PWM: GPIO21  # Controle de brilho
```

---

## ⚠️ IMPORTANTE - VERIFIQUE SEUS PINOS!

Estes são pinos **COMUNS**, mas sua placa pode usar **pinos diferentes**!

### Como verificar:
1. **Tem esquema elétrico?** Consulte
2. **Datasheet da placa?** Veja pinout
3. **Vendedor** forneceu informações?

---

## 🔧 Se os Pinos Estiverem Errados

### Sintomas:
- ❌ Display não acende
- ❌ Touch não funciona
- ❌ Tela branca/preta
- ❌ Cores invertidas

### Ajustar no arquivo `disp_3.5.yaml`:

**Display (linhas ~255-274):**
```yaml
spi:
  clk_pin: GPIO18   # ← Ajuste aqui
  mosi_pin: GPIO23  # ← Ajuste aqui
  miso_pin: GPIO19  # ← Ajuste aqui

display:
  - platform: ili9xxx
    model: ST7796
    cs_pin: GPIO15    # ← Ajuste aqui
    dc_pin: GPIO2     # ← Ajuste aqui
    reset_pin: GPIO4  # ← Ajuste aqui
```

**Touch (linhas ~236-239, ~277-290):**
```yaml
i2c:
  sda: GPIO33  # ← Ajuste aqui
  scl: GPIO32  # ← Ajuste aqui

touchscreen:
  - platform: gt911
    address: 0x5D  # ← Tente 0x14 ou 0x38 se não funcionar
```

**Backlight (linha ~243):**
```yaml
output:
  - platform: ledc
    pin: GPIO21  # ← Ajuste aqui
```

---

## 🎨 Outras Configurações do Display

### Se as cores estiverem invertidas:
```yaml
display:
  invert_colors: true  # Mude para true
```

### Se o display estiver rotacionado:
```yaml
display:
  rotation: 0   # 0, 90, 180 ou 270
```

### Se LVGL não funcionar bem:
Pode ser que o ST7796 precise de configurações adicionais:
```yaml
display:
  - platform: ili9xxx
    model: ST7796
    color_palette: NONE  # Adicione se necessário
```

---

## 🚀 TESTE AGORA!

### Passo 1: Compile
```bash
esphome compile disp_3.5.yaml
```

### Passo 2: Upload
```bash
esphome upload disp_3.5.yaml
```

### Passo 3: Verifique logs
```bash
esphome logs disp_3.5.yaml
```

---

## 📊 O que deve aparecer nos logs:

### ✅ Se funcionar:
```
[I][app:102]: ESPHome version 2024.x.x
[C][wifi:573]: WiFi: Connected
[C][ili9xxx:051]: ili9xxx
[C][ili9xxx:052]:   Model: ST7796
[C][lvgl:075]: LVGL initialized
[I][app:112]: setup() finished successfully!
```

### ❌ Se der erro:
```
[E][ili9xxx]: Failed to initialize display
[E][gt911]: Failed to communicate with touchscreen
```

---

## 🔍 Troubleshooting

### Display não acende:
1. Verifique pino do backlight (GPIO21)
2. Tente outros pinos PWM (GPIO22, GPIO25, GPIO26)
3. Verifique alimentação da placa

### Tela branca/cores erradas:
1. `invert_colors: true`
2. Verifique conexões SPI
3. Tente `rotation: 180`

### Touch não funciona:
1. Verifique endereço I2C (0x5D, 0x14, 0x38)
2. Verifique pinos SDA/SCL
3. Use `i2c: scan: true` e veja logs

### Boot loop:
1. Provavelmente conflito de pinos
2. Verifique se nenhum pino está duplicado
3. Alguns pinos não podem ser usados (GPIO0, GPIO1, GPIO6-11)

---

## 📝 Pinos Comuns do ESP32 que NÃO devem ser usados:

- **GPIO0**: Boot mode (problemático)
- **GPIO1**: TX (UART)
- **GPIO3**: RX (UART)
- **GPIO6-11**: Flash SPI (NUNCA use!)
- **GPIO34-39**: Input only (não servem para SPI/I2C)

---

## ✅ PRÓXIMOS PASSOS:

1. **Compile e faça upload**
2. **Verifique se display acende**
3. **Teste o touch**
4. **Se algo não funcionar**, ajuste os pinos conforme este guia

---

**Boa sorte! 🚀**

**PS**: Se tudo funcionar, não esqueça de gerar a imagem de fundo usando `images/gerar_imagem.html`!









