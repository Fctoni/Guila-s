# Mudancas Propostas - 0-regras_conversas_alteracoes.md

## Resumo das alteracoes

| Secao | Acao | Motivo |
|-------|------|--------|
| Regras da conversa | Manter | Generico, funciona bem |
| Padroes do projeto | Ajustar | Remover termos React-especificos |
| Validacao | Reescrever | Trocar TypeScript por ESPHome/YAML |
| Exemplos de onde buscar padroes | OK | Ja atualizado |
| Modais que alteram dados | Remover/Substituir | Nao se aplica ao projeto |

---

## Arquivo proposto (versao completa)

```markdown
# Regras da conversa

Todas interacoes da conversa devem ser feitas dentro do **arquivo de alteracao** que referencia estas regras.
No Chat, limite-se a dizer 'OK' todas vez que voce preencher sua resposta, *nao gaste tokens escrevendo texto no chat.*

## Formatacao das respostas

- Faca um resumo da minha pergunta ao lado de '# usuario', em no maximo 1 linha
- Responda abaixo, dentro do arquivo de alteracao, no campo # IA:, adicionando um resumo da sua resposta de 1 linha tambem
- Apos dar sua resposta, preencha '# usuario: ' nas linhas seguintes, para ja ficar pronto para o usuario preencher sua proxima resposta
- Nao exclua o texto das minhas respostas. Faca o resumo ao lado de # usuario:, mas mantenha o que eu escrevi
- Mantenha a estrutura de markdown para ficar facil indexar a conversa posteriormente. Se tiver que separar em subtopicos, siga o fluxo # IA: -> ## Subtopico 1 -> ### Subtopico 2, e assim sucessivamente
- NUNCA estime o tempo estimado para realizacao de tarefas. Isso e totalmente irrelevante e gasta tokens.

---

# Regras de codigo

## Padroes do projeto

Antes de implementar qualquer funcionalidade, SEMPRE:

1. **Pesquise exemplos existentes** no projeto que facam algo similar ao que sera implementado
2. **Siga os padroes encontrados**: estrutura de arquivos, nomenclatura, organizacao de configs
3. **Mantenha consistencia** com o estilo de codigo existente (indentacao, formatacao YAML, etc.)
4. **Reutilize** packages, substitutions e templates ja existentes ao inves de criar novos

## Validacao

### ESPHome (firmware)
- Antes de fazer upload, SEMPRE valide a configuracao:
  ```bash
  esphome config <arquivo>.yaml
  ```
- Se houver erros de YAML ou configuracao, corrija-os antes de prosseguir
- Use `esphome compile <arquivo>.yaml` para verificar compilacao sem upload

### Home Assistant (automacoes/dashboards)
- Valide configuracoes YAML antes de recarregar:
  ```bash
  ha core check
  ```
- Teste automacoes em modo de desenvolvimento antes de ativar em producao

### YAML em geral
- Use extensao YAML no VSCode para validacao em tempo real
- Mantenha indentacao consistente (2 espacos)
- Evite duplicacao de chaves

## Exemplos de onde buscar padroes

| O que implementar | Onde buscar referencia |
|-------------------|------------------------|
| Novo firmware ESP32 | `Firmware/` - ver dispositivos existentes (Cortinas, Sensores, etc.) |
| Configs comuns ESPHome | `Firmware/common/` - packages e configs reutilizaveis |
| Dashboard Home Assistant | `Home-Assistant/dashboards/` - ver dashboards existentes |
| Custom component HA | `Home-Assistant/custom_components/` - ver componentes existentes |
| Documentacao tecnica | `Documentacao/03-Arquitetura/` - arquitetura do sistema |
| Scripts de setup/monitoramento | `Scripts/` - ver scripts existentes |
| Esquematicos/PCB | `Hardware/Esquematicos/` e `Hardware/PCB/` |

## Boas praticas ESPHome

### Estrutura de arquivos
- Use `packages:` para reutilizar configuracoes comuns
- Centralize substitutions no topo do arquivo
- Separe configs por funcionalidade (wifi, sensores, displays, etc.)

### Exemplo de estrutura padrao:
```yaml
substitutions:
  device_name: "meu-dispositivo"
  friendly_name: "Meu Dispositivo"

packages:
  wifi: !include ../common/wifi.yaml
  base: !include ../common/base.yaml

# Configuracoes especificas do dispositivo abaixo
```

### Referencia de implementacao:
- `Firmware/common/` - templates e packages reutilizaveis
- `Firmware/ESP32-Sensores/` - exemplo de dispositivo com sensores
```

---

## Diferencas detalhadas

### Secao "Padroes do projeto" - ANTES:
```
2. **Siga os padroes encontrados**: estrutura de arquivos, nomenclatura, organizacao de componentes, hooks, tipos, etc.
4. **Reutilize** componentes, hooks e funcoes utilitarias ja existentes ao inves de criar novos
```

### Secao "Padroes do projeto" - DEPOIS:
```
2. **Siga os padroes encontrados**: estrutura de arquivos, nomenclatura, organizacao de configs
4. **Reutilize** packages, substitutions e templates ja existentes ao inves de criar novos
```

---

### Secao "Validacao" - ANTES:
```
- NUNCA utilizar 'any' nas declaracoes typescript
- Apos qualquer execucao, SEMPRE teste o typescript atraves do comando: `npx tsc --noEmit 2>&1 | Select-Object`
- Se houver erros de TypeScript, corrija-os antes de prosseguir
```

### Secao "Validacao" - DEPOIS:
```
### ESPHome (firmware)
- Antes de fazer upload, SEMPRE valide a configuracao:
  esphome config <arquivo>.yaml
- Se houver erros de YAML ou configuracao, corrija-os antes de prosseguir
- Use esphome compile <arquivo>.yaml para verificar compilacao sem upload

### Home Assistant (automacoes/dashboards)
- Valide configuracoes YAML antes de recarregar: ha core check
- Teste automacoes em modo de desenvolvimento antes de ativar em producao

### YAML em geral
- Use extensao YAML no VSCode para validacao em tempo real
- Mantenha indentacao consistente (2 espacos)
- Evite duplicacao de chaves
```

---

### Secao "Modais que alteram dados" - ANTES:
```
Ao implementar modais (Dialog) que criam, editam ou excluem dados:
... codigo TSX/React ...
```

### Secao "Modais que alteram dados" - DEPOIS:
```
(REMOVIDA - substituida por "Boas praticas ESPHome")
```

---

## Decisao

- [ ] Aprovar e aplicar todas as mudancas
- [ ] Aprovar parcialmente (especificar quais secoes)
- [ ] Rejeitar - manter arquivo original
- [ ] Sugerir outras alteracoes
