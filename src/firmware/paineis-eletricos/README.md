# ESP32 Painéis de Comando - README

## 📝 GUIA PARA IA FUTURA

Este diretório contém os firmwares de todos painéis de comando (Ethernet + I2C).

### Estrutura:
```
/ESP32-Paineis/
├── terreo-principal/
│   ├── config.yaml      (ESPHome config)
│   ├── secrets.yaml     (senhas - não commitar!)
│   └── README.md        (doc específica deste painel)
├── superior-norte/
│   └── ...
└── superior-sul/
    └── ...
```

### Características dos Painéis:
- **Conexão**: Ethernet (mais estável)
- **Hardware**: ESP32 + MCP23017 I2C (expansor GPIO)
- **Função**: Controle iluminação 220V + persianas
- **Módulos I2C**:
  - SS4H (iluminação 220V) - Max 16 luzes por módulo
  - Módulo relés (persianas) - 2 relés por persiana
  - Max 6 módulos por ESP32 (distância <30cm)
- **Alimentação**: Fonte 10A centralizada
- **VLAN**: 10 (IoT Crítico)
- **IP**: Estático (definir no Unifi ou no config)

### Exemplo de Nomenclatura:
- `esp-painel-terreo-principal`
- `esp-painel-superior-norte`
- `esp-painel-superior-sul`

### Modo Autônomo:
- Lógica embarcada: Pulsador → ESP32 → Ação
- Funciona sem Home Assistant
- HA usado para: comandos remotos, voz, celular, automações

### Pulsadores:
- **1 clique**: Liga/desliga luz principal
- **2 cliques**: Liga/desliga luz secundária
- **3 cliques**: Cena "todos desligados"
- **Hold**: Modo ausência (lógica caso a caso)
- **Debounce**: 50ms

### Arquivos de Referência:
- `src/firmware/common/base-config.yaml` - Config compartilhada
- `PROJECT-CONTEXT.md` - Especificações completas
- `Hardware/Esquematicos/` - Esquemas elétricos

---

**Status**: 🔴 Criar configurações durante Fase 3 (após definir plantas)

