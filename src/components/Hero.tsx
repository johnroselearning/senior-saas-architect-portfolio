import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-white">
      {/* Soft Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center max-w-4xl"
      >
        <Badge
          variant="outline"
          className="mb-6 border-emerald-500/40 text-emerald-700 bg-emerald-50 px-4 py-1 font-mono uppercase tracking-wider"
        >
          <Sparkles className="w-3 h-3 mr-2" /> Senior Product Support Engineer
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-900">
          Debugging <span className="text-gradient-emerald">GenAI</span> systems in production.
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-2xl mx-auto font-sans leading-relaxed">
          5+ years owning P0/P1 incidents across multi-tenant SaaS — now bringing the same rigour to{" "}
          <span className="text-emerald-700 font-mono">LLM, RAG, and prompt-debugging</span> workflows.
        </p>

        <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
          Python · FastAPI · LangChain · AWS · Docker
        </p>
      </motion.div>

      {/* Decorative grid */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-30 pointer-events-none">
        <div className="grid grid-cols-12 gap-4 w-full px-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-40 border-l border-slate-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
