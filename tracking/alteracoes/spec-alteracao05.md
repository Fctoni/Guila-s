# Especificação: Alteração 05 - Criação Documentação Circuitos Superior Principal

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Concluído |
| Conversa | [alteracao05.md](./alteracao05.md) |
| Data criação | 2026-01-25 |
| Complexidade | 🟡 Média |

**Status possíveis:**
- 🔵 Pronto para executar
- 🟠 Em execução
- 🟢 Concluído
- ❌ Cancelado

---

## ⚠️ PENDÊNCIAS

Este documento contém pendências que precisam ser resolvidas durante ou após a implementação:

| # | Pendência | Tipo | Prioridade |
|---|-----------|------|:----------:|
| 1 | Confirmar nome definitivo do circuito Frigobar (99Z) com arquiteto | Nomenclatura | 🟡 Média |
| 2 | Medir potências de todos os 13 circuitos LED 24V | Medição | 🔴 Alta |
| 3 | Verificar se circuito 40 (7W) Int 2 e Int 4 são mesmo circuito ou erro CSV | Verificação | 🟡 Média |
| 4 | Joel: Verificar PICCO acendendo 24V (Suíte 2, circ 31/6P) | Verificação | 🟡 Média |
| 5 | Joel: Verificar nome Pendente Master (circ 47/7T) | Nomenclatura | 🟢 Baixa |
| 6 | Dimensionar fontes 24V após obter potências reais | Cálculo | 🔴 Alta |

**Impacto**: O documento será criado com valores placeholders e marcações de pendência. Após resolução, atualizar seções específicas.

---

## 1. Resumo

Criar a documentação completa dos circuitos elétricos do pavimento superior (4 suítes + hall) baseada na planilha CSV final da obra (`SUPERIOR_POWERQUERY_CERTO.csv`). O documento seguirá o mesmo padrão do térreo ([terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md)) e incluirá pendências documentadas para resolução posterior.

---

## 2. O que será feito

### Criação do Arquivo
- [ ] Criar arquivo [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md)
- [ ] Adicionar cabeçalho e informações do projeto

### Seção 1: Tabela Completa de Circuitos
- [ ] Criar tabela com 59 linhas do CSV
- [ ] Colunas: Ambiente | Int | Circ Lum | Circ Belm | Acende Onde | Tipo | Potência | Nome Falado
- [ ] Marcar potências como PENDÊNCIA onde aplicável

### Seção 2: Estrutura Hierárquica LED 24V
- [ ] Organizar 13 circuitos LED 24V por ambiente
- [ ] Hall Superior: 99Z (Frigobar) - 80W ⚠️
- [ ] Suíte 1: 6B, 6G, 6E - ⚠️ PENDÊNCIA potências
- [ ] Suíte 2: 6Q, 6L, 6G, 6E - ⚠️ PENDÊNCIA potências
- [ ] Master: 7A1, 7R, 7L1/7Z, 7V, 7X - ⚠️ PENDÊNCIA potências

### Seção 3: Estrutura Hierárquica 220V
- [ ] Organizar circuitos 220V por ambiente
- [ ] Listar Embutidos Picco, Balizadores, Pendentes
- [ ] Marcar Indefinidas (Arandelas: 6C, 6D, 6M)

### Seção 4: Análise de Hardware
- [ ] Calcular total de interruptores físicos (16)
- [ ] Calcular GPIOs de entrada (~27-30)
- [ ] Calcular GPIOs de saída (~24-26)
- [ ] Estimar MCP23017 necessários (4 chips)
- [ ] Estimar Shelly RGBW2 (3-4 unidades)
- [ ] Marcar dimensionamento de fontes 24V como PENDÊNCIA

### Seção 5: Observações Importantes
- [ ] Adicionar nota sobre circuito 99Z (Frigobar - nome temporário)
- [ ] Adicionar nota sobre 7L1 / 7Z (Sanca Master - notação dupla)
- [ ] Adicionar nota sobre circuito 40/7W (verificar duplicação)
- [ ] Adicionar seção de verificações Joel pendentes
- [ ] Adicionar seção de medições necessárias

---

## 3. Modificações Propostas

### 3.1 Fluxo da Criação

**Situação Atual:**
- Documento do pavimento superior não existe
- Apenas CSV disponível com dados da instalação final
- Algumas informações incompletas (potências, nomes)

**Proposta:**
- Criar documento completo seguindo padrão do térreo
- Incluir seção de PENDÊNCIAS no início do documento
- Marcar campos com informações faltantes claramente
- Adicionar notas explicativas sobre circuitos especiais
- Permitir uso parcial enquanto pendências são resolvidas

**Fluxo de Criação:**
1. Criar estrutura base do documento
2. Preencher tabela completa de circuitos (59 linhas do CSV)
3. Organizar estrutura hierárquica por tipo (LED 24V / 220V)
4. Calcular análise de hardware (parcial - sem potências finais)
5. Adicionar seção de observações e circuitos especiais
6. Marcar todas as pendências claramente
7. Incluir referências para atualização futura

---

## 4. Estrutura Detalhada do Documento

### 4.1 Cabeçalho

```markdown
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
```

### 4.2 Tabela Completa de Circuitos

**Total**: 59 linhas (conforme CSV)

**Estrutura**:
```markdown
| Ambiente | Int | Circ Lum | Circ Belm | Acende Onde | Tipo Iluminação | Potência | Nome Falado |
|----------|-----|----------|-----------|-------------|-----------------|----------|-------------|
```

**Circuitos com pendências** (marcar na coluna Potência):
- 99Z (Frigobar): 80W ⚠️ (nome temporário)
- 6B, 6G, 6E, 6Q, 6L, 7A1, 7R, 7L1/7Z, 7V, 7X: ⚠️ MEDIR
- 7W (linha 57): ⚠️ VERIFICAR duplicação

**Observações especiais**:
- Linhas 3, 6, 8: Circuito 99Z (Frigobar) - repetido em 3 interruptores
- Linha 23, 26, 29: Circuito 31 - incluir nota "⚠️ Joel verificar PICCO 24V"
- Linha 41, 46: Circuito 47 - incluir nota "⚠️ Joel verificar nome"
- Linha 58: Circuito 41 - usar "7L1 / 7Z" (notação dupla)

### 4.3 Estrutura Hierárquica LED 24V

Organizar por ambiente:

```markdown
### LED 24V

#### HALL SUPERIOR
**Interruptor 13**
- Circuito 22 (1C): Balizador Embutido → Iluminação Degraus
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
- Circuito 41 (7L1 / 7Z): Fita LED → Sanca Master — **⚠️ PENDÊNCIA: medir**

---

**Totais LED 24V**:
- **Quantidade de circuitos**: 13 identificados
- **Potência total**: ⚠️ **PENDÊNCIA: aguardando medições**
- **Corrente total**: ⚠️ **PENDÊNCIA: aguardando medições**
```

### 4.4 Estrutura Hierárquica 220V

```markdown
### 220V

#### HALL SUPERIOR
**Interruptor 13**
- Circuito 22 (1C): Balizador Embutido → Iluminação Degraus
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
```

### 4.5 Análise de Hardware

```markdown
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
10. **7L1 / 7Z** - Sanca Master — ⚠️ MEDIR
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
```

### 4.6 Observações Importantes

```markdown
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

### Circuito Duplo: Sanca Master (7L1 / 7Z)

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

### Circuito Duplicado: Tensoflex Master (7W / 7X)

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
```

---

## 5. Arquivos a Criar

| Ação | Arquivo | Descrição |
|------|---------|-----------|
| CRIAR | [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md) | Documento completo de circuitos do pavimento superior |

**Arquivo de referência (não modificar):**
- [archive/migrados/Projetos Massimo/SUPERIOR_POWERQUERY_CERTO.csv](../../archive/migrados/Projetos%20Massimo/SUPERIOR_POWERQUERY_CERTO.csv)

---

## 6. Execução

*(preenchido pelo Executor)*

### 6.1 Progresso

- [x] Arquivo superior-principal.md criado
- [x] Seção de PENDÊNCIAS adicionada no topo
- [x] Tabela completa de circuitos (59 linhas) preenchida
- [x] Estrutura hierárquica LED 24V organizada
- [x] Estrutura hierárquica 220V organizada
- [x] Análise de hardware calculada (parcial)
- [x] Seção de Circuitos Especiais adicionada
- [x] Verificações Joel documentadas
- [x] Lista de medições necessárias incluída
- [x] Documento revisado e validado

### 6.2 Notas de Implementação

**Decisões tomadas:**
1. ✅ Criado documento completo com 59 linhas do CSV
2. ✅ Todas as pendências claramente marcadas com ⚠️
3. ✅ Circuito 99Z (Frigobar) documentado como temporário
4. ✅ Circuito 7L1/7Z documentado com notação dupla (similar ao térreo)
5. ✅ Circuito 40 (7W/7X) marcado para verificação de duplicação
6. ✅ Verificações Joel documentadas em seção específica
7. ✅ Lista completa de medições necessárias incluída
8. ✅ Análise de hardware com estimativas conservadoras
9. ✅ Dimensionamento de fontes 24V marcado como pendência crítica

**Problemas encontrados:** Nenhum

**Observações:**
- Documento utilizável mesmo com pendências documentadas
- Estrutura consistente com o padrão do térreo
- Todas as referências cruzadas verificadas (interruptor ↔ circuito ↔ ambiente)

### 6.3 Conversa de Execução

#### IA: Iniciando criação do documento superior-principal.md

Lido o CSV com 59 linhas de circuitos. Vou criar o documento completo com todas as seções conforme especificação:
1. Cabeçalho com PENDÊNCIAS no topo
2. Tabela completa (59 linhas)
3. Estrutura hierárquica LED 24V (13 circuitos)
4. Estrutura hierárquica 220V
5. Análise de hardware
6. Observações importantes e circuitos especiais

---

#### IA: Documento superior-principal.md criado com sucesso

✅ Arquivo criado: [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md)

**Conteúdo incluído:**
- ✅ Cabeçalho com seção PENDÊNCIAS ATIVAS no topo
- ✅ Tabela completa: 59 linhas do CSV
- ✅ Estrutura hierárquica LED 24V: 13 circuitos organizados por ambiente
- ✅ Estrutura hierárquica 220V: ~15-17 circuitos organizados por ambiente
- ✅ Análise de hardware: 16 interruptores, 4 MCP23017, 3-4 Shelly RGBW2
- ✅ Seção Circuitos Especiais: 99Z, 7L1/7Z, 7W/7X documentados
- ✅ Verificações Joel: circ 31 e 47 com notas específicas
- ✅ Medições necessárias: tabela com 13 circuitos LED 24V

**Pendências documentadas:**
- 🔴 Medir potências dos 13 circuitos LED 24V
- 🟡 Confirmar nome Frigobar (99Z) com arquiteto
- 🟡 Verificar duplicação circuito 40 (7W/7X)
- 🟡 Joel verificar PICCO 24V (circ 31)
- 🟢 Joel verificar nome Pendente (circ 47)

---

#### usuário:

---

## 7. Validação Final

- [x] Todas as 59 linhas do CSV refletidas no documento
- [x] Pendências claramente marcadas com ⚠️
- [x] Circuitos especiais documentados (99Z, 7L1/7Z, 7W/7X)
- [x] Verificações Joel listadas e marcadas
- [x] Lista de medições necessárias incluída
- [x] Análise de hardware parcial (com avisos sobre incompletude)
- [x] Referências cruzadas verificadas (interruptor ↔ circuito ↔ ambiente)
- [x] Última atualização registrada
- [x] Documento utilizável mesmo com pendências