import { motion } from "motion/react";
import { DiagramRenderer, type DiagramSpec } from "./diagram/DiagramRenderer";

type DeepDive = {
  title: string;
  subtitle: string;
  narrative: string;
  highlights: string[];
  diagram: DiagramSpec;
};

const exploreMunnar: DeepDive = {
  title: "ExploreMunnar.ai",
  subtitle: "LLM-powered travel platform · debugging the RAG pipeline",
  narrative:
    "As sole engineer, I owned the full inference lifecycle. The hardest production failures were not crashes — they were silent quality regressions: irrelevant itineraries from embedding mismatches, latency spikes from token-limit overflows, and prompt-injection edge cases. Log-based monitoring on every hop made these visible.",
  highlights: [
    "Traced an irrelevant-itinerary bug to the retrieval agent's chunking strategy and shipped a prompt-engineering hotfix",
    "Caught embedding mismatches between user queries and the vector store before customers noticed",
    "Surfaced LLM latency, token usage, and stack traces through structured logs",
  ],
  diagram: {
    kind: "mermaid",
    source: `graph TD
    User[User Query - Travel Itinerary]
    Frontend[Web Client]
    API[FastAPI Backend - Python]

    PromptEngine[Prompt Engineering Layer]
    LLM[LLM Inference]

    RAG[RAG Retriever]
    Vector[(Vector Store - Embeddings)]
    KB[(Munnar Knowledge Base)]

    LogMon[Log-Based Monitoring]
    Alerts[Anomaly Alerts]

    User --> Frontend --> API
    API --> PromptEngine
    PromptEngine -- "Query" --> RAG
    RAG --> Vector
    Vector --> KB
    RAG -- "Retrieved Context" --> PromptEngine
    PromptEngine -- "Augmented Prompt" --> LLM
    LLM -- "Itinerary" --> API
    API --> Frontend

    API -. "Response Logs / Stack Traces" .-> LogMon
    RAG -. "Embedding Match Scores" .-> LogMon
    LLM -. "Token / Latency Metrics" .-> LogMon
    LogMon --> Alerts

    classDef debug fill:#fef3c7,stroke:#b45309,stroke-width:2px;
    classDef ai fill:#ecfdf5,stroke:#059669,stroke-width:2px;
    class LogMon,Alerts debug;
    class LLM,RAG,Vector,PromptEngine ai;
`,
  },
};

const nightingaleCompass: DeepDive = {
  title: "NightingaleCompass.com",
  subtitle: "Serverless tourism platform · FastAPI + React on AWS",
  narrative:
    "Cost-efficient serverless deployment for a tourism web platform delivering dynamic content and personalised recommendations. The bigger win was operational: proactive monitoring caught contract mismatches between the React SPA and the FastAPI backend before they ever reached users.",
  highlights: [
    "FastAPI + React + MongoDB stack deployed on S3, Lambda, and CloudFront",
    "Schema/contract checks across the SPA ↔ backend boundary to prevent silent breakage",
    "Pay-per-use serverless footprint keeps the platform economical at low traffic",
  ],
  diagram: {
    kind: "mermaid",
    source: `graph TD
    User[End User]
    CDN[AWS CloudFront]
    SPA[React SPA - S3 Hosted]

    APIGW[API Gateway]
    LambdaContent[FastAPI Lambda - Content]
    LambdaReco[FastAPI Lambda - Recommendations]

    Mongo[(MongoDB - Tourism Data)]

    Monitor[API Failure Monitoring]
    Contract[Contract Mismatch Detection]

    User --> CDN
    CDN -- "Static Assets" --> SPA
    SPA -- "API Calls" --> APIGW
    APIGW --> LambdaContent
    APIGW --> LambdaReco
    LambdaContent --> Mongo
    LambdaReco --> Mongo

    LambdaContent -. "Failure Logs" .-> Monitor
    LambdaReco -. "Failure Logs" .-> Monitor
    SPA -. "Schema Validation" .-> Contract
    APIGW -. "Schema Validation" .-> Contract
    Monitor --> Contract

    classDef cloud fill:#e0f2fe,stroke:#0369a1,stroke-width:2px;
    classDef obs fill:#fef3c7,stroke:#b45309,stroke-width:2px;
    class CDN,APIGW,LambdaContent,LambdaReco cloud;
    class Monitor,Contract obs;
`,
  },
};

const deepDives: DeepDive[] = [exploreMunnar, nightingaleCompass];

export default function TechnicalDeepDive() {
  return (
    <section className="py-24 px-4 bg-slate-50" id="deep-dive">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center text-slate-900">
            <span className="w-8 h-[2px] bg-emerald-600 mr-4"></span>
            Technical Deep Dive
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Architecture diagrams for the independent projects, with the debugging and monitoring touchpoints that
            actually mattered in production.
          </p>
        </div>

        <div className="space-y-16">
          {deepDives.map((dive, index) => (
            <motion.div
              key={dive.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
            >
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{dive.title}</h3>
                  <p className="text-sm text-emerald-700 font-mono mt-1">{dive.subtitle}</p>
                </div>
                <p className="text-slate-600 leading-relaxed">{dive.narrative}</p>
                <ul className="space-y-2">
                  {dive.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-emerald-600 mt-1">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                  Architecture
                </p>
                <DiagramRenderer spec={dive.diagram} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
