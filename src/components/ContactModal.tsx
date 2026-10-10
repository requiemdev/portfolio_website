import { useState } from "react";

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
    } catch {
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
      className={`modal-backdrop fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-2 ${
        isClosing ? "is-closing" : "is-opening"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className={`modal-sheet rounded-3xl border border-zinc-700/50 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative ${
          isClosing ? "is-closing" : "is-opening"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 via-slate-500/5 to-transparent rounded-3xl"></div>
        <div className="relative z-10">
          <div className="modal-header flex justify-between items-center mb-4">
            <h2 id="contact-title" className="text-2xl text-transparent bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text font-semibold">
              Contact
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="tactile-control close-control h-11 w-11 text-white/60 text-2xl"
              aria-label="Close contact"
              autoFocus
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <div className="w-full flex flex-col items-center gap-2">
                <div className="text-sm text-white/70">Email</div>
                <a
                  href={`mailto:${email}`}
                  className="tactile-control social-link inline-flex min-h-11 items-center text-white font-medium underline underline-offset-4"
                >
                  {email}
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="tactile-control glass-action mt-2 inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/6 border border-zinc-700/40 text-white text-sm"
                >
                  Copy Email
                </button>

                {copied && (
                  <div className="text-sm text-green-400 mt-1" role="status">Copied!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
