# Changelog - Projeto Guila's

Todas as mudancas relevantes do projeto serao documentadas neste arquivo.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased]

### Adicionado
- 2026-01-24: Firmware ESP32 para cortinas motorizadas do terreo
  - Arquivo: `Firmware/ESP32-Cortinas/terreo/esp-cortinas-terreo.yaml`
  - Controle de 4 cortinas via XL9535 (8 reles)
  - Cortinas: Estar, Jantar, Office, Reserva
  - Documentacao de pinos em `mapeamento-pinos.md`
  - Usa base-config.yaml via packages
- 2026-01-24: Arquivo secrets.yaml.example criado em Firmware/
- 2026-01-24: Proxmox configurado com pve-post-install
  - Repositorios enterprise desabilitados
  - Repositorios no-subscription habilitados
  - Popup de subscription removido
- 2026-01-24: Tailscale instalado e configurado no Proxmox
  - Conta: felipetonietto@gmail.com
  - IP Tailscale: 100.68.65.65
  - Subnet routing habilitado: 192.168.1.0/24
  - IP forwarding ativado
- 2026-01-23: Estrutura de agentes IA em `.claude/agents/`
  - docs.md - Agente de documentacao
  - esphome.md - Agente de firmware ESPHome
  - homeassistant.md - Agente de Home Assistant
  - infra.md - Agente de infraestrutura
  - review.md - Agente de revisao
- 2026-01-23: CLAUDE.md com instrucoes gerais para Claude Code
- 2026-01-23: CHANGELOG.md para registro de mudancas
- 2026-01-23: Firmware/ESPHOME_REFERENCE.md - Referencia completa de breaking changes
  - Cobre 14 releases (2024.11.0 ate 2026.1.1)
  - Checklist de migracao
  - Configuracao recomendada para 2026.1.x

### Alterado
- (nenhum)

### Removido
- 2026-01-23: Arquivos temporarios da raiz (nul, temp_cortinas.md)

### Corrigido
- (nenhum)

---

## Legenda

- **Adicionado** para novos recursos
- **Alterado** para mudancas em recursos existentes
- **Removido** para recursos removidos
- **Corrigido** para correcoes de bugs
- **Seguranca** para vulnerabilidades corrigidas
