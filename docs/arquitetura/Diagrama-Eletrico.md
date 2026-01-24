# Diagrama Elétrico - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter os esquemas elétricos do projeto.

### O que incluir:
1. **Quadros Elétricos**
   - Localização de cada quadro (conforme arquiteto)
   - Distribuição de circuitos
   - Disjuntores dedicados para automação

2. **Painéis de Comando** (1 por andar)
   - Esquema completo:
     ```
     Quadro Elétrico
       ↓ 220V
     Fonte 10A → ESP32 Ethernet + MCP23017 I2C
       ↓
     Módulos I2C (até 6):
       - SS4H (iluminação 220V)
       - Módulo relés (persianas)
       - Entradas pulsadores
     ```

3. **Alimentação Fitas LED 24V**
   - Fontes 24V múltiplas (redundância)
   - Shelly RGBW2 para dimerização
   - Distribuição por zona

4. **Cabeamento**
   - Cat6 Ethernet para painéis de comando
   - Cabos pulsadores (NBR 13570)
   - Cabos alimentação (bitola correta)

5. **Aterramento**
   - Todos painéis aterrados
   - Proteção contra surtos

6. **Backup (No-break)**
   - Equipamentos no no-break:
     - Mini-PC (HA)
     - UDM-Pro SE
     - Switch PoE
     - Storage UGREEN

### Ferramentas:
- AutoCAD Electrical
- QCAD
- Ou desenho manual digitalizado

### Salvar:
- Esquemas em `/imagens/esquema-eletrico-*.png`
- Arquivos fonte em `Hardware/Esquematicos/`

---

**Status**: 🔴 Aguardando dados do eletricista e arquiteto

