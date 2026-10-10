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
  const [imageIndex, setImageIndex] = useState(0);
  const count = project.images.length;
  const activeImage = project.images[imageIndex];

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <img
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        className="project-carousel-image w-full h-full object-cover rounded-xl"
        loading="lazy"
        decoding="async"
      />

      {count > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
            <button
              type="button"
              onClick={() => setImageIndex((imageIndex - 1 + count) % count)}
              className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full text-white"
              aria-label={`Previous image for ${project.title}`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setImageIndex((imageIndex + 1) % count)}
              className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full text-white"
              aria-label={`Next image for ${project.title}`}
            >
              ›
            </button>
          </div>

          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
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
      {featured.map((project, index) => (
        <FolderPage key={project.slug} id={project.slug!} index={index} tab={project.title}>
          <div className="grid items-center gap-8 md:grid-cols-2">
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

      <FolderPage id="more" index={featured.length} tab="More">
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
  index,
  tab,
  children,
}: {
  id: string;
  index: number;
  tab: string;
  children: ReactNode;
}) {
  const style = { "--i": index } as CSSProperties;
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
      <span id={id} className="folder-anchor" style={style} />
      <div
        ref={pageRef}
        className={`folder-page ${isOpen ? "is-open" : ""}`}
        style={style}
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
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </div>
    </>
  );
}
