/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectCards from "./components/ProjectCards";
import TechnicalDeepDive from "./components/TechnicalDeepDive";
import TheStack from "./components/TheStack";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { Github, Linkedin, Mail } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      <main>
        <Hero />
        <ProjectCards />
        <TechnicalDeepDive />
        <TheStack />
        <Experience />

        <Contact />
      </main>

      <footer className="py-12 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center font-bold text-white text-sm">
                J
              </div>
              <span className="font-mono font-bold tracking-tighter">JOHN ROSE</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs font-mono uppercase tracking-tighter">
              Senior Product Support Engineer.
              GenAI debugging, P0/P1 incident response, SaaS reliability.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/johnroselearning"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-50 rounded-full hover:text-emerald-600 border border-slate-200 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/johnroses"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-50 rounded-full hover:text-emerald-600 border border-slate-200 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:johnrosemca@gmail.com"
              className="p-3 bg-slate-50 rounded-full hover:text-emerald-600 border border-slate-200 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <p className="text-slate-500 text-xs font-mono uppercase">
            © {new Date().getFullYear()} John Rose · Kochi, India
          </p>
        </div>
      </footer>
    </div>
  );
}
