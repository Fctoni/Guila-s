# Documentacao - Projeto Guila's

Indice central de toda documentacao do projeto.

---

## Estrutura

| Pasta | Conteudo |
|-------|----------|
| [comercial/](comercial/) | Contratos, propostas, SLA |
| [requisitos/](requisitos/) | PRD, user stories, casos de uso |
| [arquitetura/](arquitetura/) | Diagramas, topologia, circuitos |
| [manuais/](manuais/) | Manual usuario, tecnico, troubleshooting |
| [equipamentos/](equipamentos/) | Datasheets, specs de hardware |
| [padroes/](padroes/) | Regras de codigo, convencoes |
| [decisoes/](decisoes/) | Historico de decisoes tecnicas |
| [referencias/](referencias/) | Docs externos (ESPHome, HA, etc) |

---

## Referencias Externas

| Tecnologia | Local |
|------------|-------|
| ESPHome | [referencias/esphome/](referencias/esphome/) |
| Home Assistant Custom Cards | [referencias/home-assistant/custom-cards/](referencias/home-assistant/custom-cards/) |

---

## Como Contribuir

1. Cada pasta tem seu README.md explicando o conteudo
2. Novos documentos seguem nomenclatura: `nome-descritivo.md` (minusculas, hifens)
3. Decisoes tecnicas vao em `decisoes/` com formato `YYYY-MM-DD-descricao.md`
4. Atualize este indice ao adicionar novos documentos

---

## Migracao

**Status:** Concluido (alteracao01)

Documentos migrados de:
- `Documentacao/` → `docs/`
- `Conversas/` → `docs/decisoes/`
- `Firmware/` → `src/firmware/`
- `Home-Assistant/` → `src/homeassistant/`
- `Implementacao/` → `tracking/`
