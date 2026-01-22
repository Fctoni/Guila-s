# Guia de Cores - Fiacao Interruptores

**Projeto**: Casa Le Parc - Automacao Residencial  
**Padrao**: Cabo multivias para pulsadores  
**Data**: 22/01/2026

---

## 🎨 Tabela de Cores Padrao

| Funcao | Cor | Codigo |
|--------|-----|:------:|
| **COMUM (12V)** | 🔴 Vermelho | C |
| **Reserva (5V)** | 🟡 Amarelo | R1 |
| **Reserva (GND)** | 🟤 Marrom | R2 |
| **Tecla 1** | 🔵 Azul | T1 |
| **Tecla 2** | 🟢 Verde | T2 |
| **Tecla 3** | 🟠 Laranja | T3 |
| **Tecla 4** | 🟣 Roxo | T4 |
| **Tecla 5** | ⚫ Cinza | T5 |
| **Tecla 6** | ⬛ Preto | T6 |
| **Tecla 7** | 🔴⚪ Vermelho/Branco | T7 |
| **Tecla 8** | 🟤⚪ Marrom/Branco | T8 |
| **Tecla 9** | ⚪ Branco | T9 |

---

## 📋 Interruptores - Quantidade de Teclas

| Int | Local | Teclas | Tipo Interruptor |
|:---:|-------|:------:|------------------|
| 21 | Circulacao Servico | 2 | 2 teclas |
| 22 | Bar | 6 | 6 teclas (2x3) |
| 23 | Circulacao Servico | 1 | 1 tecla |
| 24 | Banho Servico | 1 | 1 tecla |
| 25 | Lavanderia | 3 | 3 teclas |
| 26 | Churrasqueira | 6 | 6 teclas (2x3) |
| 27 | Lavanderia | 3 | 3 teclas |
| 29 | Cozinha | 5 | 6 teclas (2x3) * |
| 30 | Lado Sofa | 6 | 6 teclas (2x3) |
| 31 | Despensa | 1 | 1 tecla |
| 32 | Garagem | 1 | 1 tecla |
| 33 | Lavabo | 1 | 1 tecla |
| 34 | Escritorio | 3 | 3 teclas |
| 35 | Hall | 6 | 6 teclas (2x3) |

**Total: 14 interruptores | 44 teclas**

(*) Int 29 tem 5 circuitos, usar interruptor de 6 teclas com 1 reserva

---

## 📊 Resumo por Quantidade

| Teclas | Interruptores | Qtd |
|:------:|---------------|:---:|
| 1 | 23, 24, 31, 32, 33 | 5 |
| 2 | 21 | 1 |
| 3 | 25, 27, 34 | 3 |
| 5 | 29 | 1 |
| 6 | 22, 26, 30, 35 | 4 |

---

## 🔲 Diagramas Visuais

### Numeracao Padrao
- Leitura: **cima → baixo** (por coluna), depois **proxima coluna a direita**
- Layout: **2 colunas x N linhas**
- Coluna esquerda: T1, T2, T3
- Coluna direita: T4, T5, T6

---

### Interruptor 1 Tecla

```
┌───────┐
│ ┌───┐ │
│ │ 1 │ │
│ │🔵│ │
│ └───┘ │
└───────┘

T1: Azul
COMUM: Vermelho
```

**Fios**: 2 (Comum + 1 Tecla)

---

### Interruptor 2 Teclas

```
┌───────┐
│ ┌───┐ │
│ │ 1 │ │
│ │🔵│ │
│ └───┘ │
│ ┌───┐ │
│ │ 2 │ │
│ │🟢│ │
│ └───┘ │
└───────┘

T1: Azul
T2: Verde
COMUM: Vermelho
```

**Fios**: 3 (Comum + 2 Teclas)

---

### Interruptor 3 Teclas (1 coluna)

```
┌───────┐
│ ┌───┐ │
│ │ 1 │ │
│ │🔵│ │
│ └───┘ │
│ ┌───┐ │
│ │ 2 │ │
│ │🟢│ │
│ └───┘ │
│ ┌───┐ │
│ │ 3 │ │
│ │🟠│ │
│ └───┘ │
└───────┘

T1: Azul
T2: Verde
T3: Laranja
COMUM: Vermelho
```

**Fios**: 4 (Comum + 3 Teclas)

---

### Interruptor 4 Teclas (2 colunas x 2 linhas)

```
┌─────────────┐
│  ┌───┐┌───┐ │
│  │ 1 ││ 3 │ │
│  │🔵││🟠│ │
│  └───┘└───┘ │
│  ┌───┐┌───┐ │
│  │ 2 ││ 4 │ │
│  │🟢││🟣│ │
│  └───┘└───┘ │
└─────────────┘

T1: Azul      T3: Laranja
T2: Verde     T4: Roxo
COMUM: Vermelho
```

**Fios**: 5 (Comum + 4 Teclas)

---

### Interruptor 5 Teclas (usar 6 teclas, 1 reserva)

```
┌─────────────┐
│  ┌───┐┌───┐ │
│  │ 1 ││ 4 │ │
│  │🔵││🟣│ │
│  └───┘└───┘ │
│  ┌───┐┌───┐ │
│  │ 2 ││ 5 │ │
│  │🟢││⚫│ │
│  └───┘└───┘ │
│  ┌───┐┌───┐ │
│  │ 3 ││ 6 │ │
│  │🟠││ │ │
│  └───┘└───┘ │
└─────────────┘

T1: Azul      T4: Roxo
T2: Verde     T5: Cinza
T3: Laranja   T6: Reserva (tampa cega)
COMUM: Vermelho
```

**Fios**: 6 (Comum + 5 Teclas)

---

### Interruptor 6 Teclas (2 colunas x 3 linhas)

```
┌─────────────┐
│  ┌───┐┌───┐ │
│  │ 1 ││ 4 │ │
│  │🔵││🟣│ │
│  └───┘└───┘ │
│  ┌───┐┌───┐ │
│  │ 2 ││ 5 │ │
│  │🟢││⚫│ │
│  └───┘└───┘ │
│  ┌───┐┌───┐ │
│  │ 3 ││ 6 │ │
│  │🟠││⬛│ │
│  └───┘└───┘ │
└─────────────┘

T1: Azul      T4: Roxo
T2: Verde     T5: Cinza
T3: Laranja   T6: Preto
COMUM: Vermelho
```

**Fios**: 7 (Comum + 6 Teclas)

---

## 🔌 Mapeamento Detalhado por Interruptor

> ⚠️ **Circuito e funcao de cada tecla a definir com arquiteto**

### Int 21 - Circulacao Servico (2 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |

---

### Int 22 - Bar (6 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |
| T4 | 🟣 Roxo | - | - |
| T5 | ⚫ Cinza | - | - |
| T6 | ⬛ Preto | - | - |

---

### Int 23 - Circulacao Servico (1 tecla)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |

---

### Int 24 - Banho Servico (1 tecla)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |

---

### Int 25 - Lavanderia (3 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |

---

### Int 26 - Churrasqueira (6 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |
| T4 | 🟣 Roxo | - | - |
| T5 | ⚫ Cinza | - | - |
| T6 | ⬛ Preto | - | - |

---

### Int 27 - Lavanderia (3 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |

---

### Int 29 - Cozinha (5 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |
| T4 | 🟣 Roxo | - | - |
| T5 | ⚫ Cinza | - | - |
| T6 | - | - | (reserva) |

---

### Int 30 - Lado Sofa (6 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |
| T4 | 🟣 Roxo | - | - |
| T5 | ⚫ Cinza | - | - |
| T6 | ⬛ Preto | - | - |

---

### Int 31 - Despensa (1 tecla)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |

---

### Int 32 - Garagem (1 tecla)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |

---

### Int 33 - Lavabo (1 tecla)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |

---

### Int 34 - Escritorio (3 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |

---

### Int 35 - Hall (6 teclas)

| Tecla | Cor | Circuito | Acende |
|:-----:|-----|:--------:|--------|
| T1 | 🔵 Azul | - | - |
| T2 | 🟢 Verde | - | - |
| T3 | 🟠 Laranja | - | - |
| T4 | 🟣 Roxo | - | - |
| T5 | ⚫ Cinza | - | - |
| T6 | ⬛ Preto | - | - |

---

## ⚠️ Observacoes Importantes

1. **COMUM sempre conectado** - Fio vermelho em todos os interruptores
2. **Reservas opcionais** - Amarelo (5V), Marrom (GND) + fios que sobrarem
3. **Numeracao das teclas**: cima→baixo por coluna (T1-T2-T3 esquerda, T4-T5-T6 direita)
4. **Cabo recomendado**: Multivias com quantidade suficiente para o interruptor

---






---

**Ultima atualizacao**: 22/01/2026
