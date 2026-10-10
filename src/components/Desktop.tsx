import { useEffect, useState } from "react";
import { projects } from "./projectData";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function FolderIcon() {
  return (
    <svg viewBox="0 0 64 52" className="folder-icon" aria-hidden="true">
      <path
        d="M4 8a6 6 0 0 1 6-6h14l6 6h24a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"
        fill="#6d28d9"
      />
      <rect x="4" y="14" width="56" height="36" rx="6" fill="#a78bfa" />
    </svg>
  );
}

export default function Desktop() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // the display only shows minutes; returning the same Date skips the re-render on the other 59 ticks
    const timer = window.setInterval(
      () =>
        setNow((previous) => {
          const next = new Date();
          return next.getMinutes() === previous.getMinutes() ? previous : next;
        }),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth();
  // Monday-first: getDay() is 0 for Sunday
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <section
      id="desktop"
      className="min-h-svh flex flex-col gap-8 p-4 pb-28 md:grid md:grid-cols-[14rem_1fr_14rem] md:p-6 md:pb-28"
    >
      <div className="hidden gap-4 md:flex md:flex-col">
        <div className="widget flex-1 md:flex-none">
          <time
            dateTime={now.toISOString()}
            className="block text-5xl font-semibold tabular-nums tracking-tight text-white"
          >
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </time>
          <div className="mt-1 text-sm text-white/70">
            {now.toLocaleDateString([], {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>

        <div className="widget flex-1 md:flex-none">
          <div className="mb-2 text-sm font-semibold text-white">
            {now.toLocaleDateString([], { month: "long", year: "numeric" })}
          </div>
          <div
            className="grid grid-cols-7 gap-y-1 text-center text-xs tabular-nums"
            aria-hidden="true"
          >
            {WEEKDAYS.map((day, index) => (
              <span key={index} className="text-white/50">
                {day}
              </span>
            ))}
            {Array.from({ length: leadingBlanks }, (_, index) => (
              <span key={`blank-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => (
              <span
                key={index}
                className={`mx-auto grid h-6 w-6 place-items-center rounded-full ${
                  index + 1 === now.getDate()
                    ? "bg-violet-500 font-semibold text-white"
                    : "text-white/80"
                }`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-semibold text-white sm:text-6xl">
          Hi! I'm Ryan
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/70">
          Software Engineering @ University of Auckland
        </p>
        <a
          href={`#${projects.find((project) => project.slug)?.slug ?? "more"}`}
          className="tactile-control scroll-hint mt-8 h-11 w-11 rounded-full text-white"
          aria-label="Scroll down to projects"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 9 7 7 7-7" />
          </svg>
        </a>
      </div>

      <nav
        aria-label="Project folders"
        className="grid grid-cols-3 content-start gap-2 md:grid-cols-2"
      >
        {projects
          .filter((project) => project.slug)
          .map((project) => (
            <a key={project.slug} href={`#${project.slug}`} className="folder">
              <FolderIcon />
              <span>{project.title}</span>
            </a>
          ))}
        <a href="#more" className="folder">
          <FolderIcon />
          <span>More</span>
        </a>
      </nav>
    </section>
  );
}
