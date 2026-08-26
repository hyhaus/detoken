# Detoken · Appcoólicos Anônimos

> Detox de tokens para appcoólicos anônimos. Programa de recuperação em 12 commits para quem não consegue parar de criar aplicativos com IA.
>
> Feito com IA em 6 minutos por alguém que deveria estar dormindo. A ironia não é um bug: é a funcionalidade principal.

**No ar:** https://detoken.bitbeagle.com

Site estático, um único `index.html`, sem build, sem dependências e sem backend — backend seria recaída. Instalável como PWA, funciona offline e guarda o progresso em `localStorage`.

---

## O que é

Um app-paródia em formato de programa de recuperação. Seis telas, cada uma com uma variação do mascote (o asterisco laranja do Claude, chapado):

| Tela | Caminho | O que faz |
|---|---|---|
| **Home** | `~/rehab` | Barra de cura que oscila sozinha, contador ao vivo de tempo sem codar, métricas de tokens/horas/dinheiro/apps-não-criados, botão de commit, teclas de atalho |
| **Soro** | `~/clinica` | Bolsa de "TOKENS" pingando na veia do mascote, vazão em tok/min, ECG animado, alerta de overdose |
| **Log** | `~/log` | Stream infinito de código rodando, com botão de PÂNICO (`Ctrl+C`) |
| **Recaída** | `~/recaida` | Countdown para a próxima recaída prevista, pressão de ideias, gerador de nomes ridículos de app |
| **Commits** | `git log` | Os 12 passos em formato `git log --oneline` + Sponsor Sintético (responde só "não.") |
| **Config** | `~/.rehabrc` | Toggles de funcionalidades inúteis, bipes de terminal, instalar como PWA, `rm -rf ~/progresso` |

## Estrutura

```
public/      ← é exatamente o conteúdo do public_html no servidor
  index.html            todo o app: HTML + CSS + JS + mascotes em SVG, num arquivo só
  sw.js                 service worker (offline + cache)
  manifest.webmanifest  PWA: nome, ícones, standalone
  icon-*.png            ícones 192/512, versões normais e maskable
  favicon.svg/.png      favicon
  apple-touch-icon.png  ícone do iOS
  og-detoken-classico.png   imagem 1200×630 do preview de link
  .htaccess robots.txt sitemap.xml

docs/
  prompt-claude-code.md     prompts prontos para trabalhar no projeto pelo Claude Code
  prompt-v2-original.md     o prompt que gerou este site
  deploy-hostinger.md       passo a passo de publicação
  logos-5-opcoes.html       as 5 opções de logo do mascote
  preview-whatsapp.html     simulador do preview de link no WhatsApp
  og-alternativa.png        versão alternativa da imagem de preview
```

## Rodar localmente

Não precisa de build. Qualquer servidor estático serve:

```bash
cd public && python3 -m http.server 8000
# abre http://localhost:8000
```

Abrir o `index.html` direto pelo `file://` também funciona, mas o service worker e a instalação como PWA só ficam ativos via `http://` ou `https://`.

## Publicar

O conteúdo de `public/` vai inteiro para o `public_html` na Hostinger. Detalhes (DNS, SSL, cache do preview) em [`docs/deploy-hostinger.md`](docs/deploy-hostinger.md).

## Aviso terapêutico

Este repositório é, ele próprio, um app criado com IA para curar o vício de criar apps com IA. Estamos cientes. Faz parte do tratamento (commit 7).
