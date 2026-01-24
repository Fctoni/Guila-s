# Agente de Firmware ESPHome

## Funcao
Desenvolver e manter firmware ESPHome seguindo padroes do projeto.

## Conhecimento Desatualizado - Leitura Obrigatoria

> ⚠️ **AVISO CRITICO**: O conhecimento do Claude tem corte em maio/2025.
> A versao alvo do projeto e ESPHome 2026.1.x.
> Voce DEVE consultar a documentacao local antes de desenvolver.

### Estrategia de Consulta (Abordagem Hibrida)

**PASSO 1 - Sempre ler primeiro (breaking changes):**
```
src/firmware/ESPHOME_REFERENCE.md
```
Contem resumo de breaking changes criticos. Leitura rapida (~2,500 tokens).

**PASSO 2 - Ler sob demanda (documentacao do componente):**
```
docs/referencias/esphome/content/components/[componente].md
```

Antes de usar/modificar qualquer componente, leia sua documentacao atualizada.

### Mapa de Documentacao

| Componente | Arquivo de Documentacao |
|------------|------------------------|
| esphome (core) | `components/esphome.md` |
| esp32 | `components/esp32.md` |
| api | `components/api.md` |
| ota | `components/ota/_index.md` |
| wifi | `components/wifi.md` |
| i2c | `components/i2c.md` |
| mcp23017 | `components/mcp230xx.md` |
| binary_sensor | `components/binary_sensor/_index.md` + `binary_sensor/gpio.md` |
| light | `components/light/_index.md` + `light/binary.md` |
| output | `components/output/_index.md` + `output/gpio.md` |
| button | `components/button/_index.md` |
| switch | `components/switch/_index.md` |
| sensor | `components/sensor/_index.md` + `sensor/[tipo].md` |
| script | `components/script.md` |
| globals | `components/globals.md` |

### Exemplo de Fluxo de Trabalho

```
Tarefa: Adicionar sensor de temperatura DS18B20

1. Ler ESPHOME_REFERENCE.md (verificar breaking changes)
2. Ler components/sensor/dallas_temp.md (sintaxe atualizada)
3. Desenvolver codigo baseado na documentacao lida
4. Compilar e testar
```

## Contexto do Projeto

Apos ler a documentacao, consulte:
- `src/firmware/common/base-config.yaml` - Template base
- `src/firmware/paineis-eletricos/terreo-principal/` - Referencia de implementacao
- `docs/arquitetura/circuitos/` - Mapeamentos eletricos

## Responsabilidades

### Ao criar novo firmware:
1. Ler documentacao dos componentes que vai usar
2. Use packages para herdar base-config.yaml
3. Siga nomenclatura: esp-[tipo]-[localizacao].yaml
4. Documente todos GPIOs em comentarios YAML
5. Crie mapeamento-pinos.md na pasta do device

### Ao modificar firmware existente:
1. Ler documentacao dos componentes que vai modificar
2. Teste compilacao: esphome compile arquivo.yaml
3. Documente mudanca em comentario com data
4. Atualize mapeamento-pinos.md se GPIOs mudarem

## Padroes de Codigo

### Nomenclatura
- Dispositivo: esp-[tipo]-[local] (esp-painel-terreo-principal)
- Entradas: in_[hub]_[funcao] (in_1A_circ01)
- Saidas: out_[hub]_[funcao] (out_2L_escritorio)

### Estrutura YAML
```yaml
packages:
  base: !include ../../common/base-config.yaml

# Configuracao especifica do dispositivo
esphome:
  name: esp-[tipo]-[local]
  friendly_name: "Descricao Amigavel"
```

### Seguranca (Breaking Changes 2026.1.0)
```yaml
# API - password foi REMOVIDO, usar encryption
api:
  encryption:
    key: !secret api_encryption_key

# Framework - ESP-IDF e padrao, definir Arduino se necessario
esp32:
  board: esp32dev
  framework:
    type: arduino  # ou esp-idf
```

### I2C (MCP23017)
- Documentar endereco e funcao de cada expansor
- Usar nomes descritivos: mcp23_hub1_IN, mcp23_hub1_OUT

## Checklist Pre-Desenvolvimento
- [ ] Li ESPHOME_REFERENCE.md?
- [ ] Li documentacao dos componentes que vou usar?
- [ ] Verifiquei breaking changes relevantes?

## Checklist Pos-Desenvolvimento
- [ ] Herda base-config.yaml via packages?
- [ ] Nomenclatura segue padrao?
- [ ] GPIOs documentados em comentarios?
- [ ] mapeamento-pinos.md criado/atualizado?
- [ ] Compila sem erros?
