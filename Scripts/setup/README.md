# Scripts - Setup

## 📝 GUIA PARA IA FUTURA

Este diretório contém scripts de configuração inicial e setup.

### Arquivos a Criar:

#### `proxmox-vm-setup.sh`
Script para criar VM do Home Assistant no Proxmox:
- Criar VM
- Configurar recursos (4 vCPUs, 8GB RAM, 32GB disco)
- Importar imagem HAOS
- Configurar rede (2 interfaces se necessário)
- USB passthrough (Zigbee dongle se houver)

#### `ha-first-boot.sh`
Configuração inicial do Home Assistant:
- Criar usuário
- Configurar integrações básicas
- Instalar HACS
- Instalar add-ons essenciais (File Editor, Terminal, Samba Backup)

#### `unifi-vlans-setup.txt`
Guia passo-a-passo configuração VLANs no UDM:
- VLAN 1 (Principal)
- VLAN 10 (IoT Crítico)
- VLAN 20 (IoT Sensores)
- VLAN 30 (Visitantes)
- Regras de firewall entre VLANs

#### `dns-local-setup.txt`
Lista de registros DNS locais a adicionar no Unifi:
```
homeassistant.local → 192.168.10.10
esp-painel-terreo.local → 192.168.10.101
[... etc]
```

#### `ip-static-list.txt`
Lista completa de IPs estáticos reservados no DHCP

---

**Status**: 🔴 Criar durante Fase 1-2 (Setup inicial)

