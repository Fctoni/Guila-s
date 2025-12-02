# Automations - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo contém todas as automações do Home Assistant.

### Categorias de Automações:

#### 1. Iluminação Inteligente
```yaml
- id: 'luz_presenca_sala'
  alias: 'Luz Sala - Presença'
  trigger:
    - platform: state
      entity_id: binary_sensor.sala_presenca
      to: 'on'
  action:
    - service: light.turn_on
      target:
        entity_id: light.sala_principal
```

#### 2. Climatização
- AC liga 15min antes da temperatura ideal
- Piso aquecido programação matinal
- Desliga clima se janela aberta

#### 3. Segurança
- Alarme disparado → Snapshot câmeras + notificação
- Porta aberta >10min → Alerta
- Movimento detectado em modo ausente

#### 4. Irrigação
- Programação diária (8h verão/inverno)
- Manual override via painel/voz

#### 5. Backup
- Snapshot diário 3h
- Export para UGREEN
- Notificação se falhar

#### 6. Monitoramento
- ESP32 offline >10min → Alerta integrador
- Temperatura anormal → Alerta
- Bateria sensor baixa → Alerta

---

**Status**: 🔴 Criar durante Fase 3-4

