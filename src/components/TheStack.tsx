import { motion } from "motion/react";
import { Brain, Cloud, Code2, Database, LifeBuoy, Workflow } from "lucide-react";

type Skill = { name: string; score: number };

const stackItems: {
  category: string;
  icon: typeof Code2;
  color: string;
  caption: string;
  skills: Skill[];
}[] = [
  {
    category: "Support & Incident Ops",
    icon: LifeBuoy,
    color: "text-emerald-600",
    caption: "5+ years owning the SLA clock",
    skills: [
      { name: "P0 / P1 Triage", score: 95 },
      { name: "Root Cause Analysis", score: 95 },
      { name: "SLA & Ticket Lifecycle", score: 95 },
      { name: "Jira / Confluence", score: 90 },
      { name: "ITIL-aligned Processes", score: 85 },
    ],
  },
  {
    category: "Programming, Cloud & APIs",
    icon: Code2,
    color: "text-blue-600",
    caption: "Engineering automated infrastructure across distributed environments",
    skills: [
      { name: "Python", score: 90 },
      { name: "REST APIs (Postman)", score: 90 },
      { name: "FastAPI", score: 80 },
      { name: "Bash / Linux", score: 80 },
      { name: "JavaScript / React", score: 75 },
      { name: "SQL", score: 75 },
      { name: "Flask", score: 65 },
    ],
  },
  {
    category: "GenAI & LLM",
    icon: Brain,
    color: "text-purple-600",
    caption: "ExploreMunnar.ai + ongoing upskilling",
    skills: [
      { name: "LLM Output Debugging", score: 80 },
      { name: "Prompt Engineering", score: 80 },
      { name: "RAG Architectures", score: 75 },
      { name: "LangChain", score: 70 },
      { name: "Embedding Models", score: 65 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "text-orange-600",
    caption: "Serverless AWS deploys + container debugging",
    skills: [
      { name: "AWS (Lambda, S3, CloudFront, EC2)", score: 80 },
      { name: "Docker", score: 80 },
      { name: "Kubernetes (pod/service debug)", score: 70 },
      { name: "GCP", score: 60 },
      { name: "CI/CD Basics", score: 60 },
      { name: "Azure", score: 55 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    color: "text-rose-600",
    caption: "Query, debug, and trace data flow",
    skills: [
      { name: "MongoDB", score: 75 },
      { name: "MySQL", score: 75 },
    ],
  },
  {
    category: "Communication & Soft Skills",
    icon: Workflow,
    color: "text-teal-600",
    caption: "C-suite to end-user, same clarity",
    skills: [
      { name: "Cross-Functional Collaboration", score: 95 },
      { name: "User Empathy & CSAT", score: 95 },
      { name: "Operating in Ambiguity", score: 90 },
      { name: "Analytical Reasoning", score: 90 },
    ],
  },
];

const stats = [
  { label: "Years in Support", value: "5+" },
  { label: "Quarterly CSAT", value: "100%" },
  { label: "RCA Success Rate", value: "83%" },
  { label: "Ticket Turnaround", value: "−95%" },
];


export default function TheStack() {
  return (
    <section className="py-24 bg-slate-50" id="stack">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">The Technical Ecosystem</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Self-rated proficiency across the stack — weighted by years of use and depth of production evidence on real
            incidents and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackItems.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-8 bg-white border border-slate-200 rounded-xl hover:border-emerald-500/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-slate-50 border border-slate-200 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.category}</h3>
              </div>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-6">{item.caption}</p>

              <ul className="space-y-4">
                {item.skills.map((skill) => (
                  <li key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-baseline text-sm">
                      <span className="text-slate-700 font-mono">{skill.name}</span>
                      <span className="text-slate-500 font-mono text-xs">{skill.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Outcomes grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center"
            >
              <p className="text-xs font-mono text-slate-500 uppercase mb-1 tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-emerald-700">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
