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

  // A wheel notch is too short to leave a mandatory snap point, so the browser scrolls then yanks back. Page one stop per notch instead.
  useEffect(() => {
    let lockedUntil = 0;
    const pageOnWheel = (event: WheelEvent) => {
      const target = event.target as Element;
      const wheelDeltaY = (event as WheelEvent & { wheelDeltaY?: number })
        .wheelDeltaY;
      // shortcut: trackpads report pixel deltas with wheelDeltaY = -3 * deltaY, wheels report lines or 120-steps; Safari mice look like trackpads and keep native scrolling
      const isMouseWheel =
        event.deltaMode !== 0 ||
        (wheelDeltaY !== undefined &&
          wheelDeltaY % 120 === 0 &&
          wheelDeltaY !== -3 * event.deltaY);
      if (
        !isMouseWheel ||
        event.ctrlKey ||
        event.deltaY === 0 ||
        !target.closest("main") ||
        getComputedStyle(document.documentElement).scrollSnapType === "none"
      ) {
        return;
      }

      const down = event.deltaY > 0;
      // a page taller than the viewport scrolls inside itself first
      const body = target.closest(".folder-body");
      if (
        body &&
        (down
          ? body.scrollTop + body.clientHeight < body.scrollHeight - 1
          : body.scrollTop > 0)
      ) {
        return;
      }

      const stops = [
        ...document.querySelectorAll("#desktop, .folder-anchor"),
      ];
      const offsets = stops.map(
        (stop) =>
          stop.getBoundingClientRect().top -
          parseFloat(getComputedStyle(stop).scrollMarginTop),
      );
      const next = down
        ? offsets.findIndex((offset) => offset > 1)
        : offsets.map((offset) => offset < -1).lastIndexOf(true);
      // no stop that way, or partway down the last page, which scrolls with the document
      if (next === -1 || (!down && next === stops.length - 1)) return;

      event.preventDefault();
      if (event.timeStamp < lockedUntil) return;
      lockedUntil = event.timeStamp + 500;
      stops[next].scrollIntoView();
    };

    window.addEventListener("wheel", pageOnWheel, { passive: false });
    return () => window.removeEventListener("wheel", pageOnWheel);
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
