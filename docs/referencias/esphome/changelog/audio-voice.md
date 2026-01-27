# Audio e Voice - ESPHome Changelog (2024.11 - 2026.1)

**Ultima atualizacao**: 2026-01-27
**Periodo coberto**: 2024.11.0 a 2026.1.x

---

## Indice de Componentes

| Componente | Descricao | Secao |
|------------|-----------|-------|
| [Microphone](#microphone) | Sistema unificado de fonte, gain_factor 32-bit, tipos I2S/PDM | Audio Input |
| [Speaker](#speaker) | Saida de audio I2S, bugfix playlist | Audio Output |
| [Voice Assistant](#voice-assistant) | Continuacao de conversa, packet transport | Assistente |
| [Media Player](#media-player) | Player local e I2S | Reproducao |
| [Audio DAC/Codecs](#audio-daccodecs) | ES8311, ES8388, PCM5102, MAX98357, NS4168 | Hardware DAC |
| [Audio ADC](#audio-adc) | ES7210, ES7243E, INMP441, SPH0645 | Hardware ADC |
| [USB CDC-ACM](#usb-cdc-acm) | Porta serial virtual ESP32-S2/S3 | Conectividade |

---

## Microphone

### Resumo
Sistema de captura de audio com suporte a I2S externo, I2S interno e PDM. Versao 2025.5.0 introduziu sistema unificado de fonte e ajuste automatico de ganho para samples 32-bit.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.5.0 | Sistema unificado de fonte | Breaking | Mudanca de arquitetura, verificar configs |
| 2025.5.0 | gain_factor: 4 para 32-bit samples | Breaking | Ajuste de ganho automatico, revisar niveis |
| 2025.5.0 | Sensor de nivel sonoro | Feature | Novo sensor para medir dB ambiente |
| 2025.11.0 | Ultra-low latency | Melhoria | Beneficia wake word detection |

### Tipos de Microfone

| Tipo | Descricao | Uso Tipico |
|------|-----------|------------|
| I2S External | Microfone I2S dedicado | Alta qualidade |
| I2S Internal | ADC interno ESP32 | Simples |
| PDM | Pulse Density Modulation | Microfones MEMS |

### Exemplo de Configuracao (2025.5.0+)

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO16
    adc_type: external
    pdm: false
```

### Sensor de Nivel Sonoro (2025.5.0+)

```yaml
sensor:
  - platform: sound_level
    microphone: mic
    name: "Nivel de Som"
    # Mede dB do ambiente
```

### Migracao

**De versoes anteriores a 2025.5.0:**

1. O sistema unificado de fonte pode exigir revisao das configuracoes
2. Se usar samples 32-bit, o gain_factor: 4 e aplicado automaticamente
3. Se audio estiver com clipping, verifique se a fonte ja tinha ganho alto

**Troubleshooting gain_factor:**
- 32-bit samples tem gain_factor: 4 automatico
- Pode causar clipping se fonte ja esta alta
- Ajuste a fonte de audio ou use processamento para normalizar

---

## Speaker

### Resumo
Saida de audio via I2S para speakers e amplificadores. Versao 2025.12.0 corrigiu bug critico ao adicionar itens rapidamente a playlist.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.12.0 | Bugfix playlist dinamica | Bugfix | Corrige perda de itens em sequencia rapida |
| 2025.11.0 | TinyUSB foundation | Feature | Base para USB audio futuro |
| 2026.1.0 | ESP-IDF padrao | Melhoria | Melhor performance de audio |

### Exemplo de Configuracao

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

speaker:
  - platform: i2s_audio
    id: spk
    i2s_dout_pin: GPIO15
    dac_type: external
```

### Migracao

**Problema anterior a 2025.12.0:**
- Itens adicionados em sequencia rapida a playlist podiam ser perdidos ou corrompidos

**Acao:** Atualizar para 2025.12.0+ se usa playlist dinamica em media player ou speaker.

---

## Voice Assistant

### Resumo
Integracao com assistentes de voz (Home Assistant, etc). Versao 2025.5.0 introduziu continuacao de conversa e packet transport para comunicacao device-to-device.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.5.0 | Continuacao de conversa | Feature | Dialogo multi-turno sem wake word repetida |
| 2025.5.0 | Packet transport device-to-device | Feature | Comunicacao entre dispositivos ESPHome |
| 2025.11.0 | Ultra-low latency | Melhoria | Menor delay entre deteccao e acao |

### Exemplo de Configuracao (2025.5.0+)

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO16
    adc_type: external
    pdm: false

speaker:
  - platform: i2s_audio
    id: spk
    i2s_dout_pin: GPIO15
    dac_type: external

voice_assistant:
  microphone: mic
  speaker: spk
  # Continuacao de conversa permite dialogo natural
  # sem precisar da wake word a cada interacao
```

### Continuacao de Conversa

**Funcionamento:**
1. Usuario fala wake word
2. Assistente responde
3. Assistente aguarda resposta do usuario (sem nova wake word)
4. Conversa continua por multiplos turnos

### Packet Transport - Aplicacoes em Audio

- Sincronizacao de audio multi-room
- Distribuicao de comandos de voz
- Intercom entre dispositivos

### Migracao

**Para habilitar continuacao de conversa:**
- Recurso disponivel a partir de 2025.5.0
- Configuracao pode ser habilitada no assistente
- Verificar compatibilidade com backend (Home Assistant)

**Troubleshooting wake word lento:**
1. Atualizar para 2025.11.0+: Ultra-low latency reduz delay
2. Verificar PSRAM: Buffers de wake word precisam de memoria

---

## Media Player

### Resumo
Player de midia local e via I2S. Herda correcoes do componente Speaker.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.12.0 | Bugfix playlist (via Speaker) | Bugfix | Corrige adicao rapida de itens |
| 2025.8.0 | ESP-NOW communication | Feature | Potencial para audio distribuido |

### Exemplo de Configuracao (2025.12.0+)

```yaml
speaker:
  - platform: i2s_audio
    id: spk
    i2s_dout_pin: GPIO15
    dac_type: external

media_player:
  - platform: i2s_audio
    id: media
    name: "Media Player"
    speaker: spk
    # Bugfix em 2025.12.0 para adicionar itens rapidamente
```

### Migracao

**Troubleshooting playlist perdendo itens:**
- Atualizar para 2025.12.0+: Bugfix especifico para este problema

---

## Audio DAC/Codecs

### Resumo
Codecs de saida de audio (Digital-to-Analog Converter). Versao 2025.6.0 adicionou suporte ao ES8388.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.6.0 | ES8388 Audio DAC adicionado | Feature | Novo codec DAC+ADC stereo suportado |
| 2025.7.0 | ESP-IDF 4.x removido | Breaking | I2S driver atualizado, ajustes podem ser necessarios |

### Codecs Suportados

| Componente | Versao Min | Caracteristicas |
|------------|------------|-----------------|
| ES8311 | 2024.x | DAC mono, comum em dev kits |
| ES8388 | 2025.6.0 | DAC+ADC stereo 24-bit, amp headphone, ESP32-A1S |
| PCM5102 | 2024.x | DAC stereo I2S |
| MAX98357 | 2024.x | Amplificador I2S classe D |
| NS4168 | 2024.x | Amplificador mono |

### ES8388 - Caracteristicas

- DAC stereo 24-bit
- ADC stereo 24-bit
- Amplificador de headphone integrado
- Controle de volume digital
- Comum em placas como ESP32-A1S

### Exemplo ES8388 (2025.6.0+)

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO25
  i2s_bclk_pin: GPIO27

i2c:
  sda: GPIO18
  scl: GPIO23

es8388:

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO35
    adc_type: external

speaker:
  - platform: i2s_audio
    id: spk
    i2s_dout_pin: GPIO26
    dac_type: external
```

### Exemplo PCM5102

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

speaker:
  - platform: i2s_audio
    id: spk
    i2s_dout_pin: GPIO15
    dac_type: external
```

### Migracao

**De ESP-IDF 4.x para 5.x (2025.7.0+):**
- I2S driver foi atualizado no IDF 5.x
- Algumas configuracoes de I2S podem precisar ajuste
- Verificar timing de I2S se houver problemas

---

## Audio ADC

### Resumo
Codecs de entrada de audio (Analog-to-Digital Converter) e microfones MEMS.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.5.0 | Sistema unificado de fonte | Breaking | Afeta todos os ADCs |
| 2025.5.0 | gain_factor 32-bit | Breaking | Ajuste automatico de ganho |

### Codecs/Microfones Suportados

| Componente | Versao Min | Caracteristicas |
|------------|------------|-----------------|
| ES7210 | 2024.x | ADC 4 canais |
| ES7243E | 2024.x | ADC stereo |
| INMP441 | 2024.x | Microfone MEMS I2S digital |
| SPH0645 | 2024.x | Microfone MEMS I2S digital |

### Exemplo INMP441

```yaml
i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO16
    adc_type: external
    pdm: false
```

### Exemplo ES7243E

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22

i2s_audio:
  i2s_lrclk_pin: GPIO17
  i2s_bclk_pin: GPIO18

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO16
    adc_type: external
```

### Migracao

**De versoes anteriores a 2025.5.0:**
- Sistema unificado de fonte pode exigir revisao
- gain_factor: 4 aplicado automaticamente para 32-bit
- Verificar niveis de audio apos atualizacao

---

## USB CDC-ACM

### Resumo
Porta serial virtual via USB para ESP32-S2 e ESP32-S3. Pode ser usado para debug de audio ou comunicacao com software de audio no PC.

### Tabela de Mudancas

| Versao | Mudanca | Tipo | Impacto |
|--------|---------|------|---------|
| 2025.12.0 | USB CDC-ACM support | Feature | Serial virtual ESP32-S2/S3 |
| 2025.11.0 | TinyUSB foundation | Feature | Base para USB audio futuro |

### Caracteristicas

- Multi-interface USB
- Buffers configuraveis
- Callbacks de line state
- Suporte ESP32-S2 e ESP32-S3

### Exemplo de Configuracao

```yaml
usb_cdc:
  id: usb_serial
```

### Uso em Audio

- Debug de audio via porta serial virtual
- Comunicacao com software de audio no PC
- Base para futuros componentes USB Audio Class

### Migracao

**Nota**: TinyUSB e um building block. Componentes de USB audio especificos virao em versoes futuras.

---

## Configuracoes Gerais

### PSRAM (2025.11.0+)

PSRAM nao carrega mais automaticamente. Audio de alta qualidade frequentemente requer PSRAM para buffers.

```yaml
psram:
  mode: octal  # ou quad para ESP32-S3
```

### Framework ESP-IDF vs Arduino (2026.1.0+)

ESP-IDF e o framework padrao a partir de 2026.1.0. Audio funciona melhor com ESP-IDF, mas se precisar Arduino:

```yaml
esp32:
  framework:
    type: arduino
```

**Nota**: Framework ESP-IDF padrao pode afetar timing de I2S em alguns casos.

---

## Troubleshooting Geral

### Audio com Ruido ou Distorcao

1. **Verificar PSRAM** (2025.11.0+):
   ```yaml
   psram:
     mode: octal  # ou quad
   ```

2. **Verificar gain_factor** (2025.5.0+):
   - 32-bit samples tem gain_factor: 4 automatico
   - Pode causar clipping se fonte ja esta alta

3. **Framework**:
   - Audio funciona melhor com ESP-IDF
   - Se usar Arduino, pode haver timing issues

### Wake Word Lento

1. **Atualizar para 2025.11.0+**: Ultra-low latency reduz delay
2. **Verificar PSRAM**: Buffers de wake word precisam de memoria

### Playlist Perdendo Itens

1. **Atualizar para 2025.12.0+**: Bugfix especifico para este problema

---

## Referencias

- `src/firmware/ESPHOME_CHANGELOG_COMPLETO.md` - Changelog detalhado
- `src/firmware/ESPHOME_REFERENCE.md` - Referencia rapida
- `docs/referencias/esphome/content/components/i2s_audio.md` - Documentacao I2S
- `docs/referencias/esphome/content/components/microphone.md` - Documentacao Microphone
- `docs/referencias/esphome/content/components/speaker.md` - Documentacao Speaker
- `docs/referencias/esphome/content/components/voice_assistant.md` - Documentacao Voice Assistant
