# Core e Frameworks - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

> Documento reorganizado por componente/topico para facilitar consulta.

**Arquivos Relacionados**:
- [frameworks-build.md](frameworks-build.md) - Detalhes de Python, PSRAM, placas
- [core-config.md](core-config.md) - Scripts, globals, time/RTC, JSON
- [api-seguranca-ota.md](api-seguranca-ota.md) - API, OTA, seguranca

---

## Indice de Topicos

1. [esphome: (Configuracao Base)](#1-esphome-configuracao-base)
2. [Framework ESP-IDF](#2-framework-esp-idf)
3. [Framework Arduino](#3-framework-arduino)
4. [Packages](#4-packages)
5. [External Components](#5-external-components)
6. [Substitutions (Jinja2)](#6-substitutions-jinja2)
7. [Lambda/C++ (StringRef)](#7-lambdac-stringref)
8. [Logger](#8-logger)
9. [Build System](#9-build-system)
10. [custom_component (Deprecado/Removido)](#10-custom_component-deprecadoremovido)
11. [ArduinoJson](#11-arduinojson)
12. [YAML Features](#12-yaml-features)

---

## 1. esphome: (Configuracao Base)

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | Limite 120 chars em nomes de entidades | Medio | Verificar nomes longos |
| 2026.1.0 | `/` proibido em nomes de entidades | Medio | Renomear entidades com barra |

### Exemplo Atual (2026.1.x)

```yaml
esphome:
  name: esp-sala                    # max 120 chars, sem /
  friendly_name: "ESP Sala"         # max 120 chars, sem /
  # comment: "Descricao do device"  # opcional
```

### Migracao

**Limite de Nomes (2026.1.0)**:
- URLs do web server usam nomes diretamente
- Nomes maiores que 120 caracteres causam erro
- Caracter `/` invalido em qualquer nome

```yaml
# INVALIDO
sensor:
  - platform: template
    name: "Sensor/Temperatura/Sala"  # ERRO: contem /

# VALIDO
sensor:
  - platform: template
    name: "Sensor Temperatura Sala"
```

---

## 2. Framework ESP-IDF

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | ESP-IDF e framework **padrao** | Alto | Definir `framework: type: arduino` se necessario |
| 2025.7.0 | ESP-IDF 4.x **removido** | Critico | Usar IDF 5.3.2+ |
| 2025.6.0 | ESP-IDF 5.3.2 padrao | Medio | Ultima versao com IDF 4.x disponivel |

### Exemplo Atual (2026.1.x)

```yaml
esp32:
  board: esp32dev
  framework:
    type: esp-idf           # padrao em 2026.1.0
    version: recommended    # 5.5.2 atualmente
```

### Beneficios ESP-IDF vs Arduino

| Metrica | ESP-IDF | Arduino |
|---------|---------|---------|
| Tamanho binario | 100% (base) | 140-160% |
| Tempo de compilacao | 1x | 2-3x mais lento |
| RAM livre | Mais | Menos |
| Novos recursos | Primeiro | Depois |
| Suporte novos chips | Completo | Parcial |

### Chips Suportados (ESP-IDF 5.x)

- ESP32, ESP32-S2, ESP32-S3, ESP32-C3
- ESP32-C6: RISC-V, Wi-Fi 6, Thread/Zigbee (2025.6.0+)
- ESP32-H2: RISC-V, BLE, Thread/Zigbee (2025.6.0+)
- ESP32-P4: Dual-core RISC-V high-performance (2025.6.0+)

### Migracao

**De Arduino para ESP-IDF**:
```yaml
# ANTES (Arduino)
esp32:
  board: esp32dev
  framework:
    type: arduino

# DEPOIS (ESP-IDF)
esp32:
  board: esp32dev
  framework:
    type: esp-idf
    version: recommended
```

**De IDF 4.x para 5.x** (obrigatorio desde 2025.7.0):
```yaml
# NAO FUNCIONA MAIS
esp32:
  framework:
    type: esp-idf
    version: 4.4.7  # ERRO!

# CORRETO
esp32:
  framework:
    type: esp-idf
    version: recommended  # ou 5.3.2+
```

---

## 3. Framework Arduino

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | Nao mais padrao (ESP-IDF e padrao) | Alto | Declarar explicitamente se necessario |
| 2025.10.0 | Arduino como componente IDF | Medio | Builds 2-3x mais lentos |

### Exemplo Atual (2026.1.x)

```yaml
esp32:
  board: esp32dev
  framework:
    type: arduino  # Deve declarar explicitamente
```

### Componentes que REQUEREM Arduino

Estes componentes nao funcionam com ESP-IDF:
- `heatpumpir`
- `midea`
- `wled` (efeitos)
- `fastled_clockless` / `fastled_spi`
- `neopixelbus`

### Migracao

**2025.10.0**: Arduino agora compila como componente sobre ESP-IDF internamente.
- Impacto: builds 2-3x mais lentos
- Beneficio: 20-30KB RAM economizados, binarios menores

**2026.1.0**: Se precisar Arduino, deve declarar explicitamente:
```yaml
# ANTES (Arduino era implicito)
esp32:
  board: esp32dev

# AGORA (ESP-IDF e padrao, Arduino deve ser explicito)
esp32:
  board: esp32dev
  framework:
    type: arduino  # obrigatorio se precisar
```

---

## 4. Packages

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.12.0 | Conditional packages via Jinja2 | Baixo | Novo recurso disponivel |

### Exemplo Atual (2026.1.x)

**Packages basicos**:
```yaml
packages:
  base: !include common/base.yaml
  wifi: !include common/wifi.yaml
```

**Packages com variaveis**:
```yaml
packages:
  sensors: !include
    file: packages/sensors.yaml
    vars:
      room: "Sala"
      update_interval: "60s"
```

**Packages condicionais** (2025.12.0+):
```yaml
substitutions:
  use_sensors: "true"
  use_display: "false"

packages:
  sensors: !include
    file: packages/sensors.yaml
    condition: ${use_sensors}      # Incluido

  display: !include
    file: packages/display.yaml
    condition: ${use_display}      # Ignorado
```

### Migracao

Nenhuma migracao necessaria. Conditional packages e recurso novo aditivo.

---

## 5. External Components

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | `custom_components` folder deprecado | Alto | Migrar para external_components |
| 2025.8.0 | Melhorias em carregamento dinamico | Baixo | Novos recursos disponiveis |

### Exemplo Atual (2026.1.x)

**Componente local**:
```yaml
external_components:
  - source:
      type: local
      path: components
    components: [my_sensor]
```

**Componente do GitHub**:
```yaml
external_components:
  - source:
      type: git
      url: https://github.com/usuario/repo
      ref: main
    components: [custom_component]
```

**Com refresh automatico**:
```yaml
external_components:
  - source:
      type: git
      url: https://github.com/esphome/esphome
      ref: dev
    components: [new_feature]
    refresh: 1d
```

### Migracao

**De custom_components folder** (deprecado 2026.1.0, remocao 2026.6.0):
```yaml
# NAO USAR (deprecado)
# Pasta custom_components/ na raiz

# USAR
external_components:
  - source:
      type: local
      path: components
    components: [meu_componente]
```

---

## 6. Substitutions (Jinja2)

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.7.0 | Jinja2 em substitutions `${ }` | Baixo | Novo recurso disponivel |

### Exemplo Atual (2026.1.x)

**Substitutions basicos**:
```yaml
substitutions:
  device_name: "esp-sala"
  friendly_name: "ESP Sala"
  update_interval: "60s"
```

**Expressoes Jinja2** (2025.7.0+):
```yaml
substitutions:
  base_temp: "20"
  high_temp: "${ ${base_temp} + 5 }"      # = 25
  double_value: "${ ${base_temp} * 2 }"   # = 40

  # Condicionais
  mode: "heating"
  target: "${ 22 if '${mode}' == 'heating' else 18 }"
```

### Migracao

Nenhuma migracao necessaria. Jinja2 e recurso novo aditivo.
Substitutions tradicionais `${var}` continuam funcionando.

---

## 7. Lambda/C++ (StringRef)

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | Metodos retornam StringRef (nao ponteiros) | Alto | Atualizar lambdas customizadas |
| 2025.7.0 | Full C++20 support | Baixo | Novos recursos disponiveis |

### Componentes Afetados

- `Fan`: `get_preset_mode()`
- `Select`: `current_option()` (era `.state`)
- `Climate`: `get_custom_fan_mode()`, `get_custom_preset()`
- `Event`: `get_last_event_type()`
- `Light`: metodos de nome de efeito

### Exemplo Atual (2026.1.x)

```cpp
sensor:
  - platform: template
    name: "Sensor Calculado"
    lambda: |-
      // StringRef para selects
      auto option = id(my_select).current_option();

      // Verificar se vazio
      if (!option.empty()) {
        ESP_LOGD("custom", "Option: %s", option.c_str());
      }

      // Comparacao direta (nao strcmp!)
      if (option == "modo1") {
        return 1.0;
      }

      return 0.0;
```

### Migracao

**De ponteiros para StringRef**:
```cpp
// ANTES (ponteiro)
if (id(my_select).state != nullptr) {
  ESP_LOGD("test", "State: %s", id(my_select).state);
}
if (strcmp(option, "value") == 0) { ... }

// AGORA (StringRef)
if (!id(my_select).current_option().empty()) {
  ESP_LOGD("test", "State: %s", id(my_select).current_option().c_str());
}
if (option == "value") { ... }  // Comparacao direta funciona
```

---

## 8. Logger

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | 100+ componentes com log statements consolidados | Baixo | Nenhuma |
| 2025.10.0 | Compilacao condicional de tags | Baixo | Verificar nivel de log se mensagens sumirem |

### Exemplo Atual (2026.1.x)

```yaml
logger:
  level: INFO
  logs:
    component: DEBUG        # Nivel por componente
    meu_componente: VERBOSE # Verbose para debug detalhado
```

### Migracao

**Logger nao mostra mensagens** (2025.10.0+):
Compilacao condicional pode omitir mensagens de componentes com nivel abaixo do configurado.

```yaml
# Se mensagens sumirem, verificar nivel
logger:
  level: DEBUG
  logs:
    meu_componente: DEBUG
```

---

## 9. Build System

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.11.0 | Ferramenta `analyze-memory` | Baixo | Novo recurso disponivel |
| 2025.11.0 | PSRAM nao auto-carrega | Alto | Adicionar bloco `psram:` explicito |
| 2025.11.0 | `priority` requer inteiros | Medio | Remover aspas de priority |
| 2025.9.0 | Preference storage inclui `device_id` | Medio | Calibracoes podem resetar |
| 2025.8.0 | Python 3.11 obrigatorio | Alto | Atualizar Python |
| 2025.6.0 | Python 3.10 obrigatorio | Alto | Atualizar Python |

### Exemplo Atual (2026.1.x)

**PSRAM explicito** (obrigatorio desde 2025.11.0):
```yaml
# PSRAM nao carrega mais automaticamente
psram:

# ESP32-S3 requer modo especificado
psram:
  mode: octal  # ou quad
  speed: 80MHz # opcional
```

**Priority como inteiro** (obrigatorio desde 2025.11.0):
```yaml
wifi:
  networks:
    - ssid: "MinhaRede"
      priority: 10  # Sem aspas (inteiro)
```

**Analise de memoria**:
```bash
esphome analyze-memory config.yaml
# Mostra breakdown de memoria por componente
```

### Requisitos Python

| Versao ESPHome | Python Minimo |
|----------------|---------------|
| 2026.1.x | 3.11 |
| 2025.8.0+ | 3.11 |
| 2025.6.0-2025.7.x | 3.10 |

```bash
# Verificar versao
python --version  # Deve ser >= 3.11.0

# Atualizar se necessario
# Windows: Baixar de python.org
# Linux: sudo apt install python3.11
# Mac: brew install python@3.11
```

### Migracao

**PSRAM** (2025.11.0):
```yaml
# ANTES: PSRAM carregava automaticamente
# AGORA: Deve configurar explicitamente
psram:
  mode: quad  # ou octal para ESP32-S3
```

**Priority** (2025.11.0):
```yaml
# ANTES (string funcionava)
priority: "10"

# AGORA (deve ser inteiro)
priority: 10
```

**Preference storage** (2025.9.0):
Calibracoes e preferencias podem resetar no primeiro boot apos upgrade.
Isso e esperado e ocorre apenas uma vez.

---

## 10. custom_component (Deprecado/Removido)

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | `custom_components` folder deprecado | Alto | Migrar para external_components |
| 2025.2.0 | `custom_component:` **REMOVIDO** | Critico | Usar external_components |

### Migracao

**custom_component: removido** (2025.2.0):
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

**custom_components folder deprecado** (2026.1.0, remocao 2026.6.0):
```yaml
# NAO USAR
# Pasta custom_components/ na raiz do projeto

# USAR
external_components:
  - source:
      type: local
      path: components
    components: [meu_componente]
```

---

## 11. ArduinoJson

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.7.0 | ArduinoJson 7.x | Alto | Atualizar lambdas JSON |

### Exemplo Atual (2026.1.x)

```cpp
// ArduinoJson 7.x
JsonDocument doc;  // Auto-sizing, sem tamanho
deserializeJson(doc, json_string);
const char* value = doc["key"];
```

### Principais Mudancas ArduinoJson 7.x

- `DynamicJsonDocument` **removido**
- `StaticJsonDocument` **removido**
- Usar `JsonDocument` (auto-sizing)

### Migracao

```cpp
// ANTES (ArduinoJson 6.x)
DynamicJsonDocument doc(1024);
deserializeJson(doc, json_string);
const char* value = doc["key"];

// AGORA (ArduinoJson 7.x)
JsonDocument doc;  // Auto-sizing, sem tamanho
deserializeJson(doc, json_string);
const char* value = doc["key"];
```

---

## 12. YAML Features

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.10.0 | Tag `!literal` | Baixo | Novo recurso disponivel |
| 2024.11.0 | SPI `mode` renomeado para `spi_mode` | Baixo | Atualizar configuracao |

### Exemplo Atual (2026.1.x)

**!literal tag** (2025.10.0+):
```yaml
substitutions:
  # String literal, nao processada como template
  raw_template: !literal "{{ variable }}"
```

**SPI mode** (2024.11.0+):
```yaml
spi:
  spi_mode: 0  # era 'mode'
```

### Migracao

**SPI mode** (2024.11.0):
```yaml
# ANTES
spi:
  mode: 0

# AGORA
spi:
  spi_mode: 0
```

---

## Troubleshooting Rapido

| Erro | Causa | Solucao |
|------|-------|---------|
| "Arduino framework required" | Componente requer Arduino | `framework: type: arduino` |
| "PSRAM not found" | PSRAM nao configurado (2025.11.0+) | Adicionar `psram:` |
| "DynamicJsonDocument not found" | ArduinoJson 7.x | Usar `JsonDocument` |
| "strcmp comparison" | Lambda com StringRef | Usar comparacao direta `==` |
| "Entity name too long" | Nome > 120 chars | Encurtar nome |
| "Invalid character in entity name" | Nome contem `/` | Remover `/` |
| "custom_component not supported" | Removido em 2025.2.0 | Usar `external_components` |
| "Build muito lento" | Arduino sobre ESP-IDF (2025.10.0+) | Migrar para ESP-IDF |
| "Python 3.11 required" | Python desatualizado | Atualizar para 3.11+ |
| "ESP-IDF version 4.x not supported" | IDF 4.x removido (2025.7.0) | Usar `version: recommended` |

---

## Configuracao Completa de Referencia (2026.1.x)

```yaml
# Substitutions com Jinja2
substitutions:
  device_name: "esp-sala"
  friendly_name: "ESP Sala"
  room: "sala"
  update_interval: "60s"
  calculated_value: "${ 10 * 2 }"  # = 20

# Core ESPHome (nomes < 120 chars, sem /)
esphome:
  name: ${device_name}
  friendly_name: ${friendly_name}

# ESP32 com ESP-IDF (padrao desde 2026.1.0)
esp32:
  board: esp32dev
  framework:
    type: esp-idf
    version: recommended

# PSRAM explicito (se aplicavel)
# psram:
#   mode: quad

# Logging
logger:
  level: INFO

# API com encryption (obrigatorio)
api:
  encryption:
    key: !secret api_encryption_key

# OTA
ota:
  - platform: esphome
    password: !secret ota_password

# Packages
packages:
  wifi: !include common/wifi.yaml

# External components (substitui custom_component)
# external_components:
#   - source:
#       type: local
#       path: components
#     components: [my_component]
```

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturado por topico/componente | Claude Code |
| 2026-01-27 | Criacao inicial (por versao) | Claude Code |
