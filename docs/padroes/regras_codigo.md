# Regras de Codigo

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
| Novo firmware ESP32 | `src/firmware/` - ver dispositivos existentes (cortinas, sensores, etc.) |
| Configs comuns ESPHome | `src/firmware/common/` - packages e configs reutilizaveis |
| Dashboard Home Assistant | `src/homeassistant/dashboards/` - ver dashboards existentes |
| Custom component HA | `src/homeassistant/custom_components/` - ver componentes existentes |
| Documentacao tecnica | `docs/arquitetura/` - arquitetura do sistema |
| Scripts de setup/monitoramento | `scripts/` - ver scripts existentes |
| Esquematicos/PCB | `hardware/esquematicos/` e `hardware/pcb/` |

## Boas praticas ESPHome

### Estrutura de arquivos

- Use `packages:` para reutilizar configuracoes comuns
- Centralize substitutions no topo do arquivo
- Separe configs por funcionalidade (wifi, sensores, displays, etc.)

### Exemplo de estrutura padrao

```yaml
substitutions:
  device_name: "meu-dispositivo"
  friendly_name: "Meu Dispositivo"

packages:
  wifi: !include ../common/wifi.yaml
  base: !include ../common/base.yaml

# Configuracoes especificas do dispositivo abaixo
```

### Referencias de implementacao

- `src/firmware/common/` - templates e packages reutilizaveis
- `src/firmware/sensores/` - exemplo de dispositivo com sensores
