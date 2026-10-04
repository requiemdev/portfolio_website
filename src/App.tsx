import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Card from "./components/Card";
import GradientText from "./components/GradientText";
import LogoLoop from "./components/LogoLoop";
import BrandMark from "./components/BrandMark";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";

const ProjectsModal = lazy(() => import("./components/ProjectsModal"));

type ModalName = "projects" | "contact" | "about";

// Logos for stack wheel (unified purple color to match gradient)
const logoColorClass = "w-6 h-6 text-[#c084fc]";

const langLogos = [
  {
    node: <BrandMark label="TS" className={logoColorClass} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <BrandMark label="JS" className={logoColorClass} />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <BrandMark label="Jv" className={logoColorClass} />,
    title: "Java",
    href: "https://www.java.com",
  },
  {
    node: <BrandMark label="Py" className={logoColorClass} />,
    title: "Python",
    href: "https://www.python.org",
  },
];

const techLogos = [
  {
    node: <BrandMark label="GH" className={logoColorClass} />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <BrandMark label="Git" className={logoColorClass} />,
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    node: <BrandMark label="Rx" className={logoColorClass} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <BrandMark label="TW" className={logoColorClass} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  {
    node: <BrandMark label="Mvn" className={logoColorClass} />,
    title: "Maven",
    href: "https://maven.apache.org",
  },
  {
    node: <BrandMark label="J5" className={logoColorClass} />,
    title: "JUnit 5",
    href: "https://junit.org/junit5",
  },

  {
    node: <BrandMark label="Fb" className={logoColorClass} />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: <BrandMark label="CF" className={logoColorClass} />,
    title: "Cloudflare",
    href: "https://cloudflare.com",
  },
  {
    node: <BrandMark label="Ex" className={logoColorClass} />,
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    node: <BrandMark label="N" className={logoColorClass} />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
];

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalName | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);

  const handleCloseModal = useCallback(() => {
    if (closeTimeoutRef.current !== null) return;
    shouldRestoreFocusRef.current = true;
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, prefersReducedMotion ? 0 : 300);
  }, [prefersReducedMotion]);

  const openModal = (modal: ModalName, trigger: HTMLElement) => {
    modalTriggerRef.current = trigger;
    setIsClosing(false);
    setActiveModal(modal);
  };

  const handleModalKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>,
    modal: ModalName,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(modal, event.currentTarget);
    }
  };

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = () =>
      setPrefersReducedMotion(reducedMotionQuery.matches);
    updateMotionPreference();
    reducedMotionQuery.addEventListener("change", updateMotionPreference);
    return () =>
      reducedMotionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseModal();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeModal, handleCloseModal]);

  useEffect(() => {
    if (activeModal || !shouldRestoreFocusRef.current) return;

    shouldRestoreFocusRef.current = false;
    const animationFrame = window.requestAnimationFrame(() => {
      modalTriggerRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeModal]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
  <main
    id="main-content"
    className="relative min-h-screen md:h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-purple-950 p-1 flex md:items-center md:justify-center items-start justify-start overflow-hidden"
    aria-hidden={activeModal ? true : undefined}
    inert={activeModal ? true : undefined}
  >
    <div className="ios-scroll-wrapper">
        <div className="portfolio-frame absolute inset-2 z-10 group rounded-3xl border border-zinc-700/50 bg-zinc-800/40 backdrop-blur-sm overflow-visible md:overflow-hidden pointer-events-auto md:pointer-events-none">
          {/* Make this wrapper ignore pointer events so the canvas underneath receives all moves */}
          {/* add padding so first/last columns have equal spacing from the container */}
          {/* add extra top padding while keeping equal horizontal spacing */}
          {/*
            Responsive behavior:
            - On small screens we collapse the 3-column/3-row grid into a single vertical column
              and allow the outer container to scroll vertically.
            - On larger screens the original grid layout is kept.
          */}
          <div className="w-full h-auto md:h-full pointer-events-none px-2 pt-3 pb-2 min-h-0">
            {/* Grid:
               left and right columns are clamped between 140px and 220px,
               middle column grows to fill remaining space (1fr).
               rows are equally sized. Using inline styles for precise grid-template values. */}
            {/*
              Use a responsive layout:
              - `md:grid` enables a CSS grid on medium+ screens (>=768px)
              - On small screens the container becomes a vertical flow (single column) and
                the outer wrapper will scroll if content overflows.
            */}
            <div
              className="md:grid grid-cols-1 md:grid-cols-[minmax(180px,320px)_1fr_minmax(120px,200px)] gap-2 h-auto md:h-full min-h-0 overflow-visible md:overflow-hidden"
              style={{
                gridTemplateRows: "repeat(3, 1fr)",
              }}
            >
              {/* Top Row of Cards */}
              <Card className="pointer-events-auto">
                <div className="relative z-10 flex flex-col items-start justify-center h-full gap-1">
                  <div className="text-white/80 text-sm uppercase tracking-wider">
                    Hello, I'm
                  </div>

                  <h1>
                    <GradientText
                      colors={[
                        "#6d28d9",
                        "#c084fc",
                        "#6d28d9",
                        "#c084fc",
                        "#6d28d9",
                      ]}
                      className="text-4xl sm:text-5xl font-semibold leading-none block"
                    >
                      Ryan
                    </GradientText>
                  </h1>

                  <div className="mt-2 text-white/70 text-sm tracking-wide">
                    <span className="block">Software</span>
                    <span className="block">Engineering</span>
                    <span className="block">Student </span>
                  </div>
                </div>
              </Card>
              {/* Blank Card */}

              <Card
                className="interactive-card pointer-events-auto cursor-pointer"
                onClick={(event) => openModal("contact", event.currentTarget)}
                onKeyDown={(event) => handleModalKeyDown(event, "contact")}
                role="button"
                tabIndex={0}
                aria-label="Open contact modal"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-blue-500/10"></div>
                {/* contact pill moved into content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-xl"></div>

                {/* centered column: title + download button */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-3">
                  <GradientText
                    colors={[
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                    ]}
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-0"
                  >
                    Contact
                  </GradientText>

                  <div className="mt-2">
                    <span className="glass-label inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/6 backdrop-blur-sm border border-white/10 text-s text-white/90 font-medium">
                      Me
                    </span>
                  </div>
                </div>
              </Card>
              <Card
                className="interactive-card pointer-events-auto cursor-pointer"
                onClick={(event) => openModal("about", event.currentTarget)}
                onKeyDown={(event) => handleModalKeyDown(event, "about")}
                role="button"
                tabIndex={0}
                aria-label="Open about modal"
              >
                {/* about pill removed per request */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full pt-2 gap-2">
                  <GradientText
                    colors={[
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                    ]}
                    /* give more bottom spacing so descenders (g, y, p) aren't overlapped */
                    className="text-2xl font-semibold leading-none mb-3"
                  >
                    About Me
                  </GradientText>
                  <div className="mt-2 w-full overflow-visible"></div>
                  <div className="w-full flex items-center justify-center mt-1">
                    <span
                      aria-hidden="true"
                      className="glass-action inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium"
                    >
                      More
                    </span>
                  </div>
                </div>
              </Card>
              {/* Second Row — replace the previous col-span-2 + right tile with a full-row wrapper
                  that contains a nested 2-column grid using a 60% / 40% split. */}
              <div className="col-span-3 pointer-events-none w-full h-auto md:h-full min-h-0">
                <div
                  className="grid gap-4 h-auto md:h-full grid-cols-1 md:grid-cols-[3fr_2fr]"
                >
                  {/* Left (60%) */}
                  <Card
                    className="interactive-card pointer-events-auto cursor-pointer"
                    onClick={(event) => openModal("projects", event.currentTarget)}
                    onKeyDown={(event) => handleModalKeyDown(event, "projects")}
                    role="button"
                    tabIndex={0}
                    aria-label="Open projects modal"
                  >
                    <span className="absolute pointer-events-none shadow-md top-1/2 right-6 -translate-y-1/2">
                      <span className="glass-action inline-flex items-center justify-center px-3 py-2 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 text-sm md:text-base text-white/90 font-medium shadow-sm">
                        View
                      </span>
                    </span>
                    <div className="relative z-10 flex flex-col items-start justify-center h-full gap-1">
                      <div className="text-white/80 text-sm uppercase tracking-wider">
                        My
                      </div>

                      <GradientText
                        colors={[
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                        ]}
                        className="text-3xl sm:text-4xl font-semibold leading-tight"
                      >
                        Projects
                      </GradientText>

                      <div className="mt-2 text-white/70 text-sm tracking-wide"></div>
                    </div>
                  </Card>

                  {/* Stacks */}
                  <Card className="pointer-events-auto">
                    <div className="relative z-10 flex flex-col items-start h-full pt-2 gap-2">
                      <GradientText
                        colors={[
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                        ]}
                        className="text-3xl font-semibold leading-none"
                      >
                        Stacks
                      </GradientText>

                      <div className="flex flex-1 items-center w-full overflow-hidden">
                        <LogoLoop
                          logos={techLogos}
                          logoHeight={55}
                          gap={40}
                          ariaLabel="Stacks"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              {/* Third row */}
              {/* Languages */}
              <Card className="pointer-events-auto">
                <div className="relative z-10 flex flex-col items-start h-full pt-1 gap-2">
                  <GradientText
                    colors={[
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                    ]}
                    /* give more bottom spacing so descenders (g, y, p) aren't overlapped */
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-3"
                  >
                    Languages
                  </GradientText>
                  <div className="flex flex-1 items-center w-full overflow-hidden">
                    <LogoLoop
                      logos={langLogos}
                      logoHeight={44}
                      gap={36}
                      ariaLabel="Languages"
                    />
                  </div>
                </div>
              </Card>
              {/* Lightweight CSS motion card: no second WebGL renderer needed. */}
              <Card className="pointer-events-auto !p-0 !pb-0 relative overflow-hidden">
                <div className="plasma-card-bg absolute inset-0 w-full h-full" />
              </Card>

              {/* CV Card */}
              <Card className="pointer-events-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-blue-500/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-xl"></div>

                {/* centered column: title + download button */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-4">
                  <GradientText
                    colors={[
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                    ]}
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-0"
                  >
                    My CV
                  </GradientText>

                  {/* blackish glass button with purple glow; uses download attribute */}
                  <a
                    href="/Ryan-Tsai-CV.pdf"
                    download="RyanTsai-CV.pdf"
                    className="tactile-control glass-action mt-2 inline-flex min-h-11 items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium text-center"
                    aria-label="Download CV"
                  >
                    Download CV
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
    </div>
  </main>

      {/* Modals - extracted to components to preserve identical markup and behaviour */}
      {activeModal === "projects" && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 text-white" role="status">
              Loading projects…
            </div>
          }
        >
          <ProjectsModal
            isClosing={isClosing}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
      <ContactModal
        isOpen={activeModal === "contact"}
        isClosing={isClosing}
        onClose={handleCloseModal}
      />
      <AboutModal
        isOpen={activeModal === "about"}
        isClosing={isClosing}
        onClose={handleCloseModal}
      />
    </>
  );
}
