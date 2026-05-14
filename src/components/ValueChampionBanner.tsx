import { motion } from "motion/react";
import { Trophy, Award, Sparkles } from "lucide-react";

export default function ValueChampionBanner() {
  return (
    <section className="relative py-12 px-4" id="value-champion">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-[#FDF8EE] via-[#FBF4E4] to-[#F8FAFC] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          {/* Faint background glyph */}
          <Trophy className="absolute -right-8 -bottom-10 w-56 h-56 text-amber-500/[0.07] pointer-events-none" />

          {/* Sparkle accents */}
          <Sparkles className="absolute top-5 right-6 w-4 h-4 text-amber-400/60 pointer-events-none" />

          <div className="relative px-7 md:px-10 py-8 md:py-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Trophy tile */}
            <div className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white border border-amber-200 text-amber-600 shadow-[0_8px_20px_-12px_rgba(245,158,11,0.5)]">
              <Award className="w-7 h-7" strokeWidth={2.25} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-amber-400/60" />
                Social Proof · Recognition
              </p>

              <h3 className="text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight leading-snug mb-3">
                <span className="mr-1">🏆</span>
                3x Corporate Value Champion &amp; SLA Leader
              </h3>

              <p className="text-slate-700 leading-relaxed max-w-3xl">
                Recognized three times natively for exceptional operational ownership,
                driving a{" "}
                <span className="font-semibold text-slate-900">
                  95% compression in ticket turnaround time
                </span>{" "}
                while maintaining a flawless{" "}
                <span className="font-semibold text-slate-900">
                  100% customer satisfaction (CSAT) score
                </span>{" "}
                across critical US enterprise accounts.
              </p>
            </div>

            {/* Mini medal trio */}
            <div className="hidden md:flex flex-col items-center gap-2 shrink-0 border-l border-amber-200/70 pl-8">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-full bg-white border border-amber-300 flex items-center justify-center font-mono text-[11px] font-bold text-amber-700 shadow-sm"
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-700">
                3× Awarded
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
