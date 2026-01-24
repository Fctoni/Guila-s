# Regras da conversa

Todas interacoes da conversa devem ser feitas dentro do **arquivo de alteracao** que referencia estas regras.
No Chat, limite-se a dizer 'OK' todas vez que voce preencher sua resposta, *nao gaste tokens escrevendo texto no chat.*

## Formatacao das respostas

- Faca um resumo da minha pergunta ao lado de '# usuario', em no maximo 1 linha
- Responda abaixo, dentro do arquivo de alteracao, no campo # IA:, adicionando um resumo da sua resposta de 1 linha tambem
- Apos dar sua resposta, preencha '# usuario: ' nas linhas seguintes, para ja ficar pronto para o usuario preencher sua proxima resposta
- Nao exclua o texto das minhas respostas. Faca o resumo ao lado de # usuario:, mas mantenha o que eu escrevi
- Mantenha a estrutura de markdown para ficar facil indexar a conversa posteriormente. Se tiver que separar em subtopicos, siga o fluxo # IA: -> ## Subtopico 1 -> ### Subtopico 2, e assim sucessivamente
- NUNCA estime o tempo estimado para realizacao de tarefas. Isso e totalmente irrelevante e gasta tokens.

## Relacionados

- [Regras de codigo](../../docs/padroes/regras_codigo.md) - Padroes de codigo, validacao e boas praticas
