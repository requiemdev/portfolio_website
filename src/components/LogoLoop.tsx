import type { CSSProperties, ReactNode } from "react";

export type LogoItem = {
  node: ReactNode;
  title: string;
  href: string;
};

type Props = {
  logos: LogoItem[];
  logoHeight: number;
  gap: number;
  ariaLabel: string;
};

type LoopStyle = CSSProperties & {
  "--logo-gap": string;
  "--logo-height": string;
  "--logo-duration": string;
};

export default function LogoLoop({
  logos,
  logoHeight,
  gap,
  ariaLabel,
}: Props) {
  const style: LoopStyle = {
    "--logo-gap": `${gap}px`,
    "--logo-height": `${logoHeight}px`,
    "--logo-duration": `${Math.max(8, (logos.length * (logoHeight + gap)) / 25)}s`,
  };

  return (
    <div
      className="logo-loop logo-loop--pause"
      style={style}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="logo-loop__track">
        {[false, true, true].map((duplicate, copyIndex) => (
          <ul key={copyIndex} aria-hidden={duplicate}>
            {logos.map((item) => (
              <li
                className="logo-loop__item logo-loop__item--scale"
                key={`${copyIndex}-${item.title}`}
              >
                {duplicate ? (
                  <span>{item.node}</span>
                ) : (
                  <a
                    href={item.href}
                    aria-label={item.title}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span aria-hidden="true">{item.node}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
