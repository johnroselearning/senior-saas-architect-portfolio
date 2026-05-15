# John Rose — Professional Bio

## Identity

- **Name:** John Rose
- **Location:** Kochi, Kerala, India
- **Contact:** johnrosemca@gmail.com
- **LinkedIn:** linkedin.com/in/johnroses
- **GitHub:** github.com/johnroselearning
- **Current Title:** Agentic AI Orchestrator & Systems Architect

---

## Career Summary

John Rose is a Systems Architect and Senior Engineer specialising in autonomous multi-agent systems,
LangGraph-orchestrated pipelines, and production-grade agentic backends. He has 5+ years of
experience owning production systems end-to-end — from P0 incident triage and root-cause analysis
to shipping real-time fraud detection and clinical AI triage systems.

His core competency is translating complex, non-linear business workflows into stateful, cyclic
agent graphs that plan, act, observe, and self-correct without human intervention. He has shipped
two live agentic systems — a fraud intelligence agent (Sentinel) and a multi-tenant medical triage
agent (TriagePulse AI) — both running in production.

---

## Technical Stack

### Orchestration & Agent Frameworks
- **LangGraph** — primary framework for cyclic graph orchestration, stateful agent loops, and
  Human-in-the-Loop (HITL) checkpointing
- **CrewAI** — multi-agent role-based task delegation
- **n8n** — visual workflow automation for remediation pipelines and physician alert triggers
- **Custom State Machines** — hand-rolled FSM logic for deterministic safety-critical paths

### Models & RAG
- OpenAI API (GPT-4o) — primary LLM for reasoning and generation
- Claude / Anthropic — secondary model for long-context clinical document analysis
- Gemini Flash & Pro (via @google/genai) — latency-optimised inference and tier-based routing
- Milvus, Pinecone — vector databases for RAG grounding
- Embedding Models — OpenAI text-embedding-3-small, sentence-transformers

### Backend & Execution
- **Python** — primary language for all agent runtimes
- **FastAPI** — async webhook backend, API layer, and agent entrypoint
- **TypeScript / React** — frontend portfolio and dashboard UIs
- **Secure Sandbox Containers** — Docker/ECS isolated tool execution environments
- **AWS** — Lambda (event-driven agents), ECS (long-running agents), S3, CloudFront

### AgentOps & Observability
- **LangSmith** — full trace observability for every agent decision path
- **Phoenix (Arize)** — LLM eval, span-level debugging, and drift detection
- **OpenLLMetry** — OpenTelemetry-compatible spans for multi-agent pipelines
- **Structured logging** — JSON-first logs piped to CloudWatch

### Data & Storage
- MongoDB — tenant state persistence for multi-tenant agent sessions
- PostgreSQL — financial record store with PQC-encrypted fields
- Redis — sub-millisecond agent state cache and distributed locking

---

## Core Projects & Solutions

### 1. Sentinel — Autonomous Risk Intelligence Agent
**Domain:** Fintech / Real-Time Fraud Detection
**Status:** Production

Sentinel is a self-correcting, stateful fraud-detection agent built on LangGraph. It autonomously
evaluates UPI transaction events through a cyclic graph:

```
OBSERVE → SCORE → TOOL CALL (Biometrics) → VALIDATE → MITIGATE / RETRY
```

Key capabilities:
- <50ms end-to-end latency on the critical transaction path
- Behavioral biometrics tool: keystroke cadence, touch pressure, swipe velocity vs. stored baseline
- Post-Quantum Cryptography (PQC) for financial record encryption
- Automated remediation via n8n flows: block, soft-challenge, or alert
- Full agent trace audit via LangSmith

Tech: LangGraph, FastAPI, Python, Redis, PostgreSQL, n8n, LangSmith, Behavioral Biometrics, PQC

---

### 2. TriagePulse AI — Multi-Tenant Medical Triage Agent
**Domain:** Health-Tech SaaS
**Status:** Production

TriagePulse AI is a production multi-tenant medical triage system built on a LangGraph orchestration
kernel. Patients interact via WhatsApp; the agent routes their symptoms through a multi-agent
evaluation loop with graceful Human-in-the-Loop (HITL) handoffs.

Architecture:
```
Patient (WhatsApp) → FastAPI Webhook → spaCy PII Scrubber → LangGraph Orchestrator
    ├── SymptomClarifier Agent (loops until context complete)
    ├── TriageEvaluator Agent → RAG grounding via Milvus (clinical protocols)
    │       ├── HIGH confidence → WhatsApp safe-guidance response
    │       └── LOW confidence (ESI 1-2) → HITL Checkpoint
    │               ├── Serialize state → MongoDB
    │               └── n8n trigger → On-call physician alert (WhatsApp)
    └── LangSmith trace for every decision path
```

Key capabilities:
- Async FastAPI webhook decouples ingestion from agent execution
- spaCy NER PII redaction (PERSON, PHONE, GPE) before any LLM call
- LangGraph Interrupt checkpoint for HITL pause-and-resume
- Multi-tenant state isolation via MongoDB
- ESI v5-compatible severity scoring

Tech: LangGraph, FastAPI, Python, WhatsApp Business API, Milvus, n8n, spaCy, LangSmith, MongoDB

---

## Professional Achievements

- **3× Corporate Value Champion** — Recognised for exceptional operational ownership across
  critical US enterprise accounts
- **100% CSAT** — Maintained perfect customer satisfaction score across all quarterly reviews
- **83% RCA Success Rate** — Root-cause analysis closure rate across P0/P1 incidents
- **<30 Min MTTR** — Mean time to resolution on off-hours P0 incidents
- **3 Months → 3 Hours** — Roadmap compression achieved via intelligent automation

---

## Education & Certifications

- MCA (Master of Computer Applications)
- Ongoing: LangGraph Advanced Patterns, LangSmith Evaluation Workflows, AWS Solutions Architect

---

## Availability

Open to senior agentic AI engineering roles, multi-agent systems architecture contracts, and
technical advisory positions in AI-native product companies.

Preferred engagement: Remote / Hybrid — Kochi, India (IST, UTC+5:30)
