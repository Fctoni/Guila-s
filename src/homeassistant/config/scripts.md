# Scripts - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo contém scripts reutilizáveis do Home Assistant.

### Exemplos:

#### Script: Todos Desligados
```yaml
todos_desligados:
  alias: Todos Desligados
  sequence:
    - service: light.turn_off
      target:
        entity_id: all
    - service: climate.turn_off
      target:
        entity_id: all
    - service: cover.close_cover
      target:
        entity_id: all
```

#### Script: Modo Cinema
```yaml
modo_cinema:
  alias: Modo Cinema
  sequence:
    - service: cover.close_cover
      target:
        entity_id: all
    - service: light.turn_on
      data:
        brightness_pct: 5
      target:
        entity_id: light.sala_fita_led
    - service: climate.set_temperature
      data:
        temperature: 22
      target:
        entity_id: climate.sala_ar_condicionado
    - service: media_player.turn_on
      target:
        entity_id: media_player.tv_sala
```

---

**Status**: 🔴 Criar durante Fase 3-4

