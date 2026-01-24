# ESP32 Painéis Touch - README

## 📝 GUIA PARA IA FUTURA

Este diretório contém os firmwares de todos painéis touch LVGL.

### Hardware:
- **Painéis Touch 7" (Dashboards gerais)**:
  - **Modelo**: ESP32-8048S070
  - **Quantidade**: 6 painéis
  - **Display**: 7" 800x480 touchscreen
  - **Conexão**: WiFi
  - **VLAN**: 20 (IoT Sensores)
  - **Software**: ESPHome + LVGL

- **Termostatos 4" (Piso Aquecido)**:
  - **Modelo**: UEDX48480040E-WB-A (em teste)
  - **Quantidade**: 10 termostatos (após validação)
  - **Display**: 4" 480x480 quadrado touchscreen
  - **Conexão**: WiFi
  - **VLAN**: 20 (IoT Sensores)
  - **Software**: Arduino Framework + LVGL + Home Assistant API
  - **Repositório**: https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display
  - **Nota**: ESPHome não suporta nativamente este display (RGB paralelo GC9503V)

### Características UI:
- **Estilo**: Minimalista, fundo escuro
- **Sleep mode**: Ativo (economiza energia e tela)
- **Funcionalidades**:
  - Controle completo de todos dispositivos
  - Visualização câmeras (snapshot, stream se viável)
  - Acesso a cenas e automações
  - Dashboard por ambiente

### Estrutura:
```
/ESP32-Paineis-Touch/
├── lvgl-interface/
│   ├── main_screen.yaml      (tela principal)
│   ├── lights_screen.yaml    (controle luzes)
│   ├── climate_screen.yaml   (climatização)
│   ├── security_screen.yaml  (câmeras e alarme)
│   └── scenes_screen.yaml    (cenas)
├── validacoes/
│   ├── README.md
│   ├── [arquivos HTML de validação de layout]
│   └── teste_UEDX48480040E/  (testes display termostato)
│       ├── platformio.ini
│       ├── src/
│       │   └── main.cpp
│       └── README.md
└── [configs individuais por painel]
```

### Nomenclatura:
- `painel-touch-hall-entrada`
- `painel-touch-sala-estar`
- `painel-touch-cozinha`
- `painel-touch-suite-master`
- (2 outros - definir com arquiteto)

### Teste de Câmeras:
- **Objetivo**: Testar se ESP32 suporta stream de vídeo
- **Expectativa**: Snapshot (2fps) deve funcionar, stream HD provavelmente não
- **Limitação**: CPU/RAM do ESP32 insuficiente para H.264/H.265
- **Decisão após teste**: 
  - Se funcionar bem: implementar em todos
  - Se não: manter visualização apenas em tablets

### Referências:
- ESPHome LVGL: https://esphome.io/components/lvgl/
- `docs/decisoes/pendencias.md` - Pendência sobre câmeras

---

**Status**: 🔴 Criar durante Fase 3 após prototipagem

