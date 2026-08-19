import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  HelpCircle,
  Tag,
  Layers,
  Code
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            theme === 'dark'
              ? 'bg-slate-950 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Close button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            aria-label="Close Project Details"
            className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-white/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-md'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Project Banner Image */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                    Featured Project
                  </span>
                )}
              </div>

              {/* Action links */}
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    id="modal-github-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-colors shadow-lg cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    id="modal-demo-link"
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Short Description */}
            <div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {project.title}
              </h2>
              <p className={`mt-2 text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.shortDescription}
              </p>
            </div>

            {/* Technologies Stack Chips */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Technologies & Frameworks Used</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-cyan-300'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-red-50/40 border-red-100'
              }`}>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Problem Statement</span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {project.problemStatement || 'Addressing technical inefficiencies and usability bottlenecks through modern architecture.'}
                </p>
              </div>

              {/* Solution */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-emerald-50/40 border-emerald-100'
              }`}>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Engineered Solution</span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {project.solution || 'Implemented a modular, scalable architecture with high-performance execution patterns.'}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className={`p-6 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Key Architectural Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={`text-xs sm:text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Challenges & Measurable Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenges */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Technical Challenges</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {project.challenges || 'Optimizing performance parameters and handling edge-case validation.'}
                </p>
              </div>

              {/* Results */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Results & Impact</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {project.results || 'Successfully deployed with high reliability and validated through rigorous testing.'}
                </p>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={onClose}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border cursor-pointer ${
                  theme === 'dark'
                    ? 'border-slate-800 text-slate-300 hover:bg-slate-900'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
