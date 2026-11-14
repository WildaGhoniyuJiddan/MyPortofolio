"use client";

import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";

// Fase 3 (PLAN-REDESIGN-2026-11-13.md Bagian 4 #4): sticky mini-CTA. Appears
// once the hero has scrolled out of the .page-scroll viewport and hides
// again while the contact section is on screen, so it never duplicates the
// contact block. It also hides over the featured build, whose own action
// buttons sit where the CTA floats. Positioned absolute inside .control-room (see globals.css)
// above the ticker; on mobile it sits above the bottom nav. The entry is a
// CSS opacity/transform transition — under prefers-reduced-motion the global
// rule collapses transition durations, so it simply appears statically.
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".page-scroll");
    const hero = document.getElementById("command-center");
    const contact = document.getElementById("contact");
    const featured = document.querySelector<HTMLElement>(".featured-section");
    if (!scroller || !hero || !contact) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const view = scroller.getBoundingClientRect();
      const pastHero = hero.getBoundingClientRect().bottom <= view.top + 4;
      const box = contact.getBoundingClientRect();
      const contactVisible = box.top < view.bottom && box.bottom > view.top;
      const fbox = featured?.getBoundingClientRect();
      const featuredVisible = !!fbox && fbox.top < view.bottom && fbox.bottom > view.top;
      setVisible(pastHero && !contactVisible && !featuredVisible);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="/cv.pdf" download="Wilda-Ghoniyu-Jiddan-CV.pdf" tabIndex={visible ? 0 : -1}>
        <Download /> DOWNLOAD CV
      </a>
      <button type="button" onClick={goContact} tabIndex={visible ? 0 : -1}>
        <Mail /> HUBUNGI
      </button>
    </div>
  );
}
