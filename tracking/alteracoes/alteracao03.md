# Alteração 03 - Dashboard Principal Home Assistant

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟢 Finalizado |
| Origem | Imagem de referência de dashboard existente |
| Complexidade | 🟡 Média |
| Especificação | [spec-alteracao03.md](./spec-alteracao03.md) |

---

## 1. Ideia Inicial

Traduzir o HTML de preview (`assets/dashboard-preview.html`) para uma dashboard funcional do Home Assistant usando `custom:button-card`.

Referência visual: screenshot de dashboard existente com:
- Chips de pessoas no topo
- Pills de cômodos rápidos (status de portas)
- Grid 4x4 de cards de ambientes com badges dinâmicos
- Indicadores de luzes, equipamentos, presença, clima

Código de referência: button-card do card "Sala" foi fornecido como base.

---

## 2. Conversa de Planejamento

#### usuário: Solicita tradução do HTML para HA, pergunta sobre entidades auxiliares para simulação

Sim, é absolutamente possível criar **entidades auxiliares (helpers)** para simular o comportamento real. O Home Assistant suporta nativamente:

### Helpers disponíveis para simulação

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `input_boolean` | Simular sensores on/off | Portas abertas, presença detectada |
| `input_number` | Simular contadores | Luzes ligadas (0-20), temperatura |
| `input_select` | Simular estados | Clima (off/cool/heat), TV (off/playing) |
| `counter` | Incrementar/decrementar | Quantidade de equipamentos |
| `template sensor` | Calcular valores | "73%" do jardim, contagem agregada |

### Estrutura proposta

```
src/homeassistant/
├── config/
│   ├── configuration.yaml      # Referência aos includes
│   ├── helpers_simulacao.yaml  # Helpers para teste
│   └── button_card_templates.yaml  # Templates dos cards
└── dashboards/
    └── principal.yaml          # Dashboard principal
```

### Comportamento interativo

Os helpers permitem:
1. **Clicar no badge** → alterna o estado (ex: porta abre/fecha)
2. **Clicar no card** → navega para subview (simulado como toggle)
3. **Estados visuais** → mudam cores conforme valores

### Próximos passos

1. Desenhar a UI proposta (seção 3)
2. Definir lista completa de entidades/helpers
3. Criar templates reutilizáveis de button-card
4. Implementar

Posso seguir com o desenho da UI e a lista de helpers necessários?

---

#### usuário:

##### Opcional: 
- usar mushroom card também se necessário para alguma função extra
- usar o screenshot @referencia-dashboard-mauro.jpeg como referência também

##### Obrigatório:
- Considerar que essa dashboard será usada na vertical, em um tablet com dimensões 1340x800
- Todos botões devem ser funcionais e simular o acionamento de entidades reais (que serão entidades auxiliares neste teste)
- Verificar se as cores que você sugeriu para a UI são parecidas com as cores do arquivo de referência
- As 4 cortinas que já temos funcionando, devem entrar nesse projeto como entidades reais (ver src\firmware\cortinas\terreo\esp-cortinas-terreo.yaml)

---

#### IA: Análise completa dos requisitos

### Cortinas Reais Identificadas

Do arquivo `src/firmware/cortinas/terreo/esp-cortinas-terreo.yaml`:

| Entidade HA | Nome | Tipo |
|-------------|------|------|
| `cover.cortina_estar` | Cortina Estar | cover (time_based) |
| `cover.cortina_jantar` | Cortina Jantar | cover (time_based) |
| `cover.cortina_office` | Cortina Office | cover (time_based) |
| `cover.cortina_reserva` | Cortina Reserva | cover (time_based) |

### Verificação de Cores (Referência vs HTML)

| Elemento | Cor Referência | Cor HTML | Status |
|----------|----------------|----------|--------|
| Badge luzes | `#ffaa28` | `#ffaa28` | ✅ OK |
| Badge equipamentos | `#007aff` | `#007aff` | ✅ OK |
| Badge alerta | `#ff3b30` | `#ff3b30` | ✅ OK |
| Lock fechado | `#30d158` | `#30d158` | ✅ OK |
| Fundo card | `rgba(28,60,72,0.92)` | idêntico | ✅ OK |
| Fundo geral | `#1a3a40` | `#1a3a40` | ✅ OK |
| Borda cards | `rgba(255,255,255,0.40)` | idêntico | ✅ OK |

### Dimensões Tablet (1340x800 vertical)

- **Grid:** 4 colunas × ~160px cada
- **Chips pessoas:** 4 visíveis com scroll horizontal
- **Espaçamento:** 10-12px entre cards

### Lista Completa de Helpers

#### input_boolean (on/off)
```yaml
# Portas/Portões (simulação)
input_boolean.garagem_aberta
input_boolean.social_aberta
input_boolean.porta_aberta
input_boolean.servico_aberta
input_boolean.lavanderia_porta
input_boolean.sala_f_porta
input_boolean.dispensa_porta
input_boolean.cozinha_porta

# Presença
input_boolean.frente_presenca
input_boolean.sala_presenca
input_boolean.master_presenca
input_boolean.jp_presenca

# Pessoas
input_boolean.gui_em_casa
input_boolean.jp_em_casa
input_boolean.ana_em_casa
input_boolean.m_em_casa

# Dispositivos
input_boolean.pendente_sala_ligado
input_boolean.alexa_ativa
```

#### input_number (contadores)
```yaml
input_number.frente_luzes          # 0-20
input_number.sala_luzes            # 0-20
input_number.sala_equipamentos     # 0-20
input_number.social_luzes          # 0-20
input_number.social_equipamentos   # 0-20
input_number.master_equipamentos   # 0-10
input_number.jp_luzes              # 0-10
input_number.jp_equipamentos       # 0-10
input_number.jp_alertas            # 0-5
input_number.jardim_umidade        # 0-100 (para 73%)
input_number.jardim_sensores       # 0-20
input_number.passarela_sensores    # 0-10
input_number.alexa_notificacoes    # 0-10
```

#### Entidades Reais (NÃO criar helpers)
```yaml
cover.cortina_estar
cover.cortina_jantar
cover.cortina_office
cover.cortina_reserva
```

### Proposta: Adicionar seção de Cortinas na Dashboard

Sugiro incluir uma 5ª linha no grid com as cortinas reais:

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ ▭ 45%    │ │ ▭ 0%     │ │ ▭ 100%   │ │ ▭ --     │
│ Estar    │ │ Jantar   │ │ Office   │ │ Reserva  │
│[▲][■][▼] │ │[▲][■][▼] │ │[▲][■][▼] │ │[▲][■][▼] │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

**Aprovado incluir as cortinas no layout?**

---

#### usuário: Aprova inclusão das cortinas no layout

---

#### IA: UI atualizada com linha de cortinas

## 3. UI Proposta (Rascunho)

### 3.1 Layout Geral da Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DASHBOARD PRINCIPAL                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    ← PESSOAS (chips)   │
│  │👤 Gui   │ │👤 JP    │ │👤 Ana   │ │👤 M     │                        │
│  │Passarel │ │Em casa  │ │Em casa  │ │Em...    │                        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                        │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ← CÔMODOS PILLS   │
│  │🔒 Lavand │ │🔓 Sala F │ │🔒 Dispen │ │🔒 Cozinha│                    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                    │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ← PORTÕES         │
│  │🔒        │ │🔒  [2][6]│ │🔒        │ │🔒        │                    │
│  │ 🛋️       │ │ 🚪       │ │ 🚪       │ │ ▦        │                    │
│  │ Garagem  │ │ Social   │ │ Porta    │ │ Serviço  │                    │
│  │ ↓ Abrir  │ │ ↓ Abrir  │ │ ↓ Abrir  │ │ ↓ Abrir  │                    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                    │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ← AMBIENTES       │
│  │     [12] │ │    [2][6]│ │       [1]│ │[1]  [4]  │                    │
│  │ 🏠       │ │ 🛋️       │ │ 👫       │ │[3]  🛴   │                    │
│  │ Frente   │ │ Sala     │ │ Master   │ │ JP       │                    │
│  │Click p/Ir│ │Click p/Ir│ │Click p/Ir│ │Click p/Ir│                    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                    │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ← OUTROS          │
│  │       ✓  │ │[73%] [9] │ │          │ │    [1]   │                    │
│  │ 💡       │ │ 🌱       │ │ 💦       │ │[1]  🏢   │                    │
│  │Pend.Sala │ │ Jardim   │ │Irrigação │ │Passarela │                    │
│  │↓ Deslig. │ │Click p/Ir│ │Click p/Ir│ │Click p/Ir│                    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                    │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                 │
│  │       [1]│ │          │ │          │  ← MÍDIA/NAVEGAÇÃO              │
│  │ 🅰️       │ │ 🎵       │ │ →        │                                 │
│  │ Alexa    │ │ Spotify  │ │Principal │                                 │
│  │Click p/Ir│ │Click p/Ir│ │Click p/Ir│                                 │
│  └──────────┘ └──────────┘ └──────────┘                                 │
│                                                                          │
│  ════════════════════ CORTINAS (REAIS) ════════════════════             │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ← CORTINAS        │
│  │ ▭ 45%    │ │ ▭ 0%     │ │ ▭ 100%   │ │ ▭ --     │                    │
│  │  Estar   │ │  Jantar  │ │  Office  │ │ Reserva  │                    │
│  │[▲][■][▼] │ │[▲][■][▼] │ │[▲][■][▼] │ │[▲][■][▼] │                    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Legenda de Badges

| Badge | Cor | Significado |
|-------|-----|-------------|
| `[N]` laranja | #ffaa28 | Luzes ligadas |
| `[N]` azul | #007aff | Equipamentos ligados |
| `[N]` vermelho | #ff3b30 | Alerta (porta aberta indevida) |
| `🔒` verde | #30d158 | Porta/portão fechado |
| `🔓` vermelho | #ff3b30 | Porta/portão aberto |
| `✓` verde | #30d158 | Dispositivo ligado (pendente) |

### 3.3 Cards de Cortinas (Entidades Reais)

| Elemento | Descrição |
|----------|-----------|
| `▭` | Ícone de cortina (mdi:blinds-horizontal) |
| `45%` | Posição atual (0% = fechada, 100% = aberta) |
| `[▲]` | Botão abrir (cover.open_cover) |
| `[■]` | Botão parar (cover.stop_cover) |
| `[▼]` | Botão fechar (cover.close_cover) |

**Comportamento visual:**
- Abrindo: ícone pisca + texto "Abrindo..."
- Fechando: ícone pisca + texto "Fechando..."
- Aberta 100%: cor azul clara
- Fechada 0%: cor cinza

**Entidades:**
- `cover.cortina_estar`
- `cover.cortina_jantar`
- `cover.cortina_office`
- `cover.cortina_reserva`

**Status:** 🟡 Aguardando aprovação da UI completa

---

## 4. Decisões Importantes

- **Helpers para simulação**: Usar input_boolean, input_number, input_select
- **Estrutura modular**: Templates separados por tipo de card
- **Código de referência**: Button-card da "Sala" será base para os demais
- **Interatividade**: Badges clicáveis que alternam estados dos helpers

---

## 5. Checkpoints

*(Adicionados automaticamente em sessões longas)*
