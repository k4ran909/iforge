# iForge Technologies Design System (DESIGN.md)

This document establishes the official visual design language, color palette, typography, component guidelines, and interaction rules for the rebuilt **iForge Technologies** web platform.

---

## 1. Brand Identity & Visual Philosophy

iForge Technologies is a premier enterprise IT services, cloud architecture, AI & ML advisory, and engineering consultancy. The visual identity conveys:
- **Enterprise Rigor & Authority**: Confident, structural, and dependable.
- **Modern High-Tech Agility**: Sleek, luminous, fast, and engineered with precision (inspired by Linear, Vercel, and Cloudflare).
- **Clarity & High Usability**: High contrast, crisp hierarchy, frictionless responsive navigation, and intuitive interactive elements.

---

## 2. Core Color Palette

The official color system is derived directly from the approved brand palette:

| Swatch | Color Name | Hex Code | RGB | Role & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Black** | `#000000` | `rgb(0, 0, 0)` | **Primary Structural & Typography**: High-contrast headings, dark mode hero containers, why-us grid background, deep footer, primary badges, high-impact structural borders. |
| **2** | **Crimson Red** | `#E61E32` | `rgb(230, 30, 50)` | **Vibrant Accent & Action**: Primary CTAs, active links, SonarGrid wavefront illumination, KPI highlights, focus rings, progress indicators, interactive hover states. |
| **3** | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | **Surface & Light Canvas**: Light mode card backgrounds, high-contrast text on dark surfaces, badges, clean spacious canvas. |
| **4** | **Silver / Steel** | `#B3B3B3` | `rgb(179, 179, 179)` | **Neutral & Divider Accents**: Subtle borders, scrollbar thumbs, secondary metadata, inactive dots, structural delimiters. |

### Extended Neutral Palette (Functional Shades)

To ensure depth, micro-interactions, and accessibility, the four core colors are paired with clean harmonic tints:

- **Canvas Background (Soft Light)**: `#FFFFFF` / `#FAFAFA`
- **Subtle Surface**: `#F8FAFC` / `#F5F5F5` (Clean alternating section background)
- **Muted Text / Secondary**: `#666666` (Subtitles, metadata, form labels)
- **Subtle Border**: `#E5E7EB` / `#E2E8F0` with `#B3B3B3` accents
- **Deep Carbon / Dark Container**: `#0A0A0A` / `#000000` (Dark hero and why-us container background)
- **Crimson Hover Tint**: `#C81426` (Darkened Crimson for button hover)
- **Crimson Light Pill / Glow**: `#FDE8EA` / `rgba(230, 30, 50, 0.12)` (Ambient glow for cards and badges)

---

## 3. Tailwind CSS Token Mapping (Tailwind v4 `@theme`)

```css
@theme {
  /* Brand Approved Core Colors */
  --color-primary: #E61E32;
  --color-primary-foreground: #FFFFFF;

  --color-foreground: #000000;
  --color-background: #FFFFFF;

  --color-brand-black: #000000;
  --color-brand-crimson: #E61E32;
  --color-brand-crimson-hover: #C81426;
  --color-brand-crimson-light: #FDE8EA;
  --color-brand-crimson-glow: rgba(230, 30, 50, 0.15);

  --color-brand-white: #FFFFFF;
  --color-brand-silver: #B3B3B3;

  --color-brand-canvas: #FAFAFA;
  --color-brand-border: #E5E7EB;
}
```

---

## 4. Typography Scale & Font System

- **Display & Headings Font**: `Plus Jakarta Sans`, sans-serif (Weights: `600`, `700`, `800`)
  - Modern geometric letterforms, clean contemporary curves, polished enterprise tech presence.
- **Body & UI Font**: `Inter`, sans-serif (Weights: `400`, `500`, `600`)
  - Industry gold-standard for readability, forms, navigation, and dense data presentation.
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

### 6.1 Primary Buttons (Call to Action)
- **Background**: `#E61E32` (Crimson Red)
- **Text Color**: `#FFFFFF`
- **Hover State**: Background shifts to `#C81426`, scale `1.02`, shadow `0 8px 20px -4px rgba(230, 30, 50, 0.35)`.
- **Padding**: `12px 24px` (Desktop), `10px 20px` (Mobile)
- **Border Radius**: `12px` (`rounded-xl`)
- **Font**: `14px`, `font-semibold`

### 6.2 Secondary / Ghost Buttons
- **Background**: `#FFFFFF` or `bg-white/10`
- **Border**: `border border-neutral-200`
- **Text Color**: `#000000` (or `#FFFFFF` on dark backgrounds)
- **Hover State**: Border shifts to `#E61E32` or `#FFFFFF`

### 6.3 Bento Grid & Cards
- **Background**: Light surfaces use `#FFFFFF` on `#FAFAFA`, dark highlights use `#000000`.
- **Border**: `border border-neutral-200` with subtle `#B3B3B3` accents.
- **Hover**: Subtle lift (`translate-y-[-2px]`), border shifts to `#E61E32/50`.

### 6.4 SonarGrid Hero Visualizer
- **Wavefront Pulse Color**: `#E61E32`
- **Canvas Dot Grid**: Adaptive primary dot radius with resting opacity `0.15` and wavefront peak `1.0`.
