import type { ReactNode, SyntheticEvent } from "react";

type Props = {
  onOpen: (modal: "contact", trigger: HTMLElement) => void;
};

function Icon({ children, filled }: { children: ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function Dock({ onOpen }: Props) {
  const moveLens = (event: SyntheticEvent<HTMLElement>) => {
    const item = (event.target as Element).closest<HTMLElement>(".dock-item");
    if (item) {
      event.currentTarget.style.setProperty("--lens-x", `${item.offsetLeft}px`);
    }
  };

  return (
    <nav
      className="dock"
      aria-label="Dock"
      onPointerOver={moveLens}
      onFocus={moveLens}
    >
      <a href="#desktop" className="dock-item" aria-label="Home">
        <Icon>
          <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
        </Icon>
        <span className="dock-label">Home</span>
      </a>
      <a href="#projects" className="dock-item" aria-label="Projects">
        <Icon>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </Icon>
        <span className="dock-label">Projects</span>
      </a>
      <button
        type="button"
        className="dock-item"
        aria-label="Contact"
        onClick={(event) => onOpen("contact", event.currentTarget)}
      >
        <Icon>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </Icon>
        <span className="dock-label">Contact</span>
      </button>
      <a
        href="/Ryan-Tsai-CV.pdf"
        download="RyanTsai-CV.pdf"
        className="dock-item"
        aria-label="Download CV"
      >
        <Icon>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5" />
        </Icon>
        <span className="dock-label">Download CV</span>
      </a>
      <span className="dock-separator" aria-hidden="true" />
      <a
        href="https://github.com/requiemdev"
        target="_blank"
        rel="noopener noreferrer"
        className="dock-item"
        aria-label="GitHub"
      >
        <Icon filled>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </Icon>
        <span className="dock-label">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/ryan-yun-tsai/"
        target="_blank"
        rel="noopener noreferrer"
        className="dock-item"
        aria-label="LinkedIn"
      >
        <Icon filled>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </Icon>
        <span className="dock-label">LinkedIn</span>
      </a>
    </nav>
  );
}
