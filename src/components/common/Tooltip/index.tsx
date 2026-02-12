"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  delay?: number;
}

type Placement = "top" | "bottom" | "left" | "right";
const placementClasses: Record<Placement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "top-1/2 right-full -translate-y-1/2 mr-2",
  right: "top-1/2 left-full -translate-y-1/2 ml-2",
};

export default function Tooltip({
  content,
  children,
  placement = "top",
  className = "",
  delay = 80,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setId(`tooltip-${Math.random().toString(36).slice(2)}`);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setVisible(false), 20);
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      aria-describedby={id}
    >
      {children}
      {visible && (
        <div
          id={id}
          role="tooltip"
          className={`pointer-events-none absolute z-50 rounded-xl border border-white/20 bg-black/90 px-3 py-1 text-xs font-medium text-white shadow-lg transition-opacity duration-150 ${
            placementClasses[placement]
          }`}
        >
          {content}
          <span
            aria-hidden
            className="absolute h-2 w-2 rotate-45 border border-white/10 bg-black/90"
            style={getArrowStyle(placement)}
          />
        </div>
      )}
    </div>
  );
}

function getArrowStyle(placement: TooltipProps["placement"]): CSSProperties {
  switch (placement) {
    case "top":
      return { bottom: -3, left: "50%", transform: "translateX(-50%)" };
    case "bottom":
      return {
        top: -3,
        left: "50%",
        transform: "translateX(-50%) rotate(180deg)",
      };
    case "left":
      return {
        right: -3,
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
      };
    case "right":
      return {
        left: -3,
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
      };
    default:
      return { bottom: -3, left: "50%", transform: "translateX(-50%)" };
  }
}
