import { motion } from "motion/react";
import { Sparkles, ArrowRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative min-h-[72vh] flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden bg-dot-matrix">
      {/* Soft Emerald Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Top-left and bottom-right blueprint corner ticks */}
      <div className="pointer-events-none absolute top-24 left-8 hidden md:flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
        <span>SYS / 001</span>
        <span className="h-px w-10 bg-slate-300" />
      </div>
      <div className="pointer-events-none absolute bottom-12 right-8 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
        <span className="h-px w-10 bg-slate-300" />
        <span>BUILD · STABLE</span>
      </div>

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
          <Sparkles className="w-3 h-3 mr-2" /> Senior Software Engineer · SaaS Architect
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-slate-900">
          Engineering Secure,{" "}
          <span className="text-gradient-emerald">Agentic Systems</span>.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          Senior Engineer specializing in{" "}
          <span className="text-slate-900 font-medium">high-concurrency backends</span>,{" "}
          <span className="text-slate-900 font-medium">cloud infrastructure</span>, and{" "}
          <span className="text-slate-900 font-medium">intelligent automation</span>. Building
          world-class, resilient layers that resolve complex production anomalies before they
          impact the user.
        </p>

        <blockquote className="relative mx-auto max-w-2xl mb-10 px-6">
          <span className="absolute -top-3 left-0 text-4xl text-emerald-500/40 font-serif leading-none select-none">
            &ldquo;
          </span>
          <p className="font-serif italic text-base md:text-lg text-slate-700 leading-relaxed">
            Building world-class intelligence layers for a{" "}
            <span className="text-emerald-700 not-italic font-medium">
              resilient, autonomous future.
            </span>
          </p>
        </blockquote>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(16,185,129,0.5)] hover:bg-emerald-700 hover:shadow-[0_10px_28px_-8px_rgba(16,185,129,0.6)] transition-all"
          >
            View Architecture
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="/johnrose.pdf"
            download="JohnRose-Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 bg-white/60 backdrop-blur-sm text-slate-800 text-sm font-semibold hover:border-emerald-500/60 hover:text-emerald-700 hover:bg-white transition-all"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.3em]">
          Go · FastAPI · LangGraph · Post-Quantum Crypto · AWS
        </p>
      </motion.div>
    </section>
  );
}
