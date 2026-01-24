# Alteracao 02 - Correcao de Referencias Quebradas

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Especificacao criada |
| Origem | Pendencia da reorganizacao (alteracao01) |
| Complexidade | Baixa |
| Especificacao | [spec-alteracao02.md](./spec-alteracao02.md) |

**Status possiveis:**
- Em planejamento
- Especificacao criada
- Em execucao
- Concluido
- Cancelado

---

## 1. Ideia Inicial

Apos a reorganizacao do workspace (alteracao01), varios arquivos ainda contem referencias aos caminhos antigos (`Documentacao/`, `Implementacao/`, `Conversas/`, `Firmware/`). Essas referencias precisam ser atualizadas para os novos caminhos (`docs/`, `tracking/`, `src/`).

---

## 2. Conversa de Planejamento

#### usuario:

Identificadas 25+ referencias quebradas durante auditoria da alteracao01.

#### IA: Mapeamento de referencias quebradas

Arquivos afetados identificados:

##### Agentes (.claude/agents/)

| Arquivo | Referencias a corrigir |
|---------|------------------------|
| `esphome.md` | `Documentacao/03-Arquitetura/circuitos/` |
| `docs.md` | `Conversas/pendencias.md`, `Documentacao/` |
| `infra.md` | `Documentacao/03-Arquitetura/Diagrama-Rede.md` |
| `manual_usuario.md` | Multiplas refs a `Implementacao/alteracoes/` e `agentes/` |
| `Gerador-Commits.md` | `Implementacao/alteracoes/` (3 refs) |
| `Planejador-Alteracoes.md` | `Implementacao/alteracoes/00-indice.md` |
| `PRD-editor.md` | `Implementacao/alteracoes/` e `Implementacao/alteracoes-prd/` (8 refs) |

##### Documentacao (docs/)

| Arquivo | Verificar |
|---------|-----------|
| `docs/padroes/regras_codigo.md` | Refs a caminhos antigos |
| `docs/manuais/Manual-Tecnico.md` | Refs a caminhos antigos |
| `docs/arquitetura/circuitos/` | Refs a caminhos antigos |
| `docs/decisoes/pendencias.md` | Refs a caminhos antigos |
| `docs/requisitos/PRD.md` | Refs a caminhos antigos |
| `docs/README.md` | Refs a caminhos antigos |

##### Firmware (src/firmware/)

| Arquivo | Verificar |
|---------|-----------|
| `src/firmware/paineis-touch/README.md` | Refs a caminhos antigos |
| `src/firmware/paineis-eletricos/` | Refs a caminhos antigos |

##### Outros

| Arquivo | Verificar |
|---------|-----------|
| `PROJECT-CONTEXT.md` | Refs a caminhos antigos |
| `README.md` | Refs a caminhos antigos |
| `CHANGELOG.md` | Refs a caminhos antigos |
| `docs/GUIA-GIT.md` | Refs a caminhos antigos |

---
#### usuário:

você errou a identação markdown na geração desta conversa, eu corrigi manualmente. cuide para fazer do jeito certo daqui para frente.

prossiga para o próximo passo

## 3. Mapeamento de Substituicoes

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

---

## 4. Decisoes Importantes

*(a ser preenchido durante a conversa)*

---

## 5. Checkpoints

*(adicionados automaticamente em sessoes longas)*

---

#### IA: Verificacao de arquivos afetados

Executei busca por referencias aos caminhos antigos. Encontrados **36 arquivos** com referencias:

##### Arquivos a corrigir (22)

| Categoria | Arquivo |
|-----------|---------|
| **Agentes** | `.claude/agents/Planejador-Alteracoes.md` |
| **Agentes** | `.claude/agents/manual_usuario.md` |
| **Agentes** | `.claude/agents/Gerador-Commits.md` |
| **Agentes** | `.claude/agents/esphome.md` |
| **Agentes** | `.claude/agents/infra.md` |
| **Agentes** | `.claude/agents/docs.md` |
| **Docs** | `docs/padroes/regras_codigo.md` |
| **Docs** | `docs/padroes/README.md` |
| **Docs** | `docs/manuais/Manual-Tecnico.md` |
| **Docs** | `docs/arquitetura/circuitos/terreo-principal.md` |
| **Docs** | `docs/arquitetura/circuitos/cortinas-terreo.md` |
| **Docs** | `docs/decisoes/pendencias.md` |
| **Docs** | `docs/requisitos/User-Stories.md` |
| **Docs** | `docs/requisitos/PRD.md` |
| **Docs** | `docs/comercial/Contrato.md` |
| **Docs** | `docs/README.md` |
| **Docs** | `docs/GUIA-GIT.md` |
| **Firmware** | `src/firmware/paineis-touch/README.md` |
| **Firmware** | `src/firmware/paineis-eletricos/terreo-principal/README.md` |
| **Firmware** | `src/firmware/paineis-eletricos/terreo-principal/circuitos.md` |
| **Firmware** | `src/firmware/paineis-eletricos/README.md` |
| **Raiz** | `PROJECT-CONTEXT.md` |
| **Raiz** | `README.md` |
| **Raiz** | `CHANGELOG.md` |

##### Arquivos a ignorar (excluir do escopo)

| Arquivo | Motivo |
|---------|--------|
| `tracking/alteracoes/alteracao01.md` | Historico da reorganizacao |
| `tracking/alteracoes/alteracao02.md` | Este arquivo (auto-referencia) |
| `tracking/alteracoes/spec-alteracao01.md` | Historico |
| `archive/analises/*.md` | Arquivos arquivados |
| `archive/mudancas_propostas_regras.md` | Arquivo arquivado |
| `auditoria_workspace.md` | Temporario (pode ser deletado) |
| `mudancas_propostas_regras.md` | Temporario (pode ser deletado) |
| `docs/decisoes/20251*.md` | Conversas historicas |

##### Resumo

- **22 arquivos** precisam de correcao
- **~14 arquivos** podem ser ignorados (historico/archive)
- **2 arquivos temporarios** na raiz podem ser deletados

**Proximos passos:**

Como esta alteracao nao envolve UI (apenas substituicao de texto), podemos ir direto para a especificacao tecnica.

**Posso criar a `spec-alteracao02.md` com a lista de arquivos e substituicoes a fazer?**

---

#### usuario:

crie!

---

#### IA: Especificacao criada

Especificacao tecnica criada em [spec-alteracao02.md](./spec-alteracao02.md).

**Conteudo da spec:**
- 24 arquivos a modificar (6 agentes + 11 docs + 3 firmware + 4 raiz)
- 15 substituicoes de caminhos mapeadas
- 2 arquivos temporarios a deletar
- Checklist completo para execucao

**Proximo passo:** O Executor pode iniciar a implementacao.

---

#### usuario: