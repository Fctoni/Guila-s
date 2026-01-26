# Especificação: Alteração 04 - Atualização Circuitos Térreo Principal

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Concluído |
| Conversa | [alteracao04.md](./alteracao04.md) |
| Data criação | 2026-01-25 |
| Complexidade | 🟡 Média |

**Status possíveis:**
- 🔵 Pronto para executar
- 🟠 Em execução
- 🟢 Concluído
- ❌ Cancelado

---

## 1. Resumo

Atualizar a documentação de circuitos elétricos do térreo principal ([terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md)) para refletir as alterações finais do projeto arquitetônico, conforme planilha CSV `INFERIOR_POWERQUERY_CERTO.csv`. Inclui correções de interruptores, adição de novo circuito LED no Bar, renomeação de ambientes e recálculo completo de hardware.

---

## 2. O que será feito

### Alterações na Tabela Principal
- [ ] Adicionar linha: Garagem Int 32 → Circ 7 (2B) Despensa
- [ ] Modificar linha 29: Lado do Sofá → Circ 20 (1R) de "LED 24V 24W" para "EXTRA"
- [ ] Modificar linhas 34, 38, 43: Circ 15 de "1T" para "1T / 1S"
- [ ] Modificar linhas 36-40: Renomear ambiente "CHURRASQUEIRA" → "PIA" (Int 26)
- [ ] Adicionar linha 46: Bar Int 22 → Circ 20 "DESCOBRIR COM JOEL" LED 24V 80W

### Estrutura Hierárquica LED 24V
- [ ] Adicionar seção Garagem Int 32 (compartilha Circ 7 com Int 31)
- [ ] Modificar Lado do Sofá Int 30 → Circ 20 (1R) para EXTRA
- [ ] Renomear "CHURRASQUEIRA" → "PIA" (Int 26)
- [ ] Adicionar seção Bar Int 22 → Circ 20 (80W)
- [ ] Atualizar totais: 1.608 W, ~67 A

### Estrutura Hierárquica 220V
- [ ] Renomear "CHURRASQUEIRA" → "PIA" (Int 26)
- [ ] Atualizar Circ 15 de "1T" para "1T / 1S" em todas as seções

### Análise de Hardware
- [ ] Atualizar entradas: 24 → 25 GPIOs
- [ ] Manter saídas: 24 GPIOs (troca 1R por Bar)
- [ ] Confirmar: 4 chips MCP23017 (mantém)
- [ ] Confirmar: 3 unidades Shelly RGBW2 (mantém)

### Tabela de Circuitos LED 24V
- [ ] Modificar linha 14: 1R de "24W" para "EXTRA (reserva)"
- [ ] Adicionar linha 25: DESCOBRIR COM JOEL - Bar LED 80W 3,3A
- [ ] Atualizar totais: 1.608 W, ~67 A

### Fontes de Alimentação 24V
- [ ] Redistribuir circuitos nas fontes
- [ ] Fonte 5: Adicionar Bar (80W) aos circuitos menores
- [ ] Atualizar potência total: 1.608 W distribuído em 5 fontes

### Observações Importantes
- [ ] Adicionar nota: Circuito Especial 1T / 1S (Mesa de Jantar)
- [ ] Adicionar nota: Circuito Reserva 1R (Lado do Sofá)
- [ ] Adicionar nota: Circuito Pendente Bar (DESCOBRIR COM JOEL)

---

## 3. Modificações Propostas

### 3.1 Fluxo da Alteração

**Situação Atual:**
- Documento baseado em planilha anterior do projeto
- Contém inconsistências com instalação real da obra
- Faltam circuitos novos (Bar LED 80W)
- Ambiente "Churrasqueira" incorreto (deveria ser "Pia")
- Circuito 1R mostra LED 24W mas é reserva
- Circuito 15 precisa mostrar notação dupla (1T / 1S)

**Proposta:**
- Atualizar documento completo baseado no CSV final da obra
- Adicionar novo circuito Bar LED 24V (80W)
- Renomear ambiente Churrasqueira → Pia (Int 26)
- Corrigir circuito 1R para EXTRA (reserva)
- Atualizar notação do circuito 15 para "1T / 1S"
- Recalcular análise de hardware e fontes
- Adicionar notas explicativas sobre circuitos especiais

**Fluxo da Atualização:**
1. Abrir arquivo [terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md)
2. Atualizar tabela completa de circuitos (seção 📊)
3. Atualizar estrutura hierárquica LED 24V (seção 📋)
4. Atualizar estrutura hierárquica 220V (seção 📋)
5. Recalcular análise de hardware (seção 🔌)
6. Atualizar tabela de fontes 24V
7. Adicionar seção de observações sobre circuitos especiais
8. Verificar consistência de todas as referências

---

## 4. Detalhamento das Mudanças

### 4.1 Tabela Completa de Circuitos

**ADICIONAR linha 3:**
```markdown
| Garagem | 32 | 7 | 2B | Despensa | LED 24V + Spot | 210 W | Iluminação Despensa |
```

**MODIFICAR linha 29:**
```markdown
| Lado do Sofá | 30 | 20 | 1R | Abaixo Buffet | EXTRA | - | - |
```

**MODIFICAR linhas 34, 38, 43 (Circuito 15):**
```markdown
| Cozinha | 29 | 15 | 1T / 1S | Mesa Jantar | Embutido + Pendente | - | Iluminação Jantar |
| Pia | 26 | 15 | 1T / 1S | Mesa Jantar | Embutido + Pendente | - | Iluminação Jantar |
| Bar | 22 | 15 | 1T / 1S | Mesa Jantar | Embutido + Pendente | - | Iluminação Jantar |
```

**MODIFICAR linhas 36-40 (Renomear ambiente):**
- Todas as linhas do Int 26: "CHURRASQUEIRA" → "PIA"

**ADICIONAR linha 46:**
```markdown
| Bar | 22 | 20 | DESCOBRIR COM JOEL | Fitas Bar | LED 24V | 80 W | Iluminação Bar |
```

---

### 4.2 Estrutura Hierárquica LED 24V

**ADICIONAR seção GARAGEM:**
```markdown
#### GARAGEM
**Interruptor 32**
- Circuito 4 (2A): Fita LED → Iluminação Garagem — **228 W** (9,5 A)
- Circuito 7 (2B): LED + Spot → Iluminação Despensa — **210 W** (8,8 A) [compartilhado com Int 31]
```

**MODIFICAR seção LADO DO SOFÁ:**
```markdown
#### LADO DO SOFÁ (Living)
**Interruptor 30**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
- Circuito 20 (1R): EXTRA (reserva)
```

**RENOMEAR seção CHURRASQUEIRA → PIA:**
```markdown
#### PIA
**Interruptor 26**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
```

**MODIFICAR seção BAR:**
```markdown
#### BAR
**Interruptor 22**
- Circuito 16 (1U): LED → Cortineiro Living — **304 W** (12,7 A)
- Circuito 20 (DESCOBRIR COM JOEL): LED → Iluminação Bar — **80 W** (3,3 A)
```

**Atualizar totais no final da seção LED 24V:**
- Remover: "| 14 | **1R** | Buffet LED | 24 W | 1,0 A | 2,5mm² |"
- Adicionar na tabela detalhada:
  - "| 14 | **1R** | Buffet LED | - | - | EXTRA (reserva) |"
  - "| 25 | **DESCOBRIR COM JOEL** | Bar LED | 80 W | 3,3 A | 2,5mm² |"
- Total: "| | | **TOTAL** | **1.608 W** | **~67 A** | |"

---

### 4.3 Estrutura Hierárquica 220V

**RENOMEAR seção CHURRASQUEIRA → PIA:**
```markdown
#### PIA
**Interruptor 26**
- Circuito 13 (1V): Embutido Picco → Ilha Cozinha
- Circuito 14 (1W): Embutido Picco → Iluminação Cozinha
- Circuito 15 (1T / 1S): Embutido + Pendente → Iluminação Jantar
- Circuito 17 (1Q): Embutido Picco → Iluminação Living
- Circuito 50 (1): Incandescente → Iluminação Churrasqueira
```

**MODIFICAR seções COZINHA e BAR:**
- Todas as referências ao Circuito 15: "1T" → "1T / 1S"

---

### 4.4 Análise de Hardware

**ENTRADAS (GPIOs):**
```markdown
**Total de GPIOs de entrada necessários**: **~25 entradas** (adicionado Bar Circ 20)
```

**SAÍDAS (GPIOs):**
- Manter 24 saídas (troca 1R inativo por Bar ativo)
- Atualizar linha 14 na tabela: "| 14 | **1R** | Buffet LED | - | - | EXTRA (reserva) |"
- Adicionar linha 25: "| 25 | **DESCOBRIR COM JOEL** | Bar LED | 80 W | 3,3 A | 2,5mm² |"

**MCP23017:**
```markdown
#### Entradas (Pulsadores)
- **25 entradas** necessárias
- **2 chips MCP23017** (16 GPIO cada = 32 total)
  - Chip 1 (0x20): 16 entradas
  - Chip 2 (0x21): 9 entradas (sobram 7 GPIO)

#### Saídas (Relés)
- **24 saídas** necessárias (mantém)
```

**Shelly RGBW2:**
```markdown
- **Quantidade**: 3 unidades (modo 4x White independente)
- **Total controlado**: 11 circuitos LED 24V (troca 1R por Bar)
```

---

### 4.5 Fontes de Alimentação 24V

**SUBSTITUIR tabela completa:**
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

### 4.6 Observações Importantes (Nova Seção)

**ADICIONAR ao final do documento, antes da seção "🔗 Referências":**

```markdown
---

## 📝 Circuitos Especiais

### Circuito Duplo: Mesa de Jantar (1T / 1S)

O circuito 15 possui dois identificadores Belmam alternativos:

- **Identificadores**: 1T / 1S
- **Motivo**: Um dos circuitos ficou preso acima do gesso durante a obra
- **Implementação**: Apenas UM dos dois será conectado na instalação final
- **Documentação**: Ambos os identificadores aparecem para referência
- **Interruptores afetados**: 29 (Cozinha), 26 (Pia), 22 (Bar)

**Implicação ESPHome**: Verificar qual circuito (1T ou 1S) foi efetivamente conectado antes de configurar o GPIO.

---

### Circuito Reserva: 1R (Lado do Sofá)

O circuito 20 (1R) no interruptor 30 ficou como **EXTRA** (reserva):

- **Status**: Não conectado
- **Planejamento original**: Iluminação Buffet LED 24V (24W)
- **Situação atual**: GPIO mantido para uso futuro
- **Impacto**: Não consome potência da fonte 24V

**Implementação ESPHome**: GPIO pode ser configurado como entrada extra ou reserva para expansão futura.

---

### Circuito Pendente: Bar (DESCOBRIR COM JOEL)

O circuito 20 no interruptor 22 (Bar) aguarda definição final:

- **Identificador Belmam**: "DESCOBRIR COM JOEL" (placeholder temporário)
- **Especificação confirmada**: LED 24V, 80W (~3,3 A)
- **Fio sugerido**: 2,5mm²
- **Fonte**: Fonte 5 (compartilhada com outros circuitos menores)
- **Sugestão**: Definir identificador definitivo após instalação (ex: "1Y")

**Implementação ESPHome**: Configurar como saída PWM para dimerização via Shelly RGBW2.

```

---

### 4.7 Resumo de Interruptores Afetados

**MANTER/VERIFICAR tabela existente no documento:**

Atualizar a seção "Interruptores com Múltiplas Teclas" para refletir as mudanças:

- **Int 32 (Garagem)**: Agora tem 2 teclas (Garagem + Despensa)
- **Int 30 (Lado Sofá)**: Circ 20 vira reserva (mas mantém 6 teclas físicas)
- **Int 26 (Pia)**: Renomear de "Churrasqueira" para "Pia"
- **Int 22 (Bar)**: Atualizar de 6 para 7 circuitos (adicionar Bar LED 80W)

---

## 5. Arquivos a Modificar

| Ação | Arquivo | Descrição |
|------|---------|-----------|
| MODIFICAR | [docs/arquitetura/circuitos/andar-terreo/terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) | Documento completo de circuitos do térreo |

**Arquivo de referência (não modificar):**
- [archive/migrados/Projetos Massimo/INFERIOR_POWERQUERY_CERTO.csv](../../archive/migrados/Projetos%20Massimo/INFERIOR_POWERQUERY_CERTO.csv)

---

## 6. Execução

*(preenchido pelo Executor)*

### 6.1 Progresso

- [x] Tabela completa de circuitos atualizada (seção 📊)
- [x] Estrutura hierárquica LED 24V atualizada
- [x] Estrutura hierárquica 220V atualizada
- [x] Análise de hardware recalculada
- [x] Tabela de circuitos LED 24V (Shelly) atualizada
- [x] Fontes 24V redistribuídas
- [x] Seção "Circuitos Especiais" adicionada
- [x] Todas as referências verificadas e consistentes
- [x] Documento revisado e validado

### 6.2 Notas de Implementação

**Data de execução**: 25/01/2026

**Decisões tomadas:**
1. Mantida a linha do Int 32 com Circ 7 (2B) que já estava no documento
2. Renomeadas todas as 6 ocorrências de "CHURRASQUEIRA" para "PIA" no Int 26
3. Atualizado circuito 15 para notação dupla "1T / 1S" em 3 locais (tabela principal) e 3 seções hierárquicas
4. Fonte 3 confirmada como 20A para suportar Garagem (228W) + Despensa (210W)
5. Redistribuição da Fonte 5 incluindo o novo circuito Bar (80W)

**Nenhum problema encontrado** - todas as mudanças aplicadas conforme especificação.

**Totais recalculados verificados:**
- Potência total LED 24V: 1.608W (anterior: 1.552W)
- Corrente total: ~67A (anterior: ~65A)
- Diferença: +56W devido à troca do circuito 1R (24W) por Bar (80W)

### 6.3 Conversa de Execução

#### IA: Iniciando execução da alteração 04

Leitura da especificação concluída. Vou atualizar o documento `docs/arquitetura/circuitos/terreo-principal.md` conforme especificado.

**Ordem de execução:**
1. Tabela completa de circuitos (seção 📊)
2. Estrutura hierárquica LED 24V
3. Estrutura hierárquica 220V
4. Análise de hardware
5. Tabela de circuitos LED 24V (Shelly)
6. Fontes 24V
7. Seção "Circuitos Especiais"
8. Verificação final de consistência

Iniciando...

**Execução completada com sucesso:**

1. ✅ Tabela completa de circuitos atualizada
   - Linha do Int 30 Circ 20 (1R): LED 24V 24W → EXTRA
   - Circuito 15: 1T → 1T / 1S (3 ocorrências)
   - Ambiente Int 26: CHURRASQUEIRA → PIA (6 ocorrências)
   - Linha do Int 22 Circ 20: 1R → DESCOBRIR COM JOEL (80W)

2. ✅ Estrutura hierárquica LED 24V atualizada
   - GARAGEM: adicionado Circ 7 (2B) Despensa
   - LADO DO SOFÁ: Circ 20 (1R) → EXTRA (reserva)
   - PIA: renomeada de CHURRASQUEIRA
   - BAR: Circ 20 trocado de 1R para DESCOBRIR COM JOEL (80W)

3. ✅ Estrutura hierárquica 220V atualizada
   - PIA: renomeada de CHURRASQUEIRA
   - COZINHA, PIA, BAR: Circ 15 → 1T / 1S

4. ✅ Análise de hardware recalculada
   - ENTRADAS: 24 → 25 GPIOs
   - MCP23017: mantém 4 chips (ajustado distribuição)

5. ✅ Tabela de circuitos LED 24V (Shelly) atualizada
   - Linha 14 (1R): 24W → EXTRA (reserva)
   - Linha 25 (DESCOBRIR COM JOEL): adicionada - 80W
   - Totais: 1.552W → 1.608W, ~65A → ~67A

6. ✅ Fontes 24V redistribuídas
   - Fonte 3: ajustada para 20A (Garagem + Despensa)
   - Fonte 5: adicionado Bar (80W) + outros circuitos menores
   - Total: 1.608W distribuído em 5 fontes

7. ✅ Seção "Circuitos Especiais" adicionada
   - Circuito Duplo: 1T / 1S (Mesa de Jantar)
   - Circuito Reserva: 1R (Lado do Sofá)
   - Circuito Pendente: Bar (DESCOBRIR COM JOEL)

8. ✅ Última atualização: 17/01/2026 → 25/01/2026

**Validação final:**
- Todas as mudanças do CSV refletidas corretamente
- Totais recalculados: 1.608W, ~67A ✓
- Interruptores e ambientes renomeados consistentemente ✓
- Referências cruzadas verificadas ✓

**Status**: Alteração 04 concluída com sucesso.

---

#### usuário: Correção de caminho - nova estrutura de pastas

Estrutura de pastas alterada em `docs/arquitetura`:
- Antigo: `docs/arquitetura/circuitos/terreo-principal.md`
- Novo: `docs/arquitetura/circuitos/andar-terreo/terreo-principal.md`

---

#### IA: Referências atualizadas

Atualizadas todas as referências nos arquivos de documentação:

**spec-alteracao04.md:**
- Seção 1 (Resumo): caminho do link atualizado ✓
- Seção 3.1 (Fluxo): caminho do link atualizado ✓
- Seção 5 (Arquivos a Modificar): caminho atualizado ✓

**alteracao04.md:**
- 3 ocorrências atualizadas (texto plano + link markdown) ✓

Nenhuma alteração necessária no documento principal (já estava no caminho correto após a movimentação).

---

#### usuário: Atualizar tabela-eletricista-terreo.md

Verificar e atualizar o arquivo `docs/arquitetura/circuitos/andar-terreo/tabela-eletricista-terreo.md` com as mesmas alterações aplicadas ao documento principal.

---

#### IA: Analisando alterações necessárias

Verificando `tabela-eletricista-terreo.md` para aplicar as mesmas alterações:

**Alterações identificadas:**

1. **Int 22 (Bar):**
   - Linha 16: Circ 15 → "1T" para "1T / 1S"
   - Linha 19: Circ 20 (1R) → trocar para "DESCOBRIR COM JOEL" com 80W

2. **Int 26:**
   - Linhas 29-34: Ambiente "Churrasqueira" → "Pia"
   - Linha 31: Circ 15 → "1T" para "1T / 1S"

3. **Int 29 (Cozinha):**
   - Linha 43: Circ 15 → "1T" para "1T / 1S"

4. **Int 30 (Lado do Sofá):**
   - Linha 50: Circ 20 (1R) → "EXTRA | - | -"

5. **Int 32 (Garagem):**
   - Adicionar linha: Circ 7 (2B) Despensa

6. **Resumo de Potências:**
   - Linha 81: 1R Buffet → marcar como EXTRA ou remover potência
   - Adicionar: DESCOBRIR COM JOEL - Bar - 80W
   - Linha 94: Total 1.552W → 1.608W, ~65A → ~67A

Aplicando alterações...

**Alterações aplicadas em tabela-eletricista-terreo.md:**

1. ✅ Int 22 Circ 15: 1T → 1T / 1S
2. ✅ Int 22 Circ 20: 1R (Buffet 24W) → DESCOBRIR COM JOEL (Bar 80W)
3. ✅ Int 26: CHURRASQUEIRA → PIA (6 ocorrências)
4. ✅ Int 26 Circ 15: 1T → 1T / 1S
5. ✅ Int 29 Circ 15: 1T → 1T / 1S
6. ✅ Int 30 Circ 20: LED 24V 24W → EXTRA
7. ✅ Int 32: adicionado Circ 7 (2B) Despensa
8. ✅ Total de circuitos: 45 → 46
9. ✅ Resumo potências: 1R marcado como EXTRA
10. ✅ Resumo potências: adicionado DESCOBRIR COM JOEL (Bar 80W)
11. ✅ Total potência: 1.552W → 1.608W, ~65A → ~67A

**Ambos os documentos agora estão sincronizados.**

---

#### usuário: Manter dois documentos?

Você acha que faz sentido manter os 2 documentos (terreo-principal.md) e (tabela-eletricista-terreo.md)?

Eles se complementam ou são redundantes?

---

#### IA: Análise - Documentos são complementares

**Recomendação: MANTER AMBOS** - são complementares, não redundantes.

### Diferenças de Propósito

**`terreo-principal.md` (Documento de Engenharia):**
- **Público-alvo**: Desenvolvedor ESPHome, engenheiro, arquiteto do sistema
- **Conteúdo exclusivo**:
  - Análise de hardware (MCP23017, GPIOs necessários)
  - Dimensionamento de fontes 24V (distribuição detalhada)
  - Quantidade de Shellys RGBW2
  - Estrutura hierárquica por TIPO (LED 24V vs 220V)
  - Circuitos compartilhados (lógica de implementação)
  - Notas sobre implementação ESPHome
  - Observações sobre circuitos especiais (1T/1S, reservas)
- **Uso**: Programação do firmware, planejamento de hardware, debug

**`tabela-eletricista-terreo.md` (Documento de Campo):**
- **Público-alvo**: Eletricista, instalador, técnico de obra
- **Conteúdo exclusivo**:
  - Tabela ordenada por INTERRUPTOR (ordem de instalação física)
  - Coluna "Cor" para marcar fios durante instalação
  - Coluna "Check" para validação em campo
  - Formato compacto, fácil de consultar com tablet/celular na obra
  - Resumo rápido de potências (para verificação de instalação)
- **Uso**: Passagem de fios, instalação física, conferência de obra

### Benefícios de Manter Separados

1. **Clareza**: Cada documento focado em um público específico
2. **Usabilidade**: Eletricista não precisa navegar por análise de hardware
3. **Manutenção**: Alterações em análise de hardware não afetam a referência do eletricista
4. **Validação cruzada**: Manter os dois em sincronia força checagem dupla

### Desvantagens

- **Duplicação parcial**: Tabela principal existe nos dois (mas ordenada diferente)
- **Risco de dessincronia**: Requer atualizar ambos quando houver mudanças

### Conclusão

**MANTER AMBOS**, pois servem públicos e momentos diferentes:
- `terreo-principal.md` = **"Como funciona o sistema"** (desenvolvimento)
- `tabela-eletricista-terreo.md` = **"Como instalar fisicamente"** (obra)

**Sugestão**: Adicionar nota de cross-reference no topo de cada documento alertando sobre o outro.

---

#### usuário:

---

## 7. Validação Final

- [x] Todas as mudanças do CSV refletidas no documento
- [x] Totais de potência recalculados corretamente (1.608W, 67A)
- [x] Interruptores e ambientes renomeados consistentemente
- [x] Referências cruzadas verificadas (interruptor ↔ circuito ↔ ambiente)
- [x] Notas explicativas sobre circuitos especiais adicionadas
- [x] Última atualização modificada para data atual
