import type { CSSProperties, ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
}

export default function GradientText({
  children,
  className = "",
  colors = ["#6d28d9", "#c084fc", "#6d28d9"],
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  const style: CSSProperties = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "block",
    lineHeight: 1.05,
    margin: 0,
    padding: "0.08em 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "200% 100%",
    backgroundPosition: "50% 50%",
  };

  return (
    <span className={`gradient-text ${className}`} style={style}>
      {children}
    </span>
  );
}
