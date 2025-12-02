# Troubleshooting - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter guia completo de solução de problemas.

### Formato Sugerido:

## PROBLEMA → SOLUÇÃO

### Categoria: Home Assistant

**HA não inicia após atualização**
- Verificar logs: `docker logs homeassistant`
- Restaurar backup anterior
- Verificar espaço em disco

**Add-on não funciona**
- Ver logs do add-on
- Reiniciar add-on
- Reinstalar add-on

**Integrações offline**
- Verificar conectividade de rede
- Reautenticar integração
- Verificar se dispositivo está online

---

### Categoria: ESP32

**ESP32 não conecta ao WiFi**
1. Verificar SSID e senha corretos
2. Verificar sinal WiFi no local
3. Verificar VLAN correta
4. Re-flash via USB se necessário

**Módulo I2C não responde**
1. Verificar endereço I2C correto
2. Verificar cabeamento (SDA, SCL, GND)
3. Verificar alimentação do módulo
4. Testar com `i2cdetect` no ESP32

**Painel touch travado**
1. Reiniciar ESP32 (botão reset)
2. Verificar se HA está online
3. Re-flash firmware se persistir

---

### Categoria: Sensores

**Sensor Shelly offline**
1. Verificar bateria (se aplicável)
2. Verificar sinal WiFi
3. Re-emparelhar com HA
4. Substituir se defeituoso

**Sensor mmWave falsos positivos**
1. Ajustar sensibilidade
2. Reposicionar sensor
3. Calibrar zonas de detecção

**Sensor temperatura leitura errada**
1. Verificar offset no ESPHome
2. Comparar com termômetro de referência
3. Aguardar estabilização (5-10min)

---

### Categoria: Iluminação

**Luz não acende**
1. Verificar interruptor físico de backup
2. Testar acionamento manual no HA
3. Verificar relé (ouvir "clique")
4. Verificar lâmpada (trocar se queimada)
5. Verificar cabeamento elétrico

**Dimmer não funciona**
1. Verificar se é fita LED compatível (24V monocromática)
2. Testar Shelly RGBW2 diretamente
3. Verificar fontes 24V

**Pulsador não responde**
1. Verificar cabeamento do pulsador
2. Testar entrada no ESP32 (debug mode)
3. Verificar debounce configurado

---

### Categoria: Rede

**Dispositivo sem acesso internet**
1. Verificar VLAN correta
2. Verificar regras firewall no UDM
3. Verificar DNS

**Latência alta**
1. Verificar interferência WiFi
2. Verificar canal do AP
3. Verificar carga de rede

---

### Categoria: Críticos (SLA 24h)

**Sistema completamente inoperante**
1. Verificar alimentação elétrica
2. Verificar no-break
3. Verificar se Proxmox está online
4. Verificar VM do HA rodando
5. Chamar integrador imediatamente

---

### LOGS IMPORTANTES

**Onde encontrar**:
- HA: Settings → System → Logs
- ESP32: ESPHome logs (web interface)
- UDM: Unifi Network → Logs
- Proxmox: Console da VM

**O que procurar**:
- Erros (ERROR, CRITICAL)
- Warnings relevantes
- Timestamps de problemas

---

**Status**: 🟡 Iniciar durante testes, completar durante uso

