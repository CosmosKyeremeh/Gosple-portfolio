# Gospel Portfolio — Owner's Complete Guide

---

## Before You Read

This document answers three questions for every section of the portfolio:

1. **Technically** — what is actually happening under the hood?
2. **Non-technically** — what does a visitor experience, and what impression does it create?
3. **Maximum use** — what should you put there, and how do you keep it working for you?

Read it once end-to-end. Then keep it as a reference.

---

## Part 1 — The Project's Architecture in Plain English

Before covering individual sections, you need to understand the three layers your portfolio is built on. Everything else makes sense once you understand these.

### Layer 1 — Next.js (The Engine)

Next.js is the framework that powers the entire site. When a visitor opens this portfolio in their browser, Next.js has already done most of the work *before* the request arrived. It reads your MDX content files, compiles them, and generates HTML pages in advance — a technique called **Static Site Generation (SSG)**.

What this means for you practically: the site loads in under a second for anyone anywhere in the world because Vercel's global edge network serves pre-built HTML, not a server computing a response on demand.

When you add a new `.mdx` file to `content/blog/` or `content/projects/` and push to GitHub, Vercel automatically rebuilds the site. Your content is live in about 90 seconds.

### Layer 2 — MDX (Your Content System)

MDX is Markdown with superpowers. Standard Markdown lets you write formatted text. MDX additionally lets you embed React components and, critically for this portfolio, render **LaTeX mathematical equations** using KaTeX.

You write a file like this:

```mdx
---
title: "Graph Colouring and the Four Colour Theorem"
category: "Graph Theory"
date: "2026-06-01"
tags: ["graph-theory", "combinatorics", "proofs"]
excerpt: "Why four colours always suffice to colour any planar map."
---

The chromatic number $\chi(G)$ of a planar graph satisfies:

$$\chi(G) \leq 4$$

This was conjectured in 1852 and proved computationally in 1976...
```

The site reads the block at the top (called **frontmatter**) to populate the project cards, listing pages, and metadata. The body below becomes a beautifully rendered article with typeset mathematics. You never touch any code.

### Layer 3 — Vercel (The Delivery)

Vercel is where the site lives after deployment. It handles everything you would otherwise pay a server administrator for — global CDN distribution, HTTPS certificates, environment variable security, and automatic deployments whenever you push to your GitHub repository.

The contact form's email API runs as a serverless function on Vercel. It sleeps when no one is using it and wakes within milliseconds when a message is submitted.

---

## Part 2 — Section by Section

---

### Section 1 — Homepage (`/`)

#### Technically

The homepage is a **React Server Component** — it runs on the server at build time. It calls `getAllContent('blog')` and `getAllContent('projects')` from `lib/mdx.ts`, which reads your content directory, parses frontmatter from every `.mdx` file, sorts by date, and returns the three most recent blog posts and two most recent projects. These are rendered into the page's HTML before any visitor loads it. The animated background blobs are CSS `blur` filters on `div` elements — no JavaScript animation library is involved, which means they never affect performance.

#### Non-technically

This is your first impression. A visitor — a recruiter, a professor, a collaborator — lands here and within five seconds forms an opinion. The design communicates three things instantly:

- **Precision.** The dot grid, monospace typography, and mathematical symbols signal that this is not a generic developer portfolio.
- **Identity.** The hero text and one-line statement tell them who you are and what you believe.
- **Depth.** The preview cards for projects and blog posts show immediately that there is substance behind the design.

The Thurston quote at the bottom is not decoration. It is a positioning statement that aligns your work with mathematical philosophy rather than software delivery. Recruiters who care about research and analytical roles will notice.

#### Maximum Use

**Keep the quote authentic.** If Thurston does not resonate, change it to something that genuinely reflects how you think about mathematics. A quote you believe in reads differently from one you picked because it sounded impressive.

**The homepage is a mirror of your content.** It automatically surfaces your three most recent blog posts and two most recent projects. This means the best way to improve the homepage is to write more content. Every new `.mdx` file makes the homepage richer without touching any code.

**Your one-line statement matters most.** The italic text beneath your name — *"Making mathematical thinking visible"* — should reflect your actual intellectual identity. Update it as you grow.

---

### Section 2 — About Page (`/about`)

#### Technically

This is a **static page** — it does not pull from any external data source. All content (the timeline, interests, philosophy quote) is hardcoded as TypeScript arrays inside the component. Changing anything here requires editing the file directly. This is intentional: your identity should not change frequently enough to need a CMS.

#### Non-technically

The About page does work that a CV cannot. A CV lists facts. The About page communicates *character*. Specifically:

- The **interests grid** tells a visitor what mathematical fields you have invested in — immediately more credible than a skills list with percentage bars.
- The **timeline** shows intellectual progression, not just employment dates. A student who has been deepening mathematical study over four years reads very differently from one who only started paying attention in final year.
- The **philosophy blockquote** is where you stake a claim. It is the most-read paragraph on the page for academic and research visitors.

#### Maximum Use

**Edit the timeline to reflect your real journey.** The current entries are placeholder milestones. Replace them with genuine turning points — the course that changed how you think, the problem that took weeks to solve, the moment you decided mathematics was your orientation rather than just a subject.

**The interests grid should be honest.** Only list fields you can speak to intelligently. If a recruiter asks you about Probability Theory during an interview because they saw it on your portfolio and you cannot hold a conversation about it, the portfolio has damaged rather than helped you.

**Add a soft line about collaboration.** Even one sentence acknowledging that you enjoy working with others on applied problems counterbalances the deeply individual impression that mathematical focus can create.

---

### Section 3 — Projects (`/projects` and `/projects/[slug]`)

#### Technically

The listing page (`/projects`) calls `getAllContent('projects')`, which scans `content/projects/`, parses every `.mdx` file's frontmatter, sorts by date, and renders project cards. This is a **Server Component** that rebuilds at deploy time.

The detail page (`/projects/[slug]`) uses `generateStaticParams()` to pre-generate a static HTML page for every `.mdx` file in `content/projects/` at build time. When a visitor opens a project, they receive pre-built HTML — the MDX body, including all LaTeX equations, is already compiled. `next-mdx-remote` handles the MDX-to-HTML compilation with `remark-math` (parses `$...$` and `$$...$$` LaTeX syntax) and `rehype-katex` (renders it using the KaTeX engine).

**Adding a project requires zero code.** Create a new `.mdx` file in `content/projects/`, push to GitHub, and it appears on the site automatically within 90 seconds.

#### Non-technically

This is the section that does the most strategic work for you. Every entry is a structured argument for your analytical capability. A recruiter reading a project entry is not looking for a demo link — they are reading to understand how you think through a problem.

The structure of each project (problem → approach → outcome) is deliberate. It mirrors how engineers communicate in professional environments: here is the problem, here is my reasoning, here is the result. A student who can write this clearly signals professional readiness beyond their years.

#### Maximum Use — This Is Critical

**This section is where industry experience and group work live.** You do not need a separate experience section. Here is exactly how to frame it:

Create one `.mdx` file per significant piece of work — whether that is a pure mathematics exploration, a group project from university, or any industry exposure (internship tasks, freelance work, competition participation). The framing is always the same: what was the problem, what mathematical or analytical thinking did you apply, what was the outcome.

**Example: a group project on network routing**

```mdx
---
title: "Shortest Path Optimisation in Campus Network Routing"
category: "Applied Graph Theory"
date: "2025-11-10"
tags: ["graph-theory", "dijkstra", "networks", "group-project"]
excerpt: "Applied Dijkstra's algorithm to model and optimise data routing across a campus network topology."
---

## Problem Statement

Our group was tasked with analysing latency in a university campus network 
modelled as a weighted directed graph G = (V, E, w).

## Mathematical Approach

We modelled each network node as a vertex and each physical link as a 
directed edge with weight equal to measured latency in milliseconds.

Dijkstra's algorithm finds the shortest path in O((V + E) log V) time 
using a min-priority queue...

$$d(v) = \min_{u \in N^{-}(v)} \left[ d(u) + w(u, v) \right]$$

## Outcome

Identified three high-latency bottleneck edges whose replacement reduced 
average path length by 23% in simulation.
```

Notice what this does: it takes a group project and presents it as a rigorous analytical demonstration. The group context can be mentioned in the body text. What is foregrounded is the mathematical thinking.

**Write at least four project entries before going live.** Two is sparse. Four gives the listing page visual weight and signals sustained output rather than a single effort.

**Use the `category` field deliberately.** It appears prominently on every card. Aim for a spread across your interests: "Graph Theory", "Linear Algebra", "Numerical Methods", "Applied Statistics". This gives the listing page the appearance of breadth without requiring many entries.

---

### Section 4 — Blog / Insights (`/blog` and `/blog/[slug]`)

#### Technically

Architecturally identical to the projects section — `getAllContent('blog')` scans `content/blog/`, and `generateStaticParams()` pre-builds every post. The only rendering difference is the colour accent (purple for blog, blue for projects) and the label copy.

The MDX body of every post supports full LaTeX rendering. A line like:

```
The series $\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$ converges.
```

renders as typeset mathematics inline with the prose. Block equations use `$$...$$` on their own line.

#### Non-technically

The blog is the most powerful long-term asset in this portfolio. Here is why: projects show what you worked on. The blog shows how you think *right now*. A post explaining why a particular proof is elegant, or unpacking a concept that confused you until it suddenly clicked, is primary evidence of intellectual honesty and communication skill — two things that matter enormously in research and analytical roles.

It is also the section that keeps the portfolio alive. A portfolio with the last project dated a year ago feels abandoned. A blog with a post from last month feels active.

#### Maximum Use

**Write about confusion, not just mastery.** The most compelling blog posts are not encyclopaedia entries — they are accounts of genuine intellectual struggle and resolution. "I was confused about why eigenvalues mattered until I visualised them this way" is more engaging and more credible than a correct but sterile explanation of eigenvalue theory.

**Start with three posts before launch.** The blog listing page with one post looks sparse. Three is the minimum for it to feel like a living publication.

**Post format that works well for this audience:**

1. Open with the question or confusion that motivated the post
2. Build up the mathematical framework step by step with equations where they genuinely add clarity
3. Close with the insight — what you now understand that you did not before, and why it matters computationally or structurally

**Suggested first posts:**
- One post explaining a concept you found beautiful (Euler's identity, Bayes' theorem, the handshaking lemma)
- One post connecting a mathematical idea to something computational (how linear algebra underlies machine learning, how graph theory models the internet)
- One post that is a genuine admission of confusion followed by resolution

---

### Section 5 — Vector Transformations Lab (`/math-vector`)

#### Technically

This is a **Client Component** (`'use client'`) — it runs entirely in the browser. The canvas drawing happens through the HTML5 Canvas API, called inside a `useCallback`-memoised `draw` function that is triggered by a `useEffect` watching the `matrix` state. Every time a slider moves, `setMatrix` updates state, React re-renders, `draw` recomputes, and the canvas redraws — all within a single animation frame. No server requests are made.

The determinant is computed as `ad − bc` on every render. The SVG arrow-drawing for the basis vectors uses trigonometry (atan2 for the arrowhead orientation) computed inline. The entire mathematics module — transformation, rendering, preset management — is approximately 200 lines of TypeScript with zero external dependencies beyond React.

#### Non-technically

This section is your most distinctive asset. When a recruiter or academic sees a live, interactive linear algebra visualiser, their immediate reaction is: this person understands what they built. Sorting algorithm animators are common on student portfolios. A vector space transformer that shows basis vector images, the determinant as an area scaling factor, and orientation reversal is not.

It communicates three things that a CV cannot:
- You understand linear transformations geometrically, not just formulaically
- You can translate mathematical concepts into interactive software
- You have taste — the canvas is clean, the colour coding of î' and ĵ' is intentional, the preset labels are mathematically accurate

#### Maximum Use

**Use the presets in any interview or demo.** Rotate 90° → show that multiplying by a rotation matrix is literally spinning the coordinate system. Scale ×2 → show area doubling (det = 4). Reflect Y → show det = −1 and orientation reversal. This is a live demonstration of geometric intuition that you can walk someone through in two minutes.

**Add a fourth preset: Projection.** A matrix like `[[1,0],[0,0]]` collapses all vectors onto the x-axis (det = 0). It dramatically illustrates singular matrices and is mathematically rich. Add it to the `PRESETS` array:

```typescript
{ label: 'Project X', m: { a: 1, b: 0, c: 0, d: 0 }, desc: 'Orthogonal projection onto the x-axis. Determinant = 0: space collapses.' }
```

**Link to it from project entries.** When you write a project about linear algebra, add a line at the end: *"Try the interactive vector transformer in the Lab."* Cross-pollination between content sections increases time-on-site and shows integration of thinking.

---

### Section 6 — Regression Workspace (`/regression`)

#### Technically

Also a **Client Component**. The canvas coordinate system maps pixel coordinates to a mathematical plane spanning −5 to 5 on each axis using a linear transformation (`toMath`). When you click, the inverse transformation converts pixel coordinates back to mathematical coordinates and adds a point to the `points` state array.

The regression computation lives entirely in the `linearRegression` function — a pure function (no side effects, no API calls) that takes an array of points and returns slope, intercept, R², and residual standard error using closed-form least-squares formulas. `useMemo` ensures it only recomputes when `points` changes. The canvas redraws whenever `draw` changes, and `draw` is memoised with `useCallback` watching `[points, stats, showLine]`.

The residual lines (the red dashed vertical segments connecting each point to the regression line) are drawn before the data points so the points sit on top of them visually — a deliberate rendering order decision.

#### Non-technically

This module bridges mathematics and statistics in a way that is immediately intuitive even to non-mathematical visitors. Loading the "Strong Linear" dataset and watching the blue line snap into place with an R² of 0.99 is genuinely satisfying. Loading "No Correlation" and seeing R² collapse toward zero makes the statistic meaningful in a way that reading its formula never does.

For recruiters interested in data, analytics, or machine learning roles, this module is direct evidence that you understand regression not as a black-box function call (`sklearn.linear_model.LinearRegression().fit(X, y)`) but as a geometric projection problem with a closed-form solution.

#### Maximum Use

**In any interview involving statistics or data:** open this page, add eight points in a clear linear pattern, describe what the R² is telling you, then add two outliers and explain why the line shifts. This is a five-minute demonstration of statistical intuition that most candidates cannot replicate.

**Add a polynomial mode as a future enhancement.** Degree-2 polynomial regression (fitting a parabola) requires only computing the normal equations for a 3-column design matrix `[1, x, x²]`. It would make the module significantly more powerful and introduce a natural conversation about the bias-variance tradeoff.

**Use it to write a blog post.** The best content you could write for this portfolio is a blog post titled something like "Regression is Geometry, Not Statistics" that opens with the interactive module and explains the projection interpretation. The module becomes the primary illustration for the post, and the post gives the module intellectual context.

---

### Section 7 — Contact (`/contact` and `/api/contact`)

#### Technically

The contact page is a **Client Component** — the form state (name, email, subject, message) lives in `useState`, and submission calls `fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })`.

The API route (`/api/contact/route.ts`) is a **Next.js Route Handler** deployed as a Vercel serverless function. On each POST request it:

1. Extracts the client IP from the `x-forwarded-for` header and checks an in-memory rate limit map (max 5 submissions per IP per hour)
2. Parses the request body as JSON
3. Validates it against a **Zod schema** — this is the gatekeeper that rejects malformed, too-short, or invalid-email submissions before they reach the email service
4. Initialises the **Resend** client using your `RESEND_API_KEY` environment variable (never exposed to the browser)
5. Calls `resend.emails.send()` with an HTML-formatted email

The `replyTo` field is set to the submitter's email address, so when you reply in your email client, it goes directly to them — not back to the `onboarding@resend.dev` address.

#### Non-technically

The contact section is the bridge between your portfolio and real-world opportunity. Its job is to lower the friction of reaching you to near zero. The form is minimal by design — name, email, subject, message. No CAPTCHA, no account creation, no friction.

The "No tracking. No spam. Direct delivery." note at the bottom is a trust signal. It is honest — the contact API does not store submissions in a database. The email arrives in your inbox directly.

#### Maximum Use

**Set your `CONTACT_EMAIL_RECIPIENT` to an address you check daily.** A recruiter who fills in your contact form and waits three days for a reply has moved on. Responsiveness is itself a signal of professionalism.

**Once your Resend account is set up, verify a custom domain.** Currently the `from` address is `onboarding@resend.dev`, which looks like a test environment. Resend's free tier allows one custom domain. Sending from `portfolio@yourdomain.com` makes the email look legitimate and professional.

**Treat every contact form submission as high-signal.** Someone who found your portfolio, read enough to be interested, and then took the time to write a message is a warm lead. Reply within 24 hours, personally, and reference something specific from what they wrote.

---

## Part 3 — Content Strategy: How to Keep This Portfolio Working

A portfolio that is not updated is a liability after six months. Here is a maintenance rhythm that keeps it alive with minimal effort.

### Monthly (30 minutes)

Write one blog post. It does not need to be long — 400 words with two or three equations is enough. Pick one concept you encountered that month that made you think. The act of writing about it deepens your own understanding and keeps the portfolio current.

### Per project / per piece of work

Every significant piece of work — a course assignment that genuinely challenged you, a group project, any industry exposure — deserves a project entry. Write it while the details are fresh. The template is always: problem → mathematical approach (with equations) → outcome.

### Before any interview

Review the project entries that are most relevant to the role. Be ready to talk through the mathematical approach in detail. The portfolio is your preparation checklist — if you wrote it, you should be able to explain every equation in it.

### When you learn something that changes your perspective

Update the About page. The philosophy quote and the interest areas should evolve as you do. A portfolio that looks the same in final year as it did in second year suggests stagnation.

---

## Part 4 — The Projects-as-Experience Strategy

To directly answer your question: yes, your suggestion is correct and it is the stronger approach.

Here is the strategic argument. Traditional portfolios have an "Experience" section that lists company names, job titles, and date ranges. For a student with limited formal employment, this section is often sparse and works against them — it highlights what they lack.

Your projects section, by contrast, is structured to highlight what you *have*: the ability to identify a problem, apply mathematical reasoning, and produce a documented outcome. Every piece of industry experience or group work you reframe as a project entry shifts the conversation from "where have you worked?" to "what have you proven you can do?"

**The reframing rule:** Any experience that involved a problem worth solving can become a project entry. Ask yourself: what was the problem? What mathematical or analytical framework did I apply? What changed as a result? If you can answer those three questions, you have a project entry.

**What to tag as `category`:** For group projects, use the dominant mathematical concept — "Applied Graph Theory", "Statistical Analysis", "Numerical Optimisation" — not "Group Project" or "University Assignment". The category is intellectual framing, not administrative labelling.

**One honest line about the context:** Inside the project body, you can write: *"This was a collaborative university project with a team of four. My specific contribution was the mathematical modelling of..."* This is honest, it contextualises appropriately, and it still centres your individual analytical contribution.

---

## Summary: The Ten Things That Matter Most

1. **Write content.** The technical foundation is complete. The portfolio's quality from here is entirely determined by what you put in `content/blog/` and `content/projects/`.

2. **Four project entries before launch.** Two is sparse. Four gives weight.

3. **Three blog posts before launch.** One about beauty in mathematics, one connecting math to computation, one about genuine confusion and resolution.

4. **Every group project and industry experience is a project entry.** Reframe it as: problem → mathematical approach → outcome.

5. **Use the `category` field to reflect intellectual framing,** not administrative categories.

6. **The vector and regression labs are interview assets.** Practice walking through them out loud before any technical interview.

7. **Reply to contact form submissions within 24 hours.** The portfolio creates opportunity; responsiveness converts it.

8. **Update the About page as you grow.** It should never be frozen in time.

9. **Write one blog post per month.** That is the maintenance rhythm that keeps the portfolio alive.

10. **Verify a custom domain on Resend** so the contact emails look professional.

---

*This portfolio is not finished — it is launched. The foundation is production-grade. What you build on it from here is the work that actually matters.*

---

**Document prepared by:** Senior Dev  
**Project:** Gospel Mathematical Portfolio Platform  
**Version:** 1.0 — Post-Launch Edition
