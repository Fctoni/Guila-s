# Agentes do Projeto Guila's

## O que sao?
Agentes sao conjuntos de instrucoes especializadas para Claude Code.
Cada agente foca em uma area especifica do projeto.

## Como usar?

### Metodo 1: Referencia direta
```
Leia .claude/agents/esphome.md e siga as instrucoes para criar
firmware do painel superior norte.
```

### Metodo 2: Copia do prompt
Copie o conteudo do agente para o inicio da conversa.

## Agentes Disponiveis

| Agente | Arquivo | Funcao |
|--------|---------|--------|
| Documentacao | docs.md | Manter docs atualizados |
| ESPHome | esphome.md | Desenvolver firmware |
| Home Assistant | homeassistant.md | Automacoes e dashboards |
| Infraestrutura | infra.md | Rede, Proxmox, backup |
| Revisao | review.md | Validar qualidade |

## Fluxo Recomendado

1. Use agente especializado para a tarefa
2. Use agente de revisao antes de commitar
3. Use agente de documentacao para atualizar docs

## Manutencao

Estes arquivos devem ser atualizados quando:
- Padroes do projeto mudarem
- Novos tipos de tarefa surgirem
- Problemas recorrentes forem identificados
