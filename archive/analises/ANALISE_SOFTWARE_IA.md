# Analise de Software e Automacao com IA - Projeto Guilas

**Projeto**: Guila's - Automacao Residencial Premium
**Data da Analise**: 2026-01-23 (Atualizado)
**Analista**: Claude Code (Opus 4.5)
**Versao**: 2.1

---

## Sumario Executivo

Este projeto implementa automacao residencial 100% local utilizando Home Assistant como hub central, com firmware ESPHome customizado para dispositivos IoT. O uso de IA atualmente e limitado a assistencia no desenvolvimento. Ha oportunidades significativas para implementar agentes inteligentes que otimizem energia, manutencao e experiencia do usuario.

**Status Geral**: Fase de Planejamento Avancado - Iniciando Prototipagem
**Localizacao**: Caxias do Sul - RS (Le Parc)

---

## 1. Sistemas de Automacao Identificados

### 1.1 Home Assistant (Hub Central)

| Aspecto | Detalhe |
|---------|---------|
| **Localizacao** | `/Home-Assistant/` |
| **Instalacao** | Home Assistant OS em VM Proxmox |
| **Specs** | 4 vCPUs, 4-8GB RAM, 32GB disco |
| **IP** | 192.168.10.10 (VLAN IoT Critico) |

**Arquivos de Configuracao**:
- `configuration.yaml` - Configuracao principal (template)
- `automations.yaml` - Regras de automacao (categorizado por tipo)
- `scripts.yaml` - Scripts customizados
- `scenes.yaml` - Cenas configuradas

**Integracoes Confirmadas**:
| Integracao | Status | Protocolo |
|------------|--------|-----------|
| Unifi Protect | Confirmado | Local |
| Unifi Network | Confirmado | Local |
| Shelly | Confirmado | WiFi/Local |
| WebOS (TV LG) | Confirmado | SSDP/100% Local |
| LG ThinQ (ACs) | Confirmado | Servidor LG (backup IR) |
| ESPHome | Confirmado | API nativa |

### 1.2 ESPHome (Firmware IoT)

| Aspecto | Detalhe |
|---------|---------|
| **Localizacao** | `/Firmware/` |
| **Versao Minima** | 2025.11.0 |
| **MCUs Suportados** | ESP32, ESP32-S3 |
| **Componentes** | I2C, WiFi, Ethernet, GPIO, Display LVGL |

**Estrutura de Firmware**:
```
Firmware/
├── common/base-config.yaml          # Template base (WiFi, API, OTA, Logger)
├── ESP32-Paineis-Eletricos/         # Paineis de comando
│   └── terreo-principal/
│       └── esp-painel-terreo-principal.yaml  # 539 linhas, funcional
├── ESP32-Paineis-Touch-7''/         # Interfaces touch
│   ├── lvgl-interface/
│   └── validacoes/
│       ├── claude_analise_viabilidade_layouts.md
│       └── gemini_analise_viabilidade_layouts.md
├── ESP32-Sensores/                  # Sensores presenca (LD2410)
└── ESP32-Tersmostatos/              # Termostatos custom
    └── codigo_esphome/
        └── termostato_480x480.yml
```

**Detalhes do Painel Eletrico Terreo** (Arquivo real analisado):
```yaml
# esp-painel-terreo-principal.yaml
Hardware:
  MCU: ESP32 (board: esp32dev)
  Framework: Arduino
  I2C: SDA=14, SCL=15

Expansores MCP23017:
  - 0x20 (mcp23_hub1_IN): 16 entradas
  - 0x21 (mcp23_hub1_OUT): 8 reles (pinos 8-15)
  - 0x25 (mcp23_hub2_OUT): 5 reles (pinos 8-12)
  - 0x26 (mcp23_hub3_IN): 8 entradas

Capacidades:
  - 24 entradas (circuitos luminotecnicos)
  - 13 saidas 220V (reles)
  - 11 circuitos LED 24V (futuro - Shelly RGBW2)

Recursos:
  - Web Server local
  - API Home Assistant (reboot_timeout: 0s)
  - OTA updates
  - Logger DEBUG
  - AP fallback (SSID: Guilas-Automacao)
```

**Circuitos Implementados**:
| Saida | Nome | Circuito Entrada |
|-------|------|------------------|
| out_2L | Iluminacao Escritorio | Circ 01 |
| out_2M | Pendente Escritorio | Circ 02 |
| out_2H | Iluminacao Hall Servico | Circ 10 |
| out_2Z | Iluminacao Banho Servico | Circ 11 |
| out_1V | Ilha Cozinha | Circ 13 |
| out_1W | Iluminacao Cozinha | Circ 14 |
| out_1T | Iluminacao Jantar | Circ 15 |
| out_1Q | Iluminacao Living | Circ 17 |
| out_1O | Extra | Circ 18 |
| out_1P | Iluminacao TV | Circ 19 |
| out_1N | Iluminacao Hall Principal | Circ 21 |
| out_1C | Iluminacao Degraus | Circ 22 |
| out_churras | Iluminacao Churrasqueira | Circ 50 |

### 1.3 Proxmox (Virtualizacao)

| Aspecto | Detalhe |
|---------|---------|
| **Hardware** | Mini-PC Beelink i3-1240P (12a gen) |
| **Funcao** | Host de VMs (HA, servicos) |
| **Backup** | Semanal automatico (domingo 3h) |
| **Scripts** | `/Scripts/backup.sh`, `/Scripts/deploy.sh` |

**Scripts de Automacao** (`Scripts/backup.sh`):
- Backup Home Assistant (Snapshot)
- Export para UGREEN via Samba Backup
- Backup Proxmox VM semanal
- Limpeza automatica (reter 7 dias)
- Notificacoes Telegram em caso de erro

### 1.4 Unifi (Rede e Seguranca)

| Componente | Funcao |
|------------|--------|
| **UDM-Pro SE** | Gateway, firewall, NVR (Protect) |
| **U7 APs** | WiFi 6 mesh |
| **VLANs** | 4 redes segregadas |

**Configuracao de VLANs**:
| VLAN | Nome | Dispositivos |
|------|------|--------------|
| 1 | Principal | Tablets, celulares, computadores |
| 10 | IoT Critico | ESP32s paineis, Home Assistant |
| 20 | IoT Sensores | Sensores, paineis touch |
| 30 | Visitantes | Guest WiFi |

---

## 2. WebApps e Aplicacoes

### 2.1 Lista de Compras (PWA)

| Aspecto | Detalhe |
|---------|---------|
| **Localizacao** | `/WebApps/lista-compras/` |
| **Stack** | HTML5 + CSS3 + JavaScript ES6+ |
| **Backend** | Firebase Firestore (real-time) |
| **Deploy** | Netlify |
| **Tipo** | Progressive Web App |

**Arquivos e Tamanhos**:
| Arquivo | Tamanho | Funcao |
|---------|---------|--------|
| `index.html` | - | Estrutura HTML5 |
| `style.css` | 14.2 KB | Estilos responsivos |
| `script.js` | 19.2 KB | Logica Firebase + CRUD |
| `sw.js` | - | Service Worker (offline) |
| `manifest.json` | - | Config PWA |

**Funcionalidades Implementadas** (Codigo Analisado):
```javascript
// Real-time listener com Firebase
onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
        const item = doc.data();
        // Renderiza cards dinamicamente
    });
});

// Sistema de tags coloridas
const tagColors = {
    'eua': '#2196F3',      // Azul
    'local': '#4CAF50',    // Verde
    'urgente': '#f44336',  // Vermelho
    'online': '#9C27B0',   // Roxo
    'loja-fisica': '#FF9800', // Laranja
    'importado': '#00BCD4',   // Ciano
    'nacional': '#8BC34A'     // Verde claro
};

// Icones por tag
const icons = {
    'eua': ' ',
    'local': ' ',
    'urgente': ' ',
    'online': ' ',
    'loja-fisica': ' ',
    'importado': ' ',
    'nacional': ' '
};
```

**Recursos do PWA**:
- CRUD de itens em tempo real
- Checkbox de comprado com progresso visual
- Sistema de status (aprovado/em-discussao)
- Multiplos links por item
- Sincronizacao multi-usuario
- Modal de aviso para itens em discussao
- Service Worker para offline
- Instalavel como app nativo

### 2.2 Interfaces de Controle

| Interface | Hardware | Quantidade | Funcao |
|-----------|----------|------------|--------|
| **Paineis Touch** | ESP32-8048S070 (7") | 6 | Controle geral + cameras |
| **Termostatos** | UEDX48480040E-WB-A (4") | 10 | Piso aquecido |
| **Tablets** | iOS/Android | 2 | Dashboard HA completo |
| **Lovelace** | Web | - | Interface HA nativa |

---

## 3. Integracoes Existentes

### 3.1 Iluminacao

| Sistema | Hardware | Protocolo | Quantidade |
|---------|----------|-----------|------------|
| **220V On/Off** | ESP32 + MCP23017 + Reles | Ethernet | 24 circuitos |
| **LED 24V Dimmer** | Shelly RGBW2 | WiFi | 11 circuitos |

**Logica de Pulsadores** (implementada em ESPHome):
```yaml
# Exemplo real do firmware
binary_sensor:
  - platform: gpio
    name: "Circ 01"
    pin:
      mcp23xxx: mcp23_hub1_IN
      number: 0
      mode: INPUT
      inverted: true
    on_press:
      - light.toggle: out_2L
```

**Cliques multiplos planejados**:
- 1 clique = Liga/desliga luz principal
- 2 cliques = Liga/desliga luz secundaria
- 3 cliques = Desliga todas do ambiente
- Hold = Modo ausencia

### 3.2 Cortinas/Persianas

| Aspecto | Detalhe |
|---------|---------|
| **Motores** | Tubulares 220V com fim de curso |
| **Controle** | 2 reles por persiana (sobe/desce) |
| **Hardware** | ESP32 nos paineis de comando |
| **Calibracao** | Por tempo de movimentacao |

### 3.3 Climatizacao

#### Ar Condicionado (6 unidades LG)

| Ambiente | Modelo | BTU |
|----------|--------|-----|
| Office (12m2) | AMNW09GTUC0 | 9.000 |
| Living (120m2) | ATNW24GTLP1 (2x) | 24.000 |
| Suite 1 leste (18m2) | AMNW12GTUC0 | 12.000 |
| Suite 2 oeste (15m2) | AMNW12GTUC0 | 12.000 |
| Suite Master (48m2) | AMNW24GTTC0 | 24.000 |

**Integracao**: LG ThinQ via Home Assistant (servidor LG)

#### Piso Aquecido (10 zonas)

| Aspecto | Detalhe |
|---------|---------|
| **Controladores** | Custom (UEDX48480040E-WB-A) |
| **MCU** | ESP32-S3 (16MB Flash, OPI PSRAM) |
| **Display** | 4" 480x480 touch (GC9503V + FT6336U) |
| **Interface** | LVGL v8 |
| **Sensor** | DS18B20 (1-Wire) |
| **Framework** | Arduino + LVGL + HA API |

**Distribuicao de Zonas**:
| Andar | Ambiente | Area |
|-------|----------|------|
| Terreo | Living | 120m2 |
| Terreo | Office | 12m2 |
| Terreo | Lavanderia | 11m2 |
| Superior | Hall | 15m2 |
| Superior | Suite 1 | 18m2 |
| Superior | Banho 1 | 3m2 |
| Superior | Suite 2 | 15m2 |
| Superior | Banho 2 | 3m2 |
| Superior | Suite Master | 48m2 |
| Superior | Banho Master | 9m2 |

### 3.4 Audio/Multimidia

| Dispositivo | Integracao | Status |
|-------------|------------|--------|
| **TV LG** | WebOS local (SSDP) | Confirmado |
| **Receiver Anthem** | Controle IP | Pendente validacao |
| **Amplificadores** | A definir | Pendente |

### 3.5 Sensores

| Tipo | Hardware | Quantidade | Funcao |
|------|----------|------------|--------|
| **Presenca mmWave** | ESP32 + LD2410 | 8-15 | Iluminacao inteligente |
| **Abertura** | Shelly Door/Window 2 | 18-30 | Seguranca |
| **Vazamento** | Shelly Flood | 10-15 | Alertas agua |
| **Fumaca** | Shelly Plus Smoke | 8-12 | Incendio |
| **Temperatura** | DS18B20 | 10 | Piso aquecido |

### 3.6 Seguranca

| Sistema | Hardware | Status |
|---------|----------|--------|
| Cameras | Unifi G5 Turret Ultra (7) | Instalado |
| Esperas | 8 pontos infraestrutura | Preparado |
| Fechadura | Yale | Monitoramento apenas |
| Alarme | Shelly + HA | Planejado |

**Modos de Alarme Planejados**:
- Ausente: Qualquer abertura dispara
- Noite: Apenas portas externas
- Casa: Log apenas, sem disparo

---

## 4. Uso Atual de IA no Projeto

### 4.1 Assistencia ao Desenvolvimento

| Uso | Ferramenta | Localizacao |
|-----|------------|-------------|
| **Analises arquiteturais** | Claude | `/Conversas/` |
| **Geracao de documentacao** | Claude/Gemini | `/Documentacao/` |
| **Validacao de viabilidade** | Claude/Gemini | `/Firmware/.../validacoes/` |
| **Geracao de imagens** | Python/Pillow | `/Hardware/display-3,5/` |

### 4.2 Documentacao de Conversas IA

```
Conversas/
├── 20251120.md          # Discussao inicial (3500+ linhas)
├── 20251201.md          # Especificacoes tecnicas
├── 20251202.md          # Validacoes finais
├── Guia para IA.md      # Regras de interacao
├── Gastos com IA.md     # Historico investimento
└── pendencias.md        # Itens pendentes (atualizavel)
```

### 4.3 Documentacao Especifica para IA

O projeto possui documentacao estruturada para consumo por IAs:

| Arquivo | Funcao | Linhas |
|---------|--------|--------|
| `PROJECT-CONTEXT.md` | Contexto completo do projeto | 533 |
| `README.md` | Visao geral e inicio rapido | - |
| `pendencias.md` | Itens pendentes atualizaveis | 309 |
| `Guia para IA.md` | Regras de interacao | - |

### 4.4 Limitacoes Atuais

O projeto **nao possui agentes de IA em producao**. Toda a logica de automacao e:
- Baseada em regras (if-then)
- Programacoes horarias fixas
- Sem aprendizado ou adaptacao
- Sem processamento de linguagem natural local

---

## 5. Oportunidades para Agentes de IA

### 5.1 Agente de Diagnostico e Troubleshooting

**Prioridade**: ALTA

| Aspecto | Detalhe |
|---------|---------|
| **Entrada** | Logs HA, status dispositivos, metricas rede |
| **Processamento** | LLM local (Ollama) ou API Claude |
| **Saida** | Alertas Telegram, sugestoes correcao |

**Casos de Uso**:
- Dispositivo offline > 5min -> diagnostico automatico
- Erro repetido em log -> identificar causa raiz
- Padrao anomalo -> alerta preventivo

**Implementacao Sugerida**:
```python
# Pseudo-codigo do agente
class DiagnosticAgent:
    def __init__(self):
        self.ollama = OllamaClient("llama3:8b")
        self.ha = HomeAssistantAPI()
        self.telegram = TelegramBot()

    def monitor_logs(self):
        for log in self.ha.get_logs():
            if log.level == "ERROR":
                diagnosis = self.ollama.analyze(log)
                self.telegram.alert(diagnosis)
```

### 5.2 Agente de Otimizacao Energetica

**Prioridade**: MEDIA

| Aspecto | Detalhe |
|---------|---------|
| **Entrada** | Historico consumo, previsao tempo, ocupacao |
| **Processamento** | ML para previsao + regras adaptativas |
| **Saida** | Ajustes automaticos, relatorios economia |

**Casos de Uso**:
- Pre-aquecer piso 30min antes de acordar (nao fixo)
- Ajustar AC baseado em ocupacao real
- Desligar sistemas em ausencia prolongada

### 5.3 Agente de Cenas Contextuais

**Prioridade**: MEDIA

| Aspecto | Detalhe |
|---------|---------|
| **Entrada** | Hora, clima, ocupacao, dia semana, historico |
| **Processamento** | Regras + aprendizado de preferencias |
| **Saida** | Ativacao automatica de cenas |

### 5.4 Assistente de Voz Local (100% Privado)

**Prioridade**: ALTA

| Aspecto | Detalhe |
|---------|---------|
| **Hardware** | ESP32-S3 + microfone INMP441 |
| **STT** | Whisper.cpp (local) |
| **LLM** | Ollama + Llama 3 (local) |
| **TTS** | Piper pt-BR (local) |

**Arquitetura**:
```
[Microfone ESP32] -> [Whisper STT] -> [LLM] -> [Piper TTS] -> [Home Assistant]
```

**Vantagens**:
- 100% local (privacidade total)
- Funciona offline
- Latencia < 2s (com hardware adequado)
- Customizavel para comandos especificos

### 5.5 Agente de Manutencao Preditiva

**Prioridade**: BAIXA (fase futura)

| Aspecto | Detalhe |
|---------|---------|
| **Entrada** | Ciclos de uso, tempo operacao, logs erro |
| **Processamento** | Analise estatistica + ML |
| **Saida** | Alertas manutencao, agendamento |

### 5.6 Agente de Seguranca Contextual

**Prioridade**: MEDIA

| Aspecto | Detalhe |
|---------|---------|
| **Entrada** | Cameras, sensores abertura, presenca |
| **Processamento** | Visao computacional + regras |
| **Saida** | Alertas classificados, acoes automaticas |

---

## 6. Arquitetura Proposta para Agentes

```
┌─────────────────────────────────────────────────────────────┐
│                    MINI-PC (PROXMOX)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   HAOS VM   │  │  Ollama VM  │  │   InfluxDB/Grafana  │  │
│  │  (HA + ESH) │  │  (LLM Local)│  │      (Metricas)     │  │
│  │  4 vCPU     │  │  4 vCPU     │  │      2 vCPU         │  │
│  │  8GB RAM    │  │  8GB RAM    │  │      4GB RAM        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                │                    │             │
│         └────────────────┼────────────────────┘             │
│                          │                                  │
│               ┌──────────┴──────────┐                       │
│               │   REST API Interna  │                       │
│               │   (VLAN 10 - IoT)   │                       │
│               └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
    │  ESP32s   │    │  Shelly   │    │  Unifi    │
    │  (IoT)    │    │ (Sensores)│    │ (Cameras) │
    └───────────┘    └───────────┘    └───────────┘
```

### 6.1 Stack Recomendado

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| **LLM Local** | Ollama + Llama 3.3 8B | Privacidade, offline |
| **STT** | Whisper.cpp (medium) | Precisao pt-BR, local |
| **TTS** | Piper pt-BR | Qualidade, local |
| **Orquestracao** | Python + HASS API | Integracao nativa |
| **Mensageria** | MQTT | Baixa latencia |
| **Storage** | SQLite + InfluxDB | Historico + metricas |

### 6.2 Requisitos de Hardware

| VM | vCPUs | RAM | Disco | Funcao |
|----|-------|-----|-------|--------|
| Home Assistant | 4 | 8GB | 32GB | Hub central |
| Ollama | 4 | 8GB | 20GB | LLM local |
| InfluxDB/Grafana | 2 | 4GB | 50GB | Metricas |
| **Total** | **10** | **20GB** | **102GB** | - |

**Recomendacao**: Upgrade para 32GB RAM no Mini-PC para folga.

---

## 7. Recomendacoes de Implementacao

### 7.1 Curto Prazo (Fase 1-2)

1. **Configurar Ollama no Proxmox**
   - Nova VM dedicada (4 vCPUs, 8GB RAM, 50GB)
   - Modelo: Llama 3 8B ou Mistral 7B
   - API exposta na VLAN Critica

2. **Implementar Agente de Diagnostico basico**
   - Script Python monitorando logs
   - Alertas via Telegram
   - Integracao com HA

3. **Avaliar Home Assistant Voice**
   - Testar Wyoming protocol
   - Comparar com Alexa/Siri

### 7.2 Medio Prazo (Fase 3-4)

4. **Agente de Energia**
   - Coletar metricas de consumo
   - Dashboard de analise
   - Regras adaptativas

5. **Cenas Contextuais**
   - Aprendizado de preferencias
   - Ajustes automaticos

### 7.3 Longo Prazo (Pos-instalacao)

6. **Visao Computacional**
   - Analise de cameras (local)
   - Reconhecimento de pessoas conhecidas

7. **Manutencao Preditiva**
   - Coleta de dados operacionais
   - Modelos de previsao

---

## 8. Matriz de Priorizacao

| Agente | Impacto | Esforco | Prioridade | Fase |
|--------|---------|---------|------------|------|
| Diagnostico | Alto | Baixo | **P1** | 1 |
| Voz Local | Alto | Medio | **P1** | 2 |
| Energia | Alto | Medio | **P2** | 3 |
| Cenas | Medio | Baixo | **P2** | 3 |
| Seguranca | Medio | Alto | **P3** | 4 |
| Manutencao | Baixo | Alto | **P4** | 5 |

---

## 9. Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| LLM local lento | Media | Medio | Hardware adequado, modelos otimizados |
| Alucinacoes LLM | Alta | Alto | Validacao de comandos, confirmacao |
| Consumo recursos | Media | Medio | Limites de memoria, scheduling |
| Complexidade | Alta | Alto | Implementacao gradual, documentacao |

---

## 10. Conclusoes

### 10.1 Estado Atual

O projeto possui uma base solida de automacao com Home Assistant e ESPHome. O firmware do painel eletrico principal ja esta funcional com 24 entradas e 13 saidas. O WebApp de lista de compras esta em producao com Firebase Firestore.

**Pontos Fortes**:
- Arquitetura 100% local (privacidade)
- Hardware premium e escalavel
- Documentacao extensa para IAs
- Codigo ESPHome bem estruturado
- WebApp PWA moderno e funcional

### 10.2 Oportunidades

Ha espaco significativo para implementar agentes inteligentes que:
- Melhorem a experiencia do usuario (voz, contexto)
- Reduzam custos operacionais (energia, manutencao)
- Aumentem a seguranca (analise inteligente)
- Facilitem troubleshooting (diagnostico proativo)

### 10.3 Recomendacao Principal

**Iniciar com o Agente de Diagnostico** - baixo esforco, alto impacto, e estabelece a infraestrutura (Ollama) para os demais agentes.

---

## Anexos

### A. Arquivos Relevantes Analisados

```
/Home-Assistant/configuration.yaml    # Template HA
/Home-Assistant/automations.yaml      # Categorias de automacao
/Firmware/ESP32-Paineis-Eletricos/terreo-principal/esp-painel-terreo-principal.yaml
/Firmware/common/base-config.yaml
/WebApps/lista-compras/script.js      # Firebase CRUD completo
/Scripts/backup.sh
/Scripts/deploy.sh
/PROJECT-CONTEXT.md                   # 533 linhas de contexto
/Conversas/pendencias.md              # 309 linhas de pendencias
```

### B. Tecnologias Identificadas

**Backend/Automacao**:
- Home Assistant OS, ESPHome 2025.11.0+, Proxmox

**Frontend**:
- HTML5, CSS3, JavaScript ES6+, Firebase Firestore, LVGL v8

**Hardware IoT**:
- ESP32, ESP32-S3, MCP23017, LD2410, DS18B20, GC9503V, FT6336U

**Rede**:
- Unifi UDM-Pro SE, U7, VLANs, Tailscale VPN

### C. Referencias

- [Home Assistant](https://www.home-assistant.io/)
- [ESPHome](https://esphome.io/)
- [ESPHome LVGL](https://esphome.io/components/lvgl/)
- [Home Assistant Voice](https://www.home-assistant.io/voice_control/)
- [Ollama](https://ollama.ai/)
- [Wyoming Protocol](https://www.home-assistant.io/integrations/wyoming/)
- [Whisper](https://github.com/openai/whisper)
- [Piper TTS](https://github.com/rhasspy/piper)

---

*Relatorio gerado por Claude Code (Opus 4.5)*
*Data: 2026-01-23*
*Versao: 2.1 (atualizado com analise de codigo real)*
