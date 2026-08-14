type Props = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, isClosing, onClose }: Props) {
  if (!isOpen) return null;

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
        aria-labelledby="about-title"
        className={`modal-sheet bg-zinc-900/95 rounded-3xl border border-zinc-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative ${
          isClosing ? "is-closing" : "is-opening"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="modal-header flex justify-between items-center mb-6">
            <h2 id="about-title" className="text-2xl text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text font-semibold">
              About Me
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="tactile-control close-control h-11 w-11 text-white/60 text-2xl"
              aria-label="Close about"
              autoFocus
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              I'm currently a 3rd year Software Engineering student at the
              University of Auckland.
            </p>
            <p>
              My interests include back-end applications, API creation and
              integration, machine learning as well as some electronic design.
            </p>
            <p>
              Outside of work I enjoy playing the guitar, solving Rubik's cubes
              and building small creative projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
