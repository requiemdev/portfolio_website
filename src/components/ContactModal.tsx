import { useState } from "react";
import { SiLinkedin, SiGithub } from "react-icons/si";

type Props = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, isClosing, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const email = "ryan.yun.tsai@gmail.com";

  if (!isOpen) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback for unsupported environments
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        className={`bg-zinc-800/60 backdrop-blur-xl rounded-3xl border border-zinc-700/50 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative transition-all duration-500 ${
          isClosing
            ? "animate-out slide-out-to-bottom-4 zoom-out-95 duration-500"
            : "animate-in slide-in-from-bottom-4 zoom-in-95 duration-500"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-transparent bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text font-semibold">
              Contact
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors text-2xl"
              aria-label="Close contact"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <SiLinkedin className="w-6 h-6 text-[#c084fc]" />
                <a
                  href="https://www.linkedin.com/in/ryan-yun-tsai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  LinkedIn
                </a>
              </div>

              <div className="flex items-center gap-3">
                <SiGithub className="w-6 h-6 text-[#c084fc]" />
                <a
                  href="https://github.com/requiemdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white"
                >
                  GitHub
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-700/30 w-full" />

              <div className="w-full flex flex-col items-center gap-2">
                <div className="text-sm text-white/70">Email</div>
                <div className="text-white font-medium">{email}</div>

                <button
                  onClick={copyEmail}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/6 backdrop-blur-md border border-zinc-700/40 text-white text-sm hover:bg-white/8 transition"
                >
                  Copy Email
                </button>

                {copied && (
                  <div className="text-sm text-green-400 mt-1">Copied!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
