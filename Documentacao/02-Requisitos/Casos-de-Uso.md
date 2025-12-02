# Casos de Uso - Projeto Guilas

## 📝 GUIA PARA IA FUTURA

Este arquivo deve conter todos os casos de uso detalhados do sistema.

### Formato:
```
**UC-XXX: Nome do Caso de Uso**

Ator: [Usuário/Sistema]
Pré-condições: [O que deve estar acontecendo antes]
Fluxo Principal:
1. [Passo 1]
2. [Passo 2]
...

Fluxos Alternativos:
- [Cenário alternativo]

Pós-condições: [Estado do sistema após execução]
```

### Exemplos de Casos de Uso:

#### UC-001: Acender Luz Principal da Sala
**Ator**: Morador
**Pré-condições**: Sistema online, luz apagada
**Fluxo Principal**:
1. Morador pressiona pulsador 1x
2. ESP32 detecta clique
3. ESP32 aciona relé da luz
4. Luz acende
5. ESP32 notifica HA do novo estado
6. Interface atualiza (painel touch + celular)

**Fluxos Alternativos**:
- 1a. Morador usa painel touch: Toca ícone da luz → Sistema acende
- 1b. Morador usa voz: Diz "ligar luz da sala" → Sistema acende
- 1c. HA offline: ESP32 funciona autonomamente (modo local)

**Pós-condições**: Luz acesa, estado sincronizado em todas interfaces

#### UC-010: Ativar Cena "Cinema"
[... etc]

#### UC-020: Sistema Detecta Intrusão
[... etc]

### Categorias:
1. Iluminação e Controle
2. Climatização
3. Segurança e Alarme
4. Multimídia
5. Manutenção e Diagnóstico

---

**Status**: 🔴 Aguardando criação

