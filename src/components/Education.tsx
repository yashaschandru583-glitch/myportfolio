import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen, 
  Building2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { theme } = useTheme();
  const { education } = usePortfolio();

  return (
    <section 
      id="education" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Academic Qualifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Solid computational foundations, computer science theory, and systems architecture.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20"
            >
              <div>
                {/* Header with year badge and grade */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>

                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {edu.cgpaOrPercentage}
                  </span>
                </div>

                {/* Degree & Field */}
                <h3 className="text-xl font-bold tracking-tight mb-1 text-white">
                  {edu.degree}
                </h3>
                <div className="text-sm font-semibold text-blue-400 mb-3">
                  {edu.fieldOfStudy}
                </div>

                {/* Institution & University */}
                <div className="space-y-1 text-xs font-medium text-slate-400 mb-6">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{edu.college}</span>
                  </div>
                  {edu.university && (
                    <div className="pl-5 text-slate-400 text-[11px]">
                      Affiliated with: {edu.university}
                    </div>
                  )}
                </div>

                {/* Relevant Coursework */}
                {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Relevant Coursework</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCoursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono border border-white/10 bg-white/5 text-slate-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
