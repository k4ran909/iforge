import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@/components/HeaderAndDock.css";
import WpHeader from "@/components/WpHeader";
import WpFooter from "@/components/WpFooter";
import { siteConfig } from "@/data/siteData";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.subheadline,
  icons: {
    icon: "/images/cropped-iforge-logo2-32x32.png",
    apple: "/images/cropped-iforge-logo2-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900|Inter+Tight:100,200,300,400,500,600,700,800,900|Roboto:100,300,400,500,700,900|Roboto+Slab:100,300,400,500,700,900|Montserrat:100,200,300,400,500,600,700,800,900|Oxygen:300,400,700&display=swap" 
          rel="stylesheet" 
        />

        {/* Mirrored Core Astra & Elementor Stylesheets */}
        <link rel="stylesheet" href="/wp-content/themes/astra/assets/css/minified/main.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/header-footer-elementor/inc/widgets-css/frontend.css" />
        <link rel="stylesheet" href="/wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementor.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/frontend.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/lib/font-awesome/css/v4-shims.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-heading.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-image-box.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/conditionals/e-swiper.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-image-carousel.min.css" />
        <link rel="stylesheet" href="/wp-assets/css/astra-addon-6aa405044ea046-90029287.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-image.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-icon-list.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/widget-social-icons.min.css" />
        <link rel="stylesheet" href="/wp-content/plugins/elementor/assets/css/conditionals/apple-webkit.min.css" />

        {/* Global Kit & Header/Footer Post CSS */}
        <link rel="stylesheet" href="/wp-assets/css/post-517.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-443.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-13558.css" />

        {/* Astra Theme Settings & Dynamic Pro Styles */}
        <link rel="stylesheet" href="/wp-assets/css/global-styles-inline-css.css" />
        <link rel="stylesheet" href="/wp-assets/css/astra-theme-css-inline-css.css" />
        <link rel="stylesheet" href="/wp-assets/css/astra-addon-css-inline-css.css" />
        <link rel="stylesheet" href="/wp-assets/css/astra-addon-megamenu-dynamic-inline-css.css" />
        <link rel="stylesheet" href="/wp-assets/css/inline-style-9.css" />

        {/* Per-Page Post CSS */}
        <link rel="stylesheet" href="/wp-assets/css/post-14868.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2455.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-548.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2607.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2609.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2611.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2613.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2615.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-2617.css" />
        <link rel="stylesheet" href="/wp-assets/css/post-8733.css" />
      </head>
      <body className="home wp-singular page-template-default page wp-custom-logo wp-embed-responsive wp-theme-astra latepoint ehf-footer ehf-template-astra ehf-stylesheet-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.9 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header ast-full-width-layout ast-inherit-site-logo-sticky ast-primary-sticky-enabled ast-normal-title-enabled elementor-default elementor-template-full-width elementor-kit-517 elementor-page astra-addon-4.0.1" suppressHydrationWarning>
        <div id="page" className="hfeed site">
          <WpHeader />
          {children}
          <WpFooter />
        </div>
        <Script 
          src="/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
