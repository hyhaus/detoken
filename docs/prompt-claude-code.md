# Trabalhar no Detoken pelo Claude Code

Este arquivo é a porta de entrada. Os prompts de cada fase do roadmap estão em [`prompt-claude-code-fases.md`](prompt-claude-code-fases.md).

---

## Passo 0 — pegar o projeto (uma vez, no seu Mac)

O repositório é **público**: não precisa de `gh`, de token nem de login.

```bash
cd ~
rm -rf detoken            # só se a pasta existir e estiver vazia ou desatualizada
git clone https://github.com/hyhaus/detoken.git
cd detoken
claude
```

Se o `git clone` reclamar que a pasta já existe e não está vazia, e você tiver certeza de que não há trabalho seu lá dentro:

```bash
cd ~/detoken && git init && git remote add origin https://github.com/hyhaus/detoken.git && git fetch origin && git checkout -f -b main origin/main
```

**Confira que deu certo** — estes quatro comandos têm que responder:

```bash
ls CLAUDE.md README.md docs public          # os quatro existem
wc -c public/index.html                     # ~86000 bytes, não ~57000
grep -c "CAMADA REAL" public/index.html     # 1
grep -o "detoken-v[0-9]" public/sw.js       # detoken-v2 ou maior
```

Se `public/index.html` vier com ~57 KB e sem `CAMADA REAL`, você está com uma versão velha: rode `git pull`.

### Nunca reconstrua a pasta baixando do site no ar

Baixar `https://detoken.bitbeagle.com/` para recriar o projeto **parece** funcionar e destrói duas coisas que não estão no HTML servido: o histórico do git e o `CLAUDE.md` com as regras do projeto. Além disso, o que está no ar pode estar atrás do que está no repositório. A fonte da verdade é sempre o git.

---

## Estrutura das pastas

```
detoken/
├── CLAUDE.md                 regras do projeto — o Claude Code lê sozinho ao abrir
├── README.md                 o que é o projeto, como rodar, como publicar
├── .gitignore
├── public/                   ← É EXATAMENTE o conteúdo do public_html no servidor
│   ├── index.html            todo o app: HTML + CSS + JS + mascotes SVG, num arquivo só (~86 KB)
│   ├── sw.js                 service worker (offline + cache) — suba a versão a cada mudança
│   ├── manifest.webmanifest  PWA
│   ├── favicon.svg/.png · apple-touch-icon.png · icon-192*.png · icon-512*.png
│   ├── og-detoken-classico.png    imagem 1200×630 do preview de link
│   └── .htaccess · robots.txt · sitemap.xml
└── docs/                     ← nada aqui vai para o servidor
    ├── prompt-claude-code.md        este arquivo
    ├── prompt-claude-code-fases.md  os prompts de cada fase do roadmap
    ├── prompt-cowork-proximos-passos.md
    ├── prompt-v2-original.md        o prompt que gerou o site
    ├── deploy-hostinger.md          passo a passo de publicação
    ├── logos-5-opcoes.html · preview-whatsapp.html · og-alternativa.png
```

Regra de ouro: **arquivo que o navegador precisa baixar vai em `public/`. Todo o resto vai em `docs/`.** Nada de criar pasta nova sem me perguntar.

---

## Rodar localmente

```bash
cd public && python3 -m http.server 8000
```

Abra `http://localhost:8000`. Pelo `file://` o service worker e a instalação como PWA não funcionam.

O app tem **dois modos**: demonstração (o padrão, números fictícios) e **Modo Real** (dados de verdade, ligado no `~/.rehabrc`). Teste sempre nos dois.

---

## Prompt de abertura (cole na primeira sessão)

```
Leia CLAUDE.md e README.md.

Confirme antes de qualquer coisa que a pasta está certa:
  ls CLAUDE.md README.md docs public
  wc -c public/index.html          (tem que dar ~86000, não ~57000)
  grep -c "CAMADA REAL" public/index.html   (tem que dar 1)
Se qualquer um falhar, pare e me avise — não tente reconstruir a partir do site no ar.

Depois rode `cd public && python3 -m http.server 8000`, abra http://localhost:8000
e use o app como usuário: navegue pelas seis telas, ligue o Modo Real no ~/.rehabrc,
defina a data de início, registre uma sessão, faça a pausa de 10 segundos,
tranque uma ideia no cofre.

Então me diga, em 5 linhas, o que funciona de verdade e o que está quebrado ou
confuso — e uma lista separando "acabamento" de "ideia nova".
Não mexa em nada ainda.
```

---

## Prompts por tarefa

**Tela nova**
```
Quero uma sétima tela: [descreva].
Siga o padrão: uma <section class="screen"> nova, botão na tab bar, entrada em PATHS,
e um dos mascotes do objeto M no cabeçalho. Marque cada bloco com .only-demo ou
.only-real conforme o caso. Teste nos dois modos antes de me mostrar.
```

**Visual, sem quebrar o resto**
```
Quero ajustar [descreva]. Antes de editar, me mostre quais linhas de public/index.html
você vai tocar e por quê. Depois, rode o servidor local, tire screenshot da tela
afetada em 390×844 e me mostre antes e depois.
```

**Frases novas**
```
Adicione 10 frases ao array QUOTES de public/index.html.
Português, sarcásticas, secas, sobre vício em criar coisas com IA, até 60 caracteres,
sem emoji, sem repetir as 23 que já existem. Me mostre as 10 antes de inserir.
```

**Bug**
```
Comportamento errado: [descreva, e diga se foi em modo demonstração ou Modo Real].
Reproduza no localhost, explique a causa antes de corrigir, corrija, teste nos dois modos.
Se envolver dados salvos, NÃO limpe o localStorage para "resolver": escreva a migração.
Quem está no dia 40 não pode perder o streak por causa de um bug nosso.
```

---

## Fim de sessão — sempre

```
Terminei. Faça nesta ordem:
1. Console limpo no localhost, em modo demonstração E em Modo Real
2. Suba a versão do cache em public/sw.js (detoken-v2 → v3, e assim por diante)
3. Se mudou a estrutura do objeto R, escreva a migração de detoken_real_v1
4. git add -A && commit com mensagem descritiva && git push
5. Gere um zip só com o conteúdo de public/ (sem a pasta em volta) para eu subir
   no Gerenciador de Arquivos da Hostinger, substituindo os arquivos do public_html
```

Se o `git push` pedir credencial, o repositório é público mas o envio exige login: me avise e eu faço o push pelo navegador. Não guarde token nenhum na máquina.
