"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fase 3 (PLAN-REDESIGN-2026-11-13.md Bagian 3 #2, Keputusan 4): "Signal
// Route" — on desktop (>=901px) the featured project stage in
// #project-network is pinned inside the .page-scroll scroller (pinType
// "transform", same pattern as app/hero-scroll.tsx) and vertical scroll is
// translated into a horizontal run across the 4 featured cards. The pin
// range is exactly the track overflow (scrollWidth - viewport), so there is
// no dead spacer. Mobile and reduced motion: gsap.matchMedia never matches /
// the effect returns early, no .is-route class is added, and the cards keep
// the plain stacked grid layout. Filter changes rebuild the track nodes, so
// a MutationObserver refreshes ScrollTrigger measurements.
export default function RouteScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.querySelector<HTMLElement>("#project-network");
    const stage = section?.querySelector<HTMLElement>(".route-stage");
    const viewport = section?.querySelector<HTMLElement>(".route-viewport");
    const track = section?.querySelector<HTMLElement>(".route-track");
    if (!section || !stage || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      section.classList.add("is-route");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.5,
          pin: stage,
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(track, { x: 0 }, { x: () => -distance() }, 0)
        .fromTo(".route-progress__fill", { scaleX: 0 }, { scaleX: 1 }, 0);

      const observer = new MutationObserver(() => ScrollTrigger.refresh());
      observer.observe(track, { childList: true });
      return () => {
        observer.disconnect();
        section.classList.remove("is-route");
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
