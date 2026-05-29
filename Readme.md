# 🧮 Mathematical Portfolio Platform

> **"Making thinking visible."**  
> A modern, interactive portfolio platform that transforms mathematical reasoning into compelling, living demonstrations.

---

## ✨ What This Is

This is a personal portfolio platform built for a **Computer Science & Engineering student** whose passion lies in mathematics — not in shipping consumer apps, but in the rigour of algorithms, the elegance of proofs, and the depth of computational thinking.

Rather than hiding that identity behind a generic list of CRUD projects, this platform **leads with it**. Every design and engineering decision is made to make the owner's mathematical thinking visible, credible, and genuinely impressive to recruiters, academics, and peers alike.

---

## 🖥️ Live Demo

> **[Live Demo](https://gosple-portfolio.vercel.app)** — Deployed on Vercel

### Preview

<table>
<tr>
<td><img src="public/demo-desktop.png" width="400" alt="desktop view"/></td>
<td><img src="public/demo-mobile.jpeg" width="400" alt="mobile view"/></td>
</tr>
</table>

### Desktop + Mobile responsive views

---

## 🚀 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, TypeScript) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **CMS** | [Sanity.io](https://www.sanity.io/) |
| **Visualizations** | [D3.js](https://d3js.org/) |
| **Math Rendering** | [KaTeX](https://katex.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Email** | [Resend](https://resend.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Database (opt.)** | PostgreSQL via [Prisma](https://www.prisma.io/) |

---

## 🏗️ Project Structure

```tree
math-portfolio/
│
├── app/                        # Next.js App Router
│   ├── (site)/                 # Public-facing routes
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── projects/           # Project listing + [slug]
│   │   ├── blog/               # Blog listing + [slug]
│   │   └── interactive/        # Interactive math modules
│   │
│   └── api/                    # Backend API routes
│       ├── contact/route.ts    # Contact form handler
│       ├── analytics/route.ts  # Event tracking
│       └── math/route.ts       # Math engine
│
├── components/
│   ├── ui/                     # Primitive UI components (buttons, cards, etc.)
│   ├── layout/                 # Navbar, Footer, PageShell
│   ├── sections/               # Homepage sections (Hero, Projects Preview, etc.)
│   ├── math/                   # Interactive math modules (D3.js components)
│   └── blog/                   # Blog post renderer, cards
│
├── features/
│   ├── projects/               # Project fetching, filtering logic
│   ├── blog/                   # Blog fetching, tag filtering
│   └── analytics/              # Analytics event helpers
│
├── services/
│   ├── sanity.ts               # Sanity client + GROQ queries
│   ├── email.ts                # Resend email service
│   └── math-engine.ts          # Computation logic
│
├── lib/
│   ├── utils.ts                # Shared utilities
│   ├── validators.ts           # Input validation (Zod)
│   └── constants.ts            # Site-wide constants
│
├── hooks/
│   ├── useAnalytics.ts         # Analytics event hook
│   └── useMathModule.ts        # Interactive math state
│
├── types/
│   ├── project.ts
│   ├── blog.ts
│   └── math.ts
│
├── sanity/
│   ├── schemas/                # Sanity content schemas
│   │   ├── project.ts
│   │   └── blog.ts
│   ├── client.ts
│   └── studio/                 # Sanity Studio config
│
├── prisma/ (optional)
│   └── schema.prisma           # DB schema for analytics
│
└── public/
    ├── fonts/
    └── images/
```

---

## 🎯 Key Features

### 🏠 Homepage

A striking hero section with a math-inspired animated visual (function graph or particle field), a clear value statement, and quick navigation into the platform's core sections.

### 👤 About Page

Academic background, mathematical interests, personal philosophy, and a timeline of growth — telling the story of who the owner is, not just what they've built.

### 📊 Projects (CMS-Driven)

All projects are managed through Sanity Studio. Each entry includes a problem statement, mathematical concepts involved, the approach taken, and outcomes. Filterable by category and math concept tags.

### ✍️ Blog / Insights (CMS-Driven)

Long-form writing on mathematical topics, CS concepts, and analytical breakdowns — rendered with full **LaTeX equation support** via KaTeX.

### 🔢 Interactive Math Modules ⭐

The platform's standout feature. Live, browser-based mathematical demonstrations built with D3.js:

| Module | What It Demonstrates |
| --- | --- |
| **Function Visualiser** | Plot any function in real-time |
| **Regression Simulator** | Drag-and-drop data points, watch the regression fit |
| **Sorting Algorithm Animator** | Step-by-step visualisation of sorting algorithms |
| **Graph Theory Explorer** | Build graphs and run traversal algorithms visually |
| **Matrix Operations** | Perform and visualise matrix transformations |

### 📬 Contact System

A clean contact form backed by a validated API route and email delivery.

### 📈 Analytics

Privacy-first event tracking to understand how visitors engage with the content.

### 🧠 Math Engine API

A backend endpoint that performs real mathematical computations — from matrix operations to numerical root-finding — accessible via the interactive modules.

---

## ⚡ Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn
- A Sanity.io account
- A Resend account (for email)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/math-portfolio.git
cd math-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_RECIPIENT=your@email.com

# Database (optional, for analytics)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set Up Sanity CMS

```bash
# Navigate to the Sanity studio folder
cd sanity

# Install Sanity dependencies
npm install

# Start Sanity Studio locally
npm run dev
# Studio available at http://localhost:3333
```

### 5. Run the Development Server

```bash
# From the project root
npm run dev
# App available at http://localhost:3000
```

---

## 🗄️ Content Management (Sanity)

All blog posts and projects are managed via **Sanity Studio** — no code required.

### Blog Post Fields

| Field | Type | Required |
| --- | --- | --- |
| Title | String | ✅ |
| Slug | Slug (auto) | ✅ |
| Excerpt | Text | ✅ |
| Body | Rich Text (with math blocks) | ✅ |
| Tags | Array | ✅ |
| Cover Image | Image | — |
| Published At | DateTime | ✅ |

### Project Fields

| Field | Type | Required |
| --- | --- | --- |
| Title | String | ✅ |
| Slug | Slug (auto) | ✅ |
| Description | Text | ✅ |
| Category | String | ✅ |
| Math Concepts | Tag Array | ✅ |
| Technologies | Tag Array | — |
| Problem Statement | Rich Text | ✅ |
| Approach | Rich Text | ✅ |
| Outcome | Rich Text | ✅ |
| Links (GitHub, Demo) | URL | — |

---

## 🔌 API Reference

### `POST /api/contact`

Submit a contact form message.

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hello, I came across your portfolio..."
}
```

**Response:**

```json
{ "success": true, "message": "Message sent successfully." }
```

---

### `POST /api/analytics`

Track a user interaction event.

**Request Body:**

```json
{
  "event": "project_click",
  "data": { "slug": "graph-theory-bfs", "timestamp": "2026-04-02T10:00:00Z" }
}
```

---

### `POST /api/math`

Perform a mathematical computation.

**Request Body:**

```json
{
  "operation": "matrix_multiply",
  "inputs": {
    "A": [[1, 2], [3, 4]],
    "B": [[5, 6], [7, 8]]
  }
}
```

**Response:**

```json
{
  "result": [[19, 22], [43, 50]],
  "operation": "matrix_multiply"
}
```

**Supported operations:** `matrix_multiply`, `matrix_determinant`, `matrix_inverse`, `statistics`, `newton_raphson`

---

## 🧪 Running Tests

```bash
# Unit + integration tests
npm run test

# End-to-end tests (Playwright)
npm run test:e2e

# Lighthouse performance audit
npm run audit
```

---

## 🚀 Deployment

The project is optimised for **Vercel** deployment.

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

**Vercel (recommended):**

1. Push your repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy — automatic deployments on every push to `main`

---

## 📅 Development Roadmap

### v1.0 — Launch

- [x] Project initialisation and architecture setup
- [ ] Core UI layout and design system
- [ ] CMS integration (Sanity)
- [ ] Homepage + About + Projects + Blog pages
- [ ] Contact API + email delivery
- [ ] Analytics event tracking
- [ ] 2–3 Interactive math modules
- [ ] Deployment to Vercel

### v2.0 — Enhancement

- [ ] AI-powered math explanation assistant
- [ ] Advanced analytics dashboard
- [ ] Dark/light theme toggle
- [ ] Interactive learning modules with exercises
- [ ] PDF export of project writeups

---

## 🤝 Contributing

This is a personal project. That said, if you have ideas or spot issues, feel free to open an issue or submit a pull request — thoughtful contributions are welcome.

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Portfolio Owner** — BSc. Computer Science & Engineering student with a deep passion for mathematics, algorithms, and analytical problem-solving.

**Built by** — A fellow CS & Engineering student committed to clean architecture, engineering discipline, and building things that actually matter.

---

## 💡 Philosophy

Most portfolios show what you've built.

This one shows **how you think**.

There is a difference — and it matters.
