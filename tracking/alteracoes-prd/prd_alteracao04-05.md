# 📋 Alterações Necessárias no PRD - Alterações 04 e 05

**Data:** 25/01/2026
**Referências:**
- `spec-alteracao04.md` - Atualização Circuitos Térreo Principal
- `spec-alteracao05.md` - Criação Documentação Circuitos Superior Principal
- Nova estrutura de pastas: `docs/arquitetura/circuitos/andar-[terreo|superior]/`

---

## 📊 RESUMO DAS ALTERAÇÕES

| # | Alteração | Seções Afetadas | Tipo |
|---|-----------|-----------------|------|
| 1 | Adicionar referência à documentação detalhada de circuitos | Seção "Iluminação" (linha ~245) | NOVA NOTA |
| 2 | Atualizar links na seção Referências | Seção "Referências" (linha ~495) | NOVA SUBSEÇÃO |

---

## 🔍 ANÁLISE

### Contexto das Alterações 04 e 05

As alterações 04 e 05 criaram/atualizaram **documentação técnica detalhada** dos circuitos elétricos:

**Alteração 04 (Térreo):**
- Atualizou `docs/arquitetura/circuitos/andar-terreo/terreo-principal.md`
- Adicionou circuito Bar LED 80W
- Renomeou ambiente "Churrasqueira" → "Pia"
- Atualizou circuito 1R para EXTRA (reserva)
- Documentou circuitos especiais (1T/1S, reservas, pendências)
- Total: 1.608W LED 24V, ~67A

**Alteração 05 (Superior):**
- Criou `docs/arquitetura/circuitos/andar-superior/superior-principal.md`
- Documentou 59 linhas de circuitos (4 suítes + hall)
- 13 circuitos LED 24V identificados
- Pendências documentadas (medições, nomenclaturas)
- Estrutura consistente com padrão do térreo

**Nova Estrutura de Pastas:**
```
docs/arquitetura/circuitos/
├── andar-terreo/
│   ├── terreo-principal.md
│   ├── tabela-eletricista-terreo.md
│   ├── cortinas-terreo.md
│   └── guia-cores-fiacao-terreo.md
└── andar-superior/
    └── superior-principal.md
```

---

### Por que NÃO duplicar no PRD?

O **PROJECT-CONTEXT.md** é um documento de **decisões arquiteturais de alto nível**, não de **implementação técnica detalhada**.

**O PRD deve conter:**
- Decisões de hardware/software (ESP32, Shelly, HA)
- Integrações e protocolos
- Nomenclaturas padrão
- Referências para documentação detalhada ✅

**O PRD NÃO deve conter:**
- Tabelas completas de 59+ linhas de circuitos
- Análise detalhada de hardware (MCP23017, GPIOs)
- Dimensionamento de fontes 24V
- Listas de interruptores por ambiente

**Motivo:** Separação de responsabilidades - PRD = "O QUE e POR QUE", Docs Técnicos = "COMO implementar"

---

## 🔧 ALTERAÇÃO 1: Adicionar Nota na Seção Iluminação

### **[Seção 5.1] Iluminação (ATUALIZAR)**

**Localização no PRD:** Linha ~245 (após "### Iluminação")

**Adicionar ao FINAL da seção Iluminação** (após explicação do debounce):

```markdown
### Documentação Técnica de Circuitos

A documentação completa dos circuitos elétricos está organizada por andar:

- **Térreo**: `docs/arquitetura/circuitos/andar-terreo/`
  - [terreo-principal.md](docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) - Documento de engenharia completo
  - [tabela-eletricista-terreo.md](docs/arquitetura/circuitos/andar-terreo/tabela-eletricista-terreo.md) - Tabela para instalação em campo
  - Total: 46 circuitos, 1.608W LED 24V (~67A)

- **Pavimento Superior**: `docs/arquitetura/circuitos/andar-superior/`
  - [superior-principal.md](docs/arquitetura/circuitos/andar-superior/superior-principal.md) - Documento de engenharia completo
  - Total: 59 circuitos, 13 circuitos LED 24V
  - ⚠️ **Pendências**: Medição de potências LED 24V necessária para dimensionamento final de fontes

Estes documentos incluem:
- Tabelas completas de circuitos (Interruptor → Circuito → Tipo → Potência)
- Estrutura hierárquica LED 24V e 220V
- Análise de hardware necessário (MCP23017, Shelly RGBW2)
- Dimensionamento de fontes 24V
- Circuitos especiais e observações de instalação
```

---

## 🔧 ALTERAÇÃO 2: Atualizar Seção Referências

### **[Seção 13] Referências (ATUALIZAR)**

**Localização no PRD:** Linha ~495 (seção "📚 REFERÊNCIAS")

**Adicionar NOVA subseção** após "### Links Importantes" e antes da seção "⚡ RESUMO EXECUTIVO":

```markdown
### Documentação Técnica de Implementação

**Circuitos Elétricos**:
- [Térreo Principal](docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) - Documentação completa de 46 circuitos
- [Superior Principal](docs/arquitetura/circuitos/andar-superior/superior-principal.md) - Documentação completa de 59 circuitos
- [Tabela Eletricista Térreo](docs/arquitetura/circuitos/andar-terreo/tabela-eletricista-terreo.md) - Referência para instalação em campo
- [Cortinas Térreo](docs/arquitetura/circuitos/andar-terreo/cortinas-terreo.md) - Circuitos de persianas motorizadas
- [Guia de Cores](docs/arquitetura/circuitos/andar-terreo/guia-cores-fiacao-terreo.md) - Padrão de cores de fiação

**Estrutura de Pastas**:
```
docs/arquitetura/circuitos/
├── andar-terreo/       # Térreo: 46 circuitos, 1.608W LED 24V
└── andar-superior/     # Superior: 59 circuitos (medições pendentes)
```
```

---

## ✅ CHECKLIST DE ATUALIZAÇÃO

### Seção Iluminação
- [ ] Adicionar subseção "Documentação Técnica de Circuitos"
- [ ] Incluir links para docs térreo e superior
- [ ] Mencionar totais de circuitos e potências
- [ ] Destacar pendências do pavimento superior

### Seção Referências
- [ ] Adicionar subseção "Documentação Técnica de Implementação"
- [ ] Listar todos os documentos de circuitos
- [ ] Incluir estrutura de pastas visual
- [ ] Manter consistência de formatação

### Header
- [ ] Atualizar "Última atualização" para 25/01/2026
- [ ] Adicionar entrada no "Histórico de Atualizações"

---

## 📝 ENTRADA NO CHANGELOG

Adicionar no topo da seção "### 📝 Histórico de Atualizações" (linha ~7):

```markdown
- **25/01/2026**:
  - Documentação completa de circuitos elétricos térreo (46 circuitos, 1.608W LED 24V)
  - Documentação completa de circuitos elétricos superior (59 circuitos, 13 LEDs 24V - medições pendentes)
  - Nova estrutura de pastas: `docs/arquitetura/circuitos/andar-[terreo|superior]/`
  - Referências cruzadas adicionadas nas seções Iluminação e Referências
```

---

## 🚫 O QUE NÃO INCLUIR NO PRD

❌ **NÃO incluir no PRD:**
1. Tabelas completas de 46/59 linhas de circuitos (já estão nos docs específicos)
2. Análise detalhada de GPIOs e MCP23017 (implementação, não decisão)
3. Dimensionamento exato de fontes 24V (nível de implementação)
4. Listas de interruptores por ambiente (muito detalhado)
5. Circuitos especiais individuais (ex: 1T/1S, 99Z) - exceto se impactar decisões gerais

✅ **APENAS incluir:**
- Referências aos documentos técnicos
- Totais agregados (46 circuitos, 1.608W, etc.)
- Pendências críticas (medições superior)
- Links para navegação

**Motivo:** O PRD é um documento de **decisões arquiteturais**, não de **implementação técnica**. Manter separação de responsabilidades garante que o PRD permaneça conciso e focado em decisões de alto nível.

---

## 📊 IMPACTO DA MUDANÇA

### Benefícios
1. **Navegabilidade**: Usuários sabem onde encontrar documentação detalhada
2. **Manutenibilidade**: PRD permanece conciso, docs técnicos separados
3. **Rastreabilidade**: Links diretos para documentação de implementação
4. **Consistência**: Estrutura de pastas clara e organizada

### Risco Baixo
- Alterações mínimas (2 seções pequenas + header)
- Não modifica decisões existentes
- Apenas adiciona referências e contexto

---

## 🎯 RESUMO EXECUTIVO

**O que muda no PRD:**
- ✅ Nova subseção em "Iluminação" com links para docs técnicos
- ✅ Nova subseção em "Referências" com estrutura de pastas
- ✅ Header atualizado (data + changelog)

**O que NÃO muda:**
- ❌ Nenhuma decisão arquitetural existente
- ❌ Nenhuma seção técnica duplicada
- ❌ Escopo do PRD permanece o mesmo

**Arquivos afetados:**
- `PROJECT-CONTEXT.md` (3 seções pequenas)

**Versão PRD:**
- Atual: (sem versionamento explícito)
- Proposta: Manter sem versão, apenas atualizar data e changelog

---

**Status**: ✅ APLICADO no PROJECT-CONTEXT.md em 25/01/2026
