# Circuitos Eletricos - Cortinas Terreo

**Projeto**: Casa Le Parc - Automacao Residencial
**Modulo**: ESP32 Cortinas Terreo
**Data**: 2026-01-24

---

## Hardware

| Componente | Modelo | Especificacao |
|------------|--------|---------------|
| Microcontrolador | ESP32 DevKit | WiFi 2.4GHz |
| Expansor I/O | XL9535 | I2C 0x27, 16 GPIOs |
| Modulo Reles | 8 canais | Ativo HIGH |
| Motores | Cortina motorizada | 4 unidades |

---

## Conexoes I2C

| ESP32 | XL9535 | Funcao |
|-------|--------|--------|
| GPIO21 | SDA | Dados I2C |
| GPIO22 | SCL | Clock I2C |
| 3.3V | VCC | Alimentacao |
| GND | GND | Terra |

---

## Mapeamento de Reles

| Pino XL9535 | Rele | Cortina | Funcao |
|:-----------:|:----:|---------|--------|
| P0 | 0 | ESTAR | Energia Motor |
| P1 | 1 | ESTAR | Direcao (OFF=fecha, ON=abre) |
| P2 | 2 | JANTAR | Energia Motor |
| P3 | 3 | JANTAR | Direcao (OFF=fecha, ON=abre) |
| P4 | 4 | OFFICE | Energia Motor |
| P5 | 5 | OFFICE | Direcao (OFF=fecha, ON=abre) |
| P6 | 6 | RESERVA | Energia Motor |
| P7 | 7 | RESERVA | Direcao (OFF=fecha, ON=abre) |

---

## Configuracao de Rede

| Parametro | Valor |
|-----------|-------|
| SSID | Cesar |
| Fallback AP | esp-cortinas-terreo Fallback |
| Fallback Password | fallback12345 |
| Web Server | Porta 80 |

---

## Logica de Controle

### Para ABRIR cortina
1. Liga rele de direcao (ON)
2. Liga rele de energia
3. Aguarda tempo configurado (30s)
4. Desliga rele de energia

### Para FECHAR cortina
1. Desliga rele de direcao (OFF)
2. Liga rele de energia
3. Aguarda tempo configurado (30s)
4. Desliga rele de energia

### Para PARAR cortina
1. Desliga rele de energia imediatamente

---

## Tempos de Operacao

| Cortina | Tempo Padrao | Observacao |
|---------|:------------:|------------|
| Estar | 30s | Calibrar apos instalacao |
| Jantar | 30s | Calibrar apos instalacao |
| Office | 30s | Calibrar apos instalacao |
| Reserva | 30s | Calibrar apos instalacao |

Para alterar tempos: editar `tempo_cortinas` em `substitutions` no YAML e recompilar.

---

## Comportamento Fisico e Conversao Visual

### Tipo de Cortina
As cortinas sao do tipo **centro-abertura** (split no meio):
- Quando fechadas: os paineis se encontram no centro da janela
- Quando abertas: os paineis recolhem para as laterais (esquerda e direita)

### Fator de Acumulo
Quando totalmente abertas, o tecido acumulado nas laterais ocupa espaco:
- Exemplo: janela de 10m, com 1m de tecido acumulado de cada lado
- **Abertura maxima real: ~80% da largura da janela**

### Conversao no Dashboard

| ESPHome | Visual (Dashboard) | Descricao |
|:-------:|:------------------:|-----------|
| 0% | 0% | Fechada |
| 50% | 40% | Meia abertura |
| 100% | 80% | Totalmente aberta |

**Formula**: `visualPos = pos * 0.8`

**Onde esta implementado**:
- `Home-Assistant/dashboards/cortinas-opcao-b-hibrido.yaml`
- Template `cover_visual`, custom_fields `visual` e `info`

> **Nota**: O firmware ESPHome permanece inalterado (0-100%).
> A conversao e apenas na camada de visualizacao do dashboard.

---

## Entidades Home Assistant

| Entidade | Tipo | Descricao |
|----------|------|-----------|
| `cover.cortinas_terreo_cortina_estar` | Cover | Controle cortina Estar |
| `cover.cortinas_terreo_cortina_jantar` | Cover | Controle cortina Jantar |
| `cover.cortinas_terreo_cortina_office` | Cover | Controle cortina Office |
| `cover.cortinas_terreo_cortina_reserva` | Cover | Controle cortina Reserva |
| `sensor.cortinas_terreo_uptime` | Sensor | Tempo online |
| `sensor.cortinas_terreo_wifi_signal` | Sensor | Sinal WiFi |
| `binary_sensor.cortinas_terreo_status` | Binary Sensor | Status conexao |

---

## Diagrama de Ligacao

```
ESP32 DevKit
    |
    +-- GPIO21 (SDA) ----+
    |                    |
    +-- GPIO22 (SCL) ----+---- XL9535 (0x27)
    |                    |         |
    +-- 3.3V ------------+         +-- P0 -- Rele 0 -- Motor Estar (Energia)
    |                              +-- P1 -- Rele 1 -- Motor Estar (Direcao)
    +-- GND -----------------------+-- P2 -- Rele 2 -- Motor Jantar (Energia)
                                   +-- P3 -- Rele 3 -- Motor Jantar (Direcao)
                                   +-- P4 -- Rele 4 -- Motor Office (Energia)
                                   +-- P5 -- Rele 5 -- Motor Office (Direcao)
                                   +-- P6 -- Rele 6 -- Motor Reserva (Energia)
                                   +-- P7 -- Rele 7 -- Motor Reserva (Direcao)
```

---

## Referencias

- Firmware: `Firmware/ESP32-Cortinas/terreo/esp-cortinas-terreo.yaml`
- Mapeamento: `Firmware/ESP32-Cortinas/terreo/mapeamento-pinos.md`
- Manual Tecnico: `Documentacao/04-Manuais/Manual-Tecnico.md` (Secao 4.1)

---

**Ultima atualizacao**: 2026-01-24

---

## Historico

| Data | Alteracao |
|------|-----------|
| 2026-01-24 | Documentacao inicial + conversao visual 80% |
