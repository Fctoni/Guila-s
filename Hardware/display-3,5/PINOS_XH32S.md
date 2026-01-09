# 📌 Configuração de Pinos - XH-32S

## ⚠️ ATENÇÃO - VERIFICAR PINOS DO SEU DISPLAY!

O arquivo `disp_3.5_XH32S.yaml` foi criado com os **pinos padrão**, mas o XH-32S pode ter pinos **diferentes** dependendo do display conectado.

---

## 🔍 Pinos Atuais no Arquivo

### Backlight:
```yaml
pin: GPIO2
```

### I2C (Touchscreen):
```yaml
sda: GPIO19
scl: GPIO20
```

### Display RGB:
```yaml
de_pin: GPIO5
hsync_pin: GPIO46  # ⚠️ ESP32 clássico SÓ vai até GPIO39!
vsync_pin: GPIO3
pclk_pin: GPIO7
```

---

## ❌ PROBLEMA DETECTADO!

Os pinos do display original (ESP32-S3) usam **GPIO46** que **NÃO EXISTE** no ESP32 clássico!

### ESP32 Clássico tem apenas:
- GPIO 0-39 (40 pinos no total)
- Alguns são input-only (34-39)

### ESP32-S3 tem:
- GPIO 0-48 (muito mais pinos!)

---

## 🎯 O QUE FAZER?

### Opção 1: Você TEM o datasheet/schematic do XH-32S?

Se sim, me envie ou consulte e me diga quais são os pinos corretos para:
- Display (DE, HSYNC, VSYNC, PCLK, data_pins)
- Touchscreen (SDA, SCL)
- Backlight

### Opção 2: Teste com configuração MÍNIMA primeiro

Use o `test_minimo.yaml` para verificar se o XH-32S pelo menos **conecta no WiFi**:

```bash
esphome run test_minimo.yaml
```

Se funcionar, sabemos que o ESP32 está OK, e o problema é só configurar o display.

### Opção 3: Qual display você tem conectado?

Me diga:
- Marca/modelo do display
- Resolução (480x320 confirmado?)
- Driver do display (ST7796? ILI9488?)
- Conexão (SPI? Parallel RGB?)

---

## 📝 Pinos Comuns para ESP32 + Display 3.5"

### Se for display SPI (ST7796, ILI9488):
```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

display:
  - platform: ili9xxx
    model: ili9488
    cs_pin: GPIO15
    dc_pin: GPIO2
    reset_pin: GPIO4
```

### Se for display paralelo RGB:
Precisa de pelo menos 16 pinos de dados + controle.
**Muito raro** em ESP32 clássico devido à falta de pinos.

---

## 🚨 DECISÃO IMPORTANTE

**Antes de compilar o `disp_3.5_XH32S.yaml`, você PRECISA:**

1. ✅ Confirmar que pinos o seu display usa
2. ✅ Ajustar os pinos no arquivo YAML
3. ✅ OU testar primeiro com `test_minimo.yaml`

---

## 📸 Me ajude com essas informações:

1. **Foto da placa XH-32S** (se possível)
2. **Qual display** está conectado? (marca/modelo)
3. **Como está conectado?** (SPI? Pinos específicos?)
4. **Tem esquema elétrico** ou datasheet?

Com essas informações, posso configurar **EXATAMENTE** os pinos corretos!

---

## 🎯 PRÓXIMO PASSO

**TESTE O ARQUIVO `test_minimo.yaml` PRIMEIRO:**

```bash
esphome run test_minimo.yaml
```

Se ele conectar no WiFi → ESP32 está funcionando
Se boot loop → problema no hardware/conexões

Depois me diga o resultado! 🔍









