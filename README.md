# Best Gelo - Sistema Completo de Gestão de Pedidos de Gelo

Sistema completo de e-commerce e gestão de pedidos para a **Best Gelo Comércio de Gelo LTDA**, empresa de comércio varejista de gelo em Mauá - SP.

## 🏢 Sobre a Empresa

**Best Gelo Comércio de Gelo LTDA**
- **CNPJ:** 46.613.186/0001-86
- **Endereço:** Rua Bras Cubas, 624 - Vila Bocaina, Mauá - SP, 09310-730
- **Sócios:** Marcelo Honorio da Silva, Marlisia Aparecida Rodrigues
- **Atividade Principal:** Comércio varejista de produtos alimentícios em geral (gelo)
- **Atividades Secundárias:** Comércio varejista de bebidas e outros produtos

## 🏗️ Arquitetura do Sistema

```
best-gelo/
├── frontend/          # Next.js 15+ Frontend
│   ├── src/
│   │   ├── app/           # App Router (Next.js 15)
│   │   ├── components/    # Componentes React reutilizáveis
│   │   ├── lib/           # Utilitários, hooks, configurações
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # Tipos TypeScript
│   │   ├── styles/        # Estilos globais, Tailwind config
│   │   └── components/ui  # shadcn/ui components
│   ├── public/            # Assets estáticos
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/           # NestJS Backend API
│   ├── src/
│   │   ├── modules/       # Módulos do NestJS
│   │   │   ├── auth/          # Autenticação (JWT, NextAuth)
│   │   │   ├── users/         # Usuários e clientes
│   │   │   ├── products/      # Produtos (gelo)
│   │   │   ├── orders         # Pedidos
│   │   │   ├── customers      # Clientes
│   │   │   ├── admin          # Dashboard admin
│   │   │   └── integrations   # WhatsApp, Maps, etc.
│   │   ├── common/        # Decorators, guards, pipes, filters
│   │   ├── config/        # Configurações
│   │   └── main.ts        # Entry point
│   ├── prisma/            # Schema do Prisma
│   ├── package.json
│   └── tsconfig.json
│
├── database/            # Scripts e migrações do banco
│   ├── migrations/
│   └── seeds/
│
├── prisma/              # Schema Prisma compartilhado
│   └── schema.prisma
│
├── public/              # Assets públicos compartilhados
│
├── docs/                # Documentação
│   ├── architecture.md
│   ├── api-docs.md
│   ├── deployment.md
│   └── development.md
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🛠️ Stack Tecnológica

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Linguagem:** TypeScript 5+
- **Styling:** Tailwind CSS 3.4+ + shadcn/ui
- **Animações:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Estado:** React Query / SWR + Zustand
- **Auth:** NextAuth.js v5
- **UI Components:** shadcn/ui + Radix UI
- **Ícones:** Lucide React
- **Charts:** Recharts / Recharts
- **Forms:** React Hook Form + Zod
- **Validação:** Zod
- **Notificações:** Sonner / React Hot Toast

### Backend
- **Framework:** NestJS 10+ (ou Next.js API Routes)
- **Linguagem:** TypeScript 5+
- **ORM:** Prisma ORM 5+
- **Banco:** PostgreSQL 15+
- **Auth:** JWT + Passport / NextAuth
- **Validação:** class-validator + class-transformer
- **Documentação:** Swagger/OpenAPI
- **Logs:** Pino / Winston
- **Cache:** Redis (opcional)
- **Queue:** BullMQ (opcional - para emails/WhatsApp)

### Banco de Dados
- **PostgreSQL 15+** (produção)
- **Prisma ORM** para migrations e queries
- **Prisma Studio** para admin visual

### DevOps & Deploy
- **Container:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Deploy:** Vercel (Frontend) + Railway/Render/Railway (Backend + DB)
- **Monitoramento:** Sentry + Vercel Analytics
- **Logs:** Pino Pretty / Datadog

## 🗄️ Schema do Banco de Dados (Prisma)

```prisma
// Models principais definidos em prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String    // bcrypt hash
  phone         String?
  userType      UserType  @default(CUSTOMER)
  isActive      Boolean   @default(true)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  orders        Order[]
  addresses     Address[]
  
  @@map("users")
}

model Customer {
  id        String   @id @default(cuid())
  name      String
  phone     String   @unique
  email     String?  @unique
  cpfCnpj   String?  @unique
  notes     String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
  addresses Address[]
  
  @@map("customers")
}

model Address {
  id          String   @id @default(cuid())
  customerId  String
  customer    Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  street      String
  number      String
  complement  String?
  neighborhood String
  city        String
  state       String
  zipCode     String
  isDefault   Boolean  @default(false)
  label       String?  // "Casa", "Trabalho", "Evento"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("addresses")
}

model Product {
  id          String       @id @default(cuid())
  name        String
  slug        String       @unique
  description String?
  category    ProductCategory
  weight      Decimal      @db.Decimal(10, 3) // em kg
  price       Decimal      @db.Decimal(10, 2)
  imageUrl    String?
  stock       Int          @default(0)
  minStock    Int          @default(0)
  isActive    Boolean      @default(true)
  isFeatured  Boolean      @default(false)
  sortOrder   Int          @default(0)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  orderItems  OrderItem[]
  
  @@map("products")
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique @default(cuid())
  customerId      String
  customer        Customer    @relation(fields: [customerId], references: [id])
  userId          String?
  user            User?       @relation(fields: [userId], references: [id])
  status          OrderStatus @default(PENDING)
  subtotal        Decimal     @db.Decimal(10, 2)
  deliveryFee     Decimal     @db.Decimal(10, 2) @default(0)
  discount        Decimal     @db.Decimal(10, 2) @default(0)
  total           Decimal     @db.Decimal(10, 2)
  paymentMethod   PaymentMethod?
  paymentStatus   PaymentStatus @default(PENDING)
  deliveryAddress Json?       // JSON com endereço completo
  deliveryDate    DateTime?
  deliveryTime    String?     // "08:00-12:00" ou "14:00-18:00"
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  items           OrderItem[]
  statusHistory   OrderStatusHistory[]
  
  @@map("orders")
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Decimal  @db.Decimal(10, 2)
  total     Decimal  @db.Decimal(10, 2)
  
  @@map("order_items")
}

model OrderStatusHistory {
  id        String      @id @default(cuid())
  orderId   String
  order     Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  status    OrderStatus
  notes     String?
  createdAt DateTime    @default(now())
  createdBy String?
  
  @@map("order_status_history")
}

model AdminUser {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  password      String   // bcrypt hash
  role          AdminRole @default(ADMIN)
  isActive      Boolean  @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@map("admin_users")
}

enum UserType {
  CUSTOMER
  ADMIN
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  MANAGER
  OPERATOR
}

enum ProductCategory {
  CUBES       // Gelo em Cubos
  CRUSHED     // Gelo Triturado
  SPECIAL     // Gelo Especial/Personalizado
  BAGGED      // Gelo Ensacado
  BULK        // Gelo a Granel
}

enum OrderStatus {
  PENDING       // Recebido
  CONFIRMED     // Confirmado
  IN_PRODUCTION // Em Produção
  READY         // Pronto para Entrega
  OUT_FOR_DELIVERY // Saiu para Entrega
  DELIVERED     // Entregue
  CANCELLED     // Cancelado
}

enum PaymentMethod {
  PIX
  CREDIT_CARD
  DEBIT_CARD
  CASH
  BANK_TRANSFER
  ON_DELIVERY
}

enum PaymentStatus {
  PENDING
  PAID
  PARTIAL
  REFUNDED
  FAILED
}
```

## 🎨 Design System & Branding

### Identidade Visual - Best Gelo

**Conceito:** Gelo, Pureza, Frescor, Qualidade, Confiança, Rapidez

#### Paleta de Cores
```css
:root {
  /* Cores Primárias - Tons de Gelo */
  --ice-50:  #f0f9ff;   /* Azul gelo mais claro */
  --ice-100: #e0f2fe;   /* Azul gelo claro */
  --ice-200: #bae6fd;   /* Azul gelo médio-claro */
  --ice-300: #7dd3fc;   /* Azul gelo médio */
  --ice-400: #38bdf8;   /* Azul gelo vibrante */
  --ice-500: #0ea5e9;   /* Azul gelo principal */
  --ice-600: #0284c7;   /* Azul gelo médio-escuro */
  --ice-700: #0369a1;   /* Azul gelo escuro */
  --ice-800: #075985;   /* Azul gelo mais escuro */
  --ice-900: #0c4a6e;   /* Azul gelo mais escuro */
  --ice-950: #082f49;   /* Azul gelo quase preto */

  /* Cores de Apoio */
  --pure-white: #ffffff;
  --frost-50:  #f8fafc;   /* Branco gelo */
  --frost-100: #f1f5f9;   /* Cinza gelo claro */
  --frost-200: #e2e8f0;   /* Cinza gelo */
  --frost-300: #cbd5e1;   /* Cinza gelo médio */
  --frost-400: #94a3b8;   /* Cinza gelo médio-escuro */
  --frost-500: #64748b;   /* Cinza gelo médio */
  --frost-600: #475569;   /* Cinza gelo escuro */
  --frost-700: #334155;   /* Cinza gelo mais escuro */
  --frost-800: #1e293b;   /* Cinza gelo quase preto */
  --frost-900: #0f172a;   /* Quase preto */

  /* Acentos */
  --accent-teal: #0d9488;    /* Verde água/gelo */
  --accent-emerald: #059669; /* Verde esmeralda */
  --accent-amber:  #d97706;  /* Âmbar para destaque */
  --accent-rose:   #e11d48;  /* Rosa para alertas */

  /* Semânticas */
  --success: #059669;
  --warning: #d97706;
  --error:   #dc2626;
  --info:    #0284c7;
}
```

#### Tipografia
```css
/* Fontes */
--font-display: 'Space Grotesk', 'Inter', sans-serif;  /* Display/Headlines - tecnológica, geométrica */
--font-body:    'Inter', 'DM Sans', sans-serif;        /* Body text - legível, moderna */
--font-mono:    'JetBrains Mono', 'Fira Code', monospace; /* Código/dados */

/* Escala Tipográfica */
--text-xs:     0.75rem;   /* 12px */
--text-sm:     0.875rem;  /* 14px */
--text-base:   1rem;      /* 16px */
--text-lg:     1.125rem;  /* 18px */
--text-xl:     1.25rem;   /* 20px */
--text-2xl:    1.5rem;    /* 24px */
--text-3xl:    1.875rem;  /* 30px */
--text-4xl:    2.25rem;   /* 36px */
--text-5xl:    3rem;      /* 48px */
--text-6xl:    3.75rem;   /* 60px */
--text-7xl:    4.5rem;    /* 72px */

/* Pesos */
--font-light:    300;
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-extrabold: 800;
```

#### Espaçamento & Layout
```css
/* Espaçamento base: 4px */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */

/* Container */
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1536px;
```

#### Border Radius
```css
--radius-none: 0;
--radius-sm:   0.125rem;  /* 2px */
--radius-md:   0.375rem;  /* 6px */
--radius-lg:   0.5rem;    /* 8px */
--radius-xl:   0.75rem;   /* 12px */
--radius-2xl:  1rem;      /* 16px */
--radius-3xl:  1.5rem;    /* 24px */
--radius-full: 9999px;
```

#### Sombras (Glassmorphism/Frosted Glass)
```css
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
--glass-blur: blur(20px);
```

#### Animações & Transições
```css
/* Durações */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;

/* Easings */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 📱 Páginas do Frontend

### Públicas
| Rota | Descrição |
|------|-----------|
| `/` | Homepage premium com hero, produtos, diferenciais, depoimentos |
| `/produtos` | Catálogo de produtos com filtros |
| `/produtos/[slug]` | Detalhe do produto com carrinho |
| `/pedido/novo` | Fluxo de pedido (multi-step) |
| `/pedido/[id]/sucesso` | Confirmação de pedido |
| `/contato` | Página de contato com mapa |
| `/sobre` | Sobre a empresa |
| `/entrega` | Área de entrega e prazos |
| `/faq` | Perguntas frequentes |
| `/login` | Login cliente |
| `/cadastro` | Cadastro cliente |
| `/minha-conta` | Área do cliente |
| `/meus-pedidos` | Histórico de pedidos |

### Admin (Protegido)
| Rota | Descrição |
|------|-----------|
| `/admin/login` | Login administrativo |
| `/admin` | Dashboard principal |
| `/admin/pedidos` | Gestão de pedidos |
| `/admin/pedidos/[id]` | Detalhe do pedido |
| `/admin/produtos` | CRUD produtos |
| `/admin/produtos/novo` | Novo produto |
| `/admin/produtos/[id]/editar` | Editar produto |
| `/admin/clientes` | Lista de clientes |
| `/admin/clientes/[id]` | Detalhe cliente |
| `/admin/usuarios` | Gestão de usuários admin |
| `/admin/configuracoes` | Configurações gerais |
| `/admin/relatorios` | Relatórios e analytics |

## 🔌 API Endpoints (Backend)

### Auth
```
POST   /api/auth/login           # Login cliente
POST   /api/auth/register        # Cadastro cliente
POST   /api/auth/refresh         # Refresh token
POST   /api/auth/forgot-password # Esqueci senha
POST   /api/auth/reset-password  # Reset senha
GET    /api/auth/me              # Perfil logado
POST   /api/auth/logout          # Logout
```

### Admin Auth
```
POST   /api/admin/auth/login     # Login admin
POST   /api/admin/auth/refresh   # Refresh token admin
GET    /api/admin/auth/me        # Perfil admin
```

### Products (Público)
```
GET    /api/products             # Listar produtos (filtros, paginação)
GET    /api/products/featured    # Produtos em destaque
GET    /api/products/categories  # Categorias
GET    /api/products/:slug       # Detalhe por slug
GET    /api/products/:id         # Detalhe por ID
```

### Products (Admin)
```
POST   /api/admin/products       # Criar produto
GET    /api/admin/products       # Listar (admin - com estoque, inativos)
GET    /api/admin/products/:id   # Detalhe admin
PATCH  /api/admin/products/:id   # Atualizar
DELETE /api/admin/products/:id   # Deletar (soft delete)
PATCH  /api/admin/products/:id/stock  # Atualizar estoque
PATCH  /api/admin/products/reorder  # Reordenar
```

### Orders (Cliente)
```
POST   /api/orders               # Criar pedido
GET    /api/orders               # Meus pedidos
GET    /api/orders/:id           # Detalhe pedido
POST   /api/orders/:id/cancel    # Cancelar pedido
POST   /api/orders/:id/whatsapp # Enviar WhatsApp
```

### Orders (Admin)
```
GET    /api/admin/orders         # Listar todos (filtros, paginação)
GET    /api/admin/orders/stats   # Estatísticas dashboard
GET    /api/admin/orders/:id     # Detalhe completo
PATCH  /api/admin/orders/:id     # Atualizar (status, notas, etc)
PATCH  /api/admin/orders/:id/status  # Atualizar apenas status
POST   /api/admin/orders/:id/status-history # Add histórico
GET    /api/admin/orders/export  # Exportar CSV/Excel
```

### Customers (Admin)
```
GET    /api/admin/customers      # Listar clientes
GET    /api/admin/customers/:id  # Detalhe + histórico
PATCH  /api/admin/customers/:id  # Atualizar
GET    /api/admin/customers/:id/orders # Pedidos do cliente
```

### Admin Dashboard
```
GET    /api/admin/dashboard/stats     # Stats cards
GET    /api/admin/dashboard/charts    # Dados gráficos
GET    /api/admin/dashboard/recent    # Pedidos recentes
GET    /api/admin/dashboard/alerts    # Alertas (estoque baixo, etc)
```

### Integrations
```
POST   /api/integrations/whatsapp/send     # Enviar WhatsApp
POST   /api/integrations/whatsapp/webhook  # Webhook WhatsApp
GET    /api/integrations/maps/place        # Buscar endereço (Google Maps)
POST   /api/integrations/maps/distance     # Calcular distância/frete
```

## 🔐 Segurança

### Autenticação
- **JWT** com access token (15min) + refresh token (7 dias)
- **NextAuth.js** no frontend para sessão
- **bcrypt** (cost 12) para hash de senhas
- **Rate limiting:** 10 req/min login, 100 req/min API

### Validação
- **Zod** schemas no frontend + backend
- **class-validator** no backend (NestJS)
- Sanitização de inputs (XSS prevention)

### Proteções
- **Helmet** (headers de segurança)
- **CORS** configurado
- **CSRF** protection (NextAuth)
- **Rate limiting** (Throttler no NestJS)
- **SQL Injection** prevention (Prisma)
- **XSS** prevention (React auto-escape + DOMPurify se necessário)

### Variáveis de Ambiente
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/bestgelo?schema=public"

# Auth
JWT_SECRET="super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="super-secret-refresh-key-min-32-chars"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

NEXTAUTH_SECRET="nextauth-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Best Gelo"

# WhatsApp Business API
WHATSAPP_TOKEN="whatsapp-business-api-token"
WHATSAPP_PHONE_NUMBER_ID="phone-number-id"
WHATSAPP_VERIFY_TOKEN="verify-token"
WHATSAPP_BUSINESS_NUMBER="5511999999999"

# Google Maps
GOOGLE_MAPS_API_KEY="google-maps-api-key"

# Email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="email@gmail.com"
SMTP_PASS="app-password"
EMAIL_FROM="Best Gelo <noreply@bestgelo.com.br>"

# Redis (opcional - cache/queue)
REDIS_URL="redis://localhost:6379"

# Sentry (opcional)
SENTRY_DSN="https://xxx@sentry.io/xxx"

# App
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## 🐳 Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: bestgelo-postgres
    environment:
      POSTGRES_DB: bestgelo
      POSTGRES_USER: bestgelo
      POSTGRES_PASSWORD: ${DB_PASSWORD:-bestgelo123}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bestgelo -d bestgelo"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: bestgelo-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: bestgelo-backend
    environment:
      - DATABASE_URL=postgresql://bestgelo:bestgelo123@postgres:5432/bestgelo?schema=public
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=development
      - PORT=3001
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: bestgelo-frontend
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
      - NODE_ENV=development
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: bestgelo-network
```

## 🚀 Comandos de Desenvolvimento

```bash
# Iniciar tudo com Docker
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar tudo
docker-compose down

# Rebuild
docker-compose up -d --build

# Acessar banco
docker-compose exec postgres psql -U bestgelo -d bestgelo

# Prisma Studio
cd backend && npx prisma studio

# Migrations
cd backend && npx prisma migrate dev

# Seed database
cd backend && npx prisma db seed

# Frontend dev (sem Docker)
cd frontend && npm run dev

# Backend dev (sem Docker)
cd backend && npm run start:dev
```

## 📦 Estrutura de Pacotes (Monorepo opcional)

Se preferir monorepo com Turborepo:

```
best-gelo/
├── apps/
│   ├── frontend/     # Next.js
│   └── backend/      # NestJS
├── packages/
│   ├── ui/           # Componentes compartilhados
│   ├── config/       # Configurações compartilhadas (ESLint, TSConfig)
│   ├── types/        # Tipos TypeScript compartilhados
│   ├── prisma/       # Schema Prisma compartilhado
│   └── utils/        # Utilitários compartilhados
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

## 📋 Checklist de Implementação

### Fase 1: Fundação
- [ ] Estrutura de pastas completa
- [ ] Docker Compose funcionando
- [ ] PostgreSQL + Prisma configurado
- [ ] Schema Prisma completo
- [ ] Migrations iniciais
- [ ] Seed com dados de exemplo
- [ ] NextAuth configurado
- [ ] JWT strategy no backend

### Fase 2: Backend Core
- [ ] Módulo Auth (login, register, JWT, refresh)
- [ ] Módulo Users/Clients
- [ ] Módulo Products (CRUD completo)
- [ ] Módulo Orders (CRUD + status machine)
- [ ] Módulo Admin Users
- [ ] Validação Zod + class-validator
- [ ] Error handling global
- [ ] Swagger/OpenAPI docs
- [ ] Testes unitários básicos

### Fase 3: Frontend Core
- [ ] Next.js 15 + App Router setup
- [ ] Tailwind + shadcn/ui configurado
- [ ] Design system (cores, tipografia, componentes base)
- [ ] Layout principal (Header, Footer, Sidebar admin)
- [ ] Autenticação frontend (NextAuth)
- [ ] React Query / SWR configurado
- [ ] Formulários com React Hook Form + Zod

### Fase 4: Páginas Públicas
- [ ] Homepage (Hero, Produtos, Diferenciais, Depoimentos, FAQ, Contato)
- [ ] Catálogo de produtos
- [ ] Página de produto
- [ ] Fluxo de pedido (multi-step)
- [ ] Página de sucesso do pedido
- [ ] Contato com mapa
- [ ] Sobre, Entrega, FAQ
- [ ] Login/Cadastro cliente
- [ ] Área do cliente (pedidos, perfil)

### Fase 5: Admin Dashboard
- [ ] Login admin
- [ ] Dashboard com stats + gráficos
- [ ] Gestão de pedidos (lista, detalhe, status)
- [ ] CRUD Produtos
- [ ] Gestão de clientes
- [ ] Gestão de usuários admin
- [ ] Configurações
- [ ] Relatórios/Exportação

### Fase 6: Integrações
- [ ] WhatsApp Business API (botão + webhook)
- [ ] Google Maps (endereço + distância)
- [ ] Email (nodemailer/resend)
- [ ] Notificações push (opcional)
- [ ] Webhooks para status de pedido

### Fase 7: Qualidade & Deploy
- [ ] Testes E2E (Playwright/Cypress)
- [ ] Testes unitários (Jest/Vitest)
- [ ] CI/CD GitHub Actions
- [ ] Deploy Vercel (frontend)
- [ ] Deploy Railway/Render (backend + DB)
- [ ] Configurar domínio + SSL
- [ ] Monitoramento (Sentry, Vercel Analytics)
- [ ] Backup automático DB
- [ ] Documentação API (Swagger)
- [ ] README completo

## 📚 Documentação

- [Arquitetura](./docs/architecture.md)
- [API Documentation](./docs/api-docs.md)
- [Guia de Desenvolvimento](./docs/development.md)
- [Deploy Guide](./docs/deployment.md)
- [Design System](./docs/design-system.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário da **Best Gelo Comércio de Gelo LTDA**. Todos os direitos reservados.

---

**Desenvolvido com ❄️ para a Best Gelo**