import React from "react";

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

type LogoLoopStyle = React.CSSProperties & {
  "--logo-gap": string;
  "--logo-height": string;
  "--logo-duration": string;
  "--logo-direction": "normal" | "reverse";
  "--logo-fade": string;
};

const toCssLength = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

function Logo({
  item,
  duplicate,
  scaleOnHover,
}: {
  item: LogoItem;
  duplicate: boolean;
  scaleOnHover: boolean;
}) {
  const label =
    "node" in item
      ? item.ariaLabel ?? item.title
      : item.alt ?? item.title;

  const content =
    "node" in item ? (
      <span aria-hidden={Boolean(item.href)}>{item.node}</span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        alt={item.alt ?? ""}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

  return (
    <li className={scaleOnHover ? "logo-loop__item logo-loop__item--scale" : "logo-loop__item"}>
      {item.href && !duplicate ? (
        <a
          href={item.href}
          aria-label={label ?? "Logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        <span>{content}</span>
      )}
    </li>
  );
}

export default function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor = "#000",
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className = "",
  style,
}: LogoLoopProps) {
  const duration = Math.max(8, (logos.length * (logoHeight + gap)) / Math.max(1, Math.abs(speed)));
  const loopStyle: LogoLoopStyle = {
    ...style,
    width: toCssLength(width),
    "--logo-gap": `${gap}px`,
    "--logo-height": `${logoHeight}px`,
    "--logo-duration": `${duration}s`,
    "--logo-direction": direction === "left" ? "normal" : "reverse",
    "--logo-fade": fadeOutColor,
  };

  return (
    <div
      className={`logo-loop ${pauseOnHover ? "logo-loop--pause" : ""} ${fadeOut ? "logo-loop--fade" : ""} ${className}`}
      style={loopStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="logo-loop__track">
        {[0, 1, 2].map((copyIndex) => (
          <ul key={copyIndex} aria-hidden={copyIndex > 0}>
            {logos.map((item, itemIndex) => (
              <Logo
                key={`${copyIndex}-${itemIndex}`}
                item={item}
                duplicate={copyIndex > 0}
                scaleOnHover={scaleOnHover}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
