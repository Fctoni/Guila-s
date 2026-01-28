# Circuitos Elétricos - Superior Principal

**Projeto**: Casa Le Parc - Automação Residencial
**Painel**: ESP32 Superior Principal
**Fonte**: CCG - SUPERIOR_POWERQUERY_CERTO.csv
**Data**: 25/01/2026

---

## ⚠️ PENDÊNCIAS ATIVAS

Este documento foi criado com informações parciais. As seguintes pendências precisam ser resolvidas:

1. **Potências LED 24V**: Medir todos os 13 circuitos LED 24V para dimensionamento de fontes
2. **Nome Frigobar (99Z)**: Confirmar identificador definitivo com arquiteto
3. **Circuito 40/7W**: Verificar se Int 2 e Int 4 compartilham circuito ou há erro no CSV
4. **Verificação Joel (circ 31/6P)**: Confirmar se PICCO está acendendo LED 24V
5. **Verificação Joel (circ 47/7T)**: Confirmar nome do Pendente Master

**Última atualização de pendências**: 25/01/2026

---

## 📊 Tabela Completa de Circuitos

> **Tabelas Refatoradas por Tipo:**
> - [superior-220.md](superior-220.md) - 17 circuitos 220V (organizados por Circ Belman)
> - [superior-24.md](superior-24.md) - 14 circuitos LED 24V (organizados por Circ Belman)

**Total de linhas**: 59 (conforme CSV)
**Total de interruptores únicos**: 16

| Ambiente         | Int | Circ Lum | Circ Belm | Acende Onde             | Tipo Iluminação    | Potência    | Nome Falado                                    |
| ---------------- | :-: | :------: | :-------: | ----------------------- | ------------------ | :---------: | ---------------------------------------------- |
| Hall Superior    | 13  | 22       | 1C        | Balizadores Degraus     | Balizador Embutido | ? W         | Iluminação Degraus                             |
| Hall Superior    | 13  | 22       | 99Z       | Móvel                   | Tensoflex LED 24V  | **80 W** ⚠️ | Iluminação Frigobar                            |
| Hall Superior    | 13  | 23       | 6H        | Hall Superior           | Embutido Picco     | ? W         | Iluminação Escada                              |
| Hall Superior    | 12  | 23       | 6H        | Hall Superior           | Embutido Picco     | ? W         | Iluminação Escada                              |
| Hall Superior    | 12  | 23       | 99Z       | Móvel                   | Tensoflex LED 24V  | **80 W** ⚠️ | Iluminação Frigobar                            |
| Hall Superior    | 11  | 23       | 6H        | Hall Superior           | Embutido Picco     | ? W         | Iluminação Escada                              |
| Hall Superior    | 11  | 23       | 99Z       | Móvel                   | Tensoflex LED 24V  | **80 W** ⚠️ | Iluminação Frigobar                            |
| Suíte 1 Frente   | 16  | 24       | 6A        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 1                             |
| Suíte 1 Frente   | 16  | 25       | 6C        | Arandela Escrivaninha   | Indefinida         | ? W         | Escrivaninha Suíte 1                           |
| Suíte 1 Frente   | 16  | 27       | 6B        | Prateleiras Decorativas | LED 24V            | ⚠️ MEDIR    | Prateleiras Suíte 1                            |
| Suíte 1 Frente   | 14  | 24       | 6A        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 1                             |
| Suíte 1 Frente   | 14  | 26       | 6D        | Arandela Cabeceira      | Indefinida         | ? W         | Cabeceira Suíte 1                              |
| Suíte 1 Frente   | 14  | 27       | 6B        | Prateleiras Decorativas | LED 24V            | ⚠️ MEDIR    | Prateleiras Suíte 1                            |
| Suíte 1 Frente   | 15  | 24       | 6A        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 1                             |
| Suíte 1 Frente   | 15  | 26       | 6D        | Arandela Cabeceira      | Indefinida         | ? W         | Cabeceira Suíte 1                              |
| Suíte 1 Frente   | 15  | 27       | 6B        | Prateleiras Decorativas | LED 24V            | ⚠️ MEDIR    | Prateleiras Suíte 1                            |
| Banheiro Suíte 1 | 19  | 28       | 6F        | Iluminação Geral        | Embutido Picco     | ? W         | Iluminação Banho 1                             |
| Banheiro Suíte 1 | 19  | 29       | 6G        | Bancada Linear          | LED 24V            | ⚠️ MEDIR    | Bancada Banho 1                                |
| Banheiro Suíte 1 | 19  | 30       | 6E        | Sanca Chuveiro          | LED 24V            | ⚠️ MEDIR    | Chuveiro Banho 1                               |
| Banheiro Suíte 1 | 20  | 28       | 6F        | Iluminação Geral        | Embutido Picco     | ? W         | Iluminação Banho 1                             |
| Banheiro Suíte 1 | 20  | 29       | 6G        | Bancada Linear          | LED 24V            | ⚠️ MEDIR    | Bancada Banho 1                                |
| Suíte 2 Fundos   | 9   | 31       | 6P        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 2 ⚠️ Joel verificar PICCO 24V |
| Suíte 2 Fundos   | 9   | 33       | 6Q        | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Suíte 2                             |
| Suíte 2 Fundos   | 9   | 34       | 6L        | Prateleiras Decorativas | LED 24V            | ⚠️ MEDIR    | Prateleiras Suíte 2                            |
| Suíte 2 Fundos   | 8   | 31       | 6P        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 2 ⚠️ Joel verificar PICCO 24V |
| Suíte 2 Fundos   | 8   | 33       | 6Q        | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Suíte 2                             |
| Suíte 2 Fundos   | 8   | 35       | 6M        | Arandela Cabeceira      | Indefinida         | ? W         | Cabeceira Suíte 2                              |
| Suíte 2 Fundos   | 7   | 31       | 6P        | Quarto                  | Embutido Picco     | ? W         | Iluminação Suíte 2 ⚠️ Joel verificar PICCO 24V |
| Suíte 2 Fundos   | 7   | 33       | 6Q        | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Suíte 2                             |
| Suíte 2 Fundos   | 7   | 35       | 6M        | Arandela Cabeceira      | Indefinida         | ? W         | Cabeceira Suíte 2                              |
| Banheiro Suíte 2 | 10  | 36       | 6F        | Iluminação Geral        | Embutido Picco     | ? W         | Iluminação Banho 2                             |
| Banheiro Suíte 2 | 10  | 37       | 6G        | Bancada Linear          | LED 24V            | ⚠️ MEDIR    | Bancada Banho 2                                |
| Banheiro Suíte 2 | 10  | 38       | 6E        | Sanca Chuveiro          | LED 24V            | ⚠️ MEDIR    | Chuveiro Banho 2                               |
| Suíte Master     | 18  | 42       | 6R        | Balizadores             | Balizador Embutido | ? W         | Balizadores Master                             |
| Suíte Master     | 18  | 45       | 7S        | Entrada Master          | Embutido Picco     | ? W         | Entrada Master                                 |
| Suíte Master     | 18  | 46       | 7A1       | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Master                              |
| Suíte Master     | 18  | 49       | 7U        | Quarto                  | Embutido Picco     | ? W         | Iluminação Master                              |
| Suíte Master     | 5   | 42       | 7R        | Balizadores             | Balizador Embutido | ? W         | Balizadores Master                             |
| Suíte Master     | 5   | 46       | 7A1       | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Master                              |
| Suíte Master     | 5   | 47       | 7T        | Pendente Cabeceira      | Pendente           | ? W         | Pendente Master ⚠️ Joel verificar nome         |
| Suíte Master     | 5   | 48       | 7R        | Sapateira Master        | LED 24V            | ⚠️ MEDIR    | Sapateira Master                               |
| Suíte Master     | 5   | 49       | 7U        | Quarto                  | Embutido Picco     | ? W         | Iluminação Master                              |
| Suíte Master     | 6   | 42       | 7R        | Balizadores             | Balizador Embutido | ? W         | Balizadores Master                             |
| Suíte Master     | 6   | 46       | 7A1       | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Master                              |
| Suíte Master     | 6   | 47       | 7T        | Pendente Cabeceira      | Pendente           | ? W         | Pendente Master ⚠️ Joel verificar nome         |
| Suíte Master     | 6   | 48       | 7R        | Sapateira Master        | LED 24V            | ⚠️ MEDIR    | Sapateira Master                               |
| Suíte Master     | 6   | 49       | 7U        | Quarto                  | Embutido Picco     | ? W         | Iluminação Master                              |
| Suíte Master     | 1   | 46       | 7A1       | Sanca Cortineiro        | LED 24V            | ⚠️ MEDIR    | Cortineiro Master                              |
| Suíte Master     | 1   | 48       | 7R        | Sapateira Master        | Indefinida         | ? W         | Sapateira Master                               |
| Suíte Master     | 1   | 49       | 7U        | Quarto                  | Embutido Picco     | ? W         | Iluminação Master                              |
| Closet Master    | 17  | 50       | 7V        | Closet                  | Tensoflex LED 24V  | ⚠️ MEDIR    | Tensoflex Closet                               |
| Closet Master    | 17  | 42       | 7R        | Balizadores             | Balizador Embutido | ? W         | Balizadores Master                             |
| Banho Master     | 4   | 39       | 7W        | Banho Master            | Embutido Picco     | ? W         | Iluminação Banho Master                        |
| Banho Master     | 4   | 40       | 7X        | Tensoflex Master        | Tensoflex LED      | ⚠️ MEDIR    | Tensoflex Master                               |
| Banho Master     | 4   | 43       | 7D1       | Sanitário Master        | Embutido Picco     | ? W         | Sanitário Master                               |
| Banho Master     | 2   | 40       | 7W        | Tensoflex Master        | Tensoflex LED      | ⚠️ MEDIR    | Tensoflex Master ⚠️ Verificar duplicação       |
| Banho Master     | 2   | 41       | 7L1/7Z    | Sanca Chuveiro          | Fita LED 24V       | ⚠️ MEDIR    | Sanca Master                                   |
| Banho Master     | 2   | 44       | 7Y        | Chuveiro Master         | Embutido Picco     | ? W         | Chuveiro Master                                |

---

## 📋 Estrutura Hierárquica por Tipo

### LED 24V

#### HALL SUPERIOR

**Interruptor 13**
- Circuito 22 (1C): Balizador Embutido → Iluminação Degraus — **? W**
- Circuito 23 (99Z): Tensoflex LED → Iluminação Frigobar — **80 W** ⚠️ (nome temporário)

**Interruptor 12**
- Circuito 23 (99Z): Tensoflex LED → Iluminação Frigobar — **80 W** ⚠️ (compartilhado)

**Interruptor 11**
- Circuito 23 (99Z): Tensoflex LED → Iluminação Frigobar — **80 W** ⚠️ (compartilhado)

#### SUÍTE 1 FRENTE

**Interruptor 16**
- Circuito 27 (6B): LED → Prateleiras Suíte 1 — **⚠️ PENDÊNCIA: medir**

**Interruptor 14**
- Circuito 27 (6B): LED → Prateleiras Suíte 1 — **⚠️ PENDÊNCIA: medir** (compartilhado)

**Interruptor 15**
- Circuito 27 (6B): LED → Prateleiras Suíte 1 — **⚠️ PENDÊNCIA: medir** (compartilhado)

#### BANHEIRO SUÍTE 1

**Interruptor 19**
- Circuito 29 (6G): LED → Bancada Banho 1 — **⚠️ PENDÊNCIA: medir**
- Circuito 30 (6E): LED → Chuveiro Banho 1 — **⚠️ PENDÊNCIA: medir**

**Interruptor 20**
- Circuito 29 (6G): LED → Bancada Banho 1 — **⚠️ PENDÊNCIA: medir** (compartilhado)

#### SUÍTE 2 FUNDOS

**Interruptor 9**
- Circuito 33 (6Q): LED → Cortineiro Suíte 2 — **⚠️ PENDÊNCIA: medir**
- Circuito 34 (6L): LED → Prateleiras Suíte 2 — **⚠️ PENDÊNCIA: medir**

**Interruptor 8**
- Circuito 33 (6Q): LED → Cortineiro Suíte 2 — **⚠️ PENDÊNCIA: medir** (compartilhado)

**Interruptor 7**
- Circuito 33 (6Q): LED → Cortineiro Suíte 2 — **⚠️ PENDÊNCIA: medir** (compartilhado)

#### BANHEIRO SUÍTE 2

**Interruptor 10**
- Circuito 37 (6G): LED → Bancada Banho 2 — **⚠️ PENDÊNCIA: medir**
- Circuito 38 (6E): LED → Chuveiro Banho 2 — **⚠️ PENDÊNCIA: medir**

#### SUÍTE MASTER

**Interruptor 18**
- Circuito 46 (7A1): LED → Cortineiro Master — **⚠️ PENDÊNCIA: medir**

**Interruptor 5**
- Circuito 46 (7A1): LED → Cortineiro Master — **⚠️ PENDÊNCIA: medir** (compartilhado)
- Circuito 48 (7R): LED → Sapateira Master — **⚠️ PENDÊNCIA: medir**

**Interruptor 6**
- Circuito 46 (7A1): LED → Cortineiro Master — **⚠️ PENDÊNCIA: medir** (compartilhado)
- Circuito 48 (7R): LED → Sapateira Master — **⚠️ PENDÊNCIA: medir** (compartilhado)

**Interruptor 1**
- Circuito 46 (7A1): LED → Cortineiro Master — **⚠️ PENDÊNCIA: medir** (compartilhado)

#### CLOSET MASTER

**Interruptor 17**
- Circuito 50 (7V): Tensoflex LED → Tensoflex Closet — **⚠️ PENDÊNCIA: medir**

#### BANHO MASTER

**Interruptor 4**
- Circuito 40 (7X): Tensoflex LED → Tensoflex Master — **⚠️ PENDÊNCIA: medir**

**Interruptor 2**
- Circuito 40 (7W): Tensoflex LED → Tensoflex Master — **⚠️ PENDÊNCIA: verificar se é 7W ou 7X**
- Circuito 41 (7L1/7Z): Fita LED → Sanca Master — **⚠️ PENDÊNCIA: medir**

---

**Totais LED 24V**:
- **Quantidade de circuitos**: 13 identificados
- **Potência total**: ⚠️ **PENDÊNCIA: aguardando medições**
- **Corrente total**: ⚠️ **PENDÊNCIA: aguardando medições**

---

### 220V

#### HALL SUPERIOR

**Interruptor 13**
- Circuito 23 (6H): Embutido Picco → Iluminação Escada

**Interruptor 12**
- Circuito 23 (6H): Embutido Picco → Iluminação Escada (compartilhado)

**Interruptor 11**
- Circuito 23 (6H): Embutido Picco → Iluminação Escada (compartilhado)

#### SUÍTE 1 FRENTE

**Interruptor 16**
- Circuito 24 (6A): Embutido Picco → Iluminação Suíte 1
- Circuito 25 (6C): Indefinida → Escrivaninha Suíte 1 ⚠️ (Arandela)

**Interruptor 14**
- Circuito 24 (6A): Embutido Picco → Iluminação Suíte 1 (compartilhado)
- Circuito 26 (6D): Indefinida → Cabeceira Suíte 1 ⚠️ (Arandela)

**Interruptor 15**
- Circuito 24 (6A): Embutido Picco → Iluminação Suíte 1 (compartilhado)
- Circuito 26 (6D): Indefinida → Cabeceira Suíte 1 ⚠️ (Arandela - compartilhado)

#### BANHEIRO SUÍTE 1

**Interruptor 19**
- Circuito 28 (6F): Embutido Picco → Iluminação Banho 1

**Interruptor 20**
- Circuito 28 (6F): Embutido Picco → Iluminação Banho 1 (compartilhado)

#### SUÍTE 2 FUNDOS

**Interruptor 9**
- Circuito 31 (6P): Embutido Picco → Iluminação Suíte 2 ⚠️ (Joel verificar PICCO 24V)

**Interruptor 8**
- Circuito 31 (6P): Embutido Picco → Iluminação Suíte 2 ⚠️ (compartilhado - Joel verificar)
- Circuito 35 (6M): Indefinida → Cabeceira Suíte 2 (Arandela)

**Interruptor 7**
- Circuito 31 (6P): Embutido Picco → Iluminação Suíte 2 ⚠️ (compartilhado - Joel verificar)
- Circuito 35 (6M): Indefinida → Cabeceira Suíte 2 (Arandela - compartilhado)

#### BANHEIRO SUÍTE 2

**Interruptor 10**
- Circuito 36 (6F): Embutido Picco → Iluminação Banho 2

#### SUÍTE MASTER

**Interruptor 18**
- Circuito 42 (6R): Balizador Embutido → Balizadores Master
- Circuito 45 (7S): Embutido Picco → Entrada Master
- Circuito 49 (7U): Embutido Picco → Iluminação Master

**Interruptor 5**
- Circuito 42 (7R): Balizador Embutido → Balizadores Master (compartilhado)
- Circuito 47 (7T): Pendente → Pendente Master ⚠️ (Joel verificar nome)
- Circuito 49 (7U): Embutido Picco → Iluminação Master (compartilhado)

**Interruptor 6**
- Circuito 42 (7R): Balizador Embutido → Balizadores Master (compartilhado)
- Circuito 47 (7T): Pendente → Pendente Master ⚠️ (Joel verificar nome - compartilhado)
- Circuito 49 (7U): Embutido Picco → Iluminação Master (compartilhado)

**Interruptor 1**
- Circuito 48 (7R): Indefinida → Sapateira Master ⚠️ (CSV inconsistente: LED 24V em outras linhas)
- Circuito 49 (7U): Embutido Picco → Iluminação Master (compartilhado)

#### CLOSET MASTER

**Interruptor 17**
- Circuito 42 (7R): Balizador Embutido → Balizadores Master (compartilhado)

#### BANHO MASTER

**Interruptor 4**
- Circuito 39 (7W): Embutido Picco → Iluminação Banho Master
- Circuito 43 (7D1): Embutido Picco → Sanitário Master

**Interruptor 2**
- Circuito 44 (7Y): Embutido Picco → Chuveiro Master

---

**Totais 220V**:
- **Embutidos Picco**: ~15 circuitos únicos
- **Balizadores**: 2 circuitos (1C, 7R)
- **Pendente**: 1 circuito (7T)
- **Indefinidas**: 3 circuitos (6C, 6D, 6M) - Arandelas

---

## 🔌 Análise de Hardware Necessário

### Total de Interruptores Físicos (Caixinhas na Parede)

**16 interruptores** únicos: 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20

---

### ENTRADAS (GPIOs de Entrada) = Teclas/Circuitos Lum Únicos

**Circuitos luminotécnicos únicos**: 27 (de 22 a 50)

Considerando compartilhamentos identificados no CSV:
- Alguns circuitos são acionados por múltiplos interruptores (mesmo GPIO)
- Estimativa: **~27-30 entradas necessárias**

**MCP23017 necessário**:
- 2 chips (16 GPIO cada = 32 total)
  - Chip 1 (0x20): 16 entradas
  - Chip 2 (0x21): 11-14 entradas (sobram pinos)

---

### SAÍDAS (Relés/GPIOs de Saída) = Circuitos Belm Únicos

**Circuitos Belman únicos**: ~24-26 saídas

#### Circuitos 220V (Relés On/Off): ~15-17 relés
- Embutidos Picco (~15)
- Balizadores (2)
- Pendente (1)
- Indefinidas (3)

#### Circuitos LED 24V (Shelly RGBW2 - Dimerização): 13 circuitos
1. **1C** - Balizadores Degraus
2. **99Z** - Frigobar Hall — 80W ⚠️
3. **6B** - Prateleiras Suíte 1 — ⚠️ MEDIR
4. **6E** - Chuveiro Banho 1/2 (podem ser mesmo circuito) — ⚠️ MEDIR
5. **6G** - Bancada Banho 1/2 (podem ser mesmo circuito) — ⚠️ MEDIR
6. **6Q** - Cortineiro Suíte 2 — ⚠️ MEDIR
7. **6L** - Prateleiras Suíte 2 — ⚠️ MEDIR
8. **7A1** - Cortineiro Master — ⚠️ MEDIR
9. **7R** - Sapateira Master — ⚠️ MEDIR
10. **7L1/7Z** - Sanca Master — ⚠️ MEDIR
11. **7V** - Tensoflex Closet — ⚠️ MEDIR
12. **7X** - Tensoflex Banho Master — ⚠️ MEDIR
13. **7W** - Tensoflex Banho Master ⚠️ (verificar se diferente de 7X)

**MCP23017 necessário**:
- 2 chips (16 GPIO cada = 32 total)
  - Chip 3 (0x22): 16 saídas (relés 220V)
  - Chip 4 (0x23): 8-10 saídas (triggers Shelly ou relés extras)

**Total de chips MCP23017**: **4 chips** (2 entrada + 2 saída)

---

### Shelly RGBW2 (LEDs 24V)

- **Quantidade**: 3-4 unidades (modo 4x White independente)
  - Shelly 1: 4 circuitos LED
  - Shelly 2: 4 circuitos LED
  - Shelly 3: 4 circuitos LED
  - Shelly 4 (se necessário): 1 circuito LED
- **Total controlado**: 13 circuitos LED 24V

---

### Fontes de Alimentação 24V (LEDs)

⚠️ **PENDÊNCIA CRÍTICA**: Aguardando medição de potências para dimensionamento correto.

**Circuitos conhecidos**:
- 99Z (Frigobar): 80W

**Estimativa conservadora** (valores típicos):
- Tensoflex (7V, 7X, 7W): ~150-200W cada
- Cortineiro (7A1, 6Q): ~250-300W cada
- Bancadas/Prateleiras (6B, 6G, 6L): ~40-80W cada
- Chuveiro/Sanca (6E, 7L1/7Z): ~100-150W cada
- Balizador (1C): ~20-40W

**Estimativa total**: ~1.500-2.000 W | ~65-85 A

**Sugestão inicial** (ajustar após medições):

| Fonte | Capacidade | Circuitos Sugeridos | Estimativa |
|-------|:----------:|---------------------|:----------:|
| Fonte 1 | 24V 20A (480W) | 7A1 (Cortineiro Master) + 6Q (Cortineiro S2) | ~500-600W |
| Fonte 2 | 24V 15A (360W) | 7V (Closet) + 7X/7W (Tensoflex Banho) | ~300-400W |
| Fonte 3 | 24V 15A (360W) | 7L1/7Z (Sanca) + 6E (Chuveiros) | ~250-300W |
| Fonte 4 | 24V 10A (240W) | 99Z (Frigobar) + 6B + 6G + 6L + 1C | ~200-240W |

⚠️ **Importante**: Estes valores são ESTIMATIVAS. Fontes devem ser dimensionadas após medições reais.

---

### Outras Fontes
- **Fonte 5V**: Para ESP32 e MCP23017
- **Fonte 12V (opcional)**: Para relés se necessário

---

## 📝 Observações Importantes

### Circuitos Compartilhados (Mesma Entrada, Múltiplos Interruptores)

Os seguintes circuitos têm **fios em paralelo** - mesma entrada GPIO controla de vários locais:

- **Circ 23 (→6H)**: Int 11 + 12 + 13 (Hall Superior - Escada)
- **Circ 23 (→99Z)**: Int 11 + 12 + 13 (Hall Superior - Frigobar)
- **Circ 24 (→6A)**: Int 14 + 15 + 16 (Suíte 1 - Geral)
- **Circ 26 (→6D)**: Int 14 + 15 (Suíte 1 - Cabeceira)
- **Circ 27 (→6B)**: Int 14 + 15 + 16 (Suíte 1 - Prateleiras)
- **Circ 28 (→6F)**: Int 19 + 20 (Banho 1 - Geral)
- **Circ 29 (→6G)**: Int 19 + 20 (Banho 1 - Bancada)
- **Circ 31 (→6P)**: Int 7 + 8 + 9 (Suíte 2 - Geral)
- **Circ 33 (→6Q)**: Int 7 + 8 + 9 (Suíte 2 - Cortineiro)
- **Circ 35 (→6M)**: Int 7 + 8 (Suíte 2 - Cabeceira)
- **Circ 42 (→7R)**: Int 5 + 6 + 17 + 18 (Master - Balizadores)
- **Circ 46 (→7A1)**: Int 1 + 5 + 6 + 18 (Master - Cortineiro) ⭐ **MAIS COMPARTILHADO**
- **Circ 47 (→7T)**: Int 5 + 6 (Master - Pendente)
- **Circ 48 (→7R)**: Int 5 + 6 (Master - Sapateira)
- **Circ 49 (→7U)**: Int 1 + 5 + 6 + 18 (Master - Geral)

**Implementação ESPHome**:
- Uma única entrada GPIO por circuito compartilhado
- Múltiplos pulsadores em paralelo fisicamente
- Lógica de múltiplos cliques se necessário

---

### Interruptores com Múltiplas Teclas

Alguns interruptores têm MUITAS teclas (complexidade de lógica):

- **Int 18 (Hall Master)**: 4 teclas/circuitos
- **Int 5 (Master - Marcenaria)**: 5 teclas/circuitos
- **Int 6 (Master - Marcenaria)**: 5 teclas/circuitos
- **Int 16 (Suíte 1)**: 3 teclas/circuitos
- **Int 14 (Suíte 1)**: 3 teclas/circuitos
- **Int 15 (Suíte 1)**: 3 teclas/circuitos
- **Int 9 (Suíte 2)**: 3 teclas/circuitos
- **Int 8 (Suíte 2)**: 3 teclas/circuitos
- **Int 7 (Suíte 2)**: 3 teclas/circuitos
- **Int 19 (Banho 1)**: 3 teclas/circuitos
- **Int 10 (Banho 2)**: 3 teclas/circuitos
- **Int 11/12/13 (Hall Superior)**: 2 teclas/circuitos cada

**Solução**:
- Pulsadores de 2-5 teclas (Schneider, Siemens, Legrand)
- Lógica de múltiplos cliques para economizar teclas se necessário
- Identificação clara das funções (gravar/imprimir ao lado)

---

## 📋 Circuitos Especiais

### Circuito Temporário: Frigobar (99Z)

O circuito do Frigobar no Hall Superior aguarda definição de nome:

- **Identificador atual**: "99Z" (temporário)
- **Tipo**: Tensoflex LED 24V
- **Potência**: 80W (estimado, similar ao Bar do térreo)
- **Interruptores**: 11, 12, 13 (Hall Superior - compartilhado)
- **⚠️ PENDÊNCIA**: Confirmar nome definitivo com arquiteto
- **Sugestão**: Verificar etiqueta física na instalação

**Implementação ESPHome**: Configurar como saída PWM provisória, atualizar nome após confirmação.

---

### Circuito Duplo: Sanca Master (7L1/7Z)

O circuito 41 possui dois identificadores Belman alternativos:

- **Identificadores**: 7L1 / 7Z
- **Motivo**: Um dos circuitos ficou preso acima do gesso durante a obra (similar ao 1T/1S do térreo)
- **Implementação**: Apenas UM dos dois será conectado na instalação final
- **Documentação**: Ambos os identificadores aparecem para referência
- **Interruptor**: 2 (Banho Master)
- **Tipo**: Fita LED 24V
- **⚠️ PENDÊNCIA**: Medir potência após definir qual circuito foi conectado

**Implementação ESPHome**: Verificar qual circuito (7L1 ou 7Z) foi efetivamente conectado antes de configurar o GPIO.

---

### Circuito Duplicado: Tensoflex Master (7W/7X)

O circuito 40 aparece em dois interruptores com possível inconsistência:

- **Int 4, linha 55**: Circuito 40 (7X) - Tensoflex Master
- **Int 2, linha 57**: Circuito 40 (7W) - Tensoflex Master
- **Ambos**: Mesmo nome "BANHO MASTER", mesmo tipo "TENSOFLEX LED"
- **⚠️ PENDÊNCIA**: Verificar se são o mesmo circuito (compartilhado) ou erro no CSV
- **Possibilidades**:
  1. São o mesmo circuito → usar 7X em ambos (ou 7W)
  2. São circuitos diferentes → um deve ser 7X, outro 7W
  3. Erro de digitação no CSV → corrigir após verificação física

**Implementação ESPHome**: Aguardar verificação antes de configurar GPIOs. Se forem circuitos distintos, precisam saídas separadas.

---

### Verificações Pendentes (Joel)

**1. Circuito 31 (6P) - Suíte 2:**
- **Nota CSV**: "JOEL VERIFICAR PICCO ACENDENDO 24V"
- **Problema**: Suspeita de Picco (220V) acendendo iluminação LED 24V
- **Interruptores afetados**: 7, 8, 9
- **⚠️ PENDÊNCIA**: Confirmar tipo correto de iluminação
- **Impacto**: Se for LED 24V, precisa ser movido para seção LED 24V e adicionar Shelly

**2. Circuito 47 (7T) - Pendente Master:**
- **Nota CSV**: "JOEL VERIFICAR NOME"
- **Problema**: Nome do pendente precisa confirmação
- **Interruptores afetados**: 5, 6
- **⚠️ PENDÊNCIA**: Confirmar nomenclatura correta
- **Impacto**: Atualizar nome falado no Home Assistant após confirmação

---

### Medições Necessárias

⚠️ **PENDÊNCIA CRÍTICA**: Os seguintes 13 circuitos LED 24V precisam medição de potência para dimensionamento correto das fontes 24V:

| # | Circ Belm | Local | Tipo | Prioridade |
|---|:---------:|-------|------|:----------:|
| 1 | **99Z** | Frigobar Hall | Tensoflex LED | 🟡 Baixa (estimado 80W) |
| 2 | **6B** | Prateleiras Suíte 1 | LED 24V | 🔴 Alta |
| 3 | **6E** | Chuveiro Banho 1/2 | LED 24V | 🔴 Alta |
| 4 | **6G** | Bancada Banho 1/2 | LED 24V | 🔴 Alta |
| 5 | **6Q** | Cortineiro Suíte 2 | LED 24V | 🔴 Alta |
| 6 | **6L** | Prateleiras Suíte 2 | LED 24V | 🔴 Alta |
| 7 | **7A1** | Cortineiro Master | LED 24V | 🔴 Alta |
| 8 | **7R** | Sapateira Master | LED 24V | 🔴 Alta |
| 9 | **7L1/7Z** | Sanca Master | Fita LED 24V | 🔴 Alta |
| 10 | **7V** | Tensoflex Closet | Tensoflex LED | 🔴 Alta |
| 11 | **7X** | Tensoflex Banho Master | Tensoflex LED | 🔴 Alta |
| 12 | **7W** | Tensoflex Banho Master | Tensoflex LED | 🔴 Alta (verificar duplicação) |
| 13 | **1C** | Balizadores Degraus | Balizador LED | 🟡 Média |

**Procedimento de medição**:
1. Usar alicate amperímetro em cada circuito
2. Medir corrente (A) com iluminação 100%
3. Calcular potência: P = V × I (24V × corrente medida)
4. Documentar comprimento e bitola do cabo
5. Atualizar documento com valores reais
6. Recalcular dimensionamento de fontes

**Após medições**: Atualizar seções "Estrutura Hierárquica LED 24V" e "Fontes de Alimentação 24V" com valores reais.

---

**Última atualização**: 25/01/2026
