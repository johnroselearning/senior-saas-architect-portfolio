import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Bot,
  Rocket,
  ChevronDown,
  Activity,
  Lock,
  Cpu,
  Gauge,
  Database,
  GitBranch,
  ShieldCheck,
  MessageSquare,
  Network,
  Code2,
} from "lucide-react";
import { ZoomableDiagram } from "./diagram/ZoomableDiagram";
import { PythonCodeWindow } from "./code/PythonCodeWindow";

type DeepDive = {
  title: string;
  body: string;
  icon: typeof Shield;
};

type CodeSnippet = {
  label: string;
  filename: string;
  source: string;
};

type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  bullet: string;
  icon: typeof Shield;
  accentIcons: typeof Shield[];
  badge: string;
  deepDives: DeepDive[];
  diagram: string;
  codeSnippet?: CodeSnippet;
};

const projects: Project[] = [
  {
    title: "Sentinel",
    tagline: "Fintech · Autonomous Risk Intelligence Agent",
    description:
      "A self-correcting, stateful fraud-detection agent powered by LangGraph and behavioral biometrics. Sentinel autonomously evaluates transaction events, executes ML-based risk tools, and mitigates threats in <50ms — without human intervention.",
    tags: ["LangGraph", "n8n", "FastAPI", "Python", "Behavioral Biometrics", "Post-Quantum Cryptography", "Redis"],
    bullet:
      "Autonomous agent intercepts malicious UPI mandates and mule accounts in real-time by cycling through a risk-scoring graph: Observe → Score → Tool Call → Validate → Mitigate/Retry.",
    icon: Shield,
    accentIcons: [Lock, Activity],
    badge: "Autonomous · <50ms Latency",
    deepDives: [
      {
        title: "Stateful Agent Loop & Self-Correction",
        body:
          "Built on LangGraph's cyclic graph primitives — the agent enters an Observe → Evaluate → Tool Call → Validate loop. On a low-confidence score it retriggers the ML model with enriched context (device fingerprint + biometric delta) and retries before escalating or auto-blocking.",
        icon: Gauge,
      },
      {
        title: "Behavioral Biometrics Tool Layer",
        body:
          "The agent dispatches a dedicated Biometrics Tool that analyzes keystroke cadence, touch pressure, and swipe velocity against a stateful user baseline stored in Redis. Anomaly deltas above threshold are injected back into the agent's state graph as new evidence nodes.",
        icon: Lock,
      },
      {
        title: "n8n Workflow Orchestration & Audit",
        body:
          "Automated remediation actions (block, soft-challenge, alert) are dispatched via n8n flows with full auditability. Each workflow node emits structured telemetry to LangSmith for trace-level observability into every agent decision path.",
        icon: Database,
      },
    ],
    diagram: `graph TD
    Client[Mobile / Client App] -->|UPI Transaction Event| Gateway[API Gateway]
    Gateway -->|Enqueue Event| AgentEntry[Sentinel Agent Entry Node]

    AgentEntry --> ObserveNode[OBSERVE: Parse Transaction Context]
    ObserveNode --> ScoreNode[SCORE: Risk Scoring Engine]

    ScoreNode -->|score < 0.4 — Low Risk| Approve[✅ Auto-Approve & Log]
    ScoreNode -->|score 0.4–0.7 — Ambiguous| BioTool[TOOL CALL: Behavioral Biometrics]
    ScoreNode -->|score > 0.7 — High Risk| BlockTool[TOOL CALL: Auto-Block + n8n Alert]

    BioTool --> ValidateNode{VALIDATE: Confidence Check}
    ValidateNode -->|confidence OK| Approve
    ValidateNode -->|confidence LOW — Retry| ScoreNode

    BlockTool --> StateStore[(Redis: Agent State Store)]
    Approve --> StateStore

    StateStore --> AuditLog[LangSmith Trace Audit]
    StateStore --> DB[(PostgreSQL: Record Persist)]

    style AgentEntry fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style ScoreNode fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style ValidateNode fill:#fef3c7,stroke:#b45309,stroke-width:2px
    style BioTool fill:#eff6ff,stroke:#3b82f6,stroke-width:2px
    style BlockTool fill:#fef2f2,stroke:#dc2626,stroke-width:2px
`,
  },
  {
    title: "TriagePulse AI",
    tagline: "Health-Tech SaaS · Multi-Tenant Medical Triage Agent",
    description:
      "A production multi-tenant triage system built on a LangGraph orchestration kernel with asynchronous backend routing, multi-agent evaluation loops, and graceful Human-in-the-Loop (HITL) handoffs via WhatsApp Business API.",
    tags: ["LangGraph", "FastAPI", "Python", "WhatsApp Business API", "Vector DB (Milvus)", "n8n", "LangSmith"],
    bullet:
      "Multi-agent eval loop routes patient symptoms through specialized Triage and Clarifier agents, with automatic HITL pause-and-alert for ambiguous ESI-level cases — all over the WhatsApp channel.",
    icon: Bot,
    accentIcons: [Cpu, Activity],
    badge: "HIPAA-Aware · Multi-Agent HITL",
    deepDives: [
      {
        title: "Multi-Agent Evaluation Loop",
        body:
          "LangGraph orchestrates a graph of specialized agents: a SymptomClarifier agent probes for missing clinical signals, a TriageEvaluator agent scores ESI severity, and a RAG grounding node queries a Milvus vector DB of clinical protocols before any recommendation is emitted.",
        icon: GitBranch,
      },
      {
        title: "Graceful HITL Handoff",
        body:
          "When the TriageEvaluator confidence falls below the ESI-2 threshold, the graph pauses at a LangGraph Interrupt checkpoint, serializes full conversation state to MongoDB, and triggers an n8n workflow that pings the on-call physician via WhatsApp with a structured clinical summary.",
        icon: ShieldCheck,
      },
      {
        title: "Async Webhook & PII Guardrails",
        body:
          "FastAPI's async webhook layer decouples WhatsApp message ingestion from agent execution, enabling high-concurrency multi-tenant throughput. A spaCy NER scrubber redacts PII (PERSON, PHONE, GPE) before state is persisted or forwarded to any LLM call.",
        icon: MessageSquare,
      },
    ],
    diagram: `graph TD
    Patient[Patient — WhatsApp] -->|Symptom Message| Webhook[WhatsApp Business API Webhook]
    Webhook -->|Async Enqueue| FastAPI[FastAPI Async Backend]

    FastAPI -->|PII Redaction Gate| Scrubber[spaCy NER Scrubber]
    Scrubber -->|Sanitized State| GraphEntry[LangGraph Orchestrator Entry]

    GraphEntry --> ClarifierAgent[AGENT: Symptom Clarifier]
    ClarifierAgent -->|Missing signals — loop back| GraphEntry
    ClarifierAgent -->|Context complete| TriageAgent[AGENT: Triage Evaluator]

    TriageAgent -->|RAG grounding call| VectorDB[(Milvus: Clinical Protocol DB)]
    VectorDB -->|Relevant protocol chunks| TriageAgent

    TriageAgent -->|confidence HIGH — ESI 3-5| Response[WhatsApp Response — Safe Guidance]
    TriageAgent -->|confidence LOW — ESI 1-2| HITL{HITL Checkpoint — Pause Graph}

    HITL -->|Serialize state| Mongo[(MongoDB: Tenant State Store)]
    HITL -->|n8n Trigger| DoctorAlert[n8n Flow: Physician Alert — WhatsApp]
    DoctorAlert -->|Doctor reviews & resumes| GraphEntry

    GraphEntry --> LangSmith[LangSmith: Trace & Observability]

    style GraphEntry fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style TriageAgent fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style HITL fill:#fef3c7,stroke:#b45309,stroke-width:2px
    style VectorDB fill:#eff6ff,stroke:#3b82f6,stroke-width:2px
    style DoctorAlert fill:#fdf4ff,stroke:#9333ea,stroke-width:2px
`,
    codeSnippet: {
      label: "View PII Scrubber Middleware",
      filename: "infrastructure/security/scrubber.py",
      source: `# infrastructure/security/scrubber.py
import spacy
from typing import Dict, Any

class PIIScrubber:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.target_labels = {"PERSON", "EMAIL", "PHONE", "GPE"}

    def redact_patient_state(self, state: Dict[str, Any]) -> Dict[str, Any]:
        raw_text = state.get("patient_message", "")
        doc = self.nlp(raw_text)
        sanitized_text = raw_text
        for ent in sorted(doc.ents, key=lambda e: e.start_char, reverse=True):
            if ent.label_ in self.target_labels:
                sanitized_text = sanitized_text[:ent.start_char] + f"[{ent.label_}_REDACTED]" + sanitized_text[ent.end_char:]
        state["sanitized_message"] = sanitized_text
        return state
`,
    },
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)] hover:border-emerald-500/60 transition-all duration-300 overflow-hidden"
    >
      <div className="relative p-8 md:p-10">
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

            {/* Interactive expand/collapse toggle */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={`expand-${index}`}
              aria-label={expanded ? "Collapse architecture deep dive" : "Expand architecture deep dive"}
              className={[
                "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all",
                expanded
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-[0_6px_16px_-6px_rgba(16,185,129,0.6)]"
                  : "bg-white border-slate-200 text-slate-500 hover:border-emerald-500/60 hover:text-emerald-700 hover:bg-emerald-50",
              ].join(" ")}
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="inline-flex"
              >
                <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
              </motion.span>
            </button>
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
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {project.accentIcons.map((Icon, i) => (
                  <Icon key={i} className="w-3.5 h-3.5 text-slate-400" />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {expanded ? "Hide Architecture" : "View Architecture"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="expanded"
            id={`expand-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-slate-50/40"
          >
            <div className="p-6 md:p-8 flex flex-col">
              {/* TOP — Deep dive bullets (full width) */}
              <div className="space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-700 flex items-center gap-2">
                  <Network className="w-3 h-3" /> Architectural Deep Dives
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.deepDives.map((d, i) => (
                    <motion.li
                      key={d.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="shrink-0 mt-0.5 p-2 rounded-md bg-white border border-slate-200 text-emerald-700">
                        <d.icon className="w-4 h-4" strokeWidth={2.25} />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-slate-900 leading-snug mb-1">
                          <span className="text-emerald-700 mr-1.5">
                            0{i + 1}.
                          </span>
                          {d.title}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {d.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Divider between text and diagram */}
              <div className="border-t border-slate-200 my-8" />

              {/* BOTTOM — Mermaid diagram (centered, max-width) */}
              <div className="w-full max-w-3xl mx-auto">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center justify-center gap-2 text-center">
                  <Cpu className="w-3 h-3" /> System Architecture
                </p>

                <div className="relative rounded-xl border border-slate-200 bg-slate-50/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-100/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      {project.title.toLowerCase().replace(/\s+/g, "-")}.mmd
                    </span>
                  </div>

                  {/* Zoomable diagram canvas */}
                  <ZoomableDiagram source={project.diagram} />
                </div>

                {/* Behind-the-code toggle — only on projects with a code snippet */}
                {project.codeSnippet && (
                  <div className="mt-6">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowCode((v) => !v)}
                        aria-expanded={showCode}
                        aria-controls={`code-${index}`}
                        className={[
                          "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.2em] transition-all border",
                          showCode
                            ? "bg-slate-900 text-emerald-300 border-slate-900 shadow-[0_8px_20px_-10px_rgba(15,23,42,0.5)]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500/60 hover:text-emerald-700 hover:bg-emerald-50/40",
                        ].join(" ")}
                      >
                        <Code2 className="w-3.5 h-3.5" strokeWidth={2.25} />
                        <span className="font-mono">&lt;/&gt;</span>
                        {showCode ? "Hide Source" : project.codeSnippet.label}
                        <motion.span
                          animate={{ rotate: showCode ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="inline-flex"
                        >
                          <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </motion.span>
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {showCode && (
                        <motion.div
                          key="code"
                          id={`code-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5">
                            <PythonCodeWindow
                              filename={project.codeSnippet.filename}
                              source={project.codeSnippet.source}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function ProjectCards() {
  return (
    <section className="relative py-24 px-4 bg-dot-matrix-fade" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-700 mb-3 flex items-center gap-2">
              <Rocket className="w-3.5 h-3.5" /> Agent Systems Laboratory
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Autonomous Agents &amp; Multi-Agent Architectures
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm leading-relaxed">
            Production-grade agentic systems where stateful graph logic, cyclic self-correction loops, and Human-in-the-Loop handoffs are non-negotiable.
            Click any card to expand the architecture deep dive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Fragment key={project.title}>
              <ProjectCard project={project} index={i} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
