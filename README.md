# Portfolio Websites Monorepo

Monorepo containing MD Razikul Islam Joni's portfolio applications. Built with `pnpm` workspaces.

---

## 📁 Repository Structure

```
portfolio-websites/
├── apps/
│   ├── razikuljoni-minimal-portfolio/ # Current / Primary Minimal Portfolio (Next.js 16)
│   ├── dev-portfolio/                 # Full Dev Portfolio (Next.js 16)
│   ├── kronen/                        # Kronen AI Studio Portfolio (Next.js 15)
│   ├── portfolio-003/                 # Interactive Portfolio 003 (Next.js 15)
│   └── portfolio-004/                 # Vite + React 19 + Express Portfolio 004
├── package.json                       # Root workspace package configuration
├── pnpm-workspace.yaml                # pnpm monorepo configuration
├── .gitignore                         # Global git ignore configuration
└── README.md                          # Global documentation & deployment guide
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 22+
- pnpm (`npm install -g pnpm`)

### 2. Installation
```bash
pnpm install
```

### 3. Running Applications Locally

Run any application directly from root:

| Application | Command | Framework |
| :--- | :--- | :--- |
| **Minimal Portfolio** *(Primary)* | `pnpm dev:minimal` | Next.js 16 |
| **Dev Portfolio** | `pnpm dev:dev-portfolio` | Next.js 16 |
| **Kronen** | `pnpm dev:kronen` | Next.js 15 |
| **Portfolio 003** | `pnpm dev:portfolio-003` | Next.js 15 |
| **Portfolio 004** | `pnpm dev:portfolio-004` | Vite + React 19 |

### 4. Monorepo Global Commands
```bash
# Build all applications in parallel
pnpm build:all

# Lint all applications
pnpm lint:all
```

---

## 🌐 Deploying to Vercel

You can deploy any of the applications in this monorepo to Vercel individually.

### Deployment Steps:

1. **Push Monorepo to GitHub**:
   ```bash
   git add .
   git commit -m "feat: setup portfolio monorepo"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to your Vercel Dashboard -> **Add New Project**.
   - Import your `portfolio-websites` GitHub repository.

3. **Configure Project Settings in Vercel**:
   - **Framework Preset**:
     - For Next.js apps (`razikuljoni-minimal-portfolio`, `dev-portfolio`, `kronen`, `portfolio-003`): Select **Next.js**.
     - For Vite app (`portfolio-004`): Select **Vite**.
   - **Root Directory**:
     - Click **Edit** next to Root Directory and set it to the app you want to deploy:
       - `apps/razikuljoni-minimal-portfolio` (to deploy minimal portfolio)
       - `apps/dev-portfolio` (to deploy dev portfolio)
       - `apps/kronen` (to deploy kronen)
       - `apps/portfolio-003` (to deploy portfolio-003)
       - `apps/portfolio-004` (to deploy portfolio-004)
   - **Build Command**: `pnpm build`
   - **Output Directory**:
     - Next.js: `.next` (default)
     - Vite (`portfolio-004`): `dist`

4. **Deploy**:
   - Click **Deploy**. Vercel will build and deploy only the selected application from the monorepo.
