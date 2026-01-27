# Core e Configuracao - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

> Cobertura: Core ESPHome, packages, substitutions, globals, external_components,
> script, interval, time/RTC, JSON, factory_reset

---

## Quando Consultar Este Arquivo

- Ao trabalhar com **packages** e imports condicionais
- Ao usar **substitutions** com expressoes Jinja2
- Ao configurar **scripts** e suas limitacoes de execucao
- Ao usar **external_components** (substitui custom_component)
- Ao trabalhar com **time/RTC** e sincronizacao SNTP
- Ao configurar **globals** e preferencias persistentes
- Ao usar **interval** ou outros triggers temporais
- Ao trabalhar com **JSON** e ArduinoJson
- Ao lidar com **factory_reset** ou preferencias

---

## Resumo de Mudancas Criticas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2026.1.0 | `custom_components` folder deprecado | Alto | Migrar para `external_components` |
| 2025.11.0 | Scripts `max_runs: 5` por padrao | Medio | Definir `max_runs` explicitamente se precisar mais |
| 2025.11.0 | Select `.state` deprecado | Medio | Usar `current_option()` em lambdas |
| 2025.9.0 | Preference storage inclui `device_id` | Medio | Dados de calibracao podem precisar reconfiguracao |
| 2025.7.0 | ArduinoJson 7.x | Alto | Atualizar lambdas que usam JSON diretamente |
| 2025.7.0 | Jinja2 em substitutions | Baixo | Novo recurso disponivel |
| 2025.2.0 | `custom_component` REMOVIDO | Critico | Usar `external_components` |

---

## Detalhes por Versao

### 2026.1.0 (Janeiro 2026)

#### Deprecacoes

**custom_components folder**
- Deprecado, remocao programada para 2026.6.0
- Migrar para `external_components`

```yaml
# NAO USAR (deprecado)
# Pasta custom_components/ com codigo

# USAR external_components
external_components:
  - source:
      type: local
      path: components
```

#### Lambda API Changes

Metodos que retornavam ponteiros de string agora retornam `StringRef`:
- `Fan::get_preset_mode()`
- `Select::current_option()`
- `Climate::get_custom_fan_mode()`, `get_custom_preset()`
- `Event::get_last_event_type()`
- `Light`: metodos de nome de efeito

**Migracao**:
```cpp
// ANTES
if (id(my_select).state != nullptr) {
  ESP_LOGD("test", "State: %s", id(my_select).state);
}

// AGORA
if (!id(my_select).current_option().empty()) {
  ESP_LOGD("test", "State: %s", id(my_select).current_option().c_str());
}

// ANTES
if (strcmp(option, "value") == 0) { ... }

// AGORA
if (option == "value") { ... }
```

#### Limite de Nomes de Entidades

- Limite de 120 caracteres em nomes de entidades
- Barra `/` proibida em nomes

#### Performance

- **Zero-Copy API Protocol**: ~42% mais entidades por pacote
- **Heap Churn Reduction**: ~6KB IRAM economizados no ESP32
- **Object ID RAM Removal**: ~886 bytes economizados no ESP8266, ~497 no ESP32

---

### 2025.12.0 (Dezembro 2025)

#### Conditional Packages (NOVO)

Packages suportam imports condicionais via Jinja2 e booleanos.

```yaml
substitutions:
  use_base: "true"
  use_sensors: "false"

packages:
  base: !include
    file: base.yaml
    condition: ${use_base}

  sensors: !include
    file: sensors.yaml
    condition: ${use_sensors}
```

#### API Action Responses (NOVO)

Native API agora suporta respostas estruturadas de actions.

Tres modos disponiveis:
1. **Fire-and-forget**: Sem resposta
2. **Status-only**: Resposta de sucesso/erro
3. **Data responses**: Dados opcionais ou obrigatorios

#### Performance

- **~8KB IRAM**: Funcoes FreeRTOS movidas para flash
- **~1.5KB IRAM adicional**: Ring buffer em flash
- **Zero-copy API commands**: Select e light effects processam strings diretamente
- **Sensor timeout filters**: Loop-based ao inves de scheduler (~70 heap ops/s eliminados)

#### Novo Hardware RTC

| Componente | Descricao |
|------------|-----------|
| bm8563 | I2C RTC chip |

---

### 2025.11.0 (Novembro 2025)

#### Scripts max_runs (BREAKING)

O padrao de `max_runs` para scripts mudou de ilimitado para 5.

```yaml
script:
  - id: my_script
    # ANTES: max_runs ilimitado por padrao
    # AGORA: max_runs: 5 por padrao
    max_runs: 0  # Definir 0 para ilimitado (comportamento antigo)
    then:
      - logger.log: "Running..."
```

#### Select .state Deprecado (BREAKING)

```cpp
// DEPRECADO
auto state = id(my_select).state;

// CORRETO
auto state = id(my_select).current_option();
```

#### Performance Ultra-Low Latency

Latencia de evento reduzida de 0-16ms (media ~8ms) para ~12 microsegundos via thread-safe loop wake mechanism.

Afeta:
- BLE
- USB
- MQTT
- ESP-NOW
- Wake word

#### Memoria

- Sliding window filters: ate 25KB RAM economizados
- Sensor filters: 90% economia em certas configs
- Action framework: menos RAM em automations

#### Novo Hardware RTC

| Componente | Descricao |
|------------|-----------|
| RX8130 | RTC chip |

#### Ferramentas

Nova ferramenta para analise de memoria:

```bash
esphome analyze-memory config.yaml
```

Mostra breakdown de uso por componente.

---

### 2025.10.0 (Outubro 2025)

#### YAML !literal Tag (NOVO)

Nova tag YAML para strings literais sem processamento.

```yaml
substitutions:
  raw_value: !literal "{{ template }}"  # Nao processado como Jinja2
```

#### Dynamic Component Auto-Loading (NOVO)

Componentes podem ser carregados dinamicamente baseado em dependencias.

#### Performance

- Logger: 35-72% mais rapido
- Non-blocking OTA auth

---

### 2025.9.0 (Setembro 2025)

#### Preference Storage (BREAKING)

Preference storage agora inclui `device_id` para evitar conflitos.

**Impacto**:
- Dispositivos podem perder preferencias armazenadas no primeiro upgrade
- Dados de calibracao podem precisar reconfiguracao

#### SNTP Callbacks (NOVO)

```yaml
time:
  - platform: sntp
    on_time_sync:
      - logger.log: "Time synchronized!"
```

#### Performance

- Strings de componentes movidos para flash (ESP8266)
- Otimizacoes de logging via compile-time strings

---

### 2025.8.0 (Agosto 2025)

#### Performance

- 10x string encoding mais rapido com memcpy otimizado
- Scheduler com menos millis() calls

---

### 2025.7.0 (Julho 2025)

#### Jinja2 em Substitutions (NOVO)

```yaml
substitutions:
  base_temp: "20"
  high_temp: "${ ${base_temp} + 5 }"  # = 25

  # Expressoes matematicas
  double_value: "${ ${base_temp} * 2 }"  # = 40

  # Condicionais simples
  mode: "heating"
  target: "${ 22 if '${mode}' == 'heating' else 18 }"
```

#### ArduinoJson 7.x (BREAKING)

ArduinoJson atualizado para versao 7.2.0. Custom components usando ArduinoJson diretamente requerem migracao.

**Principais mudancas da API**:
```cpp
// ANTES (v6)
DynamicJsonDocument doc(1024);
deserializeJson(doc, json_string);
const char* value = doc["key"];

// AGORA (v7)
JsonDocument doc;
deserializeJson(doc, json_string);
const char* value = doc["key"];
// Ou usar auto-sizing
```

#### Memory Logger Callback API

Logger callback API modificado para incluir message length.

```cpp
// ANTES
void callback(int level, const char* tag, const char* msg);

// AGORA
void callback(int level, const char* tag, const char* msg, size_t len);
```

#### Entity Name Uniqueness

Nomes de entidades agora devem ser unicos por device.

#### Component Memory

Component memory reduzido 40 bytes por componente.

---

### 2025.6.0 (Junho 2025)

#### API Deferred Queue (BREAKING)

API deferred queue substituido por message batching.

#### Component/Application State (BREAKING)

Tipo alterado de `uint32_t` para `uint8_t`.

```cpp
// ANTES
uint32_t state = App.get_component_state();

// AGORA
uint8_t state = App.get_component_state();
```

#### Entity Memory

Entity memory otimizado via bit-packing.

#### Application Area Field

Tipo alterado de `std::string` para `const char*`.

---

### 2025.2.0 (Fevereiro 2025)

#### custom_component REMOVIDO (BREAKING CRITICO)

O recurso `custom_component` foi completamente removido.

```yaml
# NAO FUNCIONA MAIS
custom_component:
  - lambda: |-
      return new MyCustomComponent();

# USAR external_components
external_components:
  - source:
      type: local
      path: my_components
    components: [my_component]
```

**Migracao**:
1. Criar pasta `components/` no projeto
2. Criar estrutura de componente ESPHome valida
3. Referenciar via `external_components`

---

## Checklist de Migracao

### Para 2026.1.x

- [ ] Migrar `custom_components` folder para `external_components`
- [ ] Atualizar lambdas que usam `.state` em Select para `.current_option()`
- [ ] Verificar verificacoes de null em strings - usar `.empty()`
- [ ] Verificar nomes de entidades (< 120 chars, sem `/`)

### Para 2025.11.x

- [ ] Definir `max_runs` explicitamente em scripts se precisar mais que 5
- [ ] Atualizar lambdas que usam Select `.state`

### Para 2025.7.x

- [ ] Atualizar codigo que usa ArduinoJson diretamente
- [ ] Verificar logger callbacks customizados
- [ ] Verificar nomes de entidades duplicados

### Para 2025.2.x

- [ ] Migrar qualquer `custom_component` para `external_components`

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Criacao inicial | Claude Code |
