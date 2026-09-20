# OnStage Academy — protótipo v1

Estático (HTML/CSS/JS, sem build). Rodar: `preview_start onstage` (porta 5560) ou abrir `index.html`.

## Estado
- Home completa: hero, números, 5 programas, 6 serviços, processo, sobre, destinos, galeria, depoimentos, time, FAQ, briefing em 3 etapas, footer.
- Página modelo de vertical: `professional-development.html` (as outras 4 seguem o mesmo molde).
- EN / PT-BR / ES via `assets/js/i18n.js` (tabela única). Idioma detectado pelo navegador; `?lang=pt` força.
- SEO/GEO: JSON-LD (Organization, WebSite, FAQPage, Service), hreflang, `llms.txt`, `robots.txt` liberando bots de IA, `sitemap.xml`.

## Pendências do cliente (botão "Destacar campos" no canto mostra todas na tela)
- Fotos reais (hero, equipe, galeria, cada programa), logo oficial em SVG/PNG.
- Números: grupos operados, países de origem, fornecedores parceiros.
- Depoimentos (3) e logos de clientes.
- Prazo de proposta (48h?) e antecedência recomendada (FAQ) — validar.
- Confirmar WhatsApp (14072029641, copiado do site atual) e e-mail principal.
- Lista de destinos, fotos/cargos da equipe, redes sociais oficiais.
- Validar todas as respostas do FAQ e textos PT/ES com o cliente.

## Migração WordPress (depois da aprovação)
- Tema custom (sem page builder). Hoje o idioma troca via JS; em produção usar URLs separadas (`/pt/`, `/es/`) com hreflang e schema por idioma.
- Formulário de briefing: enviar por SMTP real, com anti-spam.

## Imagens (origem)
- `assets/img/team/` — 8 fotos da equipe, copiadas do site atual (Meet OnStage). São do próprio cliente.
- `assets/img/site/` — só `p22.jpg` (skyline de Orlando), baixado da página Media do site atual. Os demais frames eram vídeo com baixa qualidade e foram descartados.
- `assets/img/gen/` — 6 imagens FICTÍCIAS geradas por IA (keynote, gala, alunos, esporte, team building, lobby). Substituir por fotos reais dos eventos antes do lançamento.
