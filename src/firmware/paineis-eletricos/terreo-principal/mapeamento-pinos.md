# Mapeamento de Pinos - Painel Térreo Principal

**Arquivo**: `esp-painel-terreo-principal.yaml`  
**Data**: 03/12/2025

---

## 📥 ENTRADAS (Binary Sensors)

### Chip 0x20 (mcp23_hub1_IN) - 16 pinos

| Pino | Circ Lum | Interruptores | Circ Belm | Nome Falado | Tipo |
|------|----------|---------------|-----------|-------------|------|
| 0 | 01 | Int 34 | 2L | Iluminação Escritório | 220V |
| 1 | 02 | Int 34 | 2M | Pendente Escritório | 220V |
| 2 | 03 | Int 34 | 2K | Fitas Escritório | LED 24V |
| 3 | 04 | Int 32 | 2A | Iluminação Garagem | LED 24V |
| 4 | 05 | Int 33 | 2i | Iluminação Lavabo | LED 24V |
| 5 | 07 | Int 31 | 2B | Iluminação Despensa | LED 24V |
| 6 | 08 | Int 27, 25 | 2C | Iluminação Lavanderia | LED 24V |
| 7 | 09 | Int 27, 25, 21 | 2D, 2F | Bancada Lavanderia / Sauna Superior | LED 24V |
| 8 | 10 | Int 21, 23 | 2G, 2H | Sauna Inferior / Hall Serviço | LED 24V / 220V |
| 9 | 11 | Int 24 | 2Z | Iluminação Banho Serviço | 220V |
| 10 | 12 | Int 29 | 1X | Bancada Cozinha | LED 24V |
| 11 | 13 | Int 29, 26, 22 | 1V | Ilha Cozinha | 220V |
| 12 | 14 | Int 29, 26, 22 | 1W | Iluminação Cozinha | 220V |
| 13 | 15 | Int 29, 26, 22 | 1T | Iluminação Jantar | 220V |
| 14 | 16 | Int 35, 30, 29, 26, 22 | 1U | Cortineiro Living | LED 24V |
| 15 | 17 | Int 35, 30, 26, 22 | 1Q | Iluminação Living | 220V |

### Chip 0x26 (mcp23_hub3_IN) - 6 pinos usados

| Pino | Circ Lum | Interruptores | Circ Belm | Nome Falado | Tipo |
|------|----------|---------------|-----------|-------------|------|
| 0 | 18 | Int 35, 30 | 1O | Extra | 220V |
| 1 | 19 | Int 35, 30 | 1P | Iluminação TV | 220V |
| 2 | 20 | Int 30, 22 | 1R | Iluminação Buffet | LED 24V |
| 3 | 21 | Int 35, 30 | 1N | Iluminação Hall Principal | 220V |
| 4 | 22 | Int 35 | 1C | Iluminação Degraus | 220V |
| 5 | 50 | Int 26 | 1 | Iluminação Churrasqueira | 220V |
| 6-15 | - | - | - | (disponíveis) | - |

---

## 📤 SAÍDAS (Lights/Outputs)

### Chip 0x21 (mcp23_hub1_OUT) - 8 relés (pinos 8-15)

| Pino | Circ Belm | Nome Falado | ID ESPHome |
|------|-----------|-------------|------------|
| 8 | 2L | Iluminação Escritório | out_2L |
| 9 | 2M | Pendente Escritório | out_2M |
| 10 | 2H | Iluminação Hall Serviço | out_2H |
| 11 | 2Z | Iluminação Banho Serviço | out_2Z |
| 12 | 1V | Ilha Cozinha | out_1V |
| 13 | 1W | Iluminação Cozinha | out_1W |
| 14 | 1T | Iluminação Jantar | out_1T |
| 15 | 1Q | Iluminação Living | out_1Q |

### Chip 0x25 (mcp23_hub2_OUT) - 5 relés (pinos 8-12)

| Pino | Circ Belm | Nome Falado | ID ESPHome |
|------|-----------|-------------|------------|
| 8 | 1O | Extra | out_1O |
| 9 | 1P | Iluminação TV | out_1P |
| 10 | 1N | Iluminação Hall Principal | out_1N |
| 11 | 1C | Iluminação Degraus | out_1C |
| 12 | 1 | Iluminação Churrasqueira | out_churras |
| 13-15 | - | (disponíveis) | - |

---

## 🔗 Mapeamento Entrada → Saída (Configurado)

| Entrada (Circ Lum) | Saída (Circ Belm) | Status |
|--------------------|-------------------|--------|
| Circ 01 | → 2L (Escritório) | ✅ Configurado |
| Circ 02 | → 2M (Pendente Escritório) | ✅ Configurado |
| Circ 03 | → 2K (Fitas Escritório) | ⏳ LED 24V - futuro |
| Circ 04 | → 2A (Garagem) | ⏳ LED 24V - futuro |
| Circ 05 | → 2i (Lavabo) | ⏳ LED 24V - futuro |
| Circ 07 | → 2B (Despensa) | ⏳ LED 24V - futuro |
| Circ 08 | → 2C (Lavanderia) | ⏳ LED 24V - futuro |
| Circ 09 | → 2D, 2F (Bancada/Sauna) | ⏳ LED 24V - futuro |
| Circ 10 | → 2G, 2H (Sauna/Hall Serviço) | ✅ 2H Configurado (220V) |
| Circ 11 | → 2Z (Banho Serviço) | ✅ Configurado |
| Circ 12 | → 1X (Bancada Cozinha) | ⏳ LED 24V - futuro |
| Circ 13 | → 1V (Ilha Cozinha) | ✅ Configurado |
| Circ 14 | → 1W (Iluminação Cozinha) | ✅ Configurado |
| Circ 15 | → 1T (Iluminação Jantar) | ✅ Configurado |
| Circ 16 | → 1U (Cortineiro Living) | ⏳ LED 24V - futuro |
| Circ 17 | → 1Q (Iluminação Living) | ✅ Configurado |
| Circ 18 | → 1O (Extra) | ✅ Configurado |
| Circ 19 | → 1P (Iluminação TV) | ✅ Configurado |
| Circ 20 | → 1R (Iluminação Buffet) | ⏳ LED 24V - futuro |
| Circ 21 | → 1N (Hall Principal) | ✅ Configurado |
| Circ 22 | → 1C (Iluminação Degraus) | ✅ Configurado |
| Circ 50 | → 1 (Iluminação Churrasqueira) | ✅ Configurado |

---

## 📊 Resumo

### Entradas
- **Total configuradas**: 22 entradas
- **Chip 0x20**: 16 pinos usados
- **Chip 0x26**: 6 pinos usados (10 disponíveis)

### Saídas 220V (Configuradas)
- **Total configuradas**: 13 saídas
- **Chip 0x21**: 8 relés (pinos 8-15)
- **Chip 0x25**: 5 relés (pinos 8-12, 3 disponíveis)

### Saídas LED 24V (Pendentes)
- **Total pendente**: 11 circuitos
- **Método**: Shelly RGBW2 (configurar futuramente)

---

## 📝 Notas

1. Pinos 0-7 dos chips de OUTPUT não estão conectados a relés
2. Entradas compartilhadas (ex: Circ 16 em 5 interruptores) usam fios em paralelo
3. Circuitos com múltiplas saídas (ex: Circ 09 → 2D e 2F) serão tratados quando LEDs 24V forem configurados

---

**Última atualização**: 03/12/2025
