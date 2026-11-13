"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fase 2 (PLAN-REDESIGN-2026-11-13.md Bagian 3 #1): hero parallax
// "Descent into the Network". All triggers inherit the .page-scroll scroller
// from ScrollTrigger.defaults (app/scroll-engine.tsx) — never the window.
// Desktop (>=901px): the hero section is 200% tall and .hero-stage is pinned
// with pinType "transform" (the only pin mode that stays aligned inside a
// non-window scroller offset by the topbar/rail) while the layers drift at
// different speeds and the scan status flips SCANNING -> SIGNAL LOCKED.
// Mobile (<=900px): no pin — the stacked flow layout stays intact and only a
// light scrub on the skyline + status runs. Reduced motion: nothing is
// created and the CSS collapses the hero back to a static 100% section.
// Parallax targets .hero-drift wrappers because .map-copy/.signal-card carry
// a CSS entrance animation whose filled keyframes would override GSAP
// transforms on the same element. Transform/opacity only throughout.
export default function HeroScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.querySelector<HTMLElement>(".command-center");
    const stage = section?.querySelector<HTMLElement>(".hero-stage");
    if (!section || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: stage,
          pinType: "transform",
          pinSpacing: false,
          anticipatePin: 1,
        },
      });
      tl.fromTo(".hero-layer--sky", { y: -30 }, { y: 30 }, 0)
        .fromTo(".hero-layer--skyline", { y: 34 }, { y: -18 }, 0)
        .fromTo(".command-center .map-field", { y: 0 }, { y: -64 }, 0)
        .fromTo(".command-center .map-copy .hero-drift", { y: 0 }, { y: -30 }, 0)
        .fromTo(".command-center .signal-card .hero-drift", { y: 0 }, { y: -44 }, 0)
        .fromTo(".hero-scan__fill", { scaleX: 0 }, { scaleX: 1 }, 0)
        .to(".hero-scan__line--scanning", { opacity: 0 }, 0.78)
        .fromTo(".hero-scan__line--locked", { opacity: 0 }, { opacity: 1 }, 0.82);
    });

    mm.add("(max-width: 900px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      tl.fromTo(".hero-layer--skyline", { y: 16 }, { y: -12 }, 0)
        .fromTo(".hero-scan__fill", { scaleX: 0 }, { scaleX: 1 }, 0)
        .to(".hero-scan__line--scanning", { opacity: 0 }, 0.7)
        .fromTo(".hero-scan__line--locked", { opacity: 0 }, { opacity: 1 }, 0.74);
    });

    return () => mm.revert();
  }, []);

  return null;
}
