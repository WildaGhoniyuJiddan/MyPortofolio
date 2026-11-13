"use client";

import { useEffect } from "react";

// Fase 3 (PLAN-REDESIGN-2026-11-13.md Bagian 3 #3): Experience focus scroll.
// Rows of the activity log that cross the middle band of the .page-scroll
// viewport get .is-locked (bright cyan, lit node); all other rows stay dimmed
// under .log-focus-on. The vertical route line fill is a CSS ::after on
// .activity-log scaled by the --log-progress custom property, driven here
// from the scroller's scroll position. IntersectionObserver with the
// scroller as root is simpler than a ScrollTrigger for discrete row state;
// rows are re-bound via MutationObserver because the log search re-renders
// them. Color/opacity only — no layout is ever moved.
export default function LogFocus() {
  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".page-scroll");
    const log = document.querySelector<HTMLElement>("#experience .activity-log");
    if (!scroller || !log || !("IntersectionObserver" in window)) return;

    log.classList.add("log-focus-on");

    const rowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("is-locked", entry.isIntersecting));
      },
      { root: scroller, rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    const observed = new Set<Element>();
    const bindRows = () => {
      const rows = new Set<Element>(Array.from(log.querySelectorAll(".log-row")));
      observed.forEach((row) => {
        if (!rows.has(row)) {
          rowObserver.unobserve(row);
          observed.delete(row);
        }
      });
      rows.forEach((row) => {
        if (!observed.has(row)) {
          rowObserver.observe(row);
          observed.add(row);
        }
      });
    };
    bindRows();
    const mutation = new MutationObserver(bindRows);
    mutation.observe(log, { childList: true });

    let ticking = false;
    const updateProgress = () => {
      ticking = false;
      const view = scroller.getBoundingClientRect();
      const box = log.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (view.top + view.height / 2 - box.top) / box.height));
      log.style.setProperty("--log-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mutation.disconnect();
      rowObserver.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      log.classList.remove("log-focus-on");
      log.style.removeProperty("--log-progress");
    };
  }, []);

  return null;
}
