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

## ANTES de escrever YAML ESPHome

OBRIGATORIO: Chame o agente `esphome` para consulta.
NAO escreva codigo sem este passo, mesmo que exista exemplo.

> Conhecimento do Claude sobre ESPHome: ate versao 2024.12.x | Versao alvo: 2026.1.x
> O projeto NÃO USA 'encryption' no componente API. Usar somente api:
> O projeto NÃO USA 'password' no componente OTA. Usar somente ota: e especificar a 'platform:'

### Fluxo de Trabalho ESPHome

O agente `esphome` e um **consultor de documentacao**, NAO um executor.

**Fluxo correto:**
```
1. Usuario pede tarefa ESPHome
2. Claude chama agente esphome para consultar MUDANÇAS na documentacao a partir da versão que o Claude tem conhecimento.
3. Agente retorna: componentes, breaking changes, sintaxe, exemplos
4. Claude apresenta informacoes ao usuario
5. Claude discute abordagem e faz plano
6. Usuario valida
7. Claude executa (com contexto atualizado)
```

**Quando usar o agente:**
- Antes de desenvolver qualquer firmware ESPHome
- Para verificar breaking changes de componentes
- Para obter sintaxe atualizada de componentes (somente os que tiveram modificações)
- Para descobrir novas features/opcoes

**O agente so tem acesso a:** `Read`, `Glob`, `Grep`
**O agente NAO pode:** editar, criar arquivos, executar comandos

### Exemplo de Prompt para o Agente ESPHome 

**ERRADO** - Pede sintaxe de tudo:
```
Preciso configurar ESP32 com API, OTA, MCP23017 e PWM.
Para cada componente, preciso saber:
- Sintaxe atualizada (2026.1.x)
- Exemplos de configuracao
```
Problema: Pede sintaxe de componentes que o Claude ja conhece.

**CORRETO** - Foca em mudancas:
```
Preciso configurar ESP32 com os componentes: API, OTA, MCP23017, LEDC.
Verifique na documentacao:
- Quais tiveram BREAKING CHANGES desde 2024.12.x?
- Quais tiveram mudancas de sintaxe?
- Para componentes SEM mudancas, responda apenas o status.
- Retorne sintaxe APENAS dos que mudaram.
```

## Agentes Disponiveis
Use os prompts em .claude/agents/ para tarefas especificas:
- docs.md - Atualizacao de documentacao
- esphome.md - **Consulta** de documentacao ESPHome (somente leitura)
- homeassistant.md - Automacoes e dashboards
- infra.md - Infraestrutura e rede
- review.md - Revisao de codigo

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
