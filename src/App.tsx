import { useCallback, useEffect, useRef, useState } from "react";
import ContactModal from "./components/ContactModal";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import Projects from "./components/Projects";

type ModalName = "contact";

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

  // A wheel notch is too short to leave a mandatory snap point, so the browser scrolls then yanks back. Each notch plays one full page change instead, eased like a trackpad swipe.
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastWheel = -Infinity;
    let burstIsMouse = false;

    const swipeOnWheel = (event: WheelEvent) => {
      const el = event.target as Element;
      // shortcut: no API tells a wheel from a trackpad, so judge each burst by its first event. A notch arrives alone and already several pixels (or in lines); a trackpad gesture starts at a pixel or two. Smooth-scrolling mouse drivers look like a trackpad and scroll natively.
      // deltaMode must be read before deltaY, or Firefox reports lines as pixels
      const lines = event.deltaMode !== 0;
      if (event.timeStamp - lastWheel > 150) {
        burstIsMouse = lines || Math.abs(event.deltaY) >= 4;
      }
      lastWheel = event.timeStamp;
      if (
        !burstIsMouse ||
        event.ctrlKey ||
        event.deltaY === 0 ||
        !el.closest("main")
      ) {
        return;
      }
      // notches during a swipe are swallowed, so a spin can't queue up pages
      if (frame) return event.preventDefault();
      if (getComputedStyle(root).scrollSnapType === "none") return;

      const down = event.deltaY > 0;
      // a page taller than the viewport scrolls inside itself first
      const body = el.closest(".folder-body");
      if (
        body &&
        (down
          ? body.scrollTop + body.clientHeight < body.scrollHeight - 1
          : body.scrollTop > 0)
      ) {
        return;
      }

      const from = window.scrollY;
      const stops = [
        ...document.querySelectorAll("#desktop, .folder-anchor"),
      ].map(
        (stop) =>
          stop.getBoundingClientRect().top +
          from -
          parseFloat(getComputedStyle(stop).scrollMarginTop),
      );
      const to = down
        ? stops.find((stop) => stop > from + 1)
        : stops.filter((stop) => stop < from - 1).pop();
      // no stop that way, or partway down the last page, which scrolls with the document
      if (to === undefined || (!down && to === stops[stops.length - 1])) return;

      event.preventDefault();
      // snapping would pull every frame of the swipe onto a stop
      root.style.scrollSnapType = "none";
      const start = performance.now();
      const tick = (now: number) => {
        // a frame's timestamp can predate start, which would nudge the page backwards first
        const t = Math.min(Math.max(now - start, 0) / 800, 1);
        window.scrollTo({
          top: from + (to - from) * (1 - (1 - t) ** 4),
          behavior: "instant",
        });
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          frame = 0;
          root.style.scrollSnapType = "";
        }
      };
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", swipeOnWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", swipeOnWheel);
      cancelAnimationFrame(frame);
      root.style.scrollSnapType = "";
    };
  }, []);

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
      <div
        aria-hidden={activeModal ? true : undefined}
        inert={activeModal ? true : undefined}
      >
        <div className="wallpaper fixed inset-0 -z-10" />
        <main id="main-content">
          <Desktop />
          <Dock onOpen={openModal} />
          <Projects />
        </main>
      </div>

      <ContactModal
        isOpen={activeModal === "contact"}
        isClosing={isClosing}
        onClose={handleCloseModal}
      />
    </>
  );
}
