import { motion } from "motion/react";
import { Zap, Rocket, TrendingUp, ShieldAlert } from "lucide-react";

type Breakthrough = {
  badge: string;
  icon: typeof Zap;
  accentIcons: typeof Zap[];
  stat: string;
  statSubtle?: string;
  description: string;
};

const breakthroughs: Breakthrough[] = [
  {
    badge: "⚡ CRISIS MANAGEMENT",
    icon: Zap,
    accentIcons: [ShieldAlert],
    stat: "< 30 Min",
    statSubtle: "MTTR",
    description:
      "Owned the 24/7 critical on-call rotation for high-value US enterprise accounts. Consistently triaged and resolved off-hours P0 system failures within a 30-minute window, ensuring zero downtime for live global travel infrastructure.",
  },
  {
    badge: "🚀 ARCHITECTURAL VELOCITY",
    icon: Rocket,
    accentIcons: [TrendingUp],
    stat: "3 Mo → 3 Hr",
    description:
      "Engineered an automated multi-level product configuration replication engine. Independently architected and deployed a self-service solution in 3 hours, completely bypassing a projected 3-month product management delivery roadmap.",
  },
];

export default function OperationalBreakthroughs() {
  return (
    <section
      className="relative py-20 px-4 bg-dot-matrix-fade"
      id="operational-breakthroughs"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Defining Moments
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Operational Breakthroughs
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm leading-relaxed">
            Two outcomes that defined how I work under pressure — measurable
            crisis response and aggressive roadmap compression.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {breakthroughs.map((item, i) => (
            <motion.article
              key={item.badge}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden p-8 md:p-10 rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Faint background glyph */}
              <item.icon className="absolute -bottom-10 -right-10 w-44 h-44 text-emerald-500/[0.05] group-hover:text-emerald-500/[0.08] transition-colors pointer-events-none" />

              <div className="relative">
                {/* Micro-badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-slate-200 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-700">
                    {item.badge}
                  </span>
                </div>

                {/* Large stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.15, duration: 0.5 }}
                  className="mb-2 flex items-baseline gap-3 flex-wrap"
                >
                  <span className="inline-block px-4 py-2 rounded-xl border border-emerald-500/25 bg-white/70 animate-stat-pulse-glow">
                    <span className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-none">
                      {item.stat}
                    </span>
                  </span>
                  {item.statSubtle && (
                    <span className="font-mono text-sm uppercase tracking-[0.25em] text-emerald-700">
                      {item.statSubtle}
                    </span>
                  )}
                </motion.div>

                {/* Accent rule */}
                <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-500 to-emerald-300 my-5" />

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-[15px] max-w-xl">
                  {item.description}
                </p>

                {/* Footer accent icons */}
                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    0{i + 1} / 02 · Breakthrough
                  </span>
                  <div className="flex gap-1.5">
                    {item.accentIcons.map((Icon, idx) => (
                      <Icon
                        key={idx}
                        className="w-3.5 h-3.5 text-slate-400"
                        strokeWidth={2.25}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
