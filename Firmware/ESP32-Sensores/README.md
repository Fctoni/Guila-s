# ESP32 Sensores - README

## 📝 GUIA PARA IA FUTURA

Este diretório contém os firmwares de todos sensores customizados (WiFi).

### Tipos de Sensores:

#### 1. Sensores de Temperatura (DS18B20)
- **Uso**: Integrados nos termostatos de piso aquecido
- **Quantidade**: 10 sensores (1 por zona)
- **Conexão**: WiFi
- **VLAN**: 20 (IoT Sensores)
- **Nomenclatura**: `termostato-[ambiente]`

#### 2. Sensores de Presença mmWave (LD2410)
- **Uso**: Detecção presença estática + movimento
- **Quantidade**: 8-15 sensores (definir com arquiteto)
- **Conexão**: WiFi
- **VLAN**: 20 (IoT Sensores)
- **Nomenclatura**: `esp-sensor-presenca-[ambiente]`
- **Características**:
  - Radar 24GHz
  - Detecta através de vidro/paredes finas
  - Detecta respiração (pessoa dormindo/lendo)
  - Alcance: 6m
  - Montagem: 2-2.5m altura, 15-30° inclinado

### Estrutura:
```
/ESP32-Sensores/
├── termostato-living/
│   ├── config.yaml
│   └── secrets.yaml
├── termostato-suite-master/
├── presenca-sala/
├── presenca-cozinha/
└── ...
```

### Integração:
- ESPHome nativo para LD2410
- Dallas (DS18B20) nativo no ESPHome
- Auto-discovery no Home Assistant

### Aplicações Automações:
- **mmWave**: 
  - Iluminação inteligente (acende ao entrar, apaga ao sair após 2min)
  - Climatização (liga AC 15min antes)
  - Segurança (detecta presença em modo ausente)
  
- **Temperatura**:
  - Controle preciso de piso aquecido
  - Histórico de temperatura por ambiente
  - Alertas temperatura anormal

---

**Status**: 🔴 Criar configurações durante Fase 3

