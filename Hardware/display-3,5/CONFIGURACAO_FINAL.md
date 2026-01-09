# ✅ CONFIGURAÇÃO FINAL - ESP32-3248S035C

## 🎯 Confirmado: Sua placa é **ESP32-S3** (não ESP32 clássico!)

---

## 📋 Hardware Identificado:

| Componente | Especificação |
|------------|---------------|
| **MCU** | ESP32-S3 |
| **Display** | ST7796 (SPI) 480x320 |
| **Touch** | GT911 (I2C Capacitivo) |
| **Flash** | 4MB (provavelmente) |
| **PSRAM** | Possivelmente sim (GPIO32/33 reservados) |

---

## 🔌 Pinos Configurados (FINAIS):

### Display ST7796 (SPI):
```yaml
SPI:
  CLK:  GPIO18  # Clock
  MOSI: GPIO23  # Master Out Slave In
  MISO: GPIO19  # Master In Slave Out

Display:
  CS:    GPIO15  # Chip Select
  DC:    GPIO2   # Data/Command
  RESET: GPIO4   # Reset
```

### Touch GT911 (I2C):
```yaml
I2C:
  SDA: GPIO6   # Data (mudado de GPIO33 - conflito PSRAM)
  SCL: GPIO7   # Clock (mudado de GPIO32 - conflito PSRAM)
  Address: 0x5D  # Tente 0x14 ou 0x38 se não funcionar
```

### Backlight:
```yaml
PWM: GPIO21  # Controle de brilho
```

---

## ⚠️ Pinos que NÃO PODEM ser usados (ESP32-S3):

- **GPIO32, GPIO33**: Reservados para PSRAM/Flash
- **GPIO26-37**: Usados internamente (dependendo da configuração)
- **GPIO0**: Boot mode
- **GPIO19, GPIO20**: USB (se usar USB-OTG)

---

## 🚀 COMPILAR E TESTAR AGORA

### Passo 1: Compile
```bash
esphome compile disp_3.5.yaml
```

### Passo 2: Upload via USB
```bash
esphome upload disp_3.5.yaml
```

### Passo 3: Monitore os logs
```bash
esphome logs disp_3.5.yaml
```

---

## 📊 O que esperar nos logs:

### ✅ SUCESSO:
```
[I][app:102]: ESPHome version 2024.x.x
[C][wifi:573]: WiFi:
[C][wifi:405]:   Local MAC: XX:XX:XX:XX:XX:XX
[C][spi:126]: SPI:
[C][spi:127]:   CLK Pin: GPIO18
[C][ili9xxx:051]: ili9xxx
[C][ili9xxx:052]:   Model: ST7796
[C][i2c:099]: I2C Bus:
[C][i2c:100]:   SDA Pin: GPIO6
[C][i2c:101]:   SCL Pin: GPIO7
[C][gt911:025]: GT911 Touchscreen:
[C][lvgl:075]: LVGL initialized
[I][app:112]: setup() finished successfully!
```

---

## 🐛 Troubleshooting

### Se o touch não funcionar:

O endereço I2C do GT911 pode variar. Tente:

**Opção 1: Veja o scan I2C nos logs:**
```
[I][i2c:099]: Found device at address 0x5D
```

**Opção 2: Teste outros endereços comuns:**

No arquivo `disp_3.5.yaml`, linha ~280:
```yaml
touchscreen:
  - platform: gt911
    address: 0x5D  # ← Tente: 0x14, 0x38, ou 0xBA
```

**Opção 3: Verifique se I2C está funcionando:**

Nos logs, você deve ver:
```
[I][i2c:099]: Found device at address 0xXX
```

---

### Se o display não aparecer:

**1. Backlight não acende:**
- Tente outro pino PWM: GPIO22, GPIO25, GPIO26
- Ou force sempre ligado: remova PWM, ligue direto

**2. Display branco/cores erradas:**
```yaml
display:
  invert_colors: true  # Adicione isto
```

**3. Display rotacionado:**
```yaml
display:
  rotation: 90  # Tente: 0, 90, 180, 270
```

**4. LVGL não carrega:**
- Display muito lento via SPI
- Tente aumentar velocidade SPI:
```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19
  frequency: 40MHz  # Tente diferentes: 20MHz, 40MHz, 60MHz
```

---

### Se der erro de memória:

**Sintoma:**
```
[E] Not enough memory for LVGL
```

**Solução 1: Reduzir fontes**

Comente algumas fontes não usadas no arquivo (linhas ~150-230)

**Solução 2: Reduzir tamanho da imagem**

A imagem `dashboard_480x320.jpg` deve ser < 50KB

**Solução 3: Simplificar interface**

Remova alguns widgets ou páginas temporariamente

---

## 📝 Checklist Final

Antes de compilar, verifique:

- [ ] Imagem de fundo existe: `images/dashboard_480x320.jpg`
- [ ] Fonte MDI existe: `fonts/materialdesignicons-webfont.ttf`
- [ ] WiFi SSID e senha estão corretos (linhas ~146-148)
- [ ] Arquivo não tem erros de sintaxe

---

## 🎨 Gerar Imagem de Fundo

Se ainda não gerou:

1. Abra no navegador: `images/gerar_imagem.html`
2. Clique em "Baixar Imagem"
3. Salve como: `images/dashboard_480x320.jpg`

---

## ✅ Status da Configuração

| Item | Status | Observação |
|------|--------|------------|
| **ESP32-S3** | ✅ Correto | Confirmado pelo erro de GPIO32/33 |
| **Display ST7796** | ✅ Configurado | Interface SPI |
| **Touch GT911** | ✅ Configurado | I2C em GPIO6/7 (livres) |
| **Pinos I2C** | ✅ Corrigidos | GPIO6/7 (não conflitam com PSRAM) |
| **Framework** | ✅ Arduino | Mais estável que ESP-IDF |
| **PSRAM** | ⚠️ Removido | Sem config de PSRAM (evitar boot loops) |

---

## 🚀 PRÓXIMOS PASSOS

1. **Compile**: `esphome compile disp_3.5.yaml`
2. **Upload**: `esphome upload disp_3.5.yaml`
3. **Logs**: Monitore e me diga se funciona!

---

## 📧 Se ainda tiver problemas:

**Me envie:**
1. Logs completos da compilação (se erro de compilação)
2. Logs do boot (se boot loop)
3. Foto da tela (se display acende mas não funciona)
4. Resultado do I2C scan (se touch não funciona)

---

**Agora deve funcionar! 🎉**

A configuração está correta para **ESP32-S3** + **ST7796 SPI** + **GT911 I2C**.

**Boa sorte! 🚀**









