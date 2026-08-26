# Subir o Detoken ao ar — detoken.bitbeagle.com
Hospedagem: **Hostinger** · DNS: **Namecheap** · Site estático (sem build, sem backend — backend seria recaída)

O que está no zip (`detoken-site.zip`): `index.html`, `og-detoken-classico.png`, `favicon.svg`, `favicon.png`, `apple-touch-icon.png`, `icon-512.png`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `.htaccess`.

---

## Passo 1 — Criar o subdomínio na Hostinger (5 min)
1. hPanel → **Websites** → **Adicionar site** (Add Website) → **Usar um domínio existente**.
2. Digite `detoken.bitbeagle.com` e confirme. A Hostinger vai criar a pasta `domains/detoken.bitbeagle.com/public_html`.
3. Ela vai avisar que o domínio "não aponta para a Hostinger". **Não troque os nameservers** (isso moveria o DNS inteiro do bitbeagle.com). Escolha a opção de apontar por **registro A** e anote o **IP do servidor** — também aparece em hPanel → Hospedagem → *Detalhes do plano* → "Endereço IP".

## Passo 2 — Registro DNS na Namecheap (2 min)
1. Namecheap → **Domain List** → bitbeagle.com → **Manage** → aba **Advanced DNS**.
2. **Add New Record**:
   - Type: `A Record`
   - Host: `detoken`
   - Value: *o IP da Hostinger do passo 1*
   - TTL: `Automatic`
3. Salvar. Propagação: normalmente 5–30 min (pode chegar a algumas horas).
4. Para conferir: https://dnschecker.org → `detoken.bitbeagle.com` → tipo A → tem que mostrar o IP da Hostinger.

## Passo 3 — Subir os arquivos (3 min)
1. hPanel → o site `detoken.bitbeagle.com` → **Gerenciador de Arquivos** (File Manager).
2. Entre em `public_html`. Se houver `default.php` ou similar, apague.
3. **Upload** → envie `detoken-site.zip` → clique com o direito → **Extract** (extrair aqui).
4. Confira que `index.html` ficou **direto** em `public_html` (não dentro de uma subpasta `site/`). Se ficou, mova tudo um nível para cima.
5. Ative "mostrar arquivos ocultos" e confira que o `.htaccess` está lá.

## Passo 4 — SSL (automático, ~10 min depois do DNS)
1. hPanel → **Segurança** → **SSL** → `detoken.bitbeagle.com` → instalar o Let's Encrypt gratuito (se não instalou sozinho).
2. Quando estiver "Ativo", ligue **Forçar HTTPS** no hPanel **ou** descomente as 3 linhas de RewriteRule no `.htaccess`.

## Passo 5 — Testar o preview do link
1. Abra https://detoken.bitbeagle.com no celular. Deve abrir como app, tela cheia, com o mascote.
2. Mande o link para **você mesmo** no WhatsApp (conversa "Você"). O cartão deve mostrar o mascote, o título *"Detoken — detox de tokens para appcoólicos anônimos"* e a descrição *"Feito com IA em 6 minutos…"*.
3. Conferência técnica opcional: https://www.opengraph.xyz → cole a URL.

## Se o preview vier errado ou vazio
- **Sem imagem:** confira que https://detoken.bitbeagle.com/og-detoken-classico.png abre no navegador. Se não abrir, o arquivo não está em `public_html`.
- **Cartão antigo/cacheado:** o WhatsApp guarda o preview por horas. Mude o `og:image` no `index.html` para `…/og-detoken-classico.png?v=2` e reenvie o link.
- **Abre com cadeado quebrado:** SSL ainda não ativou — aguarde e não descomente o redirect antes disso.

## O que NÃO fazer
- Não comprar `detoken.app`. Você tem o subdomínio. Isso é literalmente o commit 4.
- Não criar outro app para monitorar o deploy deste app.
