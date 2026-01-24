# ESP32 Painel Térreo Principal

**Hardware**: ESP32 Ethernet + MCP23017 I2C  
**Localização**: Quadro elétrico térreo  
**VLAN**: 10 (IoT Crítico)  
**IP**: 192.168.10.101 (estático via Unifi)

---

## 📋 Resumo

Este painel controla toda iluminação e automação do pavimento térreo:
- **17 interruptores** (pulsadores sem retenção)
- **40+ circuitos** (luzes 220V + LEDs 24V)
- **Múltiplos cliques** (1/2/3 cliques + hold)
- **Modo autônomo** (funciona sem Home Assistant)

---

## 🔌 Hardware

### ESP32 Principal
- **Modelo**: ESP32 com Ethernet (LAN8720)
- **Conexão**: Ethernet (cabo Cat6)
- **Alimentação**: Fonte 10A centralizada

### Expansores I2C (MCP23017)
- **Chip 1 (0x20)**: 16 entradas (pulsadores)
- **Chip 2 (0x21)**: 16 saídas (relés 220V parte 1)
- **Chip 3 (0x22)**: 16 saídas (relés 220V parte 2)
- **Distância máxima**: <30cm entre chips

### Módulos de Relés
- **SS4H** (iluminação 220V)
- **Shelly RGBW2** (LEDs 24V - 3-4 unidades)

---

## 📝 Circuitos

Ver arquivo completo: `circuitos.md` (mesma pasta)

### Resumo por Zona
- **Garagem**: 1 interruptor, 1 circuito
- **Área Serviço**: 5 interruptores, 7 circuitos
- **Escritório**: 1 interruptor, 3 circuitos
- **Lavabo**: 1 interruptor, 1 circuito
- **Living/Sala**: 3 interruptores, 15+ circuitos
- **Cozinha/Jantar**: 3 interruptores, 18+ circuitos

---

## 🎮 Lógica de Pulsadores

### Interruptores Simples (1 circuito)
- **1 clique**: Liga/desliga

### Interruptores Duplos (2 circuitos)
- **1 clique**: Liga/desliga luz principal
- **2 cliques**: Liga/desliga luz secundária

### Interruptores Múltiplos (3+ circuitos)
- **1 clique**: Liga/desliga principal
- **2 cliques**: Liga/desliga secundária
- **3 cliques**: Desliga TODOS do ambiente
- **Hold (2s)**: Cena personalizada

---

## 🚀 Como Programar

### Primeira Vez (USB)
```bash
cd src/firmware/paineis-eletricos/terreo-principal
esphome run esp-painel-terreo-principal.yaml
```

### Atualizações (OTA)
```bash
esphome run esp-painel-terreo-principal.yaml --device esp-painel-terreo-principal.local
```

### Web Interface
http://esp-painel-terreo-principal.local (após conectar)

---

## 📊 Status de Implementação

### Fase 1: Básico
- [ ] Configurar Ethernet
- [ ] Configurar I2C + MCP23017
- [ ] Testar 1 entrada + 1 saída
- [ ] Integração Home Assistant

### Fase 2: Pulsadores
- [ ] Implementar debounce
- [ ] Lógica 1 clique
- [ ] Lógica 2 cliques
- [ ] Lógica 3 cliques
- [ ] Lógica hold

### Fase 3: Circuitos
- [ ] Mapear todos 17 interruptores
- [ ] Mapear todas saídas 220V
- [ ] Configurar Shelly RGBW2 (LEDs 24V)
- [ ] Testar circuitos compartilhados

### Fase 4: Automações
- [ ] Cenas por ambiente
- [ ] Modo ausência
- [ ] Integração com sensores presença
- [ ] Controle via voz

### Fase 5: Validação
- [ ] Teste completo todos circuitos
- [ ] Teste de autonomia (sem HA)
- [ ] Stress test 48h
- [ ] Aprovação cliente

---

## 🔗 Referências

- **Circuitos completos**: `circuitos.md`
- **Config ESPHome**: `esp-painel-terreo-principal.yaml`
- **Excel original**: `docs/arquitetura/circuitos/`
- **PROJECT-CONTEXT.md**: Decisões técnicas gerais

---

**Status**: 🔴 Configuração inicial  
**Próximo passo**: Criar arquivo ESPHome YAML

**Última atualização**: 02/12/2025

