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
