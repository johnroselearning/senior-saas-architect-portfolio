import { motion } from "motion/react";
import { Zap, ShieldAlert, Workflow, MessagesSquare, Sparkles, Compass, Target, Wrench } from "lucide-react";

const principles = [
  {
    icon: Zap,
    title: "Constraint-Driven Innovation",
    body: "The tightest constraints and highest pressures distill the noise out of a problem, rapidly revealing the most efficient engineering pathways.",
  },
  {
    icon: ShieldAlert,
    title: "Rapid Incident Mitigation",
    body: "Prioritizing immediate severity reduction over analysis to protect live operations.",
  },
  {
    icon: MessagesSquare,
    title: "Executive-Level Transparency",
    body: "Trusted by client CEOs and core top management to lead high-stakes technical communications during critical P0 incidents, translating severe engineering anomalies into clear, strategic business decisions.",
  },
  {
    icon: Workflow,
    title: "Zero-Friction Automation",
    body: "Coding permanent architectural systems instead of temporary patches.",
  },
];

const missionPoints = [
  {
    icon: Sparkles,
    title: "Inspiration-Driven Development",
    body: "Doing work that challenges and excites daily.",
  },
  {
    icon: Compass,
    title: "Boundless Technical Curiosity",
    body: "Pushing limits with emerging tech (like Agentic AI).",
  },
  {
    icon: Target,
    title: "Purpose-Over-Boilerplate",
    body: "Building secure, high-impact systems that genuinely matter.",
  },
];

export default function Philosophy() {
  return (
    <section className="relative py-24 px-4 bg-dot-matrix-fade overflow-hidden" id="philosophy">
      {/* Ambient emerald glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-emerald-200/25 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3">
            How I Operate
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Philosophy &amp; Mission
          </h2>
          <div className="mt-5 mx-auto w-16 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Engineering Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Wrench size={14} strokeWidth={2.25} />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-700">
                01 / Framework
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">
              Engineering Philosophy
            </h3>

            <ul className="space-y-5">
              {principles.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-4 group/item"
                >
                  <div className="mt-0.5 p-2 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 group-hover/item:bg-emerald-50 group-hover/item:border-emerald-200 transition-colors shrink-0">
                    <p.icon size={15} strokeWidth={2.25} />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-sm font-semibold text-slate-900 tracking-tight">
                      {p.title}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Personal Mission */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="group bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Target size={14} strokeWidth={2.25} />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-700">
                02 / Intent
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">
              Personal Mission
            </h3>

            <blockquote className="relative mb-8">
              <span className="absolute -top-4 -left-1 text-5xl text-emerald-500/40 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="pl-6 text-xl md:text-2xl font-serif italic text-slate-800 leading-snug">
                to do work that inspires me{" "}
                <span className="text-emerald-700 not-italic font-medium">
                  every single day.
                </span>
              </p>
            </blockquote>

            <div className="h-px w-12 bg-gradient-to-r from-emerald-500/60 to-transparent mb-8" />

            <div className="space-y-5">
              {missionPoints.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <m.icon size={14} className="text-emerald-600 shrink-0 mt-[5px]" strokeWidth={2.25} />
                  <div>
                    <p className="font-serif text-base font-semibold text-slate-900 leading-tight">
                      {m.title}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed font-light mt-1">
                      {m.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
