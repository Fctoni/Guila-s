# Alteração 05 - Criação Documentação Circuitos Superior Principal

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Especificação criada → ver [spec-alteracao05.md](./spec-alteracao05.md) |
| Origem | Planilha final do projeto arquitetônico - Pavimento Superior |
| Complexidade | 🟡 Média |
| Especificação | *(será criada após aprovação da estrutura)* |

**Status possíveis:**
- 🟡 Em planejamento
- 🟢 Especificação criada → ver [spec-alteracao05.md](./spec-alteracao05.md)

---

## 1. Ideia Inicial

Criar a documentação completa dos circuitos elétricos do pavimento superior (suítes e hall) baseada na planilha CSV final da obra (`archive/migrados/Projetos Massimo/SUPERIOR_POWERQUERY_CERTO.csv`).

Este documento ainda não existe e precisa ser criado seguindo o mesmo padrão do documento do térreo ([terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md)).

---

## 2. Conversa de Planejamento

#### usuário: Criar documentação do andar superior baseada no CSV

Criar o arquivo `docs/arquitetura/circuitos/andar-superior/superior-principal.md` seguindo o mesmo modelo do térreo, mas com os dados do CSV `SUPERIOR_POWERQUERY_CERTO.csv`.

---

#### IA: Análise inicial do CSV e estrutura proposta

Analisei o CSV do pavimento superior e identifiquei a seguinte estrutura:

### Ambientes e Interruptores

| Ambiente | Interruptores | Tipo Interface | Quantidade Circuitos |
|----------|:-------------:|:--------------:|:--------------------:|
| **Hall Superior** | 11, 12, 13 | Acartonado/Alvenaria | 2-3 circuitos cada |
| **Suíte 1 Frente** | 14, 15, 16 | Acartonado | 3 circuitos cada |
| **Banheiro Suíte 1** | 19, 20 | Porcelanato | 2-3 circuitos cada |
| **Suíte 2 Fundos** | 7, 8, 9 | Acartonado | 3-4 circuitos cada |
| **Banheiro Suíte 2** | 10 | Porcelanato | 3 circuitos |
| **Suíte Master** | 1, 5, 6, 18 | Acartonado/Marcenaria | 3-5 circuitos cada |
| **Closet Master** | 17 | Marcenaria | 2 circuitos |
| **Banho Master** | 2, 4 | Porcelanato | 2-4 circuitos cada |

**Total de interruptores únicos**: 16 (Int: 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)

---

### Análise de Circuitos

#### Circuitos Luminotécnicos Únicos
**Total**: 27 circuitos (22 a 50)
- 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50

#### Circuitos Belman/Tipo

**LED 24V** (13 circuitos):
1. **NOVO (A DAR NOME)** - Frigobar (Hall Superior) - 3 ocorrências
2. **6B** - Prateleiras Suíte 1
3. **6G** - Bancada Banho 1
4. **6E** - Chuveiro Banho 1
5. **6Q** - Cortineiro Suíte 2
6. **6L** - Prateleiras Suíte 2
7. **6G** - Bancada Banho 2 (mesmo código do Banho 1)
8. **6E** - Chuveiro Banho 2 (mesmo código do Banho 1)
9. **7A1** - Cortineiro Master
10. **7R** - Sapateira Master
11. **7L1 (7Z)** - Sanca Master
12. **7V** - Tensoflex Closet
13. **7X** - Tensoflex Master (Banho)

**220V** (restante):
- Embutido Picco (maioria)
- Balizador Embutido
- Pendente
- Indefinida (Arandelas)

---

### Questões Pendentes Identificadas no CSV

**1. Circuito Frigobar (NOVO A DAR NOME):**
- Aparece em 3 interruptores do Hall Superior (11, 12, 13)
- Tipo: Tensoflex LED 24V
- **Pergunta**:  Qual o nome definitivo para este circuito? Ele está identificado com alguma etiqueta? (o que está escrito na etiqueta?)

**2. Circuito 48 (7R) - Sapateira Master:**
- Linha 42 e 47: LED 24V
- Linha 50: INDEFINIDA
- **Pergunta**: A sapateira é LED 24V ou outro tipo de iluminação?

**3. Circuito 40 (7W / 7X):**
- Linha 55: "Tensoflex Master" (tipo TENSOFLEX LED)
- Linha 57: "Tensoflex Master" (tipo TENSOFLEX LED)
- Mesmo nome "BANHO MASTER" 7W mas linha 55 diz 7X e linha 57 diz 7W
- **Pergunta**: São circuitos diferentes ou duplicados? Verificar se 7W e 7X são distintos.

**4. Notas do CSV:**
- "JOEL VERIFICAR PICCO ACENDENDO 24V" (Suíte 2, circuito 31)
- "JOEL VERIFICAR NOME" (Pendente Master, circuito 47)
- **Pergunta**: Essas verificações já foram feitas? Há alguma correção necessária?

**5. Circuito 41 (7L1 / 7Z):**
- Notação dupla similar ao 1T/1S do térreo
- **Pergunta**: É o mesmo caso (um ficou preso no gesso)?

---

### Estrutura Proposta para o Documento

Seguindo o padrão do térreo ([terreo-principal.md](../../docs/arquitetura/circuitos/andar-terreo/terreo-principal.md)):

#### Seções principais:
1. **📊 Tabela Completa de Circuitos** (expandida)
2. **📋 Estrutura Hierárquica por Tipo**
   - LED 24V (organizado por ambiente)
   - 220V (organizado por ambiente)
3. **🔌 Análise de Hardware Necessário**
   - Interruptores físicos
   - GPIOs de entrada (MCP23017)
   - GPIOs de saída (Relés + Shelly RGBW2)
   - Fontes 24V (cálculo de potência)
4. **📝 Observações Importantes**
   - Circuitos compartilhados
   - Interruptores multi-teclas
   - Notas sobre circuitos especiais

#### Ambientes (organização):
- Hall Superior
- Suíte 1 Frente + Banheiro
- Suíte 2 Fundos + Banheiro
- Suíte Master + Closet + Banho Master

---

### Dados que Preciso para Continuar

**1. Potências dos circuitos LED 24V:**
- Frigobar (NOVO) - ?W
- Prateleiras Suíte 1 (6B) - ?W
- Bancada Banho 1 (6G) - ?W
- Chuveiro Banho 1 (6E) - ?W
- Cortineiro Suíte 2 (6Q) - ?W
- Prateleiras Suíte 2 (6L) - ?W
- Bancada Banho 2 (6G) - ?W
- Chuveiro Banho 2 (6E) - ?W
- Cortineiro Master (7A1) - ?W
- Sapateira Master (7R) - ?W
- Sanca Master (7L1/7Z) - ?W
- Tensoflex Closet (7V) - ?W
- Tensoflex Master (7X) - ?W

**Sugestão**: Se não tiver as potências exatas, podemos usar valores típicos:
- Tensoflex: ~150-280W
- Cortineiro: ~200-350W
- Bancada/Prateleira: ~40-80W
- Chuveiro/Sanca: ~100-200W

**2. Nome definitivo do circuito Frigobar**
**3. Esclarecimentos sobre circuitos duplicados/indefinidos**

---

#### usuário: Respostas às perguntas

**1. Circuito Frigobar:**
- Potência: 80W (mesma do Bar térreo)
- Nome: **99Z** (temporário - PENDÊNCIA para verificar com arquiteto)

**2. Sapateira Master (7R):**
- Tipo: LED 24V (conforme linhas 42, 47)

**3. Sanca Master (7L1/7Z):**
- Sim, mesmo caso do 1T/1S (um ficou preso no gesso)

**4. Verificações do Joel:**
- Criar PENDÊNCIA para todas as verificações

**5. Potências LED 24V:**
- Criar PENDÊNCIA para medir depois (documento será criado sem potências definidas)

**6. Circuito 40 (7W) duplicado:**
- Criar PENDÊNCIA para verificar se são mesmo circuito ou erro no CSV

**7. Prosseguir:**
- Sim, criar especificação técnica com pendências documentadas

---

#### IA: Resumo das decisões e estrutura do documento

Obrigado pelas respostas! Vou criar a especificação técnica com as seguintes diretrizes:

### Decisões Confirmadas

**Circuitos com Definição:**
1. ✅ **99Z** - Frigobar Hall Superior (80W LED 24V) - ⚠️ PENDÊNCIA: Verificar nome com arquiteto
2. ✅ **7R** - Sapateira Master (LED 24V) - ⚠️ PENDÊNCIA: Medir potência
3. ✅ **7L1 / 7Z** - Sanca Master (notação dupla, similar 1T/1S)

**Pendências a Documentar:**
- 🔴 **Potências**: Todos os 13 circuitos LED 24V precisam medição
- 🔴 **Nome Frigobar (99Z)**: Confirmar com arquiteto
- 🔴 **Verificação Joel**: PICCO acendendo 24V (Suíte 2, circ 31)
- 🔴 **Verificação Joel**: Nome Pendente Master (circ 47)
- 🔴 **Circuito 40/7W**: Verificar se Int 2 e Int 4 compartilham ou são diferentes

### Estrutura do Documento Superior

O arquivo [superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md) será criado com:

#### 1. Cabeçalho e Informações
- Projeto: Casa Le Parc - Automação Residencial
- Painel: ESP32 Superior Principal
- Fonte: SUPERIOR_POWERQUERY_CERTO.csv
- Data: 2026-01-25

#### 2. Tabela Completa de Circuitos
- 59 linhas (conforme CSV)
- Colunas: Ambiente | Int | Circ Lum | Circ Belm | Acende Onde | Tipo | Potência | Nome Falado

#### 3. Estrutura Hierárquica por Tipo
**LED 24V** (13 circuitos identificados):
- Hall Superior: 99Z (Frigobar) - 80W - ⚠️ PENDÊNCIA nome
- Suíte 1: 6B (Prateleiras), 6G (Bancada Banho), 6E (Chuveiro) - ⚠️ PENDÊNCIA potências
- Suíte 2: 6Q (Cortineiro), 6L (Prateleiras), 6G (Bancada Banho), 6E (Chuveiro) - ⚠️ PENDÊNCIA potências
- Master: 7A1 (Cortineiro), 7R (Sapateira), 7L1/7Z (Sanca), 7V (Closet), 7X (Tensoflex Banho) - ⚠️ PENDÊNCIA potências

**220V** (restante):
- Embutido Picco (maioria)
- Balizador Embutido (1C, 7R)
- Pendente (7T)
- Indefinidas (6C, 6D, 6M) - Arandelas

#### 4. Análise de Hardware
- **Interruptores**: 16 únicos (1, 2, 4-20)
- **Entradas GPIO**: ~27-30 entradas (a calcular baseado em compartilhamentos)
- **Saídas GPIO**: ~24-26 saídas (LED 24V + Relés 220V)
- **MCP23017**: Estimativa 4 chips (2 entrada + 2 saída)
- **Shelly RGBW2**: Estimativa 3-4 unidades (13 circuitos LED / 4 canais)
- **Fontes 24V**: ⚠️ PENDÊNCIA - aguardando potências para dimensionar

#### 5. Observações Importantes
**Circuitos Especiais:**
- 99Z (Frigobar) - Nome temporário, confirmar com arquiteto
- 7L1 / 7Z (Sanca Master) - Notação dupla (um preso no gesso)
- Circuito 40/7W - Verificar duplicação Int 2 vs Int 4

**Verificações Pendentes (Joel):**
- Circuito 31 (6P) Suíte 2 - PICCO acendendo 24V
- Circuito 47 (7T) Pendente Master - Verificar nome

**Medições Necessárias:**
- Todos os 13 circuitos LED 24V precisam medição de potência para dimensionamento de fontes

---

Posso criar a especificação técnica agora?

---

#### usuário: Executar alteração 05

@.claude/agents/Executor-Alteracoes.md @tracking/alteracoes/spec-alteracao05.md

Nota importante: Existe outro agente rodando em paralelo com você, e ele vai fazer alterações no arquivo @tracking/alteracoes/00-indice.md. Logo, não faça alterações neste arquivo até eu te informar que o outro agente já acabou, se não vocês estarão alterando o mesmo arquivo e poderemos ter problemas.

---

#### IA: Confirmação para iniciar execução

Li a especificação técnica (spec-alteracao05.md) e verifiquei:
- ✅ Status: 🔵 Pronto para executar
- ✅ Arquivo a criar: [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md)
- ✅ Estrutura detalhada definida (seções 1-4 da spec)
- ✅ Pendências documentadas

Entendido sobre o arquivo 00-indice.md - **não vou modificá-lo** até você me avisar que o outro agente finalizou.

**Vou iniciar a execução da alteração 05. Posso prosseguir?**

---

#### usuário: pode prosseguir com a implementação

---

#### IA: Alteração 05 concluída com sucesso

✅ **Arquivo criado**: [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md)

**Resumo da implementação:**
- ✅ Documento completo com 59 linhas do CSV SUPERIOR_POWERQUERY_CERTO.csv
- ✅ Seção de PENDÊNCIAS ATIVAS no topo do documento
- ✅ Tabela completa de circuitos com todas as colunas
- ✅ Estrutura hierárquica LED 24V: 13 circuitos organizados por ambiente
- ✅ Estrutura hierárquica 220V: ~15-17 circuitos organizados por ambiente
- ✅ Análise de hardware: 16 interruptores, 4 MCP23017, 3-4 Shelly RGBW2
- ✅ Circuitos especiais documentados: 99Z (Frigobar), 7L1/7Z (Sanca), 7W/7X (Tensoflex)
- ✅ Verificações Joel documentadas: circ 31 (PICCO 24V) e circ 47 (nome Pendente)
- ✅ Tabela de medições necessárias: 13 circuitos LED 24V

**Pendências para resolução posterior:**
1. 🔴 **Alta prioridade**: Medir potências dos 13 circuitos LED 24V para dimensionar fontes
2. 🟡 **Média prioridade**: Confirmar nome definitivo do circuito Frigobar (99Z)
3. 🟡 **Média prioridade**: Verificar se circuito 40 (7W) é duplicado ou erro CSV
4. 🟡 **Média prioridade**: Joel verificar PICCO acendendo 24V (circ 31)
5. 🟢 **Baixa prioridade**: Joel verificar nome Pendente Master (circ 47)

**Próximos passos:**
- Documento está pronto para uso, mesmo com pendências documentadas
- Após obter medições de potência, atualizar seções de LED 24V e fontes
- Após confirmar nomes/circuitos, atualizar tabela e estruturas hierárquicas

**Status da spec**: Ver [spec-alteracao05.md](./spec-alteracao05.md) - 🟢 Concluído

⚠️ **Aguardando**: Aviso para atualizar [00-indice.md](./00-indice.md) quando o outro agente finalizar.

---

#### usuário: Localização das pendências documentadas

onde exatamente as pendências foram documentadas? dentro deste documento, certo?

---

#### IA: Pendências documentadas em 3 locais

As pendências foram documentadas em **3 locais diferentes**:

### 1. Spec de Alteração ([spec-alteracao05.md](./spec-alteracao05.md))
**Seção**: `## ⚠️ PENDÊNCIAS` (linhas 17-32)
- Lista de 6 pendências com tipo e prioridade
- Serve como referência técnica durante implementação

### 2. Documento Criado ([superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md))
**Seção**: `## ⚠️ PENDÊNCIAS ATIVAS` (logo após o cabeçalho)
- Lista de 5 pendências principais
- Visível para qualquer pessoa que abrir o documento
- Inclui última data de atualização

### 3. Ao Longo do Documento superior-principal.md
**Marcações ⚠️ inline** em:
- Tabela completa: coluna "Potência" com `⚠️ MEDIR`
- Estrutura hierárquica LED 24V: cada circuito com `⚠️ PENDÊNCIA: medir`
- Análise de hardware: fontes 24V marcadas como `⚠️ PENDÊNCIA CRÍTICA`
- Seção Circuitos Especiais: 99Z, 7W/7X com explicações detalhadas
- Seção Verificações Joel: circ 31 e 47 documentados
- Tabela de Medições Necessárias: 13 circuitos listados

**Resumo**: A spec tem pendências para o executor, o documento criado tem pendências para usuários finais, e as marcações inline apontam exatamente onde faltam dados.

---

#### usuário: Atualização de caminhos após reorganização

eu alterei a estrutura de pastas na pasta @docs/arquitetura, para organizar por andar.

verifique a nova estrutura, e verifique se você precisa alterar algo no documento da spec que você acabou de implementar

---

#### IA: Caminhos atualizados para nova estrutura

✅ **Estrutura identificada:**
- Térreo: `docs/arquitetura/circuitos/andar-terreo/`
- Superior: `docs/arquitetura/circuitos/andar-superior/`

✅ **Arquivo criado já está no local correto:**
- [docs/arquitetura/circuitos/andar-superior/superior-principal.md](../../docs/arquitetura/circuitos/andar-superior/superior-principal.md)

✅ **Referências atualizadas em:**
1. **spec-alteracao05.md**: Todos os caminhos atualizados
   - `superior-principal.md` → `andar-superior/superior-principal.md`
   - `terreo-principal.md` → `andar-terreo/terreo-principal.md`
2. **alteracao05.md**: Todos os caminhos atualizados

**Observação:** Não havia arquivo órfão - o arquivo criado já está no local correto da nova estrutura.

---

#### usuário: Atualizar índice

o índice já parou de ser usado, pode fazer as alterações necessárias

---

#### IA: Índice atualizado

✅ **Arquivo atualizado**: [00-indice.md](./00-indice.md)

**Alteração realizada:**
- Linha 44: Status alterado de `🟡 Em planejamento` para `🟢 Finalizado`

**Alteração 05 concluída completamente.**

---

#### usuário:
