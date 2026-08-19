import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Share2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const { profile } = usePortfolio();

  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onOpenResume();
  };

  return (
    <section 
      id="resume" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          
          {/* Subtle decorative mesh */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left column: Text & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <FileText className="w-3.5 h-3.5" />
                <span>Verified Curriculum Vitae</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Download Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Resume</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                Looking for a concise, printable overview of my engineering competencies, technical projects, internships, and education? Download or preview my latest formatted resume.
              </p>

              <div className="space-y-2.5">
                {[
                  'Updated for Software Engineering & Full-Stack Placement Drives',
                  'Detailed Breakdown of MERN, Java, C++, and IoT Projects',
                  'ATS-Optimized Formatting with Verified Metrics and Impact'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="resume-section-download-btn"
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print Resume (PDF)</span>
                </button>

                <button
                  id="resume-section-preview-btn"
                  onClick={onOpenResume}
                  className="flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Interactive Preview</span>
                </button>
              </div>
            </div>

            {/* Right column: Document Thumbnail Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={onOpenResume}
                className="w-64 sm:w-72 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer relative shadow-2xl transition-all hover:border-white/25"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{profile?.name || 'YASHAS C'}</div>
                    <div className="text-[10px] text-blue-400 font-mono">{profile?.roleTitle || 'Software Engineer'}</div>
                  </div>
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Simulated Document lines */}
                <div className="space-y-2 opacity-70">
                  <div className="h-2 rounded bg-blue-500/30 w-3/4" />
                  <div className="h-1.5 rounded bg-slate-700 w-full" />
                  <div className="h-1.5 rounded bg-slate-700 w-5/6" />
                  <div className="h-2 rounded bg-emerald-500/30 w-1/2 mt-3" />
                  <div className="h-1.5 rounded bg-slate-700 w-full" />
                  <div className="h-1.5 rounded bg-slate-700 w-4/5" />
                  <div className="h-2 rounded bg-teal-500/30 w-2/3 mt-3" />
                  <div className="h-1.5 rounded bg-slate-700 w-full" />
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand full CV</span>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
