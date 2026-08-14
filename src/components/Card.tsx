import type { HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
  }
>;

export default function Card({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={`portfolio-card group relative w-full h-auto min-h-48 md:h-full md:min-h-0 min-w-0 mb-4 last:mb-0 md:mb-0 bg-zinc-800/55 rounded-3xl border border-zinc-700/50 p-4 pb-6 flex flex-col justify-center overflow-visible ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
