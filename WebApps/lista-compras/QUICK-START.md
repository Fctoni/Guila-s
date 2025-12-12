# 🚀 Início Rápido - 5 Minutos

## Passo 1: Firebase (2 min)

1. Acesse https://console.firebase.google.com
2. Criar projeto → Nome: `lista-compras` → Criar
3. Menu lateral: **Firestore Database** → Criar banco de dados → Modo produção → Ativar
4. Na aba **Regras**, cole isso:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /compras/{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Publicar

## Passo 2: Credenciais (1 min)

1. Configurações (⚙️) → Configurações do projeto
2. Rolar até "Seus aplicativos" → Clicar no ícone Web `</>`
3. Apelido: `lista-compras-web` → Registrar
4. **COPIAR** o objeto `firebaseConfig`

## Passo 3: Configurar App (1 min)

1. Abrir `script.js`
2. Substituir na linha 17:

```javascript
const firebaseConfig = {
    // COLAR AQUI AS SUAS CREDENCIAIS
};
```

3. Salvar

## Passo 4: Deploy Netlify (1 min)

1. Acessar https://app.netlify.com/drop
2. **Arrastar a pasta `lista-compras`** para o site
3. Pronto! 🎉

---

**Total: ~5 minutos** ⏱️

Seu link será tipo: `https://random-name-123.netlify.app`

Para personalizar o nome:
- Site settings → Domain management → Options → Edit site name

