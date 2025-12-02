# Interfaces LVGL - Painéis Touch

## 📝 GUIA PARA IA FUTURA

Este diretório contém as definições de interface LVGL para os painéis touch.

### Arquivos:
- `main_screen.yaml` - Tela principal (menu)
- `lights_screen.yaml` - Controle de iluminação
- `climate_screen.yaml` - Climatização (AC + piso aquecido)
- `covers_screen.yaml` - Persianas
- `security_screen.yaml` - Câmeras e alarme
- `scenes_screen.yaml` - Cenas prontas
- `multimedia_screen.yaml` - Controle de multimídia

### Estilo Visual (conforme pendências com cliente):
- **Cores**: Fundo escuro, acentos (definir com cliente)
- **Layout**: Minimalista, botões grandes
- **Fontes**: Legíveis, tamanho adequado
- **Ícones**: Intuitivos
- **Animações**: Suaves, não exageradas

### Componentes LVGL Comuns:
- Botões
- Sliders (dimmer, temperatura)
- Labels (temperatura atual, etc)
- Imagens (ícones, snapshots câmeras)
- Switches (on/off)
- Dropdowns (seleção de cenas)

### Sleep Mode:
- Timeout: 30s sem interação
- Display desliga
- Toque acorda

---

**Status**: 🔴 Criar durante Fase 3 após definir preferências cliente

