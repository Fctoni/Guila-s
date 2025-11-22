# Pendências do Projeto Guilas


## 📝 NOTAS PARA FUTURAS IAs

Quando você (IA futura) ler este documento:

1. **Priorize ler também**:
   - `README.md` - Visão geral do projeto
   - `Conversas/20251120.md` - Contexto completo das decisões iniciais
   - `Guia para IA.md` - Regras de interação

2. **Ao receber atualizações**:
   - Identifique quais pendências foram resolvidas
   - Pergunte se alguma resposta impacta decisões técnicas já tomadas
   - Atualize documentos relacionados (PRD, diagramas, etc)

3. **Formato esperado das respostas**:
   - Marque `[✓]` na pendência resolvida
   - Adicione a resposta logo abaixo, com `**Resposta**:` 
   - Se a resposta gerar novas perguntas, adicione-as como sub-itens


## 📋 USUÁRIO: Como atualizar este documento para futuras IAs

Quando você tiver as respostas das pendências abaixo:

1. **Abra este arquivo** (`pendencias.md`)
2. **Marque a pendência como resolvida** com `[✓]` e adicione a resposta logo abaixo
3. **Informe à IA**: "Atualizei o arquivo pendencias.md com novas informações. Leia-o e atualize a documentação necessária."
4. **A IA lerá** este arquivo, identificará o que mudou e atualizará os documentos relevantes

### Exemplo de como marcar como resolvido:
```
- [✓] Quantos aparelhos de ar condicionado? 
  **Resposta**: 8 aparelhos split

- [ ] Modelos específicos dos LG?
```

---

## 🏗️ ARQUITETO - Verificar com o responsável do projeto arquitetônico

### Ar Condicionado
- [✓] Quantos aparelhos de ar condicionado no total?
6
- [✓] Modelos específicos dos aparelhos LG? (importante para verificar tipo de integração)
Respondido abaixo na distribuição
- [✓] Distribuição dos aparelhos por ambiente (sala, quartos, etc)
Office 12² - 1 máquina 9000 btu AMNW09GTUC0 - LG
Living 120m² - 2 máquinas 24000 btu ATNW24GTLP1.ANWZBR1 - LG
Suíte 1 (leste) 18m² - 1 máquina 12000 btu AMNW12GTUC0 - LG
Suíte 2 (oeste) 15m² - 1 máquina 12000 btu AMNW12GTUC0 - LG
Suíte master 48m² - 1 máquina 24000 btu AMNW24GTTC0 - LG

### Piso Aquecido
- [✓] Quantas zonas de piso aquecido?
10
- [✓] Quais ambientes terão piso aquecido?
1) Térreo: 3 zonas
a) Living (120m²)
b) Office (12m²)
c) Lavanderia (11m²)
(garagem, sauna e banheiro de serviço não tem)

2) Pav. Superior
Hall 15m² 
Suíte 1 (leste) 18m²
Banho 1 (3m²)
Suíte 2 (oeste) 15m²
Banho 2 (3m²)
Suíte master 48m²
Banho master (9m²)

- [✓] Metragem de cada zona (respondido acima nos ambientes)

### Piscina
- [✓] A iluminação da piscina está incluída no projeto?
Sim, falta verificar a marca do controlador instalado.
- [✓] Se sim, quantos pontos de luz e tipo (LED RGB, branco)?
4 pontos de luz (verificar informação), Azul (verificar informação)
- [✓] Localização do quadro de comando da piscina
Externo, ao lado esquerdo da piscina, no meio da vegetação do jardim

### Irrigação
- [✓] Quantas zonas de irrigação?
1) 3 no pavimento térreo
a) frente
b) meio
c) fundos
2) 2 no pavimento superior
a) frente 
b) fundos
- [✓] Mapa das zonas (jardim frontal, lateral, fundos, etc)
- [✓] Tipo de vegetação em cada zona (para programar tempo de rega)
Recomendado pelo jardineiro ligar às 8h da manhã e deixar de 10 a 15 minutos por setor todos os dias, e às 18h mais 10 a 15 minutos no verão.
No inverno, 5 minutos por rega.
- [✓] **Sensores de Umidade do Solo**: NÃO usar
  - **Resposta**: Apenas programação + previsão do tempo (infraestrutura já fechada)

Observação importante: Recomendação do jardineiro ligar todos os dias independente de previsão do tempo, pois existem áreas 'cobertas' que não pegam chuva.

### Plantas da Casa
- [ ] Fornecer plantas em PDF ou DWG
- [ ] Quantos andares?
- [ ] Quantos cômodos por andar?
- [ ] Metragem total e por andar
- [ ] Localização dos quadros elétricos
- [ ] Descrição detalhada de cada ambiente:
  - Nome do ambiente
  - Dimensões aproximadas
  - Quantos pontos de luz 220V por ambiente
  - Quantos circuitos de fitas LED 24V por ambiente
  - Localização dos pulsadores
  - Equipamentos (AC, persiana, etc)

---

## 🔌 ELETRICISTA / INSTALADOR - Verificar com responsável pela instalação elétrica

### Pontos de Iluminação
- [ ] Planilha completa com todos os pontos de luz 220V
- [ ] Identificação de quais luzes terão interruptor físico de backup
- [ ] Localização dos painéis de comando por andar

### Cabeamento
- [ ] Confirmação de que todo cabeamento de rede será Cat6 ou superior
- [ ] Caminho dos cabos entre quadro principal e painéis de automação
- [ ] Distância máxima de cabo de rede entre dispositivos

### Quadros Elétricos
- [ ] Localização final de cada quadro
- [ ] Espaço disponível em cada quadro para instalação dos módulos
- [ ] Disjuntores dedicados para sistema de automação

---

## 🏭 FABRICANTE - VESTA (Piso Aquecido SAS920FHL-7)

### Integração do Controlador

*Sonda enviou manual*, está no link \Manuais equipamentos\920 fh wifi si en.pdf
- [ ] Protocolo de comunicação suportado (Modbus RTU/TCP, protocolo proprietário, ou apenas relés)?
- [ ] Documentação técnica da API/protocolo
- [ ] Existe integração pronta com Home Assistant?
- [ ] Se não existe integração pronta, é possível desenvolver? Documentação disponível?
- [ ] Possibilidade de controle via relés externos (bypass do controlador)

---

## 🎵 FORNECEDOR DE AUDIO/VIDEO - Verificar com vendedor de equipamentos multimídia

### Receiver Anthem
- [ ] Modelo específico do receiver
- [ ] Suporta controle via IP? (protocolo, porta, documentação)
- [ ] Se não suportar IP, suporta controle RS232?
- [ ] Documentação da API/protocolo de controle

### Amplificadores
- [ ] Marca e modelo dos amplificadores
- [ ] Protocolo de controle (IP, RS232, IR, ou sem controle remoto)
- [ ] Documentação técnica se houver controle automatizado

### TV LG
- [ ] Modelo específico da TV
- [ ] Confirmar suporte WebOS (modelos 2014+)
- [ ] Verificar se terá IP fixo ou DHCP

---

## 🌡️ FABRICANTE - LG (Ar Condicionado)

### Integração dos Aparelhos
- [ ] Os modelos escolhidos suportam integração via app LG ThinQ?
- [ ] A integração LG ThinQ funciona 100% local ou depende de servidor externo da LG?
- [ ] Existe API local documentada?
- [ ] Alternativa: os aparelhos aceitam controle via módulo Wi-Fi? Qual protocolo?
- [ ] Se for usar IR: confirmar que todos os modelos usam mesmo protocolo IR (facilitará programação)

---

## 📊 INFORMAÇÕES TÉCNICAS ADICIONAIS NECESSÁRIAS

### Fitas LED 24V
- [ ] Planilha detalhada com:
  - Metragem de cada circuito
  - Potência total por zona
  - Localização (ambiente + posição)
  - Temperatura de cor de cada fita

### Sensores de Temperatura (DS18B20)
- [ ] Quantos sensores serão necessários?
- [ ] Localização de cada sensor (ambiente)
- [ ] Finalidade de cada sensor (controle de AC, monitoramento, automação)

---

## 👥 CLIENTE - Verificar preferências e aprovação de funcionalidades

### Cenas Automáticas
- [ ] Cena "Bom Dia" (automação matinal):
  - Abre persianas gradualmente (20min)
  - Liga aquecimento de piso no banheiro (15min antes)
  - Música suave na suíte
  - Cliente aprova essa automação?

- [ ] Cena "Cinema" (ativação manual):
  - Fecha todas persianas
  - Luzes ambiente em 5%
  - Liga TV + Receiver + seleciona input correto
  - Ajusta temperatura para 22°C
  - Cliente aprova essa automação?

- [ ] Cena "Ausência" (ao sair de casa):
  - Desliga todas luzes
  - Desliga ACs
  - Ativa alarme (se houver)
  - Mantém apenas: geladeira, no-break, sistema automação
  - Cliente aprova essa automação?

- [ ] Cena "Férias" (simulação de presença):
  - Liga/desliga luzes aleatoriamente (18h-23h)
  - Abre/fecha persianas em horários normais
  - Mantém irrigação funcionando
  - Cliente aprova essa automação?

- [ ] Cliente deseja outras cenas específicas? Quais?

### Interface dos Painéis Touch
- [ ] Preferência de cor/estilo da interface:
  - Moderno (flat design, minimalista)?
  - Clássico (botões com sombra, mais ornamentado)?
  - Futurista (neon, animações)?
  - Cliente tem referências visuais? (fotos, apps que gosta)

- [ ] Cor de destaque preferida:
  - Azul?
  - Verde?
  - Dourado/Amarelo?
  - Outra cor?

### Sensores de Segurança
- [✓] **Sensores de Vazamento**: Shelly Flood (WiFi)
  - **Resposta**: Aprovado
  - Custo estimado: 10-15 unidades (~R$1.500-2.700)
  - Locais: banheiros, cozinha, lavanderia, piscina, aquecedor

- [✓] **Sensores de Fumaça**: Shelly Plus Smoke (WiFi)
  - **Resposta**: Aprovado
  - Custo estimado: 8-12 unidades (~R$1.800-3.000)
  - Locais: quartos, salas, cozinha, corredores, área serviço

- [✓] **Sensores de Abertura (Porta/Janela)**: Shelly Door/Window 2
  - **Resposta**: Escolhido Shelly Door/Window 2 (WiFi, preto)
  - Estimativa: 18-30 sensores (todas janelas + portas principais)
  - Custo: ~R$4.125 (25 sensores x R$165)

- [ ] **Sensores de Presença mmWave**: Posicionamento e quantidades
  - Fabricação própria com ESP32 WiFi
  - Sensor recomendado: LD2410 ou LD2450
  - Estimativa inicial: 8-15 sensores
  - Locais sugeridos: sala, cozinha, quartos, corredores, home office
  - **Pendente**: Definir com arquiteto posições exatas e quantidades finais

### Sistema de Alarme
- [✓] **Alarme de Intrusão**: Cliente tem muito interesse!
  - **Resposta**: SIM, implementar
  - Modos: Ausente, Noite, Casa
  - Notificações push instantâneas
  - Integração com sirenes (Shelly Plus Smoke)
  - Automações com aberturas de portas/janelas + câmeras

### Câmeras de Segurança
- [✓] **Câmeras IP**: 7 câmeras Unifi já definidas
  - **Resposta**: 7 câmeras Unifi no Unifi Protect (UDM-Pro SE)
  - Sistema já adquirido/planejado
  - Integração: UniFi Protect Integration para Home Assistant
  
- [ ] **Teste Técnico - Visualização câmeras nos painéis touch LVGL**:
  - Testar durante prototipagem (Fase 1)
  - Expectativa: Snapshot/foto a cada 2s (2fps) funciona, stream real HD provavelmente não
  - Limitação: ESP32 tem CPU/RAM insuficiente para decode vídeo H.264/H.265
  - Se funcionar satisfatoriamente: implementar em todos painéis
  - Se não funcionar bem: manter visualização apenas em tablets (app Unifi Protect)

### Controle de Acesso
- [✓] **Fechadura Inteligente**: Yale na porta principal
  - **Resposta**: Já definido - fechadura Yale (única da casa)
  - [ ] **Pendente**: Verificar com arquiteto o modelo exato da Yale
  - Validar compatibilidade com Home Assistant (Z-Wave/Zigbee/WiFi)
  - **IMPORTANTE**: SEM automações de trava/destrava (apenas monitoramento por segurança)
  - Notificações apenas: porta aberta >10min, código usado, tentativas falhas

### Qualidade do Ar
- [ ] **Sensores de Qualidade do Ar**: Cliente tem interesse?
  - Monitorar: CO2, VOC, PM2.5, Temperatura, Umidade
  - Opções: Awair Element (R$800-1000) ou AirGradient ONE (R$400-600)
  - Automações: Ventilação automática, controle de umidade

### Controle de Voz
- [ ] **Estratégia de Voz**: Decidir entre:
  - **Opção 1**: Apenas Alexa (~5 dispositivos) - Facilidade de uso
  - **Opção 2**: Apenas HA Voice (ESP32 com mic) - Privacidade, 100% local
  - **Opção 3**: Híbrido (Alexa principal + HA Voice backup) - Melhor dos dois mundos
  - Qual é mais importante para o cliente: facilidade de uso ou privacidade?

### Tablets
- [ ] **Especificações dos Tablets**:
  - Modelo/marca preferida (Samsung Galaxy Tab, iPad, Android genérico)
  - Tamanho da tela (8", 10", 12")
  - Tipo de montagem (parede, suporte de mesa, móvel)
  - Quantidade confirmada: 2 tablets
  - Sistema: App oficial Home Assistant (iOS/Android)

---

---

---

## ⚙️ DECISÕES CONFIRMADAS - CONFIGURAÇÃO E INFRAESTRUTURA

### Backup e Redundância
- [✓] **Scripts de Backup**: APROVADO - Criar configuração automática
  - **Resposta**: SIM, incluir nos scripts
  - Snapshot HA diário (3h, reter 7 dias local)
  - Export para UGREEN via Samba Backup
  - Snapshot Proxmox VM semanal
  - Backup Git automático de configs

- [✓] **Redundância de Internet**: Documentar como recomendação opcional
  - **Resposta**: Não implementar agora, deixar na documentação como sugestão
  - Opção para cliente: 4G/5G backup com failover automático
  - Custo seria: Hardware inicial + chip dados mensal

### Monitoramento Remoto
- [✓] **Dashboard de Monitoramento para Integrador**: APROVADO!
  - **Resposta**: SIM, configurar completo
  - Uptime Kuma para monitor de status
  - Tailscale VPN para acesso remoto seguro
  - Notificações Telegram para alertas:
    - ESP32 offline >10min
    - Temperatura anormal
    - Backup falhou
    - Relatório diário (status geral)

---

## ⚙️ PENDÊNCIAS - CONFIGURAÇÃO E INFRAESTRUTURA

### UPS/No-Break
- [ ] **No-break**: Cliente aprova investimento?
  - Equipamentos críticos: ~225W total (Mini-PC, UDM-Pro SE, Switch PoE, Storage)
  - Recomendado: APC Back-UPS 600VA ou SMS 800VA
  - Integração HA para monitorar bateria e alertar
  - Shutdown automático se bateria crítica

---

**Última atualização**: 20/11/2025
**Status**: 🟢 Fase de planejamento avançada - Aguardando dados externos para implementação

**Localização do projeto**: Caxias do Sul - RS - Brasil (CEP 95012-617)

**Decisões Confirmadas**: 
- Hardware principal definido (ESP32s, sensores Shelly, módulos I2C)
- Software stack escolhido (HAOS + ESPHome + LVGL)
- Sensores de segurança selecionados (Shelly ecosystem - WiFi)
- Sistema de alarme aprovado pelo cliente
- Câmeras e fechadura já existentes no projeto
- Monitoramento remoto para integrador confirmado
- Backup automático confirmado

**Contexto Completo**: Ver `PROJECT-CONTEXT.md` para todas as decisões técnicas finais

