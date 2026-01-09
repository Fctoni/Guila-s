# Codigo ESPHome - UEDX48480040E-WB-A

## Arquivos

| Arquivo | Descricao |
|---------|-----------|
| `validacao_uedx48480040e.yml` | Codigo de validacao para o display 4" 480x480 |
| `termostato.yml` | Referencia de outro projeto (ESP32-3248S035C) |
| `secrets.yaml.example` | Template para configuracao de secrets |

---

## Configuracao Rapida

### 1. Criar secrets.yaml

```bash
cp secrets.yaml.example secrets.yaml
```

Edite `secrets.yaml` com suas credenciais:

```yaml
wifi_ssid: "SuaRedeWiFi"
wifi_password: "SuaSenha"
api_key: "chave_gerada_base64"
ota_password: "senha_ota"
```

### 2. Compilar e Fazer Upload

**Via ESPHome Dashboard:**
```bash
esphome dashboard .
```

**Via linha de comando:**
```bash
esphome run validacao_uedx48480040e.yml
```

---

## Hardware Testado

| Componente | Especificacao |
|------------|---------------|
| **Display** | UEDX48480040E-WB-A (4" 480x480) |
| **Driver LCD** | GC9503V (RGB Paralelo 16-bit) |
| **Touch** | FT6336U (I2C) |
| **MCU** | ESP32-S3 (16MB Flash, 8MB PSRAM) |
| **Backlight** | GPIO38 (PWM) |

---

## Pinout Utilizado

### Display (RGB Paralelo)
| Funcao | GPIO |
|--------|------|
| SPI CLK | 48 |
| SPI MOSI | 47 |
| SPI CS | 39 |
| DE | 18 |
| HSYNC | 16 |
| VSYNC | 17 |
| PCLK | 21 |
| R0-R4 | 0-4 |
| G0-G5 | 5-10 |
| B0-B4 | 11-15 |

### Touch (I2C)
| Funcao | GPIO |
|--------|------|
| SDA | 40 |
| SCL | 41 |

### Outros
| Funcao | GPIO |
|--------|------|
| Backlight | 38 |
| Boot Button | 0 |

---

## Funcionalidades do Teste

O arquivo `validacao_uedx48480040e.yml` inclui 4 paginas de teste:

1. **Teste Display + Touch**: Verifica se o display liga e touch responde
2. **Teste Slider**: Verifica interatividade LVGL
3. **Teste Cores**: Verifica renderizacao RGB (vermelho, verde, azul, amarelo, magenta)
4. **Status**: Mostra informacoes do sistema e conectividade WiFi

---

## Checklist de Validacao

### Fase 1: Hardware Basico
- [ ] Display liga e mostra interface
- [ ] Touch responde corretamente
- [ ] Backlight funciona (on/off/dimmer)
- [ ] Cores renderizam corretamente

### Fase 2: Interatividade
- [ ] Slider funciona suavemente
- [ ] Navegacao entre paginas OK
- [ ] Animacoes fluidas (>20 FPS)

### Fase 3: Conectividade
- [ ] WiFi conecta
- [ ] Home Assistant detecta dispositivo
- [ ] OTA funciona
- [ ] Logs via API funcionam

---

## Problemas Conhecidos

### Display nao liga
- Verificar sequencia de inicializacao GC9503V
- Verificar pinos SPI de configuracao (47, 48, 39)
- Verificar alimentacao 5V/2A

### Touch nao responde
- Verificar endereco I2C (0x38 para FT6336U)
- Verificar pinos SDA/SCL (40/41)
- Executar `i2c scan` nos logs

### Cores invertidas
- Ajustar `color_order` no display (RGB/BGR)
- Verificar `invert_colors` flag

---

## Referencias

- [ESPHome Display RGB](https://esphome.io/components/display/rpi_dpi_rgb.html)
- [ESPHome LVGL](https://esphome.io/components/lvgl/)
- [ESPHome Touchscreen FT63x6](https://esphome.io/components/touchscreen/ft63x6.html)
- [Repositorio VIEWESMART](https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display)

---

**Data de criacao**: 07/01/2026  
**Versao**: 1.0.0






