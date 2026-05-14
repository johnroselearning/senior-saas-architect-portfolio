import { useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Phone, ShieldCheck, X } from "lucide-react";

// Phone is base64-encoded so it isn't scraped from the static bundle in plain text.
// Decoded only after the user solves a small math challenge.
const ENCODED_PHONE = "KzkxOTQ0NzY0NTQxOA==";
const EMAIL = "johnrosemca@gmail.com";
const LINKEDIN = "https://linkedin.com/in/johnroses";

function decodePhone() {
  if (typeof atob === "undefined") return "";
  return atob(ENCODED_PHONE);
}

function formatPhone(raw: string) {
  // +919447645418 -> +91 94476 45418
  if (raw.length < 5) return raw;
  return `${raw.slice(0, 3)} ${raw.slice(3, 8)} ${raw.slice(8)}`;
}

function PhoneGate({ onClose }: { onClose: () => void }) {
  const challenge = useMemo(() => {
    const a = Math.floor(Math.random() * 7) + 2;
    const b = Math.floor(Math.random() * 7) + 2;
    return { a, b, answer: a + b };
  }, []);

  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);

  const phone = revealed ? decodePhone() : "";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (parseInt(input, 10) === challenge.answer) {
      setRevealed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Quick human check</h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          The phone number is hidden from bots. Solve this to reveal it.
        </p>

        {!revealed ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-mono text-slate-500 uppercase tracking-wider">
                What is {challenge.a} + {challenge.b}?
              </span>
              <input
                autoFocus
                type="number"
                inputMode="numeric"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(false);
                }}
                className={`mt-2 w-full px-4 py-3 rounded-lg border bg-white text-slate-900 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                  error ? "border-red-400" : "border-slate-300"
                }`}
                placeholder="Your answer"
              />
            </label>
            {error && (
              <p className="text-sm text-red-600 font-medium">That doesn't look right. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Reveal number
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <p className="text-xs font-mono text-slate-500 uppercase mb-2 tracking-widest">Phone</p>
              <p className="text-2xl font-bold text-slate-900 font-mono tracking-wide">
                {formatPhone(phone)}
              </p>
            </div>
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Phone size={18} /> Call now
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const [phoneOpen, setPhoneOpen] = useState(false);

  const options = [
    {
      key: "call",
      icon: Phone,
      label: "Call",
      detail: "Verified reveal",
      action: () => setPhoneOpen(true),
      href: undefined,
    },
    {
      key: "email",
      icon: Mail,
      label: "Email",
      detail: EMAIL,
      action: undefined,
      href: `mailto:${EMAIL}`,
    },
    {
      key: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      detail: "linkedin.com/in/johnroses",
      action: undefined,
      href: LINKEDIN,
    },
  ];

  return (
    <section className="py-24 px-4 bg-emerald-600 text-white text-center" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Let's solve the hard problems together.</h2>
        <p className="text-xl mb-12 opacity-90 font-medium">
          Open to Senior Product Support, GenAI/Agentic Systems Engineering, and Cloud
          Infrastructure roles where high availability, automation, and complex system
          debugging intersect.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map((opt) => {
            const Inner = (
              <div className="h-full bg-white text-emerald-700 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-lg">
                <div className="p-3 rounded-full bg-emerald-50 text-emerald-700">
                  <opt.icon size={24} />
                </div>
                <p className="font-bold text-lg text-slate-900">{opt.label}</p>
                <p className="text-sm text-slate-500 font-mono break-all">{opt.detail}</p>
              </div>
            );

            if (opt.href) {
              return (
                <a
                  key={opt.key}
                  href={opt.href}
                  target={opt.key === "linkedin" ? "_blank" : undefined}
                  rel={opt.key === "linkedin" ? "noreferrer" : undefined}
                  className="block"
                >
                  {Inner}
                </a>
              );
            }
            return (
              <button key={opt.key} onClick={opt.action} className="block text-left">
                {Inner}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{phoneOpen && <PhoneGate onClose={() => setPhoneOpen(false)} />}</AnimatePresence>
    </section>
  );
}
