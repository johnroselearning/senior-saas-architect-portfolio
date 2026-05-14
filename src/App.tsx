/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectCards from "./components/ProjectCards";
import IndependentProjects from "./components/IndependentProjects";
import TechnicalDeepDive from "./components/TechnicalDeepDive";
import TheStack from "./components/TheStack";
import Experience from "./components/Experience";
import OperationalBreakthroughs from "./components/OperationalBreakthroughs";
import Philosophy from "./components/Philosophy";
import Contact from "./components/Contact";
import { Github, Linkedin, Mail } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-dot-matrix text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      <main>
        <Hero />
        <OperationalBreakthroughs />
        <ProjectCards />
        <IndependentProjects />
        <TechnicalDeepDive />
        <TheStack />
        <Experience />
        <Philosophy />
        <Contact />
      </main>

      <footer className="relative py-14 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center font-bold text-white text-sm">
              J
            </div>
            <span className="font-mono font-bold tracking-tight text-slate-900">JOHN ROSE</span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/johnroses"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-emerald-600 hover:border-emerald-500/50 border border-slate-200 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/johnroselearning"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-emerald-600 hover:border-emerald-500/50 border border-slate-200 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:johnrosemca@gmail.com"
              aria-label="Email"
              className="p-3 bg-slate-50 rounded-full text-slate-600 hover:text-emerald-600 hover:border-emerald-500/50 border border-slate-200 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
            Built for performance and security.
          </p>

          <p className="text-[11px] font-mono text-slate-400">
            © {new Date().getFullYear()} John Rose · Kochi, India
          </p>
        </div>
      </footer>
    </div>
  );
}
