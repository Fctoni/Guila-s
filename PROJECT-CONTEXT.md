# Projeto Guilas - Decisões e Contexto Técnico

**Última atualização**: 25/01/2026
**Status**: Fase de Planejamento
**Localização**: Caxias do Sul - RS (Le Parc)

### 📝 Histórico de Atualizações
- **25/01/2026**:
  - Documentação completa de circuitos elétricos térreo (46 circuitos, 1.608W LED 24V)
  - Documentação completa de circuitos elétricos superior (59 circuitos, 13 LEDs 24V - medições pendentes)
  - Nova estrutura de pastas: `docs/arquitetura/circuitos/andar-[terreo|superior]/`
  - Referências cruzadas adicionadas nas seções Iluminação e Referências
- **02/12/2025**:
  - Definido hardware para teste de termostato: UEDX48480040E-WB-A (display quadrado 4")
  - Decisão: Usar Arduino Framework + LVGL ao invés de ESPHome (compatibilidade)
  - Adicionada estrutura de documentação para novo hardware
- **01/12/2025**: 
  - Adicionadas especificações confirmadas (ACs, piso aquecido, piscina, irrigação)
  - Confirmada integração LG ThinQ (via servidor LG, backup IR)
  - Decisão: Desenvolver termostato próprio para piso aquecido (Vesta incompatível)
  - Atualizada localização: Le Parc
- **20/11/2025**: Criação inicial (baseado em discussão completa `docs/decisoes/20251120.md`)

---

## 📖 COMO USAR ESTE DOCUMENTO

**Para IA futura**:
1. Ler seção "Visão Geral" (entender contexto do projeto)
2. Ler "Decisões Importantes - O que NÃO fazer" (CRÍTICO!)
3. Ler "Pendências Externas" (o que ainda está indefinido)
4. Navegar por seções específicas conforme necessidade da tarefa

**Para humanos (consulta rápida)**:
- Use `Ctrl+F` (Windows/Linux) ou `Cmd+F` (Mac) para buscar termos específicos
- Seções são independentes (pode ler fora de ordem)
- Links de referência no final do documento

---

## 📋 VISÃO GERAL

### Cliente
- Perfil: Preza qualidade e estética acima de custo
- Contrato: Entrega total ao final, 1 ano garantia, SLA 1 dia
- Treinamento: Presencial incluído
- Escalabilidade: Prevê expansões futuras

### Objetivo
Sistema de automação residencial completo, 100% local, com:
- Controle iluminação 220V e LEDs 24V
- Persianas motorizadas
- Climatização (AC + piso aquecido)
- Piscina e irrigação
- Multimídia
- Segurança (alarme + câmeras + sensores)

---

## 🏗️ ARQUITETURA

### Servidor
- Mini-PC Beelink i3-1240P com Proxmox
- Home Assistant OS em VM (4 vCPUs, 4-8GB RAM, 32GB disco)
- No-break (a definir com cliente)
- Storage UGREEN para backups

### Rede
- Gateway: Unifi UDM-Pro SE
- APs: Unifi U7 (WiFi 6)
- VLANs segregadas:
  - VLAN 1: Principal (tablets, celulares, computadores)
  - VLAN 10: IoT Crítico (ESP32s painéis, Home Assistant)
  - VLAN 20: IoT Sensores (sensores, painéis touch)
  - VLAN 30: Visitantes (Guest WiFi)
- DNS local configurado no Unifi
- IPs estáticos para ESP32s (gerenciados via Unifi ou manualmente)

### Backup
- Snapshot HA diário (3h, reter 7 dias local)
- Export para UGREEN via Samba Backup add-on
- Snapshot Proxmox VM semanal (domingo 3h)
- Backup Git automático de configurações
- Documentação offline em PDF

---

## 🔧 HARDWARE - DECISÕES FINAIS

### ESP32s

#### Painéis de Comando (Ethernet)
- **Quantidade**: 1 por andar (a definir com arquiteto)
- **Hardware**: ESP32 Ethernet + MCP23017 I2C (16 GPIO por chip)
- **Função**: Controle iluminação 220V + persianas
- **Módulos**: 
  - Iluminação 220V: SS4H (fabricação própria, link: https://smartsolutions4home.com/ss4h-shh-smart-home-hub/)
  - Persianas: Módulo comercial (link: https://tinyurl.com/moduloreleboard)
  - Max 6 módulos I2C por ESP32, distância <30cm
- **Alimentação**: Fonte 10A por painel (centralizada)
- **Configuração**: 16 entradas / 16 saídas por módulo
- **Nomenclatura**: `esp-painel-[andar]-[area]`
  - Exemplo: `esp-painel-terreo-principal`

#### Painéis Touch (WiFi)
- **Quantidade**: 6x ESP32-8048S070
- **Software**: ESPHome + LVGL
- **UI**: Minimalista, fundo escuro, sleep mode ativo
- **Funcionalidade**: 
  - Controle completo de todos dispositivos
  - Visualização câmeras (snapshot, testar viabilidade de stream)
  - Acesso a cenas e automações
- **Nomenclatura**: `painel-touch-[ambiente]`
  - Exemplos: `painel-touch-hall-entrada`, `painel-touch-sala-estar`

#### Termostatos Piso Aquecido (WiFi)
- **Quantidade**: 10 termostatos (1 por zona)
- **Hardware em teste**:
  - **UEDX80480043E-WB-A** (adquirida)
  - **UEDX48480040E-WB-A** (em aquisição - display 4" quadrado 480x480)
    - Display: GC9503V (RGB paralelo 16-bit)
    - Touch: FT6336U (I2C)
    - MCU: ESP32-S3 (16MB Flash, OPI PSRAM)
    - Software: Arduino Framework + LVGL v8 + Home Assistant API
    - Repositório: https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display
  - UEDX80480043E-WB-A (alternativa)
  - ESP32-3248S035 (alternativa)
- **Sensor de temperatura**: DS18B20 integrado em cada termostato
- **Software**: ESPHome + LVGL
- **Framework**: Arduino + LVGL (ESPHome não suporta nativamente este display)
- **Integração HA**: Home Assistant Native API (funciona como ESPHome)
- **Funcionalidade**:
  - Controle temperatura setpoint
  - Display temperatura atual (leitura DS18B20)
  - Programação horária
  - Integração completa com Home Assistant
  - Controle de relés para acionamento do piso aquecido
- **Nomenclatura**: `termostato-[ambiente]`
  - Exemplos: `termostato-living`, `termostato-suite-master`

#### Tablets
- **Quantidade**: 2 tablets
- **Sistema**: Home Assistant via app oficial (iOS/Android)
- **Função**: Interface completa, visualização câmeras, dashboards ricos
- **Conectividade**: WiFi (VLAN Principal)
- **Pendente**: Modelo, tamanho, montagem (verificar com cliente)

#### Sensores Temperatura (WiFi)
- **Modelo**: DS18B20
- **Uso**: Integrados nos termostatos de piso aquecido (10 sensores)
- **Função**: Leitura de temperatura ambiente para controle do piso aquecido
- **Nomenclatura**: Parte do termostato `termostato-[ambiente]`

#### Sensores Presença mmWave (WiFi)
- **Modelo**: LD2410 (24GHz, radar)
- **Quantidade**: 8-15 sensores (posições com arquiteto)
- **Função**: Detecção presença estática + movimento
- **Vantagens**: Detecta através de vidro, não afetado por temperatura, detecta respiração
- **Fabricação**: Própria com ESP32 WiFi
- **Montagem**: Altura 2-2.5m, ângulo 15-30° para baixo, evitar janelas
- **Aplicações**: Iluminação inteligente, climatização, segurança, economia energia
- **Nomenclatura**: `esp-sensor-presenca-[ambiente]`

### LEDs 24V - Dimerização
- **Solução**: Shelly RGBW2 (modo 4x White)
- **Características**: 4 canais independentes, até 12A por canal (288W em 24V)
- **Motivo**: Plug & play, confiabilidade, integração nativa HA, WiFi integrado
- **Instalação**: Fontes 24V múltiplas por painel (redundância)

### Sensores de Segurança

#### Abertura Porta/Janela
- **Modelo**: Shelly Door/Window 2 (WiFi, preto)
- **Quantidade**: 18-30 sensores (todas janelas + portas principais)
- **Características**: Sensor luminosidade + inclinação, bateria 18 meses (CR123A)

#### Vazamento
- **Modelo**: Shelly Flood (WiFi)
- **Quantidade**: 10-15 sensores
- **Locais**: Banheiros (pia + box), cozinha, lavanderia, piscina, aquecedor

#### Fumaça
- **Modelo**: Shelly Plus Smoke (WiFi)
- **Quantidade**: 8-12 sensores
- **Características**: Sirene 85dB integrada, bateria 3 anos, certificação EN 14604
- **Locais**: Quartos, salas, cozinha (tipo específico), corredores, lavanderia

### Segurança

#### Câmeras
- **Modelo**: Unifi G5 Turret Ultra (UVC-G5-Turret-Ultra)
- **Quantidade instalada**: 7 câmeras
- **Esperas de infraestrutura**: 8 pontos (para expansão futura)
- **Sistema**: Unifi Protect (UDM-Pro SE)
- **Integração HA**: UniFi Protect Integration
- **Funcionalidades**: Detecção movimento, snapshots, gravação, preview painéis
- **Pendente**: Verificar com arquiteto posição exata de cada câmera e espera

#### Fechadura
- **Modelo**: Yale (porta principal, única da casa)
- **Integração HA**: APENAS monitoramento (estado: aberta/fechada/trancada)
- **SEM automações**: Não haverá comandos de trava/destrava via HA
- **Motivo**: Segurança - evitar risco de acesso não autorizado via rede
- **Notificações**: Porta aberta >10min, código usado, tentativas falhas
- **Pendente**: Verificar modelo exato com arquiteto para validar compatibilidade

#### Alarme
- **Status**: Cliente tem muito interesse!
- **Modos**: 
  - Ausente: Qualquer abertura dispara alarme
  - Noite: Apenas portas externas monitoradas
  - Casa: Alarme desabilitado, apenas log de aberturas
- **Integração**: Sensores abertura + câmeras (snapshot) + sirenes (Shelly Smoke)
- **Notificações**: Push instantâneas para cliente e integrador

---

## 💻 SOFTWARE

### Sistema Base
- Home Assistant OS (VM Proxmox)
- ESPHome para todos ESP32s
- ESPHome LVGL para painéis touch (suficiente para uso residencial)

### Integrações Confirmadas
- Unifi Protect (câmeras)
- Unifi Network (UDM, APs)
- Shelly (todos sensores)
- WebOS (TV LG - 100% local)
- LG ThinQ (ACs) - Integração via servidor LG, backup IR local se necessário

### Integrações Pendentes (validar)
- Vesta (piso aquecido SAS920FHL-7) - Manual analisado, não compatível com automação desejada
- Receiver Anthem - verificar controle IP
- Yale (fechadura) - verificar modelo e compatibilidade

### Versionamento
- Git/GitHub para:
  - Configurações HA (configuration.yaml, automations.yaml, etc)
  - Firmwares ESP32 (arquivos YAML ESPHome)
  - Documentação completa
  - Scripts de backup e deploy
- Commits: Formato `v[versão]-[etapa]: [Descrição sem acentos]`
- `.gitignore`: Excluir secrets.yaml, *.log, backups grandes

---

## 🏠 FUNCIONALIDADES DETALHADAS

### Iluminação
- **220V**: On/off via relés, SEM dimerização (apenas LEDs)
- **24V**: Fitas LED monocromáticas com dimerização via Shelly RGBW2
- **Pulsadores**: Sem retenção (volta sozinho), múltiplos cliques
  - 1 clique: Liga/desliga luz principal
  - 2 cliques: Liga/desliga luz secundária
  - 3 cliques: Ativa cena "todos desligados"
  - Hold: Ativa modo ausência (lógica caso a caso)
- **Interruptores físicos backup**: Em luzes críticas (1 por ambiente mínimo)
- **Debounce**: 50ms no ESP32

### Documentação Técnica de Circuitos

A documentação completa dos circuitos elétricos está organizada por andar:

- **Térreo**: `docs/arquitetura/circuitos/andar-terreo/`
  - [terreo-principal.md](docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) - Documento de engenharia completo
  - [tabela-eletricista-terreo.md](docs/arquitetura/circuitos/andar-terreo/tabela-eletricista-terreo.md) - Tabela para instalação em campo
  - Total: 46 circuitos, 1.608W LED 24V (~67A)

- **Pavimento Superior**: `docs/arquitetura/circuitos/andar-superior/`
  - [superior-principal.md](docs/arquitetura/circuitos/andar-superior/superior-principal.md) - Documento de engenharia completo
  - Total: 59 circuitos, 13 circuitos LED 24V
  - ⚠️ **Pendências**: Medição de potências LED 24V necessária para dimensionamento final de fontes

Estes documentos incluem:
- Tabelas completas de circuitos (Interruptor → Circuito → Tipo → Potência)
- Estrutura hierárquica LED 24V e 220V
- Análise de hardware necessário (MCP23017, Shelly RGBW2)
- Dimensionamento de fontes 24V
- Circuitos especiais e observações de instalação

### Persianas
- **Controle**: 2 relés por persiana (on/off + direção sobe/desce)
- **Motores**: Tubular 220V com fim de curso
- **Calibração**: Por tempo (definir tempo para cada persiana)
- **Sem sensores**: Sem obstrução, sem botão emergência

### Climatização

#### Ar Condicionado
- **Quantidade total**: 6 aparelhos LG
- **Integração**: LG ThinQ, via integração HA (funciona integrado, mas depende de servidor externo. Se a experiência for ruim, plano B usar integração IR local)
- **Distribuição**:
  - Office (12m²): 1x 9.000 BTU - AMNW09GTUC0
  - Living (120m²): 2x 24.000 BTU - ATNW24GTLP1.ANWZBR1
  - Suíte 1 - leste (18m²): 1x 12.000 BTU - AMNW12GTUC0
  - Suíte 2 - oeste (15m²): 1x 12.000 BTU - AMNW12GTUC0
  - Suíte master (48m²): 1x 24.000 BTU - AMNW24GTTC0

#### Piso Aquecido
- **Controladores originais**: Vesta SAS920FHL-7 (analisado, incompatível com automação)
- **Solução**: Desenvolvimento de termostato próprio integrado ao Home Assistant
- **Hardware de teste**:
  - UEDX80480043E-WB-A (adquirida para testes)
  - ESP32-3248S035 (alternativa para testes)
  - Definir qual modelo melhor se encaixa no projeto após prototipagem
- **Sensores**: DS18B20 integrado em cada termostato (1 por zona)
- **Quantidade total**: 10 zonas (10 termostatos com sensores integrados)
- **Térreo (3 zonas)**:
  - Living: 120m²
  - Office: 12m²
  - Lavanderia: 11m²
  - *(Garagem, sauna e banheiro de serviço não têm)*
- **Pavimento Superior (7 zonas)**:
  - Hall: 15m²
  - Suíte 1 (leste): 18m²
  - Banho 1: 3m²
  - Suíte 2 (oeste): 15m²
  - Banho 2: 3m²
  - Suíte master: 48m²
  - Banho master: 9m²

### Piscina
- **Controle**: ESP32 WiFi + relés para contatoras
- **Funções**: Aquecimento e recirculação
- **Iluminação**: SIM, 4 pontos de luz azul (pendente: verificar marca do controlador)
- **Localização quadro de comando**: Externo, lado esquerdo da piscina, meio do jardim
- **Sensores químicos**: NÃO (pH, cloro) - controle manual

### Irrigação
- **Controle**: ESP32 WiFi + relés para válvulas solenoides 24V
- **Quantidade total**: 5 zonas
- **Térreo (3 zonas)**: Frente, meio, fundos
- **Pavimento Superior (2 zonas)**: Frente, fundos
- **Programação recomendada pelo jardineiro**:
  - **Verão**: 8h (10-15 min/zona) + 18h (10-15 min/zona)
  - **Inverno**: 8h (5 min/zona)
  - **IMPORTANTE**: Ligar TODOS os dias sem exceção
- **Integração climática**: NÃO IMPLEMENTAR
  - **Motivo**: Existem áreas cobertas que não pegam chuva
  - **Decisão do cliente**: Irrigação sempre ativa, independente da previsão do tempo
- **Sensores umidade solo**: NÃO (infraestrutura já fechada)
- **Controle manual**: Via painéis touch, voz e celular

### Multimídia
- **TV LG**: Integração WebOS (100% local, SSDP)
  - Controla: ligar/desligar, volume, input, apps, canal
  - Requisito: TV na mesma rede que HA
- **Receiver Anthem**: Verificar controle IP com fornecedor
- **Amplificadores**: Verificar marca/modelo e protocolo com fornecedor
- **Home Assistant Media Browser**: Centralizador de mídia (Spotify, Plex, rádios)
- **Cenas**: Ex: "Cinema" → TV liga, receiver liga, luzes 5%, persianas fecham, AC 22°C

### Controle de Voz
- **Pendente**: Verificar com cliente
- **Opções**: 
  - Alexa (5 dispositivos) - Facilidade de uso, suporta português
  - HA Voice (ESP32 com microfone) - Privacidade, 100% local, português
  - Apple HomeKit via Siri - Integração nativa iOS, **limitação: apenas inglês**
  - Híbrido - Melhor dos dois mundos (Alexa/Siri principal + HA Voice backup)

---

## 📊 NOMENCLATURA PADRÃO

### Dispositivos
```
ESP32s:
- esp-painel-[andar]-[area]
- painel-touch-[ambiente]
- esp-sensor-[tipo]-[ambiente]

Exemplos:
- esp-painel-terreo-principal
- esp-painel-superior-norte
- painel-touch-sala-estar
- painel-touch-cozinha
- esp-sensor-temp-suite-master
- esp-sensor-presenca-cozinha
```

### Entidades Home Assistant
```
[tipo].[ambiente]_[dispositivo]

Exemplos:
- light.sala_principal
- light.sala_fita_led
- cover.suite_persiana
- climate.sala_ar_condicionado
- binary_sensor.sala_presenca
- binary_sensor.porta_principal_contato
```

### Rede (DNS Local)
```
homeassistant.local → 192.168.10.10
esp-painel-terreo.local → 192.168.10.101
painel-touch-sala.local → 192.168.20.101
```

---

## 🔍 MONITORAMENTO

### Para o Integrador (acesso remoto)
- **Tailscale**: VPN moderna, zero-config, acesso remoto seguro
- **Uptime Kuma**: Monitor de status (HA, UDM, câmeras, ESP32s)
- **Notificações Telegram**: 
  - ESP32 offline >10min
  - Temperatura anormal
  - Backup falhou
  - Relatório diário (todos online)
- **Logs centralizados**: Para diagnóstico

### Para o Cliente
- Dashboard simples no HA (sem informações técnicas)
- Notificações push importantes (alarme, portas, etc)
- Alertas de segurança (movimento suspeito, tentativas fechadura)

---

## 📊 OBSERVABILIDADE

### Grafana + InfluxDB
- **Função**: Métricas históricas e análise de dados
- **Dados coletados**: 
  - Temperatura por ambiente (histórico)
  - Uptime de dispositivos
  - Eventos de automação
  - Uso de CPU/RAM do servidor
  - Latência de rede
- **Alertas automáticos**: 
  - Temperatura anormal
  - Dispositivos offline
  - Uso excessivo de recursos
- **Dashboards técnicos**: 
  - Visão geral do sistema
  - Performance de dispositivos
  - Histórico de eventos
  - Troubleshooting avançado

---

## 📋 PENDÊNCIAS

**Arquivo detalhado**: `docs/decisoes/pendencias.md`

### Resumo
- **Com Arquiteto**: Plantas da casa, posicionamento sensores mmWave, modelo exato fechadura Yale, localização quadros elétricos, planilhas iluminação 220V e LEDs 24V, verificações finais piscina (marca controlador, confirmar 4 pontos luz)
- **Com Fornecedores**: Modelos e protocolos de integração (equipamentos A/V - Receiver Anthem, amplificadores)
- **Com Cliente**: Preferências UI painéis/termostatos, aprovação cenas automáticas, sensores segurança (aprovação investimento), qualidade do ar, estratégia voz, no-break, especificações tablets

**Como atualizar**: Marcar resolvidas no arquivo `pendencias.md` e informar à IA para atualizar documentação relacionada

---

## 💡 DECISÕES IMPORTANTES

### O que NÃO fazer
- ❌ **Automações de trava/destrava fechadura** (risco segurança rede)
- ❌ **Sensores umidade solo irrigação** (infraestrutura fechada)
- ❌ **Monitoramento energia** (cliente tem geração própria)
- ❌ **Dimerização 220V** (apenas LEDs, sem TRIAC)
- ❌ **Feedback estado iluminação** (confiar no estado do pino ESP32)
- ❌ **Sensores obstrução persianas** (não incluído)

### Recomendações Documentadas (cliente decide)
- Redundância internet via 4G/5G backup (hardware + chip dados mensal)
- No-break 600-800VA para proteger equipamentos críticos

### Modo Autônomo ESP32s
- Lógica embarcada em cada ESP32 (entradas → ações)
- Funciona sem Home Assistant
- HA usado para: monitoramento, comandos remotos (voz, celular, automações complexas)
- Interruptores físicos backup em circuitos críticos

---

## 🚀 PRÓXIMOS PASSOS

### Fase 1 - Prototipagem (validação técnica)
1. Montar 1 painel comando (ESP32 + MCP23017 + I2C)
2. Montar 1 painel touch (ESP32-8048S070 + LVGL)
3. **Prototipar termostato piso aquecido**:
   - Testar UEDX80480043E-WB-A
   - Testar ESP32-3248S035
   - Definir modelo final
   - Desenvolver firmware ESPHome + UI LVGL
4. Configurar HA básico no Proxmox
5. Testar integrações principais (Shelly, Unifi, LG ThinQ)
6. Validar lógica pulsadores múltiplos cliques
7. Testar viabilidade câmeras em painéis touch

### Fase 2 - Aguardar Dados Externos
- Plantas e definições do arquiteto
- Modelos e protocolos de fornecedores
- Preferências e aprovações do cliente

### Fase 3 - Desenvolvimento
- Desenvolver firmware de todos ESP32s
- Desenvolver interfaces LVGL completas
- Configurar Home Assistant completo
- Criar todas automações e cenas
- Configurar monitoramento remoto

### Fase 4 - Documentação
- Manual do Proprietário (PDF profissional)
- Guia Rápido (1 página, laminado)
- Manual Técnico (para integrador/manutenção)
- Documentação código (READMEs, comentários)

### Fase 5 - Implantação
- Testes em bancada (todos módulos isoladamente)
- Instalação no local (equipe de instalação)
- Comissionamento (testar circuito por circuito)
- Treinamento cliente (presencial)

---

## 📚 REFERÊNCIAS

- **Arquivo discussão completa**: `docs/decisoes/20251120.md` (3500+ linhas)
- **Pendências atualizáveis**: `docs/decisoes/pendencias.md`
- **Guia para IAs futuras**: `docs/decisoes/Guia para IA.md`

### Links Importantes
- SS4H Smart Home Hub: https://smartsolutions4home.com/ss4h-shh-smart-home-hub/
- Módulo relé persianas: https://tinyurl.com/moduloreleboard
- ESPHome LVGL: https://esphome.io/components/lvgl/
- Home Assistant: https://www.home-assistant.io/

### Documentação Técnica de Implementação

**Circuitos Elétricos**:
- [Térreo Principal](docs/arquitetura/circuitos/andar-terreo/terreo-principal.md) - Documentação completa de 46 circuitos
- [Superior Principal](docs/arquitetura/circuitos/andar-superior/superior-principal.md) - Documentação completa de 59 circuitos
- [Tabela Eletricista Térreo](docs/arquitetura/circuitos/andar-terreo/tabela-eletricista-terreo.md) - Referência para instalação em campo
- [Cortinas Térreo](docs/arquitetura/circuitos/andar-terreo/cortinas-terreo.md) - Circuitos de persianas motorizadas
- [Guia de Cores](docs/arquitetura/circuitos/andar-terreo/guia-cores-fiacao-terreo.md) - Padrão de cores de fiação

**Estrutura de Pastas**:
```
docs/arquitetura/circuitos/
├── andar-terreo/       # Térreo: 46 circuitos, 1.608W LED 24V
└── andar-superior/     # Superior: 59 circuitos (medições pendentes)
```

---

## ⚡ RESUMO EXECUTIVO (TL;DR)

**Sistema**: Automação residencial 100% local, premium, Caxias do Sul/RS

**Servidor**: Proxmox + HAOS, backup automático, no-break

**Rede**: Unifi completo (UDM-Pro SE, U7), VLANs, DNS local

**Dispositivos**: ESP32s (Ethernet painéis, WiFi sensores), sensores Shelly ecosystem

**Controle**: Painéis touch LVGL, tablets, voz (pendente), celular

**Segurança**: 7 câmeras Unifi, alarme, sensores abertura/vazamento/fumaça, fechadura Yale (monitoramento apenas)

**Climatização**: 6 ACs LG (integração ThinQ via servidor LG), piso aquecido com termostatos próprios (desenvolvimento custom)

**Outros**: Iluminação 220V/24V, persianas, piscina, irrigação inteligente, multimídia

**Status**: Planejamento completo, aguardando dados arquiteto/fornecedores para implementação

**Próximo passo**: Protótipo + validação técnica OU aguardar dados externos

---

**FIM DO CONTEXTO DO PROJETO**

*Este documento é atualizado apenas com decisões finais. Para detalhes de discussões e alternativas consideradas, consultar arquivo de conversa completa.*

*Última revisão: 01/12/2025*

