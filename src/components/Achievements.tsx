import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Trophy, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  Building,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Achievements: React.FC = () => {
  const { theme } = useTheme();
  const { achievements } = usePortfolio();
  const [filter, setFilter] = useState<string>('All');

  const types = ['All', 'Certification', 'Hackathon', 'Technical Achievement'];

  const filteredAchievements = filter === 'All'
    ? achievements
    : achievements.filter(a => a.type.toLowerCase().includes(filter.toLowerCase()));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hackathon': return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Certification': return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      default: return <Award className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section 
      id="achievements" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Achievements</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Verified industry certifications, hackathon podium placements, and competitive problem-solving milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-12">
          {types.map((t) => {
            const isActive = filter === t;
            return (
              <button
                key={t}
                id={`achievement-filter-${t.toLowerCase().replace(' ', '-')}`}
                onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAchievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl group"
            >
              {/* Optional Top Thumbnail Image Banner */}
              {item.imageUrl && (
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-white/10 backdrop-blur-md">
                    {getTypeIcon(item.type)}
                    <span>{item.type}</span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-blue-400 font-semibold">
                      <Building className="w-3.5 h-3.5" />
                      {item.organization}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold tracking-tight leading-snug text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed line-clamp-3 text-slate-400">
                    {item.description}
                  </p>
                </div>

                {/* Verification CTA */}
                {item.verificationUrl && (
                  <div className="pt-3 border-t border-white/5">
                    <a
                      id={`verify-link-${item.id}`}
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-teal-300 transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
