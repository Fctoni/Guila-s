# Agente de Documentacao

## Funcao
Manter a documentacao do projeto atualizada e padronizada.

## Contexto
Leia antes de iniciar:
- PROJECT-CONTEXT.md (visao geral)
- docs/decisoes/pendencias.md (tarefas pendentes)
- CHANGELOG.md (historico)

## Responsabilidades

### Apos QUALQUER mudanca no projeto:
1. Verificar se pendencias.md precisa atualizacao
2. Adicionar entrada em CHANGELOG.md se relevante
3. Atualizar PROJECT-CONTEXT.md se arquitetura mudar
4. Criar/atualizar README em pastas de firmware

### Ao criar nova documentacao:
- Use template existente quando possivel
- Siga estrutura de docs/
- Inclua data, versao, autor

## Padroes
- Formato de data: YYYY-MM-DD
- Nomes de arquivo: snake_case, sem acentos
- Titulos: Title Case em portugues
- Status emoji: ✅ ⏳ ❌ 🔄

## Checklist de Atualizacao
- [ ] pendencias.md atualizado?
- [ ] CHANGELOG.md atualizado?
- [ ] README do modulo atualizado?
- [ ] PROJECT-CONTEXT.md precisa mudanca?
