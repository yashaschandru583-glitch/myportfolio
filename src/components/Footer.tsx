import React from 'react';
import { 
  Code2, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Heart,
  Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { theme } = useTheme();
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const name = profile?.name || 'Alex Morgan';

  return (
    <footer 
      id="main-footer"
      className="border-t border-white/5 relative overflow-hidden bg-[#020617] text-slate-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          
          {/* Left Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white">
                {name}
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              Modern full-stack developer portfolio and content management system engineered with React, Express, MongoDB, and Tailwind CSS.
            </p>
          </div>

          {/* Center Quick Navigation */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors text-slate-400 hover:text-blue-400"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Socials & Back to Top */}
          <div className="md:col-span-3 flex items-center md:justify-end gap-3">
            <a
              id="footer-github-link"
              href={profile?.socials?.github || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-linkedin-link"
              href={profile?.socials?.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line & admin access */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {name}. All rights reserved. Crafted with clean code & modern architecture.
          </div>

          <button
            id="footer-admin-login-link"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin CMS Dashboard</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
