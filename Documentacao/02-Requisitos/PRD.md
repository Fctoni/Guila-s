# PRD - Product Requirements Document - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter o documento de requisitos do produto de forma detalhada.

### O que incluir:
1. **Visão Geral**
   - Objetivo do projeto
   - Stakeholders
   - Escopo geral

2. **Requisitos Funcionais** (baseado em PROJECT-CONTEXT.md)
   
   **RF-01: Iluminação**
   - Sistema deve controlar iluminação 220V (on/off)
   - Sistema deve controlar fitas LED 24V (dimerização 0-100%)
   - Pulsadores devem suportar múltiplos cliques (1, 2, 3, hold)
   - Deve haver interruptores físicos de backup
   
   **RF-02: Persianas**
   - Sistema deve controlar persianas motorizadas
   - Calibração por tempo
   - Controle de posição (0-100%)
   
   **RF-03: Climatização**
   - Integração com 6 ACs LG via ThinQ
   - Controle de 10 zonas de piso aquecido
   - Sensores de temperatura ambiente (DS18B20)
   
   [... e assim por diante para cada funcionalidade]

3. **Requisitos Não Funcionais**
   
   **RNF-01: Performance**
   - Latência de acionamento < 500ms
   - Painéis touch devem responder em < 100ms
   
   **RNF-02: Disponibilidade**
   - Sistema deve funcionar 99.9% do tempo
   - Modo autônomo em ESP32s (funciona sem HA)
   
   **RNF-03: Segurança**
   - Fechadura sem automações (apenas monitoramento)
   - VLANs segregadas
   - Comunicação local (sem dependência internet)
   
   **RNF-04: Usabilidade**
   - Interface minimalista
   - Fundo escuro
   - Sleep mode ativo

4. **User Stories**
   - Como usuário, quero acender luz pela voz
   - Como usuário, quero ver câmeras no celular
   [... etc]

5. **Casos de Uso**
   - UC-01: Acender luz principal da sala
   - UC-02: Ativar cena "Cinema"
   [... etc]

### Referências:
- `PROJECT-CONTEXT.md` - Todas funcionalidades detalhadas
- `Conversas/pendencias.md` - Requisitos ainda indefinidos

---

**Status**: 🔴 Aguardando criação após finalizar pendências

