# iForge Technologies Design System (DESIGN.md)

This document establishes the official visual design language, dual Light/Dark color palette, typography, component guidelines, and interaction rules for the rebuilt **iForge Technologies** web platform.

---

## 1. Brand Identity & Visual Philosophy

iForge Technologies is a premier enterprise IT services, cloud architecture, AI & ML advisory, and engineering consultancy. The visual identity conveys:
- **Enterprise Rigor & Authority**: Confident, structural, and dependable.
- **Modern High-Tech Agility**: Sleek, luminous, fast, and engineered with precision (inspired by Linear, Vercel, and Cloudflare).
- **Clarity & High Usability**: High contrast, crisp hierarchy, frictionless responsive navigation, and intuitive interactive elements.

---

## 2. Core Color Palette (Light & Dark Theme Specification)

The official color system is derived directly from the approved brand palette across both light and dark display modes:

| Swatch | Color Name | Hex Code | Light Theme Usage | Dark Theme Usage |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Black** | `#000000` | Primary headings, dark accent containers, high-contrast badges | **Default Canvas & Background**: Deep pure black background, header backdrop, why-us grid |
| **2** | **Crimson Red** | `#E61E32` | Primary CTAs, active links, SonarGrid wavefront, active tabs | **Accent & Illumination**: Wavefront pulses, glow shadows, primary buttons, KPI callouts |
| **3** | **Pure White** | `#FFFFFF` | Default canvas background, card surfaces, clean spacing | **Primary Headings & High Contrast Text**: Display headings, active icon glyphs |
| **4** | **Silver / Steel** | `#B3B3B3` | Secondary text, borders, scrollbar thumb | **Secondary Typography & Dividers**: Subtext, muted metadata, subtle container borders |

### Extended Theme Tokens

- **Light Canvas**: `#FFFFFF` / `#FAFAFA`
- **Dark Canvas**: `#000000` / `#0A0A0A`
- **Light Cards / Surfaces**: `#FFFFFF` with `#E5E7EB` border
- **Dark Cards / Surfaces**: `#0D0D0D` / `#141414` with `#262626` border
- **Light Pill / Glow**: `#FDE8EA`
- **Dark Pill / Glow**: `rgba(230, 30, 50, 0.15)`
- **Crimson Hover Tint**: `#C81426` (Darkened Crimson for button hover)

---

## 3. Tailwind CSS Token Mapping (Tailwind v4 `@theme`)

```css
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #FFFFFF;
  --foreground: #000000;
  --muted: #F8F9FA;
  --muted-foreground: #666666;
  --border: #E5E7EB;
  --accent: #FDE8EA;
  --card: #FFFFFF;
  --card-foreground: #000000;
}

.dark {
  --background: #000000;
  --foreground: #FFFFFF;
  --muted: #111111;
  --muted-foreground: #B3B3B3;
  --border: #262626;
  --accent: rgba(230, 30, 50, 0.15);
  --card: #0A0A0A;
  --card-foreground: #FFFFFF;
}

@theme {
  /* Brand Approved Core Colors */
  --color-primary: #E61E32;
  --color-primary-foreground: #FFFFFF;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-ring: #E61E32;

  --color-brand-black: #000000;
  --color-brand-crimson: #E61E32;
  --color-brand-crimson-hover: #C81426;
  --color-brand-crimson-light: #FDE8EA;
  --color-brand-crimson-glow: rgba(230, 30, 50, 0.2);
  --color-brand-white: #FFFFFF;
  --color-brand-silver: #B3B3B3;
}
```

---

## 4. Typography Scale & Font System

- **Display & Headings Font**: `Plus Jakarta Sans`, sans-serif (Weights: `600`, `700`, `800`)
- **Body & UI Font**: `Inter`, sans-serif (Weights: `400`, `500`, `600`)
- **Code & Tech Metrics**: `ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`

| Level | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display 1** | `48px` - `60px` | `800` (Extrabold) | `-0.03em` | Main Hero Headline |
| **Display 2** | `36px` - `44px` | `700` (Bold) | `-0.025em` | Page Titles & Section Headings |
| **Heading 1** | `28px` - `32px` | `700` (Bold) | `-0.02em` | Card Group Headings, Service Titles |
| **Heading 2** | `20px` - `24px` | `600` (Semibold) | `-0.015em` | Bento Card Headings, Feature Titles |
| **Body Large** | `17px` - `18px` | `400` / `500` | `-0.01em` | Lead Paragraphs, Hero Subtitles |
| **Body Regular** | `15px` - `16px` | `400` (Normal) | `normal` | Standard Body Copy, Descriptions |
| **Body Small** | `13px` - `14px` | `500` (Medium) | `normal` | Navigation Links, Table Cells, Metadata |
| **Caption / Badge**| `11px` - `12px` | `600` (Semibold) | `0.04em` (Uppercase) | Status Badges, KPI Labels |

---

## 5. 5 Core Practice Disciplines

1. **AI & ML** (`/services/ai-ml`): Agentic AI architectures, RAG pipelines, LLM fine-tuning, computer vision, predictive analytics, enterprise model governance.
2. **Cloud Services** (`/services/cloud-services`): Multi-cloud architecture (AWS, GCP, Azure), automated migration pipelines, FinOps cost containment, Kubernetes orchestration.
3. **IT Infrastructure** (`/services/it-infrastructure`): Zero-downtime virtualization, hyper-converged infrastructure, enterprise storage, SD-WAN, unified systems monitoring.
4. **Cybersecurity Services** (`/services/cybersecurity`): Zero-trust security frameworks, continuous automated VAPT, SOC 2 / ISO 27001 readiness, real-time threat intelligence.
5. **Application Development** (`/services/application-development`): High-concurrency enterprise web apps, mission-critical real-time dashboards, SaaS platforms, cross-platform mobile apps (React Native/Flutter), and low-latency API microservices.

---

## 6. UI Elements & Component Specifications

### 6.1 Theme Toggle
- Integrated directly into the top global `Navbar` (accessible on desktop and mobile).
- Stores user preference in `localStorage("iforge-theme")` with automated fallback to system preference.
- Anti-flicker script embedded in `<head>` guarantees instantaneous, flicker-free rendering.

### 6.2 Primary Buttons (Call to Action)
- **Background**: `#E61E32` (Crimson Red)
- **Text Color**: `#FFFFFF`
- **Hover State**: Background shifts to `#C81426`, scale `1.02`, shadow `0 8px 20px -4px rgba(230, 30, 50, 0.35)`.
- **Border Radius**: `12px` (`rounded-xl`)

### 6.3 Bento Grid & Cards
- **Light Theme**: `#FFFFFF` surface with `#E5E7EB` border.
- **Dark Theme**: `#0D0D0D` deep carbon surface with `#262626` border.
- **Hover**: Subtle lift (`translate-y-[-2px]`), border illuminates in `#E61E32`.

### 6.4 SonarGrid Hero Visualizer
- **Pulse Wavefront**: `#E61E32` (Crimson Red).
- Dynamically adapts canvas background to `var(--color-background)`.
