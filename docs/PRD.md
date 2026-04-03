# 📐 Product Requirements Document (PRD)

**Product Name:** Gosple Portfolio Platform  
**Version:** 1.0 —  Architecture  
**Document Status:** Active  
**Last Updated:** April 2026

---

## 1. 🧭 Product Overview

### 1.1 Background & Core Idea

This platform was conceived to solve a real problem: a Computer Science & Engineering student whose primary intellectual passion is **mathematics** — not shipping apps or chasing frontend trends — needed a portfolio that honestly and compellingly represents who he is.

He has strong theoretical foundations, academic depth, and a mathematical lens on computing. Yet traditional portfolios penalise students who haven't built consumer software, ignoring the rigour behind algorithm analysis, numerical methods, and mathematical modelling.

This product exists to change that narrative.

### 1.2 Purpose

To design and build a **modern, interactive, and content-driven portfolio platform** that:

- Showcases mathematical reasoning, analytical thinking, and algorithmic problem-solving
- Enables the owner to manage all content independently without touching code
- Demonstrates real engineering capability through selective backend intelligence
- Positions the student competitively for roles in engineering, data science, research, and academia

### 1.3 Strategic Framing

> This is not just a portfolio. It is a **proof of thought** — a living document of how the owner thinks, solves, and reasons.

| What it is NOT | What it IS |
| --- | --- |
| A list of deployed apps | A showcase of mathematical exploration |
| A clone of generic portfolio templates | A differentiated, content-first platform |
| An overengineered admin system | A lean, well-scoped product with real backend |
| A static HTML page | A dynamic, CMS-driven, interactive system |

---

## 2. 🎯 Objectives & Success Metrics

### 2.1 Primary Objectives

1. **Represent mathematical depth** — Make the owner's thinking visible through interactive demonstrations and written breakdowns
2. **Enable independent content management** — The owner must be able to add/edit blog posts and projects with zero developer involvement
3. **Demonstrate engineering discipline** — The codebase and architecture should reflect production-quality thinking
4. **Drive professional outcomes** — Increase recruiter engagement and academic visibility

### 2.2 Success Metrics

| Metric | Target |
| --- | --- |
| Average session duration | > 2 minutes |
| Blog scroll depth | > 60% per post |
| Project section interactions | ≥ 3 per session |
| Contact form conversions | Measurable and tracked |
| CMS independence | Non-technical owner updates content unassisted |
| Mobile responsiveness | 100% of pages fully responsive |
| Core Web Vitals (LCP) | < 2.5s on Vercel |

---

## 3. 👥 Target Audience

### Primary Users (Visitors)

| Persona | Goal on the Platform |
| --- | --- |
| **Engineering Recruiters** | Assess technical depth, communication, and problem-solving ability |
| **Research Supervisors / Academics** | Evaluate mathematical rigour and intellectual curiosity |
| **Data Science / ML Teams** | Look for analytical foundations and computational thinking |

### Secondary Users (Visitors)

| Persona | Goal on the Platform |
| --- | --- |
| **CS Students** | Learn through the blog and interactive math demonstrations |
| **Peers / Collaborators** | Discover project work and connect via contact form |

### Admin User

| Persona | Goal on the Platform |
| --- | --- |
| **Portfolio Owner** | Manage all content through Sanity CMS without writing code |

---

## 4. 🏗️ System Architecture

### 4.1 Architecture Model

``` bash
┌─────────────────────────────────────────────────┐
│                  CLIENT LAYER                   │
│         Next.js (App Router) + Tailwind          │
│         D3.js (Interactive Visualizations)       │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼───────┐        ┌────────▼────────┐
│  Sanity CMS   │        │  Next.js API    │
│ (Content Mgmt)│        │  Routes         │
│               │        │  /api/contact   │
│  Blog Posts   │        │  /api/analytics │
│  Projects     │        │  /api/math      │
│  Media Assets │        └────────┬────────┘
└───────────────┘                 │
                          ┌───────▼───────┐
                          │   Optional DB  │
                          │  (Analytics /  │
                          │  Computation)  │
                          └───────────────┘
                                  │
                         ┌────────▼────────┐
                         │     Vercel       │
                         │  (Deployment)    │
                         └─────────────────┘
```

### 4.2 Technology Stack

| Layer | Technology | Rationale |
| --- | --- | --- |
| **Frontend Framework** | Next.js 14+ (App Router) | SSR/SSG, API routes, performance, SEO |
| **Styling** | Tailwind CSS | Utility-first, rapid development, consistency |
| **CMS** | Sanity.io | Structured content, headless, real-time studio |
| **Visualizations** | D3.js | Industry-standard, flexible, mathematical rendering |
| **Math Rendering** | KaTeX or MathJax | Render LaTeX equations in the browser |
| **Animations** | Framer Motion | Production-grade, performant React animations |
| **Deployment** | Vercel | Zero-config Next.js hosting, edge network |
| **Database (Optional)** | PostgreSQL via Prisma | Analytics storage, computation caching |
| **Email** | Resend or Nodemailer | Reliable transactional email for contact form |

---

## 5. 🧩 Feature Requirements

### 5.1 Homepage

**Purpose:** First impression and navigation hub.

| Element | Description |
| --- | --- |
| Hero Section | Name, title, one-line philosophical statement |
| Animated Visual | Math-inspired animation (e.g., flowing function graph, particle system) |
| Quick Navigation | Cards or links to Projects, Blog, Interactive Math, Contact |
| Skills Snapshot | Visual display of mathematical and technical competencies |

**Acceptance Criteria:**

- [ ] Hero renders correctly on all screen sizes
- [ ] Animation is smooth and non-intrusive (respects `prefers-reduced-motion`)
- [ ] Navigation links route correctly to all sections

---

### 5.2 About Page

**Purpose:** Establish identity, philosophy, and academic background.

| Element | Description |
| --- | --- |
| Biography | Academic background and CS/Math journey |
| Philosophy | The owner's view on mathematics and problem-solving |
| Timeline | Academic milestones and project history |
| Interests | Mathematical fields of focus (e.g., Discrete Math, Numerical Analysis) |

---

### 5.3 Projects Page (CMS-Driven)

**Content Source:** Sanity CMS  
**Routing:** `/projects` (listing) and `/projects/[slug]` (detail)

**Sanity Schema — Project:**

```typescript
{
  title: string,
  slug: slug,
  description: text,
  category: string,          // e.g., "Algorithm", "Numerical Method"
  mathConcepts: array,       // tags like "Linear Algebra", "Graph Theory"
  technologies: array,
  problemStatement: richText,
  approach: richText,        // step-by-step breakdown
  outcome: richText,
  links: { github, demo, paper },
  publishedAt: datetime,
  featuredImage: image
}
```

**Features:**

- Filter by category and math concept tag
- Dynamic routing with static generation (ISR)
- Rich text rendering with math equation support
- Related projects suggestion

**Acceptance Criteria:**

- [ ] Projects load from CMS without code changes
- [ ] Filtering works client-side without page reload
- [ ] Math equations in rich text render correctly

---

### 5.4 Blog / Insights Page (CMS-Driven)

**Content Source:** Sanity CMS  
**Routing:** `/blog` (listing) and `/blog/[slug]` (detail)

**Sanity Schema — Blog Post:**

```typescript
{
  title: string,
  slug: slug,
  excerpt: text,
  body: richText,            // with KaTeX math block support
  tags: array,
  category: string,
  readTime: number,          // auto-calculated
  publishedAt: datetime,
  coverImage: image,
  seo: { metaTitle, metaDescription }
}
```

**Features:**

- Rich text + inline LaTeX equation rendering
- Tag-based filtering
- Estimated read time
- SEO meta tags per post
- Social sharing

---

### 5.5 Interactive Math Module ⭐ (Key Differentiator)

**Purpose:** Transform abstract mathematics into live, interactive demonstrations. This is the feature that separates this portfolio from every other CS student's.

**Proposed Demonstrations:**

| Module | Description |
| --- | --- |
| **Function Visualizer** | Plot any mathematical function with real-time D3.js graph rendering |
| **Regression Simulator** | Add data points, watch linear/polynomial regression fit live |
| **Sorting Algorithm Animator** | Visualise Bubble, Merge, Quick sort with step-by-step animation |
| **Graph Theory Explorer** | Build undirected/directed graphs, run BFS/DFS visually |
| **Matrix Operations** | Input matrices, perform operations, view transformations |

**Functional Requirements:**

- Real-time parameter adjustment via sliders/inputs
- Smooth animations (60fps target)
- Mobile-responsive controls
- Brief explanatory text accompanying each demo

---

### 5.6 Contact System (Backend)

**API Endpoint:** `POST /api/contact`

**Form Fields:**

- Name (required)
- Email (required, validated)
- Subject
- Message (required)

**Backend Behaviour:**

1. Validate all inputs server-side
2. Send notification email to owner via Resend/Nodemailer
3. Return success/error response
4. Rate-limit to prevent spam (max 5 requests/hour per IP)

**Acceptance Criteria:**

- [ ] Form submits and owner receives email
- [ ] Invalid inputs show user-friendly errors
- [ ] Success confirmation shown after submission

---

### 5.7 Analytics Module (Backend)

**API Endpoint:** `POST /api/analytics`

**Events Tracked:**

| Event | Data Captured |
| --- | --- |
| `page_view` | page path, timestamp, referrer |
| `project_click` | project slug, timestamp |
| `blog_read` | post slug, scroll depth, time spent |
| `math_interaction` | module name, parameters used |

**Notes:**

- Privacy-first: no PII collected
- Data stored in lightweight DB or log
- Optional: Simple internal dashboard for owner

---

### 5.8 Math Engine (Advanced Backend)

**API Endpoint:** `POST /api/math`

**Purpose:** Accept structured input, perform server-side computation, return results for display.

**Initial Capabilities:**

- Statistical computation (mean, variance, standard deviation)
- Matrix operations (multiply, invert, determinant)
- Numerical root finding (Newton-Raphson)

**Request Schema:**

```json
{
  "operation": "matrix_multiply",
  "inputs": { "A": [[1,2],[3,4]], "B": [[5,6],[7,8]] }
}
```

---

## 6. 🎨 Design Requirements

### 6.1 Design Principles

| Principle | Application |
| --- | --- |
| **Mathematical Elegance** | Clean whitespace, precise grid, structured typography |
| **Content First** | Design serves the thinking, not the other way around |
| **Purposeful Motion** | Animations reinforce understanding, not just aesthetics |
| **Dark Theme Default** | Professional, easy on the eyes, fits the mathematical aesthetic |

### 6.2 Visual Language

- **Theme:** Dark background with high-contrast accent (electric blue or amber gold)
- **Typography:** A distinctive serif or geometric display font for headings; clean monospace for math/code snippets
- **Grid:** 12-column responsive grid with generous whitespace
- **Icons:** Minimal, line-style icons
- **Animations:** Subtle page transitions, graph drawing animations, staggered content reveals

---

## 7. ⚙️ Non-Functional Requirements

| Requirement | Target |
| --- | --- |
| **Performance** | LCP < 2.5s, CLS < 0.1 |
| **Responsiveness** | Fully responsive: mobile, tablet, desktop |
| **Accessibility** | WCAG 2.1 AA compliance |
| **SEO** | Sitemap, meta tags, OG tags per page |
| **Security** | Input sanitisation, rate limiting on all APIs |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |

---

## 8. 📅 Development Plan

### Phase 1 — Foundation (Week 1)

- [ ] Initialise Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS and global design tokens
- [ ] Set up Sanity project and define all schemas
- [ ] Build core layout: Navbar, Footer, page shell
- [ ] Implement routing structure

### Phase 2 — Core Pages (Week 2)

- [ ] Homepage with hero and animated visual
- [ ] About page
- [ ] Projects listing + detail pages (CMS-connected)
- [ ] Blog listing + detail pages (CMS-connected)
- [ ] Math equation rendering integration (KaTeX)

### Phase 3 — Backend APIs (Week 3)

- [ ] Contact API with email delivery
- [ ] Analytics event tracking API
- [ ] Math Engine API (initial operations)
- [ ] API error handling and rate limiting

### Phase 4 — Interactive Math & Polish (Week 4)

- [ ] Build 2–3 interactive math modules with D3.js
- [ ] Performance optimisation (lazy loading, image optimisation)
- [ ] SEO meta tags and sitemap
- [ ] Cross-browser and mobile testing
- [ ] Deploy to Vercel

---

## 9. 🧪 Testing Requirements

| Test Type | Scope |
| --- | --- |
| **Unit Tests** | API route handlers, utility functions |
| **Integration Tests** | Sanity CMS data fetching, form submission flow |
| **E2E Tests** | Critical user flows (view project, submit contact form) |
| **Visual Regression** | Homepage, project cards, blog post layout |
| **Performance** | Lighthouse audit on all key pages |
| **Responsiveness** | Manual test on mobile, tablet, desktop |

---

## 10. ⚠️ Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Overengineering the backend | Medium | High | Limit to 3 defined API routes; no admin dashboard |
| Weak or sparse content | High | High | Prepare 3 quality projects and 2 blog posts before launch |
| Sanity schema changes mid-build | Low | Medium | Finalise schema in Week 1 before building frontend |
| D3.js performance on mobile | Medium | Medium | Use Canvas over SVG for complex visualisations |
| Scope creep on interactive modules | High | Medium | Cap at 3 modules for v1; extras go on roadmap |

---

## 11. 🚀 Future Enhancements (Post-Launch Roadmap)

- AI-powered math explanation assistant (Claude API integration)
- Interactive learning modules with quizzes
- Advanced analytics dashboard
- Dark/light theme toggle
- PDF export of project breakdowns
- Open Graph image generation per post

---

## 12. ✅ Acceptance Criteria (Definition of Done)

The product is **complete and ready for launch** when:

- [ ] All pages render correctly and are CMS-driven
- [ ] Content owner can publish a blog post or project without developer help
- [ ] All three backend APIs respond correctly
- [ ] At least 2 interactive math modules are live and functional
- [ ] Site passes Lighthouse score ≥ 90 (Performance, SEO, Accessibility)
- [ ] Site is deployed on Vercel with a custom domain
- [ ] Contact form delivers emails successfully
- [ ] All pages are fully responsive on mobile

---

*Built for a Computer Science & Engineering student who believes mathematics is the purest form of engineering discipline.*
