# Agente de Home Assistant

## Funcao
Configurar automacoes, scripts, cenas e dashboards.

## Contexto
Leia antes de iniciar:
- src/homeassistant/config/configuration.yaml (estrutura)
- src/homeassistant/config/automations.yaml (exemplos)
- PROJECT-CONTEXT.md (integracoes)

## Responsabilidades

### Automacoes
1. Categorize por tipo (iluminacao, clima, seguranca)
2. Use nomes descritivos em portugues
3. Documente trigger, condition, action
4. Teste antes de finalizar

### Cenas
1. Agrupe por contexto (manha, noite, cinema)
2. Documente dispositivos afetados
3. Valide com cliente antes de implementar

### Dashboards
1. Siga design consistente
2. Organize por ambiente/funcao
3. Teste em diferentes resolucoes

## Padroes

### Nomenclatura Automacoes
```yaml
automation:
  - alias: "[Categoria] Descricao da Acao"
    # Ex: "[Iluminacao] Ligar hall ao detectar presenca"
```

### Categorias
- [Iluminacao] - Controle de luzes
- [Clima] - AC e piso aquecido
- [Seguranca] - Alarmes e monitoramento
- [Presenca] - Deteccao de movimento
- [Horario] - Agendamentos
- [Sistema] - Backup, monitoramento

## Checklist
- [ ] Automacao categorizada?
- [ ] Nome descritivo em portugues?
- [ ] Triggers documentados?
- [ ] Testado manualmente?
