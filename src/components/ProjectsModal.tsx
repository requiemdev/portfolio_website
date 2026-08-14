import { useState, type ReactNode } from "react";
import ferrousImg from "../images/ferrous.webp";
import astralImagesImg from "../images/astral_images.webp";
import astralBotImg from "../images/astral_bot.webp";
import ffxivImg from "../images/ffxiv.webp";
import se283Img from "../images/se281a3.webp";
import record from "../images/record.webp";
import meowpad from "../images/meowpad.webp";
import se281 from "../images/281.webp";
import meowpad_cad from "../images/meowpad_cad.webp";
import meowpad_pcb from "../images/meowpad_pcb.webp";
import record_bb from "../images/record_bb.webp";
import se206 from "../images/se206.webp";
import se2061 from "../images/se2061.webp";
import se2063 from "../images/se2063.webp";
import ff from "../images/ff.webp";
import meowpad_built from "../images/meowpad_built.webp";
import tankArenaAward from "../images/tank_arena_award.webp";
import tankArenaController from "../images/tank_arena_controller.webp";
import tankArenaHardware from "../images/tank_arena_hardware.webp";
import tankArenaTanks from "../images/tank_arena_tanks.webp";

type Props = {
  isClosing: boolean;
  onClose: () => void;
};

type Project = {
  title: string;
  description: ReactNode;
  images: Array<{ src: string; alt: string }>;
  tags: string[];
  github: string;
  linkedin?: string;
};

const projects: Project[] = [
  {
    title: "Tank Arena",
    description: (
      <>
        Engineering Excellence Award-winning two-player laser-tag duel built
        with custom 3D-printed ESP32 tanks, custom PCBs, servo-mounted IR
        emitters, and four-direction hit sensing. Designed and implemented the
        WebSocket game server and browser interfaces for real-time controls, hit
        validation, match progression, spectator views, and a persistent
        leaderboard, achieving sub-10 ms local-network latency with 0% packet
        loss during testing.
      </>
    ),
    images: [
      { src: tankArenaTanks, alt: "Two custom-built Tank Arena vehicles" },
      {
        src: tankArenaController,
        alt: "Tank Arena browser controller interface",
      },
      {
        src: tankArenaHardware,
        alt: "Tank Arena hardware and live match display",
      },
      {
        src: tankArenaAward,
        alt: "Tank Arena team receiving the Engineering Excellence Award",
      },
    ],
    tags: [
      "ESP32",
      "WebSockets",
      "Embedded Systems",
      "Custom PCB",
      "3D Printing",
    ],
    github: "https://github.com/requiemdev/Tank-Arena-26-ECSE-Design-Comp",
    linkedin:
      "https://www.linkedin.com/feed/update/urn:li:activity:7488355540826300416/",
  },
  {
    title: "Ferrous Fellow",
    description: (
      <>
        Created a toy robot using TensorFlow Lite and OpenCV for facial and
        speech recognition. Integrated with the OpenAI API to analyse emotional
        cues and recommend music accordingly.
      </>
    ),
    images: [
      { src: ferrousImg, alt: "Ferrous Fellow" },
      { src: ff, alt: "Ferrous Fellow" },
    ],
    tags: ["OpenCV", "FER", "Machine Learning", "OpenAI"],
    github: "https://github.com/requiemdev/ECSE_Design_Competition",
  },
  {
    title: "RFID Record Player",
    description: (
      <>
        RFID Record player inspired by{" "}
        <a href="https://github.com/fatihak/RFID-Record-Player">
          fatihak&apos;s project
        </a>
        . Designed to be cost effective by replacing the original Raspberry Pi
        Zero 2W MCU with an ESP-32. When a "record" is placed onto the
        turntable, an internal RFID reader picks up on the RFID tag on the disc,
        which maps to the specific song&apos;s Spotify track ID. When the
        tonearm is in the active position, the song is played on the user&apos;s
        Spotify, and the record spins. When the tonearm is moved away, the
        record stops spinning, and the music is paused on the user&apos;s
        device.
      </>
    ),
    images: [
      { src: record, alt: "RFID Record Player" },
      { src: record_bb, alt: "RFID Record Player - Alternate View" },
    ],
    tags: ["ESP-32", "C", "Python"],
    github: "https://github.com/requiemdev/RFID-Record-Player-ESP32",
  },
  {
    title: "MeowPad",
    description: (
      <>
        Designed a hot-swappable number pad from scratch using KiCAD for PCB
        design, AutoCAD Inventor for case and plate design, and QMK for
        firmware. Powered by an Arduino Pro Micro footprint MCU, and equipped
        with an OLED display and EC11 rotary encoder knob, this numberpad is
        fully customisable with switches, keycaps and cases. The MeowPad
        supports a 3D printed case with PCB mounted standoffs, as well as a
        stacked acrylic plate mount.
      </>
    ),
    images: [
      { src: meowpad_built, alt: "MeowPad - Built View" },
      { src: meowpad_pcb, alt: "MeowPad - PCB View" },
      { src: meowpad, alt: "MeowPad Custom Number Pad" },
      { src: meowpad_cad, alt: "MeowPad - Cad View" },
    ],
    tags: ["KiCAD", "C", "AutoCAD Inventor", "3D Printing"],
    github: "https://github.com/requiemdev/",
  },
  {
    title: "Trial AI",
    description: (
      <>
        Created alongside my teammates for the SE206 Design Project, this is an
        interactive trial simulation that places the player into a morally
        ambiguous dilemma. By chatting with the involved parties, the player
        must decide whether the defendant's actions were or were not justified.
        This project utilised JavaFX, collaborative GitHub workflows, Java
        concurrency and regular interviews with the clients to practice
        requirements engineering. The AI defendants were powered by OpenAI's LLM
        API, voiced by Google's TTS API.
      </>
    ),
    images: [
      { src: se206, alt: "SE206" },
      { src: se2061, alt: "SE206 - Alternate View" },
      { src: se2063, alt: "SE206 - Alternate View" },
    ],
    tags: [
      "Java",
      "JavaFX",
      "Java Concurrency",
      "GitHub Flow",
      "Requirements Engineering",
      "OpenAI LLM",
      "Google TTS",
    ],
    github: "https://github.com/requiemdev/SE206-Trial-AI",
  },
  {
    title: "Astral Images",
    description: (
      <>
        WIP Cloud Image Hosting Site for with React and Tailwind CSS on the
        frontend, Express.js, Firebase, and Firestore for backend logic and
        authentication. Used Cloudflare R2 for image storage.
      </>
    ),
    images: [{ src: astralImagesImg, alt: "Astral Images" }],
    tags: ["React", "TypeScript", "Firebase", "Cloudflare R2", "Express.js"],
    github: "https://github.com/requiemdev/astral-image-host",
  },
  {
    title: "Astral Bot/Astral Music",
    description: (
      <>
        Created a modular Discord bot for server moderation and entertainment,
        integrating MongoDB, Reddit, and VALORANT API. Built advanced music
        features including queueing, volume control, and voice filters, later
        merging multiple bots into a unified system using Discord.js and
        Node.js.
      </>
    ),
    images: [{ src: astralBotImg, alt: "Astral Bot / Astral Music" }],
    tags: ["Node.js", "Discord.js", "MongoDB"],
    github: "https://github.com/requiemdev/astral_bot",
  },
  {
    title: "FFXIV Market Predict",
    description: (
      <>
        Created a basic API wrapper for crowd-sourced game market information,
        and applied a random forest regressor with sklearn to create a basic
        prediction model for in-game prices.
      </>
    ),
    images: [{ src: ffxivImg, alt: "FFXIV Market Predict" }],
    tags: ["Node.js", "Express.js", "sklearn"],
    github: "https://github.com/requiemdev/ffxiv_market_predict",
  },
  {
    title: "Assignment: Risk Simulation",
    description: (
      <>
        Assignment for the course SOFTENG 281: Object Oriented Programming.
        Implement design patterns, data structures and algorithms to create a
        CLI adaptation of classic board game Risk. Passed all test cases, and
        received an overall of 99.7% in the course.
      </>
    ),
    images: [
      { src: se283Img, alt: "Assignment: Risk Simulation" },
      { src: se281, alt: "Assignment: Risk Simulation - Alternate View" },
    ],
    tags: ["Java", "Maven"],
    github: "https://github.com/requiemdev/SOFTENG281_A3",
  },
];

type ProjectCardProps = {
  project: Project;
  imageIndex: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
};

function ProjectCard({
  project,
  imageIndex,
  onPreviousImage,
  onNextImage,
}: ProjectCardProps) {
  const hasMultipleImages = project.images.length > 1;
  const activeImage = project.images[imageIndex];

  return (
    <article className="project-card bg-zinc-700/40 rounded-2xl border border-zinc-600/50 p-6">
      <div className="relative h-48 rounded-xl mb-4 overflow-hidden">
        <img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          className="project-carousel-image w-full h-full object-cover rounded-xl"
          loading="lazy"
          decoding="async"
        />

        {hasMultipleImages && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
              <button
                type="button"
                onClick={onPreviousImage}
                className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full bg-black/55 text-white"
                aria-label={`Previous image for ${project.title}`}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNextImage}
                className="tactile-control carousel-control pointer-events-auto h-11 w-11 rounded-full bg-black/55 text-white"
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

      <h3 className="text-xl text-white mb-2">{project.title}</h3>
      <p className="text-white/70 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
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
          className="tactile-control primary-action inline-flex min-h-11 items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl"
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
    </article>
  );
}

export default function ProjectsModal({ isClosing, onClose }: Props) {
  const [imageIndexes, setImageIndexes] = useState<Record<number, number>>({});

  const handlePreviousImage = (projectIndex: number) => {
    setImageIndexes((currentIndexes) => ({
      ...currentIndexes,
      [projectIndex]:
        ((currentIndexes[projectIndex] ?? 0) - 1 +
          projects[projectIndex].images.length) %
        projects[projectIndex].images.length,
    }));
  };

  const handleNextImage = (projectIndex: number) => {
    setImageIndexes((currentIndexes) => ({
      ...currentIndexes,
      [projectIndex]:
        ((currentIndexes[projectIndex] ?? 0) + 1) %
        projects[projectIndex].images.length,
    }));
  };

  return (
    <div
      className={`modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 ${
        isClosing ? "is-closing" : "is-opening"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-title"
        className={`modal-sheet bg-zinc-900/95 rounded-3xl border border-zinc-700/50 max-w-7xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 relative ${
          isClosing ? "is-closing" : "is-opening"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="modal-header flex justify-between items-center gap-3 mb-8">
            <h2 id="projects-title" className="text-2xl sm:text-3xl text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text font-semibold">
              Featured Projects
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="tactile-control close-control h-11 w-11 shrink-0 text-white/60 text-2xl"
              aria-label="Close projects"
              autoFocus
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, projectIndex) => (
              <ProjectCard
                key={project.title}
                project={project}
                imageIndex={imageIndexes[projectIndex] ?? 0}
                onPreviousImage={() => handlePreviousImage(projectIndex)}
                onNextImage={() => handleNextImage(projectIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
