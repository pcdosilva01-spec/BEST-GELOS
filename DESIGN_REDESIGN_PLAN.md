# BEST GELO — Premium Redesign Plan
*Lead Product Designer + UX Conversion Specialist + Frontend Architect*

---

## 1. DESIGN TOKENS SYSTEM

### Color Palette (derived from logo analysis)

| Token | Hex | Usage | Psychology |
|-------|-----|-------|------------|
| `ice-900` | `#0A1F3A` | Primary dark, headers, footer bg | Deep trust, authority, night ice |
| `ice-700` | `#0E3A5F` | Primary medium, buttons, accents | Technology, reliability |
| `ice-500` | `#146EB4` | Primary brand, links, focus states | Ice blue, clarity, purity |
| `ice-300` | `#4DA8DA` | Hover states, secondary accents | Approachable, fresh |
| `ice-100` | `#E8F4FD` | Light backgrounds, cards | Clean, sterile, medical-grade |
| `ice-50` | `#F0F9FF` | Page backgrounds | Breathing room, purity |
| `fire-600` | `#D92D20` | **Primary CTA**, urgency actions | Action, heat, energy, ORDER NOW |
| `fire-500` | `#EF4444` | CTA hover, secondary accents | Urgency, conversion |
| `fire-100` | `#FEF2F2` | CTA backgrounds, badges | Subtle warmth |
| `neutral-900` | `#0F172A` | Body text, high contrast | Professional, serious |
| `neutral-700` | `#334155` | Secondary text, labels | Readable, not harsh |
| `neutral-500` | `#64748B` | Muted text, placeholders | Supporting info |
| `neutral-300` | `#CBD5E1` | Borders, dividers | Structure |
| `neutral-100` | `#F1F5F9` | Card backgrounds, alternates | Clean separation |
| `white` | `#FFFFFF` | Pure backgrounds, ice imagery | Purity, hygiene, quality |
| `success-500` | `#10B981` | Trust badges, checkmarks | Verified, safe |
| `warning-500` | `#F59E0B` | Alerts, limited stock | Attention |

### Typography System

| Role | Font | Weights | Scale |
|------|------|---------|-------|
| **Display** | **Anton** (Google Fonts) | 400 | Hero titles, section headlines, numbers |
| **Heading** | **Space Grotesk** (Google Fonts) | 400, 500, 600, 700 | Section titles, card titles, UI headings |
| **Body** | **Inter** (Google Fonts) | 300, 400, 500, 600 | All body copy, buttons, forms |
| **Mono** | **JetBrains Mono** | 400, 500 | CNPJ, phone, codes, technical data |

**Type Scale (fluid, clamp-based):**
- `--text-xs`: 0.75rem / 1rem
- `--text-sm`: 0.875rem / 1.25rem
- `--text-base`: 1rem / 1.5rem
- `--text-lg`: 1.125rem / 1.75rem
- `--text-xl`: 1.25rem / 1.75rem
- `--text-2xl`: 1.5rem / 2rem
- `--text-3xl`: 1.875rem / 2.25rem
- `--text-4xl`: 2.25rem / 2.5rem
- `--text-5xl`: 3rem / 3.5rem
- `--text-6xl`: 3.75rem / 4rem (hero, mobile)
- `--text-7xl`: 4.5rem / 5rem (hero, desktop)

### Spacing Scale (4px base)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

### Border Radius
- `radius-none`: 0
- `radius-sm`: 4px (buttons, inputs)
- `radius-md`: 8px (cards, small containers)
- `radius-lg`: 16px (feature cards, modals)
- `radius-xl`: 24px (hero cards, major sections)
- `radius-full`: 9999px (pills, badges)

### Shadows (Layered Ice Aesthetic)
- `shadow-ice`: `0 4px 24px -4px rgb(20 110 180 / 0.15), 0 0 0 1px rgb(20 110 180 / 0.05)` — frosted glass
- `shadow-ice-hover`: `0 12px 40px -8px rgb(20 110 180 / 0.25), 0 0 0 1px rgb(20 110 180 / 0.1)` — elevated
- `shadow-fire`: `0 4px 24px -4px rgb(217 45 32 / 0.3), 0 0 0 1px rgb(217 45 32 / 0.1)` — CTA glow
- `shadow-fire-hover`: `0 8px 32px -4px rgb(217 45 32 / 0.4)` — CTA pressed
- `shadow-inner`: `inset 0 2px 8px -2px rgb(15 23 42 / 0.08)` — input fields

### Transitions
- `transition-fast`: 150ms ease-out (hover, focus)
- `transition-base`: 250ms ease-out (cards, modals)
- `transition-slow`: 400ms ease-out (page transitions, complex reveals)

---

## 2. LAYOUT CONCEPT — ASCII WIREFRAMES

### Hero Section (The Thesis)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████  │  ← Sticky Header (logo + nav + WhatsApp CTA)
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐  ┌─────────────────────┐  │
│  │  Gelo de Alta Qualidade         │  │     ❄️  🐻‍❄️  ❄️     │  │
│  │  para Seu Negócio               │  │                     │  │
│  │                                 │  │   [Hero Visual]     │  │
│  │  Produção própria em Mauá/SP.   │  │   Ice crystals      │  │
│  │  Gelo cristalino, seguro e      │  │   Polar bear        │  │
│  │  entregue rapidamente para      │  │   Premium bags      │  │
│  │  restaurantes, eventos e        │  │   Frozen texture    │  │
│  │  empresas.                      │  │   Subtle animation  │  │
│  │                                 │  │                     │  │
│  │  ┌──────────────┐ ┌──────────┐  │  │  50+ ton/dia        │  │
│  │  │ FAZER PEDIDO │ │ WHATSAPP │  │  │  500+ clientes      │  │
│  │  │    AGORA     │ │          │  │  │  15 anos mercado    │  │
│  │  └──────────────┘ └──────────┘  │  │  Entrega rápida     │  │
│  │        🔴 PRIMARY        ⚪ SEC  │  └─────────────────────┘  │
│  └─────────────────────────────────┘                             │
│                                                                 │
│  [Trust Bar: Logos of 6-8 client types + "Certificado ANVISA"] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Products Grid (Conversion-Focused Cards)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  NOSSOS PRODUTOS    ████                                  │
│       Gelo premium para cada necessidade                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    ❄️           │  │    🧊           │  │    ✨           │ │
│  │  Gelo em Cubos  │  │ Gelo Triturado  │  │ Gelo Personaliz.│ │
│  │                 │  │                 │  │                 │ │
│  │  O gelo perfeito│  │ Ideal para      │  │ Sua marca em    │ │
│  │  para drinks    │  │ caipirinhas e   │  │ cada cubo.      │ │
│  │  sempre gelados.│  │ eventos.        │  │ Logos, iniciais,│ │
│  │                 │  │                 │  │ formatos únicos.│ │
│  │  R$ 8,00 / 5kg  │  │ R$ 10,00 / 5kg  │  │ Sob consulta    │ │
│  │                 │  │                 │  │                 │ │
│  │  [PEDIR AGORA]  │  │ [PEDIR AGORA]   │  │ [ORÇAMENTO]     │ │
│  │     🔴          │  │     🔴          │  │     🔴          │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │    🧊           │  │    ❄️           │                      │
│  │   Gelo Seco     │  │  Gelo em Escama │                      │
│  │                 │  │                 │                      │
│  │  -78°C para     │  │  Resfriamento   │                      │
│  │  conservação e  │  │  rápido, peixes,│                      │
│  │  efeitos especiais│ │  frutos do mar  │                      │
│  │                 │  │                 │                      │
│  │  R$ 15,00 / kg  │  │  R$ 12,00 / 5kg │                      │
│  │                 │  │                 │                      │
│  │  [PEDIR AGORA]  │  │ [PEDIR AGORA]   │                      │
│  └─────────────────┘  └─────────────────┘                      │
│                                                                 │
│                    [CTA: Ver todos os produtos →]              │
└─────────────────────────────────────────────────────────────────┘
```

### Why Choose Us / Differentials (Emotional Selling)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  POR QUE ESCOLHER A BEST GELO?  ████                      │
│       Não somos apenas gelo. Somos tranquilidade.               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────┐ │
│  │   💧        │  │   🏭        │  │   🚛        │  │   🛡️    │ │
│  │  PUREZA     │  │  PRÓPRIA    │  │  REFRIGERADA│  │ SEGURANÇA│ │
│  │  GARANTIDA  │  │  PRODUÇÃO   │  │  ENTREGA    │  │ ALIMENTAR│ │
│  │             │  │             │  │             │  │          │ │
│  │  Osmose     │  │  2.000m²    │  │  Frota      │  │  ANVISA, │ │
│  │  reversa +  │  │  em Mauá,   │  │  própria    │  │  ISO,    │ │
│  │  UV. Água   │  │  controle   │  │  0° a -5°C. │  │  rastre- │ │
│  │  nível      │  │  total da   │  │  Chega no   │  │  bilidade│ │
│  │  farmacêut. │  │  qualidade. │  │  ponto.     │  │  total.  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📊  COMPARAÇÃO: Fornecedor Comum vs. Best Gelo         │   │
│  ├──────────────────────────┬──────────────────────────────┤   │
│  │  ❌ Qualidade variável   │  ✓ Fábrica própria           │   │
│  │  ❌ Atrasos frequentes   │  ✓ Controle de qualidade     │   │
│  │  ❌ Sem rastreabilidade  │  ✓ Entrega rápida (2h)       │   │
│  │  ❌ Atendimento genérico │  ✓ Atendimento especializado │   │
│  │  ❌ Sem nota fiscal      │  ✓ NF-e automática           │   │
│  └──────────────────────────┴──────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Process Storytelling (Visual Journey)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  NOSSO PROCESSO: DA FONTE AO SEU COPO  ████              │
│       5 etapas. Zero compromisso com a qualidade.               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────┐│
│   │  1/5   │    │  2/5   │    │  3/5   │    │  4/5   │    │5/5 ││
│   │        │    │        │    │        │    │        │    │    ││
│   │  💧    │───▶│  🔬    │───▶│  ❄️     │───▶│  📦    │───▶│🚛  ││
│   │        │    │        │    │        │    │        │    │    ││
│   │ ÁGUA   │    │ PURIF- │    │ CONGELA│    │ EMBALA-│    │ENT-││
│   │ PURA   │    │ ICAÇÃO │    │ MENTO  │    │ GEM    │    │REGA││
│   │        │    │        │    │        │    │        │    │    ││
│   │ Poço   │    │ Osmose │    │ -25°C  │    │ Sacos  │    │Frota││
│   │ artes- │    │ reversa│    │ Lento  │    │ 5/10/  │    │própria││
│   │ iano   │    │ + UV   │    │ 48h    │    │ 20kg   │    │refrig.││
│   │ próprio│    │        │    │        │    │ Lacrados│   │      ││
│   └────────┘    └────────┘    └────────┘    └────────┘    └────┘│
│                                                                 │
│   [Scroll-triggered animation: ice crystals form between steps] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Social Proof / Testimonials
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  500+ EMPRESAS CONFIAM NA BEST GELO  ████                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  "Nunca mais tive problema com gelo. Entregam no       │   │
│  │  horário, o gelo dura o evento todo e a nota fiscal    │   │
│  │  chega antes do motorista sair da porta."              │   │
│  │                                                         │   │
│  │  — Carlos M., Gerente • Bar do Zé (São Bernardo) ⭐⭐⭐⭐⭐│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │  🍽️ RESTAUR. │ │  🎪 EVENTOS  │ │  🏪 MERCADOS │           │
│  │  200+        │ │  150+        │ │  80+         │           │
│  │  clientes    │ │  eventos/ano │ │  pontos      │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│  [Carousel: 6 testimonial cards with photos, company, result]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### B2B Section (Enterprise Focus)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  FORNECEDOR OFICIAL PARA EMPRESAS  ████                  │
│       Escala, confiabilidade e parceria de longo prazo.         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🎯  SEGMENTOS ATENDIDOS                                │   │
│  ├──────────┬──────────┬──────────┬──────────┬──────────┤   │
│  │ 🍽️ RESTAU│ 🍻 BARES  │ 🎪 EVENTOS│ 🏨 HOTÉIS │ 🏭 INDÚS.│   │
│  │ RANTES   │ & BALADAS │ & BUFFETS │ & REDES  │ TRIA     │   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │  📋 VANTAGENS B2B       │  │  🤝 COMO FUNCIONA           │  │
│  ├─────────────────────────┤  ├─────────────────────────────┤  │
│  │  ✓ Tabela de preços     │  │  1. Cadastro rápido (CNPJ)  │  │
│  │    progressiva por vol. │  │  2. Definição de rota/pedido│  │
│  │  ✓ Faturamento 15/30/45 │  │  3. Entrega programada      │  │
│  │    dias                 │  │  4. NF-e automática         │  │
│  │  ✓ Entrega programada   │  │  5. Faturamento mensal      │  │
│  │    (seg-sex, horários)  │  │  6. Suporte dedicado        │  │
│  │  ✓ Estoque reservado    │  │                             │  │
│  │    para alta temporada  │  │                             │  │
│  │  ✓ Relatórios de        │  │                             │  │
│  │    consumo mensais      │  │                             │  │
│  │  ✓ Gerente de conta     │  │                             │  │
│  │    dedicado             │  │                             │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
│                                                                 │
│                    [SOLICITAR ORÇAMENTO EMPRESARIAL] 🔴         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### FAQ (Objection Handling)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████  DÚVIDAS FREQUENTES  ████                                 │
│       Respostas diretas para você decidir rápido.               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ ❓ Vocês entregam rápido? ──────────────────────────────┐  │
│  │  Sim! Até 2h na Grande SP (ABC, Capital). Mauá: 30-60min. │  │
│  │  Agendamos no horário que você precisar.                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ Qual o pedido mínimo? ───────────────────────────────┐  │
│  │  Varejo: 1 saco (5kg). Atacado/Eventos: 50kg.             │  │
│  │  Gelo personalizado: 50kg mínimo.                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ Atendem empresas? Emitem nota fiscal? ───────────────┐  │
│  │  Sim! Somos fornecedores de 500+ empresas. NF-e automática │  │
│  │  no ato da entrega. Faturamento 15/30/45 dias para B2B.    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ Como funciona a entrega? ────────────────────────────┐  │
│  │  Veículo refrigerado (0° a -5°C). Motorista liga 15 min   │  │
│  │  antes. Entrega no local combinado. Pagamento na hora.     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ O gelo é próprio para consumo? ──────────────────────┐  │
│  │  100%! Água de poço artesiano próprio, osmose reversa,     │  │
│  │  UV, certificado ANVISA. Análise microbiológica mensal.    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ Posso retirar na fábrica? ───────────────────────────┐  │
│  │  Sim! Rua Bras Cubas, 624 - Vila Bocaina, Mauá/SP.        │  │
│  │  Desconto 5% no varejo. Avise 30 min antes pelo WhatsApp. │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ ❓ Alugam freezers/caixas para eventos? ────────────────┐  │
│  │  Sim! Freezers 300L/500L e caixas térmicas profissionais.  │  │
│  │  Inclui entrega, instalação e retirada. Consulte valores.  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Footer (Professional, Complete)
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🐻‍❄️ BEST GELO                                         │  │
│  │  Fábrica de gelo em Mauá/SP. Gelo de qualidade para      │  │
│  │  eventos, bares, restaurantes e consumidor final.        │  │
│  │  Entrega rápida e atendimento profissional.              │  │
│  │                                                          │  │
│  │  [WhatsApp] [Instagram] [Facebook] [Google Maps]         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │  EMPRESA   │ │  PRODUTOS  │ │  SUPORTE   │ │  CONTATO   │  │
│  ├────────────┤ ├────────────┤ ├────────────┤ ├────────────┤  │
│  │ Sobre Nós  │ │ Gelo Cubos │ │ Fale Conosco│ │ 📍 Rua     │  │
│  │ Produtos   │ │ Gelo Trit. │ │ Privacidade │ │   Bras     │  │
│  │ Entrega    │ │ Gelo Seco  │ │ Termos      │ │   Cubas,   │  │
│  │ FAQ        │ │ Personaliz.│ │ LGPD        │ │   624      │  │
│  │ Blog       │ │ Gelo Escama│ │             │ │ 📍 Vila    │  │
│  │            │ │            │ │             │ │   Bocaina  │  │
│  │            │ │            │ │             │ │ 📍 Mauá/SP │  │
│  │            │ │            │ │             │ │ 📮 09310-730│  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  © 2025 Best Gelo Comércio de Gelo LTDA • CNPJ: 17.812.251│  │
│  │  /0001-73 • IE: 123.456.789.112 • Rua Bras Cubas, 624    │  │
│  │  Vila Bocaina - Mauá/SP • Desenvolvido com 🔴 para o gelo │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. SIGNATURE ELEMENT: THE POLAR BEAR GUARDIAN

**The one thing visitors will remember.**

### Concept
A subtle, animated polar bear that "guards" the ice quality throughout the journey. Not a mascot — a **symbol of the standard**.

### Implementation
```
┌─ HERO ────────────────────────────────────────────────────────┐
│  Large polar bear silhouette (SVG) behind ice crystals        │
│  Breath animation: subtle frost puff every 4s                 │
│  Eyes follow cursor (subtle, 10px range)                      │
└────────────────────────────────────────────────────────────────┘

┌─ PROCESS SECTION ─────────────────────────────────────────────┐
│  Bear walks across the 5 steps on scroll                      │
│  Step 1: Bear drinks from pure water source                   │
│  Step 2: Bear inspects purification (nods approval)           │
│  Step 3: Bear watches freezing (steam from mouth)             │
│  Step 4: Bear checks packaging (sniffs bag)                   │
│  Step 5: Bear rides delivery truck (thumbs up paw)            │
└────────────────────────────────────────────────────────────────┘

┌─ SCROLL INDICATOR ────────────────────────────────────────────┐
│  Small bear icon in scroll progress bar                       │
│  "O urso garante: qualidade em cada etapa"                    │
└────────────────────────────────────────────────────────────────┘

┌─ MOBILE STICKY BAR ───────────────────────────────────────────┐
│  Bear paw print next to WhatsApp button                       │
│  "O urso aprova este pedido"                                  │
└────────────────────────────────────────────────────────────────┘
```

### Technical Specs
- **Format**: Animated SVG (Lottie) — 15KB gzipped
- **Triggers**: IntersectionObserver (scroll), mousemove (hero only)
- **Respects**: `prefers-reduced-motion` → static SVG
- **Performance**: Lazy-loaded, off-main-thread via Web Worker

### Why This Works
1. **Embodies the brand promise**: "Strong as a polar bear, pure as ice"
2. **Progressive disclosure**: Reveals personality as user engages
3. **Conversion anchor**: Appears near every major CTA
4. **Differentiation**: No competitor has a "quality guardian"
5. **Shareable**: "Did you see the bear?" → word of mouth

---

## 4. CONVERSION STRATEGY

### CTA Hierarchy (Visual Weight)

| Level | Style | Locations | Copy |
|-------|-------|-----------|------|
| **Primary** | `fire-600` bg, white text, `shadow-fire`, 56px h | Hero, Product cards, B2B, Sticky bar | "FAZER PEDIDO AGORA" |
| **Secondary** | `ice-500` border, `ice-500` text, transparent bg | Hero, Footer, Exit intent | "FALAR NO WHATSAPP" |
| **Tertiary** | Text link, `ice-600`, underline on hover | Cards, FAQ, Process | "Ver detalhes", "Solicitar orçamento" |

### WhatsApp Integration Strategy

```
┌─ DESKTOP ──────────────────────────────────────────────────────┐
│  Header: WhatsApp icon + "Pedir" (secondary style)             │
│  Hero: Primary "FAZER PEDIDO" → opens WhatsApp with template   │
│  Products: Each card → pre-filled message with product name    │
│  Sticky CTA (scroll 50%): "Precisa de gelo? WhatsApp" 🔴       │
│  Exit intent (mouse leave top): Modal with WhatsApp + 10% off  │
└────────────────────────────────────────────────────────────────┘

┌─ MOBILE ───────────────────────────────────────────────────────┐
│  Fixed bottom bar (always):                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🐾 Precisa de gelo agora?    [PEDIR NO WHATSAPP 🔴]      │  │
│  └──────────────────────────────────────────────────────────┘  │
│  • Safe-area inset bottom                                       │
│  • Hide on FAQ/footer (user reading)                            │
│  • Show on scroll up                                            │
│  • Pre-filled: "Olá, gostaria de pedir gelo da Best Gelo."     │
└────────────────────────────────────────────────────────────────┘
```

### Trust Signals (Conversion Anchors)
1. **Hero**: "50+ ton/dia • 500+ clientes • 15 anos • Certificado ANVISA"
2. **Products**: "Entrega em 2h • Pagamento na entrega • NF-e automática"
3. **Differentials**: Comparison table (Us vs. Them)
4. **Process**: "Análise microbiológica mensal • Rastreabilidade total"
5. **Testimonials**: Photos + company names + specific results
6. **B2B**: "Faturamento 30 dias • Gerente dedicado • Estoque reservado"
7. **FAQ**: Direct answers to top 7 objections
8. **Footer**: CNPJ, IE, Address, Google Maps embed

### Micro-Conversions Tracked
- WhatsApp click (product-specific)
- Scroll depth (25%, 50%, 75%, 100%)
- Process section interaction (step hover)
- Testimonial carousel navigation
- B2B form start (even if abandoned)
- Footer contact clicks (phone, email, map)

---

## 5. MOBILE-FIRST SPECIFICATIONS

### Breakpoints
- `mobile`: 320px - 639px
- `tablet`: 640px - 1023px
- `desktop`: 1024px - 1439px
- `wide`: 1440px+

### Touch Targets
- Minimum 48×48px (WCAG AAA)
- Recommended 56×56px for primary CTAs
- 8px gap between adjacent targets

### Mobile-Specific Patterns

**Navigation**
```
┌─ HEADER (56px fixed) ────────────────────────────────────────┐
│  ☰  BEST GELO                    📞 WhatsApp                 │
└──────────────────────────────────────────────────────────────┘

┌─ MOBILE MENU (slide from left) ──────────────────────────────┐
│  ✕  Fechar                                                   │
│                                                              │
│  🏠 Início                                                   │
│  ❄️ Produtos                                                 │
│  ⭐ Diferenciais                                             │
│  🏭 Processo                                                 │
│  💬 Depoimentos                                              │
│  🏢 Para Empresas                                            │
│  ❓ FAQ                                                      │
│  📞 Contato                                                  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │        [PEDIR PELO WHATSAPP - FULL WIDTH] 🔴           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**Product Cards (Stacked)**
```
┌─ PRODUCT CARD (full width) ──────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    [HERO IMAGE 16:9]                   │  │
│  └────────────────────────────────────────────────────────┘  │
│  Gelo em Cubos                                    R$ 8,00/5kg │
│  O gelo perfeito para bebidas sempre geladas.                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              [PEDIR AGORA - FULL WIDTH] 🔴              │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              [FALAR NO WHATSAPP] ⚪                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**Forms (Thumb-Friendly)**
- Single column
- Labels above inputs
- 56px input height
- Native date/time pickers
- Auto-focus next field
- WhatsApp fallback always visible

---

## 6. ANIMATION STRATEGY

### Principles
- **Purposeful**: Every animation communicates state or guides attention
- **Subtle**: 150-300ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- **Respectful**: `prefers-reduced-motion` → instant, no parallax
- **Performant**: Transform/opacity only, `will-change` managed

### Animation Inventory

| Component | Trigger | Animation | Duration |
|-----------|---------|-----------|----------|
| Hero ice crystals | Load | Fade + float up + slight rotation | 800ms stagger |
| Polar bear breath | Loop (4s) | Scale 1→1.02→1, opacity pulse | 2000ms |
| Hero stats counter | Intersection | Count up (50→500, 15→500) | 1200ms |
| Product cards | Scroll into view | Slide up 20px + fade | 300ms stagger |
| Process steps | Scroll progress | Line draws, bear walks | Continuous |
| Comparison table | Hover row | Background highlight + check pop | 150ms |
| Testimonial cards | Carousel swipe | Slide + scale center card | 400ms |
| FAQ accordion | Click | Height auto + chevron rotate | 250ms |
| CTA buttons | Hover | Scale 1.02 + shadow grow | 150ms |
| CTA buttons | Press | Scale 0.98 + shadow shrink | 100ms |
| WhatsApp sticky | Scroll 50% | Slide up from bottom | 300ms |
| WhatsApp sticky | Scroll to footer | Slide down + hide | 300ms |
| Page transitions | Navigation | Fade 150ms (SPA feel) | 150ms |

### Ice Crystal Particle System (Signature)
```
Canvas overlay on hero (desktop only)
- 30-50 particles
- Hexagonal ice crystal shapes (SVG)
- Float up with slight horizontal drift
- Fade out at top, respawn at bottom
- Opacity 0.15-0.3
- Pointer-events: none
- Paused when tab hidden
- Reduced motion: static decorative crystals only
```

### Scroll Progress Indicator
```
Top of page (fixed, 3px height):
┌─────────────────────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                          🐻‍❄️                                │
└─────────────────────────────────────────────────────────────┘
Bear moves along progress bar, changes pose at section boundaries
```

---

## 7. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1)
- [ ] Design tokens (CSS custom properties)
- [ ] Typography system (Anton, Space Grotesk, Inter, JetBrains Mono)
- [ ] Base components: Button, Card, Input, Badge, Icon
- [ ] Layout primitives: Container, Grid, Stack, Section
- [ ] Polar bear Lottie animation integration

### Phase 2: Hero & Core Sections (Week 1-2)
- [ ] Hero with ice crystals + bear + stats counter
- [ ] Product grid with premium cards
- [ ] Differentials + comparison table
- [ ] Process storytelling with scroll animation

### Phase 3: Trust & Conversion (Week 2)
- [ ] Testimonials carousel
- [ ] B2B section with lead form
- [ ] FAQ accordion
- [ ] Footer with schema markup

### Phase 4: Polish & Performance (Week 2-3)
- [ ] Mobile sticky WhatsApp bar
- [ ] Exit intent modal
- [ ] Scroll progress + bear
- [ ] Analytics events (GA4 + custom)
- [ ] Lighthouse > 90 all categories
- [ ] Cross-browser testing

### Phase 5: Launch & Iterate (Week 3+)
- [ ] A/B test: Hero headline variations
- [ ] A/B test: Primary CTA copy ("FAZER PEDIDO" vs "PEDIR GELO AGORA")
- [ ] Heatmap analysis (Hotjar/Clarity)
- [ ] Conversion funnel optimization

---

## 8. TECHNICAL SPECIFICATIONS

### Stack
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Animations**: Framer Motion + Lottie React
- **Icons**: Lucide React (consistent, tree-shakable)
- **Forms**: React Hook Form + Zod
- **Analytics**: GA4 + custom events
- **Deployment**: Vercel (Edge + ISR)

### Performance Budgets
- **LCP**: < 2.0s (hero image prioritized, preload)
- **CLS**: < 0.05 (explicit dimensions, font display swap)
- **FID/INP**: < 100ms (minimal main thread work)
- **Bundle**: < 100KB JS gzipped (code splitting)
- **Images**: WebP/AVIF, responsive, lazy-loaded

### Accessibility (WCAG 2.1 AA)
- Semantic HTML5 landmarks
- Focus visible outlines (2px `fire-500` offset 2px)
- Color contrast: 4.5:1 minimum (7:1 for large text)
- ARIA labels on icon-only buttons
- Skip to main content link
- Reduced motion respected
- Screen reader tested (NVDA, VoiceOver)

### SEO & Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Best Gelo Comércio de Gelo LTDA",
  "image": "https://bestgelo.com.br/og-image.jpg",
  "telephone": "+5511999999999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Bras Cubas, 624",
    "addressLocality": "Mauá",
    "addressRegion": "SP",
    "postalCode": "09310-730",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.681234,
    "longitude": -46.461234
  },
  "openingHoursSpecification": [
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "07:00", "closes": "20:00"},
    {"@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "08:00", "closes": "14:00"}
  ],
  "priceRange": "R$ 8-15/kg",
  "currenciesAccepted": "BRL",
  "paymentAccepted": "Cash, Credit Card, Debit Card, PIX, Boleto",
  "areaServed": ["Mauá", "Santo André", "São Bernardo do Campo", "São Caetano do Sul", "Diadema", "São Paulo"]
}
```

---

## 9. COPY STRATEGY (Key Messages)

### Headlines
- **Hero**: "Gelo de Alta Qualidade para Seu Negócio"
- **Products**: "O Gelo Certo para Cada Ocasião"
- **Differentials**: "Por Que 500+ Empresas Escolhem a Best Gelo"
- **Process**: "Da Fonte ao Seu Copo: 5 Etapas, Zero Compromisso"
- **B2B**: "Fornecedor Oficial para Empresas que Exigem Qualidade"
- **FAQ**: "Dúvidas? Respostas Diretas para Você Decidir Rápido"

### CTAs (Action-Oriented)
- Primary: "FAZER PEDIDO AGORA"
- Secondary: "FALAR NO WHATSAPP"
- B2B: "SOLICITAR ORÇAMENTO EMPRESARIAL"
- Products: "PEDIR ESTE PRODUTO"
- Footer: "PEDIR PELO WHATSAPP"

### Trust Phrases (Sprinkled Throughout)
- "Produção própria em Mauá/SP"
- "Água purificada por osmose reversa + UV"
- "Certificado ANVISA e Vigilância Sanitária"
- "Entrega refrigerada (0° a -5°C)"
- "Nota fiscal eletrônica automática"
- "500+ clientes ativos"
- "15 anos de mercado"

---

## 10. SUCCESS METRICS

| Metric | Current (est.) | Target (90 days) |
|--------|----------------|------------------|
| WhatsApp conversions/month | ~50 | 200+ |
| Mobile conversion rate | ~1.2% | 3.5% |
| Desktop conversion rate | ~2.1% | 4.5% |
| Avg. order value (B2C) | R$ 45 | R$ 65 |
| B2B leads/month | ~5 | 25+ |
| Page load (LCP) | ~3.2s | < 2.0s |
| Bounce rate | ~65% | < 45% |
| Time on page | ~45s | > 2:30 |

---

*This plan transforms Best Gelo from a local ice supplier into the **premium digital reference** for quality ice in Greater São Paulo. Every pixel serves conversion. The polar bear guardian becomes the unforgettable symbol of "quality you can trust."*