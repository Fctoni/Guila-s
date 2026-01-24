# Alteracoes Necessarias no PRD - Alteracao 03

**Data:** 2026-01-24
**Referencia:** `spec-alteracao03.md`

---

## RESUMO DAS ALTERACOES

| # | Alteracao | Secoes Afetadas |
|---|-----------|-----------------|
| 1 | Dashboard Principal HA | Software, Funcionalidades |
| 2 | Helpers de Simulacao | Software |
| 3 | Templates Button-Card | Software |
| 4 | Integracao Cortinas Dashboard | Funcionalidades |

---

## ALTERACAO 1: Dashboard Principal Home Assistant

### **Software > Dashboards** (NOVA SUBSECAO)

Adicionar apos "Versionamento":

```markdown
### Dashboards Home Assistant

#### Dashboard Principal
- **Arquivo**: `src/homeassistant/dashboards/principal.yaml`
- **Alvo**: Tablet 1340x800 (vertical)
- **Componente HACS**: `custom:button-card`
- **Layout**:
  - Chips de pessoas (status presenca)
  - Pills de comodos (status portas)
  - Grid 4x4 de ambientes com badges dinamicos
  - Secao de cortinas com controle abrir/parar/fechar

#### Templates Reutilizaveis
- **Arquivo**: `src/homeassistant/config/button_card_templates.yaml`
- **Templates disponiveis**:
  - `chip_pessoa` - Chips de pessoas com foto e status
  - `pill_comodo` - Pills de status de portas
  - `card_ambiente` - Card base com badges
  - `card_portao` - Card de portoes com lock
  - `card_dispositivo` - Card on/off com check
  - `card_jardim` - Card com porcentagem
  - `card_cortina_compacto` - Card cortina integrado
  - `cover_cortina` - Template base cortinas
```

---

## ALTERACAO 2: Helpers de Simulacao

### **Software > Helpers** (NOVA SUBSECAO)

Adicionar apos "Dashboards Home Assistant":

```markdown
### Helpers para Desenvolvimento/Testes

#### input_boolean (18 entidades)
- **Arquivo**: `src/homeassistant/config/input_boolean.yaml`
- **Funcao**: Simular sensores on/off durante desenvolvimento
- **Categorias**:
  - Portas/Portoes (8): garagem, social, porta, servico, lavanderia, sala_f, dispensa, cozinha
  - Presenca (4): frente, sala, master, jp
  - Pessoas (4): gui, jp, ana, m
  - Dispositivos (2): pendente_sala, alexa

#### input_number (13 entidades)
- **Arquivo**: `src/homeassistant/config/input_number.yaml`
- **Funcao**: Simular contadores durante desenvolvimento
- **Categorias**:
  - Luzes (4): frente, sala, social, jp
  - Equipamentos (4): sala, social, master, jp
  - Outros (5): jp_alertas, jardim_umidade, jardim_sensores, passarela_sensores, alexa_notificacoes
```

---

## ALTERACAO 3: Paleta de Cores Padrao

### **Software > UI/UX** (NOVA SUBSECAO)

Adicionar apos "Helpers para Desenvolvimento/Testes":

```markdown
### Paleta de Cores (UI Dashboards)

| Elemento | Cor HEX | RGBA |
|----------|---------|------|
| Badge luzes | #ffaa28 | rgba(255,170,40,1) |
| Badge equipamentos | #007aff | rgba(0,122,255,1) |
| Badge alerta | #ff3b30 | rgba(255,59,48,0.95) |
| Lock fechado | #30d158 | rgba(48,209,88,0.7) |
| Lock aberto | #ff3b30 | rgba(255,59,48,0.95) |
| Fundo card | - | rgba(28,60,72,0.92) |
| Fundo geral | #1a3a40 | - |
| Borda cards | - | rgba(255,255,255,0.40) |
| Texto principal | - | rgba(255,255,255,0.85) |
| Texto secundario | - | rgba(240,240,240,0.65) |
```

---

## ALTERACAO 4: Cortinas na Dashboard Principal

### **Funcionalidades Detalhadas > Persianas** (ATUALIZAR)

Adicionar ao final da secao "Persianas":

```markdown
#### Cortinas Motorizadas (Terreo)
- **Quantidade**: 4 cortinas
- **Controle**: ESP32 via ESPHome (time-based cover)
- **Entidades**:
  - `cover.cortina_estar`
  - `cover.cortina_jantar`
  - `cover.cortina_office`
  - `cover.cortina_reserva`
- **Dashboard**: Integradas na dashboard principal com botoes abrir/parar/fechar
- **Firmware**: `src/firmware/cortinas/terreo/esp-cortinas-terreo.yaml`
```

---

## CHECKLIST DE ATUALIZACAO

### Software
- [ ] Adicionar subsecao "Dashboards Home Assistant"
- [ ] Adicionar subsecao "Helpers para Desenvolvimento/Testes"
- [ ] Adicionar subsecao "Paleta de Cores (UI Dashboards)"

### Funcionalidades
- [ ] Atualizar secao "Persianas" com cortinas motorizadas

### Header
- [ ] Atualizar versao para proxima minor (ver versao atual)
- [ ] Atualizar data ultima atualizacao
- [ ] Adicionar changelog

---

## CHANGELOG SUGERIDO

```
- **24/01/2026**:
  - Dashboard principal HA: layout para tablet, templates button-card, badges dinamicos
  - Helpers de simulacao: 18 input_boolean + 13 input_number para desenvolvimento
  - Paleta de cores padrao para dashboards
  - Cortinas motorizadas (4 unidades) integradas na dashboard principal
```
