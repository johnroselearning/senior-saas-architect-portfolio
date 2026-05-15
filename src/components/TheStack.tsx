import { motion } from "motion/react";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Activity,
  Eye,
  Layers,
} from "lucide-react";

type Skill = { name: string; score: number };

const stackItems: {
  category: string;
  layer: string;
  icon: typeof Code2;
  color: string;
  caption: string;
  skills: Skill[];
}[] = [
  {
    category: "Orchestration & Frameworks",
    layer: "Agent Ops Layer 1",
    icon: GitBranch,
    color: "text-emerald-600",
    caption: "Graph-based agent orchestration & workflow automation",
    skills: [
      { name: "LangGraph", score: 92 },
      { name: "CrewAI", score: 82 },
      { name: "n8n", score: 88 },
      { name: "Custom State Machines", score: 85 },
      { name: "LangChain", score: 78 },
    ],
  },
  {
    category: "Models & RAG",
    layer: "Agent Ops Layer 2",
    icon: Brain,
    color: "text-purple-600",
    caption: "LLM integration, prompt engineering & retrieval-augmented generation",
    skills: [
      { name: "OpenAI API (GPT-4o)", score: 90 },
      { name: "Claude / Anthropic", score: 82 },
      { name: "Gemini (Flash & Pro)", score: 85 },
      { name: "Vector DBs (Milvus, Pinecone)", score: 80 },
      { name: "Embedding Models & RAG", score: 82 },
    ],
  },
  {
    category: "Backend & Execution",
    layer: "Agent Ops Layer 3",
    icon: Code2,
    color: "text-blue-600",
    caption: "High-concurrency agentic backend infrastructure",
    skills: [
      { name: "Python", score: 92 },
      { name: "FastAPI", score: 88 },
      { name: "Secure Sandbox Containers", score: 80 },
      { name: "AWS (Lambda, ECS, S3)", score: 82 },
      { name: "Docker & Kubernetes", score: 78 },
    ],
  },
  {
    category: "AgentOps & Observability",
    layer: "Agent Ops Layer 4",
    icon: Eye,
    color: "text-orange-600",
    caption: "Tracing, evaluation & continuous monitoring of agent systems",
    skills: [
      { name: "LangSmith", score: 88 },
      { name: "Phoenix (Arize)", score: 78 },
      { name: "OpenLLMetry", score: 72 },
      { name: "Structured Logging & Alerts", score: 85 },
    ],
  },
  {
    category: "Data & Storage",
    layer: "Supporting Infrastructure",
    icon: Database,
    color: "text-rose-600",
    caption: "Persistent state, vector retrieval & relational stores",
    skills: [
      { name: "MongoDB (Tenant State)", score: 82 },
      { name: "PostgreSQL", score: 80 },
      { name: "Redis (Agent Cache)", score: 85 },
      { name: "MySQL", score: 72 },
    ],
  },
  {
    category: "Integration & Delivery",
    layer: "Supporting Infrastructure",
    icon: Layers,
    color: "text-teal-600",
    caption: "APIs, webhooks & cross-system agent communication channels",
    skills: [
      { name: "REST & Webhook APIs", score: 92 },
      { name: "WhatsApp Business API", score: 85 },
      { name: "CI/CD Pipelines", score: 72 },
      { name: "Bash / Linux Scripting", score: 82 },
    ],
  },
];

const stats = [
  { label: "Production Agent Systems", value: "2 Live" },
  { label: "Agent Decision Accuracy", value: ">92%" },
  { label: "HITL Escalation Rate", value: "<8%" },
  { label: "Agent MTTR (P0)", value: "< 30 Min" },
  { label: "Roadmap Compression", value: "3 Months → 3 Hours", highlight: true },
];


export default function TheStack() {
  return (
    <section className="py-24 bg-slate-50" id="stack">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Agent Stack Matrix
          </p>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">The AgentOps Ecosystem</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Proficiency across the full agentic stack — from graph orchestration frameworks and RAG
            pipelines to production backends, observability tooling, and secure execution environments.
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
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-lg bg-slate-50 border border-slate-200 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.category}</h3>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-700 mb-1">
                {item.layer}
              </p>
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={
                stat.highlight
                  ? "relative p-5 bg-emerald-600 border border-emerald-600 rounded-lg flex flex-col items-center justify-center text-center shadow-[0_10px_24px_-12px_rgba(16,185,129,0.55)] col-span-2 md:col-span-1"
                  : "p-5 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center"
              }
            >
              {stat.highlight && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
              )}
              <p
                className={
                  stat.highlight
                    ? "text-[10px] font-mono text-emerald-50 uppercase mb-1.5 tracking-widest"
                    : "text-xs font-mono text-slate-500 uppercase mb-1 tracking-widest"
                }
              >
                {stat.label}
              </p>
              <p
                className={
                  stat.highlight
                    ? "text-base md:text-lg font-bold text-white leading-tight"
                    : "text-2xl font-bold text-emerald-700"
                }
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
