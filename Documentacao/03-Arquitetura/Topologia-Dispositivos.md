# Topologia de Dispositivos - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter a topologia completa de todos dispositivos do sistema.

### O que incluir:

1. **Hierarquia de Dispositivos**
   ```
   Home Assistant (central)
   ├── ESP32 Painéis (Ethernet - VLAN 10)
   │   ├── esp-painel-terreo-principal
   │   │   ├── Módulo SS4H #1 (luzes 1-16)
   │   │   ├── Módulo SS4H #2 (luzes 17-32)
   │   │   └── Módulo Persianas (persianas 1-8)
   │   └── esp-painel-superior-norte
   │       └── [... módulos...]
   │
   ├── ESP32 Cortinas (WiFi - VLAN 20)
   │   └── esp-cortinas-terreo
   │       ├── XL9535 (0x27) - 8 relés
   │       └── 4 cortinas: Estar, Jantar, Office, Reserva
   │
   ├── ESP32 Painéis Touch (WiFi - VLAN 20)
   │   ├── painel-touch-hall-entrada
   │   ├── painel-touch-sala-estar
   │   └── [... 4 outros painéis...]
   │
   ├── ESP32 Sensores (WiFi - VLAN 20)
   │   ├── Temperatura
   │   │   ├── esp-sensor-temp-sala
   │   │   └── [... outros ambientes...]
   │   └── Presença mmWave
   │       ├── esp-sensor-presenca-sala
   │       └── [... outros ambientes...]
   │
   ├── Sensores Shelly (WiFi - VLAN 20)
   │   ├── Abertura (18-30 sensores)
   │   ├── Vazamento (10-15 sensores)
   │   ├── Fumaça (8-12 sensores)
   │   └── RGBW2 (LEDs 24V)
   │
   ├── Câmeras Unifi G5 Turret Ultra (UVC-G5-Turret-Ultra)
   │   ├── 7 câmeras instaladas
   │   ├── 8 esperas para expansão futura
   │   └── Sistema: Unifi Protect (UDM-Pro SE)
   │
   └── Outros
       ├── Fechadura Yale (monitoramento apenas)
       ├── ACs LG (6 unidades via ThinQ)
       ├── Piso Aquecido (10 termostatos custom)
       ├── TV LG (WebOS)
       └── Receiver Anthem
   ```

2. **Mapa de Ambientes**
   Para cada ambiente, listar:
   - Dispositivos presentes
   - Nomenclatura
   - Conexão (Ethernet/WiFi/I2C)
   - IP ou endereço I2C

3. **Protocolos de Comunicação**
   - Ethernet: ESP32 painéis
   - WiFi: Sensores, painéis touch
   - I2C: Módulos expansão
   - Zigbee: N/A (projeto usa WiFi)
   - Z-Wave: N/A

4. **Dependências**
   - Todos ESP32s dependem de HA para comandos remotos
   - Mas funcionam autonomamente (modo local)
   - Shelly funciona standalone (integrado ao HA)

---

**Status**: 🔴 Aguardando plantas da casa para mapear dispositivos por ambiente

