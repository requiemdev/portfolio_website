import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number; // seconds
  showBorder?: boolean;
  style?: React.CSSProperties;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#6d28d9", "#c084fc", "#6d28d9"],
  animationSpeed = 8,
  showBorder = false,
  style = {},
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  const baseStyle: React.CSSProperties = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "block",
    lineHeight: 1.05 /* small increase so descenders aren't clipped visually */,
    margin: 0,
    padding: 5,
    backgroundRepeat: "no-repeat",
    backgroundSize: "200% 100%",
    backgroundPosition: "0% 50%",
    animation: `gradient ${animationSpeed}s linear infinite`,
    WebkitAnimation: `gradient ${animationSpeed}s linear infinite`,
    ...style,
  };

  const strokeStyle: React.CSSProperties = showBorder
    ? { WebkitTextStroke: "0.4px rgba(0,0,0,0.25)" }
    : {};

  return (
    <span className={className} style={{ ...baseStyle, ...strokeStyle }}>
      {children}
    </span>
  );
}

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradient 8s linear infinite'
//       },
//     },
//   },
//   plugins: [],
// };
