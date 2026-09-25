# iForge Technologies Website

Next.js web platform for **iForge Technologies** — enterprise IT services, cloud solutions, infrastructure engineering, and consultancy.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), CSS Modules, Astra & Elementor design system
- **Components**: [shadcn/ui](https://ui.shadcn.com/) architecture, [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## Project Structure

```
iforge/
├── iforge-web/              # Next.js web application
│   ├── src/
│   │   ├── app/             # App Router pages (/services, /about, /contact, /quote, /community)
│   │   ├── components/      # React components (WpHeader, WpFooter, QuoteCalculator, ui/)
│   │   ├── data/            # Static site data and HTML content
│   │   └── lib/             # Utility functions (cn, etc.)
│   ├── public/              # High-resolution media, images & WordPress stylesheets
│   ├── package.json
│   ├── tsconfig.json
│   └── components.json      # shadcn configuration
├── docker-compose.yml       # Docker deployment setup
├── package.json             # Root monorepo scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or pnpm or yarn

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/k4ran909/iforge.git
   cd iforge
   ```

2. Install dependencies:
   ```bash
   npm install --prefix iforge-web
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```
