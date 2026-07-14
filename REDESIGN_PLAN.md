# BEST GELO — Premium Redesign Plan
**Ice Factory Website | Mauá/SP | Next.js 15 + Tailwind**

---

## 1. SUBJECT & BRIEF

**Subject:** Best Gelo Comércio de Gelo LTDA — Fábrica própria em Mauá/SP. Gelo em cubos, triturado, seco e personalizado. Entrega em até 2h na Grande SP.

**Audience:**
- Primário: Donos de bares, restaurantes, organizadores de eventos (B2B recorrente)
- Secundário: Consumidor final para festas/churrascos (B2C pontual)

**Page's Single Job:** Converter visitantes em pedidos via WhatsApp — seja varejo (1 saco) ou atacado (pallets semanais).

**Brand Truth:** Fábrica real, água purificada (osmose reversa), certificado ANVISA, frota própria refrigerada. Não é revendedor.

---

## 2. DESIGN TOKENS

### Color Palette (4 core + neutrals)

| Token | Hex | Usage | Rationale |
|-------|-----|-------|-----------|
| `ice-500` | `#06B6D4` | Primary brand, CTAs, links, accent borders | Cyan-500 — gelo, tecnologia, confiança, deriva do logo |
| `ice-600` | `#0891B2` | Hover states, pressed buttons | Acessível em branco (WCAG AA) |
| `ice-100` | `#CFFAFE` | Badges, backgrounds sutis, hover cards | Subtle brand presence |
| `ice-900` | `#164E63` | Texto em fundos claros, headings escuros | Contraste máximo |
| `fire-500` | `#EF4444` | WhatsApp CTA, urgência, "Peça agora" | Vermelho = ação, calor vs. gelo, destaque máximo |
| `fire-600` | `#DC2626` | Hover WhatsApp | Acessível |
| `frost-50` | `#F8FAFC` | Background principal | Quase branco, respira |
| `frost-100` | `#F1F5F9` | Cards, seções alternadas | Separção visual sutil |
| `frost-900` | `#0F172A` | Footer, texto principal, headings | Quase preto, profissional |
| `frost-600` | `#475569` | Texto secundário, labels | Legível, não compete |

**Semantic aliases:**
- `bg-primary` = `frost-50`
- `bg-surface` = `white`
- `bg-muted` = `frost-100`
- `text-primary` = `frost-900`
- `text-muted` = `frost-600`
- `accent` = `ice-500`
- `acct-cta` = `fire-500` (WhatsApp)

### Typography

| Role | Font | Weights | Scale | Rationale |
|------|------|---------|-------|-----------|
| **Display** | **Bebas Neue** (Google Fonts) | 400 | `text-4xl` → `text-7xl` | Industrial, forte, legível à distância — "fábrica", "gelo", "entrega". Usado com parcimônia (headlines apenas). |
| **Body** | **Inter** (Google Fonts, variable) | 400, 500, 600 | `text-base` → `text-lg` | Neutra, legível em telas, pares bem com Bebas. |
| **Utility** | **JetBrains Mono** (variable) | 400, 500 | `text-xs` → `text-sm` | Dados técnicos: CNPJ, CEP, telefone, preços. Monoespaçado = precisão. |

**Type Scale (clamp fluid):**
```
--text-display-xl: clamp(3rem, 8vw, 6rem);      // Hero headline
--text-display-lg: clamp(2.25rem, 5vw, 4rem);   // Section titles
--text-display-md: clamp(1.5rem, 3vw, 2.5rem);  // Sub-section
--text-lg: clamp(1.125rem, 1.5vw, 1.25rem);     // Lead paragraph
--text-base: 1rem;                              // Body
--text-sm: 0.875rem;                            // Captions
--text-xs: 0.75rem;                             // Legal, meta
```

**Letter-spacing:** Display `-0.02em` (aperto industrial), Body `0`, Mono `0.02em`.

### Spacing Scale (4px base)
```
--space-1: 0.25rem  (4px)
--space-2: 0.5rem   (8px)
--space-3: 0.75rem  (12px)
--space-4: 1rem     (16px)
--space-5: 1.25rem  (20px)
--space-6: 1.5rem   (24px)
--space-8: 2rem     (32px)
--space-10: 2.5rem  (40px)
--space-12: 3rem    (48px)
--space-16: 4rem    (64px)
--space-20: 5rem    (80px)
--space-24: 6rem    (96px)
```

### Border Radius
```
--radius-none: 0
--radius-sm: 0.375rem   (6px)  - badges, inputs
--radius-md: 0.5rem     (8px)  - buttons
--radius-lg: 0.75rem    (12px) - cards
--radius-xl: 1rem       (16px) - sections, modals
--radius-2xl: 1.5rem    (24px) - hero containers
--radius-full: 9999px
```

### Shadows (Layered, "frosted glass" feel)
```
--shadow-ice: 0 4px 24px -4px rgb(6 182 212 / 0.15), 0 0 0 1px rgb(6 182 212 / 0.08);
--shadow-ice-lg: 0 12px 48px -8px rgb(6 182 212 / 0.2), 0 0 0 1px rgb(6 182 212 / 0.1);
--shadow-frost: 0 2px 16px -2px rgb(15 23 42 / 0.08), 0 0 0 1px rgb(148 163 184 / 0.1);
--shadow-frost-lg: 0 20px 64px -12px rgb(15 23 42 / 0.12), 0 0 0 1px rgb(148 163 184 / 0.08);
--shadow-whatsapp: 0 4px 24px -4px rgb(239 68 68 / 0.3), 0 0 0 1px rgb(239 68 68 / 0.1);
```

### Container
```
--container-max: 1200px
--container-padding: 1.5rem (mobile) → 3rem (desktop)
```

---

## 3. LAYOUT CONCEPTS & ASCII WIREFRAMES

### Global Structure
```
┌─────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████  │  ← Sticky Header (logo, nav, WhatsApp CTA)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← HERO (thesis)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← PRODUCTS (grid 4→2→1)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← WHY US / DIFERENCIAIS (3+3 grid)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← PROCESS (timeline horizontal→vertical)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← SOCIAL PROOF (carousel/logos)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← B2B / ATACADO (conversion zone)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← FAQ (accordion, objection handling)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│  ████████████████████████████████████████████████████████████  │  ← FOOTER (contact, links, certs)
└─────────────────────────────────────────────────────────────┘
```

### 3.1 HERO — Thesis Statement
```
DESKTOP (≥1024px)                          MOBILE (<640px)
┌─────────────────────────────────────┐    ┌─────────────────────┐
│  [LOGO]          NAV           [WA] │    │  [LOGO]         [☰] │
├─────────────────────────────────────┤    ├─────────────────────┤
│                                     │    │                     │
│     Gelo de qualidade               │    │   Gelo de qualidade │
│     superior direto                 │    │   superior direto   │
│     da fábrica.                     │    │   da fábrica.       │
│                                     │    │                     │
│     Cubos, triturado, seco          │    │   Cubos, triturado, │
│     e personalizado.                │    │   seco e personali- │
│     Entrega em até 2h na            │    │   zado. Entrega em  │
│     Grande SP.                      │    │   até 2h na         │
│                                     │    │   Grande SP.        │
│  ┌─────────────────────────────┐    │    │  ┌───────────────┐ │
│  │  Pedir no WhatsApp  🔴      │    │    │  │ Pedir no      │ │
│  │  (fire-500, large, pulse)   │    │    │  │ WhatsApp 🔴   │ │
│  └─────────────────────────────┘    │    │  └───────────────┘ │
│                                     │    │                     │
│  [🏭] [✓ ANVISA] [🚛 Frota] [⭐ 4.9] │    │  [🏭] [✓ ANVISA]    │
│                                     │    │  [🚛 Frota] [⭐ 4.9] │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    │  ░░░░░░░░░░░░░░░░░░ │
│  Ice crystal particles (CSS)        │    │  (reduced motion)   │
└─────────────────────────────────────┘    └─────────────────────┘
```

**Key decisions:**
- Headline em **Bebas Neue** `text-display-xl` — uma frase, sem fluff
- Subheadline em **Inter** `text-lg` — benefícios concretos
- **UM CTA primário** (WhatsApp vermelho, pulse sutil)
- Trust badges inline (não em carrossel) — fábrica, ANVISA, frota, rating
- Background: `frost-50` com partículas de gelo CSS (reduced motion: `prefers-reduced-motion`)

---

### 3.2 PRODUCTS GRID — Catálogo Visual
```
DESKTOP (4 cols)                    TABLET (2 cols)              MOBILE (1 col)
┌─────┬─────┬─────┬─────┐           ┌─────┬─────┐                ┌─────┐
│ 🧊  │ 🍹  │ ❄️  │ ✨  │           │ 🧊  │ 🍹  │                │ 🧊  │
│Cubos│Trit.│ Seco│Pers.│           │Cubos│Trit.│                │Cubos│
│R$8  │R$10 │R$15 │Cons.│           │R$8  │R$10 │                │R$8  │
│[Ver]│[Ver]│[Ver]│[Ver]│           │[Ver]│[Ver]│                │[Ver]│
└─────┴─────┴─────┴─────┘           └─────┴─────┘                └─────┘
```

**Card anatomy:**
```
┌─────────────────────────────────────┐
│          ████████████████           │  ← Aspect-ratio 4:3, bg ice-100
│          █  ICON  █                 │     ou product photo
│          ████████████████           │
├─────────────────────────────────────┤
│  Gelo em Cubos            [R$ 8,00] │  ← Name (Bebas Neue) + Price (Mono)
│  Cubos perfeitos para       5kg     │  ← Desc (Inter) + Unit (Mono)
│  drinks e whisky.                   │
├─────────────────────────────────────┤
│  [ Ver detalhes → ]   [ + Carrinho ]│  ← Secondary + Primary (WA deep link)
└─────────────────────────────────────┘
```

**Hover/Focus:** Elevação (`shadow-ice-lg`), border `ice-500`, icon scale 1.05

---

### 3.3 DIFERENCIAIS / WHY US — 6 Pilares
```
DESKTOP (3x2 grid)                  MOBILE (stack)
┌──────────┬──────────┬──────────┐    ┌──────────────────┐
│  🏭      │  💧      │  🚛      │    │  🏭  Fábrica Própria    │
│ Fábrica  │  Água    │  Entrega │    │  2.000m² em Mauá      │
│ Própria  │  Pura    │  2h      │    │  Controle total       │
├──────────┼──────────┼──────────┤    ├──────────────────┤
│  📋      │  🧊      │  🤝      │    │  💧  Osmose Reversa   │
│ Certif.  │  Derret. │  Atacado │    │  Água purificada      │
│ ANVISA   │  Lento   │  & Eventos│   │  Sem cloro/sabor      │
└──────────┴──────────┴──────────┘    └──────────────────┘
```

**Each card:** Icon (IceCream/Truck/Shield/Star) em círculo `ice-100` → Title (Bebas Neue `text-xl`) → Desc (Inter `text-sm`)

---

### 3.4 PROCESS — "Do Pedido à Entrega"
```
DESKTOP (horizontal timeline)       MOBILE (vertical steps)
┌──┬──┬──┬──┬──┬──┐                  ┌─────────────────────┐
│01│02│03│04│05│06│                  │  01  Pedido         │
│  │  │  │  │  │  │                  │  ─────────────────  │
│P │W │P │F │E │E │                  │  WhatsApp ou Site   │
│e │h │r │a │n │n │                  │                     │
│d │a │o │b │t │t │                  │  02  Confirmação    │
│i │t │d │r │r │r │                  │  ─────────────────  │
│d │s │u │i │e │e │                  │  Em 5 min via WA    │
│o │  │z │c │g │g │                  │                     │
│  │  │  │a │a │a │                  │  03  Produção       │
└──┴──┴──┴──┴──┴──┘                  │  ─────────────────  │
  Pedido  WA  Prod Fab Ent Ent      │  Fábrica em Mauá    │
                                    │                     │
Connectors: linha tracejada          │  04  Embarque       │
ice-300, círculos nos nodes          │  ─────────────────  │
                                     │  Frota refrigerada  │
Step ativo: bg fire-500              │                     │
                                     │  05  Entrega        │
Labels abaixo dos círculos           │  ─────────────────  │
                                     │  Até 2h, confirma   │
                                     │                     │
                                     │  06  Pós-venda      │
                                     │  ─────────────────  │
                                     │  Suporte WhatsApp   │
                                     └─────────────────────┘
```

**Why horizontal→vertical:** Ordem carrega informação (processo temporal). Números (01-06) fazem sentido aqui.

---

### 3.5 SOCIAL PROOF — Logos + Depoimentos
```
DESKTOP                                MOBILE
┌─────────────────────────────────┐    ┌─────────────────────┐
│  Clientes que confiam           │    │  Clientes que       │
│                                 │    │  confiam            │
│  [Logo1] [Logo2] [Logo3]        │    │  [Logo1]            │
│  [Logo4] [Logo5] [Logo6]        │    │  [Logo2]            │
│                                 │    │  (scroll horizontal)│
│  ┌─────────────────────────┐    │    │                     │
│  │ "O gelo chega sempre    │    │    │  ┌─────────────┐   │
│  │  no ponto, nunca        │    │    │  │ "Chega no   │   │
│  │  derreteu no caminho.   │    │    │  │  ponto, sem │   │
│  │  — Bar do Zé, Santo     │    │    │  │  derreter." │   │
│  │  André"                 │    │    │  │  — Bar do Zé│   │
│  │  ⭐⭐⭐⭐⭐  (carousel)    │    │    │  │  ⭐⭐⭐⭐⭐   │   │
│  └─────────────────────────┘    │    │  └─────────────┘   │
└─────────────────────────────────┘    └─────────────────────┘
```

**Logs:** Bares/restaurantes reais da região (ABC, SP). Sem logos genéricos.
**Carousel:** 3 depoimentos, auto-rotate 5s, pause on hover, dots navigation.

---

### 3.6 B2B / ATACADO — Conversion Zone
```
┌─────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← bg frost-900, text white
│                                                             │
│     Precisa de gelo         [Tabela progressiva]    [WA]    │
│     toda semana?            │ Qtd    │ Preço/kg │          │
│                             ├────────┼──────────┤          │
│     Atendemos bares,        │ 50kg   │ R$ 1,60  │  [Peça   │
│     restaurantes e          │ 100kg  │ R$ 1,40  │   sua    │
│     eventos com             │ 500kg  │ R$ 1,20  │  tabela  │
│     condições especiais.    │ 1000kg │ R$ 1,00  │  comercial│
│                             └────────┼──────────┘   ]       │
│     • Faturamento 30 dias           │                  (fire-500)
│     • Entrega programada            │
│     • Suporte prioritário           │
│     • Freezer comodato*             │
│                                                             │
│     *Sujeito a análise de volume.                             │
└─────────────────────────────────────────────────────────────┘
```

**Design:** Background `frost-900` (única seção escura) = destaque visual. Tabela em **JetBrains Mono** para alinhamento numérico perfeito. CTA WhatsApp vermelho grande.

---

### 3.7 FAQ — Objection Handling (Accordion)
```
┌─────────────────────────────────────────────────────────────┐
│  Perguntas Frequentes                          [Ver todas]  │
├─────────────────────────────────────────────────────────────┤
│  ▼  Qual a quantidade mínima?          R: 1 saco (5kg)     │
│  ▼  Entregam no meu bairro?            R: Consulte CEP...  │
│  ▼  Como faço pedido recorrente?       R: Faturamento...   │
│  ▼  O gelo é certificado?              R: Sim, ANVISA...   │
│  ▼  Aceitam cartão?                    R: Sim, débito/créd.│
│  ▼  Gelo seco: cuidados?               R: Luvas, ventil... │
│  ▼  Personalizado: prazo?              R: 48h após arte... │
│  ▼  Posso retirar na fábrica?          R: Sim, 5% desconto │
└─────────────────────────────────────────────────────────────┘
```

**Accordion:** `<details>/<summary>` nativo (acessível, SEO-friendly). Icon `ChevronDown` rotaciona no `open`.

---

### 3.8 FOOTER
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Best Gelo          │  EMPRESA        │  SUPORTE      │
│  Fábrica em Mauá/SP        │  • Sobre        │  • Contato    │
│  Gelo de qualidade         │  • Produtos     │  • Privacidade│
│  para eventos, bares       │  • Entrega      │  • Termos     │
│  e restaurantes.           │  • FAQ          │               │
│                            │                 │  CONTATO      │
│  [WA] [IG] [FB]            │                 │  📍 Rua Bras  │
│                            │                 │     Cubas, 624 │
│  ────────────────────────  │                 │  📞 (11) 99999│
│  © 2025 Best Gelo LTDA     │                 │  ✉️ contato@  │
│  CNPJ 46.613.186/0001-86   │                 │               │
│  Desenvolvido com ❤️      │                 │               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. SIGNATURE ELEMENT

**"The Breathing Ice Crystal"**

Um sistema de partículas CSS puras (sem canvas, sem JS pesado) que:

1. **Hero:** 30-40 cristais hexagonais sutis flutuando para cima com `opacity: 0.04-0.08`, `animation: float 20s infinite linear`, tamanhos `4-16px`
2. **Scroll trigger:** Ao rolar, cristais "congelam" e formam divisores de seção (linha de cristais entre sections)
3. **Hover cards:** Ao passar mouse em product card, 3-5 cristais nascem do canto e dissolvem
4. **WhatsApp button:** Pulso sutil com 3 cristais orbitando (reduzido em `prefers-reduced-motion`)

**Implementation:** CSS `@keyframes` + `animation-delay` escalonado via `nth-child` + `will-change: transform, opacity`. Zero JS. ~2KB gzipped.

**Why this works:** Embodiment literal do produto (gelo/cristal), atmosférico sem ser distrativo, performático, acessível (`prefers-reduced-motion: reduce` desliga tudo).

---

## 5. CONVERSION STRATEGY

### CTA Hierarchy
| Level | Element | Style | Placement |
|-------|---------|-------|-----------|
| **Primary** | WhatsApp "Pedir agora" | `fire-500`, `text-lg`, `px-8 py-4`, `shadow-whatsapp`, pulse 2s | Hero (above fold), Sticky bottom bar (mobile), B2B section, Footer |
| **Secondary** | "Ver detalhes" / "Ver produtos" | `ice-600`, `underline`, `font-medium` | Product cards, FAQ, footer links |
| **Tertiary** | "Falar com vendas" (B2B) | `bg-transparent`, `border-2 border-fire-500`, `text-fire-500` | B2B section |

### WhatsApp Sticky Bar (Mobile only, ≤768px)
```
┌─────────────────────────────────────┐
│  💬  Pedido rápido no WhatsApp  →   │  ← Fixed bottom, safe-area-inset-bottom
│  fire-500 bg, white text, shadow-lg │
└─────────────────────────────────────┘
```
- Aparece após scroll > 50vh
- Deep link: `https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20gelo.`
- Fecha com "X" (persiste em `sessionStorage` por sessão)

### Trust Signals (Above Fold)
1. **Fábrica própria** — badge com ícone 🏭
2. **ANVISA / Vigilância Sanitária** — badge ✓
3. **Frota refrigerada própria** — badge 🚛
4. **Rating 4.9★** — stars + "120+ avaliações Google"
5. **Entrega 2h** — badge ⚡

---

## 6. MOBILE-FIRST CONSIDERATIONS

### Breakpoints
```
sm:  640px   (large phone)
md:  768px   (tablet portrait)
lg:  1024px  (tablet landscape / small desktop)
xl:  1280px  (desktop)
2xl: 1536px  (large desktop)
```

### Touch Targets
- Mínimo **48x48px** (WCAG AAA)
- WhatsApp CTA: **full-width**, `min-h-[56px]`
- Nav links: `px-4 py-3` (área de toque generosa)
- Accordion summary: `py-4` full-width

### Stacking Order (Mobile)
1. Hero (compressed: headline `text-4xl`, subhead `text-base`)
2. Sticky WhatsApp bar (após 50vh scroll)
3. Products (stack 1-col, cards full-width)
3. Diferenciais (stack, icons left-aligned)
4. Process (vertical steps, conectores left)
5. Social Proof (logos horizontal scroll, testimonials carousel)
6. B2B (table scroll horizontal, CTA sticky)
7. FAQ (accordion nativo)
8. Footer (4 cols → 2 cols → 1 col)

### Performance Budget
- **LCP < 2.5s**: Hero image otimizada (WebP/AVIF, `priority`, `sizes`), fonts `preload`, `font-display: swap`
- **CLS < 0.1**: Aspect-ratio em todas images, skeleton loaders
- **TBT < 200ms**: Zero JS no critical path, interação WhatsApp = link nativo
- **Total JS < 50KB gzipped**: Só FAQ accordion polyfill (nativo já funciona), lazy-load depoimentos

---

## 7. ANIMATION STRATEGY

### Principles
- **Orquestrado, não espalhado:** Uma animação de entrada (hero), uma de scroll (reveal), micro-interações em botões/cards
- **Reduced motion first:** `prefers-reduced-motion: reduce` → `animation: none`, `transition: none`, instant state changes
- **60fps only:** `transform` + `opacity` only, `will-change` nos elementos animados

### Choreography

| Trigger | Element | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| **Page load** | Hero headline | `slide-up-fade` (y: 30px → 0, opacity 0→1) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
|  | Hero subhead | `slide-up-fade` (delay 100ms) | 600ms | same |
|  | Hero CTA | `scale-in` (0.9→1, opacity) | 400ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
|  | Trust badges | `stagger-fade-in` (50ms cada) | 400ms | `ease-out` |
|  | Ice particles | `float-up` (continuous) | 20s | `linear` |
| **Scroll (IntersectionObserver)** | Section title | `slide-up-fade` | 500ms | `ease-out` |
|  | Product cards | `stagger-slide-up` (80ms cada) | 500ms | `ease-out` |
|  | Diferenciais cards | `stagger-scale-in` (60ms) | 400ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
|  | Process steps | `draw-line` (SVG stroke-dashoffset) | 800ms | `ease-out` |
|  | Testimonials | `fade-in` | 400ms | `ease-out` |
| **Hover/Focus** | Product card | `translateY(-4px)`, `shadow-ice-lg`, border `ice-500` | 200ms | `ease-out` |
|  | Product icon | `scale(1.05) rotate(3deg)` | 200ms | `ease-out` |
|  | WhatsApp CTA | `scale(1.02)`, `shadow-whatsapp` | 150ms | `ease-out` |
|  | Accordion summary | `bg-frost-100` | 150ms | `ease-out` |
| **Click** | WhatsApp CTA | `scale(0.98)` (active) | 100ms | `ease-in` |

### Ice Crystal Particles (Signature)
```css
@keyframes float-up {
  0% { transform: translateY(100vh) rotate(0deg) scale(0); opacity: 0; }
  10% { opacity: var(--particle-opacity, 0.06); }
  90% { opacity: var(--particle-opacity, 0.06); }
  100% { transform: translateY(-10vh) rotate(360deg) scale(1); opacity: 0; }
}

.ice-particle {
  position: fixed;
  pointer-events: none;
  z-index: 0;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306B6D4'><path d='M12 2L13.09 8.26L20 9.27L13.09 15.74L12 22L10.91 15.74L4 9.27L10.91 8.26L12 2Z'/></svg>") center/contain no-repeat;
  width: var(--particle-size, 8px);
  height: var(--particle-size, 8px);
  animation: float-up var(--particle-duration, 20s) linear infinite;
}
```

Generated via inline script (inline = no extra request) que injeta 30 `<div class="ice-particle">` com `--particle-size`, `--particle-duration`, `--particle-opacity`, `--particle-left` aleatórios (CSS custom properties).

---

## 8. CONTENT STRATEGY (Copy Guidelines)

### Voice
- **Direta, técnica, confiável** — fala como quem opera fábrica, não agência
- **Verbos ativos:** "Entregamos", "Produzimos", "Atendemos" — não "Oferecemos soluções"
- **Específica:** "2h na Grande SP" não "Entrega rápida"
- **Sem fluff:** Zero "excelência", "compromisso", "paixão"

### Headlines (Bebas Neue)
| Section | Headline |
|---------|----------|
| Hero | Gelo de qualidade superior direto da fábrica. |
| Products | Escolha o seu gelo. |
| Diferenciais | Por que bares e eventos escolhem a Best Gelo. |
| Process | Do pedido à entrega em 6 passos. |
| Social Proof | Quem confia. |
| B2B | Precisa de gelo toda semana? |
| FAQ | Dúvidas frequentes. |

### Microcopy
- **WhatsApp CTA:** "Pedir no WhatsApp" (não "Fale conosco", "Contate-nos")
- **Product card:** "Ver detalhes" + "Adicionar ao pedido"
- **Empty cart:** "Seu pedido está vazio. Escolha seu gelo acima."
- **Error:** "Não conseguimos processar. Tente pelo WhatsApp: (11) 99999-9999"

---

## 9. TECHNICAL IMPLEMENTATION NOTES

### Tailwind Config Extensions
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      ice: { 500: '#06B6D4', 600: '#0891B2', 100: '#CFFAFE', 900: '#164E63' },
      fire: { 500: '#EF4444', 600: '#DC2626' },
      frost: { 50: '#F8FAFC', 100: '#F1F5F9', 600: '#475569', 900: '#0F172A' },
    },
    fontFamily: {
      display: ['Bebas Neue', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
    },
    boxShadow: {
      ice: '0 4px 24px -4px rgb(6 182 212 / 0.15), 0 0 0 1px rgb(6 182 212 / 0.08)',
      'ice-lg': '0 12px 48px -8px rgb(6 182 212 / 0.2), 0 0 0 1px rgb(6 182 212 / 0.1)',
      frost: '0 2px 16px -2px rgb(15 23 42 / 0.08), 0 0 0 1px rgb(148 163 184 / 0.1)',
      'frost-lg': '0 20px 64px -12px rgb(15 23 42 / 0.12), 0 0 0 1px rgb(148 163 184 / 0.08)',
      whatsapp: '0 4px 24px -4px rgb(239 68 68 / 0.3), 0 0 0 1px rgb(239 68 68 / 0.1)',
    },
    animation: {
      'float-up': 'float-up 20s linear infinite',
      'slide-up-fade': 'slide-up-fade 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      'scale-in': 'scale-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      'stagger-fade': 'fade-in 400ms ease-out forwards',
    },
    keyframes: {
      'float-up': { '0%': { transform: 'translateY(100vh) rotate(0deg) scale(0)', opacity: '0' }, '10%': { opacity: 'var(--particle-opacity)' }, '90%': { opacity: 'var(--particle-opacity)' }, '100%': { transform: 'translateY(-10vh) rotate(360deg) scale(1)', opacity: '0' } },
      'slide-up-fade': { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      'scale-in': { '0%': { transform: 'scale(0.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
    },
  },
}
```

### Component Architecture
```
components/
├── ui/
│   ├── Button.tsx          # 3 variants: primary(fire), secondary(ice), ghost
│   ├── Card.tsx            # ProductCard, DifferentialCard, ProcessCard
│   ├── Badge.tsx           # Trust badges, price tags
│   ├── Accordion.tsx       # FAQ (wraps <details>)
│   └── WhatsAppCTA.tsx     # Reusable, deep-link generator
├── layout/
│   ├── Header.tsx          # Sticky, mobile menu, WhatsApp CTA
│   ├── Footer.tsx          # 4-col grid, certs, links
│   └── StickyWhatsApp.tsx  # Mobile-only bottom bar
├── sections/
│   ├── Hero.tsx            # Particles, thesis, trust badges
│   ├── ProductsGrid.tsx    # 4→2→1 responsive
│   ├── Differentials.tsx   # 3x2 grid
│   ├── ProcessTimeline.tsx # Horizontal→vertical
│   ├── SocialProof.tsx     # Logos + testimonial carousel
│   ├── B2BSection.tsx      # Dark bg, mono table, CTA
│   └── FAQ.tsx             # Native accordion
└── effects/
    └── IceParticles.tsx    # CSS-only particle system
```

### Accessibility Checklist
- [ ] Semantic HTML5 (`header`, `main`, `section`, `footer`, `nav`, `article`)
- [ ] Heading hierarchy (h1→h2→h3)
- [ ] Focus visible (`focus-visible:ring-2 focus-visible:ring-ice-500`)
- [ ] Skip link (`<a href="#main">Pular para conteúdo</a>`)
- [ ] ARIA labels em icon-only buttons
- [ ] `prefers-reduced-motion` desativa partículas + animações
- [ ] Contraste WCAG AA em todos os textos
- [ ] `<details>/<summary>` nativo para FAQ (funciona sem JS)
- [ ] `lang="pt-BR"` no `<html>`

---

## 10. CRITIQUE & REFINEMENT (Self-Review)

### What feels generic (and fixed):
| Original Default | Revised Choice | Why |
|------------------|----------------|-----|
| Cream bg + serif + terracotta | `frost-50` + **Bebas Neue** + cyan/red | Industrial ice factory ≠ artisanal bakery |
| Numbered markers everywhere | Only in Process (real sequence) | Structure = information |
| Floating particles everywhere | Only Hero + subtle hover births | Signature in one place |
| Gradient text headlines | Solid `frost-900` Bebas Neue | Legibility, authority |
| Card hover: lift + shadow only | Lift + border `ice-500` + icon rotate | Brand color reinforcement |

### Risks taken (justified):
1. **Bebas Neue as display** — Industrial, all-caps, distinctive. Risk: legibility at small sizes. Mitigation: só em headlines ≥24px, letter-spacing `-0.02em`, line-height tight.
2. **Vermelho (fire-500) como CTA único** — Quebra a paleta fria. Justificativa: WhatsApp é vermelho no imaginário brasileiro, ação = calor vs. produto = gelo. Contraste máximo.
3. **Uma seção escura (B2B)** — Quebra o rhythm light. Justificativa: Zona de conversão alta, destaque visual = mais cliques.
4. **Partículas CSS puras** — Pode parecer "efeito anos 2000". Mitigação: opacity 0.04-0.08, reduced-motion off, zero JS, performático.

### Quality Floor (non-negotiable):
- ✅ LCP < 2.5s (hero otimizado, fonts preload)
- ✅ CLS < 0.1 (aspect-ratio, skeletons)
- ✅ TBT < 200ms (zero JS crítico)
- ✅ WCAG AA contraste
- ✅ `prefers-reduced-motion` respeitado
- ✅ Focus visible em todos interativos
- ✅ Skip link
- ✅ Mobile touch targets 48px

---

## 11. NEXT STEPS

1. **Tokens → Tailwind config** (30 min)
2. **Component library** (Button, Card, Badge, Accordion, WhatsAppCTA) (2h)
3. **Layout components** (Header, Footer, StickyWhatsApp) (1.5h)
4. **Sections** (Hero, Products, Differentials, Process, SocialProof, B2B, FAQ) (4h)
5. **IceParticles effect** (45 min)
6. **Copywriting real** (substituir placeholders) (1h)
7. **QA: a11y, performance, cross-browser** (1.5h)
8. **Deploy Vercel + env vars** (30 min)

**Total estimado: ~12h dev** para MVP completo, testado, deployado.

---

*Documento vivo — revisar a cada iteração de design/code review.*