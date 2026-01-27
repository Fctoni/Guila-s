# WiFi e Network - Changelog ESPHome

> Atualizado: 2025-01-27 | Periodo: 2024.11.0 - 2026.1.x

## Quando Consultar Este Arquivo

Consulte este arquivo quando trabalhar com:
- Configuracao WiFi (conexao, roaming, redes ocultas)
- Ethernet (PHYs, configuracao)
- mDNS (resolucao .local)
- ESP-NOW (comunicacao mesh device-to-device)
- OpenThread (ESP32-C6/H2)
- Zigbee (nRF52)
- Problemas de conectividade e latencia de rede

## Indice de Componentes

- [WiFi](#wifi)
- [mDNS](#mdns)
- [ESP-NOW](#esp-now)
- [OpenThread](#openthread)
- [Network](#network)
- [UART](#uart)
- [Ethernet](#ethernet)
- [MQTT](#mqtt)
- [Z-Wave Proxy](#z-wave-proxy)
- [Zigbee](#zigbee)

---

## WiFi

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Novo | Roaming automatico apos conexao inicial | Dispositivos podem trocar de AP automaticamente. Desativa se 802.11k/v ja configurado |
| 2025.12.0 | Mudanca | WiFi info usa callbacks (nao polling) | Timing de updates pode mudar. Verificar automacoes dependentes |
| 2025.11.0 | **BREAKING** | WiFi NAO bloqueia setup | Dispositivo inicia antes de conectar. Ajustar automacoes de inicializacao |
| 2025.11.0 | **BREAKING** | `priority` aceita apenas inteiros | Floats causam erro. Converter `priority: 1.0` para `priority: 1` |
| 2025.11.0 | Novo | Selecao inteligente de AP | Historico de conexao priorizado sobre sinal mais forte |
| 2025.11.0 | Melhoria | Conexoes a redes ocultas mais rapidas | 2-6s de economia no tempo de conexao |
| 2025.11.0 | Novo | Configuracao `min_auth_mode` | WPA2 sera padrao em 2026.6. Definir explicitamente se usar WEP/WPA |
| 2025.10.0 | Novo | MAC addresses configuraveis | Permite definir MAC manualmente |
| 2025.7.0 | Novo | ESP32 Hosted WiFi | ESP32 pode funcionar como adaptador WiFi para outros chips |

### Exemplo de Configuracao

```yaml
# Configuracao WiFi otimizada para 2026.1.x
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

  # Selecao inteligente de AP (padrao)
  # Roaming automatico habilitado (padrao)

  # Para redes ocultas:
  # hidden: true

  # Para controle de autenticacao:
  # min_auth_mode: wpa2  # sera padrao em 2026.6

  # Para desabilitar roaming automatico:
  # fast_connect: true  # desativa scan de APs

  # Para multiplas redes (priority DEVE ser inteiro):
  networks:
    - ssid: "Rede_Principal"
      password: !secret wifi_password_1
      priority: 2
    - ssid: "Rede_Backup"
      password: !secret wifi_password_2
      priority: 1

  # Fallback AP para configuracao
  ap:
    ssid: "${device_name} Fallback"
    password: !secret ap_password

# Captive portal para configuracao inicial
captive_portal:
```

### Notas de Migracao

**De versoes < 2025.11.0:**

1. **WiFi nao bloqueia mais o setup** - Automacoes que dependem de conexao na inicializacao podem falhar:
   ```yaml
   # Mitigacao: usar wait_until
   on_boot:
     then:
       - wait_until:
           wifi.connected:
       - logger.log: "WiFi conectado, iniciando automacoes"
   ```

2. **Priority deve ser inteiro**:
   ```yaml
   # ERRADO - causa erro de validacao
   priority: 1.0

   # CORRETO
   priority: 1
   ```

3. **Definir min_auth_mode se usar WEP/WPA**:
   ```yaml
   wifi:
     min_auth_mode: wpa  # Manter compatibilidade com redes antigas
   ```

**De versoes < 2026.1.0:**

1. **Considerar roaming automatico**: Se tiver setup de 802.11k/v, o roaming sera desativado automaticamente.

---

## mDNS

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | **BREAKING** | `.local` requer mDNS habilitado | Resolucao falha sem mDNS. Adicionar `mdns:` se usar .local |

### Exemplo de Configuracao

```yaml
# mDNS para resolucao .local (OBRIGATORIO se usar enderecos .local)
mdns:
  disabled: false  # padrao, mas seja explicito

# Exemplo de uso com MQTT
mqtt:
  broker: homeassistant.local  # Requer mdns habilitado
```

### Notas de Migracao

**De versoes < 2025.11.0:**

Se usar enderecos `.local` em qualquer configuracao (MQTT broker, API, etc.), adicione explicitamente:

```yaml
mdns:
  disabled: false
```

---

## ESP-NOW

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | Novo | ESP-NOW como transport platform | Disponivel como plataforma de transporte |
| 2025.8.0 | **NOVO RECURSO** | Comunicacao mesh device-to-device | Nao requer WiFi router. Baixa latencia e consumo |

### Exemplo de Configuracao

```yaml
# Comunicacao ESP-NOW mesh
esp_now:
  # Configuracao de peers

# Casos de uso:
# - Mesh sensor networks
# - Remote control systems
# - Comunicacao battery-efficient
# - Backup communication quando WiFi falha
```

### Notas de Migracao

**Caracteristicas do ESP-NOW:**
- Nao requer WiFi AP
- Baixo consumo de energia
- Latencia muito baixa
- Range tipico: 200m+ (outdoor), 50m+ (indoor)

---

## OpenThread

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | Melhoria | OTA updates via Thread | Atualizacoes OTA funcionam em redes Thread |
| 2025.11.0 | Melhoria | Suporte a sleep mode | Dispositivos Thread podem entrar em sleep |
| 2025.6.0 | **NOVO RECURSO** | OpenThread para ESP32-C6/H2 | Suporte a Thread network. Requer border router |

### Exemplo de Configuracao

```yaml
# ESP32-C6 com OpenThread
esphome:
  name: thread-sensor

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

openthread:
  # Configuracao Thread
  # OTA agora suportado via Thread (2025.11.0+)
```

### Notas de Migracao

**Requisitos:**
- Thread habilitado no Home Assistant
- OpenThread border router na rede
- ESP32-C6 ou ESP32-H2

**Limitacoes:**
- Sem modo "Sleepy End Device" (ainda)
- Nao adequado para dados de alta frequencia
- Novos chips ainda sendo refinados

**Novos chips suportados (2025.6.0):**
- **ESP32-C6**: RISC-V com Wi-Fi 6, Thread/Zigbee
- **ESP32-H2**: RISC-V com BLE, Thread/Zigbee
- **ESP32-P4**: Dual-core RISC-V high-performance

---

## Network

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Melhoria | Latencia melhorada (ESP32) | Chamadas diretas de socket bypassing VFS. Beneficio automatico |
| 2025.12.0 | Melhoria | Socket latency ESP8266 | Eliminado ate 16ms de delay em comunicacao socket |
| 2025.11.0 | **BREAKING** | `priority` aceita apenas inteiros | Floats causam erro de validacao |
| 2025.11.0 | Melhoria | Ultra-low latency | Latencia reduzida de 0-16ms (~8ms media) para ~12 microsegundos |

### Exemplo de Configuracao

```yaml
# Priority em redes (DEVE ser inteiro >= 2025.11.0)
wifi:
  networks:
    - ssid: "Rede1"
      priority: 1    # CORRETO - inteiro
    - ssid: "Rede2"
      priority: 2    # CORRETO - maior = mais prioritario
```

### Notas de Migracao

**De versoes < 2025.11.0:**

Converter todos os valores de `priority` para inteiros:
```yaml
# ERRADO
priority: 1.0

# CORRETO
priority: 1
```

**Componentes beneficiados pelo ultra-low latency (2025.11.0+):**
- BLE
- USB
- MQTT
- ESP-NOW
- Wake word

---

## UART

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.12.0 | Novo | Flag `wake_loop_on_rx` | ~10ms reducao latencia para Z-Wave proxies e aplicacoes sensiveis |

### Exemplo de Configuracao

```yaml
uart:
  - id: zwave_uart
    rx_pin: GPIO16
    tx_pin: GPIO17
    baud_rate: 115200
    # Reduz latencia em ~10ms para Z-Wave proxies
    # wake_loop_on_rx: true  # quando disponivel
```

### Notas de Migracao

**Caso de uso:** Z-Wave proxies e outras aplicacoes sensiveis a latencia.

---

## Ethernet

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | **BREAKING** | Ethernet NAO bloqueia setup | Dispositivo inicia antes de conectar |
| 2025.10.0 | Novo | LAN8670 PHY suportado | Novo PHY Ethernet disponivel |

### Exemplo de Configuracao

```yaml
# Ethernet nao bloqueia mais o setup (>= 2025.11.0)
# Usar wait_until se precisar esperar conexao
on_boot:
  then:
    - wait_until:
        ethernet.connected:
    - logger.log: "Ethernet conectado"
```

### Notas de Migracao

**De versoes < 2025.11.0:**

Ethernet agora nao bloqueia o setup. Usar `wait_until` se automacoes dependem de conexao.

---

## MQTT

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.7.0 | Mudanca | MQTT nao espera conexao | Nao bloqueia esperando conexao a menos que configurado |

### Exemplo de Configuracao

```yaml
mqtt:
  broker: mqtt.local
  # Para bloquear ate conectar (comportamento antigo):
  # wait_for_connection: true
```

### Notas de Migracao

Se precisar que o dispositivo aguarde conexao MQTT, adicione `wait_for_connection: true`.

---

## Z-Wave Proxy

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.10.0 | **NOVO RECURSO** | Z-Wave Proxy | Conectividade Z-Wave via rede para Home Assistant ZWA-2 |

### Exemplo de Configuracao

```yaml
# Configuracao Z-Wave Proxy
zwave_proxy:
  uart_id: zwave_uart
  # Latencia tipica: 50-60ms
```

### Notas de Migracao

**Recursos:**
- Z-Wave remoto via WiFi/Ethernet
- Serial-to-network bridging
- Compativel com Home Assistant

**Para melhor latencia, usar com `wake_loop_on_rx` no UART:**
```yaml
uart:
  - id: zwave_uart
    rx_pin: GPIO16
    tx_pin: GPIO17
    baud_rate: 115200
    # wake_loop_on_rx: true  # quando disponivel
```

---

## Zigbee

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | **NOVO RECURSO** | Zigbee para nRF52 | Suporte a binary sensor, sensor e switch para plataforma nRF52 |

### Exemplo de Configuracao

```yaml
# Exemplo para nRF52 com Zigbee
zigbee:
  # Configuracao de endpoint Zigbee
```

### Notas de Migracao

Novo recurso disponivel apenas para plataforma nRF52.

---

## Troubleshooting

### Dispositivo nao conecta apos update para 2025.11.0+

**Sintoma**: Dispositivo inicia mas nao conecta ao WiFi.

**Causa**: WiFi nao bloqueia mais o setup.

**Solucao**: Verificar logs. Se conectar eventualmente, ajustar automacoes que dependem de conexao imediata usando `wait_until`.

### Resolucao .local falha

**Sintoma**: Nao consegue resolver `device.local`.

**Causa**: mDNS nao habilitado.

**Solucao**:
```yaml
mdns:
  disabled: false
```

### Roaming excessivo entre APs

**Sintoma**: Dispositivo troca de AP frequentemente.

**Causa**: Roaming automatico em 2026.1.0+.

**Solucao**: Configurar `fast_connect: true` para desabilitar scan de APs.

### Conexao lenta a rede oculta

**Sintoma**: Demora para conectar a SSID oculto.

**Causa**: Versao anterior a 2025.11.0.

**Solucao**: Atualizar para 2025.11.0+ para conexao 2-6s mais rapida.

### Erro de validacao em priority

**Sintoma**: Erro ao compilar com `priority: 1.0`.

**Causa**: A partir de 2025.11.0, priority aceita apenas inteiros.

**Solucao**: Converter para inteiro: `priority: 1`.

### MQTT nao conecta na inicializacao

**Sintoma**: MQTT nao conecta imediatamente.

**Causa**: MQTT nao bloqueia mais esperando conexao (2025.7.0+).

**Solucao**: Adicionar `wait_for_connection: true` se precisar bloquear.

---

## Referencias

- `src/firmware/ESPHOME_CHANGELOG_COMPLETO.md` - Changelog completo
- `src/firmware/ESPHOME_REFERENCE.md` - Referencia rapida
- `docs/referencias/esphome/content/components/wifi.md` - Documentacao WiFi
- `docs/referencias/esphome/content/components/ethernet.md` - Documentacao Ethernet
