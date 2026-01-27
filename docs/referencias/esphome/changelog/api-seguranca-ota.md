# API, Seguranca e OTA - Changelog ESPHome

> Atualizado: 2025-01-27 | Periodo: 2024.11.0 - 2026.1.x

---

## Quando Consultar Este Arquivo

Consulte este arquivo quando trabalhar com:
- Native API (conexao com Home Assistant)
- MQTT (broker externo)
- OTA (updates over-the-air)
- Encryption e seguranca
- Web server
- Dashboard ESPHome

---

## Indice de Componentes

- [API](#api)
- [OTA](#ota)
- [Web Server](#web-server)
- [Dashboard](#dashboard)
- [Encryption/Security](#encryptionsecurity)
- [MQTT](#mqtt)

---

## API

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | BREAKING | Password REMOVIDO - nao funciona mais | Dispositivos com password nao conectam |
| 2026.1.0 | Melhoria | Zero-Copy API Protocol | ~42% mais entidades por pacote (automatico) |
| 2025.12.0 | Feature | Respostas bidirecionais | Tres modos: fire-and-forget, status-only, data responses |
| 2025.12.0 | Melhoria | Zero-copy para Select e light effects | Performance melhorada |
| 2025.12.0 | Melhoria | ESP8266 socket latency reduzido | Ate 16ms eliminado |
| 2025.10.0 | Deprecacao | Password deprecado | Aviso de deprecacao, remocao em 2026.1.0 |

### Exemplo de Configuracao

```yaml
# Configuracao correta (2026.1.x)
api:
  encryption:
    key: !secret api_encryption_key

# Gerar chave (terminal):
# openssl rand -base64 32

# NAO FUNCIONA MAIS (removido em 2026.1.0)
# api:
#   password: "minhasenha"
```

#### Respostas Bidirecionais (2025.12.0+)

```yaml
api:
  actions:
    - action: get_sensor_data
      variables:
        sensor_id: string
      then:
        - lambda: |-
            // Processa e retorna dados
            return {{"value", id(my_sensor).state}};
```

### Notas de Migracao

**Migracao de password para encryption (OBRIGATORIA para 2026.1.0):**

1. Gerar nova chave: `openssl rand -base64 32`
2. Adicionar ao `secrets.yaml`: `api_encryption_key: "chave_gerada"`
3. Atualizar configuracao do dispositivo
4. Recompilar e fazer upload
5. No Home Assistant, remover e re-adicionar a integracao ESPHome
6. Inserir a mesma chave quando solicitado

**Password e encryption sao mutuamente exclusivos** - nao podem ser usados juntos.

---

## OTA

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | BREAKING | MD5 REMOVIDO - apenas SHA256 | Dispositivos < 2025.10.0 nao atualizam |
| 2026.1.0 | Feature | Rollback automatico (ESP32 ESP-IDF) | Reverte automaticamente em falha de boot |
| 2025.10.0 | Feature | SHA256 introduzido | Hardware acceleration suportado |
| 2025.10.0 | Melhoria | Non-blocking auth | Melhor responsividade durante updates |
| 2025.7.0 | BREAKING | Web Server OTA extraido | OTA via web requer config explicita |

### Exemplo de Configuracao

```yaml
# Configuracao OTA completa (2026.1.x)
ota:
  - platform: esphome
    password: !secret ota_password
  # Rollback automatico em caso de falha de boot (ESP32 ESP-IDF)

# Para OTA via navegador web (apos 2025.7.0)
ota:
  - platform: esphome
    password: !secret ota_password
  - platform: web_server  # Adicionar explicitamente
```

### Notas de Migracao

**Caminho de migracao para SHA256 (dispositivos antigos):**

1. Atualizar primeiro para 2025.10.x (aceita MD5 e SHA256)
2. Depois atualizar para 2026.1.0+ (apenas SHA256)

Se dispositivo esta em versao anterior a 2025.10.0, sera necessario update via serial.

**Web Server OTA (apos 2025.7.0):**

Se usava o web server para fazer updates OTA, adicione explicitamente:
```yaml
ota:
  - platform: web_server
```

---

## Web Server

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | BREAKING | URLs usam nomes de entidades | Barra `/` proibida, limite 120 chars |
| 2026.1.0 | Deprecacao | URLs antigas (`/sensor/object_id`) | Remocao prevista para 2026.7.0 |
| 2025.12.0 | Feature | Brotli compression padrao | Economia ~9.4KB em assets |
| 2025.7.0 | BREAKING | OTA extraido para platform separada | Adicionar `platform: web_server` em ota |

### Exemplo de Configuracao

```yaml
# Web server com autenticacao (2026.1.x)
web_server:
  port: 80
  auth:
    username: !secret web_user
    password: !secret web_password
  # Brotli habilitado por padrao

# Nomes de entidades - restricoes
sensor:
  - platform: template
    name: "Temperatura Sala"  # CORRETO
    # name: "Temperatura/Sala"  # ERRADO - barra proibida
```

### Notas de Migracao

**Restricoes de nomes (2026.1.0):**

- Barra `/` proibida em nomes de entidades
- Limite de 120 caracteres em nomes
- URLs antigas deprecadas (remocao em 2026.7.0)

---

## Dashboard

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.10.0 | Feature | WebSocket ao inves de HTTP polling | Status instantaneo, logs mais rapidos |

### Exemplo de Configuracao

O Dashboard ESPHome nao requer configuracao especifica no firmware. A mudanca para WebSocket e automatica no lado do servidor.

### Notas de Migracao

Nenhuma acao necessaria. Beneficios automaticos:
- Status instantaneo de dispositivos
- Logs mais rapidos
- Sem delays de update
- Menor uso de recursos

---

## Encryption/Security

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2026.1.0 | Feature | HMAC-SHA256 component | Novo recurso de autenticacao criptografica |
| 2026.1.0 | BREAKING | API password removido | Encryption obrigatoria |
| 2026.1.0 | BREAKING | OTA MD5 removido | SHA256 obrigatorio |

### Exemplo de Configuracao

```yaml
# HMAC-SHA256 (2026.1.0+)
external_components:
  - source: github://esphome/esphome
    components: [hmac_sha256]

# Configuracao segura completa
api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password
  # SHA256 automatico

web_server:
  port: 80
  auth:
    username: !secret web_user
    password: !secret web_password
```

### Notas de Migracao

**Checklist de seguranca para 2026.1.0:**

- [ ] API usando `encryption: key:` (nao password)
- [ ] Chaves de encryption em secrets.yaml
- [ ] OTA com SHA256 (automatico se >= 2025.10.0)
- [ ] Web server com autenticacao (opcional mas recomendado)

---

## MQTT

### Mudancas

| Versao | Tipo | Descricao | Impacto |
|--------|------|-----------|---------|
| 2025.11.0 | Melhoria | Ultra-low latency (~12 microsegundos) | Performance melhorada |
| 2025.7.0 | Mudanca | Nao espera conexao por padrao | Setup nao bloqueia |

### Exemplo de Configuracao

```yaml
mqtt:
  broker: mqtt.local
  # Nao bloqueia setup por padrao

  # Se precisar esperar conexao:
  on_connect:
    - logger.log: "MQTT conectado"
```

### Notas de Migracao

A partir de 2025.7.0, MQTT nao espera mais conexao antes de continuar o setup. Se sua logica depende de MQTT conectado no startup, use `on_connect` para garantir.

---

## Troubleshooting

### API

#### "Unable to connect to device"

**Causa provavel**: API password removido em 2026.1.0

**Solucao**:
1. Verificar se configuracao usa `encryption: key:`
2. Garantir que a mesma chave esta no Home Assistant
3. Remover e re-adicionar integracao ESPHome

### OTA

#### "OTA update failed"

**Causa provavel**: Dispositivo com ESPHome < 2025.10.0 tentando atualizar para 2026.1.0+

**Solucao**:
1. Fazer update via serial para 2025.10.x
2. Depois fazer update OTA para 2026.1.0+

### Web Server

#### "Entity name too long" ou "Invalid character in name"

**Causa provavel**: Novas restricoes de nomes em 2026.1.0

**Solucao**:
1. Remover barras `/` de nomes
2. Reduzir nomes para menos de 120 caracteres

---

## Configuracao Completa Recomendada (2026.1.x)

```yaml
esphome:
  name: meu-dispositivo
  friendly_name: Meu Dispositivo

esp32:
  board: esp32dev
  framework:
    type: esp-idf  # Padrao em 2026.1.0

# API com encryption (OBRIGATORIO)
api:
  encryption:
    key: !secret api_encryption_key

# OTA com SHA256 (automatico) e rollback
ota:
  - platform: esphome
    password: !secret ota_password

# Web server opcional
web_server:
  port: 80
  auth:
    username: !secret web_user
    password: !secret web_password

# WiFi
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "${device_name} Fallback"
    password: !secret fallback_password

captive_portal:

logger:
```

### Arquivo secrets.yaml

```yaml
# Gerar chaves:
# openssl rand -base64 32

api_encryption_key: "sua_chave_base64_aqui"
ota_password: "senha_ota_segura"
web_user: "admin"
web_password: "senha_web_segura"
wifi_ssid: "SuaRede"
wifi_password: "SenhaWiFi"
fallback_password: "FallbackAP123"
```

---

## Referencias

- `src/firmware/ESPHOME_REFERENCE.md` - Resumo rapido de breaking changes
- `src/firmware/ESPHOME_CHANGELOG_COMPLETO.md` - Changelogs detalhados
- `docs/referencias/esphome/content/components/api.md` - Documentacao API
- `docs/referencias/esphome/content/components/ota/_index.md` - Documentacao OTA
- `docs/referencias/esphome/content/components/web_server.md` - Documentacao Web Server

---

## Historico deste Documento

| Data | Acao | Autor |
|------|------|-------|
| 2026-01-27 | Reestruturacao de "por versao" para "por componente" | Claude Code |
| 2026-01-27 | Criacao inicial cobrindo 2024.11 a 2026.1 | Claude Code |
