import ferrousImg from "../images/ferrous.png";
import astralImagesImg from "../images/astral_images.png";
import astralBotImg from "../images/astral_bot.png";

type Props = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

export default function ProjectsModal({ isOpen, isClosing, onClose }: Props) {
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
            <div className="bg-zinc-700/40 backdrop-blur-xl rounded-2xl border border-zinc-600/50 p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="h-48 rounded-xl mb-4 overflow-hidden">
                <img
                  src={ferrousImg}
                  alt="Ferrous Fellow"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl text-white mb-2">Ferrous Fellow</h3>
              <p className="text-white/70 mb-4">
                Created a toy robot using TensorFlow Lite and OpenCV for facial
                and speech recognition. Integrated with the OpenAI API to
                analyse emotional cues and recommend music accordingly.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  OpenCV
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  FER
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Machine Learning
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  OpenAI
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all">
                  GitHub
                </button>
              </div>
            </div>

            <div className="bg-zinc-700/40 backdrop-blur-xl rounded-2xl border border-zinc-600/50 p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="h-48 rounded-xl mb-4 overflow-hidden">
                <img
                  src={astralImagesImg}
                  alt="Astral Images"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl text-white mb-2">Astral Images</h3>
              <p className="text-white/70 mb-4">
                WIP Cloud Image Hosting Site for with React and Tailwind CSS on
                the frontend, Express.js, Firebase, and Firestore for backend
                logic and authentication. Used Cloudflare R2 for image storage.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Firebase
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Cloudflare R2
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Express.js
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all">
                  GitHub
                </button>
              </div>
            </div>

            <div className="bg-zinc-700/40 backdrop-blur-xl rounded-2xl border border-zinc-600/50 p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="h-48 rounded-xl mb-4 overflow-hidden">
                <img
                  src={astralBotImg}
                  alt="Astral Bot / Astral Music"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl text-white mb-2">
                Astral Bot/Astral Music
              </h3>
              <p className="text-white/70 mb-4">
                Created a modular Discord bot for server moderation and
                entertainment, integrating MongoDB, Reddit, and VALORANT API.
                Built advanced music features including queueing, volume
                control, and voice filters, later merging multiple bots into a
                unified system using Discord.js and Node.js.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Discord.js
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all">
                  GitHub
                </button>
              </div>
            </div>

            {/* the rest of the projects have identical structure; for brevity only three are included here */}
          </div>
        </div>
      </div>
    </div>
  );
}
