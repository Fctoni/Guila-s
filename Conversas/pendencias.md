# Pendências do Projeto Guilas


## 📝 NOTAS PARA FUTURAS IAs

Quando você (IA futura) ler este documento:

1. **Priorize ler também**:
   - `README.md` - Visão geral do projeto
   - `PROJECT-CONTEXT.md` - Decisões técnicas finais e informações confirmadas
   - `Conversas/20251120.md` - Contexto completo das decisões iniciais
   - `Guia para IA.md` - Regras de interação

2. **Ao receber atualizações**:
   - Identifique quais pendências foram resolvidas
   - Pergunte se alguma resposta impacta decisões técnicas já tomadas
   - Atualize documentos relacionados (PROJECT-CONTEXT.md, diagramas, etc)

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

### Câmeras de Segurança (posicionamento)
- [ ] Posição exata de cada uma das **7 câmeras instaladas** (Unifi G5 Turret Ultra)
- [ ] Posição exata de cada uma das **8 esperas** de infraestrutura para câmeras futuras
- [ ] Mapa/planta com marcação das câmeras e esperas

### Piscina (verificações finais)
- [ ] Verificar marca do controlador de iluminação instalado
- [ ] Confirmar se são exatamente 4 pontos de luz
- [ ] Confirmar tipo exato de iluminação (azul padrão ou LED RGB)

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

### ✅ RESOLVIDO - Desenvolvimento Próprio

**Situação**: O fabricante enviou o manual (ver `\Manuais equipamentos\920 fh wifi si en.pdf`), mas o controlador não é compatível com a automação desejada.

**Decisão**: Desenvolver termostato próprio integrado ao Home Assistant

**Hardware em teste**:
- [✓] UEDX48480040E-WB-A (em aquisição - display quadrado 4" 480x480)
  - **Motivo da escolha**: Formato quadrado elegante para termostato
  - **Especificações**: ESP32-S3, display GC9503V RGB paralelo, touch FT6336U
  - **Framework**: Arduino + LVGL (ESPHome não suporta nativamente)
  - **Repositório**: https://github.com/VIEWESMART/UEDX48480040ESP32-4inch-Touch-Display
  - **Documentação**: Ver `Documentacao/05-Manuais-Equipamentos/displays/UEDX48480040E-WB-A.md`
  - **Testes**: Ver `Firmware/ESP32-Paineis-Touch/validacoes/teste_UEDX48480040E/`
- [✓] UEDX80480043E-WB-A (alternativa retangular)
- [✓] ESP32-3248S035 (alternativa 3.5")
- [ ] **Pendente**: Testar e definir modelo final após recebimento

**Próximos passos**: Ver seção "Termostatos Piso Aquecido" no `PROJECT-CONTEXT.md`

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

### ✅ RESOLVIDO - Integração LG ThinQ Confirmada

**Respostas**:
- [✓] Os modelos escolhidos suportam integração via app LG ThinQ? **SIM**
- [✓] A integração LG ThinQ funciona 100% local ou depende de servidor externo da LG? **Depende de servidor externo**
- [✓] Existe API local documentada? **Existe integração no HA, porém depende do servidor da LG**
- [✓] Alternativa: os aparelhos aceitam controle via módulo Wi-Fi? Qual protocolo? **Já tem WiFi integrado**
- [✓] Se for usar IR: confirmar que todos os modelos usam mesmo protocolo IR? **Decidimos não usar IR inicialmente. Iremos usar a integração da própria LG**

**Decisão Final**: Usar integração LG ThinQ via Home Assistant (depende de servidor LG). Se a experiência for ruim, implementar plano B com controle IR local.

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

### Sensores de Segurança (aprovação de investimento)
- [ ] **Sensores de Vazamento**: Shelly Flood (WiFi)
  - Custo estimado: 10-15 unidades (~R$1.500-2.700)
  - Locais: banheiros, cozinha, lavanderia, piscina, aquecedor
  - Especificações oficiais: https://www.shelly.com/en/products/shop/shelly-flood
  - Cliente aprova o investimento?

- [ ] **Sensores de Fumaça**: Shelly Plus Smoke (WiFi)
  - Custo estimado: 8-12 unidades (~R$1.800-3.000)
  - Locais: quartos, salas, cozinha, corredores, área serviço
  - Especificações oficiais: https://www.shelly.com/en/products/shop/shelly-plus-smoke
  - Cliente aprova o investimento?

- [ ] **Sensores de Abertura (Porta/Janela)**: Shelly Door/Window 2
  - Estimativa: 18-30 sensores (todas janelas + portas principais)
  - Custo estimado: ~R$4.125 (25 sensores x R$165)
  - Especificações oficiais: https://www.shelly.com/en/products/shop/shelly-door-window-2
  - Cliente aprova o investimento?

- [ ] **Sensores de Presença mmWave**: Posicionamento e quantidades
  - Fabricação própria com ESP32 WiFi
  - Sensor recomendado: LD2410 ou LD2450
  - Estimativa inicial: 8-15 sensores
  - Locais sugeridos: sala, cozinha, quartos, corredores, home office
  - **Pendente**: Definir com arquiteto posições exatas e quantidades finais

### Controle de Acesso
- [ ] **Fechadura Yale**: Verificar com arquiteto o modelo exato
  - Validar compatibilidade com Home Assistant (Z-Wave/Zigbee/WiFi)
  - **IMPORTANTE**: SEM automações de trava/destrava (apenas monitoramento por segurança)
  - Notificações apenas: porta aberta >10min, código usado, tentativas falhas

### Câmeras de Segurança
- [ ] **Teste Técnico - Visualização câmeras nos painéis touch LVGL**:
  - Testar durante prototipagem (Fase 1)
  - Expectativa: Snapshot/foto a cada 2s (2fps) funciona, stream real HD provavelmente não
  - Limitação: ESP32 tem CPU/RAM insuficiente para decode vídeo H.264/H.265
  - Se funcionar satisfatoriamente: implementar em todos painéis
  - Se não funcionar bem: manter visualização apenas em tablets (app Unifi Protect)

### Qualidade do Ar
- [ ] **Sensores de Qualidade do Ar**: Cliente tem interesse?
  - Monitorar: CO2, VOC, PM2.5, Temperatura, Umidade
  - Opções: Awair Element (R$800-1000) ou AirGradient ONE (R$400-600)
  - Automações: Ventilação automática, controle de umidade

### Controle de Voz
- [ ] **Estratégia de Voz**: Decidir entre:
  - **Opção 1**: Apenas Alexa (~5 dispositivos) - Facilidade de uso, suporta português, Alexa está ficando burra e surda (amazon está piorando o serviço)
  - **Opção 2**: Apenas HA Voice - Privacidade, 100% local, português
  - **Opção 3**: Apple HomeKit via Siri - Integração nativa iOS, **limitação: apenas inglês*
  - Qual é mais importante para o cliente: facilidade de uso ou privacidade? Português é essencial?

### Tablets
- [ ] **Especificações dos Tablets**:
  - Modelo/marca preferida (Samsung Galaxy Tab, iPad, Android genérico)
  - Tamanho da tela (8", 10", 12")
  - Tipo de montagem (parede, suporte de mesa, móvel)
  - Quantidade confirmada: 2 tablets
  - Sistema: App oficial Home Assistant (iOS/Android)


## ⚙️ PENDÊNCIAS - CONFIGURAÇÃO E INFRAESTRUTURA

### UPS/No-Break
- [ ] **No-break**: Cliente aprova investimento?
  - Equipamentos críticos: ~225W total (Mini-PC, UDM-Pro SE, Switch PoE, Storage)
  - Recomendado: APC Back-UPS 600VA ou SMS 800VA
  - Integração HA para monitorar bateria e alertar
  - Shutdown automático se bateria crítica

---

**Última atualização**: 02/12/2025
**Status**: 🟢 Fase de planejamento avançada - Iniciando prototipagem

**Localização do projeto**: Caxias do Sul - RS - Brasil (Le Parc)

**Decisões Confirmadas** (já no PROJECT-CONTEXT.md): 
- Hardware principal definido (ESP32s, sensores Shelly, módulos I2C)
- Software stack escolhido (HAOS + ESPHome + LVGL)
- Sensores de segurança selecionados (Shelly ecosystem - WiFi)
- Sistema de alarme aprovado pelo cliente
- Câmeras (7 Unifi) e fechadura Yale já existentes no projeto
- Monitoramento remoto para integrador confirmado
- Backup automático confirmado
- **Especificações confirmadas (02/12/2025)**:
  - Display termostato: UEDX48480040E-WB-A (4" quadrado, em aquisição)
  - Framework termostato: Arduino + LVGL + Home Assistant API
  - Estrutura de testes criada em `Firmware/ESP32-Paineis-Touch/validacoes/`
- **Especificações confirmadas (01/12/2025)**:
  - 6 ACs LG com modelos e distribuição definidos
  - Integração LG ThinQ confirmada (via servidor LG)
  - 10 zonas de piso aquecido com metragens
  - Desenvolvimento de termostato próprio (Vesta incompatível)
  - Hardware termostato em teste: UEDX48480040E-WB-A (prioridade), UEDX80480043E-WB-A e ESP32-3248S035 (alternativas)
  - 5 zonas de irrigação com programação
  - Piscina com iluminação (4 pontos azul)

**Contexto Completo**: Ver `PROJECT-CONTEXT.md` para todas as decisões técnicas finais