"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";
  as?: "div" | "li" | "section" | "article" | "header";
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  as = "div",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setIsReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      data-ready={isReady}
      data-visible={isVisible}
      data-variant={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
