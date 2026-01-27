# Frameworks e Build - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

> Cobertura: ESP-IDF, Arduino, Python requirements, compilacao, dependencias

---

## Quando Consultar Este Arquivo

- Ao atualizar **Python** no ambiente de desenvolvimento
- Ao configurar **ESP-IDF** ou **Arduino** framework
- Ao lidar com problemas de **compilacao**
- Ao atualizar **dependencias** (aioesphomeapi, esptool, etc.)
- Ao migrar entre versoes de **framework**
- Ao configurar **PSRAM** em ESP32-S3 ou outros
- Ao trabalhar com novos chips (ESP32-C5, C6, P4, H2)

---

## Resumo de Mudancas Criticas

| Versao | Mudanca | Impacto | Acao |
|--------|---------|---------|------|
| 2026.1.0 | ESP-IDF e framework padrao | Alto | Definir `framework: type: arduino` se necessario |
| 2025.11.0 | PSRAM nao auto-carrega | Alto | Adicionar bloco `psram:` explicito |
| 2025.10.0 | Arduino como componente IDF | Medio | Builds Arduino mais lentos |
| 2025.8.0 | Python 3.11 obrigatorio | Alto | Atualizar Python |
| 2025.7.0 | ESP-IDF 4.x removido | Critico | Usar IDF 5.3.2+ |
| 2025.7.0 | Arduino 3.x | Alto | Verificar bibliotecas third-party |
| 2025.7.0 | ArduinoJson 7.x | Alto | Atualizar lambdas customizadas |
| 2025.6.0 | Python 3.10 obrigatorio | Alto | Atualizar Python |
| 2025.6.0 | ESP-IDF 5.3.2 padrao | Medio | Ultima versao com IDF 4.x |

---

## Linha do Tempo de Frameworks

```
2024.11 ─────────────────────────────────────────────────────────> 2026.1

Python:
  3.9  ────────────> 3.10 obrigatorio ────────> 3.11 obrigatorio ─────────>
                     (2025.6.0)                 (2025.8.0)

ESP-IDF:
  4.x + 5.x ───> 5.3.2 padrao ──> 4.x removido ──> IDF padrao (nao Arduino)
                 (2025.6.0)       (2025.7.0)       (2026.1.0)

Arduino:
  2.x ─────────────────────────> 3.x ──> como IDF component ──> opcional
                                 (2025.7.0) (2025.10.0)         (2026.1.0)
```

---

## Detalhes por Versao

### 2026.1.0 (Janeiro 2026)

#### ESP-IDF como Framework Padrao (BREAKING)

ESP-IDF e agora o framework padrao para:
- ESP32
- ESP32-C3
- ESP32-S2
- ESP32-S3

**Beneficios**:
- Binarios ate 40% menores
- Compilacao 2-3x mais rapida
- Melhor suporte a novos recursos

```yaml
# Framework padrao agora e ESP-IDF
esp32:
  board: esp32dev
  # framework nao especificado = ESP-IDF

# Se precisar Arduino explicitamente:
esp32:
  board: esp32dev
  framework:
    type: arduino
```

**Componentes que REQUEREM Arduino**:
- `heatpumpir`
- `midea`
- `wled` (efeitos)

Se usar esses componentes, definir Arduino explicitamente.

#### ESP-IDF 5.5.2

- Reducao de ~35KB flash em configs tipicas
- OTA rollback automatico para ESP32

#### Performance de Build

| Metrica | ESP-IDF | Arduino |
|---------|---------|---------|
| Tempo de compilacao | 1x (base) | 2-3x mais lento |
| Tamanho do binario | 100% | 140-160% |
| RAM livre | Mais | Menos |

#### OTA Rollback Automatico

Com ESP-IDF, OTA agora suporta rollback automatico em caso de falha de boot.

---

### 2025.12.0 (Dezembro 2025)

#### ESP32-C5 PSRAM

Suporte a PSRAM quad mode ate 120MHz para ESP32-C5.

```yaml
esp32:
  board: esp32-c5-devkitc-1
  framework:
    type: esp-idf

psram:
  mode: quad
  speed: 120MHz
```

#### Novas Placas

| Placa | Chip | Descricao |
|-------|------|-----------|
| Seeed XIAO ESP32-C6 | ESP32-C6 | Compacta com Wi-Fi 6 |

---

### 2025.11.0 (Novembro 2025)

#### PSRAM Nao Carrega Automaticamente (BREAKING)

PSRAM nao e mais carregado automaticamente. Deve ser configurado explicitamente.

```yaml
# ANTES: PSRAM carregado automaticamente se detectado
# AGORA: Deve especificar explicitamente

# Configuracao minima
psram:

# ESP32-S3 requer modo especificado
psram:
  mode: octal  # ou quad

# Configuracao completa
psram:
  mode: octal
  speed: 80MHz  # 40MHz, 80MHz, 120MHz
```

**Modos por chip**:
| Chip | Modos Suportados |
|------|------------------|
| ESP32 | quad |
| ESP32-S2 | quad |
| ESP32-S3 | quad, octal |
| ESP32-C5 | quad |

#### ESP-IDF 5.5.1

Atualizado para ESP-IDF 5.5.1 com:
- Brownout protection melhorado
- Main loop stack size configuravel

#### Arduino 3.3.2

Atualizacao de Arduino para versao 3.3.2.

#### Performance

Latencia de evento reduzida para ~12 microsegundos (era 0-16ms).

---

### 2025.10.0 (Outubro 2025)

#### Arduino como IDF Component (BREAKING)

Arduino agora integrado como componente ESP-IDF ao inves de framework separado.

**Impacto**:
- 20-30KB RAM economizados
- Binarios menores
- **Arduino builds mais lentos**
- ESP-IDF builds 2-3x mais rapidos

```yaml
# Arduino ainda funciona, mas e mais lento para compilar
esp32:
  board: esp32dev
  framework:
    type: arduino  # Funciona, mas mais lento

# Preferir ESP-IDF quando possivel
esp32:
  board: esp32dev
  framework:
    type: esp-idf  # Mais rapido
```

#### Captive Portal para ESP-IDF

ESP-IDF agora suporta deteccao automatica de captive portal.

```yaml
captive_portal:
# Funciona tanto com Arduino quanto ESP-IDF
```

---

### 2025.9.0 (Setembro 2025)

#### Performance de Memoria

- Strings de componentes movidos para flash (ESP8266)
- Uso de memoria GPIO reduzido 50% via bit-packing
- Memory pools de scheduler reduzem fragmentacao

---

### 2025.8.0 (Agosto 2025)

#### Python 3.11+ Obrigatorio (BREAKING)

Python 3.10 nao e mais suportado. Minimo e Python 3.11.

| Ambiente | Acao Necessaria |
|----------|-----------------|
| Home Assistant Add-on | Nenhuma (usa Python 3.12) |
| Docker | Nenhuma (usa Python 3.12) |
| pip install | Atualizar Python para 3.11+ |

**Verificar versao**:
```bash
python --version
# Deve ser >= 3.11.0
```

#### nRF52 Platform

Nova plataforma completa para Nordic nRF52 via Zephyr RTOS.

```yaml
esphome:
  name: my-nrf52-device

nrf52:
  board: nrf52840_dk
```

#### MIPI DSI Display

High-performance display para ESP32-P4.

```yaml
display:
  - platform: mipi_dsi
    # Configuracao especifica ESP32-P4
```

#### ESP-NOW Communication

Device-to-device sem WiFi access point.

```yaml
esp_now:
  peers:
    - mac: "AA:BB:CC:DD:EE:FF"
```

#### Dependencias Atualizadas

| Pacote | De | Para |
|--------|-----|------|
| aioesphomeapi | 34.2.1 | 39.0.0 |
| esptool | 4.9.0 | 5.0.2 |
| ruff | 0.12.2 | 0.12.8 |

---

### 2025.7.0 (Julho 2025)

#### ESP-IDF 4.x Removido (BREAKING CRITICO)

ESP-IDF 4.x foi completamente removido. Minimo e ESP-IDF 5.3.2.

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
    version: 5.3.2  # ou mais recente
```

#### Arduino 3.1.3 (BREAKING)

Major version jump de Arduino 2.x para 3.x.

**Impactos**:
- Uso de memoria pode mudar
- Bibliotecas third-party podem precisar atualizacao
- Algumas APIs mudaram

#### ArduinoJson 7.x (BREAKING)

ArduinoJson atualizado para versao 7.2.0.

```cpp
// ANTES (ArduinoJson 6.x)
DynamicJsonDocument doc(1024);
deserializeJson(doc, json_string);

// AGORA (ArduinoJson 7.x)
JsonDocument doc;  // Auto-sizing
deserializeJson(doc, json_string);
```

**Principais mudancas**:
- `DynamicJsonDocument` removido - usar `JsonDocument`
- Auto-sizing de documentos
- API de serialization diferente

#### Component Memory

Component memory reduzido 40 bytes por componente.

#### Full C++20 Support

ESPHome agora usa C++20 completo.

---

### 2025.6.0 (Junho 2025)

#### Python 3.10+ Obrigatorio (BREAKING)

Python 3.9 end-of-life em Outubro 2025. Minimo e Python 3.10.

| Ambiente | Acao Necessaria |
|----------|-----------------|
| Home Assistant Add-on | Nenhuma |
| Docker | Nenhuma |
| pip install | Atualizar Python para 3.10+ |

#### ESP-IDF 5.3.2 (Ultima com suporte IDF 4.x)

ESP-IDF 5.3.2 e a ultima versao que ainda suporta IDF 4.x. A partir de 2025.7.0, apenas IDF 5.x.

**Novos chips suportados com IDF 5.3.2**:

| Chip | Caracteristicas |
|------|-----------------|
| ESP32-C6 | RISC-V, Wi-Fi 6, Thread/Zigbee |
| ESP32-H2 | RISC-V, BLE, Thread/Zigbee |
| ESP32-P4 | Dual-core RISC-V high-performance |

**Nota**: Novos variants ainda sendo refinados. Alguns componentes podem nao ser compativeis.

#### OpenThread para ESP32-C6/H2

ESP32-C6 e H2 podem se conectar a redes Thread.

```yaml
openthread:
  # Requisitos:
  # - Thread habilitado no Home Assistant
  # - OpenThread border router configurado
```

**Limitacoes**:
- Sem modo "Sleepy End Device"
- Nao adequado para dados de alta frequencia

#### LWIP Optimization

Novas opcoes de otimizacao LWIP para reducao de flash.

#### Dependencias Atualizadas

| Pacote | Versao |
|--------|--------|
| cryptography | 45.0.1 |
| aioesphomeapi | 32.2.3 |

---

## Compatibilidade de Chips

### Suporte por Framework

| Chip | ESP-IDF | Arduino | Notas |
|------|---------|---------|-------|
| ESP32 | Sim | Sim | Ambos maduros |
| ESP32-S2 | Sim | Sim | |
| ESP32-S3 | Sim | Sim | |
| ESP32-C3 | Sim | Sim | |
| ESP32-C6 | Sim | Parcial | Preferir IDF |
| ESP32-H2 | Sim | Nao | Apenas IDF |
| ESP32-P4 | Sim | Nao | Apenas IDF |
| ESP32-C5 | Sim | Nao | Apenas IDF |

### Suporte PSRAM

| Chip | Quad | Octal | Velocidade Max |
|------|------|-------|----------------|
| ESP32 | Sim | Nao | 80MHz |
| ESP32-S2 | Sim | Nao | 80MHz |
| ESP32-S3 | Sim | Sim | 120MHz |
| ESP32-C5 | Sim | Nao | 120MHz |

---

## Checklist de Migracao

### Para 2026.1.x

- [ ] Verificar se Arduino e realmente necessario
- [ ] Se usando Arduino, adicionar `framework: type: arduino` explicitamente
- [ ] Testar builds com ESP-IDF (padrao)
- [ ] Verificar componentes que requerem Arduino (heatpumpir, midea, wled)

### Para 2025.11.x

- [ ] Adicionar bloco `psram:` se usando PSRAM
- [ ] Especificar `mode: octal` ou `mode: quad` para ESP32-S3

### Para 2025.10.x

- [ ] Esperar builds Arduino mais lentos
- [ ] Considerar migrar para ESP-IDF se possivel

### Para 2025.8.x

- [ ] Atualizar Python para 3.11+
- [ ] Verificar `python --version`

### Para 2025.7.x

- [ ] Atualizar ESP-IDF para 5.3.2+
- [ ] Remover `version: 4.x.x` de configs
- [ ] Atualizar codigo ArduinoJson para v7
- [ ] Verificar bibliotecas third-party com Arduino 3.x

### Para 2025.6.x

- [ ] Atualizar Python para 3.10+
- [ ] Preparar para remocao de IDF 4.x em 2025.7.0

---

## Configuracoes de Referencia

### ESP32 com ESP-IDF (Recomendado)

```yaml
esphome:
  name: my-device
  platform: ESP32
  board: esp32dev

esp32:
  framework:
    type: esp-idf
    version: recommended  # ou especificar versao
```

### ESP32-S3 com PSRAM

```yaml
esphome:
  name: my-s3-device

esp32:
  board: esp32-s3-devkitc-1
  framework:
    type: esp-idf

psram:
  mode: octal
  speed: 80MHz
```

### ESP32 com Arduino (Quando Necessario)

```yaml
esphome:
  name: my-device

esp32:
  board: esp32dev
  framework:
    type: arduino
    # Usar apenas se necessario para componentes especificos
```

### ESP32-C6 com Thread

```yaml
esphome:
  name: my-thread-device

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

openthread:
  # Configuracao Thread
```

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Criacao inicial | Claude Code |
