import type { ReactNode } from "react";
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
import vehicleDashboard from "../images/vehicle_dashboard.webp";
import vehicleTelemetry from "../images/vehicle_telemetry.webp";
import ff from "../images/ff.webp";
import meowpad_built from "../images/meowpad_built.webp";
import tankArenaAward from "../images/tank_arena_award.webp";
import tankArenaController from "../images/tank_arena_controller.webp";
import tankArenaHardware from "../images/tank_arena_hardware.webp";
import tankArenaTanks from "../images/tank_arena_tanks.webp";
import agentQaStart from "../images/agent_qa_start.webp";
import agentQaPlan from "../images/agent_qa_plan.webp";
import agentQaRun from "../images/agent_qa_run.webp";
import agentQaResults from "../images/agent_qa_results.webp";
import agentQaReport from "../images/agent_qa_report.webp";
import astralAnswer from "../images/astral_answer.webp";
import astralAttachment from "../images/astral_attachment.webp";
import astralThinking from "../images/astral_thinking.webp";

export type Project = {
  // projects with a slug get a desktop folder and their own stacked page
  slug?: string;
  title: string;
  description: ReactNode;
  images: Array<{ src: string; alt: string }>;
  tags: string[];
  github: string;
  linkedin?: string;
};

export const projects: Project[] = [
  {
    slug: "tank-arena",
    title: "Tank Arena",
    description: (
      <>
        Winner of the Engineering Excellence Award for the Part III division.
        <br />
        <br />
        One-month long 5-man team project. 2-man tank fighter that uses custom
        3D printed parts. Tanks shoot using 38 kHz IR emitters and are controlled
        over a phone & local server using WebSockets.
        <br />
        <br />
        Designed and built the WebSocket game server and browser interfaces:
        real-time controls, hit validation, match progression, spectator views,
        and a persistent leaderboard. Local-network latency stayed under 10 ms
        with 0% packet loss during testing.
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
    slug: "astral",
    title: "Astral",
    description: (
      <>
        A cross-platform ultra-lightweight AI chat box built in Typescript and
        Rust on Tauri. It opens an overlay where users can start a conversation
        or ask questions to any LLMs available. Connections allowed include
        Claude/Codex subscriptions, and OpenAI/Claude/Gemini API keys. Allows
        file and image uploads, and has screen awareness.
      </>
    ),
    images: [
      { src: astralAnswer, alt: "Astral - Answer with a code example" },
      {
        src: astralAttachment,
        alt: "Astral - Question about an attached screenshot",
      },
      { src: astralThinking, alt: "Astral - Waiting on a reply" },
    ],
    tags: ["Tauri", "Rust", "React", "TypeScript", "Claude API", "OpenAI API"],
    github: "https://github.com/requiemdev/some-ai-app",
  },
  {
    slug: "ev-charging-simulator",
    title: "EV Charging Simulator",
    description: (
      <>
        Full-stack simulation of remote charging for an electric vehicle. A
        vanilla HTML/CSS/JS dashboard shows the live battery and charging state,
        and lets the owner start or stop charging or set a schedule.
        <br />
        <br />
        Requests go through an ASP.NET Core API on .NET 10, which checks vehicle
        ownership in Azure SQL before calling Azure Functions.
        <br />
        <br />A C# simulator plays the vehicle: it connects to Azure IoT Hub
        over MQTT, sends telemetry every 15 seconds, and responds to
        direct-method charging commands. Schedules are written to the device
        twin with ETag-based optimistic concurrency, and the simulator reports
        whether each one was applied or rejected.
      </>
    ),
    images: [
      { src: vehicleDashboard, alt: "EV Charging Simulator - Dashboard" },
      {
        src: vehicleTelemetry,
        alt: "EV Charging Simulator - Simulator Telemetry Log",
      },
    ],
    tags: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "Azure IoT Hub",
      "Azure Functions",
      "Azure SQL",
      "MQTT",
      "JavaScript",
    ],
    github: "https://github.com/requiemdev/vehicle_api",
  },
  {
    slug: "agent-qa",
    title: "Agent QA",
    description: (
      <>
        A local QA CLI for JavaScript and TypeScript projects. Point it at a
        repository, a running localhost URL and a short description of the
        change, and it diffs the branch against its merge base, plans test
        scenarios, and explores them in Chromium through Playwright MCP.
        <br />
        <br />
        It then generates Playwright and unit tests, shows them for approval,
        and runs them with screenshots and traces. A final AI stage reads the
        evidence and reports the failures with a suspected cause and suggested
        fix.
        <br />
        <br />
        Each stage is a sandboxed Codex call with a strict JSON schema, and
        every session is saved to disk so it can be reopened, rerun or exported.
      </>
    ),
    images: [
      { src: agentQaStart, alt: "Agent QA - Branch context and analysis" },
      { src: agentQaPlan, alt: "Agent QA - Scenario plan and exploration" },
      { src: agentQaRun, alt: "Agent QA - Test approval and observed failure" },
      { src: agentQaResults, alt: "Agent QA - Coverage and final result" },
      { src: agentQaReport, alt: "Agent QA - Saved Markdown report" },
    ],
    tags: [
      "TypeScript",
      "Node.js",
      "Playwright",
      "Playwright MCP",
      "Codex CLI",
      "CLI",
    ],
    github: "https://github.com/requiemdev/ai-qa-tool",
  },
  {
    title: "Ferrous Fellow",
    description: (
      <>
        A toy robot that recognises faces and speech using TensorFlow Lite and
        OpenCV. It analyses emotional cues from visual and verbal inputs and
        passes it through the OpenAI API to recommend music.
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
        An RFID record player inspired by{" "}
        <a href="https://github.com/fatihak/RFID-Record-Player">
          fatihak&apos;s project
        </a>
        , made cheaper by swapping the original Raspberry Pi Zero 2W for an
        ESP-32. Each "record" carries an RFID tag mapped to a Spotify track ID,
        which a reader inside the turntable picks up. Move the tonearm into
        position and the song plays on your Spotify while the record spins. Move
        it away and the record stops and the music pauses.
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
    slug: "meowpad",
    title: "MeowPad",
    description: (
      <>
        A hot-swappable number pad designed from scratch: PCB in KiCAD, case and
        plate in AutoCAD Inventor, firmware in QMK. It runs on an Arduino Pro
        Micro footprint MCU, with an OLED display and an EC11 rotary encoder
        knob. Switches, keycaps and cases are all customisable, and it can be
        built with a 3D printed case on PCB-mounted standoffs or a stacked
        acrylic plate mount.
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
        An interactive trial simulation built with my teammates for the SE206
        Design Project. The player is dropped into a morally ambiguous dilemma
        and chats with the parties involved to decide whether the defendant's
        actions were justified.
        <br />
        <br />
        The AI defendants are powered by OpenAI's LLM API and voiced by Google's
        TTS API. Built with JavaFX and Java concurrency, using collaborative
        GitHub workflows and regular client interviews to practise requirements
        engineering.
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
        A work-in-progress cloud image hosting site. React and Tailwind CSS on
        the frontend, Express.js with Firebase and Firestore for backend logic
        and authentication, and Cloudflare R2 for image storage.
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
        A modular Discord bot for server moderation and entertainment, built
        with Discord.js and Node.js and integrating MongoDB, Reddit, and the
        VALORANT API. Music features include queueing, volume control, and voice
        filters. It started as several bots, later merged into one.
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
        A basic API wrapper for crowd-sourced game market data, plus a random
        forest regressor in sklearn that predicts in-game prices.
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
        A CLI adaptation of the classic board game Risk, built for SOFTENG 281:
        Object Oriented Programming using design patterns, data structures and
        algorithms. Passed all test cases, and I received 99.7% overall in the
        course.
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
