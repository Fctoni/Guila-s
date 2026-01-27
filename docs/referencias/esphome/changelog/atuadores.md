# Atuadores - Changelog ESPHome

> Atualizado: 2025-01-27 | Periodo: 2024.11.0 → 2026.1.x

---

## Quando Consultar Este Arquivo

Consulte este arquivo quando trabalhar com:
- **Outputs** (GPIO, PWM, DAC, AC Dimmer)
- **Switches** (reles, GPIO switches)
- **Covers** (persianas, cortinas, portoes)
- **Valves** (valvulas)
- **Fans** (ventiladores)
- **Locks** (fechaduras)
- **Water Heater** (aquecedores de agua)
- **Servos e Steppers**
- **Remote Transmitter** (IR, RF)

---

## Indice de Componentes

- [Output](#output)
- [PWM / LEDC](#pwm--ledc)
- [AC Dimmer](#ac-dimmer)
- [PCA9685](#pca9685)
- [Switch](#switch)
- [Cover](#cover)
- [Valve](#valve)
- [Fan](#fan)
- [Lock](#lock)
- [Water Heater](#water-heater)
- [Servo](#servo)
- [Stepper](#stepper)
- [Remote Transmitter](#remote-transmitter)
- [Remote Receiver](#remote-receiver)
- [CC1101 Transceiver](#cc1101-transceiver)
- [Scripts](#scripts)
- [Binary Sensor (Invalidate State)](#binary-sensor-invalidate-state)

---

## Output

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.8.0 | Feature | Novas actions `output.set_min_power` e `output.set_max_power` | Positivo |
| 2025.7.0 | Otimizacao | Reducao de 40 bytes por componente | Positivo |

### Exemplo de Configuracao

```yaml
output:
  - platform: ledc
    id: pwm_output
    pin: GPIO25
    min_power: 10%
    max_power: 100%

button:
  - platform: template
    name: "Limitar Potencia"
    on_press:
      - output.set_max_power:
          id: pwm_output
          max_power: 50%
      - output.set_min_power:
          id: pwm_output
          min_power: 20%
```

### Notas de Migracao

**Casos de uso para set_min_power/set_max_power:**
- Limitar potencia de dimmers baseado em horario
- Protecao termica dinamica
- Ajuste baseado em carga

---

## PWM / LEDC

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Otimizacao | ESP8266: codigo PWM waveform excluido quando `esp8266_pwm` nao e usado | Positivo - economia de flash |

### Exemplo de Configuracao

```yaml
output:
  - platform: ledc
    id: pwm_led
    pin: GPIO25
    frequency: 1000Hz
```

---

## AC Dimmer

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Feature | Suporte para framework ESP-IDF (antes apenas Arduino) | Positivo |

### Exemplo de Configuracao

```yaml
# Agora funciona com ESP-IDF
esp32:
  framework:
    type: esp-idf

output:
  - platform: ac_dimmer
    id: dimmer1
    gate_pin: GPIO25
    zero_cross_pin: GPIO26
```

### Tabela de Compatibilidade

| Framework | Suporte |
|-----------|---------|
| Arduino | Sim |
| ESP-IDF | Sim (2026.1+) |

---

## PCA9685

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.12.0 | Feature | Phase Balancer para balancear fases em outputs PWM | Positivo |

### Exemplo de Configuracao

```yaml
pca9685:
  - id: pca9685_hub
    frequency: 1000

output:
  - platform: pca9685
    pca9685_id: pca9685_hub
    channel: 0
    id: output1
    phase_balancer: true  # Novo em 2025.12.0
```

---

## Switch

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.8.0 | Feature | Nova action `switch.control` - controla sem disparar automacoes | Positivo |
| 2025.8.0 | Feature | Novo metodo `control()` para lambdas | Positivo |
| 2025.8.0 | Feature | Novo trigger `on_state` - unifica mudanca de estado | Positivo |
| 2025.7.0 | Breaking | Nomes de entidades devem ser unicos por device | Medio |

### Exemplo de Configuracao

```yaml
switch:
  - platform: gpio
    pin: GPIO25
    id: meu_switch
    name: "Rele"
    on_state:
      - logger.log:
          format: "Switch mudou para: %d"
          args: ['x']

button:
  - platform: template
    name: "Controle Silencioso"
    on_press:
      # Nao dispara on_turn_on/on_turn_off
      - switch.control:
          id: meu_switch
          state: true
```

### Uso em Lambdas

```cpp
// Controle programatico sem triggers
id(meu_switch).control(true);  // Liga sem triggers
id(meu_switch).control(false); // Desliga sem triggers
```

### Notas de Migracao

**switch.control vs switch.turn_on:**
- `switch.turn_on/turn_off`: Dispara automacoes (`on_turn_on`, `on_turn_off`)
- `switch.control`: NAO dispara automacoes - util para sincronizacao

---

## Cover

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.9.0 | Otimizacao | GPIO Expanders (MCP23017, PCF8574) agora usam cache I2C | Positivo - melhor performance |
| 2025.7.0 | Otimizacao | Reducao de 40 bytes por componente | Positivo |

### Exemplo de Configuracao

```yaml
cover:
  - platform: template
    name: "Persiana Sala"
    id: persiana_sala
    open_action:
      - switch.turn_on: motor_abre
    close_action:
      - switch.turn_on: motor_fecha
    stop_action:
      - switch.turn_off: motor_abre
      - switch.turn_off: motor_fecha
```

---

## Valve

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.7.0 | Otimizacao | Reducao de 40 bytes por componente | Positivo |

### Exemplo de Configuracao

```yaml
valve:
  - platform: template
    name: "Valvula Irrigacao"
    id: valvula_jardim
    open_action:
      - switch.turn_on: rele_valvula
    close_action:
      - switch.turn_off: rele_valvula
```

---

## Fan

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Breaking | `get_preset_mode()` retorna `StringRef` ao inves de ponteiro | Alto - quebra lambdas |
| 2025.11.0 | Breaking | Preset modes preserva ordem YAML (antes era alfabetica) | Medio |

### Exemplo de Configuracao

```yaml
fan:
  - platform: template
    name: "Ventilador"
    preset_modes:
      - "auto"       # Aparece primeiro (ordem YAML preservada)
      - "turbo"      # Segundo
      - "silencioso" # Terceiro
    # Antes de 2025.11.0: aparecia como "auto", "silencioso", "turbo" (alfabetico)
```

### Notas de Migracao

**get_preset_mode() - Breaking Change 2026.1.0:**

```cpp
// ANTES (nao funciona mais)
if (id(meu_fan).get_preset_mode() != nullptr) {
  // ...
}

// AGORA
if (!id(meu_fan).get_preset_mode().empty()) {
  // ...
}

// Comparacao de strings
if (id(meu_fan).get_preset_mode() == "turbo") {
  // ...
}
```

**Ordem de Preset Modes - Breaking Change 2025.11.0:**

```yaml
# Se dependia de ordem alfabetica, reordenar manualmente
fan:
  - platform: template
    name: "Ventilador"
    preset_modes:
      - "auto"       # Definir na ordem desejada
      - "low"
      - "medium"
      - "high"
      - "turbo"
```

---

## Lock

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.10.0 | Otimizacao | Representacao interna mudou para bitmask | Positivo - economia de memoria |

### Exemplo de Configuracao

```yaml
lock:
  - platform: template
    name: "Fechadura Porta"
    # Implementacao normal - economia automatica
```

### Notas de Migracao

**Economia de memoria (automatica):**
- 388 bytes de flash por lock
- 23 bytes de RAM por lock

Nenhuma acao requerida - a economia e automatica.

---

## Water Heater

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Feature | Componente completamente NOVO | Positivo |

### Exemplo de Configuracao

```yaml
water_heater:
  - platform: template
    name: "Aquecedor de Agua"
    current_temperature:
      id: temp_sensor
    target_temperature:
      initial_value: 50
      restore_value: true
    mode:
      initial_value: "eco"
    modes:
      - "off"
      - "eco"
      - "electric"
      - "gas"
      - "heat_pump"
```

### Notas de Migracao

**Recursos disponiveis:**
- Suporte no core, template e web server
- Modos configuraveis: off, eco, electric, gas, heat_pump, solar, high_demand
- Temperatura alvo configuravel
- Integracao com Home Assistant

### Tabela de Compatibilidade

| Framework | Suporte |
|-----------|---------|
| Arduino | Sim |
| ESP-IDF | Sim |

---

## Servo

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.7.0 | Otimizacao | Reducao de 40 bytes por componente | Positivo |

### Exemplo de Configuracao

```yaml
servo:
  - id: meu_servo
    output: pwm_servo

output:
  - platform: ledc
    id: pwm_servo
    pin: GPIO18
    frequency: 50Hz
```

### Tabela de Compatibilidade

| Framework | Suporte |
|-----------|---------|
| Arduino | Sim |
| ESP-IDF | Sim |

---

## Stepper

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.7.0 | Otimizacao | Reducao de 40 bytes por componente | Positivo |

### Exemplo de Configuracao

```yaml
stepper:
  - platform: a4988
    id: meu_stepper
    step_pin: GPIO25
    dir_pin: GPIO26
    max_speed: 250 steps/s
```

### Tabela de Compatibilidade

| Framework | Suporte |
|-----------|---------|
| Arduino | Sim |
| ESP-IDF | Sim |

---

## Remote Transmitter

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.12.0 | Feature | Suporte RP2040 (Raspberry Pi Pico) | Positivo |
| 2025.11.0 | Breaking | Modo padrao agora e NAO-BLOQUEANTE | Alto |
| 2025.11.0 | Otimizacao | Ultra-low latency: 0-16ms reduzido para ~12 microsegundos | Positivo |

### Exemplo de Configuracao

```yaml
remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%

button:
  - platform: template
    name: "Enviar IR"
    on_press:
      - remote_transmitter.transmit_nec:
          address: 0x1234
          command: 0x5678
          blocking: true  # Adicionar se precisar esperar
```

### Notas de Migracao

**Modo nao-bloqueante - Breaking Change 2025.11.0:**

```yaml
# ANTES (bloqueante implicito)
on_press:
  - remote_transmitter.transmit_nec:
      address: 0x1234
      command: 0x5678
  - logger.log: "Enviado"  # Executava APOS transmissao

# AGORA (nao-bloqueante por padrao)
on_press:
  - remote_transmitter.transmit_nec:
      address: 0x1234
      command: 0x5678
      blocking: true  # Adicionar para garantir ordem
  - logger.log: "Enviado"
```

**Impacto:** Automacoes que dependiam de transmissao bloqueante podem ter timing diferente.

---

## Remote Receiver

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.12.0 | Feature | Suporte RP2040 (Raspberry Pi Pico) | Positivo |
| 2025.10.0 | Feature | Suporte a demodulacao em ESP32 | Positivo |

### Exemplo de Configuracao

```yaml
remote_receiver:
  pin: GPIO5
  dump: all
```

---

## CC1101 Transceiver

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.12.0 | Feature | Componente NOVO - transceiver Sub-1GHz (433MHz) | Positivo |

### Exemplo de Configuracao

```yaml
cc1101:
  cs_pin: GPIO5
  gdo0_pin: GPIO4
  gdo2_pin: GPIO2

remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%
```

### Notas de Migracao

**Recursos:**
- Modulacao ASK/OOK
- Funciona com remote receiver/transmitter
- Frequencia 433MHz (Sub-1GHz)

---

## Scripts

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | Breaking | `max_runs` padrao mudou de ilimitado para 5 | Alto |
| 2025.9.0 | Otimizacao | Memory pools de scheduler - reducao de fragmentacao | Positivo |

### Exemplo de Configuracao

```yaml
script:
  - id: meu_script
    mode: parallel
    max_runs: 10  # Definir explicitamente se precisar mais que 5
    then:
      - logger.log: "Executando"
```

### Notas de Migracao

**max_runs - Breaking Change 2025.11.0:**

```yaml
# ANTES (funcionava com paralelo ilimitado)
script:
  - id: acionar_rele
    mode: parallel
    then:
      - switch.turn_on: rele1
      - delay: 1s
      - switch.turn_off: rele1

# AGORA (definir max_runs explicitamente)
script:
  - id: acionar_rele
    mode: parallel
    max_runs: 20  # Ou o numero necessario
    then:
      - switch.turn_on: rele1
      - delay: 1s
      - switch.turn_off: rele1
```

**Impacto:** Scripts que dependiam de execucoes paralelas ilimitadas podem falhar silenciosamente.

---

## Binary Sensor (Invalidate State)

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.7.0 | Feature | Nova action `binary_sensor.invalidate_state` | Positivo |

### Exemplo de Configuracao

```yaml
binary_sensor:
  - platform: template
    id: sensor_virtual
    name: "Sensor Virtual"

button:
  - platform: template
    name: "Invalidar Sensor"
    on_press:
      - binary_sensor.invalidate_state:
          id: sensor_virtual
```

### Notas de Migracao

**Casos de uso:**
- Reset de sensores virtuais
- Sincronizacao com estados externos
- Tratamento de erros de sensores

---

## Troubleshooting

### Output

**Problema:** Actions `set_min_power`/`set_max_power` nao funcionam
- **Causa:** Versao anterior a 2025.8.0
- **Solucao:** Atualizar ESPHome para 2025.8.0+

### Switch

**Problema:** Nomes duplicados causam erro
- **Causa:** A partir de 2025.7.0 nomes devem ser unicos por device
- **Solucao:** Renomear entidades duplicadas

### Fan

**Problema:** Lambda com `get_preset_mode()` falha com erro de compilacao
- **Causa:** API mudou em 2026.1.0 - retorna `StringRef` ao inves de ponteiro
- **Solucao:** Usar `.empty()` ao inves de `!= nullptr`

**Problema:** Preset modes em ordem errada no HA
- **Causa:** Antes de 2025.11.0 era alfabetico, agora preserva ordem YAML
- **Solucao:** Reordenar no YAML conforme desejado

### Remote Transmitter

**Problema:** Automacao executa fora de ordem apos transmissao IR
- **Causa:** Modo padrao mudou para nao-bloqueante em 2025.11.0
- **Solucao:** Adicionar `blocking: true` na transmissao

### Scripts

**Problema:** Script para de executar apos 5 execucoes paralelas
- **Causa:** `max_runs` padrao mudou para 5 em 2025.11.0
- **Solucao:** Definir `max_runs` explicitamente com valor maior

### AC Dimmer

**Problema:** AC Dimmer nao funciona com ESP-IDF
- **Causa:** Versao anterior a 2026.1.0
- **Solucao:** Atualizar para 2026.1.0+ ou usar Arduino framework

---

## Tabela de Compatibilidade por Framework

| Componente | Arduino | ESP-IDF | Notas |
|------------|---------|---------|-------|
| AC Dimmer | Sim | Sim (2026.1+) | ESP-IDF suporte novo |
| GPIO Output | Sim | Sim | |
| LEDC PWM | Sim | Sim | |
| ESP8266 PWM | Sim | N/A | Apenas ESP8266 |
| Servo | Sim | Sim | |
| Stepper | Sim | Sim | |
| Remote Transmitter | Sim | Sim | |
| Remote Receiver | Sim | Sim | |
| Water Heater | Sim | Sim | Novo em 2026.1 |

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao: organizacao por componente | Claude Code |
| 2026-01-27 | Criacao inicial (organizacao por versao) | Claude Code |
