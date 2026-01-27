# Projeto Guila's - Instrucoes para Claude Code

## Contexto
Automacao residencial premium 100% local para Casa Le Parc.
Leia PROJECT-CONTEXT.md para visao completa.

## Estrutura do Workspace

```
docs/           - Toda documentacao
src/            - Todo codigo fonte
  firmware/     - ESPHome (ESP32)
  homeassistant/- Config e automacoes HA
hardware/       - Esquematicos, PCBs, BOMs
scripts/        - Deploy, backup, monitoring
tracking/       - Fases, alteracoes, bugs
assets/         - Fonts, images
external/       - Codigo de terceiros
archive/        - Arquivos antigos
```

## Arquivos Importantes
- PROJECT-CONTEXT.md - Contexto e decisoes tecnicas
- docs/decisoes/pendencias.md - Lista de pendencias ativas
- CHANGELOG.md - Historico de mudancas
- docs/README.md - Indice de toda documentacao

## ESPHome

> Conhecimento do Claude tem corte em maio/2025. Versao alvo: 2026.1.x

**Para qualquer tarefa ESPHome**, delegue ao agente `esphome`.
O agente tem o fluxo completo de consulta a documentacao atualizada.

## Agentes Disponiveis
Use os prompts em .claude/agents/ para tarefas especificas:
- docs.md - Atualizacao de documentacao
- esphome.md - Desenvolvimento de firmware
- homeassistant.md - Automacoes e dashboards
- infra.md - Infraestrutura e rede
- review.md - Revisao de codigo

## Auditoria de Agentes

*Esta auditoria é OBRIGATÓRIA, independente de qualquer coisa.

### REGRA CRITICA
**NUNCA apresente o auto-relato do agente como auditoria.**
O retorno do Task tool contem apenas o que o agente DIZ ter feito.
A auditoria DEVE ser baseada no log real (arquivo .jsonl).

### Logs de Subagentes
Apos executar um agente via Task tool, o log completo fica em:
```
~/.claude/projects/[projeto-slug]/[sessao-id]/subagents/agent-[agentId].jsonl
```

Onde:
- `projeto-slug`: Nome do projeto com barras substituidas por hifens
  - Exemplo: `C--Users-Toniezzer-PC-Meu-Drive-cursor-automacao-Guilas`
- `sessao-id`: UUID da sessao atual (visivel no scratchpad path do system prompt)
- `agentId`: ID retornado pelo Task tool (ex: ae74fa4)

**IMPORTANTE (Windows):** No Git Bash, use `/c/Users/...` (NAO `/mnt/c/...`).

### Procedimento Obrigatorio

**PASSO 1: Localizar o log**
```bash
# Montar o caminho usando o agentId retornado
ls ~/.claude/projects/C--Users-Toniezzer-PC-Meu-Drive-cursor-automacao-Guilas/*/subagents/agent-[agentId].jsonl
```

**PASSO 2: Se NAO conseguir acessar o log**
- Informar ao usuario que nao foi possivel auditar
- Explicar que o resumo apresentado e apenas o AUTO-RELATO do agente
- NAO apresentar tabelas como se fossem auditoria verificada

**PASSO 3: Se conseguir acessar o log**
Extrair tools e arquivos REAIS:
```bash
# Listar tools usadas
grep -o '"type":"tool_use"[^}]*"name":"[^"]*"' agent-XXX.jsonl | grep -o '"name":"[^"]*"' | cut -d'"' -f4

# Listar arquivos acessados
grep -o '"file_path":"[^"]*"' agent-XXX.jsonl | cut -d'"' -f4
```

**PASSO 4: Apresentar auditoria verificada**
1. **Tabela de tools usadas** (extraida do log real)
2. **Comparacao** com o que o agente disse ter feito
3. **Avaliacao** se seguiu as instrucoes do agente

Exemplo de formato:
```
## Auditoria Verificada - Agente [id]

| # | Tool | Arquivo |
|---|------|---------|
| 1 | Read | changelog/lights-leds.md |
| 2 | Write | esp-device.yaml |

Fonte: ~/.claude/projects/.../subagents/agent-XXX.jsonl
```

## Padroes de Codigo
Ver `docs/padroes/regras_codigo.md` para:
- Validacao ESPHome e Home Assistant
- Boas praticas YAML
- Exemplos de onde buscar padroes

Para conversas com IA: `tracking/alteracoes/0-regras_conversas.md`

## Padroes Obrigatorios
- Datas: ISO 8601 (YYYY-MM-DD)
- Arquivos: Sem acentos, hifens para separar
- Commits: Mensagens em portugues, descritivas
- Emoji: Pronto / Andamento / Bloqueado
