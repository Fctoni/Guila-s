# Climate e HVAC - ESPHome Reference (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Versao coberta**: 2024.11.0 a 2026.1.1

---

## Indice de Componentes

| Componente | Descricao | Link |
|------------|-----------|------|
| [Climate](#climate) | API base para controle climatico | [Ir](#climate) |
| [Thermostat](#thermostat) | Controlador de termostato | [Ir](#thermostat) |
| [Water Heater](#water-heater) | Aquecedor de agua (novo 2026.1) | [Ir](#water-heater) |
| [Climate IR](#climate-ir) | Controles IR para HVAC | [Ir](#climate-ir) |
| [Gree Climate](#gree-climate) | Ar condicionado Gree via IR | [Ir](#gree-climate) |
| [OpenTherm](#opentherm) | Aquecimento central | [Ir](#opentherm) |

---

## Climate

Componente base para controle climatico (ar condicionado, aquecimento).

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2026.1.0 | `get_custom_fan_mode()` retorna `StringRef` | **Alto** | Sim - atualizar lambdas |
| 2026.1.0 | `get_custom_preset()` retorna `StringRef` | **Alto** | Sim - atualizar lambdas |
| 2025.12.0 | Suporte a humidity_sensor opcional | Baixo | Nao |

### Exemplo Atual (2026.1.0+)

```yaml
climate:
  - platform: <platform>
    name: "Ar Condicionado"
    sensor: temp_sensor
    humidity_sensor: humidity_sensor  # Opcional, disponivel desde 2025.12.0
```

### Migracao: Lambda API (get_custom_fan_mode / get_custom_preset)

Os metodos `get_custom_fan_mode()` e `get_custom_preset()` agora retornam `StringRef` em vez de ponteiro de string (`const char*`).

**ANTES (< 2026.1.0):**
```cpp
auto mode = id(my_climate).get_custom_fan_mode();
if (mode != nullptr && strcmp(mode, "turbo") == 0) {
  // codigo
}

auto preset = id(my_climate).get_custom_preset();
if (preset != nullptr && strcmp(preset, "eco") == 0) {
  // codigo
}
```

**DEPOIS (2026.1.0+):**
```cpp
auto mode = id(my_climate).get_custom_fan_mode();
if (!mode.empty() && mode == "turbo") {
  // codigo
}

auto preset = id(my_climate).get_custom_preset();
if (!preset.empty() && preset == "eco") {
  // codigo
}
```

**Resumo das mudancas:**
- Substituir `!= nullptr` por `!mode.empty()`
- Substituir `strcmp(mode, "valor") == 0` por `mode == "valor"`

---

## Thermostat

Controlador de termostato para aquecedores e resfriadores.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2026.1.0 | Boolean heat/cool mode | Medio | Opcional - simplifica config |

### Exemplo Atual (2026.1.0+)

```yaml
sensor:
  - platform: dallas_temp
    address: 0x1234567890abcdef
    name: "Temperatura Quarto"
    id: temp_quarto

switch:
  - platform: gpio
    pin: GPIO16
    name: "Rele Aquecedor"
    id: rele_aquecedor

climate:
  - platform: thermostat
    name: "Aquecedor Quarto"
    sensor: temp_quarto

    # NOVO em 2026.1.0: modo booleano simplificado
    heat_mode: true
    cool_mode: false

    default_preset: Home
    preset:
      - name: Home
        default_target_temperature_low: 20
      - name: Away
        default_target_temperature_low: 16
      - name: Sleep
        default_target_temperature_low: 18

    heat_action:
      - switch.turn_on: rele_aquecedor
    idle_action:
      - switch.turn_off: rele_aquecedor

    min_heating_off_time: 300s
    min_heating_run_time: 300s
    min_idle_time: 30s
```

### Migracao: Boolean Heat/Cool Mode

A partir de 2026.1.0, pode-se usar `heat_mode` e `cool_mode` como booleanos para simplificar a configuracao.

**Comportamento:**
- `heat_mode: true` - habilita modo aquecimento
- `cool_mode: true` - habilita modo resfriamento
- Ambos podem ser `true` para sistemas dual (heat pump)

---

## Water Heater

**Novo componente em 2026.1.0** - Tipo de entidade especifico para aquecedores de agua, separado de Climate.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2026.1.0 | Componente introduzido | Baixo | Nao - novo recurso |
| 2026.1.0 | Web Server suporte completo | Baixo | Nao |

### Exemplo Atual (2026.1.0+)

```yaml
sensor:
  - platform: ntc
    sensor: temp_resistance
    name: "Temperatura Boiler"
    id: boiler_temp
    calibration:
      b_constant: 3950
      reference_temperature: 25C
      reference_resistance: 10kOhm

output:
  - platform: gpio
    pin: GPIO16
    id: heater_output

water_heater:
  - platform: template
    name: "Boiler"
    id: boiler

    modes:
      - "OFF"
      - "ECO"
      - "PERFORMANCE"

    current_temperature_template: return id(boiler_temp).state;

    target_temperature_template: |-
      if (id(boiler).mode == WATER_HEATER_MODE_ECO) {
        return 45.0;
      } else if (id(boiler).mode == WATER_HEATER_MODE_PERFORMANCE) {
        return 65.0;
      }
      return 50.0;

    set_target_temperature_action:
      - logger.log:
          format: "Target temperature: %.1f"
          args: ['x']

    set_mode_action:
      - if:
          condition:
            lambda: 'return x == WATER_HEATER_MODE_OFF;'
          then:
            - output.turn_off: heater_output
```

### Migracao: De Climate para Water Heater

Se voce usava `climate` para controlar um aquecedor de agua, considere migrar para `water_heater`:

**Vantagens:**
- Entidade especifica no Home Assistant
- Modos apropriados (OFF, ECO, PERFORMANCE)
- Interface web dedicada no ESPHome Web Server

---

## Climate IR

Controles infravermelhos para ar condicionado. Inclui HeatPumpIR e Midea que possuem requisitos especificos.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2026.1.0 | HeatPumpIR requer Arduino | **Medio** | Sim - definir framework |
| 2026.1.0 | Midea requer Arduino | **Medio** | Sim - definir framework |
| 2025.12.0 | humidity_sensor opcional | Baixo | Nao |

### Compatibilidade de Frameworks

| Componente | Arduino | ESP-IDF | Notas |
|------------|:-------:|:-------:|-------|
| coolix | Sim | Sim | Coolix/ZEPHIR |
| daikin | Sim | Sim | Varios modelos Daikin |
| fujitsu | Sim | Sim | Fujitsu General |
| gree | Sim | Sim | Ver secao especifica |
| haier | Sim | Sim | Haier |
| **heatpumpir** | **Sim** | **Nao** | **Requer Arduino** |
| hitachi_ac344 | Sim | Sim | Hitachi |
| hitachi_ac424 | Sim | Sim | Hitachi |
| lg | Sim | Sim | LG |
| **midea** | **Sim** | **Nao** | **Requer Arduino** |
| mitsubishi | Sim | Sim | Mitsubishi Electric |
| tcl112 | Sim | Sim | TCL, Tekno |
| toshiba | Sim | Sim | Toshiba |
| whirlpool | Sim | Sim | Whirlpool |
| zhlt01 | Sim | Sim | Varios genericos |

### Exemplo Atual (2026.1.0+)

**Para HeatPumpIR ou Midea (requer Arduino):**

```yaml
# OBRIGATORIO: definir framework Arduino
esp32:
  board: esp32dev
  framework:
    type: arduino

remote_transmitter:
  pin: GPIO14
  carrier_duty_percent: 50%
  id: ir_transmitter

climate:
  - platform: heatpumpir
    name: "Ar Condicionado"
    protocol: mitsubishi_heavy_zm
    transmitter_id: ir_transmitter

  # OU

  - platform: midea
    name: "Ar Condicionado Midea"
    transmitter_id: ir_transmitter
```

**Para outros componentes IR (compativel com ESP-IDF):**

```yaml
remote_transmitter:
  pin: GPIO14
  carrier_duty_percent: 50%
  id: ir_transmitter

sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Temperatura Ambiente"
      id: temp_sensor
    humidity:
      name: "Umidade Ambiente"
      id: humidity_sensor

climate:
  - platform: coolix
    name: "Ar Condicionado"
    sensor: temp_sensor
    humidity_sensor: humidity_sensor  # Novo em 2025.12.0
    transmitter_id: ir_transmitter
```

### Migracao: Framework Arduino para HeatPumpIR/Midea

Com ESP-IDF como framework padrao em 2026.1.0, voce deve definir explicitamente Arduino:

**Adicione no inicio do YAML:**
```yaml
esp32:
  board: <seu_board>
  framework:
    type: arduino
```

**Importante:** Esta configuracao afeta todo o firmware. Verifique se outros componentes sao compativeis com Arduino.

---

## Gree Climate

Controle de ar condicionado Gree, C&H, Tosot via infravermelho.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2025.12.0 | `turbo_switch` adicionado | Baixo | Nao - novo recurso |
| 2025.12.0 | `light_switch` adicionado | Baixo | Nao - novo recurso |
| 2025.12.0 | `health_switch` adicionado | Baixo | Nao - novo recurso |
| 2025.12.0 | `xfan_switch` adicionado | Baixo | Nao - novo recurso |

### Exemplo Atual (2025.12.0+)

```yaml
remote_transmitter:
  pin: GPIO14
  carrier_duty_percent: 50%
  id: ir_transmitter

sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Temperatura Sala"
      id: temp_sala
    humidity:
      name: "Umidade Sala"
      id: humidity_sala
    update_interval: 60s

climate:
  - platform: gree
    name: "AC Sala"
    sensor: temp_sala
    humidity_sensor: humidity_sala
    transmitter_id: ir_transmitter

    # Switches adicionados em 2025.12.0
    turbo_switch:
      name: "AC Sala Turbo"
    light_switch:
      name: "AC Sala Display"
    health_switch:
      name: "AC Sala Ionizador"
    xfan_switch:
      name: "AC Sala X-Fan"
```

### Descricao dos Novos Switches

| Switch | Funcao | Descricao |
|--------|--------|-----------|
| `turbo_switch` | Modo turbo | Resfriamento/aquecimento rapido em potencia maxima |
| `light_switch` | Luz do display | Liga/desliga o display LED do aparelho |
| `health_switch` | Modo saude | Ativa ionizador (se disponivel no modelo) |
| `xfan_switch` | X-Fan | Continua ventilando apos desligar para secar evaporador |

### Migracao

Nenhuma migracao necessaria. Os switches sao opcionais e podem ser adicionados a configuracoes existentes.

---

## OpenTherm

Protocolo de comunicacao para sistemas de aquecimento central (caldeiras).

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Migracao Necessaria |
|--------|---------|---------|---------------------|
| 2024.11.0 | Componente introduzido | Baixo | Nao - novo recurso |

### Exemplo Atual (2024.11.0+)

```yaml
# Hub OpenTherm
opentherm:
  in_pin: GPIO4
  out_pin: GPIO5

# Sensores
sensor:
  - platform: opentherm
    ch_pressure:
      name: "Pressao Aquecimento Central"
    dhw_temperature:
      name: "Temperatura Agua Quente"
    return_temperature:
      name: "Temperatura Retorno"
    boiler_temperature:
      name: "Temperatura Caldeira"
    modulation:
      name: "Nivel Modulacao"

# Controle climatico
climate:
  - platform: opentherm
    name: "Aquecimento Central"

# Switches de controle
switch:
  - platform: opentherm
    ch_enable:
      name: "Aquecimento Central"
    dhw_enable:
      name: "Agua Quente"

# Sensores binarios (status)
binary_sensor:
  - platform: opentherm
    flame:
      name: "Chama Ativa"
    fault:
      name: "Falha Caldeira"
```

### Requisitos de Hardware

- Adaptador OpenTherm (DIY ou comercial)
- Caldeira compativel com protocolo OpenTherm
- ESP32 ou ESP8266

### Componentes Disponiveis

| Tipo | Entidades |
|------|-----------|
| Sensor | ch_pressure, dhw_temperature, return_temperature, boiler_temperature, modulation, flow_temperature |
| Climate | Controle de aquecimento central |
| Switch | ch_enable (aquecimento), dhw_enable (agua quente) |
| Binary Sensor | flame, fault, ch_active, dhw_active |

### Migracao

Componente novo - nenhuma migracao necessaria.

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao por componente | Claude Code |
| 2026-01-27 | Criacao inicial (por versao) | Claude Code |
