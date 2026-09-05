# Portfolio Websites Monorepo

Monorepo containing MD Razikul Islam Joni's portfolio applications. Built with `pnpm` workspaces.

---

## 📁 Serial Workspace Structure

```
portfolio-websites/
├── apps/
│   ├── portfolio-01-minimal/       # 01. Minimal Portfolio (Primary - Next.js 16)
│   ├── portfolio-02-dev/           # 02. Full Dev Portfolio (Next.js 16)
│   ├── portfolio-03-interactive/   # 03. Interactive Canvas & Terminal Portfolio (Next.js 15)
│   └── portfolio-04-vite-express/  # 04. Vite + React 19 + Express Architecture Portfolio
├── package.json                    # Monorepo configuration & unified CLI commands
├── pnpm-workspace.yaml             # pnpm monorepo workspace definition
├── .gitignore                      # Global git ignore configuration
└── README.md                       # Comprehensive monorepo & Vercel deployment guide
```

---

## 🚀 Commands Reference

### 1. Installation
```bash
pnpm install
```

### 2. Development Commands

- **Run ALL portfolios simultaneously (Standard Concurrently output)**:
  ```bash
  pnpm dev
  ```

- **Run Interactive Terminal Dashboard with Sidebar App Switcher**:
  ```bash
  pnpm dev:ui   # or pnpm dev:dash
  ```
  *Features: Sidebar navigation (`1-4`, `A`), isolated app logs vs combined log view, browser launch (`O`), restart app (`R`), clear logs (`C`).*

- **Run individual portfolios**:

  | # | Portfolio Name | Folder / Package | Command (Alias) |
  | :--- | :--- | :--- | :--- |
  | **01** | **Minimal Portfolio** *(Primary)* | `apps/portfolio-01-minimal` | `pnpm dev:01` (`pnpm dev:minimal`) |
  | **02** | **Dev Portfolio** | `apps/portfolio-02-dev` | `pnpm dev:02` (`pnpm dev:dev`) |
  | **03** | **Interactive Portfolio** | `apps/portfolio-03-interactive` | `pnpm dev:03` (`pnpm dev:interactive`) |
  | **04** | **Vite & Express Portfolio** | `apps/portfolio-04-vite-express` | `pnpm dev:04` (`pnpm dev:vite`) |

### 3. Build, Lint, Format & Check Commands

```bash
# Build all applications in workspace
pnpm build

# Lint all applications in workspace
pnpm lint

# Format codebase across all applications
pnpm format

# Run TypeScript & Lint checks across all applications
pnpm check
```

---

## 🌐 Deploying to Vercel

You can deploy any portfolio in this monorepo to Vercel individually.

### Deployment Steps:

1. **Push Monorepo to GitHub**:
   ```bash
   git add .
   git commit -m "feat: organize portfolio apps serially and configure commands"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to your Vercel Dashboard -> **Add New Project**.
   - Import your `portfolio-websites` GitHub repository.

3. **Configure Settings for Selected Portfolio**:
   - **Framework Preset**:
     - Next.js apps (`portfolio-01-minimal`, `portfolio-02-dev`, `portfolio-03-interactive`): Select **Next.js**.
     - Vite app (`portfolio-04-vite-express`): Select **Vite**.
   - **Root Directory**:
     - Set Root Directory to the app folder you wish to publish, e.g.:
       - `apps/portfolio-01-minimal`
       - `apps/portfolio-02-dev`
       - `apps/portfolio-03-interactive`
       - `apps/portfolio-04-vite-express`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next` (for Next.js) or `dist` (for Vite).

4. **Deploy**:
   - Click **Deploy**. Vercel will build and host the selected portfolio from your monorepo.
