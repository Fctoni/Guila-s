# ESP32 Painéis Touch - README

## 📝 GUIA PARA IA FUTURA

Este diretório contém os firmwares de todos painéis touch LVGL.

### Hardware:
- **Modelo**: ESP32-8048S070
- **Quantidade**: 6 painéis
- **Display**: 7" 800x480 touchscreen
- **Conexão**: WiFi
- **VLAN**: 20 (IoT Sensores)
- **Software**: ESPHome + LVGL

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
│   └── [arquivos HTML de validação de layout]
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
- `Conversas/pendencias.md` - Pendência sobre câmeras

---

**Status**: 🔴 Criar durante Fase 3 após prototipagem

