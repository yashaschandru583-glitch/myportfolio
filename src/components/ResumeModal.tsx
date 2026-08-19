import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { profile, projects, skills, experience, education, achievements } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const name = profile?.name || 'YASHAS C';
  const email = profile?.email || 'yashas.c.dev@gmail.com';
  const phone = profile?.phone || '+91 8147837927';
  const location = profile?.location || 'Bengaluru, India';

  return (
    <AnimatePresence>
      <div 
        id="resume-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="resume-modal-content"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Bar with Action Controls */}
          <div className={`sticky top-0 z-30 px-6 py-4 border-b flex items-center justify-between backdrop-blur-xl ${
            theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">Curriculum Vitae Preview</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PDF Ready
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="resume-modal-print-btn"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                id="resume-modal-close-btn"
                onClick={onClose}
                aria-label="Close Resume"
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'dark' ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Paper View */}
          <div className="p-6 sm:p-10 space-y-8 print:p-0 print:text-black">
            
            {/* Header: Name & Contact Info */}
            <div className="border-b border-slate-800/80 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">{name}</h1>
                  <p className="text-base font-semibold text-indigo-400 font-mono mt-1">
                    {profile?.roleTitle || 'Full-Stack Software Engineer'}
                  </p>
                </div>

                <div className="text-xs space-y-1 sm:text-right text-slate-400">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300">
                {profile?.careerObjective || profile?.aboutIntro}
              </p>
            </div>

            {/* Technical Skills Summary Table */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <Code className="w-3.5 h-3.5" />
                <span>Core Technical Proficiencies</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-slate-200">Frontend: </span>
                  <span className="text-slate-400">React.js, Tailwind CSS, JavaScript (ES6+), HTML5, TypeScript</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-slate-200">Backend & APIs: </span>
                  <span className="text-slate-400">Node.js, Express.js, RESTful Architecture, JWT, Microservices</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-slate-200">Databases: </span>
                  <span className="text-slate-400">MongoDB, Mongoose ODM, MySQL, PostgreSQL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-slate-200">Languages & Tools: </span>
                  <span className="text-slate-400">Java, C, C++, Python, Git, GitHub, Postman, Arduino</span>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work Experience & Leadership</span>
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm">
                      <div className="font-bold text-slate-200">
                        {exp.role} — <span className="text-indigo-400 font-semibold">{exp.organization}</span>
                      </div>
                      <div className="font-mono text-slate-400 text-xs">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Featured Projects */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Code className="w-3.5 h-3.5" />
                <span>Featured Engineering Projects</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">{proj.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{proj.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500">
                      Stack: {proj.technologies.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-wrap items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{edu.degree} in {edu.fieldOfStudy}</div>
                      <div className="text-slate-400">{edu.college}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-indigo-400">{edu.startYear} - {edu.endYear}</div>
                      <div className="text-emerald-400 font-bold">{edu.cgpaOrPercentage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
