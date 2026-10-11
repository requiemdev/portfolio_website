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
import vehicleDashboard from "../images/vehicle_dashboard.webp";
import vehicleTelemetry from "../images/vehicle_telemetry.webp";
import ff from "../images/ff.webp";
import meowpad_built from "../images/meowpad_built.webp";
import tankArenaAward from "../images/tank_arena_award.webp";
import tankArenaController from "../images/tank_arena_controller.webp";
import tankArenaHardware from "../images/tank_arena_hardware.webp";
import tankArenaTanks from "../images/tank_arena_tanks.webp";

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
    slug: "vehicle-ev-simulator",
    title: "Vehicle EV Simulator",
    description: (
      <>
        Full-stack simulation of an electric vehicle's remote charging
        controls. A vanilla HTML/CSS/JS dashboard shows the live battery and
        charging state, starts or stops charging, and sets a charging schedule
        through an ASP.NET Core API on .NET 10, which checks vehicle ownership
        against Azure SQL before calling Azure Functions. A C# vehicle
        simulator connects to Azure IoT Hub over MQTT, sending telemetry every
        15 seconds and responding to direct-method charging commands. Schedules
        are written to the device twin's desired properties with ETag-based
        optimistic concurrency, and the simulator reports back whether each
        revision was applied or rejected.
      </>
    ),
    images: [
      { src: vehicleDashboard, alt: "Vehicle EV Simulator - Dashboard" },
      {
        src: vehicleTelemetry,
        alt: "Vehicle EV Simulator - Simulator Telemetry Log",
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
    slug: "tank-arena",
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
    slug: "ferrous-fellow",
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
    slug: "rfid-record-player",
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
    slug: "meowpad",
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
