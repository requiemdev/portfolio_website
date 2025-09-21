import React from "react";

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
  }
>;

export default function Card({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      /* add extra bottom space so descenders (g, y, p) never touch the edge */
      className={`group relative w-full h-full bg-zinc-800/40 backdrop-blur-xl rounded-3xl border border-zinc-700/50 p-4 pb-6 flex flex-col justify-center overflow-visible transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
