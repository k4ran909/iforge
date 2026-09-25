"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  html: string;
  pageClass?: string;
}

export default function WpPageContent({ html, pageClass }: Props) {
  const router = useRouter();

  useEffect(() => {
    const container = document.getElementById("wp-main-content");
    if (!container) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#") && href !== "#") {
        e.preventDefault();
        router.push(href);
      }
    };

    container.addEventListener("click", handleLinkClick);

    // Initialize Elementor Swiper image carousels if present
    const initSwiper = () => {
      if (typeof window === "undefined") return false;
      const SwiperClass = (window as unknown as { Swiper?: any }).Swiper;
      if (!SwiperClass) return false;

      const carousels = container.querySelectorAll<HTMLElement>(".elementor-widget-image-carousel");
      if (carousels.length === 0) return true;

      carousels.forEach((widget) => {
        const swiperWrapper = widget.querySelector<HTMLElement>(".elementor-image-carousel-wrapper.swiper");
        if (!swiperWrapper || (swiperWrapper as any).swiper) return;

        let settings: any = {};
        try {
          const raw = widget.getAttribute("data-settings");
          if (raw) settings = JSON.parse(raw);
        } catch {
          // ignore
        }

        const prevEl = widget.querySelector<HTMLElement>(".elementor-swiper-button-prev");
        const nextEl = widget.querySelector<HTMLElement>(".elementor-swiper-button-next");
        const pagEl = widget.querySelector<HTMLElement>(".swiper-pagination");

        const slidesToShow = parseInt(settings.slides_to_show || "6", 10);
        const slidesToScroll = parseInt(settings.slides_to_scroll || "1", 10);
        const spacing = settings.image_spacing_custom?.size || 40;

        new SwiperClass(swiperWrapper, {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 20,
          loop: settings.infinite === "yes",
          autoplay: settings.autoplay === "yes" ? {
            delay: settings.autoplay_speed || 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          } : false,
          speed: settings.speed || 600,
          navigation: {
            prevEl: prevEl,
            nextEl: nextEl,
          },
          pagination: {
            el: pagEl,
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: Math.min(3, slidesToShow),
              spaceBetween: 30,
            },
            768: {
              slidesPerView: Math.min(5, slidesToShow),
              spaceBetween: spacing,
            },
            1024: {
              slidesPerView: slidesToShow,
              slidesPerGroup: slidesToScroll,
              spaceBetween: spacing,
            },
          },
        });
      });
      return true;
    };

    let timer: NodeJS.Timeout | null = null;
    if (!initSwiper()) {
      let attempts = 0;
      timer = setInterval(() => {
        attempts++;
        if (initSwiper() || attempts > 20) {
          if (timer) clearInterval(timer);
        }
      }, 150);
    }

    return () => {
      container.removeEventListener("click", handleLinkClick);
      if (timer) clearInterval(timer);
    };
  }, [router]);

  return (
    <div
      id="wp-main-content"
      style={{ display: "contents" }}
      className={pageClass || "wp-content-wrapper"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
