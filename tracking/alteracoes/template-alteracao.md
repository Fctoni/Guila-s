# Alteração XX - [Título curto]

| Aspecto | Detalhe |
|---------|---------|
| Status | 🟡 Em planejamento |
| Origem | [de onde veio a ideia] |
| Complexidade | 🟢 Baixa / 🟡 Média / 🔴 Alta |
| Especificação | *(será criada após aprovação da UI)* |

**Status possíveis:**
- 🟡 Em planejamento
- 🟢 Especificação criada → ver [spec-alteracaoXX.md](./spec-alteracaoXX.md)

---

## 1. Ideia Inicial

[Descrição livre do usuário sobre o que quer implementar]

---

## 2. Conversa de Planejamento

#### usuário:
[primeira mensagem]

#### IA:
[resposta]

---

## 3. Mudanças propostas

### 3.1 Fluxo da Alteracao

**Situacao Atual:**
- [Descreva como funciona hoje - pode ser "Nao existe" se for funcionalidade nova]

**Proposta:**
- [Descreva o novo comportamento de forma clara e sequencial]

**Fluxo do Usuario:**
1. [Passo 1 - acao do usuario]
2. [Passo 2 - resposta do sistema]
3. [Passo 3 - proxima acao]

> **Exemplo preenchido:**
>
> **Situacao Atual:**
> - A selecao de clientes usa um dropdown estatico com todos os registros
> - Performance ruim com muitos clientes (>500)
> - Usuario precisa rolar lista inteira para encontrar
>
> **Proposta:**
> - Substituir dropdown por campo de busca com autocomplete
> - Busca acontece apos 3 caracteres digitados
> - Resultados limitados a 10 itens mais relevantes
>
> **Fluxo do Usuario:**
> 1. Usuario clica no campo de cliente
> 2. Campo expande mostrando icone de busca e placeholder "Digite para buscar..."
> 3. Usuario digita 3+ caracteres
> 4. Sistema busca na base e exibe resultados filtrados
> 5. Usuario clica no cliente desejado
> 6. Campo fecha e exibe nome selecionado



### 3.2 [Nome do Modal/Tela]

```
┌─────────────────────────────────────────────────────────────┐
│  📄 Título                                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Desenho ASCII da interface]                               │
│                                                             │
│                              [Cancelar]  [✅ Confirmar]     │
└─────────────────────────────────────────────────────────────┘
```

**Comportamentos:**
- Comportamento 1
- Comportamento 2

**Status:** 🟡 Aguardando aprovação

---

## 4. Decisões Importantes

*(Resumo das principais decisões tomadas durante a conversa - útil para referência futura)*

- Decisão 1: [descrição]
- Decisão 2: [descrição]

---

## 5. Checkpoints

*(Adicionados automaticamente em sessões longas)*

#### Checkpoint [data] - [hora]
**Status atual:** [status]
**Decisões tomadas:**
- Decisão 1
- Decisão 2

**Próximo passo:** [descrição]
