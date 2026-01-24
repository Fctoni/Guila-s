# Especificacao: Alteracao 02 - Correcao de Referencias Quebradas

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Concluido |
| Conversa | [alteracao02.md](./alteracao02.md) |
| Data criacao | 2026-01-24 |
| Complexidade | 🟢 Baixa |

**Status possiveis:**
- 🔵 Pronto para executar
- 🟠 Em execucao
- 🟢 Concluido
- ❌ Cancelado

---

## 1. Resumo

Atualizar referencias aos caminhos antigos (Documentacao/, Implementacao/, Conversas/, Firmware/, agentes/) para os novos caminhos apos reorganizacao do workspace (alteracao01).

---

## 2. O que sera feito

- [x] Corrigir referencias em 6 arquivos de agentes (.claude/agents/)
- [x] Corrigir referencias em 11 arquivos de documentacao (docs/)
- [x] Corrigir referencias em 4 arquivos de firmware (src/firmware/)
- [x] Corrigir referencias em 3 arquivos na raiz
- [x] Deletar arquivos temporarios da raiz (auditoria_workspace.md, mudancas_propostas_regras.md)

---

## 3. Modificacoes propostas

### 3.1 Tabela de Substituicoes

| Caminho Antigo | Caminho Novo |
|----------------|--------------|
| `Documentacao/` | `docs/` |
| `Documentacao/01-Comercial/` | `docs/comercial/` |
| `Documentacao/02-Requisitos/` | `docs/requisitos/` |
| `Documentacao/03-Arquitetura/` | `docs/arquitetura/` |
| `Documentacao/04-Manuais/` | `docs/manuais/` |
| `Documentacao/05-Manuais-Equipamentos/` | `docs/equipamentos/` |
| `Documentacao/06-Padroes-Codigo/` | `docs/padroes/` |
| `Conversas/` | `docs/decisoes/` |
| `Implementacao/alteracoes/` | `tracking/alteracoes/` |
| `Implementacao/alteracoes-prd/` | `tracking/alteracoes-prd/` |
| `Implementacao/Fases/` | `tracking/fases/` |
| `Implementacao/bugs_em_testes/` | `tracking/bugs/` |
| `Firmware/` | `src/firmware/` |
| `Home-Assistant/` | `src/homeassistant/` |
| `agentes/` | `.claude/agents/` |

### 3.2 Arquivos a Corrigir

#### Agentes (.claude/agents/)

| Arquivo | Substituicoes esperadas |
|---------|------------------------|
| `Planejador-Alteracoes.md` | Implementacao/alteracoes/ |
| `manual_usuario.md` | Implementacao/alteracoes/, agentes/ |
| `Gerador-Commits.md` | Implementacao/alteracoes/ |
| `esphome.md` | Documentacao/03-Arquitetura/circuitos/ |
| `infra.md` | Documentacao/03-Arquitetura/ |
| `docs.md` | Conversas/pendencias.md, Documentacao/ |

#### Documentacao (docs/)

| Arquivo | Verificar referencias |
|---------|----------------------|
| `docs/padroes/regras_codigo.md` | Caminhos antigos |
| `docs/padroes/README.md` | Caminhos antigos |
| `docs/manuais/Manual-Tecnico.md` | Caminhos antigos |
| `docs/arquitetura/circuitos/terreo-principal.md` | Caminhos antigos |
| `docs/arquitetura/circuitos/cortinas-terreo.md` | Caminhos antigos |
| `docs/decisoes/pendencias.md` | Caminhos antigos |
| `docs/requisitos/User-Stories.md` | Caminhos antigos |
| `docs/requisitos/PRD.md` | Caminhos antigos |
| `docs/comercial/Contrato.md` | Caminhos antigos |
| `docs/README.md` | Caminhos antigos |
| `docs/GUIA-GIT.md` | Caminhos antigos |

#### Firmware (src/firmware/)

| Arquivo | Verificar referencias |
|---------|----------------------|
| `src/firmware/paineis-touch/README.md` | Caminhos antigos |
| `src/firmware/paineis-eletricos/terreo-principal/README.md` | Caminhos antigos |
| `src/firmware/paineis-eletricos/terreo-principal/circuitos.md` | Caminhos antigos |
| `src/firmware/paineis-eletricos/README.md` | Caminhos antigos |

#### Raiz

| Arquivo | Verificar referencias |
|---------|----------------------|
| `PROJECT-CONTEXT.md` | Caminhos antigos |
| `README.md` | Caminhos antigos |
| `CHANGELOG.md` | Caminhos antigos |

### 3.3 Arquivos a Deletar

| Arquivo | Motivo |
|---------|--------|
| `auditoria_workspace.md` | Temporario - usado apenas durante alteracao01 |
| `mudancas_propostas_regras.md` | Temporario - duplicado em archive/ |

### 3.4 Arquivos a Ignorar (nao corrigir)

| Arquivo | Motivo |
|---------|--------|
| `tracking/alteracoes/alteracao01.md` | Historico da reorganizacao |
| `tracking/alteracoes/alteracao02.md` | Este planejamento |
| `tracking/alteracoes/spec-alteracao01.md` | Historico |
| `archive/analises/*.md` | Arquivos arquivados |
| `archive/mudancas_propostas_regras.md` | Arquivo arquivado |
| `docs/decisoes/20251*.md` | Conversas historicas |

---

## 4. Implementacao Tecnica

### 4.1 Banco de Dados

Nao aplicavel - apenas modificacao de arquivos .md

### 4.2 Arquivos a Modificar/Criar

| Acao | Arquivo | Descricao |
|------|---------|-----------|
| MODIFICAR | 24 arquivos .md | Substituir referencias quebradas |
| DELETAR | 2 arquivos temporarios | Limpeza da raiz |

### 4.3 Dependencias Externas

Nenhuma.

---

## 5. Execucao

*(preenchido pelo Executor)*

### 5.1 Progresso

**Agentes:**
- [x] `.claude/agents/Planejador-Alteracoes.md`
- [x] `.claude/agents/manual_usuario.md`
- [x] `.claude/agents/Gerador-Commits.md`
- [x] `.claude/agents/esphome.md`
- [x] `.claude/agents/infra.md`
- [x] `.claude/agents/docs.md`

**Documentacao:**
- [x] `docs/padroes/regras_codigo.md`
- [x] `docs/padroes/README.md`
- [x] `docs/manuais/Manual-Tecnico.md`
- [x] `docs/arquitetura/circuitos/terreo-principal.md`
- [x] `docs/arquitetura/circuitos/cortinas-terreo.md`
- [x] `docs/decisoes/pendencias.md`
- [x] `docs/requisitos/User-Stories.md`
- [x] `docs/requisitos/PRD.md`
- [x] `docs/comercial/Contrato.md`
- [x] `docs/README.md`
- [x] `docs/GUIA-GIT.md` (ja estava correto)

**Firmware:**
- [x] `src/firmware/paineis-touch/README.md`
- [x] `src/firmware/paineis-eletricos/terreo-principal/README.md`
- [x] `src/firmware/paineis-eletricos/terreo-principal/circuitos.md`
- [x] `src/firmware/paineis-eletricos/README.md`

**Raiz:**
- [x] `PROJECT-CONTEXT.md`
- [x] `README.md`
- [x] `CHANGELOG.md`

**Limpeza:**
- [x] Deletar `auditoria_workspace.md`
- [x] Deletar `mudancas_propostas_regras.md`

### 5.2 Notas de Implementacao

#### Checkpoint 2026-01-24

**Concluido:**
- 6/6 agentes corrigidos (.claude/agents/)
- 10/11 arquivos de documentacao corrigidos (docs/)

**Pendente:**
- 1 arquivo docs: `docs/GUIA-GIT.md` (nao foi lido ainda)
- 4 arquivos firmware: verificar se existem e corrigir
- 3 arquivos raiz: PROJECT-CONTEXT.md, README.md, CHANGELOG.md
- Deletar 2 arquivos temporarios
- Validacao final com grep

**Substituicoes aplicadas:**
- `Implementacao/alteracoes/` → `tracking/alteracoes/`
- `Documentacao/` → `docs/`
- `Conversas/` → `docs/decisoes/`
- `Firmware/` → `src/firmware/`
- `Home-Assistant/` → `src/homeassistant/`
- `agentes/` → `.claude/agents/`

### 5.3 Conversa de Execucao

#### IA: Iniciando execucao - corrigindo referencias quebradas

Inicio: 2026-01-24
Começando pelos arquivos de agentes (.claude/agents/).

#### IA: Checkpoint - contexto ficando baixo

Agentes e maioria da documentacao corrigidos. Proximo agente deve:
1. Ler este arquivo para ver o que falta
2. Corrigir docs/GUIA-GIT.md
3. Verificar/corrigir arquivos de firmware
4. Corrigir arquivos da raiz
5. Deletar arquivos temporarios
6. Executar validacao final com grep

---

#### IA: Retomada e conclusao da execucao

**Concluido nesta sessao:**
- docs/GUIA-GIT.md (ja estava correto)
- src/firmware/paineis-touch/README.md
- src/firmware/paineis-eletricos/terreo-principal/README.md
- src/firmware/paineis-eletricos/terreo-principal/circuitos.md
- src/firmware/paineis-eletricos/README.md
- PROJECT-CONTEXT.md
- README.md (estrutura atualizada + referencias)
- CHANGELOG.md
- Deletados: auditoria_workspace.md, mudancas_propostas_regras.md
- Correcao adicional: .claude/agents/homeassistant.md (encontrado na validacao)

**Validacao final:** Executada com grep. Referencias restantes estao em arquivos ignorados (historico, archive).

---

## 6. Validacao Final

- [x] Nenhuma referencia restante a caminhos antigos (verificar com grep)
- [x] Arquivos temporarios deletados
- [x] Links funcionando corretamente

**Nota**: Referencias em arquivos historicos (tracking/alteracoes/*.md, docs/decisoes/2025*.md, archive/*) foram mantidas conforme secao 3.4.
