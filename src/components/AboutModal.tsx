type Props = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, isClosing, onClose }: Props) {
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
        className={`bg-zinc-800/60 backdrop-blur-xl rounded-3xl border border-zinc-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative transition-all duration-500 ${
          isClosing
            ? "animate-out slide-out-to-bottom-4 zoom-out-95 duration-500"
            : "animate-in slide-in-from-bottom-4 zoom-in-95 duration-500"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text font-semibold">
              About Me
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              I'm currently a 2nd year Software Engineering student at the
              University of Auckland.
            </p>
            <p>
              My interests include back-end applications, API creation and
              integration, as well as machine learning and artificial
              intelligence.
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
