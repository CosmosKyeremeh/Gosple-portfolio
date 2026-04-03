You are an expert full-stack software engineer and product designer.

Build a modern, production-ready portfolio web application for a Computer Science & Engineering student whose primary strength is mathematics, analytical thinking, and algorithmic problem-solving (not traditional software products).

## 🎯 Objective

Create a portfolio that emphasizes:

* Mathematical reasoning
* Problem-solving depth
* Interactive demonstrations
* Clean, professional presentation

Avoid generic developer portfolio patterns.

---

## 🧠 Core Concept

This is a **Mathematical Portfolio Platform**, not a typical developer portfolio.

The system must:

* Showcase mathematical explorations and thinking
* Include interactive visualizations (graphs, simulations, algorithm demos)
* Present structured projects with problem → method → insight
* Include a blog for technical/mathematical explanations

---

## 🏗️ Tech Stack Requirements

Use:

* Next.js (App Router)
* React (TypeScript)
* Tailwind CSS
* Sanity (headless CMS for blog + projects)
* API routes for backend logic

Optional:

* D3.js or similar for data visualization
* KaTeX for math rendering

---

## 📁 Architecture Requirements

Follow a scalable, professional structure:

* app/ (routing + API routes)
* components/ (UI only)
* features/ (feature-based modules)
* services/ (external integrations like CMS, email)
* lib/ (utilities, validators)
* hooks/ (custom hooks)
* types/ (TypeScript types)
* sanity/ (CMS studio)

Ensure separation of concerns.

---

## 🧩 Required Features

### 1. Homepage

* Strong hero section (identity: mathematical thinker)
* Subtle animated or visual elements (math-inspired)
* Navigation to key sections

---

### 2. About Page

* Academic background
* Problem-solving philosophy
* Timeline-style layout

---

### 3. Projects (CMS-driven)

Each project must include:

* Title
* Problem statement
* Approach (with math/logic explanation)
* Outcome

Include filtering and dynamic routing.

---

### 4. Blog (CMS-driven)

* Render posts from Sanity
* Support math formatting
* Clean reading experience

---

### 5. Interactive Math Features

At least one:

* Function visualizer
* Regression demo
* Algorithm animation

Must support user input and real-time updates.

---

### 6. Backend API (Next.js API routes)

Implement:

* POST /api/contact → handles contact form with validation
* POST /api/analytics → tracks interactions (page views, clicks)
* POST /api/math → performs a simple computation or algorithm

Keep backend minimal but meaningful.

---

### 7. Contact Page

* Form with validation
* API integration

---

## 🎨 Design Requirements

* Minimal, modern UI
* Dark theme preferred
* Clean typography
* Smooth animations (subtle, not excessive)
* Fully responsive

---

## ⚠️ Constraints

* Do NOT build a custom admin dashboard
* Use Sanity CMS for content management
* Avoid unnecessary complexity
* Do NOT create fake or meaningless projects
* Prioritize clarity and structure over visual noise

---

## 🚀 Output Expectations

Provide:

1. Full project structure
2. Key file implementations (pages, components, API routes)
3. Sanity schema for blog and projects
4. Example interactive math component
5. Clean, maintainable code

---

## 🧠 Guiding Principle

This project should make **thinking visible**, not just display skills.

Every part of the system must reinforce:
clarity, depth, and analytical strength.
