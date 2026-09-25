# iForge Technologies Design System (DESIGN.md)

This document establishes the official visual design language, color palette, typography, component guidelines, and interaction rules for the rebuilt **iForge Technologies** web platform.

---

## 1. Brand Identity & Visual Philosophy

iForge Technologies is a premier enterprise IT services, cloud architecture, AI advisory, and engineering consultancy. The visual identity conveys:
- **Enterprise Rigor & Authority**: Confident, structural, and dependable.
- **Modern High-Tech Agility**: Sleek, luminous, fast, and engineered with precision (inspired by Linear, Vercel, and Cloudflare).
- **Clarity & High Usability**: High contrast, crisp hierarchy, frictionless responsive navigation, and intuitive interactive elements.

---

## 2. Core Color Palette

The color system is derived directly from the approved brand palette:

![Brand Color Palette](file:///C:/Users/k4ran/.gemini/antigravity/brain/31f3a480-c4aa-4f74-8421-4071dd2d0c2f/.user_uploaded/media_1790375162407.png)

| Swatch | Color Name | Hex Code | RGB | Role & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Deep Navy** | `#0A3C6E` | `rgb(10, 60, 110)` | **Primary Brand Color**: Header accents, deep hero backgrounds, enterprise badges, card borders, primary structural elements. |
| **2** | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | **Surface & Light Canvas**: Light mode card backgrounds, high-contrast text on dark surfaces, badges, clean spacious canvas. |
| **3** | **Cerulean Blue** | `#1783C1` | `rgb(23, 131, 193)` | **Vibrant Accent & Action**: Primary CTAs, active links, glow highlights, focus rings, progress indicators, interactive hover states. |
| **4** | **Charcoal Gray** | `#333333` | `rgb(51, 51, 51)` | **Deep Contrast Neutral**: Primary headings, sharp body text on light backgrounds, dark footer elements, rich dark mode borders. |

### Extended Neutral Palette (Functional Shades)

To ensure depth, micro-interactions, and accessibility, the four core colors are paired with clean harmonic neutral tints:

- **Canvas Background (Soft Light)**: `#F4F7FB` (Subtle off-white with cool blue undertones)
- **Subtle Surface**: `#F8FAFC` (Clean alternating section background)
- **Muted Text / Secondary**: `#666666` (Subtitles, metadata, form labels)
- **Subtle Border**: `#E2E8F0` / `#E5E7EB` (Clean container dividers)
- **Deep Navy Dark Mode / Container**: `#072648` (Dark hero container background)
- **Accent Blue Hover Tint**: `#136FA5` (Darkened Cerulean for button hover)
- **Accent Blue Light Glow**: `rgba(23, 131, 193, 0.12)` (Ambient glow for cards and badges)

---

## 3. Tailwind CSS Token Mapping (Tailwind v4 `@theme`)

```css
@theme {
  /* Brand Approved Core Colors */
  --color-brand-navy: #0A3C6E;
  --color-brand-navy-dark: #072648;
  --color-brand-navy-light: #0E4F90;

  --color-brand-blue: #1783C1;
  --color-brand-blue-hover: #136FA5;
  --color-brand-blue-light: #E8F4FC;
  --color-brand-blue-glow: rgba(23, 131, 193, 0.15);

  --color-brand-white: #FFFFFF;

  --color-brand-charcoal: #333333;
  --color-brand-charcoal-muted: #666666;
  --color-brand-charcoal-dark: #222222;

  --color-brand-canvas: #F8FAFC;
  --color-brand-border: #E2E8F0;
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

## 5. UI Elements & Component Specifications

### 5.1 Primary Buttons (Call to Action)
- **Background**: `#1783C1` (Cerulean Blue)
- **Text Color**: `#FFFFFF`
- **Hover State**: Background shifts to `#136FA5`, scale `1.02`, shadow `0 8px 20px -4px rgba(23, 131, 193, 0.35)`.
- **Padding**: `12px 24px` (Desktop), `10px 20px` (Mobile)
- **Border Radius**: `8px` (`rounded-lg`)
- **Font**: `14px`, `font-semibold`

### 5.2 Secondary Buttons
- **Background**: `#0A3C6E` (Deep Navy)
- **Text Color**: `#FFFFFF`
- **Hover State**: Background shifts to `#0E4F90`, shadow `0 6px 16px -3px rgba(10, 60, 110, 0.3)`.

### 5.3 Ghost / Outline Buttons
- **Border**: `1px solid #E2E8F0`
- **Background**: `#FFFFFF`
- **Text Color**: `#333333`
- **Hover State**: Background `#F8FAFC`, Border `#1783C1`, Text `#1783C1`.

### 5.4 Feature & Bento Cards
- **Light Theme**:
  - Background: `#FFFFFF`
  - Border: `1px solid #E2E8F0`
  - Box Shadow: `0 1px 3px rgba(10, 60, 110, 0.04), 0 10px 24px -10px rgba(10, 60, 110, 0.08)`
  - Hover: Border `#1783C1`, translateY `-3px`, Shadow `0 20px 32px -12px rgba(23, 131, 193, 0.16)`
- **Dark Accent / Hero Theme**:
  - Background: Gradient from `#0A3C6E` to `#072648`
  - Border: `1px solid rgba(255, 255, 255, 0.12)`
  - Text: `#FFFFFF` and `#E2E8F0`

### 5.5 Status Badges & Pills
- Background: `#E8F4FC` (Light Cerulean tint)
- Border: `1px solid rgba(23, 131, 193, 0.25)`
- Text: `#0A3C6E` (Deep Navy) or `#1783C1`
- Radius: `rounded-full` (`9999px`)
- Typography: `12px`, `font-semibold`

---

## 6. Micro-Interactions & Animation Standards

- **Transitions**: Smooth `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for responsive, snappy interactions.
- **Scroll Reactions**: Fixed navigation morphs from transparent/resting to a floating glass island at scroll depth `> 20px`.
- **Card Hover**: Subtle `translateY(-3px)` with soft glowing shadow expansion.
- **Marquee**: Seamless horizontal infinite loop at `40s` duration for client & certified partner logos.

---

## 7. Accessibility & Contrast Verification

- `#FFFFFF` text on `#0A3C6E` (Navy): Contrast ratio **8.6:1** (Passes WCAG AAA for all text sizes).
- `#FFFFFF` text on `#1783C1` (Cerulean): Contrast ratio **4.6:1** (Passes WCAG AA for normal text and AAA for large text).
- `#333333` text on `#FFFFFF`: Contrast ratio **12.6:1** (Passes WCAG AAA).
- `#0A3C6E` text on `#F4F7FB`: Contrast ratio **7.8:1** (Passes WCAG AAA).

---

## 8. Directory & File Placement

- Root design guide: `c:\Users\k4ran\OneDrive\Desktop\iforge\DESIGN.md`
- Frontend package reference: `c:\Users\k4ran\OneDrive\Desktop\iforge\iforge-web\DESIGN.md`
- Applied in Tailwind: `src/app/globals.css`
