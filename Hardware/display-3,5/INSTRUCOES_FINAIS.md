# ✅ CONFIGURAÇÃO FINAL - ESP32-3248S035C

## 🎉 Pinos Configurados Corretamente!

### Hardware Confirmado:
- **Placa**: ESP32-3248S035C (Capacitiva)
- **MCU**: ESP32-S3 (4MB Flash, SEM PSRAM)
- **Display**: ST7796 480x320 (SPI)
- **Touch**: GT911 Capacitivo (I2C)

---

## 📌 Pinos Aplicados:

```yaml
Display ST7796 (SPI "tft"):
├─ CLK:  GPIO14
├─ MOSI: GPIO13
├─ MISO: GPIO12
├─ CS:   GPIO15
└─ DC:   GPIO2

Touch GT911 (I2C):
├─ SDA: GPIO33
├─ SCL: GPIO32
├─ INT: GPIO21
└─ RST: GPIO25

Backlight:
└─ PWM: GPIO27

SPI Touch (reservado):
├─ CLK:  GPIO18
├─ MOSI: GPIO23
└─ MISO: GPIO19
```

---

## ⚠️ IMPORTANTE - Layout Ainda é 800x480!

O arquivo `disp_3.5.yaml` agora tem:
- ✅ **Hardware configurado** corretamente (display + touch)
- ✅ **Pinos corretos** conforme seu hardware
- ⚠️ **Layout ainda em 800x480** (precisa adaptar para 480x320)

---

## 🚀 PRÓXIMOS PASSOS:

### PASSO 1: Teste de Hardware (FAÇA AGORA!)

Compile e faça upload para **testar se o hardware funciona**:

```bash
esphome compile disp_3.5.yaml
esphome upload disp_3.5.yaml
```

**O que vai acontecer:**
- ✅ WiFi deve conectar
- ✅ Display deve acender
- ✅ Touch deve funcionar
- ⚠️ Interface LVGL vai estar "cortada" (800px não cabe em 480px)

**Isso é NORMAL!** Primeiro validamos o hardware, depois ajustamos o layout.

---

### PASSO 2: Se Hardware Funcionar

Depois que confirmar que display e touch funcionam, vou:
1. Adaptar todas as coordenadas dos botões (800x480 → 480x320)
2. Reduzir tamanho dos botões (100px → 64px)
3. Ajustar fontes (roboto22-24 → roboto16-18)
4. Reorganizar páginas se necessário

---

### PASSO 3: Gerar Imagem de Fundo

Quando o hardware estiver funcionando:
1. Abra: `images/gerar_imagem.html`
2. Baixe a imagem 480x320
3. Salve como: `images/dashboard_480x320.jpg`

---

## 📝 Checklist Antes de Compilar:

- [ ] WiFi SSID/senha corretos? (linha ~159)
- [ ] Fonte MDI baixada? `fonts/materialdesignicons-webfont.ttf`
- [ ] Imagem temporária? (pode usar qualquer 480x320 por enquanto)

---

## 🔍 O que Observar nos Logs:

### ✅ SUCESSO - Deve aparecer:
```
[I][app:102]: ESPHome version ...
[C][wifi:573]: WiFi:
[C][wifi:405]:   Connected!
[C][spi:126]: SPI bus tft
[C][ili9xxx:051]: ili9xxx ST7796
[C][i2c:099]: I2C Bus:
[C][i2c:100]:   SDA Pin: GPIO33
[C][i2c:101]:   SCL Pin: GPIO32
[C][i2c:106]:   Found device at address 0x5D (GT911)
[C][gt911:025]: GT911 Touchscreen
[C][lvgl:075]: LVGL initialized
[I][app:112]: setup() finished successfully!
```

### ❌ Se der erro de GPIO32/33:

Adicione esta configuração no `esphome:`:
```yaml
esphome:
  name: ${devicename}
  platformio_options:
    build_flags: 
      - "-DBOARD_HAS_PSRAM=0"
```

---

## 🆘 Troubleshooting Rápido:

| Problema | Solução |
|----------|---------|
| **Erro GPIO32/33** | Adicionar build_flags acima |
| **Display branco** | Mudar `invert_colors: true` |
| **Touch não responde** | Verificar endereço I2C nos logs (0x5D, 0x14, 0x38) |
| **Display preto** | Verificar backlight (GPIO27) |
| **Interface cortada** | Normal! É só layout, vamos ajustar depois |

---

## 🎯 FAÇA AGORA:

1. **Compile**: `esphome compile disp_3.5.yaml`
2. **Upload**: `esphome upload disp_3.5.yaml`  
3. **Monitore**: `esphome logs disp_3.5.yaml`
4. **Me diga**: Funcionou? O que apareceu nos logs?

---

**Depois que confirmar que o hardware funciona, adapto todo o layout para 480x320! 🚀**









