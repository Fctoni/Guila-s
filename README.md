# Projeto Guilas - Automação Residencial Premium

Sistema de automação residencial 100% local para residência premium em Le Parc, Caxias do Sul/RS.

## 📋 Visão Geral

- **Cliente**: Projeto Guilas
- **Tipo**: Automação Residencial Premium
- **Filosofia**: 100% local, sem dependências de nuvem (exceto opcionais)
- **Plataforma**: Home Assistant OS (Proxmox VM)
- **Conectividade**: Unifi Network (UDM-Pro SE + Unifi U7 APs)

## 🏗️ Arquitetura Técnica

- **Servidor**: Mini-PC Beelink i3-1240P (12ª geração) + Proxmox
- **Home Assistant**: VM dedicada (4 vCPUs, 4-8GB RAM, 32GB disco)
- **Storage**: UGREEN DXP480T Plus (NAS)
- **Rede**: VLANs segregadas, DNS local, IPs estáticos
- **Backup**: Snapshots diários → UGREEN + redundância externa
- **Acesso Remoto**: Tailscale VPN (seguro, sem port forwarding)
- **Monitoramento**: Uptime Kuma + Telegram Bot

## 🎛️ Dispositivos

### Painéis de Comando (Ethernet + I2C)
- ESP32 Ethernet + MCP23017 (expansor I2C)
- Módulos SS4H (iluminação 220V)
- Módulos relés (persianas)
- 1 painel por andar, instalado no quadro elétrico

### Painéis Touch (WiFi)
- 6x ESP32-8048S070 (display 7" 800x480)
- Interface LVGL minimalista
- Sleep mode ativo

### Sensores Customizados (WiFi)
- Presença mmWave (LD2410) - 8-15 unidades
- Temperatura (DS18B20) - Integrados nos termostatos
- Termostatos piso aquecido - 10 zonas
  - **Hardware em teste**: UEDX48480040E-WB-A (display quadrado 4")
  - **Framework**: Arduino + LVGL + Home Assistant API

### Sensores Shelly (WiFi)
- Door/Window 2 - 18-30 sensores (abertura)
- Flood - 10-15 sensores (vazamento)
- Plus Smoke - 8-12 sensores (fumaça)
- RGBW2 - Dimmer fitas LED 24V

### Outros
- 6x LG AC (ThinQ + IR backup)
- 7x Câmeras Unifi G5 Turret Ultra (Unifi Protect) + 8 esperas
- 1x Fechadura Yale (monitoramento apenas)
- Receiver Anthem + TV LG (multimídia)
- Piscina (4 pontos LED, painel externo)
- Irrigação (5 zonas)

## 📁 Estrutura do Repositório

```
Guilas/
├── .claude/
│   └── agents/             # Agentes IA especializados
├── docs/
│   ├── comercial/          # Contrato, proposta, SLA
│   ├── requisitos/         # PRD, user stories, casos de uso
│   ├── arquitetura/        # Diagramas (rede, elétrico, topologia)
│   ├── manuais/            # Manuais (usuário, técnico, troubleshooting)
│   ├── equipamentos/       # PDFs de equipamentos
│   ├── decisoes/           # Logs de conversas e decisões
│   └── padroes/            # Padrões de código
├── src/
│   ├── firmware/           # ESPHome configs
│   │   ├── common/         # Configs compartilhadas
│   │   ├── paineis-eletricos/  # Painéis de comando (Ethernet)
│   │   ├── paineis-touch/  # Painéis touch (LVGL)
│   │   ├── sensores/       # Sensores (mmWave, temperatura)
│   │   ├── cortinas/       # Cortinas motorizadas
│   │   └── termostatos/    # Termostatos piso aquecido
│   └── homeassistant/      # Configs Home Assistant
│       ├── config/         # configuration.yaml, automations, etc
│       └── dashboards/     # Dashboards customizados
├── hardware/
│   ├── esquematicos/       # Esquemas elétricos
│   ├── pcb/                # PCBs customizadas
│   ├── bom/                # Listas de materiais
│   └── datasheets/         # Datasheets técnicos
├── scripts/
│   ├── backup/             # Scripts backup automático
│   ├── deploy/             # Deploy firmwares/configs
│   └── monitoring/         # Configs monitoramento
├── tracking/
│   ├── alteracoes/         # Controle de alterações
│   ├── fases/              # Fases do projeto
│   └── bugs/               # Bugs em teste
├── PROJECT-CONTEXT.md      # 📌 Contexto geral do projeto (LEIA PRIMEIRO)
└── README.md               # Este arquivo
```

## 🚀 Início Rápido

### Para IAs Futuras:
1. **Leia primeiro**: `PROJECT-CONTEXT.md` - Contexto completo e decisões finais
2. **Pendências**: `docs/decisoes/pendencias.md` - O que ainda falta definir
3. **Guia de interação**: `docs/decisoes/Guia para IA.md` - Como interagir neste projeto
4. **Histórico**: `docs/decisoes/20251120.md` e `20251201.md` - Conversas detalhadas

### Para Humanos:
- **Contexto rápido**: Leia `PROJECT-CONTEXT.md`
- **Documentação técnica**: `docs/manuais/Manual-Tecnico.md`
- **Manual do proprietário**: `docs/manuais/Manual-Usuario.md`

## 📊 Status do Projeto

**Fase Atual**: Fase 1 - Planejamento e Documentação

### Fases:
1. ✅ **Planejamento** - Definir arquitetura, hardware, funcionalidades
2. 🔄 **Levantamento** - Plantas, metragens, pontos (com arquiteto/eletricista)
3. ⏳ **Desenvolvimento** - Firmware ESP32s, configs HA, interface LVGL
4. ⏳ **Instalação** - Montagem física, cabeamento, instalação dispositivos
5. ⏳ **Testes** - Validação completa, ajustes, otimizações
6. ⏳ **Entrega** - Treinamento cliente, documentação final, garantia

## 🔒 Segurança

- Credenciais em `secrets.yaml` (NÃO commitado ao Git)
- VLANs segregadas (crítico/sensores/visitantes)
- Fechadura sem automações (apenas monitoramento)
- Backup criptografado e redundante
- Acesso remoto apenas via Tailscale VPN

## 📞 Contatos e Suporte

- **Garantia**: 1 ano
- **SLA**: 24h para problemas críticos
- **Monitoramento**: 24/7 com alertas automáticos

## 📝 Licença e Propriedade

- **Código customizado**: Propriedade do integrador
- **Configurações específicas**: Confidencial do cliente
- **Ferramentas open-source**: Home Assistant, ESPHome (licenças respectivas)

---

**Última atualização**: 02/12/2025  
**Versão**: 1.1.0
