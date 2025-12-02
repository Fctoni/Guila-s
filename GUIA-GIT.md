# Guia Git - Projeto Guilas

## Comandos Git Úteis para Este Projeto

### Configuração Inicial (se ainda não fez)
```bash
git config user.name "Seu Nome"
git config user.email "seu.email@exemplo.com"
```

### Primeiro Commit (estrutura inicial)
```bash
# Adicionar todos arquivos (menos os do .gitignore)
git add .

# Commit inicial
git commit -m "feat: estrutura inicial do projeto

- Criada estrutura completa de diretórios
- Adicionados templates de documentação (comercial, requisitos, arquitetura, manuais)
- Criados templates de firmware (ESP32 painéis, sensores, touch)
- Adicionadas configurações base Home Assistant
- Incluídos scripts de backup e deploy
- Organizada estrutura de hardware (BOM, esquemáticos, datasheets)
- Implementado .gitignore para proteger secrets
- Documentação inicial (README, PROJECT-CONTEXT, pendencias)
- Arquivos históricos de conversas e validações de layout"

# Push para GitHub (branch main)
git push origin main
```

### Workflow Diário

#### Ver status
```bash
git status
```

#### Adicionar arquivos modificados
```bash
# Adicionar arquivo específico
git add Firmware/ESP32-Paineis/terreo/config.yaml

# Ou adicionar todos arquivos modificados
git add .
```

#### Commit com mensagem descritiva
```bash
# Padrão recomendado: tipo: descrição curta
git commit -m "feat: adiciona config ESP32 painel térreo"
git commit -m "fix: corrige automação de presença sala"
git commit -m "docs: atualiza diagrama de rede"
```

**Tipos de commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `refactor:` - Refatoração (sem mudar comportamento)
- `test:` - Adição/correção de testes
- `chore:` - Tarefas de manutenção

#### Push para GitHub
```bash
git push origin main
```

### Branches (Recomendado para Features Grandes)

#### Criar branch para desenvolvimento
```bash
# Criar e mudar para nova branch
git checkout -b feature/paineis-touch-lvgl

# Trabalhar normalmente (add, commit)
git add .
git commit -m "feat: implementa interface LVGL painéis touch"

# Push da branch
git push origin feature/paineis-touch-lvgl

# No GitHub: Criar Pull Request
# Após aprovação: Merge to main
```

#### Voltar para main
```bash
git checkout main
git pull origin main  # Atualizar com mudanças remotas
```

### Histórico e Logs

#### Ver commits recentes
```bash
git log --oneline -10
```

#### Ver mudanças de um arquivo
```bash
git log -p Conversas/pendencias.md
```

#### Ver diferenças antes de commitar
```bash
git diff
```

### Desfazer Mudanças

#### Desfazer mudanças locais (não commitadas)
```bash
git restore Firmware/ESP32-Paineis/terreo/config.yaml
```

#### Desfazer último commit (manter mudanças)
```bash
git reset --soft HEAD~1
```

#### Desfazer último commit (descartar mudanças) - CUIDADO!
```bash
git reset --hard HEAD~1
```

### Ignorar Arquivos (já configurado no .gitignore)

Arquivos automaticamente ignorados:
- `secrets.yaml` (todos)
- `*.log`
- Backups (`*.bak`, `*.backup`)
- Temporários

### Sincronizar com Remoto

#### Baixar mudanças do GitHub
```bash
git pull origin main
```

#### Ver repositórios remotos
```bash
git remote -v
```

### Tags (para Releases)

#### Criar tag de versão
```bash
git tag -a v1.0.0 -m "Release v1.0.0 - Sistema instalado e operacional"
git push origin v1.0.0
```

#### Listar tags
```bash
git tag
```

### Comandos de Emergência

#### Ver quem modificou uma linha específica
```bash
git blame Firmware/ESP32-Paineis/terreo/config.yaml
```

#### Reverter commit específico (cria novo commit)
```bash
git revert <commit-hash>
```

#### Stash (guardar mudanças temporariamente)
```bash
# Guardar mudanças
git stash

# Listar stashes
git stash list

# Recuperar mudanças
git stash pop
```

---

## 🔒 NUNCA FAÇA:

❌ `git add secrets.yaml` - Secrets são privados!  
❌ `git push --force origin main` - Pode perder histórico!  
❌ Commitar senhas em plain text  
❌ Commitar arquivos grandes (>100MB) sem Git LFS

---

## ✅ BOAS PRÁTICAS:

✅ Commits frequentes e pequenos  
✅ Mensagens descritivas  
✅ Testar antes de commitar  
✅ Usar branches para features grandes  
✅ Pull antes de push (evita conflitos)  
✅ Revisar `git status` antes de commit

---

**Dica**: Alias úteis (adicionar no `~/.gitconfig`):
```
[alias]
    st = status
    co = checkout
    ci = commit
    br = branch
    unstage = reset HEAD --
    last = log -1 HEAD
```

Uso: `git st` em vez de `git status`

