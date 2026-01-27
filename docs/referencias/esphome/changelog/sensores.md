# Sensores - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x
**Cobertura**: Sensors (temperatura, umidade, presenca, qualidade ar, eletricos, etc.) e Binary Sensors

---

## Quando Consultar Este Arquivo

- Ao trabalhar com qualquer tipo de sensor (analog, digital, I2C, UART, BLE)
- Ao adicionar sensores de presenca (mmWave, PIR, radar)
- Ao configurar sensores de energia/potencia (HLW8012, PZEM, etc.)
- Ao usar sensores de qualidade do ar (CO2, PM, VOC, AQI)
- Ao trabalhar com sensores de temperatura/umidade
- Ao configurar binary sensors
- Quando sensores apresentarem leituras inconsistentes apos atualizacao

---

## Resumo de Mudancas Criticas

| Versao | Componente | Mudanca | Impacto | Acao Requerida |
|--------|------------|---------|---------|----------------|
| 2024.11.0 | Power sensors | Unidade reactive power mudou de VAR para var | Dashboards podem quebrar | Atualizar templates e automacoes |
| 2024.12.0 | SGP30 | `update_interval` padrao agora e 60s | Leituras menos frequentes | Definir `update_interval` explicito se necessario |
| 2025.3.0 | MLX90393 | `gain` e `resolution` estavam invertidos, corrigido | Leituras podem mudar | Recalibrar se necessario |
| 2025.5.0 | Microphone | Sistema unificado, `gain_factor: 4` para 32-bit samples | Config audio muda | Atualizar configs de microfone |
| 2025.8.0 | LD2410/LD2450 | Usam native filters ao inves de throttle | Comportamento de atualizacao muda | Verificar frequencia de updates |
| 2025.9.0 | Preferences | `device_id` incluido em preferences | Calibracoes podem resetar | Recalibrar sensores no primeiro boot |
| 2025.11.0 | HM3301 | AQI usa EPA 2024 standard | Valores AQI mudam | Ajustar thresholds se necessario |
| 2026.1.0 | Geral | Web server URLs usam nomes de entidades | URLs antigas deprecadas | Atualizar integracao externa |

---

## Detalhes por Versao

### 2026.1.0 - Janeiro 2026

#### Novos Sensores

| Componente | Descricao | Uso |
|------------|-----------|-----|
| **RD-03D mmWave Radar** | Multi-target tracking com coordenadas, velocidade, distancia | Presenca avancada |
| **BTHome MiThermometer** | Dados Xiaomi via Bluetooth LE | Temperatura/umidade BLE |
| **AQI Sensor** | Calcula Air Quality Index de PM data (EPA/CAQI) | Qualidade do ar |

#### Mudancas em Sensores

- **Web Server URLs**: Sensores agora usam nomes de entidades diretamente nas URLs
  - Barra `/` proibida em nomes de sensores
  - Limite de 120 caracteres em nomes
  - URLs antigas (`/sensor/object_id`) deprecadas (remocao em 2026.7.0)

- **Lambda API**: Metodos que retornavam ponteiros de string agora retornam `StringRef`
  - Usar `.empty()` ao inves de verificacoes de null
  - Usar `==` ao inves de `strcmp()`

#### Performance

- Zero-Copy API Protocol: ~42% mais entidades por pacote
- Heap Churn Reduction: ~6KB IRAM economizados no ESP32

---

### 2025.12.0 - Dezembro 2025

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **hlw8032** | Power metering IC single-phase | UART |
| **stts22h** | High-accuracy temperature | I2C |
| **thermopro_ble** | ThermoPro BLE temp/humidity | BLE |
| **hc8** | CO2 sensor | UART |

#### Breaking Changes

- **Micronova**: `update_interval` movido do hub para entidades individuais de sensor
  ```yaml
  # ANTES (no hub)
  micronova:
    update_interval: 10s

  # AGORA (por entidade)
  sensor:
    - platform: micronova
      update_interval: 10s
  ```

- **Text Sensor**: `raw_state` publico removido - usar `get_raw_state()`

#### Performance

- **Sensor timeout filters**: Loop-based ao inves de scheduler (~70 heap ops/s eliminados)
- **24-32 bytes por text sensor**: Eliminado string duplicado sem filtros

---

### 2025.11.0 - Novembro 2025

#### Breaking Changes

- **HM3301 AQI**: Agora usa EPA 2024 standard
  - Valores de AQI podem mudar significativamente
  - Ajustar thresholds de automacoes se necessario

- **GDK101 firmware**: Agora reportado como string (era numerico)

- **Uponor Smatrix**: Enderecos agora sao 32-bit combinados

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **HDC2010** | Temperature/humidity sensor | I2C |
| **MCP3221** | I2C A-D converter | I2C |
| **HLK-FM22X** | Face recognition module | UART |
| **BH1900NUX** | Temperature sensor | I2C |

#### Performance

- **Sliding window filters**: ate 25KB RAM economizados
- **Sensor filters**: 90% economia em certas configs
- Memoria GPIO reduzida 50% via bit-packing

---

### 2025.10.0 - Outubro 2025

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **WTS01** | UART temperature sensor | UART |
| **LM75B** | I2C temperature sensor | I2C |

#### Mudancas

- **MMC5603**: Fator de calculo corrigido (leituras podem mudar)

#### Performance

- Logger: 35-72% mais rapido (afeta sensor logging)

---

### 2025.9.0 - Setembro 2025

#### Breaking Changes

- **Core Preference Storage**: Agora inclui `device_id` para evitar conflitos
  - **IMPACTO CRITICO**: Dados de calibracao de sensores podem precisar reconfiguracao no primeiro upgrade
  - Sensores que armazenam calibracao local serao afetados

- **Bluetooth Proxy**: `active` agora padrao `true` (era `false`)
  - Para manter comportamento anterior: `active: false`

#### Performance

- Strings de componentes movidos para flash (ESP8266)
- GPIO expander caching de I2C
- Otimizacoes de logging

---

### 2025.8.0 - Agosto 2025

#### Breaking Changes

- **LD2410 e LD2450**: Agora usam native filters ao inves de throttle filter
  - Comportamento de atualizacao pode mudar
  - Verificar frequencia de updates nos dashboards

  ```yaml
  # Comportamento anterior (throttle)
  # Agora usa native filters automaticamente
  sensor:
    - platform: ld2410
      # Native filters aplicados internamente
  ```

- **ESP32 Touch Sensor**: Workaround para regressao ESP-IDF v5.4

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **LD2412** | Presence detection (novo modelo) | UART |
| **Runtime Stats** | Performance debugging | Internal |

#### Melhorias em Sensores

- **Sensor timeout filter**: Com last value e default filters
- **`throttle_with_priority`**: Novo filtro para priorizacao
- **Device class "absolute_humidity"**: Nova classe de dispositivo

#### Performance

- 10x string encoding mais rapido
- BLE scanning com batched processing

---

### 2025.7.0 - Julho 2025

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **OPT3001** | Ambient light sensor | I2C |
| **LPS22** | Barometric pressure | I2C |
| **GL-R01** | Time-of-flight distance | UART |
| **Xiaomi XMWSDJ04MMC** | BLE temp/humidity | BLE |

#### Mudancas

- **SMT100**: `dielectric_constant` renomeado para `permittivity`
  ```yaml
  # ANTES
  sensor:
    - platform: smt100
      dielectric_constant:
        name: "Dielectric"

  # AGORA
  sensor:
    - platform: smt100
      permittivity:
        name: "Permittivity"
  ```

- **Binary Sensor**: Adicionada action `invalidate_state`

- **Entity name uniqueness**: Agora enforced por device

#### Performance

- Component memory ate 40% menor
- Sensor entity memory footprint menor

---

### 2025.6.0 - Junho 2025

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **CM1106** | CUBIC NDIR CO2 sensor | UART |
| **LC709203F** | Battery monitor | I2C |

#### Melhorias

- **BME68x BSEC2**: Agora independente de Arduino (funciona com ESP-IDF)

#### Performance

- Native API communication melhorada para sensores
- RAM usage reduzido

---

### 2025.5.0 - Maio 2025

#### Breaking Changes

- **Microphone**: Sistema unificado
  - `gain_factor: 4` recomendado para 32-bit samples
  - Configs de microfone precisam revisao

  ```yaml
  microphone:
    - platform: i2s_audio
      gain_factor: 4  # Para 32-bit samples
  ```

---

### 2025.3.0 - Marco 2025

#### Breaking Changes

- **MLX90393**: `gain` e `resolution` estavam invertidos, agora corrigidos
  - Leituras de campo magnetico podem mudar
  - Recalibracao pode ser necessaria

#### Novos Sensores

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **LD2450** | mmWave presence (modelo atualizado) | UART |
| **MSA301** | 3-axis accelerometer | I2C |
| **MSA311** | 3-axis accelerometer | I2C |

---

### 2024.12.0 - Dezembro 2024

#### Breaking Changes

- **SGP30**: `update_interval` padrao agora e 60 segundos
  - Antes nao tinha padrao explicito
  - Para manter comportamento anterior, definir explicitamente:

  ```yaml
  sensor:
    - platform: sgp30
      update_interval: 1s  # Se precisar mais frequente
  ```

#### Novos Sensores mmWave

| Componente | Descricao | Interface |
|------------|-----------|-----------|
| **MR60FDV2** | mmWave fall detection v2 | UART |
| **MR60BHA2** | mmWave breathing/heart rate v2 | UART |

---

### 2024.11.0 - Novembro 2024

#### Breaking Changes

- **Reactive Power**: Unidade mudou de `VAR` para `var`
  - Afeta sensores de energia (HLW8012, PZEM, etc.)
  - Dashboards e automacoes que verificam unidade podem quebrar

  ```yaml
  # Verificar templates que usam unit_of_measurement
  # VAR -> var (minusculo)
  ```

---

## Sensores por Categoria

### Presenca e Movimento

| Componente | Versao | Tipo | Notas |
|------------|--------|------|-------|
| RD-03D | 2026.1.0 | mmWave | Multi-target, coordenadas |
| LD2412 | 2025.8.0 | mmWave | Presence detection |
| LD2450 | 2025.3.0 | mmWave | Native filters desde 2025.8.0 |
| LD2410 | - | mmWave | Native filters desde 2025.8.0 |
| MR60FDV2 | 2024.12.0 | mmWave | Fall detection |
| MR60BHA2 | 2024.12.0 | mmWave | Breathing/heart rate |
| HLK-FM22X | 2025.11.0 | Camera | Face recognition |

### Temperatura e Umidade

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| stts22h | 2025.12.0 | I2C | High-accuracy |
| thermopro_ble | 2025.12.0 | BLE | ThermoPro |
| HDC2010 | 2025.11.0 | I2C | Temp/humidity |
| BH1900NUX | 2025.11.0 | I2C | Temperature |
| WTS01 | 2025.10.0 | UART | Temperature |
| LM75B | 2025.10.0 | I2C | Temperature |
| BTHome MiThermometer | 2026.1.0 | BLE | Xiaomi |
| Xiaomi XMWSDJ04MMC | 2025.7.0 | BLE | Temp/humidity |

### Qualidade do Ar

| Componente | Versao | Tipo | Notas |
|------------|--------|------|-------|
| AQI Sensor | 2026.1.0 | Calculated | EPA/CAQI |
| hc8 | 2025.12.0 | UART | CO2 |
| CM1106 | 2025.6.0 | UART | NDIR CO2 |
| HM3301 | - | I2C | EPA 2024 desde 2025.11.0 |
| SGP30 | - | I2C | update_interval 60s desde 2024.12.0 |

### Energia e Potencia

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| hlw8032 | 2025.12.0 | UART | Power metering |
| HLW8012 | - | GPIO | VAR->var desde 2024.11.0 |
| PZEM | - | UART/Modbus | VAR->var desde 2024.11.0 |

### Pressao e Ambiente

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| LPS22 | 2025.7.0 | I2C | Barometric pressure |
| OPT3001 | 2025.7.0 | I2C | Ambient light |

### Distancia

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| GL-R01 | 2025.7.0 | UART | Time-of-flight |

### ADC e Conversores

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| MCP3221 | 2025.11.0 | I2C | A-D converter |

### Bateria

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| LC709203F | 2025.6.0 | I2C | Battery monitor |

### Acelerometros

| Componente | Versao | Interface | Notas |
|------------|--------|-----------|-------|
| MSA301 | 2025.3.0 | I2C | 3-axis |
| MSA311 | 2025.3.0 | I2C | 3-axis |
| MLX90393 | - | I2C | gain/resolution corrigido 2025.3.0 |

---

## Checklist de Migracao

### Antes de Atualizar

- [ ] Verificar se usa sensores de energia (VAR -> var)
- [ ] Listar sensores com calibracao local
- [ ] Documentar configuracoes de SGP30 se `update_interval` customizado
- [ ] Verificar uso de LD2410/LD2450 (native filters)
- [ ] Verificar uso de HM3301 (EPA 2024)

### Apos Atualizar

- [ ] Recalibrar sensores se necessario (especialmente apos 2025.9.0)
- [ ] Verificar dashboards com unidades de potencia reativa
- [ ] Testar automacoes baseadas em AQI
- [ ] Verificar frequencia de updates de sensores mmWave

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Criacao inicial | Claude Code |
