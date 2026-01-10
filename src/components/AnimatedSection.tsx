import { ReactNode, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  // Assign ref to container
  const setRef = (node: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  const animationClasses = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-left": "-translate-x-8 opacity-0",
    "fade-right": "translate-x-8 opacity-0",
    "scale": "scale-95 opacity-0",
    "fade": "opacity-0",
  };

  const visibleClasses = "translate-y-0 translate-x-0 scale-100 opacity-100";

  return (
    <div
      ref={setRef}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? visibleClasses : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
