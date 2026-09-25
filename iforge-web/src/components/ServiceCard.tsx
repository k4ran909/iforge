import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/siteData";
import { 
  ArrowRight, 
  BrainCircuit, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Code2, 
  TrendingUp, 
  Users,
  CheckCircle2
} from "lucide-react";

interface Props {
  service: ServiceItem;
}

const iconComponents: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-blue-400" />,
  Cloud: <Cloud className="w-6 h-6 text-cyan-400" />,
  Server: <Server className="w-6 h-6 text-indigo-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
  Code2: <Code2 className="w-6 h-6 text-violet-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-amber-400" />,
  Users: <Users className="w-6 h-6 text-rose-400" />,
};

export default function ServiceCard({ service }: Props) {
  return (
    <div className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Icon & Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform duration-300">
            {iconComponents[service.iconName] || <Server className="w-6 h-6 text-blue-400" />}
          </div>
          <span className="text-xs font-mono text-slate-500 group-hover:text-blue-400 transition-colors uppercase">
            Service
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {service.shortDesc}
        </p>

        {/* Feature Highlights */}
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Link Button */}
      <div className="pt-4 border-t border-slate-800/60">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
