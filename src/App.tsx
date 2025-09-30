import React, { useState } from "react";
import Card from "./components/Card";
import LiquidEther from "./components/LiquidEther";
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
import Plasma from "./components/Plasma";
import ProjectsModal from "./components/ProjectsModal";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";
import { Analytics } from "@vercel/analytics/next";

// Logos for stack wheel (unified purple color to match gradient)
const logoColorClass = "w-6 h-6 text-[#c084fc]";

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
  const [activeModal, setActiveModal] = useState<
    "projects" | "contact" | "about" | null
  >(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <div className="relative h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-purple-950 p-1 flex items-center justify-center overflow-hidden">
        {/* place the canvas absolutely and behind everything, and allow pointer events on it */}
        <LiquidEther
          className="absolute inset-0 z-0 pointer-events-auto"
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={30}
          cursorSize={65}
          isViscous={true}
          viscous={15}
          iterationsViscous={30}
          iterationsPoisson={30}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.3}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        {/* Outer glass container: ignore pointer events so underlying canvas gets mouse moves */}
        {/* allow children descenders to show — don't clip */}
        <div className="absolute inset-2 z-10 group rounded-3xl border border-zinc-700/50 bg-zinc-800/30 backdrop-blur-xl overflow-visible transition-all duration-300 hover:border-purple-500/20 pointer-events-none">
          {/* Make this wrapper ignore pointer events so the canvas underneath receives all moves */}
          {/* add padding so first/last columns have equal spacing from the container */}
          {/* add extra top padding while keeping equal horizontal spacing */}
          <div className="w-full h-full pointer-events-none px-2 pt-3 pb-2 min-h-0">
            {/* Grid:
               left and right columns are clamped between 140px and 220px,
               middle column grows to fill remaining space (1fr).
               rows are equally sized. Using inline styles for precise grid-template values. */}
            <div
              className="grid gap-2 h-full min-h-0"
              style={{
                gridTemplateColumns:
                  "minmax(180px,320px) 1fr minmax(120px,200px)",
                gridTemplateRows: "repeat(3, 1fr)",
              }}
            >
              {/* Top Row of Cards */}
              <Card className="pointer-events-auto">
                <div className="relative z-10 flex flex-col items-start justify-center h-full gap-1">
                  <div className="text-white/80 text-sm uppercase tracking-wider">
                    Hello, I'm
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
                    className="text-4xl sm:text-5xl font-semibold leading-none block"
                  >
                    Ryan
                  </GradientText>

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
                onClick={() => {
                  setIsClosing(false);
                  setActiveModal("contact");
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsClosing(false);
                    setActiveModal("contact");
                  }
                }}
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
                onClick={() => {
                  setIsClosing(false);
                  setActiveModal("about");
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsClosing(false);
                    setActiveModal("about");
                  }
                }}
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
                    <button
                      onClick={() => {
                        setIsClosing(false);
                        setActiveModal("about");
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium transition-transform duration-200 hover:bg-white/8"
                    >
                      More
                    </button>
                  </div>
                </div>
              </Card>
              {/* Second Row — replace the previous col-span-2 + right tile with a full-row wrapper
                  that contains a nested 2-column grid using a 60% / 40% split. */}
              <div className="col-span-3 pointer-events-none w-full h-full min-h-0">
                <div
                  className="grid gap-4 h-full"
                  style={{ gridTemplateColumns: "60% 40%" }}
                >
                  {/* Left (60%) */}
                  <Card
                    className="pointer-events-auto h-full cursor-pointer"
                    onClick={() => {
                      setIsClosing(false);
                      setActiveModal("projects");
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsClosing(false);
                        setActiveModal("projects");
                      }
                    }}
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
                  <Card className="pointer-events-auto h-full">
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
              {/* ensure card has no internal padding so Plasma fills it exactly */}
              <Card className="pointer-events-auto !p-0 !pb-0 relative overflow-hidden">
                {/* Plasma fills the card, does not affect layout */}
                <div className="absolute inset-0 w-full h-full pointer-events-auto">
                  <Plasma
                    className="w-full h-full"
                    color="#c084fc"
                    speed={0.6}
                    direction="forward"
                    scale={1}
                    opacity={0.5}
                    mouseInteractive={false}
                  />
                </div>
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
                    href="/RyanTsaiCV.pdf"
                    download="RyanTsai-CV.pdf"
                    className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm font-medium transition-transform duration-200 hover:bg-white/8 hover:scale-105 text-center"
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

      {/* Modals - extracted to components to preserve identical markup and behaviour */}
      <ProjectsModal
        isOpen={activeModal === "projects"}
        isClosing={isClosing}
        onClose={handleCloseModal}
      />
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
