# Análise de Infraestrutura e Hardware

**Projeto:** Casa Le Parc - Automação Residencial
**Data da Análise:** 2026-01-23
**Versão:** 1.0

---

## 1. Configurações de Proxmox, VMs e Containers

### 1.1 Servidor Físico

| Componente | Especificação |
|------------|---------------|
| Hardware | Beelink Mini-PC |
| Processador | Intel i3-1240P |
| Sistema | Proxmox VE |
| Função | Hypervisor principal |

### 1.2 Máquinas Virtuais Configuradas

| VM | Recursos | Disco | Função |
|----|----------|-------|--------|
| Home Assistant OS | 4 vCPUs, 4-8GB RAM | 32GB | Central de automação |

### 1.3 Scripts de Deployment Disponíveis

O diretório `proxmoxHelperScripts-Github/ProxmoxVE-main/` contém scripts para:

**Containers (LXC):**
- Proxmox Backup Server
- Proxmox Datacenter Manager
- Proxmox Mail Gateway
- Docker (Alpine/Debian)
- 100+ outros templates

**VMs:**
- HAOS (Home Assistant OS)
- Docker VM
- Ubuntu/Debian
- OpenWRT / OPNsense
- Nextcloud / Owncloud
- MikroTik RouterOS

**Ferramentas Pós-Instalação:**
- Updates e upgrades do PVE
- Passthrough USB
- Monitoramento (`monitor-all.sh`)
- Pinning de kernel

### 1.4 Estrutura de Backup

| Parâmetro | Configuração |
|-----------|--------------|
| Frequência | Diário às 3h |
| Retenção local | 7 dias |
| Destino externo | NAS UGREEN (Samba) |
| Backup de configs | Git automático |

---

## 2. Mapeamento de Rede

### 2.1 Gateway e Equipamentos Core

| Dispositivo | IP | Função |
|-------------|-----|--------|
| UDM-Pro SE (Unifi) | 192.168.10.1 | Gateway/Firewall/Controller |
| Access Points | - | Unifi U7 (WiFi 6) |
| Switch | - | PoE-enabled (Unifi) |

### 2.2 VLANs Configuradas

| VLAN | Subnet | Função | Dispositivos |
|------|--------|--------|--------------|
| 1 (Principal) | 192.168.1.0/24 | Dispositivos pessoais | Tablets, celulares, PCs |
| 10 (IoT Crítico) | 192.168.10.0/24 | Automação core | ESP32 Painéis Ethernet, Home Assistant |
| 20 (IoT Sensores) | 192.168.20.0/24 | Sensores e displays | Sensores Shelly, painéis touch WiFi |
| 30 (Visitantes) | 192.168.30.0/24 | Guest WiFi | Acesso somente internet |

### 2.3 IPs Estáticos Documentados

| IP | Dispositivo | VLAN |
|----|-------------|------|
| 192.168.10.1 | UDM-Pro SE | 10 |
| 192.168.10.10 | Home Assistant VM | 10 |
| 192.168.10.101 | ESP32 Painel Térreo Principal | 10 |
| 192.168.10.102 | ESP32 Painel Superior | 10 |

### 2.4 DNS Local (Unifi)

| Hostname | IP |
|----------|-----|
| homeassistant.local | 192.168.10.10 |
| esp-painel-terreo.local | 192.168.10.101 |

### 2.5 Regras de Firewall

| Origem | Destino | Ação |
|--------|---------|------|
| VLAN 20 (sensores) | VLAN 1 (principal) | **BLOQUEAR** |
| VLAN 10 (crítico) | Todas VLANs | PERMITIR |
| VLAN 30 (guest) | Rede local | **BLOQUEAR** (somente internet) |

---

## 3. Hardware Físico Documentado

### 3.1 Infraestrutura de Servidor

| Item | Modelo/Especificação | Quantidade | Status |
|------|---------------------|------------|--------|
| Mini-PC | Beelink i3-1240P | 1 | Instalado |
| NAS Backup | UGREEN | 1 | Instalado |
| No-break/UPS | A definir | 1 | **PENDENTE** |

### 3.2 Rede

| Item | Modelo | Quantidade | Status |
|------|--------|------------|--------|
| Gateway/Router | Unifi UDM-Pro SE | 1 | Instalado |
| Access Points | Unifi U7 (WiFi 6) | A definir | Instalado |
| Switch PoE | Unifi (modelo não especificado) | A definir | Instalado |

### 3.3 ESP32 - Painéis de Comando (Ethernet - VLAN 10)

| Dispositivo | Hardware | Entradas | Saídas | Status |
|-------------|----------|----------|--------|--------|
| esp-painel-terreo-principal | ESP32 + 4x MCP23017 | 24 | 13 (220V) + 11 (LED 24V) | Configurado |
| esp-painel-superior-norte | ESP32 + MCP23017 | A definir | A definir | Planejado |
| esp-painel-superior-sul | ESP32 + MCP23017 | A definir | A definir | Planejado |

**Endereços I2C (Térreo Principal):**
- 0x20 - INPUT (16 entradas)
- 0x21 - OUTPUT (8 relés)
- 0x25 - OUTPUT (8 relés)
- 0x26 - INPUT (16 entradas)

### 3.4 ESP32 - Painéis Touch (WiFi - VLAN 20)

| Dispositivo | Hardware | Localização | Status |
|-------------|----------|-------------|--------|
| painel-touch-hall-entrada | ESP32-8048S070 | Hall entrada | Planejado |
| painel-touch-sala-estar | ESP32-8048S070 | Sala de estar | Planejado |
| 4 painéis adicionais | ESP32-8048S070 | A definir | Planejado |

**Total:** 6 unidades

### 3.5 Termostatos Piso Aquecido

| Hardware | Quantidade | Display | Status |
|----------|------------|---------|--------|
| ESP32-S3 + UEDX48480040E-WB-A | 10 | 4" 480x480 touch | Firmware pronto |

**Especificações do Display:**
- Driver: GC9503V (RGB Parallel 16-bit)
- Touch: FT6336U (I2C Capacitive)
- MCU: ESP32-S3 (16MB Flash, 8MB PSRAM)
- Framework: ESPHome + LVGL

### 3.6 Sensores

| Tipo | Modelo | Quantidade | VLAN |
|------|--------|------------|------|
| Presença mmWave | LD2410 | 8-15 | 20 |
| Temperatura | DS18B20 | Integrado termostatos | 20 |
| Abertura (porta/janela) | Shelly Door/Window 2 | 18-30 | 20 |
| Vazamento | Shelly Flood | 10-15 | 20 |
| Fumaça | Shelly Plus Smoke | 8-12 | 20 |
| LEDs 24V | Shelly RGBW2 | 3-4 | 20 |

### 3.7 Câmeras

| Modelo | Quantidade | Expansão | Status |
|--------|------------|----------|--------|
| Unifi G5 Turret Ultra | 7 | +8 pontos | Instalado |

### 3.8 Climatização

| Equipamento | Modelo | Quantidade | Integração |
|-------------|--------|------------|------------|
| Ar-condicionado | LG (diversos) | 6 | ThinQ API |
| Piso aquecido | Controladores custom | 10 zonas | ESP32/ESPHome |

### 3.9 Outros Dispositivos

| Dispositivo | Modelo | Integração | Status |
|-------------|--------|------------|--------|
| Fechadura | Yale (modelo a definir) | Monitoramento apenas | Pendente |
| TV | LG WebOS | WebOS Integration | Instalado |
| Receiver | Anthem | A definir | Pendente |
| Piscina | ESP32 WiFi | ESPHome | Planejado |
| Irrigação | ESP32 WiFi (5 zonas) | ESPHome | Planejado |
| Tablets | A definir | HA App | Pendente |

---

## 4. Scripts de Automação de Infraestrutura

### 4.1 Proxmox Helper Scripts

**Localização:** `proxmoxHelperScripts-Github/ProxmoxVE-main/`

| Diretório | Função | Scripts |
|-----------|--------|---------|
| `ct/` | Criação de containers LXC | 100+ templates |
| `vm/` | Criação de VMs | HAOS, Docker, Ubuntu, etc. |
| `install/` | Instalação automatizada | Configs JSON |
| `tools/pve/` | Ferramentas pós-install | Updates, USB, monitoring |

**Scripts Principais:**
- Container deployment com configuração automática
- VM creation com passthrough de hardware
- Backup e restore automatizados
- Monitoramento de recursos

### 4.2 Configurações ESPHome

**Localização:** `Firmware/`

| Diretório | Função |
|-----------|--------|
| `common/base-config.yaml` | Configuração base compartilhada |
| `ESP32-Paineis-Eletricos/` | Firmware painéis de comando |
| `ESP32-Tersmostatos/` | Firmware termostatos LVGL |

**Funcionalidades Compartilhadas:**
- WiFi/Ethernet config
- Home Assistant API
- OTA updates
- Logger (INFO level)
- Timezone: America/Sao_Paulo
- Web server (porta 80)
- Status LED (GPIO2)

### 4.3 Home Assistant Automations

**Localização:** `Home-Assistant/`

| Arquivo | Função |
|---------|--------|
| `configuration.yaml` | Configuração principal |
| `automations.yaml` | Automações |
| `scripts.yaml` | Scripts |
| `scenes.yaml` | Cenas |

**Categorias de Automação:**
- Iluminação inteligente (baseada em presença)
- Climatização (agendamento AC, piso aquecido)
- Segurança (alarmes, monitoramento de portas)
- Irrigação (8h + 18h diário)
- Backup (snapshot às 3h)
- Monitoramento (alertas ESP32 offline, anomalias temperatura)

---

## 5. Gaps Identificados e Sugestões de Melhorias

### 5.1 Gaps Críticos

| Gap | Impacto | Prioridade |
|-----|---------|------------|
| **UPS/No-break não definido** | Sistema sem proteção contra quedas de energia | **CRÍTICO** |
| **Modelo Yale não confirmado** | Integração de fechadura pode falhar | ALTO |
| **Plantas baixas pendentes** | Posicionamento de sensores indefinido | ALTO |
| **Protocolo Anthem desconhecido** | Integração de áudio pendente | MÉDIO |

### 5.2 Gaps de Documentação

| Item | Status |
|------|--------|
| IPs dos painéis superior norte/sul | Não definidos |
| Quantidade exata de APs Unifi | Não documentada |
| Modelo exato do switch PoE | Não especificado |
| Posições das 7 câmeras | Pendente com arquiteto |
| Localização dos 4 painéis touch restantes | A definir |

### 5.3 Sugestões de Melhorias

#### Infraestrutura de Servidor

| Sugestão | Justificativa | Complexidade |
|----------|---------------|--------------|
| **Definir UPS imediatamente** | Proxmox + HA requerem shutdown gracioso | Baixa |
| **Implementar cluster Proxmox** | Redundância (se segundo mini-PC disponível) | Alta |
| **Container para Uptime Kuma** | Monitoramento centralizado | Baixa |
| **Container para Grafana + InfluxDB** | Métricas históricas | Média |

#### Rede

| Sugestão | Justificativa | Complexidade |
|----------|---------------|--------------|
| **Documentar todos IPs estáticos** | Criar tabela completa de alocação | Baixa |
| **Implementar VLAN para câmeras** | Isolar tráfego de vídeo (VLAN 40?) | Média |
| **Configurar backup DNS** | Redundância para resolução local | Baixa |
| **QoS para VLAN 10** | Priorizar tráfego de automação crítica | Média |

#### Dispositivos ESP32

| Sugestão | Justificativa | Complexidade |
|----------|---------------|--------------|
| **Fallback WiFi para painéis Ethernet** | Redundância de conectividade | Baixa |
| **Documentar GPIO mapping completo** | Facilitar manutenção futura | Baixa |
| **Criar firmware de diagnóstico** | Self-test de I/O para troubleshooting | Média |

#### Backup e Recuperação

| Sugestão | Justificativa | Complexidade |
|----------|---------------|--------------|
| **Backup offsite (cloud)** | Proteção contra desastre local | Média |
| **Documentar procedimento DR** | Disaster recovery step-by-step | Baixa |
| **Testar restore periodicamente** | Validar integridade dos backups | Baixa |

#### Monitoramento

| Sugestão | Justificativa | Complexidade |
|----------|---------------|--------------|
| **Alertas para Proxmox** | CPU, RAM, disco do hypervisor | Baixa |
| **Monitorar temperatura CPU** | Beelink pode superaquecer | Baixa |
| **Dashboard de status de rede** | Visibilidade de VLANs e dispositivos | Média |

### 5.4 Decisões Pendentes com Cliente

| Decisão | Impacto |
|---------|---------|
| Modelo/tamanho de tablets | Compra e montagem |
| Preferências UI touch/termostatos | Design de interface |
| Aprovação de cenas de automação | Comportamento do sistema |
| Investimento em sensores de segurança | Escopo de segurança |
| Estratégia de controle por voz | Alexa vs HA Voice vs Siri |
| Especificações do UPS | Capacidade e autonomia |

### 5.5 Informações Pendentes com Fornecedores

| Item | Fornecedor |
|------|------------|
| Protocolo de integração Anthem | Fabricante/distribuidor |
| Modelos e protocolos dos amplificadores | Fornecedor de áudio |
| Compatibilidade exata Yale | Yale Brasil |

---

## 6. Resumo Executivo

### Pontos Fortes

- Arquitetura de rede bem planejada com VLANs segregadas
- Documentação detalhada de circuitos elétricos e fiação
- Firmware ESPHome padronizado e modular
- Operação 100% local (sem dependência de cloud)
- Scripts de automação de infraestrutura disponíveis
- Estratégia de backup definida

### Pontos de Atenção

- **UPS não definido** - risco de corrupção de dados em queda de energia
- Algumas informações de hardware incompletas (modelos específicos)
- Falta documentação de disaster recovery
- Monitoramento de infraestrutura não implementado

### Recomendação Imediata

1. **Definir e instalar UPS** para Proxmox/HA
2. **Completar tabela de IPs** estáticos
3. **Documentar modelo exato** de todos equipamentos de rede
4. **Criar container Uptime Kuma** para monitoramento

---

## Anexo: Estrutura de Arquivos de Infraestrutura

```
Guila-s-1/
├── Documentacao/
│   └── 03-Arquitetura/
│       ├── Diagrama-Rede.md          # VLANs, IPs, DNS
│       ├── Topologia-Dispositivos.md # Hardware completo
│       └── circuitos/
│           ├── tabela_eletricista.md
│           ├── terreo-principal.md
│           └── guia-cores-fiacao.md
├── Firmware/
│   ├── common/base-config.yaml
│   ├── ESP32-Paineis-Eletricos/
│   └── ESP32-Tersmostatos/
├── Home-Assistant/
│   ├── configuration.yaml
│   ├── automations.yaml
│   ├── scripts.yaml
│   └── scenes.yaml
├── proxmoxHelperScripts-Github/
│   └── ProxmoxVE-main/
│       ├── ct/    # Container scripts
│       ├── vm/    # VM scripts
│       └── tools/ # PVE tools
└── PROJECT-CONTEXT.md                # Contexto geral
```

---

*Relatório gerado automaticamente por Claude Code*
