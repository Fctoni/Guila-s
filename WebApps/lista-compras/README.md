# 📋 Lista de Compras - App Web

Aplicação web para gerenciar lista de compras com persistência em tempo real usando Firebase Firestore.

## ✨ Funcionalidades

- ✅ Adicionar, editar e deletar itens
- ✅ Marcar itens como comprados (checkbox)
- ✅ Barra de progresso visual
- ✅ Persistência entre dispositivos em tempo real
- ✅ Sem necessidade de login/autenticação
- ✅ Interface responsiva e moderna
- ✅ Múltiplos usuários podem acessar simultaneamente

## 🚀 Como Configurar

### Passo 1: Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Dê um nome ao projeto (ex: "lista-compras")
4. Desabilite o Google Analytics (não é necessário para este projeto)
5. Clique em **"Criar projeto"**

### Passo 2: Configurar Firestore

1. No menu lateral, vá em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Iniciar no modo de produção"** (vamos configurar as regras depois)
4. Escolha a localização mais próxima (ex: `southamerica-east1` para Brasil)
5. Clique em **"Ativar"**

### Passo 3: Configurar Regras de Segurança do Firestore

1. Ainda no Firestore, vá na aba **"Regras"**
2. Substitua as regras padrão por estas (permite leitura/escrita pública):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /compras/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Clique em **"Publicar"**

⚠️ **ATENÇÃO**: Estas regras permitem que qualquer pessoa leia e escreva na sua database. Use apenas para aplicações internas ou protegidas por URL privada.

### Passo 4: Obter Credenciais do Firebase

1. No Firebase Console, clique no ícone de **configurações** ⚙️ ao lado de "Visão geral do projeto"
2. Vá em **"Configurações do projeto"**
3. Role até **"Seus aplicativos"**
4. Clique no ícone **"Web"** (`</>`)
5. Dê um apelido para o app (ex: "lista-compras-web")
6. **NÃO** marque "Configurar Firebase Hosting"
7. Clique em **"Registrar app"**
8. Copie o objeto `firebaseConfig` que aparece

### Passo 5: Configurar o Projeto

1. Abra o arquivo `script.js`
2. Localize a seção **CONFIGURAÇÃO DO FIREBASE** (linhas 10-18)
3. Substitua os valores pelas suas credenciais:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

4. Salve o arquivo

### Passo 6: Testar Localmente

1. Abra o arquivo `index.html` diretamente no navegador, OU
2. Use um servidor local simples:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (se tiver http-server instalado)
npx http-server -p 8000
```

3. Acesse `http://localhost:8000` no navegador
4. Adicione alguns itens de teste

## 🌐 Deploy no Netlify

### Método 1: Drag & Drop (Mais Fácil)

1. Acesse [netlify.com](https://www.netlify.com)
2. Crie uma conta gratuita
3. Na área "Sites", arraste a pasta `lista-compras` inteira
4. Pronto! Seu site estará no ar

### Método 2: Via Git/GitHub

1. Crie um repositório no GitHub com o conteúdo da pasta `lista-compras`
2. No Netlify, clique em **"Add new site"** > **"Import an existing project"**
3. Conecte com GitHub e selecione o repositório
4. Configure:
   - **Build command**: deixe vazio
   - **Publish directory**: deixe vazio ou `.`
5. Clique em **"Deploy"**

### URL Personalizada (Opcional)

1. No Netlify, vá em **"Site settings"** > **"Domain management"**
2. Clique em **"Options"** > **"Edit site name"**
3. Escolha um nome (ex: `minhas-compras-2024.netlify.app`)

## 📱 Como Usar

### Adicionar Item
1. Clique no botão **"➕ Adicionar Item"**
2. Preencha os campos:
   - **Produto** (obrigatório)
   - **Quantidade** (obrigatório)
   - **Link** (opcional) - URL da loja
   - **Observações** (opcional)
3. Clique em **"Salvar"**

### Marcar como Comprado
- Clique no checkbox ao lado do item

### Editar Item
- Clique no botão **"✏️ Editar"**
- Faça as alterações
- Clique em **"Salvar"**

### Deletar Item
- Clique no botão **"🗑️ Deletar"**
- Confirme a exclusão

### Resetar Todos os Checkboxes
- Clique no botão **"🔄 Resetar Checkboxes"**
- Confirme a ação

## 🔧 Estrutura do Projeto

```
lista-compras/
├── index.html      # Estrutura HTML
├── style.css       # Estilos e animações
├── script.js       # Lógica e integração Firebase
└── README.md       # Este arquivo
```

## 💾 Estrutura de Dados no Firestore

Coleção: `compras`

Cada documento tem:
```javascript
{
  produto: "Nome do produto",      // string
  quantidade: 1,                   // number
  link: "https://...",            // string (pode ser vazio)
  observacoes: "Texto...",        // string (pode ser vazio)
  comprado: false                 // boolean
}
```

## 🔒 Segurança

⚠️ **IMPORTANTE**: Esta aplicação não tem autenticação. Qualquer pessoa com o link pode:
- Ver todos os itens
- Adicionar novos itens
- Editar itens existentes
- Deletar itens
- Marcar/desmarcar checkboxes

**Recomendações:**
- Use URLs difíceis de adivinhar no Netlify
- Não compartilhe o link publicamente
- Para uso empresarial, adicione autenticação Firebase

## 🆘 Solução de Problemas

### "Erro ao carregar itens"
- Verifique se as credenciais do Firebase estão corretas no `script.js`
- Verifique se o Firestore está ativado no Firebase Console
- Verifique as regras de segurança do Firestore

### Dados não aparecem
- Abra o Console do navegador (F12) e veja se há erros
- Verifique se a coleção `compras` existe no Firestore
- Adicione um item manualmente pelo Firebase Console para testar

### Não atualiza em tempo real
- Verifique sua conexão com a internet
- Recarregue a página
- Limpe o cache do navegador

## 📄 Licença

Uso livre para projetos pessoais e comerciais.

---

**Desenvolvido para gerenciamento de compras de projeto** 🏠

