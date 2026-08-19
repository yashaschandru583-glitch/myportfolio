import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Target, 
  Heart, 
  Lightbulb, 
  Briefcase, 
  CheckCircle, 
  Sparkles, 
  Code, 
  Award, 
  Calendar,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

// Animated CountUp Hook
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 25);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export const About: React.FC = () => {
  const { theme } = useTheme();
  const { profile, projects, skills, achievements } = usePortfolio();

  // Dynamic statistics with animated counters
  const projectsCount = projects.length > 0 ? projects.length : (profile?.stats?.projectsCompleted || 16);
  const skillsCount = skills.length > 0 ? skills.length : (profile?.stats?.technologiesLearned || 22);
  const certsCount = achievements.length > 0 ? achievements.length : (profile?.stats?.certificationsEarned || 7);

  const animatedProjects = useCountUp(projectsCount);
  const animatedSkills = useCountUp(skillsCount);
  const animatedCerts = useCountUp(certsCount);

  const interests = profile?.interests && profile.interests.length > 0
    ? profile.interests
    : [
        'Full-Stack Web Architecture',
        'Embedded IoT Systems',
        'Cloud Computing & DevOps',
        'Algorithm Optimization',
        'Open-Source Collaboration'
      ];

  const philosophy = profile?.philosophy || 'Clean code is not just written for machines to execute; it is crafted for humans to understand, maintain, and scale with confidence.';
  const careerObjective = profile?.careerObjective || 'Aspiring software engineer eager to leverage strong foundations in full-stack web development, algorithms, and distributed systems to build high-impact digital experiences.';

  return (
    <section 
      id="about" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      {/* Background soft ambient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Purpose & Precision</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A fusion of algorithmic fundamentals, scalable systems design, and passionate craftsmanship.
          </p>
        </div>

        {/* Top Key Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {/* Stat 1: Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-xl"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {animatedProjects}+
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">
              Projects Completed
            </div>
          </motion.div>

          {/* Stat 2: Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-xl"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {animatedSkills}+
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">
              Technologies Mastered
            </div>
          </motion.div>

          {/* Stat 3: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-xl"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {animatedCerts}+
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">
              Awards & Credentials
            </div>
          </motion.div>

          {/* Stat 4: Years Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-xl"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              {profile?.stats?.yearsExperience || '04+'}
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">
              Years Dev & Research
            </div>
          </motion.div>
        </div>

        {/* Detailed Cards: Bio, Career Objective, Development Philosophy, Interests */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Developer Overview & Career Objective */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            {/* Career Objective Card */}
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Career Objective & Mission
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {careerObjective}
              </p>
            </div>

            {/* Development Philosophy Card */}
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Engineering Philosophy
                </h3>
              </div>
              <blockquote className="text-sm sm:text-base italic border-l-2 border-emerald-400 pl-4 py-1 leading-relaxed text-slate-300">
                "{philosophy}"
              </blockquote>
            </div>
          </motion.div>

          {/* Right Column: Key Focus Areas & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Core Focus & Research
                </h3>
              </div>

              <p className="text-sm mb-6 text-slate-400">
                Passionate about distributed system reliability, real-time event pipelines, and human-centered design.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-white/5 text-slate-200 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Profile Summary Badge */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Location: {profile?.location || 'San Francisco, CA'}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open for Hire
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
