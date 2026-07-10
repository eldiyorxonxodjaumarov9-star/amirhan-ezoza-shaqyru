"use client";

import { useEffect } from "react";

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.8, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    };

    init();

    return () => {
      isMounted = false;
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return <>{children}</>;
}
