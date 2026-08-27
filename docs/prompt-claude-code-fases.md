# Prompts para comandar o Claude Code — fase por fase

> Abra o projeto (`git clone https://github.com/hyhaus/detoken.git && cd detoken && claude`) e cole o bloco da fase em que você está. O `CLAUDE.md` da raiz já carrega sozinho: paleta, mapa do arquivo, regras e o que não pode ser tocado.

**Estado atual: Fase 1 implementada e no ar.** Os prompts abaixo continuam de onde ela parou.

---

## Sempre, no início de qualquer sessão

```
Leia CLAUDE.md e README.md. Rode `cd public && python3 -m http.server 8000`.

Abra http://localhost:8000, ligue o Modo Real no ~/.rehabrc e use o app como
um usuário: defina a data de início, registre uma sessão, faça a pausa de 10 s,
tranque uma ideia. Depois me diga em 5 linhas o que está funcionando de verdade
e o que está quebrado ou confuso. Não mexa em nada ainda.
```

## Sempre, no fim de qualquer sessão

```
Terminei. Faça, nesta ordem:
1. Confira que não há erro de console no localhost, em modo demo E em Modo Real
2. Suba a versão do cache em public/sw.js (detoken-v2 → v3, e assim por diante)
3. Se você mudou a estrutura do objeto R, troque a chave detoken_real_v1 para v2
   e escreva a migração para quem já tem dados salvos — ninguém pode perder streak
4. Commit com mensagem descritiva e push
5. Gere um zip só com o conteúdo de public/ para eu subir na Hostinger
```

---

## Fase 2 — o app passa a devolver algo

### 2.1 · Relatório semanal
```
Crie um relatório semanal no Detoken, dentro de public/index.html.

O QUE É: toda segunda-feira, ao abrir o app em Modo Real, aparece uma folha
(reaproveite o componente .sheet que já existe) com o resumo da semana anterior:
sessões registradas vs meta, gatilho mais frequente, quantas pausas terminaram
em desistência, quanto foi gasto em assinatura no período, e a variação em
relação à semana anterior.

REGRAS DE TOM: números com sarcasmo; conclusões em tom seco. Nada de parabenizar
por algo que não aconteceu, e nada de humilhar quem passou da meta — a linha é
"isso é dado, não fracasso".

MECANISMO: feedback específico e periódico sobre o próprio comportamento, que é
a técnica com mais evidência em intervenções digitais de mudança de hábito.

DADOS: tudo já existe no objeto R (sessoes, pausas, substituicoes, assinaturas,
meta). Não crie campo novo sem me perguntar.

Guarde em R.ultimoRelatorio a data do último mostrado, para não repetir.
Me mostre a folha em screenshot 390×844 antes de considerar pronto.
```

### 2.2 · Redução gradual automática
```
Quando a pessoa cumprir a meta semanal, o app deve propor a meta da semana
seguinte 10% menor, arredondada para baixo, com mínimo de 1.

A proposta aparece no relatório semanal com dois botões: "aceito" e "mantenho
a atual". Nunca mude a meta sozinho — a decisão é sempre da pessoa.

MECANISMO: redução escalonada em vez de abstinência, para evitar o efeito de
violação da abstinência (um deslize virar abandono do programa).
```

### 2.3 · Notificação na hora de risco
```
Analise R.sessoes e descubra a faixa de horário em que a pessoa mais registra
sessões. Ofereça, no ~/.rehabrc, ativar uma notificação do PWA 30 minutos antes
dessa faixa, com o texto do plano se-então dela (R.plano).

Use a Notification API + o service worker que já existe. Peça permissão só
quando a pessoa clicar no botão, nunca no carregamento.
Se ela negar, não insista e não mostre o botão de novo.
```

---

## Fase 3 — o app fica bom de usar

### 3.1 · Onboarding de 60 segundos
```
Hoje, ligar o Modo Real joga a pessoa num formulário. Troque por três telas
em sequência dentro da folha (.sheet):
1. "desde quando você está tentando parar?" (seletor de data, com atalho "hoje")
2. "quais assinaturas de IA você paga?" (nome + valor, com botão "pular")
3. "quantas sessões por semana você acha que consegue?" (número, com sugestão
   baseada em nada, porque ela ainda não registrou nada — e diga isso)

Máximo três perguntas. Cada uma pode ser pulada. Ao final, mostrar o estado
inicial já preenchido e a primeira ação sugerida.
```

### 3.2 · Cartão de streak compartilhável
```
Botão "contar para alguém" hoje só copia texto. Faça gerar uma imagem:
canvas 1080×1080, fundo #1c1a17, o mascote (função icon('classico') do próprio
arquivo), o número de dias limpos em destaque, e detoken.bitbeagle.com embaixo.

Baixe como PNG e, onde houver navigator.share com suporte a arquivos, ofereça
compartilhar direto.

MECANISMO: compromisso público. É também o único canal de crescimento gratuito
que o projeto tem.
```

### 3.3 · O mascote reage ao progresso
```
As funções eye() e drool() em public/index.html já parametrizam a pálpebra
(lid), o tamanho da pupila e a baba. Faça o mascote melhorar conforme o streak:

- 0 a 2 dias: como está hoje (pálpebra caída, olho vermelho, baba)
- 3 a 6: menos baba, veias mais fracas
- 7 a 29: pálpebra quase normal, sem baba
- 30+: olhos abertos, sem veias — mas ainda com a cara de quem viu coisas

Só no Modo Real. Em modo demo o mascote continua chapado, sempre.
```

---

## Fase 4 — conta de verdade (só quando houver gente usando)

```
Antes de escrever qualquer linha, me apresente o plano em uma página:
endpoints, tabelas, o que é guardado, o que NÃO é guardado, e como alguém apaga
a própria conta. Não implemente nada até eu aprovar.

Restrições:
- Servidor: PHP + MySQL da própria Hostinger, que já está contratada
- Login por link mágico no e-mail, sem senha
- O app precisa continuar funcionando 100% offline e sem conta —
  a conta é só sincronização, nunca requisito
- O código de backup exportável continua existindo
```

---

## Quando algo quebrar

```
Encontrei este comportamento errado: [descreva, e diga se foi em modo demo ou
Modo Real]. Reproduza no localhost, me explique a causa antes de corrigir,
corrija, e teste de novo nos dois modos.

Se o problema envolver dados salvos, NÃO limpe o localStorage para "resolver":
escreva a migração. Quem está no dia 40 não pode perder o streak por causa
de um bug nosso.
```
