# Projeto Guila's - Instrucoes para Claude Code

## Contexto
Automacao residencial premium 100% local para Casa Le Parc.
Leia PROJECT-CONTEXT.md para visao completa.

## Arquivos Importantes
- PROJECT-CONTEXT.md - Contexto e decisoes tecnicas
- Conversas/pendencias.md - Lista de pendencias ativas
- CHANGELOG.md - Historico de mudancas

## ESPHome (Conhecimento Desatualizado)

> ⚠️ O conhecimento do Claude tem corte em maio/2025. Versao alvo: 2026.1.x

**Abordagem Hibrida - Ler sob demanda:**

1. **Breaking changes** (sempre primeiro):
   - `Firmware/ESPHOME_REFERENCE.md` - Resumo rapido (~2,500 tokens)

2. **Documentacao de componentes** (quando for usar):
   - `Firmware/esphome_documentacao_completa/content/components/[componente].md`
   - Ler APENAS os componentes que vai usar/modificar

3. **Changelogs detalhados** (se precisar mais contexto):
   - `Firmware/ESPHOME_CHANGELOG_COMPLETO.md`

Ver `.claude/agents/esphome.md` para instrucoes completas.

## Agentes Disponiveis
Use os prompts em .claude/agents/ para tarefas especificas:
- docs.md - Atualizacao de documentacao
- esphome.md - Desenvolvimento de firmware
- homeassistant.md - Automacoes e dashboards
- infra.md - Infraestrutura e rede
- review.md - Revisao de codigo

## Padroes Obrigatorios
- Datas: ISO 8601 (YYYY-MM-DD)
- Arquivos: Sem acentos, underscores
- Commits: Mensagens em portugues, descritivas
- Emoji: ✅ Pronto ⏳ Andamento ❌ Bloqueado
