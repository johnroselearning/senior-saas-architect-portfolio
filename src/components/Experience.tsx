import { motion } from "motion/react";
import { Briefcase, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Senior Product Support Engineer",
    company: "Classic Technologies and Business Solutions",
    period: "Nov 2025 – Present",
    location: "Kochi, India",
    description:
      "Owning P0/P1 incident response and customer success for enterprise SaaS clients. Driving RCA culture and documentation standards across the support team.",
    achievements: [
      "Resolved a critical P0 system failure for a VIP enterprise client in 20 minutes by tracing a cascading API token expiry across multi-service logs.",
      "Sustained 100% quarterly CSAT and contributed to a 15% increase in annual contract renewals through proactive customer health checks.",
      "Spearheaded a knowledge-share initiative that raised documentation contributions by 30% and cut average resolution time by 15%.",
    ],
  },
  {
    role: "Senior Product Support Engineer",
    company: "Itilite Technologies Pvt Ltd",
    period: "Jan 2021 – Oct 2023",
    location: "Bangalore, India",
    description:
      "Led L2 support for a B2B travel-tech SaaS platform, partnering with engineering to ship tooling that compressed turnaround on the support queue.",
    achievements: [
      "Engineered a resolution API and internal support dashboard that slashed ticket turnaround from 1 day to 30 minutes (~95% reduction).",
      "Drove RCA success rate to 83% through trend analysis and playbook creation, reducing recurring incident volume.",
      "Recognised as Value Champion three times (Mar 2022, Aug 2022, Mar 2023) for customer impact and ownership.",
    ],
  },
  {
    role: "Product Support Engineer",
    company: "Itilite Technologies Pvt Ltd",
    period: "Aug 2019 – Jan 2021",
    location: "Bangalore, India",
    description:
      "Built Python tooling and self-service features that deflected common queries and cut routine ops work for the support team.",
    achievements: [
      "Built Python APIs and self-service features that reduced contact rates by 30% and let L1 resolve more issues independently.",
      "Shipped a trip-report self-service feature that eliminated manual support intervention and reduced related tickets by 30%.",
      "Automated client onboarding by replicating parent client policies across 10 subsidiaries via a Python script.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="experience">
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4 flex items-center text-slate-900">
          <span className="w-8 h-[2px] bg-emerald-600 mr-4"></span>
          Professional Experience
        </h2>
        <p className="text-slate-600">
          Five-plus years of support engineering across multi-tenant SaaS, with a growing focus on GenAI debugging.
        </p>
      </div>

      <div className="space-y-12 relative">
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-200 ml-4 md:ml-0 md:left-1/2" />

        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={`relative flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Dot */}
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow z-10 ml-4 md:ml-0" />

            {/* Content Card */}
            <div className="w-full md:w-[45%] bg-white border border-slate-200 p-8 rounded-xl hover:border-emerald-500/40 hover:shadow-md transition-all ml-10 md:ml-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-mono px-2 py-1 bg-emerald-50 text-emerald-700 rounded">
                  {exp.period}
                </span>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin size={14} className="mr-1" /> {exp.location}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1 text-slate-900">{exp.role}</h3>
              <h4 className="text-emerald-700 font-medium mb-4 flex items-center">
                <Briefcase size={16} className="mr-2" /> {exp.company}
              </h4>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">{exp.description}</p>

              <div className="space-y-2">
                {exp.achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-emerald-600 mt-1">▹</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Empty space for the other side on desktop */}
            <div className="hidden md:block w-[45%]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
