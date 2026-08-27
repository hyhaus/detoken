# Contexto do projeto — Detoken

Leia isto antes de mexer em qualquer coisa. É o manual do projeto para você, Claude.

## O que é

Site estático satírico no ar em **https://detoken.bitbeagle.com**. É um app-paródia em formato de programa de recuperação ("Appcoólicos Anônimos") para quem não consegue parar de criar aplicativos com IA. Todo o app vive em **`public/index.html`** — um arquivo só, com HTML, CSS, JS e os mascotes desenhados em SVG inline.

## Regras inegociáveis

1. **Sem build, sem dependências, sem backend.** Nada de npm, bundler, framework ou API. Se a solução exigir um `package.json`, a solução está errada. (No universo da piada, backend é recaída.)
2. **Um arquivo só.** CSS e JS ficam dentro do `index.html`. As únicas exceções já existentes: `sw.js` (service worker precisa ser arquivo separado) e o `manifest.webmanifest`.
3. **Nada de bibliotecas externas por CDN.** Só a fonte JetBrains Mono do Google Fonts, que já está lá.
4. **O tom é o produto.** Sarcástico, seco, autodepreciativo, em português. O app fala como um terminal que perdeu a paciência. Metáforas de programador (`git`, `sudo`, `/dev/null`, `:q!`, `Ctrl+C`) como etapas de cura. Sem emojis. Se uma mudança deixa o texto mais "profissional" e menos engraçado, ela piorou o app.
5. **Em modo demonstração, toda funcionalidade é inútil de propósito.** Não conserte isso. O que é útil de verdade vive no Modo Real, descrito abaixo.
6. **Tom por camada:** sarcasmo no cenário e nos números; tom seco e respeitoso nos momentos de registro, recaída e meta. Ninguém quer deboche depois de recair às 3h.

## Paleta e tipografia

```
--bg #0b0d10   --panel #111418   --line #242a33   --fg #d7dde6   --dim #7c8794
--green #3ddc84   --amber #f5b83d   --red #ff5c5c   --blue #5aa9ff   --purple #b48cff
--claude #D97757 (laranja do mascote)   --drool #7CE37C (a baba)
```
Fonte: JetBrains Mono em tudo. Mobile-first, 390×844; no desktop o app aparece dentro de uma moldura de iPhone (media query `min-width:760px`).

## As duas camadas

O app tem **modo demonstração** (o padrão, com números fictícios) e **Modo Real** (dados da pessoa). A classe `.real` no `#app` alterna os dois; no CSS, `.only-demo` e `.only-real` mostram ou escondem cada bloco. **A primeira visita é sempre demo** — quem chegou pela piada vê a piada.

Estado do Modo Real: objeto `R`, salvo em `localStorage` na chave `detoken_real_v1`. Campos: `on`, `nome`, `inicio`, `recorde`, `recaidas[]`, `ideias[]`, `assinaturas[]`, `valorHora`, `sessoes[]`, `pausas{total,desistiu}`, `substituicoes[]`, `meta`, `plano`, `contou`, `eventos[]`, `marcos{}`.

Regra dura: **ninguém pode perder streak por causa de mudança nossa.** Se mexer na estrutura de `R`, escreva a migração.

Os 12 commits, no Modo Real, são destravados pelo array `MARCOS` — cada um tem uma condição verificável (`c()`) e a descrição do que falta (`d`). Não transforme marco em clique.

## Mapa do `index.html`

Procure por estes comentários, nesta ordem:

- `/* ================= mascotes ================= */` — funções `rays()`, `eye()`, `drool()` e o objeto `M` com as 5 variações: `classico`, `clinica`, `overdose`, `terminal`, `corporate`. `icon(k, bg, escala)` monta o SVG completo.
- `/* ================= estado ================= */` — objeto `S`, salvo em `localStorage` na chave `detoken_v1`. Campos: `pct` (cura), `step` (commit atual), `tok`, `hrs`, `brl`, `apps`, `flow` (vazão do soro), `pres` (pressão de ideias), `nextRelapse`, `hist`, `toggles`, `sound`.
- `/* ================= som ================= */` — Web Audio puro, sem arquivos. `snd('commit'|'relapse'|'alarm'|'toast'|'tap'|'no'|'panic'|'confess')`. Desligado por padrão; ligado pelo toggle "Bipes de Terminal".
- `/* ================= bancos de frases ================= */` — `QUOTES` (23 frases rotativas), `STATUS`, `PRE`/`SUF` (gerador de nomes ridículos de app), `TERM` (linhas do terminal falso).
- `/* ================= navegação ================= */` — `go('home'|'soro'|'log'|'recaida'|'commits'|'config')` e `PATHS` (o prompt que aparece na barra de cima de cada tela).
- Depois, uma seção por tela: home (`render()`, `commit()`, `relapse()`, `key()`), soro (`scene()`, `flow()`, `pullIv()`), terminal (`stream()`, `panic()`), recaída (`confess()`), commits (`sponsor()`), config (array `FEAT`).
- `/* ================= PWA ================= */` — registro do service worker e `installApp()`.
- `/* ================= CAMADA REAL ================= */` — objeto `R`, `renderReal()`, `MARCOS`, a pausa de 10 s (`abrirPausa`), a folha de registro (`sheet()`), cofre de ideias, assinaturas, export/import.

## Como testar

```bash
cd public && python3 -m http.server 8000
```
Service worker e instalação como PWA só funcionam via `http://localhost` ou HTTPS — pelo `file://` ficam inertes.

Ao mexer no JS, confira no console que não há erro e clique em tudo: as seis abas, commit, recaída, confessar ideia, aumentar/reduzir vazão, pânico, os toggles. Se mudar a estrutura de `S`, troque a chave `detoken_v1` por `detoken_v2` para não quebrar o estado de quem já visitou.

## Ao mexer no service worker

Se alterar arquivos de `public/`, **suba a versão do cache** em `sw.js` (`const CACHE = 'detoken-v1'` → `v2`). Sem isso, quem já visitou continua vendo a versão antiga.

## Ao mexer nas meta tags

O preview de link foi escolhido e aprovado. Não mude sem pedido explícito:

- `og:title`: `Detoken · detox de tokens para appcoólicos anônimos` (com ponto do meio, não travessão)
- `og:description`: `Feito com IA em 6 minutos por alguém que deveria estar dormindo. A ironia não é um bug: é a funcionalidade principal.`
- `og:image`: `https://detoken.bitbeagle.com/og-detoken-classico.png` (1200×630, 125 KB)
- `og:site_name`: `Appcoólicos Anônimos`

O WhatsApp guarda o preview em cache por horas. Depois de mudar, compartilhe com `?v=2` no fim da URL para forçar a releitura.

## Publicar

O conteúdo de `public/` vai inteiro para o `public_html` na Hostinger (Gerenciador de Arquivos → upload → substituir). DNS do `bitbeagle.com` fica na Namecheap: registro `A · detoken · 82.25.73.247`. **Nunca** troque os nameservers do domínio para a Hostinger — isso derrubaria os outros subdomínios. Passo a passo em `docs/deploy-hostinger.md`.

## O que não fazer

- Não adicionar analytics, cookie banner, formulário de e-mail ou qualquer coisa que colete dados. O app tem zero usuários e essa é a graça.
- Não "consertar" os números fake do modo demonstração para serem reais — o lugar do dado real é o Modo Real.
- Não coletar campo que nenhuma tela usa.
- Não criar outro app para resolver um problema deste app.
