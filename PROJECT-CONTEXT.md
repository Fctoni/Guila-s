# Projeto Guilas - Decisões e Contexto Técnico

**Última atualização**: 20/11/2025
**Status**: Fase de Planejamento
**Localização**: Caxias do Sul - RS (CEP 95012-617)

### 📝 Histórico de Atualizações
- **20/11/2025**: Criação inicial (baseado em discussão completa `Conversas/20251120.md`)

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

#### Tablets
- **Quantidade**: 2 tablets
- **Sistema**: Home Assistant via app oficial (iOS/Android)
- **Função**: Interface completa, visualização câmeras, dashboards ricos
- **Conectividade**: WiFi (VLAN Principal)
- **Pendente**: Modelo, tamanho, montagem (verificar com cliente)

#### Sensores Temperatura (WiFi)
- **Modelo**: DS18B20
- **Função**: Controle preciso de ACs (temperatura real vs temperatura do AC)
- **Quantidade**: 1 por ambiente climatizado (a definir com arquiteto)
- **Nomenclatura**: `esp-sensor-temp-[ambiente]`

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
- **Sistema**: 7 câmeras Unifi no Unifi Protect (UDM-Pro SE)
- **Integração HA**: UniFi Protect Integration
- **Funcionalidades**: Detecção movimento, snapshots, gravação, preview painéis

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
- OpenWeatherMap ou INMET (irrigação)

### Integrações Pendentes (validar)
- LG ThinQ (ACs) - verificar se funciona 100% local
- Vesta (piso aquecido SAS920FHL-7) - verificar protocolo
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

### Persianas
- **Controle**: 2 relés por persiana (on/off + direção sobe/desce)
- **Motores**: Tubular 220V com fim de curso
- **Calibração**: Por tempo (definir tempo para cada persiana)
- **Sem sensores**: Sem obstrução, sem botão emergência

### Climatização
- **ACs**: Integração LG (local se possível, senão IR via ESP32)
- **Sensores temperatura externos**: DS18B20 (1 por ambiente)
- **Piso aquecido**: Controladores Vesta SAS920FHL-7 (pendente protocolo comunicação)
- **Zonas piso aquecido**: A definir com arquiteto

### Piscina
- ESP32 WiFi + relés para contatoras
- Funções: Aquecimento e recirculação
- Sem sensores químicos (pH, cloro)
- Sem iluminação (verificar com arquiteto)

### Irrigação
- ESP32 WiFi + relés para válvulas solenoides 24V
- Programação por zona (quantidade e mapa com arquiteto)
- Integração climática: 
  - Previsão chuva >70% nas próximas 24h → Cancelar irrigação
  - Choveu >10mm ontem → Pular irrigação hoje
  - Temperatura >35°C → +20% tempo de rega
- SEM sensores umidade solo (infraestrutura já fechada)
- Controle manual via painéis touch, voz e celular

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
  - Alexa (5 dispositivos) - Facilidade de uso
  - HA Voice (ESP32 com microfone) - Privacidade, 100% local
  - Híbrido - Melhor dos dois mundos (Alexa principal + HA Voice backup)

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

**Arquivo detalhado**: `Conversas/pendencias.md`

### Resumo
- **Com Arquiteto**: Plantas da casa, quantidades de sensores mmWave, zonas irrigação/piso aquecido, distribuição ACs, modelo fechadura Yale, localização quadros elétricos, planilhas iluminação 220V e LEDs 24V
- **Com Fornecedores**: Modelos e protocolos de integração (LG ACs, Vesta piso aquecido, equipamentos A/V)
- **Com Cliente**: Preferências UI painéis (cores, estilo), aprovação cenas automáticas, qualidade do ar, estratégia voz, no-break, especificações tablets

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
3. Configurar HA básico no Proxmox
4. Testar integrações principais (Shelly, Unifi)
5. Validar lógica pulsadores múltiplos cliques
6. Testar viabilidade câmeras em painéis touch

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

- **Arquivo discussão completa**: `Conversas/20251120.md` (3500+ linhas)
- **Pendências atualizáveis**: `Conversas/pendencias.md`
- **Guia para IAs futuras**: `Conversas/Guia para IA.md`

### Links Importantes
- SS4H Smart Home Hub: https://smartsolutions4home.com/ss4h-shh-smart-home-hub/
- Módulo relé persianas: https://tinyurl.com/moduloreleboard
- ESPHome LVGL: https://esphome.io/components/lvgl/
- Home Assistant: https://www.home-assistant.io/

---

## ⚡ RESUMO EXECUTIVO (TL;DR)

**Sistema**: Automação residencial 100% local, premium, Caxias do Sul/RS

**Servidor**: Proxmox + HAOS, backup automático, no-break

**Rede**: Unifi completo (UDM-Pro SE, U7), VLANs, DNS local

**Dispositivos**: ESP32s (Ethernet painéis, WiFi sensores), sensores Shelly ecosystem

**Controle**: Painéis touch LVGL, tablets, voz (pendente), celular

**Segurança**: 7 câmeras Unifi, alarme, sensores abertura/vazamento/fumaça, fechadura Yale (monitoramento apenas)

**Climatização**: ACs LG (pendente integração), piso aquecido Vesta (pendente protocolo)

**Outros**: Iluminação 220V/24V, persianas, piscina, irrigação inteligente, multimídia

**Status**: Planejamento completo, aguardando dados arquiteto/fornecedores para implementação

**Próximo passo**: Protótipo + validação técnica OU aguardar dados externos

---

**FIM DO CONTEXTO DO PROJETO**

*Este documento é atualizado apenas com decisões finais. Para detalhes de discussões e alternativas consideradas, consultar arquivo de conversa completa.*

*Última revisão: 20/11/2025*

