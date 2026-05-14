import { motion } from "motion/react";
import { MountainSnow, Compass, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "ExploreMunnar.ai",
    description:
      "An AI-driven tourism recommendation platform built during a strategic career break to explore localized niche-SaaS markets.",
    tags: ["React", "Python", "MongoDB"],
    icon: MountainSnow,
    meta: "Venture · Niche-SaaS",
  },
  {
    title: "Nightingale Compass",
    description:
      "A community-focused web platform engineered to deliver personalized recommendations and localized travel insights.",
    tags: ["FastAPI", "React", "MongoDB"],
    icon: Compass,
    meta: "Community · Platform",
  },
];

export default function IndependentProjects() {
  return (
    <section className="relative py-20 px-4 bg-dot-matrix-fade" id="independent-projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3">
              Venture &amp; Community Platforms
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Strategic &amp; Community Solutions
            </h2>
          </div>
          <div className="hidden md:block h-px w-32 bg-gradient-to-r from-emerald-500/60 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="group bg-white border border-slate-200 rounded-xl p-6 md:p-7 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.18)] hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-700 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors shrink-0">
                  <project.icon className="w-5 h-5" strokeWidth={2.25} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
                      {project.meta}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 bg-slate-50 text-slate-700 rounded border border-slate-200 group-hover:border-emerald-500/30 transition-colors"
                      >
                        {tag}
                      </span>
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
