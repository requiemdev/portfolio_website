import { useEffect, useState, type ReactNode } from "react";
import ferrousImg from "../images/ferrous.png";
import astralImagesImg from "../images/astral_images.png";
import astralBotImg from "../images/astral_bot.png";
import ffxivImg from "../images/ffxiv.png";
import se283Img from "../images/se281a3.png";
import record from "../images/record.jpg";
import meowpad from "../images/meowpad.png";
import se281 from "../images/281.webp";
import meowpad_cad from "../images/meowpad_cad.png";
import meowpad_pcb from "../images/meowpad_pcb.jpg";
import record_bb from "../images/record_bb.jpg";
import se206 from "../images/se206.png";
import se2061 from "../images/se2061.png";
import se2063 from "../images/se2063.png";
import ff from "../images/ff.jpg";
import preloadImages from "../hooks/preloadImages";

type Props = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

type Project = {
  title: string;
  description: ReactNode;
  images: Array<{ src: string; alt: string }>;
  tags: string[];
  github: string;
};

const projects: Project[] = [
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
        stacked acrylic plate mount. This project is currently finished with PCB
        design, and is in the manufacturing and component sourcing process.
      </>
    ),
    images: [
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

const allProjectImages = projects.flatMap((project) =>
  project.images.map((image) => image.src),
);

type ProjectCardProps = {
  project: Project;
  imageIndex: number;
  isTrackAnimating: boolean;
  onPreviousImage: () => void;
  onNextImage: () => void;
  onTrackTransitionEnd: () => void;
};

function ProjectCard({
  project,
  imageIndex,
  isTrackAnimating,
  onPreviousImage,
  onNextImage,
  onTrackTransitionEnd,
}: ProjectCardProps) {
  const hasMultipleImages = project.images.length > 1;
  const carouselImages = hasMultipleImages
    ? [
        project.images[project.images.length - 1],
        ...project.images,
        project.images[0],
      ]
    : project.images;
  const activeDotIndex = hasMultipleImages
    ? (imageIndex - 1 + project.images.length) % project.images.length
    : 0;

  return (
    <div className="bg-zinc-700/40 backdrop-blur-xl rounded-2xl border border-zinc-600/50 p-6 hover:border-purple-500/30 transition-all duration-300">
      <div className="relative h-48 rounded-xl mb-4 overflow-hidden">
        <div
          className="project-carousel-track"
          style={{
            transform: `translateX(-${imageIndex * 100}%)`,
            transition: isTrackAnimating ? undefined : "none",
          }}
          onTransitionEnd={onTrackTransitionEnd}
        >
          {carouselImages.map((image, trackIndex) => (
            <div
              key={`${image.src}-${trackIndex}`}
              className="project-carousel-slide"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
              <button
                type="button"
                onClick={onPreviousImage}
                className="pointer-events-auto h-8 w-8 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors"
                aria-label={`Previous image for ${project.title}`}
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={onNextImage}
                className="pointer-events-auto h-8 w-8 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors"
                aria-label={`Next image for ${project.title}`}
              >
                &gt;
              </button>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`h-1.5 w-1.5 rounded-full ${
                    dotIndex === activeDotIndex ? "bg-white/90" : "bg-white/40"
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
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default function ProjectsModal({ isOpen, isClosing, onClose }: Props) {
  const [imageIndexes, setImageIndexes] = useState<Record<number, number>>({});
  const [isTrackAnimating, setIsTrackAnimating] = useState<
    Record<number, boolean>
  >({});

  preloadImages(allProjectImages);

  const getInitialImageIndex = (projectIndex: number) =>
    projects[projectIndex].images.length > 1 ? 1 : 0;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setImageIndexes((currentIndexes) => {
        const nextIndexes: Record<number, number> = { ...currentIndexes };

        projects.forEach((project, projectIndex) => {
          if (project.images.length <= 1) {
            return;
          }

          const currentImageIndex =
            nextIndexes[projectIndex] ?? getInitialImageIndex(projectIndex);
          nextIndexes[projectIndex] = currentImageIndex + 1;
        });

        return nextIndexes;
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  const handlePreviousImage = (projectIndex: number) => {
    setIsTrackAnimating((currentState) => ({
      ...currentState,
      [projectIndex]: true,
    }));

    setImageIndexes((currentIndexes) => {
      const currentImageIndex =
        currentIndexes[projectIndex] ?? getInitialImageIndex(projectIndex);
      const previousImageIndex = currentImageIndex - 1;

      return {
        ...currentIndexes,
        [projectIndex]: previousImageIndex,
      };
    });
  };

  const handleNextImage = (projectIndex: number) => {
    setIsTrackAnimating((currentState) => ({
      ...currentState,
      [projectIndex]: true,
    }));

    setImageIndexes((currentIndexes) => {
      const currentImageIndex =
        currentIndexes[projectIndex] ?? getInitialImageIndex(projectIndex);
      const nextImageIndex = currentImageIndex + 1;

      return {
        ...currentIndexes,
        [projectIndex]: nextImageIndex,
      };
    });
  };

  const handleTrackTransitionEnd = (projectIndex: number) => {
    const imageCount = projects[projectIndex].images.length;

    if (imageCount <= 1) {
      return;
    }

    setImageIndexes((currentIndexes) => {
      const currentImageIndex =
        currentIndexes[projectIndex] ?? getInitialImageIndex(projectIndex);

      if (currentImageIndex !== 0 && currentImageIndex !== imageCount + 1) {
        return currentIndexes;
      }

      setIsTrackAnimating((currentState) => ({
        ...currentState,
        [projectIndex]: false,
      }));

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTrackAnimating((currentState) => ({
            ...currentState,
            [projectIndex]: true,
          }));
        });
      });

      return {
        ...currentIndexes,
        [projectIndex]: currentImageIndex === 0 ? imageCount : 1,
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 transition-all duration-300 ${
        isClosing
          ? "animate-out fade-out duration-300"
          : "animate-in fade-in duration-300"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-zinc-800/60 backdrop-blur-xl rounded-3xl border border-zinc-700/50 max-w-7xl w-full max-h-[90vh] overflow-y-auto p-8 relative transition-all duration-500 ${
          isClosing
            ? "animate-out slide-out-to-bottom-4 zoom-out-95 duration-500"
            : "animate-in slide-in-from-bottom-4 zoom-in-95 duration-500"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text font-semibold">
              Featured Projects
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, projectIndex) => (
              <ProjectCard
                key={project.title}
                project={project}
                imageIndex={
                  imageIndexes[projectIndex] ?? getInitialImageIndex(projectIndex)
                }
                isTrackAnimating={isTrackAnimating[projectIndex] ?? true}
                onPreviousImage={() => handlePreviousImage(projectIndex)}
                onNextImage={() => handleNextImage(projectIndex)}
                onTrackTransitionEnd={() =>
                  handleTrackTransitionEnd(projectIndex)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
