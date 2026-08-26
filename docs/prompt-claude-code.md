# Prompt para trabalhar no Detoken pelo Claude Code

## Primeiro, uma vez só: clonar o projeto

No terminal do seu Mac:

```bash
git clone https://github.com/SEU-USUARIO/detoken.git
cd detoken
claude
```

O `CLAUDE.md` na raiz é lido automaticamente pelo Claude Code — ele já contém a paleta, o mapa do `index.html`, as regras do projeto e o que não pode ser mexido. Você não precisa repetir nada disso.

---

## Prompt de abertura (cole no Claude Code na primeira sessão)

```
Leia o CLAUDE.md e o README.md deste projeto antes de qualquer coisa.

Este é o Detoken, um site estático satírico que já está no ar em
https://detoken.bitbeagle.com. Todo o app está em public/index.html —
arquivo único, sem build, sem dependências, sem backend.

Antes de propor qualquer mudança:
1. Suba o servidor local com `cd public && python3 -m http.server 8000`
   e abra http://localhost:8000
2. Me dê um resumo em 5 linhas de como o app está organizado hoje,
   e uma lista do que você acha que poderia melhorar — separando
   "melhorias de acabamento" de "ideias novas de funcionalidade inútil".

Não mexa em nada ainda. Só leia, rode e me mostre o diagnóstico.
```

---

## Prompts para melhorias específicas

**Adicionar uma tela nova**
```
Quero uma sétima tela no Detoken: [descreva a ideia].
Siga o padrão das outras: uma <section class="screen"> nova, um botão na tab bar,
uma entrada em PATHS, e um dos mascotes do objeto M no cabeçalho.
Mantenha o tom sarcástico e a funcionalidade deliberadamente inútil.
Teste no localhost antes de me mostrar, e me diga o que clicar para eu conferir.
```

**Mexer no visual sem quebrar o resto**
```
Quero ajustar [descreva]. Antes de editar, me mostre exatamente quais
linhas do public/index.html você vai tocar e por quê. Depois de editar,
rode o servidor local, tire um screenshot da tela afetada em 390×844
e me mostre o antes e o depois.
```

**Escrever frases novas**
```
Adicione 10 frases novas ao array QUOTES do public/index.html.
Regras: português, sarcásticas, secas, sobre o vício de criar apps com IA,
no máximo 60 caracteres cada, sem emoji, sem repetir o que já existe lá.
Me mostre as 10 antes de inserir.
```

**Corrigir um bug**
```
Encontrei este comportamento errado: [descreva o que acontece e em qual tela].
Reproduza no localhost, me explique a causa antes de corrigir, corrija,
e confirme testando de novo. Se mexer na estrutura do objeto S,
troque a chave do localStorage de detoken_v1 para detoken_v2.
```

**Publicar as mudanças**
```
Terminei as mudanças. Faça o seguinte:
1. Suba a versão do cache no public/sw.js (detoken-v1 → v2, e assim por diante)
2. Confirme que não há erro de console no localhost
3. Faça commit com uma mensagem descritiva e push para o GitHub
4. Me gere um zip só com o conteúdo de public/ para eu subir no
   Gerenciador de Arquivos da Hostinger, substituindo os arquivos do public_html
Me lembre de compartilhar o link com ?v=2 no fim se eu tiver mexido nas meta tags.
```

---

## Dicas de uso

- **`/init`** não é necessário: o `CLAUDE.md` já existe e está completo.
- Peça sempre para **testar no localhost antes de mostrar** — o app tem muita animação e estado, e bug de JS aqui é silencioso.
- Se pedir mudanças grandes, peça primeiro um **plano** ("me mostre o plano antes de editar"). O arquivo é grande e uma edição desatenta quebra o layout.
- Quando algo ficar estranho depois de uma mudança, **limpe o service worker**: DevTools → Application → Service Workers → Unregister, e recarregue.
