import { motion } from "motion/react";
import { Shield, Bot, Rocket, ArrowUpRight, Activity, Lock, Cpu } from "lucide-react";

type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  bullet: string;
  icon: typeof Shield;
  accentIcons: typeof Shield[];
  badge: string;
};

const projects: Project[] = [
  {
    title: "Financial Sentinel",
    tagline: "Fintech · Real-Time Risk",
    description:
      "Real-time transaction security engine designed for <50ms latency using Go concurrency and FastAPI.",
    tags: ["Go", "FastAPI", "Behavioral Biometrics", "Post-Quantum Cryptography"],
    bullet:
      "Developed dynamic risk scoring to intercept malicious UPI mandates and fraud before user execution.",
    icon: Shield,
    accentIcons: [Lock, Activity],
    badge: "P0 · Latency Critical",
  },
  {
    title: "Project Anti-Gravity",
    tagline: "Health-Tech SaaS · Multi-Tenant",
    description:
      "A multi-tenant medical triage system utilizing a stateful multi-agent architecture.",
    tags: ["LangGraph", "FastAPI", "WhatsApp Business API"],
    bullet:
      "Built deterministic clinical workflows with automated PII scrubbing and Human-in-the-Loop safety guardrails.",
    icon: Bot,
    accentIcons: [Cpu, Activity],
    badge: "HIPAA-Aware · Agentic",
  },
];

export default function ProjectCards() {
  return (
    <section className="relative py-24 px-4 bg-dot-matrix-fade" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center gap-2">
              <Rocket className="w-3.5 h-3.5" /> Primary Technical Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Core Architecture &amp; AI Systems
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm leading-relaxed">
            Production-grade systems where latency, safety, and concurrency are non-negotiable.
            Two flagship architectures shipped end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)] hover:border-emerald-500/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative corner ticks */}
              <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                0{index + 1} / 02
              </div>

              {/* Faint background icon */}
              <project.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-emerald-500/[0.04] group-hover:text-emerald-500/[0.07] transition-colors pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <project.icon className="w-5 h-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3 gap-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md border border-slate-200 group-hover:border-emerald-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlight bullet */}
                <div className="relative pl-4 border-l-2 border-emerald-500/60 bg-emerald-50/40 rounded-r-md py-3 pr-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 block mb-1">
                      Impact
                    </span>
                    {project.bullet}
                  </p>
                </div>

                {/* Badge footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {project.badge}
                  </span>
                  <div className="flex gap-1.5">
                    {project.accentIcons.map((Icon, i) => (
                      <Icon key={i} className="w-3.5 h-3.5 text-slate-400" />
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
