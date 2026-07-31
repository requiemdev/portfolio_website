import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "./components/Card";
import GradientText from "./components/GradientText";
import LogoLoop from "./components/LogoLoop";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiApachemaven,
  SiJunit5,
  SiPython,
  SiFirebase,
  SiCloudflare,
  SiExpress,
  SiNodedotjs,
  SiGithub,
  SiGit,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";

const LiquidEther = lazy(() => import("./components/LiquidEther"));
const ProjectsModal = lazy(() => import("./components/ProjectsModal"));

type ModalName = "projects" | "contact" | "about";

// Logos for stack wheel (unified purple color to match gradient)
const logoColorClass = "w-6 h-6 text-[#c084fc]";
const etherColors = ["#5227FF", "#FF9FFC", "#B19EEF"];

const langLogos = [
  {
    node: <SiTypescript className={logoColorClass} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiJavascript className={logoColorClass} />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <DiJava className={logoColorClass} />,
    title: "Java",
    href: "https://www.java.com",
  },
  {
    node: <SiPython className={logoColorClass} />,
    title: "Python",
    href: "https://www.python.org",
  },
];

const techLogos = [
  {
    node: <SiGithub className={logoColorClass} />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <SiGit className={logoColorClass} />,
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    node: <SiReact className={logoColorClass} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiTailwindcss className={logoColorClass} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  {
    node: <SiApachemaven className={logoColorClass} />,
    title: "Maven",
    href: "https://maven.apache.org",
  },
  {
    node: <SiJunit5 className={logoColorClass} />,
    title: "JUnit 5",
    href: "https://junit.org/junit5",
  },

  {
    node: <SiFirebase className={logoColorClass} />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: <SiCloudflare className={logoColorClass} />,
    title: "Cloudflare",
    href: "https://cloudflare.com",
  },
  {
    node: <SiExpress className={logoColorClass} />,
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    node: <SiNodedotjs className={logoColorClass} />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
];

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalName | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [enableRichMotion, setEnableRichMotion] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const handleCloseModal = useCallback(() => {
    if (closeTimeoutRef.current !== null) return;
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
      window.requestAnimationFrame(() => modalTriggerRef.current?.focus());
    }, 300);
  }, []);

  const openModal = (modal: ModalName, trigger: HTMLElement) => {
    modalTriggerRef.current = trigger;
    setIsClosing(false);
    setActiveModal(modal);
  };

  const handleModalKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    modal: ModalName,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(modal, event.currentTarget);
    }
  };

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const updateMotion = () => setEnableRichMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    return () => motionQuery.removeEventListener("change", updateMotion);
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
  <div
    className="relative min-h-screen md:h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-purple-950 p-1 flex md:items-center md:justify-center items-start justify-start overflow-hidden"
    aria-hidden={activeModal ? true : undefined}
    inert={activeModal ? true : undefined}
  >
    <div className="ios-scroll-wrapper">
        {/* place the canvas absolutely and behind everything, and allow pointer events on it */}
        {enableRichMotion && (
          <Suspense fallback={null}>
            <LiquidEther
              className="absolute inset-0 z-0"
              colors={etherColors}
              mouseForce={30}
              cursorSize={65}
              isViscous={false}
              viscous={15}
              iterationsViscous={5}
              iterationsPoisson={5}
              resolution={0.2}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.25}
              autoIntensity={1.3}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </Suspense>
        )}
        {/* Outer glass container: ignore pointer events so underlying canvas gets mouse moves */}
        {/* allow children descenders to show — don't clip */}
        <div className="absolute inset-2 z-10 group rounded-3xl border border-zinc-700/50 bg-zinc-800/40 backdrop-blur-sm overflow-visible md:overflow-hidden transition-all duration-300 hover:border-purple-500/20 pointer-events-auto md:pointer-events-none">
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
                      animationSpeed={7}
                      showBorder={false}
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
                className="pointer-events-auto cursor-pointer"
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
                    animationSpeed={7}
                    showBorder={false}
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-0"
                  >
                    Contact
                  </GradientText>

                  <div className="mt-2">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/6 backdrop-blur-sm border border-white/10 text-s text-white/90 font-medium">
                      Me
                    </span>
                  </div>
                </div>
              </Card>
              <Card
                className="pointer-events-auto cursor-pointer"
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
                    animationSpeed={7}
                    showBorder={false}
                    /* give more bottom spacing so descenders (g, y, p) aren't overlapped */
                    className="text-2xl font-semibold leading-none mb-3"
                  >
                    About Me
                  </GradientText>
                  <div className="mt-2 w-full overflow-visible"></div>
                  <div className="w-full flex items-center justify-center mt-1">
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium transition-transform duration-200 hover:bg-white/8"
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
                    className="pointer-events-auto cursor-pointer"
                    onClick={(event) => openModal("projects", event.currentTarget)}
                    onKeyDown={(event) => handleModalKeyDown(event, "projects")}
                    role="button"
                    tabIndex={0}
                    aria-label="Open projects modal"
                  >
                    <span className="absolute pointer-events-none shadow-md top-1/2 right-6 -translate-y-1/2">
                      <span className="inline-flex items-center justify-center px-3 py-2 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 text-sm md:text-base text-white/90 font-medium shadow-sm">
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
                        animationSpeed={7}
                        showBorder={false}
                        className="text-3xl sm:text-4xl font-semibold leading-tight"
                      >
                        Projects
                      </GradientText>

                      <div className="mt-2 text-white/70 text-sm tracking-wide"></div>
                    </div>
                  </Card>

                  {/* Stacks */}
                  <Card className="pointer-events-auto">
                    <div className="relative z-10 flex flex-col items-start justify-start h-full pt-2 gap-2">
                      <GradientText
                        colors={[
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                          "#c084fc",
                          "#6d28d9",
                        ]}
                        animationSpeed={7}
                        showBorder={false}
                        className="text-3xl font-semibold leading-none"
                      >
                        Stacks
                      </GradientText>

                      <LogoLoop
                        logos={techLogos}
                        speed={25}
                        direction="left"
                        logoHeight={55}
                        gap={40}
                        pauseOnHover
                        scaleOnHover={true}
                        fadeOut={false}
                        fadeOutColor="#000000ff"
                        ariaLabel="Stacks"
                      />
                    </div>
                  </Card>
                </div>
              </div>
              {/* Third row */}
              {/* Languages */}
              <Card className="pointer-events-auto">
                <div className="relative z-10 flex flex-col items-start justify-start h-full pt-1 gap-2">
                  <GradientText
                    colors={[
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                      "#c084fc",
                      "#6d28d9",
                    ]}
                    animationSpeed={7}
                    showBorder={false}
                    /* give more bottom spacing so descenders (g, y, p) aren't overlapped */
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-3"
                  >
                    Languages
                  </GradientText>
                  {/* move the LogoLoop a little lower and slightly reduce icon height */}
                  <div className="mt-3 w-full overflow-visible">
                    <LogoLoop
                      logos={langLogos}
                      speed={25}
                      direction="left"
                      logoHeight={44}
                      gap={36}
                      pauseOnHover
                      scaleOnHover={true}
                      fadeOut={false}
                      fadeOutColor="#000000ff"
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
                    animationSpeed={7}
                    showBorder={false}
                    className="text-2xl sm:text-3xl font-semibold leading-none mb-0"
                  >
                    My CV
                  </GradientText>

                  {/* blackish glass button with purple glow; uses download attribute */}
                  <a
                    href="/Ryan-Tsai-CV.pdf"
                    download="RyanTsai-CV.pdf"
                    className="mt-2 inline-flex min-h-11 items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium transition-transform duration-200 hover:bg-white/8 hover:scale-105 text-center"
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
  </div>

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
            isOpen
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
