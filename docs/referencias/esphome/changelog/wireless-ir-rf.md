# Wireless, IR e RF - ESPHome Reference (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

---

## Indice de Componentes

| Componente | Categoria | Status | Versao Introducao |
|------------|-----------|--------|-------------------|
| [Remote Transmitter](#remote-transmitter) | IR/RF Core | Estavel | - |
| [Remote Receiver](#remote-receiver) | IR/RF Core | Estavel | - |
| [IR Protocols](#ir-protocols) | Infrared | Estavel | - |
| [RF 433MHz](#rf-433mhz) | Radio Frequencia | Estavel | - |
| [LoRa (SX126x, SX127x)](#lora-sx126x-sx127x) | Long Range | Estavel | 2025.7.0 |
| [CC1101](#cc1101) | Sub-1GHz | Estavel | 2025.12.0 |
| [Z-Wave Proxy](#z-wave-proxy) | Z-Wave | Estavel | 2025.10.0 |
| [IR/RF Proxy](#irrf-proxy-experimental) | Proxy | Experimental | 2026.1.0 |
| [Infrared Entity](#infrared-entity-experimental) | Entity Type | Experimental | 2026.1.0 |

---

## Remote Transmitter

Componente base para transmissao de sinais IR e RF.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.12.0 | Suporte RP2040 | Nova plataforma | Nenhuma |
| **2025.11.0** | **Modo nao-bloqueante padrao** | **Transmissoes nao bloqueiam loop** | **Verificar timing de automacoes** |

### Configuracao Atual

```yaml
remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%
  # Modo nao-bloqueante e padrao desde 2025.11.0
```

### Migracao 2025.11.0 (Breaking Change)

**Comportamento Anterior (bloqueante):**
- Transmissao IR/RF bloqueava o loop principal
- Garantia de timing preciso
- Poderia causar watchdog resets em transmissoes longas

**Comportamento Atual (nao-bloqueante):**
- Transmissao ocorre em background
- Loop principal continua executando
- Melhor responsividade geral

**Impacto:**
- Automacoes que dependiam de timing preciso podem precisar ajuste
- Multiplas transmissoes em sequencia podem precisar delays explicitos

**Como adaptar:**
```yaml
# Antes: comandos em sequencia funcionavam com timing implicito
# Agora: adicionar delays explicitos entre comandos

button:
  - platform: template
    name: "Sequencia IR"
    on_press:
      - remote_transmitter.transmit_nec:
          address: 0x1234
          command: 0x01
      - delay: 100ms  # Delay explicito necessario
      - remote_transmitter.transmit_nec:
          address: 0x1234
          command: 0x02
```

**Nota:** Nao ha opcao para forcar modo bloqueante. Ajustar automacoes se necessario.

### Plataformas Suportadas

| Plataforma | Suporte | Desde |
|------------|---------|-------|
| ESP32 | Sim | - |
| ESP8266 | Sim | - |
| RP2040 | Sim | 2025.12.0 |

---

## Remote Receiver

Componente base para recepcao de sinais IR e RF.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.12.0 | Suporte RP2040 | Nova plataforma | Nenhuma |
| 2025.11.0 | Ultra-Low Latency | Latencia 0-16ms para ~12us | Nenhuma |
| 2025.10.0 | Demodulacao ESP32 | Melhor decodificacao | Nenhuma |

### Configuracao Atual

```yaml
remote_receiver:
  pin: GPIO5
  dump: all  # Para debug
  # Em producao, especificar protocolos:
  # dump:
  #   - nec
  #   - samsung
```

### Exemplo de Uso

```yaml
remote_receiver:
  pin: GPIO5
  dump:
    - nec
    - samsung
  on_nec:
    then:
      - logger.log:
          format: "NEC: addr=0x%04X cmd=0x%04X"
          args: [ 'x.address', 'x.command' ]
```

### Plataformas Suportadas

| Plataforma | Suporte | Desde |
|------------|---------|-------|
| ESP32 | Sim | - |
| ESP8266 | Sim | - |
| RP2040 | Sim | 2025.12.0 |

---

## IR Protocols

Protocolos IR suportados nativamente pelo remote_receiver/transmitter.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| - | Nenhuma mudanca significativa no periodo | - | - |

### Protocolos Suportados

| Protocolo | Dump | Transmit | Uso Comum |
|-----------|------|----------|-----------|
| NEC | Sim | Sim | TV, AC (mais comum) |
| Sony | Sim | Sim | Dispositivos Sony |
| RC5 | Sim | Sim | Philips |
| RC6 | Sim | Sim | Philips/Microsoft |
| Samsung | Sim | Sim | TV Samsung |
| Samsung36 | Sim | Sim | AC Samsung |
| LG | Sim | Sim | TV/AC LG |
| Panasonic | Sim | Sim | Dispositivos Panasonic |
| Pioneer | Sim | Sim | Audio Pioneer |
| JVC | Sim | Sim | Dispositivos JVC |
| Dish | Sim | Sim | Dish Network |
| Sharp | Sim | Sim | TV Sharp |
| Coolix | Sim | Sim | AC generico |
| Daikin | Sim | Sim | AC Daikin |
| Midea | Sim | Sim | AC Midea |
| Toshiba AC | Sim | Sim | AC Toshiba |
| Mitsubishi | Sim | Sim | AC Mitsubishi |
| Raw | Sim | Sim | Qualquer protocolo |

### Exemplo: Controle de Ar Condicionado

```yaml
remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%

remote_receiver:
  pin: GPIO5
  dump: all

climate:
  - platform: midea
    name: "AC Sala"
    transmitter_id: ir_transmitter
    receiver_id: ir_receiver
    visual:
      min_temperature: 17
      max_temperature: 30
      temperature_step: 1.0
```

### Exemplo: Transmissao NEC

```yaml
button:
  - platform: template
    name: "TV Power"
    on_press:
      - remote_transmitter.transmit_nec:
          address: 0x1234
          command: 0x56
```

---

## RF 433MHz

Transmissao e recepcao RF 433MHz usando remote_transmitter/receiver.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.12.0 | Suporte CC1101 (transceiver dedicado) | Hardware alternativo | Ver secao CC1101 |
| 2025.11.0 | Modo nao-bloqueante transmitter | Timing | Ver secao Remote Transmitter |

### Configuracao com Modulos RF Simples

```yaml
# Modulos ASK/OOK simples (FS1000A, MX-RM-5V)
remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 100%  # RF usa 100%

remote_receiver:
  pin: GPIO5
  dump:
    - rc_switch
```

### Exemplo: Controle de Portao

```yaml
button:
  - platform: template
    name: "Portao Garagem"
    on_press:
      - remote_transmitter.transmit_rc_switch_raw:
          code: '101010101010101010101010'
          protocol: 1
          repeat:
            times: 5
            wait_time: 10ms
```

### Protocolos RF Suportados

| Protocolo | Uso Comum |
|-----------|-----------|
| rc_switch | Portoes, tomadas, sensores genericos |
| raw | Qualquer dispositivo 433MHz |

---

## LoRa (SX126x, SX127x)

Comunicacao de longo alcance (varios km) com baixo consumo.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| **2025.7.0** | **Introducao SX126x/SX127x** | **Novo componente** | **Nenhuma** |

### Modulos Suportados

| Chip | Modulos Comuns | Frequencias |
|------|----------------|-------------|
| SX1276/77/78/79 | RFM95W, Ra-02 | 433/868/915MHz |
| SX1261/62 | E22, SX1262 | 433/868/915MHz |

### Configuracao SX127x

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

sx127x:
  cs_pin: GPIO5
  reset_pin: GPIO14
  dio0_pin: GPIO26
  frequency: 915MHz  # ou 433MHz, 868MHz
  bandwidth: 125kHz
  spreading_factor: 7
  coding_rate: 5
```

### Configuracao SX126x

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

sx126x:
  cs_pin: GPIO5
  reset_pin: GPIO14
  busy_pin: GPIO27
  dio1_pin: GPIO26
  frequency: 915MHz
  bandwidth: 125kHz
  spreading_factor: 7
```

### Parametros de Alcance

| Spreading Factor | Alcance | Data Rate |
|------------------|---------|-----------|
| 7 | Curto | Alto |
| 10 | Medio | Medio |
| 12 | Longo | Baixo |

### Casos de Uso

- Sensores em areas remotas
- Monitoramento agricola
- Estacoes meteorologicas distantes
- Comunicacao entre edificios

### Migracao

Nao ha migracao necessaria - componente novo em 2025.7.0.

### Troubleshooting

1. **Sem alcance**: Aumentar spreading_factor (7->12), reduzir bandwidth
2. **Sem comunicacao**: Verificar conexoes SPI e antena
3. **Interferencia**: Evitar obstrucoes metalicas

---

## CC1101

Transceiver Sub-1GHz com modulacao ASK/OOK para RF 433MHz e outras frequencias.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| **2025.12.0** | **Introducao CC1101** | **Novo componente** | **Nenhuma** |

### Configuracao

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

cc1101:
  spi_id: my_spi
  cs_pin: GPIO5
  gdo0_pin: GPIO4
  gdo2_pin: GPIO2
  frequency: 433.92MHz  # 433MHz padrao

# Usar com remote transmitter
remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%

# Usar com remote receiver
remote_receiver:
  pin: GPIO2
  dump: all
```

### Frequencias Suportadas

| Frequencia | Regiao | Uso Comum |
|------------|--------|-----------|
| 315MHz | Americas | Portoes antigos |
| 433.92MHz | Global | Portoes, sensores |
| 868MHz | Europa | IoT |
| 915MHz | Americas | IoT |

### Casos de Uso

- Controles de portao/garagem
- Sensores RF 433MHz
- Tomadas RF
- Alarmes residenciais

### Exemplo: Portao com CC1101

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

cc1101:
  cs_pin: GPIO5
  gdo0_pin: GPIO4
  gdo2_pin: GPIO2
  frequency: 433.92MHz

remote_transmitter:
  pin: GPIO4
  carrier_duty_percent: 50%

button:
  - platform: template
    name: "Portao"
    on_press:
      - remote_transmitter.transmit_rc_switch_raw:
          code: '101010101010101010101010'
          protocol: 1
```

### Migracao

Nao ha migracao necessaria - componente novo em 2025.12.0.

### Troubleshooting

1. **Nao comunica**: Verificar conexoes SPI (MOSI, MISO, CLK, CS)
2. **Sem sinal**: Confirmar pinos GDO0 e GDO2
3. **Frequencia errada**: Verificar 433.92MHz (comum) vs 433.00MHz
4. **Alcance curto**: Testar com antena adequada

---

## Z-Wave Proxy

Serial-to-network bridging para posicionar stick Z-Wave remotamente.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| 2025.12.0 | Low-latency UART flag | Reducao ~10ms latencia | Opcional |
| **2025.10.0** | **Introducao Z-Wave Proxy** | **Novo componente** | **Nenhuma** |

### Requisitos

- ESP32 com WiFi ou Ethernet
- Home Assistant com integracao Z-Wave JS
- Stick Z-Wave (ex: ZWA-2, Aeotec)

### Configuracao

```yaml
esphome:
  name: zwave-bridge

esp32:
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

uart:
  id: uart_zwave
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 115200

zwave_proxy:
  uart_id: uart_zwave
```

### Performance

- Latencia tipica: 50-60ms
- Com `wake_loop_on_rx`: ~40-50ms

### Casos de Uso

- Posicionar stick Z-Wave longe do servidor
- Melhorar cobertura Z-Wave
- Centralizar comunicacao Z-Wave em local otimo

### Migracao

Nao ha migracao necessaria - componente novo em 2025.10.0.

### Troubleshooting

1. **Latencia alta**: Verificar qualidade WiFi
2. **Sem comunicacao**: Confirmar baud_rate 115200
3. **Conexao instavel**: Reduzir distancia stick-ESP32
4. **Interferencia**: Afastar de outros dispositivos 2.4GHz

---

## IR/RF Proxy (Experimental)

Proxy centralizado para comandos IR/RF via rede.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| **2026.1.0** | **Introducao IR/RF Proxy** | **Novo componente** | **Testar antes de producao** |

### Status

**EXPERIMENTAL** - Este recurso pode sofrer mudancas em versoes futuras.

### Casos de Uso

- Controlar multiplos dispositivos IR de um unico ponto
- Integrar comandos RF 433MHz com Home Assistant
- Centralizar controle de ar condicionado, TV, etc.

### Configuracao

Documentacao completa pendente - recurso experimental.

### Migracao

Nao ha migracao necessaria - componente novo em 2026.1.0.

**Recomendacao:** Testar em ambiente de desenvolvimento antes de usar em producao.

---

## Infrared Entity (Experimental)

Novo tipo de entidade dedicado para dispositivos IR.

### Tabela de Mudancas

| Versao | Mudanca | Impacto | Acao Requerida |
|--------|---------|---------|----------------|
| **2026.1.0** | **Introducao Infrared Entity** | **Novo tipo de entidade** | **Testar antes de producao** |

### Status

**EXPERIMENTAL** - Este recurso pode sofrer mudancas em versoes futuras.

### Beneficios

- Melhor integracao com Home Assistant
- Interface especifica para controles IR
- Suporte a aprendizado de comandos

### Configuracao

Documentacao completa pendente - recurso experimental.

### Migracao

Nao ha migracao necessaria - componente novo em 2026.1.0.

**Recomendacao:** Testar em ambiente de desenvolvimento antes de usar em producao.

---

## Matriz de Compatibilidade por Plataforma

| Componente | ESP32 | ESP8266 | RP2040 |
|------------|-------|---------|--------|
| Remote Transmitter | Sim | Sim | 2025.12.0+ |
| Remote Receiver | Sim | Sim | 2025.12.0+ |
| CC1101 | Sim | Sim | - |
| SX126x/SX127x | Sim | Sim | - |
| Z-Wave Proxy | Sim | Limitado | - |
| IR/RF Proxy | Sim | - | - |

---

## Checklist de Migracao Geral

### Atualizando de versoes anteriores a 2025.11.0

- [ ] Remote Transmitter agora e nao-bloqueante por padrao
- [ ] Verificar automacoes que dependem de timing preciso de IR/RF
- [ ] Adicionar delays explicitos entre comandos em sequencia

### Atualizando para 2026.1.0+

- [ ] IR/RF Proxy disponivel (experimental) - testar antes de producao
- [ ] Infrared Entity disponivel (experimental) - testar antes de producao

### Ao Adicionar Novos Componentes

- [ ] **CC1101**: Verificar pinagem SPI e antena adequada
- [ ] **LoRa**: Verificar regulamentacao de frequencia local (915MHz Americas, 868MHz Europa)
- [ ] **Z-Wave Proxy**: Verificar compatibilidade com stick Z-Wave

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao por componente | Claude Code |
| 2026-01-27 | Criacao inicial | Claude Code |
