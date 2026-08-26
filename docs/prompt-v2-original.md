# PROMPT v2 — Detoken (Appcoólicos Anônimos)

> Versão "com juice". Cole no Claude para gerar o site completo. Sim, você está usando IA para construir um app que te cura de construir apps com IA. Isso já está previsto no tratamento (commit 7).

---

Construa o site estático do **Detoken** — "detox de tokens para appcoólicos anônimos", o app do grupo **Appcoólicos Anônimos**, um programa de recuperação em **12 commits** para quem não consegue parar de criar aplicativos com IA. O site vai ao ar em `https://detoken.bitbeagle.com`, num único `index.html` sem backend (backend seria recaída), com estado salvo em `localStorage` para parecer um app de verdade entre visitas.

## Tom
Sarcástico, seco, inteligente, autodepreciativo. O app fala como um terminal que perdeu a paciência. Nomenclatura de programador (`git`, `sudo`, `/dev/null`, `:q!`, `Ctrl+C`) como metáfora para etapas de cura. O app admite abertamente que foi feito com IA e trata isso como parte do tratamento. Sem emojis fofos; ícones em texto monoespaçado.

## Formato
- Mobile-first (390×844). No celular, o app ocupa a tela inteira como um app nativo; no desktop, aparece dentro de uma moldura de iPhone centralizada, com um fundo escuro discreto.
- Dark mode, fonte JetBrains Mono, paleta: laranja Claude `#D97757`, verde `#3ddc84`, âmbar `#f5b83d`, vermelho `#ff5c5c`, roxo `#b48cff`, fundo `#0b0d10`.
- Navegação por tab bar inferior entre 6 telas; transições suaves; tudo clicável responde com algo (toast, log, número mudando, animação).

## As 6 telas — cada uma com um logo diferente do mascote
O mascote é o asterisco laranja do Claude, chapado: pálpebra caída, olho vermelho, baba verde, traço trêmulo estilo desenho animado adulto.

1. **Home `~/rehab`** — logo *Clássico Chapado*. Barra de progressão de cura animada (começa em ~37% e oscila levemente sozinha), contador ao vivo de **tempo sem codar** (dias:horas:min:seg, contando desde a primeira visita, salvo em localStorage), status rotativo ("Compilando força de vontade…", "Resolvendo conflitos com a realidade…", "Aguardando rate limit…"), quatro métricas que pulsam com números aleatórios plausíveis (tokens economizados, horas devolvidas à família, dinheiro poupado, apps NÃO criados), botão `git commit -m "aceito"` que avança o progresso, atalhos em teclas (`Ctrl+C`, `:q!`, `git stash`, `sudo`) e uma notificação passivo-agressiva com a hora real.
2. **Soro `~/clinica`** — logo *Soro de Tokens*. Mockup de internação: bolsa de soro "TOKENS" com gotas caindo pelo tubo até a veia do mascote (animação contínua), vazão em tok/min mudando ao vivo, monitor de sinais vitais com linha de ECG animada e batimento "por prompt", pulseira PAT.0001, botão "aumentar vazão" que sobe o número e dispara alerta de overdose.
3. **Terminal `~/log`** — logo *X_X Terminal*. Códigos rodando sem parar: um stream de linhas fake (`npm install sanidade`, `git push origin recuperacao`, `rm -rf ~/ideias`, `WARN ideia detectada: "Uber para cachorros"`), com cores de sucesso/erro/aviso, cursor piscando e auto-scroll. Botão "PÂNICO" (`Ctrl+C`) que interrompe o stream com `^C` e imprime um lembrete cruel.
4. **Overdose `~/recaida`** — logo *Overdose de Prompt*. **Countdown para a próxima recaída prevista** (regressivo, aleatório entre 2h e 9h; quando zera, dispara "recaída evitada" e reinicia), medidor de "pressão de ideias" subindo, histórico das últimas recaídas com nomes de app ridículos gerados aleatoriamente ("Tinder para plantas", "Uber de caneta", "Duolingo de silêncio"), botão "confessar ideia" que gera um nome novo, joga em `/dev/null` e conta como recaída evitada.
5. **Commits `git log`** — logo *Clássico* pequeno no cabeçalho. Os 12 passos em formato `git log --oneline` com hash e check; HEAD avança com os commits feitos na Home; Sponsor Sintético (um Claude que responde só "não." e variações) com botão para perguntar.
6. **Config `~/.rehabrc`** — logo *Corporate Sóbrio*. Toggles de funcionalidades inúteis (Bloqueador de Ideias, Modo Avião Mental, Bloqueio de Pricing Page, Sponsor Sintético, git blame yourself, Cofrinho de Tokens, Deploy para /dev/null, Recaída Assistida, Reunião do Grupo, Modo Toque na Grama, Notificação Passivo-Agressiva — que não pode ser desligada). Zona de perigo: `rm -rf ~/progresso` zera tudo. Rodapé: "Este app foi feito com IA em 6 minutos. Estamos cientes da ironia. Ela faz parte do tratamento."

## Juice obrigatório
Números que mudam sozinhos a cada poucos segundos; contadores que giram ao atualizar; toasts para todo clique; frases engraçadas rotativas (banco de pelo menos 20); vibração visual (shake) no botão de recaída; confete de tokens ao completar um commit; título da aba alternando ("Detoken", "volte a codar… brincadeira", "dia 3"); som opcional desligado por padrão.

## Preview de link (meta tags exatas)
- `og:title`: Detoken — detox de tokens para appcoólicos anônimos
- `og:description`: Feito com IA em 6 minutos por alguém que deveria estar dormindo. A ironia não é um bug: é a funcionalidade principal.
- `og:image`: https://detoken.bitbeagle.com/og-detoken-classico.png (1200×630)
- `og:url`: https://detoken.bitbeagle.com · `og:site_name`: Appcoólicos Anônimos · `generator`: IA, às 03h47, contra o bom senso

## Entrega
Pasta pronta para upload em `public_html`: `index.html`, `og-detoken-classico.png`, `favicon.svg`, `favicon.png`, `apple-touch-icon.png`, `manifest.webmanifest`, `robots.txt`. Nada de build, nada de dependências, nada de backend.
