"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Fase 1 foundation (PLAN-REDESIGN-2026-11-13.md Bagian 6):
// Lenis smooth scroll driven by the GSAP ticker, synced to ScrollTrigger.
// The scroll container is .page-scroll (see page.tsx / globals.css), NOT the
// window, so wrapper + scroller defaults point at it. Touch stays native
// (syncTouch off) pending the Fase 4 iOS gate. Fully disabled when the user
// prefers reduced motion. No pins/parallax yet — those land in Fase 2/3.
export default function ScrollEngine() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scroller = document.querySelector<HTMLElement>(".page-scroll");
    if (!scroller) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ scroller });

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller,
      prevent: (node) => Boolean(node.closest(".project-drawer, .terminal-window")),
    });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
