# Especificacao: Alteracao 01 - Reorganizacao do Workspace

| Aspecto | Detalhe |
|---------|---------|
| Status | Concluido |
| Conversa | [alteracao01.md](./alteracao01.md) |
| Data criacao | 2026-01-24 |
| Complexidade | Media |

**Status possiveis:**
- Pronto para executar
- Em execucao
- Concluido
- Cancelado

---

## 1. Resumo

Reorganizacao completa do workspace para facilitar navegacao e entendimento por humanos e IAs. Consolidacao de documentacao em `docs/`, codigo em `src/`, e tracking centralizado.

---

## 2. O que foi feito

- [x] Criar estrutura de pastas padronizada
- [x] Mover documentacao para `docs/`
- [x] Mover codigo fonte para `src/`
- [x] Isolar terceiros em `external/`
- [x] Centralizar tracking em `tracking/`
- [x] Atualizar CLAUDE.md com novos caminhos
- [x] Consolidar agentes em `.claude/agents/`
- [x] Remover pastas antigas

---

## 3. Modificacoes realizadas

### 3.1 Nova Estrutura

**Situacao Anterior:**
- 15+ arquivos soltos no root
- Documentacao em 5+ locais diferentes
- Codigo misturado com docs
- Pastas com profundidade de 8 niveis
- Agentes em dois lugares
- Sem indice central

**Situacao Atual:**
- Root limpo (apenas README, PROJECT-CONTEXT, CHANGELOG, .gitignore)
- Toda documentacao em `docs/`
- Todo codigo em `src/`
- Tracking centralizado em `tracking/`
- Agentes consolidados em `.claude/agents/`
- Indice central em `docs/README.md`

### 3.2 Estrutura Final

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
├── external/                     # Codigo de terceiros
├── archive/                      # Arquivos antigos
├── README.md
├── PROJECT-CONTEXT.md
├── CHANGELOG.md
└── .gitignore
```

---

## 4. Implementacao Tecnica

### 4.1 Migracoes Realizadas

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
| `Implementacao/Fases/*` | `tracking/fases/` |
| `Implementacao/alteracoes/*` | `tracking/alteracoes/` |
| `Implementacao/bugs_em_testes/*` | `tracking/bugs/` |
| `proxmoxHelperScripts-Github/` | `external/proxmox-scripts/` |
| `fonts/*` | `assets/fonts/` |
| `GUIA-GIT.md` | `docs/` |

### 4.2 Arquivos Atualizados

| Arquivo | Alteracao |
|---------|-----------|
| `.claude/CLAUDE.md` | Novos caminhos da estrutura |
| `docs/README.md` | Criado como indice central |

### 4.3 Pastas Removidas

- `Documentacao/`
- `Conversas/`
- `Firmware/`
- `Home-Assistant/`
- `Implementacao/`
- `fonts/`
- `WebApps/`
- `agentes/`

---

## 5. Execucao

### 5.1 Progresso

- [x] Fase 1 - Criar estrutura base
- [x] Fase 2 - Mover documentacao
- [x] Fase 3 - Mover codigo para src/
- [x] Fase 4 - Arquivar e mover externos
- [x] Fase 5 - Atualizar referencias
- [x] Fase 6 - Limpeza de pastas antigas

### 5.2 Notas de Implementacao

A reorganizacao foi realizada em 6 fases sequenciais para minimizar risco de perda de arquivos. Todas as migracoes foram validadas antes de remover as pastas originais.

---

## 6. Validacao Final

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

*Especificacao criada em 2026-01-24*
