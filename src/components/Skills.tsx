import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Terminal, 
  Wrench, 
  Sparkles,
  Check,
  Cpu,
  Layers,
  FileCode,
  Atom,
  Palette,
  ShieldCheck,
  Send,
  GitBranch,
  GitCommit,
  Coffee,
  Braces,
  Binary
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const { theme } = useTheme();
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Programming', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Category Icon Resolver
  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'frontend': return <Layout className="w-4 h-4" />;
      case 'backend': return <Server className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'programming': return <Terminal className="w-4 h-4" />;
      case 'tools': return <Wrench className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Skill Icon Resolver
  const getSkillIcon = (skill: Skill) => {
    const name = skill.name.toLowerCase();
    if (name.includes('react')) return <Atom className="w-5 h-5 text-cyan-400" />;
    if (name.includes('html') || name.includes('semantic')) return <Layout className="w-5 h-5 text-orange-400" />;
    if (name.includes('css') || name.includes('tailwind')) return <Palette className="w-5 h-5 text-cyan-400" />;
    if (name.includes('node') || name.includes('express')) return <Server className="w-5 h-5 text-emerald-400" />;
    if (name.includes('mongo') || name.includes('sql') || name.includes('database')) return <Database className="w-5 h-5 text-emerald-500" />;
    if (name.includes('java')) return <Coffee className="w-5 h-5 text-amber-500" />;
    if (name.includes('c++') || name.includes('c ')) return <Binary className="w-5 h-5 text-blue-400" />;
    if (name.includes('python')) return <Braces className="w-5 h-5 text-yellow-400" />;
    if (name.includes('git')) return <GitBranch className="w-5 h-5 text-orange-500" />;
    if (name.includes('postman')) return <Send className="w-5 h-5 text-orange-400" />;
    return <Code2 className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <section 
      id="skills" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Technical Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Comprehensive toolkit spanning full-stack web architectures, distributed APIs, and hardware systems.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`skill-filter-${cat.toLowerCase().replace('/', '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getSkillIcon(skill)}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-emerald-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 rounded-full overflow-hidden mt-3 bg-slate-900/90 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Categorized Summary Grid Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Frontend Architecture
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              High-performance React 19 engines, responsive Tailwind systems, motion physics, and accessible semantic markup.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
              <Server className="w-4 h-4" />
              Backend & Cloud Data
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Scalable Express.js & Node APIs, MongoDB Mongoose data modeling, JWT authentication, and high-throughput pipelines.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Core Algorithms & IoT
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Object-Oriented systems in Java & C++, memory management, algorithm optimization, and Arduino embedded sensors.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
