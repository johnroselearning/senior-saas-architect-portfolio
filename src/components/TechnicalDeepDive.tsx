import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { Cpu, Stethoscope, Gauge, ShieldCheck, Database, GitBranch, Lock, MessageSquare, Wrench } from "lucide-react";

type Dive = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: typeof Cpu;
};

type CaseStudy = {
  id: string;
  project: string;
  subheading: string;
  tags: string[];
  icon: typeof Cpu;
  accent: string;
  dives: Dive[];
};

const studies: CaseStudy[] = [
  {
    id: "financial-sentinel",
    project: "Financial Sentinel",
    subheading: "Real-Time Fraud Prevention & Post-Quantum Security",
    tags: ["Go", "FastAPI", "Redis", "PostgreSQL", "PQC Libraries"],
    icon: ShieldCheck,
    accent: "Fintech Security Engine",
    dives: [
      {
        id: "concurrency",
        label: "Concurrency",
        title: "The Concurrency Challenge (<50ms Latency)",
        body:
          "Separated the control plane from the data path. FastAPI handles management logic, while a dedicated Go-based Orchestrator manages the critical transaction pathway using concurrent goroutines to analyze streaming data in under 50ms.",
        icon: Gauge,
      },
      {
        id: "crypto",
        label: "Crypto & Biometrics",
        title: "The Cryptographic & Biometric Moat",
        body:
          "Integrated Post-Quantum Cryptography (PQC) to future-proof stored financial records. Paired this with a Behavioral Biometrics layer that analyzes user interaction patterns to detect malicious UPI mandates and mule accounts.",
        icon: Lock,
      },
      {
        id: "data",
        label: "Data Consistency",
        title: "Data Consistency",
        body:
          "Engineered Python-based parallel data processing scripts to eliminate production SQL \"fan-out\" and data redundancy, ensuring clean data ingestion.",
        icon: Database,
      },
    ],
  },
  {
    id: "medical-triage",
    project: "Medical Triage",
    subheading: "Deterministic Agentic Orchestration for Clinical Safety",
    tags: ["Python", "LangGraph", "FastAPI", "WhatsApp API", "MongoDB"],
    icon: Stethoscope,
    accent: "Agentic Health-Tech SaaS",
    dives: [
      {
        id: "orchestration",
        label: "Agent Orchestration",
        title: "Stateful Multi-Agent Orchestration",
        body:
          "Designed a non-linear workflow using LangGraph to manage complex clinical decision trees. The system uses cyclic graphs to loop back for clarifying patient symptoms while maintaining strict state persistence.",
        icon: GitBranch,
      },
      {
        id: "guardrails",
        label: "Privacy & Safety",
        title: "Privacy & Safety Guardrails",
        body:
          "Implemented an ingestion pipeline using spaCy NER to redact PII before LLM processing. Built a native Human-in-the-Loop (HITL) checkpointer to pause workflows and alert human doctors for ambiguous triage levels.",
        icon: ShieldCheck,
      },
      {
        id: "webhooks",
        label: "Async Webhooks",
        title: "Asynchronous Webhook Architecture",
        body:
          "Linked the WhatsApp Business API frontend to an asynchronous FastAPI backend to smoothly handle high-concurrency multi-tenant traffic.",
        icon: MessageSquare,
      },
    ],
  },
];

function StudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [activeId, setActiveId] = useState(study.dives[0].id);
  const active = study.dives.find((d) => d.id === activeId) ?? study.dives[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="group relative bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)] hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Header bar */}
      <div className="relative px-8 pt-8 pb-6 border-b border-slate-100">
        <div className="absolute top-4 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
          CASE / 0{index + 1}
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
            <study.icon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 mb-1">
              {study.accent}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {study.project}
            </h3>
          </div>
        </div>

        <p className="font-mono text-sm text-emerald-700 leading-snug mb-5">
          {study.subheading}
        </p>

        {/* Tech tag pills */}
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs strip */}
      <div className="px-8 pt-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-3 flex items-center gap-2">
          <Wrench className="w-3 h-3" /> Architectural Deep Dives
        </p>
        <div
          role="tablist"
          aria-label={`${study.project} deep dives`}
          className="flex flex-wrap gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-lg"
        >
          {study.dives.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(d.id)}
                className={[
                  "flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition-all",
                  isActive
                    ? "bg-white text-emerald-700 border border-slate-200 shadow-sm"
                    : "text-slate-500 border border-transparent hover:text-slate-800",
                ].join(" ")}
              >
                <d.icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                <span className="truncate">{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab body */}
      <div className="px-8 pb-8 pt-5 flex-1">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-slate-200 bg-slate-50/60 p-5"
        >
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-[10px] text-emerald-700 tracking-widest">
              0{study.dives.findIndex((d) => d.id === active.id) + 1}
            </span>
            <h4 className="font-mono text-sm font-semibold text-slate-900 leading-tight">
              {active.title}
            </h4>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {active.body}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function TechnicalDeepDive() {
  return (
    <section className="relative py-24 px-4 bg-dot-matrix-fade" id="deep-dive">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5" /> Engineering Case Studies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Deep Dives &amp; System Architecture
            </h2>
          </div>
          <p className="text-slate-600 max-w-lg text-sm leading-relaxed">
            A closer look at the engineering tradeoffs, concurrency strategies, and safety
            frameworks behind my independent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studies.map((s, i) => (
            <Fragment key={s.id}>
              <StudyCard study={s} index={i} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
