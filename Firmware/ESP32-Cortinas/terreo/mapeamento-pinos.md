# Mapeamento de Pinos - ESP32 Cortinas Terreo

**Atualizado**: 2026-01-24

## Hardware

| Componente | Modelo | Endereco/Pino |
|------------|--------|---------------|
| Microcontrolador | ESP32 DevKit | - |
| Expansor I/O | XL9535 | I2C 0x27 |
| Modulo Reles | 8 canais | Via XL9535 |

## Conexoes I2C

| ESP32 | XL9535 | Funcao |
|-------|--------|--------|
| GPIO21 | SDA | Dados I2C |
| GPIO22 | SCL | Clock I2C |
| 3.3V | VCC | Alimentacao |
| GND | GND | Terra |

## Mapeamento de Reles (XL9535)

| Pino XL9535 | Rele | Cortina | Funcao |
|:-----------:|:----:|---------|--------|
| P0 (0) | 0 | ESTAR | Energia Motor |
| P1 (1) | 1 | ESTAR | Direcao (OFF=fecha, ON=abre) |
| P2 (2) | 2 | JANTAR | Energia Motor |
| P3 (3) | 3 | JANTAR | Direcao (OFF=fecha, ON=abre) |
| P4 (4) | 4 | OFFICE | Energia Motor |
| P5 (5) | 5 | OFFICE | Direcao (OFF=fecha, ON=abre) |
| P6 (6) | 6 | RESERVA | Energia Motor |
| P7 (7) | 7 | RESERVA | Direcao (OFF=fecha, ON=abre) |

## Logica de Controle

### Para ABRIR cortina:
1. Liga rele de direcao (ON)
2. Liga rele de energia
3. Aguarda tempo configurado
4. Desliga rele de energia

### Para FECHAR cortina:
1. Desliga rele de direcao (OFF)
2. Liga rele de energia
3. Aguarda tempo configurado
4. Desliga rele de energia

### Para PARAR cortina:
1. Desliga rele de energia imediatamente

## Configuracao dos Reles

- **Tipo**: Ativo HIGH (sem inversao no firmware)
- **Estado inicial**: Todos OFF (ALWAYS_OFF)

## Configuracao de Rede

| Parametro | Valor |
|-----------|-------|
| SSID | Cesar |
| Password | eli358935 |
| Fallback AP | esp-cortinas-terreo Fallback |
| Fallback Password | fallback12345 |
| Web Server | Porta 80 |
| API | Sem encryption |
| OTA | Sem password |

## Tempos de Operacao

| Cortina | Tempo Padrao | Observacao |
|---------|:------------:|------------|
| Estar | 30s | Calibrar apos instalacao |
| Jantar | 30s | Calibrar apos instalacao |
| Office | 30s | Calibrar apos instalacao |
| Reserva | 30s | Calibrar apos instalacao |

Para alterar os tempos, editar `tempo_cortinas` em `substitutions` no arquivo YAML e recompilar.

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

## Entidades no Home Assistant

| Entidade | Tipo | Descricao |
|----------|------|-----------|
| `cover.cortina_estar` | Cover | Controle cortina Estar |
| `cover.cortina_jantar` | Cover | Controle cortina Jantar |
| `cover.cortina_office` | Cover | Controle cortina Office |
| `cover.cortina_reserva` | Cover | Controle cortina Reserva |
| `sensor.cortinas_terreo_uptime` | Sensor | Tempo online |
| `sensor.cortinas_terreo_wifi_signal` | Sensor | Sinal WiFi |
| `binary_sensor.cortinas_terreo_status` | Binary Sensor | Status conexao |

## Notas de Instalacao

1. Verificar endereco I2C do XL9535 (pode variar: 0x20-0x27)
2. Reles configurados como ativo HIGH (sem inversao)
3. Calibrar tempos de abertura/fechamento apos instalacao fisica
4. Testar cada cortina individualmente antes de uso normal
5. Web server na porta 80 para debug
