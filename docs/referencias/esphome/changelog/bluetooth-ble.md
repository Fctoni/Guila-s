# Bluetooth e BLE - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

---

## Indice de Componentes

| Componente | Descricao | Mudancas Criticas |
|------------|-----------|-------------------|
| [Bluetooth Proxy](#bluetooth-proxy) | Proxy BLE para Home Assistant | `active` padrao true, V1 removido |
| [BLE Client](#ble-client) | Cliente BLE para conexoes ativas | Connection limit compartilhado |
| [ESP32 Hosted BLE](#esp32-hosted-ble) | ESP32 como adaptador BLE externo | Novo em 2025.11.0 |
| [Improv BLE](#improv-ble) | Configuracao WiFi via BLE | 26x mais rapido |
| [BTHome](#bthome) | Protocolo BTHome (MiThermometer) | Novo em 2026.1.0 |
| [BLE Tracker](#ble-tracker) | Scanner e rastreador BLE | Otimizacoes de latencia |

---

## Bluetooth Proxy

Componente que transforma ESP32 em proxy Bluetooth para Home Assistant, permitindo que o HA acesse dispositivos BLE distantes.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.9.0 | `active` padrao mudou para `true` | Alto | Definir `active: false` se necessario |
| 2025.8.0 | Parsed advertisements removido | Alto | Atualizar Home Assistant 2024.8.0+ |
| 2025.8.0 | Conexao V1 removida | Alto | Atualizar Home Assistant 2024.8.0+ |
| 2025.8.0 | Compilacao condicional BLE | Baixo | Nenhuma - binarios menores automaticamente |

### Detalhes das Mudancas

#### 2025.9.0 - `active` padrao mudou para `true`

**Antes**: `active: false` era o padrao implicito
**Depois**: `active: true` e o padrao implicito

**Implicacoes**:
- Bluetooth Proxy agora faz scanning ativo por padrao
- Maior consumo de energia
- Mais dados enviados ao Home Assistant
- Pode interferir com outros dispositivos BLE proximos

**Quando usar `active: false`**:
- Dispositivos alimentados por bateria
- Ambientes com muitos dispositivos BLE (evita congestionamento)
- Quando apenas passive scanning e necessario

#### 2025.8.0 - Parsed Advertisements e V1 Removidos

**Parsed Advertisements**: Anuncios BLE nao sao mais pre-parseados no ESP32. Home Assistant faz o parsing.

**Conexao V1**: Protocolo de conexao legado foi removido completamente.

**Requisito**: Home Assistant 2024.8.0 ou superior.

### Exemplo de Configuracao

```yaml
# Configuracao atual (2025.9.0+)
bluetooth_proxy:
  active: true  # Padrao, pode omitir

# Para manter comportamento anterior (passive scanning)
bluetooth_proxy:
  active: false
```

### Migracao

```yaml
# ANTES (2025.8.x e anterior) - active era false por padrao
bluetooth_proxy:
  # active: false (implicito)

# DEPOIS (2025.9.0+) - para manter o mesmo comportamento
bluetooth_proxy:
  active: false  # Agora precisa ser explicito

# Ou aceitar o novo padrao (recomendado para a maioria)
bluetooth_proxy:
  active: true
```

---

## BLE Client

Componente para estabelecer conexoes BLE ativas com dispositivos, permitindo leitura/escrita de caracteristicas.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.10.0 | `max_connections` compartilhado client/server | Alto | Revisar limites de conexao |
| 2025.8.0 | Conexao V1 removida | Alto | Atualizar Home Assistant 2024.8.0+ |
| 2025.4.0 | Connection limit retrabalhado | Alto | Verificar limites de hardware |
| 2025.12.0 | 24-40 bytes economizados por client | Baixo | Nenhuma - melhoria automatica |

### Detalhes das Mudancas

#### 2025.10.0 - `max_connections` Compartilhado

**Antes**: Limites separados para conexoes de client e server
**Depois**: Limite unico compartilhado entre ambos

**Impacto**: Se voce tinha configuracoes que somavam mais conexoes que o limite, agora precisara ajustar.

#### 2025.4.0 - Connection Limit Retrabalhado

O sistema de gerenciamento de conexoes BLE foi completamente reescrito. ESPHome agora valida e limita conexoes automaticamente, gerando erro de compilacao se exceder o limite.

**Limites por variante**:

| Variante | Max Conexoes |
|----------|--------------|
| ESP32 | 9 |
| ESP32-C3 | 8 |
| ESP32-S3 | 8 |
| ESP32-C6 | 8 |

### Exemplo de Configuracao

```yaml
esp32_ble:
  # Limite total compartilhado entre conexoes de entrada e saida
  # Padrao: 3 (varia por variante ESP32)
  # ESP32: max 9
  # ESP32-C3/S3: max 8

ble_client:
  - mac_address: "AA:BB:CC:DD:EE:FF"
    id: my_ble_device
```

### Migracao

```yaml
# ANTES (2025.9.x e anterior) - limites separados
esp32_ble:
  # client e server tinham limites independentes

# DEPOIS (2025.10.0+) - limite compartilhado
esp32_ble:
  # Revisar se a soma de conexoes client + server
  # nao excede o limite do hardware
  # Se exceder, reduzir numero de dispositivos conectados
```

---

## ESP32 Hosted BLE

Permite usar um ESP32 como adaptador Bluetooth para chips que nao tem Bluetooth nativo (ESP8266, ESP32-C2, outros microcontroladores).

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.11.0 | Recurso introduzido | N/A | Novo recurso disponivel |

### Detalhes das Mudancas

#### 2025.11.0 - Introducao do ESP32 Hosted BLE

**Casos de uso**:
- Adicionar BLE a dispositivos sem radio Bluetooth
- Isolar stack BLE em chip dedicado
- Reutilizar ESP32 antigos como adaptadores

**Comunicacao**: Via SPI ou UART entre o host e o ESP32.

### Exemplo de Configuracao

```yaml
# No ESP32 que sera o adaptador BLE
bluetooth_proxy:
  hosted: true

# Configuracao de comunicacao com o host
# (depende da implementacao especifica do host)
```

### Migracao

Nao aplicavel - recurso novo. Para usar:

1. Configure um ESP32 como adaptador BLE com `hosted: true`
2. Configure a comunicacao SPI/UART no dispositivo host
3. O host pode agora usar BLE atraves do ESP32

---

## Improv BLE

Permite configurar WiFi do dispositivo via Bluetooth Low Energy, util para setup inicial sem acesso a rede.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.10.0 | Lookup 26x mais rapido | Baixo | Nenhuma - melhoria automatica |
| 2025.10.0 | 1KB flash economizado | Baixo | Nenhuma - melhoria automatica |
| 2025.10.0 | Nome visivel para passive scanners | Baixo | Considerar privacidade |

### Detalhes das Mudancas

#### 2025.10.0 - Melhorias de Performance

**Performance**:
- Lookup 26x mais rapido
- 1KB flash economizado

**Privacidade**: O nome do dispositivo agora e visivel para scanners BLE passivos. Isso pode revelar informacoes sobre sua rede.

**Recomendacao**: Use nomes genericos se privacidade for importante.

### Exemplo de Configuracao

```yaml
esp32_improv:
  authorizer: none  # Qualquer um pode configurar

# Ou com autorizacao via botao fisico
esp32_improv:
  authorizer: botao_config  # binary_sensor ID
```

### Migracao

```yaml
# Nenhuma mudanca de configuracao necessaria
# Melhorias sao automaticas

# Se privacidade for importante, considere o nome do dispositivo
esphome:
  name: "esp-device"  # Nome generico ao inves de "esp-sala-joao"
```

---

## BTHome

Protocolo BTHome para dispositivos BLE, incluindo suporte a Xiaomi MiThermometer.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2026.1.0 | Suporte MiThermometer adicionado | Baixo | Novo recurso disponivel |

### Detalhes das Mudancas

#### 2026.1.0 - Suporte BTHome MiThermometer

Suporte para dispositivos Xiaomi Mi Thermometer via protocolo BTHome:
- Leitura de temperatura
- Leitura de umidade
- Integracao direta sem necessidade de custom firmware no sensor

### Exemplo de Configuracao

```yaml
sensor:
  - platform: bthome
    mac_address: "AA:BB:CC:DD:EE:FF"
    temperature:
      name: "Mi Thermometer Temperature"
    humidity:
      name: "Mi Thermometer Humidity"
```

### Migracao

Nao aplicavel - recurso novo. Para usar dispositivos MiThermometer:

1. Obtenha o endereco MAC do dispositivo (via BLE scanner)
2. Configure o sensor BTHome com temperatura e/ou umidade
3. O ESP32 recebera os dados via BLE passivo

---

## BLE Tracker

Scanner BLE para detectar dispositivos e beacons, base para Bluetooth Proxy e outros componentes BLE.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.11.0 | Latencia reduzida de ~8ms para ~12us | Baixo | Nenhuma - melhoria automatica |
| 2025.8.0 | Batched processing para scanning | Baixo | Nenhuma - melhoria automatica |
| 2025.12.0 | Memoria otimizada (char[18] vs string) | Baixo | Nenhuma - melhoria automatica |

### Detalhes das Mudancas

#### 2025.11.0 - Ultra-Low Latency

Latencia de eventos BLE reduzida drasticamente:
- **Antes**: 0-16ms (media ~8ms)
- **Depois**: ~12 microsegundos

Implementado via thread-safe loop wake mechanism. Beneficia especialmente:
- BLE scanning
- Wake word detection
- ESP-NOW

#### 2025.8.0 - Batched Processing

Scanning BLE agora processa resultados em lotes, melhorando eficiencia e reduzindo uso de CPU.

### Exemplo de Configuracao

```yaml
# Configuracao padrao
esp32_ble_tracker:
  scan_parameters:
    interval: 1100ms
    window: 1100ms
    active: true

# Configuracao para economia de energia
esp32_ble_tracker:
  scan_parameters:
    interval: 2000ms  # Menos frequente
    window: 500ms     # Janela menor
    active: false     # Passive scanning
```

### Migracao

Nenhuma mudanca de configuracao necessaria. Melhorias sao automaticas.

---

## Novo Hardware BLE Suportado

| Versao | Componente | Descricao |
|--------|------------|-----------|
| 2025.12.0 | thermopro_ble | Sensor BLE temperatura/umidade ThermoPro |
| 2025.7.0 | Xiaomi XMWSDJ04MMC | Sensor BLE temperatura/umidade Xiaomi |
| 2025.6.0 | ESP32-C6 | RISC-V com Wi-Fi 6, BLE 5.0, Thread/Zigbee |
| 2025.6.0 | ESP32-H2 | RISC-V com BLE 5.0, Thread/Zigbee (sem WiFi) |
| 2025.8.0 | nRF52 (Zephyr) | Chip Nordic com BLE nativo de alta qualidade |

---

## Compatibilidade com Home Assistant

| Versao ESPHome | Versao HA Minima | Motivo |
|----------------|------------------|--------|
| 2025.8.0+ | 2024.8.0 | Remocao de V1 e parsed advertisements |
| 2025.9.0+ | 2024.8.0 | Bluetooth Proxy active por padrao |
| 2026.1.0+ | 2024.8.0 | BTHome MiThermometer |

---

## Troubleshooting

### Conexoes BLE Falhando

1. Verificar se nao excedeu `max_connections` (limite por variante)
2. Lembrar que client e server compartilham limite (2025.10.0+)
3. Reduzir numero de dispositivos conectados simultaneamente

### Bluetooth Proxy Lento

1. Verificar se `active: true` esta definido (padrao em 2025.9.0+)
2. Ajustar `scan_parameters` para janelas maiores
3. Verificar interferencia WiFi (usar canal 1, 6 ou 11)

### Dispositivos BLE Nao Encontrados

1. Verificar se device esta em modo advertising
2. Aumentar `window` em scan_parameters
3. Considerar usar `active: true` para forcar respostas

### Alto Consumo de Energia

1. Usar `active: false` no bluetooth_proxy
2. Aumentar `interval` e reduzir `window`
3. Considerar desabilitar BLE se nao usado

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao por componente | Claude Code |
| 2026-01-27 | Criacao inicial | Claude Code |
