# Circuitos Elétricos - Térreo Principal

**Projeto**: Casa Le Parc - Automação Residencial  
**Painel**: ESP32 Térreo Principal  
**Fonte**: CCG - ENFIAÇÃO AUTOMAÇÃO FALADA.xlsx (Pavimento Inferior)  
**Data**: 02/12/2025

---

## 📊 Tabela Completa de Circuitos (Expandida)

| Ambiente | Int | Circ Lum | Circ Belm | Acende Onde | Tipo Iluminação | Nome Falado |
|----------|-----|----------|-----------|-------------|-----------------|-------------|
| Garagem | 32 | 4 | 2A | Garagem | Fita LED 24V | Iluminação Garagem |
| Despensa | 31 | 7 | 2B | Despensa | LED 24V + Spot | Iluminação Despensa |
| Lavanderia | 27 | 8 | 2C | Lavanderia | LED 24V | Iluminação Lavanderia |
| Lavanderia | 27 | 8 | 2C | Lavanderia | Embutido Picco | Iluminação Lavanderia |
| Lavanderia | 27 | 9 | 2D | Lavanderia | Perfil Bancada | Bancada Lavanderia |
| Lavanderia | 25 | 8 | 2C | Lavanderia | LED 24V | Iluminação Lavanderia |
| Lavanderia | 25 | 8 | 2C | Lavanderia | Embutido Picco | Iluminação Lavanderia |
| Lavanderia | 25 | 9 | 2D | Lavanderia | LED 24V | Bancada Lavanderia |
| Circulação Serviço | 23 | 10 | 2H | Circulação Serviço | Embutido Picco | Iluminação Hall Serviço |
| Banheiro Serviço | 24 | 11 | 2Z | Banheiro Serviço | Embutido Picco | Iluminação Banho Serviço |
| Circulação Serviço | 21 | 9 | 2F | Sauna | LED 24V | Iluminação Sauna Superior |
| Circulação Serviço | 21 | 10 | 2G | Sauna | LED 24V | Iluminação Sauna Inferior |
| Escritório | 34 | 1 | 2L | Escritório | Embutido Picco | Iluminação Escritório |
| Escritório | 34 | 2 | 2M | Escritório | Pendente | Pendente Escritório |
| Escritório | 34 | 3 | 2K | Escritório | LED 24V | Fitas Escritório |
| Lavabo | 33 | 5 | 2i | Lavabo | Tensoflex LED | Iluminação Lavabo |
| Hall | 35 | 16 | 1U | Cortineiro Living | LED 24V | Cortineiro Living |
| Hall | 35 | 17 | 1Q | Área Poltronas | Embutido Picco | Iluminação Living |
| Hall | 35 | 18 | 1O | Atrás Sofá | Extra | - |
| Hall | 35 | 19 | 1P | Área TV | Embutido Picco | Iluminação TV |
| Hall | 35 | 21 | 1N | Hall Principal | Embutido Picco | Iluminação Hall Principal |
| Hall | 35 | 22 | 1C | Balizadores Degraus | Balizador Embutido | Iluminação Degraus |
| Lado do Sofá | 30 | 16 | 1U | Cortineiro Living | LED 24V | Cortineiro Living |
| Lado do Sofá | 30 | 17 | 1Q | Área Poltronas | Embutido Picco | Iluminação Living |
| Lado do Sofá | 30 | 18 | 1O | Atrás Sofá | Extra | - |
| Lado do Sofá | 30 | 19 | 1P | Área TV | Embutido Picco | Iluminação TV |
| Lado do Sofá | 30 | 20 | 1R | Abaixo Buffet | LED 24V | Iluminação Buffet |
| Lado do Sofá | 30 | 21 | 1N | Hall Principal | Embutido Picco | Iluminação Hall Principal |
| Cozinha | 29 | 12 | 1X | Perfil Bancada Pia | LED 24V | Bancada Cozinha |
| Cozinha | 29 | 13 | 1V | Ilha Cozinha | Embutido Picco | Ilha Cozinha |
| Cozinha | 29 | 14 | 1W | Geral Cozinha | Embutido Picco | Iluminação Cozinha |
| Cozinha | 29 | 15 | 1T | Mesa Jantar | Embutido + Pendente | Iluminação Jantar |
| Cozinha | 29 | 16 | 1U | Cortineiro Living | LED 24V | Cortineiro Living |
| Churrasqueira | 26 | 13 | 1V | Ilha Cozinha | Embutido Picco | Ilha Cozinha |
| Churrasqueira | 26 | 14 | 1W | Geral Cozinha | Embutido Picco | Iluminação Cozinha |
| Churrasqueira | 26 | 15 | 1T | Mesa Jantar | Embutido + Pendente | Iluminação Jantar |
| Churrasqueira | 26 | 16 | 1U | Cortineiro Living | LED 24V | Cortineiro Living |
| Churrasqueira | 26 | 17 | 1Q | Área Poltronas | Embutido Picco | Iluminação Living |
| Churrasqueira | 26 | 50 | 1 | Churrasqueira | Incandescente | Iluminação Churrasqueira |
| Bar | 22 | 13 | 1V | Ilha Cozinha | Embutido Picco | Ilha Cozinha |
| Bar | 22 | 14 | 1W | Geral Cozinha | Embutido Picco | Iluminação Cozinha |
| Bar | 22 | 15 | 1T | Mesa Jantar | Embutido + Pendente | Iluminação Jantar |
| Bar | 22 | 16 | 1U | Cortineiro Living | LED 24V | Cortineiro Living |
| Bar | 22 | 17 | 1Q | Área Poltronas | Embutido Picco | Iluminação Living |
| Bar | 22 | 20 | 1R | Abaixo Buffet | LED 24V | Iluminação Buffet |

---

## 📋 Estrutura Hierárquica por Tipo de Iluminação

### LED 24V

#### GARAGEM
**Interruptor 32**
- Circuito 4 (2A): Fita LED → Iluminação Garagem

#### DESPENSA
**Interruptor 31**
- Circuito 7 (2B): LED + Spot → Iluminação Despensa

#### LAVANDERIA
**Interruptor 27**
- Circuito 8 (2C): LED → Iluminação Lavanderia
- Circuito 9 (2D): Perfil Bancada → Bancada Lavanderia

**Interruptor 25**
- Circuito 8 (2C): LED → Iluminação Lavanderia
- Circuito 9 (2D): LED → Bancada Lavanderia

#### CIRCULAÇÃO DE SERVIÇO
**Interruptor 21**
- Circuito 9 (2F): LED → Iluminação Sauna Superior
- Circuito 10 (2G): LED → Iluminação Sauna Inferior

#### ESCRITÓRIO
**Interruptor 34**
- Circuito 3 (2K): LED → Fitas Escritório

#### LAVABO
**Interruptor 33**
- Circuito 5 (2i): Tensoflex LED → Iluminação Lavabo

#### HALL
**Interruptor 35**
- Circuito 16 (1U): LED → Cortineiro Living

#### LADO DO SOFÁ (Living)
**Interruptor 30**
- Circuito 16 (1U): LED → Cortineiro Living
- Circuito 20 (1R): LED → Iluminação Buffet

#### COZINHA
**Interruptor 29**
- Circuito 12 (1X): LED → Bancada Cozinha
- Circuito 16 (1U): LED → Cortineiro Living

#### CHURRASQUEIRA
**Interruptor 26**
- Circuito 16 (1U): LED → Cortineiro Living

#### BAR
**Interruptor 22**
- Circuito 16 (1U): LED → Cortineiro Living
- Circuito 20 (1R): LED → Iluminação Buffet

---

### 220V

#### LAVANDERIA
**Interruptor 27**
- Circuito 8 (2C): Embutido Picco → Iluminação Lavanderia

**Interruptor 25**
- Circuito 8 (2C): Embutido Picco → Iluminação Lavanderia

#### CIRCULAÇÃO DE SERVIÇO
**Interruptor 23**
- Circuito 10 (2H): Embutido Picco → Iluminação Hall de Serviço

#### BANHEIRO DE SERVIÇO
**Interruptor 24**
- Circuito 11 (2Z): Embutido Picco → Iluminação Banho Serviço

#### ESCRITÓRIO
**Interruptor 34**
- Circuito 1 (2L): Embutido Picco → Iluminação Escritório
- Circuito 2 (2M): Pendente → Pendente Escritório

#### HALL
**Interruptor 35**
- Circuito 17 (1Q): Embutido Picco → Iluminação Living
- Circuito 18 (1O): Extra → (vazio)
- Circuito 19 (1P): Embutido Picco → Iluminação TV
- Circuito 21 (1N): Embutido Picco → Iluminação Hall Principal
- Circuito 22 (1C): Balizador Embutido → Iluminação Degraus

#### LADO DO SOFÁ (Living)
**Interruptor 30**
- Circuito 17 (1Q): Embutido Picco → Iluminação Living
- Circuito 18 (1O): Extra → (vazio)
- Circuito 19 (1P): Embutido Picco → Iluminação TV
- Circuito 21 (1N): Embutido Picco → Iluminação Hall Principal

#### COZINHA
**Interruptor 29**
- Circuito 13 (1V): Embutido Picco → Ilha Cozinha
- Circuito 14 (1W): Embutido Picco → Iluminação Cozinha
- Circuito 15 (1T): Embutido + Pendente → Iluminação Jantar

#### CHURRASQUEIRA
**Interruptor 26**
- Circuito 13 (1V): Embutido Picco → Ilha Cozinha
- Circuito 14 (1W): Embutido Picco → Iluminação Cozinha
- Circuito 15 (1T): Embutido + Pendente → Iluminação Jantar
- Circuito 17 (1Q): Embutido Picco → Iluminação Living
- Circuito 50 (1): Incandescente → Iluminação Churrasqueira

#### BAR
**Interruptor 22**
- Circuito 13 (1V): Embutido Picco → Ilha Cozinha
- Circuito 14 (1W): Embutido Picco → Iluminação Cozinha
- Circuito 15 (1T): Embutido + Pendente → Iluminação Jantar
- Circuito 17 (1Q): Embutido Picco → Iluminação Living

---

## 🔌 Análise de Hardware Necessário

### Total de Interruptores Físicos (Caixinhas na Parede)
**14 interruptores** únicos: 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35

---

### ENTRADAS (GPIOs de Entrada) = Teclas/Circuitos Lum Únicos
**22 entradas** (circuitos luminotécnicos únicos):
- **Circ 1** (Int 34) → 2L
- **Circ 2** (Int 34) → 2M
- **Circ 3** (Int 34) → 2K
- **Circ 4** (Int 32) → 2A
- **Circ 5** (Int 33) → 2i
- **Circ 7** (Int 31) → 2B
- **Circ 8** (Int 27, 25) → 2C [compartilhado entre 2 interruptores]
- **Circ 9** (Int 27, 25) → 2D [compartilhado entre 2 interruptores]
- **Circ 9** (Int 21) → 2F [entrada diferente, mesmo número]
- **Circ 10** (Int 21) → 2G
- **Circ 10** (Int 23) → 2H [entrada diferente, mesmo número]
- **Circ 11** (Int 24) → 2Z
- **Circ 12** (Int 29) → 1X
- **Circ 13** (Int 29, 26, 22) → 1V [compartilhado entre 3 interruptores]
- **Circ 14** (Int 29, 26, 22) → 1W [compartilhado entre 3 interruptores]
- **Circ 15** (Int 29, 26, 22) → 1T [compartilhado entre 3 interruptores]
- **Circ 16** (Int 35, 30, 29, 26, 22) → 1U [compartilhado entre 5 interruptores!]
- **Circ 17** (Int 35, 30, 26, 22) → 1Q [compartilhado entre 4 interruptores]
- **Circ 18** (Int 35, 30) → 1O [compartilhado entre 2 interruptores]
- **Circ 19** (Int 35, 30) → 1P [compartilhado entre 2 interruptores]
- **Circ 20** (Int 30, 22) → 1R [compartilhado entre 2 interruptores]
- **Circ 21** (Int 35, 30) → 1N [compartilhado entre 2 interruptores]
- **Circ 22** (Int 35) → 1C
- **Circ 50** (Int 26) → 1

**Total real de GPIOs de entrada necessários**: **~24 entradas** (considerando números repetidos com saídas diferentes)

---

### SAÍDAS (Relés/GPIOs de Saída) = Circuitos Belm Únicos
**24 saídas** (circuitos Belmam únicos):

#### Circuitos 220V (Relés On/Off)
1. **1** (Churrasqueira Incandescente)
2. **1C** (Balizadores Degraus)
3. **1N** (Hall Principal Picco)
4. **1O** (Extra - vazio)
5. **1P** (TV Picco)
6. **1Q** (Living Picco)
7. **1T** (Jantar Picco + Pendente)
8. **1V** (Ilha Cozinha Picco)
9. **1W** (Geral Cozinha Picco)
10. **2H** (Hall Serviço Picco)
11. **2L** (Escritório Picco)
12. **2M** (Pendente Escritório)
13. **2Z** (Banho Serviço Picco)

**Subtotal 220V**: 13 relés

#### Circuitos LED 24V (Shelly RGBW2 - Dimerização)
14. **1R** (Buffet LED)
15. **1U** (Cortineiro Living LED) - **MAIS USADO! 5 interruptores**
16. **1X** (Bancada Cozinha LED)
17. **2A** (Garagem LED)
18. **2B** (Despensa LED)
19. **2C** (Lavanderia LED)
20. **2D** (Bancada Lavanderia LED)
21. **2F** (Sauna Superior LED)
22. **2G** (Sauna Inferior LED)
23. **2K** (Fitas Escritório LED)
24. **2i** (Lavabo Tensoflex LED)

**Subtotal LED 24V**: 11 circuitos (dimerização via Shelly RGBW2)

---

### MCP23017 (Expansores I2C) - Quantidade Necessária

#### Entradas (Pulsadores)
- **24 entradas** necessárias
- **2 chips MCP23017** (16 GPIO cada = 32 total)
  - Chip 1 (0x20): 16 entradas
  - Chip 2 (0x21): 8 entradas (sobram 8 GPIO)

#### Saídas (Relés)
- **24 saídas** necessárias
- **2 chips MCP23017** (16 GPIO cada = 32 total)
  - Chip 3 (0x22): 16 saídas (relés 220V)
  - Chip 4 (0x23): 8 saídas (triggers Shelly ou relés extras)

**Total de chips MCP23017**: **4 chips**

---

### Shelly RGBW2 (LEDs 24V)
- **Quantidade**: 3 unidades (modo 4x White independente)
  - Shelly 1: 4 circuitos LED
  - Shelly 2: 4 circuitos LED
  - Shelly 3: 3 circuitos LED
- **Total controlado**: 11 circuitos LED 24V

**Alternativa**: Usar relés para triggerar os Shellys, ou controle direto PWM se possível

---

### Fontes de Alimentação
- **Fonte 24V**: Múltiplas fontes para LEDs (distribuição de carga)
- **Fonte 5V**: Para ESP32 e MCP23017
- **Fonte 10A centralizada**: Para o painel completo

---

## 📝 Observações Importantes

### Circuitos Compartilhados (Mesma Entrada, Múltiplos Interruptores)

Estes circuitos têm **fios em paralelo** - mesma entrada GPIO controla de vários locais:

- **Circ 8 (→2C)**: Int 27 + 25 (Lavanderia)
- **Circ 9 (→2D)**: Int 27 + 25 (Bancada Lavanderia)
- **Circ 13 (→1V)**: Int 29 + 26 + 22 (Ilha Cozinha)
- **Circ 14 (→1W)**: Int 29 + 26 + 22 (Geral Cozinha)
- **Circ 15 (→1T)**: Int 29 + 26 + 22 (Mesa Jantar)
- **Circ 16 (→1U)**: Int 35 + 30 + 29 + 26 + 22 (Cortineiro Living) ⭐ **MAIS COMPARTILHADO**
- **Circ 17 (→1Q)**: Int 35 + 30 + 26 + 22 (Living)
- **Circ 18 (→1O)**: Int 35 + 30 (Extra)
- **Circ 19 (→1P)**: Int 35 + 30 (TV)
- **Circ 20 (→1R)**: Int 30 + 22 (Buffet)
- **Circ 21 (→1N)**: Int 35 + 30 (Hall Principal)

**Implementação ESPHome**: 
- Uma única entrada GPIO por circuito
- Múltiplos pulsadores em paralelo fisicamente
- Lógica de múltiplos cliques se necessário

---

### Interruptores com Múltiplas Teclas

Alguns interruptores têm MUITAS teclas (complexidade de lógica):

- **Int 35 (Hall)**: 6 teclas/circuitos
- **Int 30 (Lado Sofá)**: 6 teclas/circuitos
- **Int 34 (Escritório)**: 3 teclas/circuitos
- **Int 29 (Cozinha)**: 5 teclas/circuitos
- **Int 26 (Churrasqueira)**: 6 teclas/circuitos
- **Int 27 (Lavanderia)**: 3 teclas/circuitos
- **Int 25 (Lavanderia)**: 3 teclas/circuitos
- **Int 22 (Bar)**: 6 teclas/circuitos
- **Int 21 (Circulação)**: 2 teclas/circuitos

**Solução**: 
- Pulsadores de 4-6 teclas (Schneider, Siemens, Legrand)
- Lógica de múltiplos cliques para economizar teclas se necessário
- Identificação clara das funções (gravar/imprimir ao lado)

---

## 🔗 Referências
- Excel original: `CCG - ENFIAÇÃO AUTOMAÇÃO FALADA.xlsx`
- Config ESPHome: `Firmware/ESP32-Paineis/terreo-principal/`
- PROJECT-CONTEXT.md: Decisões técnicas

---

**Última atualização**: 02/12/2025

