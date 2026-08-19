import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Building,
  GraduationCap,
  Users,
  Code
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { theme } = useTheme();
  const { experience } = usePortfolio();

  const getExperienceIcon = (type: string) => {
    switch (type) {
      case 'Internship': return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'College Activities': return <GraduationCap className="w-4 h-4 text-indigo-400" />;
      case 'Freelance': return <Users className="w-4 h-4 text-emerald-400" />;
      default: return <Code className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section 
      id="experience" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Work & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Technical Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Demonstrated engineering contributions across industry internships, campus leadership, and freelance initiatives.
          </p>
        </div>

        {/* Timeline Content */}
        {experience.length > 0 ? (
          <div className="relative border-l-2 border-blue-500/20 ml-4 sm:ml-32 space-y-12">
            {experience.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 border-blue-500 bg-[#020617] text-blue-400 flex items-center justify-center transition-all shadow-md shadow-blue-500/20 group-hover:scale-110">
                  {getExperienceIcon(item.type)}
                </div>

                {/* Left Date Label (Desktop) */}
                <div className="hidden sm:block absolute -left-32 top-2.5 text-right w-24">
                  <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
                    {item.startDate}
                  </span>
                  <div className="text-[10px] font-mono text-slate-500">
                    {item.endDate}
                  </div>
                </div>

                {/* Main Card */}
                <div className="p-7 sm:p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                        {item.role}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.type}
                      </span>
                    </div>

                    {item.current && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <Building className="w-3.5 h-3.5" />
                      {item.organization}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                    <span className="sm:hidden flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 text-slate-300">
                    {item.description}
                  </p>

                  {/* Bullet achievements */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="space-y-2 mb-5">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono border border-white/10 bg-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-white/10">
            <p className="text-base font-medium text-slate-400">
              Currently building experience through academic and personal projects.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
