# Alteração 04 - Atualização Circuitos Térreo Principal

| Aspecto | Detalhe |
|---------|---------|
| Status | ✅ Finalizado |
| Origem | Alterações finais do projeto arquitetônico (Massimo) |
| Complexidade | 🟡 Média |
| Especificação | [spec-alteracao04.md](./spec-alteracao04.md) |

**Status possíveis:**
- 🟡 Em planejamento
- 🟢 Especificação criada → ver [spec-alteracao04.md](./spec-alteracao04.md)

---

## 1. Ideia Inicial

O projeto foi alterado ligeiramente pelo arquiteto. Temos uma planilha CSV atualizada (`archive/migrados/Projetos Massimo/INFERIOR_POWERQUERY_CERTO.csv`) com a disposição final de todos os circuitos e interruptores realmente instalados na obra.

Precisamos verificar e corrigir o documento `docs/arquitetura/circuitos/andar-terreo/terreo-principal.md` para refletir a realidade da instalação final.

---

## 2. Conversa de Planejamento

#### usuário: Projeto alterado - verificar CSV e corrigir documento de circuitos

O projeto foi alterado ligeiramente pelo arquiteto. Fizemos uma lista nova da disposição final de todos circuitos, interruptores, etc, que estão realmente na obra finalizada. Precisamos verificar a tabela `archive/migrados/Projetos Massimo/INFERIOR_POWERQUERY_CERTO.csv` e fazer as correções necessárias em `docs/arquitetura/circuitos/andar-terreo/terreo-principal.md`.

---

#### IA: Análise das diferenças entre CSV e documento atual

Analisei o CSV atualizado e identifiquei as seguintes **diferenças significativas** em relação ao documento atual:

### Mudanças Identificadas

**1. Interruptor 32 (Garagem):**
- ❌ **Documento atual**: Int 31 tem circuito 7 (2B) Despensa
- ✅ **CSV atualizado**: Int 32 tem circuito 7 (2B) Despensa
- **Impacto**: Int 32 controla TANTO a garagem quanto a despensa

**2. Interruptor 30 (Lado do Sofá) - Circuito 20:**
- ❌ **Documento atual**: Circuito 20 (1R) → "LED 24V" - Iluminação Buffet (24W)
- ✅ **CSV atualizado**: Circuito 20 (1R) → "EXTRA" (sem especificação de tipo/potência)
- **Impacto**: Mudança no tipo de carga, análise de dimensionamento necessária

**3. Circuito 15 (Mesa de Jantar):**
- ❌ **Documento atual**: Circ Belm = "1T"
- ✅ **CSV atualizado**: Circ Belm = "1T/1S" (nos Int 29 e 26, mas apenas "1T" no Int 22)
- **Impacto**: Possível circuito duplo para mesa de jantar

**4. Ambiente Churrasqueira → Pia:**
- ❌ **Documento atual**: Interruptor 26 está no ambiente "CHURRASQUEIRA"
- ✅ **CSV atualizado**: Interruptor 26 está no ambiente "PIA"
- **Impacto**: Mudança de localização física, rótulos e documentação

**5. Novo Circuito no Bar (Interruptor 22):**
- ❌ **Documento atual**: Não existe circuito 20 no Bar
- ✅ **CSV atualizado**: Circuito 20 → "DESCOBRIR COM JOEL" - Fitas Bar LED 24V
- **Impacto**: Novo circuito LED 24V não dimensionado, potência desconhecida

### Resumo Quantitativo

| Tipo de Mudança | Quantidade |
|-----------------|:----------:|
| Alteração de interruptor | 2 |
| Alteração de tipo de carga | 1 |
| Mudança de ambiente | 1 |
| Novos circuitos | 1 |
| Alteração de identificador (1T → 1T/1S) | 2 |

---

### Perguntas para o Usuário

Antes de propor as correções, preciso esclarecer alguns pontos:

**1. Circuito 20 (1R) - Lado do Sofá:**
   - No documento atual está como "LED 24V - Iluminação Buffet (24W)"
   - Agora está como "EXTRA" (sem especificação)
   - **Pergunta**: O circuito 1R foi realmente descartado, e vai ficar como reserva?

**2. Circuito 15 (1T/1S) - Mesa de Jantar:**
   - Alguns interruptores mostram "1T/1S" e outros apenas "1T"
   - **Pergunta**: O circuito 1S existe como circuito separado ou é apenas uma notação indicando dois circuitos no mesmo local (1T + 1S)? Precisamos de dois relés separados?

R: Deixe em todos lugares como "1T / 1S". Será escolhido UM OU OUTRO na hora de instalar, pois um desses circuitos ficou preso em cima do gesso

**3. Circuito 20 (Bar) - "DESCOBRIR COM JOEL":**
   - Novo circuito LED 24V sem especificação de potência
   - **Pergunta**: Vocês tem informações sobre a potência desse circuito? Qual o comprimento estimado da fita LED?

R: 80w led 24V

**4. Análise de Hardware:**
   - Com o novo circuito do Bar, pode ser necessário reavaliar:
     - Quantidade de GPIOs necessários (entradas/saídas)
     - Quantidade de Shellys RGBW2
     - Dimensionamento da fonte 24V
   - **Pergunta**: Devo incluir essa reanálise na especificação técnica?
R: conforme resposta 3, vamos recalcular

---

#### usuário: Respostas às perguntas

R: Respondido cada item abaixo da pergunta

---

#### IA: Mapeamento completo das alterações necessárias

Obrigado pelas respostas! Agora tenho todas as informações necessárias. Vou mapear todas as alterações que precisam ser feitas no documento.

### Alterações Confirmadas

**1. Interruptor 32 (Garagem) - ADICIONAR linha:**
   - Adicionar: Int 32, Circ 7 (2B) → Despensa
   - Int 32 agora controla garagem E despensa

**2. Interruptor 30 (Lado do Sofá) - MANTER como EXTRA:**
   - Circuito 20 (1R) permanece, mas mudar de "LED 24V - Iluminação Buffet (24W)" para "EXTRA" (reserva)
   - Remover da contagem de potência LED 24V

**3. Circuito 15 - ATUALIZAR notação:**
   - Mudar "1T" para "1T / 1S" em TODOS os interruptores (29, 26, 22)
   - Adicionar nota explicativa: "Um dos dois circuitos ficará ativo (outro preso no gesso)"

**4. Ambiente "Churrasqueira" → "Pia":**
   - Renomear todas as referências do Int 26 de "CHURRASQUEIRA" para "PIA"

**5. Novo Circuito Bar (Int 22, Circ 20):**
   - Adicionar: Circuito 20 → "DESCOBRIR COM JOEL" - Iluminação Bar LED 24V - **80W**
   - Identificador do circuito Belmam: precisa ser definido (não está no CSV)

### Recálculo de Hardware

#### LED 24V - Novo Total de Potência

| # | Circ Belm | Local | Potência Anterior | Potência Nova | Diferença |
|---|:---------:|-------|:-----------------:|:-------------:|:---------:|
| 14 | **1R** | Buffet LED | ~~24 W~~ | **0 W** (EXTRA) | -24 W |
| - | **[novo]** | Bar LED | - | **80 W** | +80 W |
| | | **TOTAL ANTERIOR** | **1.552 W** (~65 A) | | |
| | | **TOTAL NOVO** | | **1.608 W** (~67 A) | **+56 W** |

**Novo total**: 1.608 W / 24V = **67 A**

#### Impacto nos Componentes

**Shelly RGBW2:**
- Anteriormente: 11 circuitos LED 24V
- Agora: 11 circuitos LED 24V (mantém - o 1R vira extra, mas o Bar entra)
- **Conclusão**: Mantém 3 unidades Shelly RGBW2

**GPIOs (Entradas):**
- Anteriormente: 24 entradas
- Novo circuito Bar (Int 22, Circ 20): +1 entrada
- **Total novo**: 25 entradas
- **MCP23017 necessário**: 2 chips (32 GPIO total, usando 25)

**GPIOs (Saídas):**
- Anteriormente: 24 saídas
- Novo circuito Bar LED: +1 saída
- **Total novo**: 25 saídas
- **MCP23017 necessário**: 2 chips (32 GPIO total, usando 25)

**Total de chips MCP23017**: Mantém **4 chips** (2 para entrada, 2 para saída)

#### Fontes 24V - Redistribuição

| Fonte | Capacidade | Circuitos Sugeridos | Potência Total |
|-------|:----------:|---------------------|:--------------:|
| Fonte 1 | 24V 20A (480W) | 1U (304W) - Cortineiro | 304 W ✅ |
| Fonte 2 | 24V 15A (360W) | 2i (280W) - Lavabo | 280 W ✅ |
| Fonte 3 | 24V 20A (480W) | 2A (228W) + 2B (210W) | 438 W ✅ |
| Fonte 4 | 24V 15A (360W) | 2G (235W) + 2K (124W) | 359 W ✅ |
| Fonte 5 | 24V 10A (240W) | Bar (80W) + 1X (41W) + 2C (22W) + 2D (42W) + 2F (42W) | 227 W ✅ |

**Total**: 1.608 W distribuído em 5 fontes

---

### Próxima Etapa

Agora preciso de mais uma informação:

**Circuito Belmam do Bar (Circ 20):**
- O CSV mostra "DESCOBRIR COM JOEL" no campo do circuito Belmam
- **Pergunta**: Qual será o identificador desse circuito? Sugestões:
  - Manter "DESCOBRIR COM JOEL" como placeholder
  - Usar "1Y" (próximo na sequência após 1X)
  - Outro identificador específico?

Após definir isso, posso criar a estrutura de mudanças proposta para aprovação.

---

#### usuário: Definição do identificador do circuito Bar

R: manter 'descobrir com joel'

---

#### IA: Proposta completa de alterações no documento

Perfeito! Agora tenho todas as informações. Vou detalhar TODAS as mudanças necessárias no documento.

---

## 3. Mudanças Propostas

### 3.1 Fluxo da Alteração

**Situação Atual:**
- Documento [terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) baseado em planilha anterior
- Contém inconsistências com a instalação real da obra
- Faltam circuitos novos e contém informações desatualizadas

**Proposta:**
- Atualizar documento completo baseado no CSV `INFERIOR_POWERQUERY_CERTO.csv`
- Corrigir todas as tabelas e seções hierárquicas
- Recalcular análise de hardware e fontes de alimentação
- Adicionar notas explicativas para circuitos especiais

**Fluxo da Atualização:**
1. Substituir tabela completa de circuitos (seção 📊)
2. Atualizar estrutura hierárquica LED 24V (seção 📋)
3. Atualizar estrutura hierárquica 220V (seção 📋)
4. Recalcular análise de hardware (seção 🔌)
5. Atualizar tabela de fontes 24V
6. Adicionar notas sobre circuitos especiais (1T/1S, EXTRA, etc)

---

### 3.2 Mudanças Detalhadas por Seção

#### A) Tabela Completa de Circuitos (Linha por linha)

**ADICIONAR:**
- Linha 3: Garagem, Int 32, Circ 7 (2B) → Despensa (duplicata do Int 31)

**MODIFICAR:**
- Linha 29: "Lado do Sofá" → Circuito 20 (1R) → Mudar "LED 24V" para "EXTRA" e remover "24 W"
- Linhas 34, 38, 43: Circuito 15 → Mudar "1T" para "1T / 1S"
- Linhas 36-40: Ambiente "CHURRASQUEIRA" → "PIA" (Int 26)
- Linha 46: **NOVA** - Bar, Int 22, Circ 20 → "DESCOBRIR COM JOEL" - Fitas Bar LED 24V - 80W

**Total de linhas:** 47 (era 46)

---

#### B) Estrutura Hierárquica LED 24V

**GARAGEM (adicionar):**
```markdown
**Interruptor 32**
- Circuito 7 (2B): LED + Spot → Iluminação Despensa — **210 W** (8,8 A) [compartilhado com Int 31]
```

**LADO DO SOFÁ (modificar):**
```markdown
**Interruptor 30**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
- Circuito 20 (1R): EXTRA (reserva)
```

**PIA (renomear de "CHURRASQUEIRA"):**
```markdown
**Interruptor 26**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
```

**BAR (adicionar):**
```markdown
**Interruptor 22**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
- Circuito 20 (DESCOBRIR COM JOEL): LED → Iluminação Bar — **80 W** (3,3 A)
```

**Totais atualizados:**
- **Quantidade de circuitos LED 24V**: 11 (mantém)
- **Potência total**: 1.608 W
- **Corrente total**: ~67 A

---

#### C) Estrutura Hierárquica 220V

**PIA (renomear de "CHURRASQUEIRA"):**
```markdown
**Interruptor 26**
- Circuito 13 (1V): Embutido Picco → Ilha Cozinha
- Circuito 14 (1W): Embutido Picco → Iluminação Cozinha
- Circuito 15 (1T / 1S): Embutido + Pendente → Iluminação Jantar
- Circuito 17 (1Q): Embutido Picco → Iluminação Living
- Circuito 50 (1): Incandescente → Iluminação Churrasqueira
```

**COZINHA e BAR (atualizar notação):**
- Todas as referências a Circuito 15 → Mudar para "1T / 1S"

---

#### D) Análise de Hardware - Entradas/Saídas

**ENTRADAS (GPIOs de Entrada):**
- **Total anterior**: 24 entradas
- **Novo (Bar Circ 20)**: +1 entrada
- **TOTAL NOVO**: **25 entradas**
- **MCP23017 necessário**: 2 chips (usando 25 de 32 GPIO)

**SAÍDAS (Relés/GPIOs de Saída):**
- **Circuitos 220V**: 13 relés (mantém)
- **Circuitos LED 24V**: 11 saídas (mantém - troca 1R por Bar)
- **TOTAL NOVO**: **24 saídas** (mantém)
- **MCP23017 necessário**: 2 chips

**Total de chips MCP23017**: **4 chips** (mantém)

---

#### E) Tabela de Circuitos LED 24V (Shelly RGBW2)

**MODIFICAR:**
```markdown
| 14 | **1R** | Buffet LED | - | - | EXTRA (reserva) |
```

**ADICIONAR:**
```markdown
| 25 | **DESCOBRIR COM JOEL** | Bar LED | 80 W | 3,3 A | 2,5mm² |
```

**Totais:**
```markdown
| | | **TOTAL** | **1.608 W** | **~67 A** | |
```

---

#### F) Fontes de Alimentação 24V

**MODIFICAR tabela completa:**

```markdown
| Fonte | Capacidade | Circuitos Sugeridos | Potência |
|-------|:----------:|---------------------|:--------:|
| Fonte 1 | 24V 20A (480W) | 1U (304W) - Cortineiro | 304 W ✅ |
| Fonte 2 | 24V 15A (360W) | 2i (280W) - Lavabo | 280 W ✅ |
| Fonte 3 | 24V 20A (480W) | 2A (228W) + 2B (210W) - Garagem + Despensa | 438 W ✅ |
| Fonte 4 | 24V 15A (360W) | 2G (235W) + 2K (124W) - Sauna + Escritório | 359 W ✅ |
| Fonte 5 | 24V 10A (240W) | Bar (80W) + 1X (41W) + 2C (22W) + 2D (42W) + 2F (42W) | 227 W ✅ |

**Potência Total LED 24V**: ~1.608 W | ~67 A
```

---

#### G) Observações Importantes - ADICIONAR

**Nova nota sobre Circuito 1T / 1S:**
```markdown
### Circuito Especial: Mesa de Jantar (1T / 1S)

O circuito 15 possui dois identificadores Belmam alternativos (1T / 1S):
- **Motivo**: Um dos circuitos ficou preso acima do gesso durante a obra
- **Implementação**: Apenas UM dos dois será conectado na instalação final
- **Documentação**: Ambos os identificadores aparecem para referência
- **Interruptores afetados**: 29 (Cozinha), 26 (Pia), 22 (Bar)
```

**Nova nota sobre Circuito 1R (EXTRA):**
```markdown
### Circuito Reserva: 1R (Lado do Sofá)

O circuito 20 (1R) no interruptor 30 ficou como **EXTRA** (reserva):
- Originalmente planejado para "Iluminação Buffet LED 24V"
- Mantém GPIO disponível para uso futuro
- Não consome potência da fonte 24V
```

**Nova nota sobre Circuito Bar (DESCOBRIR COM JOEL):**
```markdown
### Circuito Pendente: Bar (DESCOBRIR COM JOEL)

O circuito 20 no interruptor 22 (Bar) aguarda definição:
- **Identificador Belmam**: "DESCOBRIR COM JOEL" (placeholder)
- **Especificação confirmada**: LED 24V, 80W
- **Sugestão**: Definir identificador após instalação (ex: "1Y")
```

---

### 3.3 Interruptores Afetados - Resumo

| Interruptor | Ambiente | Mudanças |
|:-----------:|----------|----------|
| **32** | Garagem | ➕ Adicionado controle da Despensa (Circ 7 → 2B) |
| **30** | Lado do Sofá | 🔄 Circ 20 (1R) mudou de LED 24V → EXTRA |
| **29** | Cozinha | 🔄 Circ 15 mudou de "1T" → "1T / 1S" |
| **26** | Pia (ex-Churrasqueira) | 🏷️ Renomeado ambiente + Circ 15 → "1T / 1S" |
| **22** | Bar | ➕ Novo Circ 20 (DESCOBRIR COM JOEL) - 80W LED 24V |

---

**Status:** 🟡 Aguardando aprovação das mudanças

Posso criar a especificação técnica com essas alterações?

---

#### usuário: Aprovação para criar especificação

sim, prossiga

---

#### IA: Especificação criada

Especificação técnica criada com sucesso em [spec-alteracao04.md](./spec-alteracao04.md).

O documento contém:
- ✅ Checklist completo de 18 itens
- ✅ Detalhamento de todas as mudanças por seção
- ✅ Novos totais calculados (1.608W, 67A)
- ✅ Redistribuição de fontes 24V
- ✅ Seção de circuitos especiais (1T/1S, EXTRA, Bar)
- ✅ Resumo de interruptores afetados

O Executor pode iniciar a implementação.

---

## 4. Decisões Importantes

- **Circuito 1R (Buffet)**: Mudou de LED 24V (24W) para EXTRA (reserva)
- **Circuito Bar**: Mantido identificador "DESCOBRIR COM JOEL" como placeholder (80W LED 24V)
- **Circuito 15 (Mesa Jantar)**: Notação dupla "1T / 1S" - apenas um será conectado
- **Ambiente Int 26**: Renomeado de "Churrasqueira" para "Pia"
- **Interruptor 32**: Agora controla tanto Garagem quanto Despensa (Circ 7 compartilhado)
- **Hardware**: Mantém 4 chips MCP23017 e 3 Shellys RGBW2
- **Fontes**: Redistribuição em 5 fontes 24V totalizando 1.608W