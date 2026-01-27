# Memoria e Performance - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Fonte**: ESPHOME_CHANGELOG_COMPLETO.md

---

## Quando Consultar Este Arquivo

Consulte este documento quando:
- Configurar PSRAM em ESP32/ESP32-S3/ESP32-C5
- Otimizar uso de memoria RAM/flash
- Diagnosticar problemas de memoria insuficiente
- Escolher filtros para sensores (economia de RAM)
- Configurar frameworks (Arduino vs ESP-IDF)
- Entender mudancas de latencia e performance

---

## Resumo de Mudancas Criticas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | ESP-IDF padrao (nao Arduino) | Binarios 40% menores, build 2-3x mais rapido | Definir `framework: type: arduino` se necessario |
| 2026.1.0 | ~6KB IRAM economizados | Melhoria automatica | Nenhuma |
| 2026.1.0 | Zero-copy API protocol | 42% mais entidades por pacote | Nenhuma |
| 2025.12.0 | ESP32-C5 PSRAM quad mode ate 120MHz | Novo suporte | Verificar configuracao |
| 2025.12.0 | ~8KB IRAM via FreeRTOS em flash | Melhoria automatica | Nenhuma |
| 2025.11.0 | **PSRAM nao carrega automaticamente** | CRITICO - Perda de PSRAM | Adicionar bloco `psram:` explicito |
| 2025.11.0 | ESP32-S3 requer mode quad/octal | CRITICO | Especificar mode no bloco psram |
| 2025.11.0 | Sliding window filters | 22-25KB RAM economizados | Considerar uso |
| 2025.11.0 | Ultra-low latency (600-1300x) | ~12us vs ~8ms | Nenhuma |
| 2025.10.0 | Arduino como componente IDF | 20-30KB RAM economizados | Builds Arduino mais lentos |
| 2025.9.0 | GPIO memoria reduzida 50% | Via bit-packing | Nenhuma |
| 2025.8.0 | Python 3.11+ obrigatorio | Instalacao local | Atualizar Python |
| 2025.7.0 | ESP-IDF 4.x removido | IDF 5.3.2+ obrigatorio | Atualizar framework |
| 2025.6.0 | Python 3.10+ obrigatorio | Instalacao local | Atualizar Python |

---

## Detalhes por Versao

### 2026.1.0 (Janeiro 2026)

#### Framework Padrao ESP-IDF
ESP-IDF agora e o framework padrao para ESP32, ESP32-C3, ESP32-S2 e ESP32-S3.

**Beneficios**:
- Binarios ate 40% menores
- Compilacao 2-3x mais rapida
- ~35KB flash economizados com ESP-IDF 5.5.2

**Componentes que ainda requerem Arduino**:
- heatpumpir
- midea
- wled effects

```yaml
# Se precisar Arduino explicitamente:
esp32:
  board: esp32dev
  framework:
    type: arduino
```

#### Otimizacoes de Memoria

| Otimizacao | Economia | Detalhes |
|------------|----------|----------|
| Heap Churn Reduction | ~6KB IRAM | ESP32 |
| Object ID RAM Removal | ~886 bytes ESP8266, ~497 bytes ESP32 | |
| Zero-Copy API Protocol | 42% mais entidades/pacote | |
| ESP32 Network Latency | Reducao | Chamadas diretas socket bypassing VFS |
| Logging consolidado | Reducao flash | 100+ componentes |

#### ESP8266 Especifico
- Serial objects excluidos por padrao (usar `enable_serial: true` em lambdas)
- Codigo PWM waveform excluido quando `esp8266_pwm` nao usado

#### LibreTiny (BK72xx, RTL87xx, LN882x)
- BLE stack desabilitado em BK7231N: **21KB RAM e 225KB flash economizados**

---

### 2025.12.0 (Dezembro 2025)

#### ESP32-C5 PSRAM
Suporte a PSRAM em quad mode ate 120MHz para ESP32-C5.

#### Otimizacoes de Memoria

| Otimizacao | Economia | Detalhes |
|------------|----------|----------|
| FreeRTOS em flash | ~8KB IRAM | |
| Ring buffer em flash | ~1.5KB IRAM adicional | |
| BLE client MAC | 24-40 bytes por cliente | char[18] vs std::string |
| Text sensor | 24-32 bytes por sensor | Sem filtros |
| Sensor timeout filters | ~70 heap ops/s eliminados | Loop-based |

#### Performance
- Zero-copy API commands para select e light effects
- ESP8266 socket latency: ate 16ms eliminados
- Low-latency UART: ~10ms reducao com `wake_loop_on_rx`

---

### 2025.11.0 (Novembro 2025)

#### PSRAM - BREAKING CHANGE CRITICO

**ANTES**: PSRAM carregava automaticamente quando detectado.

**AGORA**: PSRAM requer configuracao explicita.

```yaml
# Configuracao minima
psram:

# ESP32-S3 OBRIGATORIO especificar modo
psram:
  mode: octal  # ou quad, dependendo do hardware
```

**Modos por chip**:
| Chip | Modos Suportados |
|------|------------------|
| ESP32 | quad (padrao) |
| ESP32-S2 | quad (padrao) |
| ESP32-S3 | quad, octal (DEVE especificar) |
| ESP32-C5 | quad (ate 120MHz em 2025.12.0) |

#### Ultra-Low Latency
Latencia de evento reduzida de **0-16ms (media ~8ms) para ~12 microsegundos**.

Mecanismo: Thread-safe loop wake mechanism.

Componentes beneficiados:
- BLE
- USB
- MQTT
- ESP-NOW
- Wake word

#### Economia de Memoria

| Otimizacao | Economia | Detalhes |
|------------|----------|----------|
| Sliding window filters | ate 25KB RAM | Para sensores com historico |
| Sensor filters | 90% economia | Em certas configuracoes |
| Action framework | Reducao RAM | Em automations |

#### Ferramenta de Analise
```bash
esphome analyze-memory config.yaml
```
Mostra breakdown de uso de memoria por componente.

#### Framework
- ESP-IDF 5.5.1
- Arduino 3.3.2
- Brownout protection para ESP-IDF
- Main loop stack size configuravel

---

### 2025.10.0 (Outubro 2025)

#### Arduino como Componente IDF

Arduino agora integrado como componente ESP-IDF.

**Beneficios**:
- 20-30KB RAM economizados
- Binarios menores

**Desvantagem**:
- Arduino builds mais lentos
- ESP-IDF builds 2-3x mais rapidos

#### Performance

| Otimizacao | Economia | Detalhes |
|------------|----------|----------|
| Lock component | 388 bytes flash + 23 bytes RAM | Por lock |
| ESP32 BLE Server | 1KB flash | Via HashMap replacement |
| Event Emitter | 2.6KB flash | |
| Logger | 35-72% mais rapido | |
| Non-blocking OTA auth | Reducao latencia | |

---

### 2025.9.0 (Setembro 2025)

#### GPIO Memoria Reduzida 50%
Via bit-packing. Melhoria automatica.

#### Core Preference Storage
**Breaking**: Preference storage agora inclui `device_id`.
- Dispositivos podem perder preferencias no primeiro upgrade
- Dados de calibracao podem precisar reconfiguracao

#### Performance

| Otimizacao | Detalhes |
|------------|----------|
| Strings em flash | ESP8266 |
| GPIO expander caching | I2C |
| Logging compile-time | Strings |
| Memory pools scheduler | Reducao fragmentacao |

---

### 2025.8.0 (Agosto 2025)

#### Python 3.11+ Obrigatorio
Python 3.10 nao mais suportado.

| Ambiente | Acao |
|----------|------|
| HA Add-on | Nenhuma (usa Python 3.12) |
| Docker | Nenhuma (usa Python 3.12) |
| pip install | Atualizar Python para 3.11+ |

#### Performance

| Otimizacao | Detalhes |
|------------|----------|
| String encoding | 10x mais rapido com memcpy |
| Scheduler | Menos millis() calls |
| BLE scanning | Batched processing |
| Protobuf | Zero-copy fields |
| Compilacao condicional | Remove features nao usados |

#### Execute from PSRAM
ESP32 pode executar codigo diretamente da PSRAM.

---

### 2025.7.0 (Julho 2025)

#### ESP-IDF 4.x Removido
ESP-IDF 5.3.2+ agora obrigatorio.

#### Arduino 3.1.3
Major version jump pode afetar:
- Uso de memoria
- Bibliotecas third-party

#### ArduinoJson 7.2.0
Custom components usando ArduinoJson diretamente requerem migracao.

#### Memoria

| Otimizacao | Economia |
|------------|----------|
| Component memory | 40 bytes por componente |
| Sensor entity | Footprint menor |
| Color constant storage | Otimizado |

#### Performance

| Melhoria | Detalhes |
|----------|----------|
| Component memory | Ate 40% menor |
| API/networking | Otimizados |
| Loop processing | loop() opcional |
| API batching | Communication |
| Bluetooth proxy | Melhorado |
| Interrupt handling | Otimizado |
| C++20 | Full support |

---

### 2025.6.0 (Junho 2025)

#### Python 3.10+ Obrigatorio
Python 3.9 end-of-life em Outubro 2025.

#### ESP-IDF 5.3.2
**Ultima versao com suporte IDF 4.x**. 2025.7.0 requer IDF 5.x.

Novos chips suportados:
- ESP32-C6: RISC-V com Wi-Fi 6, Thread/Zigbee
- ESP32-H2: RISC-V com BLE, Thread/Zigbee
- ESP32-P4: Dual-core RISC-V high-performance

#### Otimizacoes

| Area | Detalhes |
|------|----------|
| LWIP | Opcoes para reducao de flash |
| API | Message batching vs deferred queue |
| Component/Application state | uint32_t para uint8_t |
| Entity memory | Via bit-packing |
| Application area field | std::string para const char* |

---

## Guia Rapido: Configuracao PSRAM

### ESP32 Basico
```yaml
psram:
```

### ESP32-S3 (OBRIGATORIO especificar mode)
```yaml
psram:
  mode: octal  # ou quad
```

### ESP32-C5 (a partir de 2025.12.0)
```yaml
psram:
  # quad mode, ate 120MHz
```

### Verificar se PSRAM esta ativo
```yaml
sensor:
  - platform: debug
    free:
      name: "Free Heap"
    psram:
      name: "Free PSRAM"
```

---

## Guia Rapido: Economia de Memoria

### 1. Usar ESP-IDF ao inves de Arduino
```yaml
esp32:
  board: esp32dev
  framework:
    type: esp-idf
```
Economia: 20-30KB RAM, 40% flash

### 2. Sliding Window Filters (2025.11.0+)
```yaml
sensor:
  - platform: adc
    filters:
      - sliding_window_moving_average:
          window_size: 10
          send_every: 5
```
Economia: ate 25KB RAM

### 3. Analisar uso de memoria
```bash
esphome analyze-memory config.yaml
```

### 4. Desabilitar componentes nao usados
Compilacao condicional automatica remove codigo nao usado.
