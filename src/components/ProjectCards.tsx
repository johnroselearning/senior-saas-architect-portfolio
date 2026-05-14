import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Brain, Globe, MountainSnow, Plane } from "lucide-react";

const projects = [
  {
    title: "ExploreMunnar.ai",
    role: "AI Platform Developer & Debugging Lead",
    period: "Nov 2023 – Nov 2024",
    description:
      "Sole engineer on an LLM-powered travel recommendation platform. Debugged latency spikes, token-limit overflows, and prompt-injection failures in production by tracing API response logs and stack traces. Built log-based monitoring for the RAG module to catch embedding mismatches that caused irrelevant itineraries.",
    tags: ["Python", "LangChain", "RAG", "Embeddings", "Prompt Engineering"],
    type: "GenAI / LLM Debugging",
    icon: MountainSnow,
  },
  {
    title: "NightingaleCompass.com",
    role: "Full Stack Developer & Cloud Architect",
    period: "Nov 2024 – Oct 2025",
    description:
      "Designed and shipped a tourism web platform with FastAPI, React, and MongoDB. Architected a cost-efficient serverless AWS deployment on S3, Lambda, and CloudFront, and added proactive API failure monitoring that caught contract mismatches between the React SPA and backend before they hit users.",
    tags: ["FastAPI", "React", "MongoDB", "AWS Lambda", "S3", "CloudFront"],
    type: "Full-Stack / Serverless",
    icon: Plane,
  },
];

export default function ProjectCards() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="projects">
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4 flex items-center text-slate-900">
          <span className="w-8 h-[2px] bg-emerald-600 mr-4"></span>
          Independent Projects
        </h2>
        <p className="text-slate-600 max-w-xl">
          Hands-on builds that grounded my GenAI debugging instincts — owned end-to-end, from prompt design to AWS deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="bg-white border-slate-200 hover:border-emerald-500/60 hover:shadow-lg transition-all duration-300 group overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <project.icon className="w-24 h-24 text-emerald-600" />
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-emerald-50 text-emerald-700 border-none">
                    {project.type}
                  </Badge>
                  <div className="flex gap-2">
                    <Github className="w-5 h-5 text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                    <ExternalLink className="w-5 h-5 text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </CardTitle>
                <div className="text-sm text-slate-500 font-mono mt-1">
                  {project.role} · {project.period}
                </div>
                <CardDescription className="text-slate-600 text-base leading-relaxed mt-4">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto">
                <div className="mb-6">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Highlights</p>
                  <div className="w-full h-32 bg-slate-50 rounded border border-slate-200 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/40 transition-colors">
                    <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4 opacity-30">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-slate-200 rounded-sm" />
                      ))}
                    </div>
                    {index === 0 ? (
                      <Brain className="w-8 h-8 text-emerald-600/60" />
                    ) : (
                      <Globe className="w-8 h-8 text-emerald-600/60" />
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-slate-50 text-slate-700 rounded border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
