# Alteracao 01 - Reorganizacao do Workspace

| Aspecto | Detalhe |
|---------|---------|
| Status | Concluido |
| Origem | Solicitacao do usuario - workspace desorganizado |
| Complexidade | Media |
| Data | 2026-01-24 |
| Especificacao | [spec-alteracao01.md](./spec-alteracao01.md) |

**Status possiveis:**
- Em planejamento
- Especificacao criada
- Em execucao
- Concluido
- Cancelado

---

## 1. Ideia Inicial

O workspace foi criado sem planejamento, com solicitacoes de alteracoes feitas ao longo do tempo sem pensar na estrutura. O objetivo era reorganizar para facilitar entendimento e navegacao tanto para humanos quanto para IAs.

**Objetivo final:** Sistema de facil entendimento e navegacao para humanos e IAs.

---

## 2. Analise Inicial (Auditoria)

### 2.1 Pontos Positivos Identificados

- Estrutura de agentes bem definida em `.claude/agents/`
- Documentacao por dominio com numeracao (01-06)
- Firmware organizado por tipo de dispositivo
- Padroes documentados
- Historico de decisoes preservado
- Referencia ESPHome offline
- Seguranca bem configurada (.gitignore)

### 2.2 Riscos Identificados

| Risco | Severidade |
|-------|------------|
| Arquivos soltos no root (15+) | ALTO |
| Duplicacao de locais para documentacao | MEDIO |
| Pastas vazias ou subutilizadas | BAIXO |
| Inconsistencia de nomenclatura | MEDIO |
| Profundidade excessiva (8 niveis) | MEDIO |
| Falta de indice central | ALTO |
| Dados de terceiros misturados | BAIXO |

### 2.3 Pontos Negativos

- Sem estrutura de testes
- Sem CI/CD definido
- Tracking de implementacao fragmentado
- Ausencia de versionamento semantico
- Documentacao ESPHome muito grande
- Mistura de idiomas
- Pasta WebApps abandonada
- Agentes em dois lugares

---

## 3. Conversa de Planejamento

#### usuario:
O workspace foi criado sem planejamento. Agora esta bem baguncado. Objetivo: ter sistema de facil entendimento e navegacao para humanos e IAs.

#### claude:
Criei arquivo de auditoria com analise completa: pontos positivos, riscos, negativos, sugestoes de estrutura, agentes e regras.

#### usuario:
Concordo com tudo, menos com classificar `docs-custom-card/` como "documentacao de outro projeto". E um custom card que sera utilizado.

#### claude:
Corrigido. O local correto seria `docs/referencias/home-assistant/custom-cards/`.

#### usuario:
Correto. Vamos comecar a implementacao.

---

## 4. Estrutura Proposta

```
Guila-s-1/
├── .claude/                      # Config Claude Code
│   ├── CLAUDE.md
│   ├── settings.local.json
│   └── agents/
├── docs/                         # TODA documentacao
│   ├── README.md                 # Indice geral
│   ├── comercial/
│   ├── requisitos/
│   ├── arquitetura/
│   ├── manuais/
│   ├── equipamentos/
│   ├── padroes/
│   ├── decisoes/
│   └── referencias/
│       ├── esphome/
│       └── home-assistant/
│           └── custom-cards/
├── src/                          # TODO codigo fonte
│   ├── firmware/
│   │   ├── common/
│   │   ├── paineis-eletricos/
│   │   ├── paineis-touch/
│   │   ├── cortinas/
│   │   ├── sensores/
│   │   └── termostatos/
│   ├── homeassistant/
│   │   ├── config/
│   │   ├── automations/
│   │   ├── dashboards/
│   │   └── custom_components/
│   └── webapps/
├── hardware/                     # Esquematicos, PCBs, BOMs
├── scripts/                      # Scripts operacionais
├── tracking/                     # Gestao do projeto
│   ├── fases/
│   ├── alteracoes/
│   └── bugs/
├── assets/                       # Recursos estaticos
│   ├── fonts/
│   └── images/
├── external/                     # Codigo de terceiros
├── archive/                      # Arquivos antigos
├── README.md
├── PROJECT-CONTEXT.md
├── CHANGELOG.md
└── .gitignore
```

---

## 5. Decisoes Importantes

1. **Local de documentacao de terceiros:** `docs/referencias/` (nao `src/`)
2. **Custom cards HA:** `docs/referencias/home-assistant/custom-cards/`
3. **Agentes consolidados:** Tudo em `.claude/agents/`
4. **Tracking centralizado:** Tudo em `tracking/`
5. **Root limpo:** Apenas README, PROJECT-CONTEXT, CHANGELOG e .gitignore

---

## 6. Execucao

### Fase 1 - Criar estrutura base
**Status:** Concluido

Criadas todas as pastas da nova estrutura + `docs/README.md` como indice central.

### Fase 2 - Mover documentacao
**Status:** Concluido

| Origem | Destino |
|--------|---------|
| `Documentacao/01-Comercial/*` | `docs/comercial/` |
| `Documentacao/02-Requisitos/*` | `docs/requisitos/` |
| `Documentacao/03-Arquitetura/*` | `docs/arquitetura/` |
| `Documentacao/04-Manuais/*` | `docs/manuais/` |
| `Documentacao/05-Manuais-Equipamentos/*` | `docs/equipamentos/` |
| `Documentacao/06-Padroes-Codigo/*` | `docs/padroes/` |
| `Conversas/*.md` | `docs/decisoes/` |
| `Firmware/esphome_documentacao_completa/` | `docs/referencias/esphome/` |
| `Home-Assistant/docs-custom-card/` | `docs/referencias/home-assistant/custom-cards/` |

### Fase 3 - Mover codigo para src/
**Status:** Concluido

| Origem | Destino |
|--------|---------|
| `Firmware/common/*` | `src/firmware/common/` |
| `Firmware/ESP32-Paineis-Eletricos/*` | `src/firmware/paineis-eletricos/` |
| `Firmware/ESP32-Paineis-Touch-7''/*` | `src/firmware/paineis-touch/` |
| `Firmware/ESP32-Cortinas/*` | `src/firmware/cortinas/` |
| `Firmware/ESP32-Sensores/*` | `src/firmware/sensores/` |
| `Firmware/ESP32-Tersmostatos/*` | `src/firmware/termostatos/` |
| `Home-Assistant/*.yaml` | `src/homeassistant/config/` |
| `Home-Assistant/dashboards/*` | `src/homeassistant/dashboards/` |
| `Home-Assistant/custom_components/*` | `src/homeassistant/custom_components/` |
| `WebApps/*` | `src/webapps/` |

### Fase 4 - Arquivar e mover externos
**Status:** Concluido

| Origem | Destino |
|--------|---------|
| `proxmoxHelperScripts-Github/` | `external/proxmox-scripts/` |
| `fonts/*` | `assets/fonts/` |

### Fase 5 - Atualizar referencias
**Status:** Concluido

1. Atualizado `.claude/CLAUDE.md` com novos caminhos
2. Consolidado `agentes/` com `.claude/agents/`
3. Movido `Implementacao/Fases/*` para `tracking/fases/`
4. Movido `Implementacao/alteracoes/*` para `tracking/alteracoes/`
5. Movido `Implementacao/bugs_em_testes/*` para `tracking/bugs/`

### Fase 6 - Limpeza
**Status:** Concluido

Pastas antigas removidas:
- `Documentacao/`
- `Conversas/`
- `Firmware/`
- `Home-Assistant/`
- `Implementacao/`
- `fonts/`
- `WebApps/`
- `agentes/`

Arquivos movidos:
- `GUIA-GIT.md` → `docs/`

Arquivos a serem removidos manualmente pelo usuario:
- `auditoria_workspace.md` (root)
- `mudancas_propostas_regras.md` (root)

---

## 7. Validacao Final

- [x] Estrutura base criada
- [x] Documentacao migrada para `docs/`
- [x] Codigo migrado para `src/`
- [x] Externos isolados em `external/`
- [x] Tracking centralizado
- [x] CLAUDE.md atualizado
- [x] Agentes consolidados
- [x] Pastas antigas removidas
- [x] Root limpo
- [ ] Commit das mudancas

---

## 8. Novas Regras Propostas

### Estrutura
- R01: Maximo 5 niveis de profundidade
- R02: Root limpo (apenas README, PROJECT-CONTEXT, CHANGELOG, .gitignore)
- R03: Uma fonte da verdade por tipo de informacao

### Nomenclatura
- R04: Pastas em minusculas, hifens, sem acentos
- R05: Arquivos de codigo em minusculas
- R06: Validar ortografia antes de criar pastas

### Documentacao
- R07: Todo diretorio tem README.md
- R08: Indice central em `docs/README.md`
- R09: Decisoes datadas (YYYY-MM-DD-descricao.md)

### Terceiros
- R10: Codigo externo isolado em `external/`
- R11: Preferir referencias a copias

### Agentes
- R12: Agentes em `.claude/agents/` apenas
- R13: Template padrao para agentes

### Tracking
- R14: Pendencias centralizadas em `tracking/`
- R15: Bugs rastreados com data e status

---

## 9. Novos Agentes Sugeridos

| Agente | Proposito |
|--------|-----------|
| `migration.md` | Auxiliar em migracoes/reorganizacoes |
| `testing.md` | Validacao de firmware e configs |
| `tracking.md` | Gestao de progresso do projeto |
| `security.md` | Auditoria de seguranca |
| `onboarding.md` | Ajudar novos contribuidores |

---

*Alteracao concluida em 2026-01-24*
