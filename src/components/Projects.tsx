import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { projects, type Project } from "./projectData";

function Carousel({
  project,
  className,
}: {
  project: Project;
  className: string;
}) {
  // dir is the last move: 1 sent the top card to the back, -1 brought the back card to the top
  const [{ imageIndex, dir }, setStack] = useState({ imageIndex: 0, dir: 0 });
  const count = project.images.length;
  const move = (step: 1 | -1) =>
    setStack({ imageIndex: (imageIndex + step + count) % count, dir: step });

  return (
    <div className={`relative ${className}`}>
      {project.images.map((image, index) => {
        // 0 is the top card; everything past the second card behind rests hidden under it
        const position = (index - imageIndex + count) % count;
        const shuffle =
          dir === 1 && position === count - 1
            ? "is-to-back"
            : dir === -1 && position === 0
              ? "is-to-front"
              : "";
        return (
          <div
            key={image.src}
            className={`stack-card ${shuffle}`}
            style={
              {
                "--d": Math.min(position, 2),
                "--back": Math.min(count - 1, 2),
                zIndex: count - position,
              } as CSSProperties
            }
            aria-hidden={position !== 0}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}

      {count > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-0 top-5 z-20 flex items-center justify-between p-2 pointer-events-none">
            <button
              type="button"
              onClick={() => move(-1)}
              className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full text-white"
              aria-label={`Previous image for ${project.title}`}
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
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full text-white"
              aria-label={`Next image for ${project.title}`}
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
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <div
            className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 flex gap-1.5"
            aria-hidden="true"
          >
            {project.images.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`h-1.5 w-1.5 rounded-full ${
                  dotIndex === imageIndex ? "bg-white/90" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectDetails({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <>
      <p className="text-white/70 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/8 text-white/70 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`tactile-control inline-flex min-h-11 items-center px-4 py-2 text-white rounded-xl ${
            featured
              ? "primary-action bg-gradient-to-r from-purple-600 to-violet-600"
              : "glass-action bg-white/8 border border-white/10"
          }`}
        >
          GitHub
        </a>
        {project.linkedin && (
          <a
            href={project.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-control glass-action inline-flex min-h-11 items-center px-4 py-2 bg-white/8 text-white rounded-xl border border-white/10"
          >
            LinkedIn Post
          </a>
        )}
      </div>
    </>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.slug);
  const rest = projects.filter((project) => !project.slug);

  return (
    <section id="projects" aria-label="Projects">
      {featured.map((project) => (
        <FolderPage key={project.slug} id={project.slug!} tab={project.title}>
          <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr] lg:gap-12">
            <Carousel project={project} className="aspect-[4/3] max-h-[60svh]" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                {project.title}
              </h2>
              <ProjectDetails project={project} featured />
            </div>
          </div>
        </FolderPage>
      ))}

      <FolderPage id="more" tab="More">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
          More Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {rest.map((project) => (
            <article
              key={project.title}
              className="project-card bg-zinc-700/40 rounded-2xl border border-zinc-600/50 p-6"
            >
              <Carousel project={project} className="h-48 mb-4" />
              <h3 className="text-xl text-white mb-2">{project.title}</h3>
              <ProjectDetails project={project} />
            </article>
          ))}
        </div>
      </FolderPage>
    </section>
  );
}

function FolderPage({
  id,
  tab,
  children,
}: {
  id: string;
  tab: string;
  children: ReactNode;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsOpen(entry.isIntersecting),
      // low enough that the last page, which can be taller than the viewport, still triggers
      { threshold: 0.4 },
    );
    observer.observe(pageRef.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* scroll target is a static sibling: anchoring to an already-stuck sticky element doesn't scroll */}
      <span id={id} className="folder-anchor" />
      <div
        ref={pageRef}
        className={`folder-page ${isOpen ? "is-open" : ""}`}
        // a page covered by the stack still counts as in view, so the browser won't reveal keyboard focus landing in it
        onFocus={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget) &&
            event.target.matches(":focus-visible")
          ) {
            document.getElementById(id)?.scrollIntoView();
          }
        }}
      >
        <a href={`#${id}`} className="folder-tab">
          {tab}
        </a>
        <div className="folder-body">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </div>
      </div>
    </>
  );
}
