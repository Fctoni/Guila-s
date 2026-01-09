# 🛠️ Como Compilar e Fazer Upload do Display

## ⚠️ Você NÃO tem ESPHome instalado!

Escolha UMA das opções abaixo:

---

## 🎯 Opção 1: ESPHome Dashboard (MAIS FÁCIL) ⭐⭐⭐

### Se você usa Home Assistant:

**Passo 1: Instalar Add-on**
1. Abra o Home Assistant
2. Configurações → Add-ons → Add-on Store
3. Procure "ESPHome"
4. Clique em "INSTALL"
5. Marque "Start on boot"
6. Clique em "START"

**Passo 2: Abrir ESPHome**
1. No menu lateral, clique em "ESPHome"
2. Ou acesse: `http://homeassistant.local:6052`

**Passo 3: Adicionar Dispositivo**
1. Clique em **"+ NEW DEVICE"**
2. "Continue" → "Skip"
3. Nome: `esp32-3248s035`
4. Board: ESP32-S3

**Passo 4: Editar Configuração**
1. Clique nos **3 pontinhos** do dispositivo
2. Escolha **"Edit"**
3. **Delete todo o conteúdo**
4. **Cole todo o conteúdo** do arquivo `disp_3.5.yaml`
5. Clique em **"SAVE"**

**Passo 5: Compilar e Fazer Upload**
1. Clique em **"INSTALL"**
2. Escolha **"Plug into this computer"**
3. Selecione a porta COM do ESP32
4. Aguarde compilação e upload (pode demorar 5-10 min)

✅ **Pronto!**

---

## 🐍 Opção 2: Instalar ESPHome Local

### Passo 1: Instalar Python

1. Baixe Python: https://www.python.org/downloads/
2. Durante instalação: **✅ MARQUE "Add Python to PATH"**
3. Instale normalmente

### Passo 2: Instalar ESPHome

Abra o PowerShell e execute:

```powershell
pip install esphome
```

### Passo 3: Verificar Instalação

```powershell
esphome version
```

Deve mostrar algo como: `Version: 2024.x.x`

### Passo 4: Compilar

```powershell
cd "C:\Users\Toniezzer-PC\Meu Drive\cursor\display-3,5"
esphome compile disp_3.5.yaml
```

### Passo 5: Upload

**Conecte o ESP32 via USB**, depois:

```powershell
esphome upload disp_3.5.yaml
```

✅ **Pronto!**

---

## 🐳 Opção 3: Docker (Avançado)

### Se você tem Docker Desktop instalado:

**Compilar:**
```cmd
docker run --rm -v "%cd%:/config" -it ghcr.io/esphome/esphome compile disp_3.5.yaml
```

**Upload:**
```cmd
docker run --rm --privileged -v "%cd%:/config" --device=/dev/ttyUSB0 -it ghcr.io/esphome/esphome upload disp_3.5.yaml
```

Ou use os scripts criados:
- `compile_docker.bat` - Para compilar
- `upload_docker.bat` - Para fazer upload

---

## 🔌 Identificar Porta COM do ESP32

### No Windows:

1. **Conecte o ESP32 via USB**
2. Abra o **Gerenciador de Dispositivos**:
   - Pressione `Win + X`
   - Escolha "Gerenciador de Dispositivos"
3. Procure em **"Portas (COM e LPT)"**
4. Você verá algo como: **"Silicon Labs CP210x USB to UART Bridge (COM3)"**
5. Anote o número da porta (ex: COM3, COM4, etc)

---

## ❓ Qual Opção Escolher?

| Opção | Prós | Contras | Recomendado |
|-------|------|---------|-------------|
| **1. ESPHome Dashboard** | Muito fácil, interface gráfica, sem instalação local | Precisa do Home Assistant | ⭐⭐⭐ SIM |
| **2. Python Local** | Rápido, controle total, uso offline | Precisa instalar Python | ⭐⭐ Bom |
| **3. Docker** | Isolado, sem conflitos | Complexo, precisa Docker | ⭐ Avançado |

---

## 🎯 Recomendação

**Use a Opção 1 (ESPHome Dashboard)** se você tem Home Assistant.

É de longe a maneira mais simples e você pode ver os logs em tempo real!

---

## 🆘 Problemas Comuns

### "Port not found" / "Porta não encontrada"
→ ESP32 não está conectado ou driver USB não instalado
→ Instale driver: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

### "Permission denied"
→ Outra aplicação está usando a porta serial
→ Feche Arduino IDE, PlatformIO, etc

### Compilação demora muito
→ Normal! Primeira compilação pode levar 10-15 minutos
→ Próximas compilações são mais rápidas (2-5 min)

---

## 📱 Depois do Upload

O display vai:
1. Conectar ao WiFi ("Toniezzer")
2. Aparecer no Home Assistant automaticamente
3. Mostrar a interface LVGL

**Para acessar:**
- IP do display: `http://esp32-3248s035.local`
- Logs: No ESPHome Dashboard ou `esphome logs disp_3.5.yaml`

---

**Boa sorte! 🚀**









