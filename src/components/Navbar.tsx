import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileText, 
  Shield, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenAdmin }) => {
  const { theme, toggleTheme } = useTheme();
  const { profile } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40 py-3.5'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-md py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          id="navbar-brand-logo"
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span>{profile?.name ? profile.name.charAt(0).toUpperCase() : 'Y'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 flex items-center gap-1.5">
              {profile?.name ? profile.name.toUpperCase().replace(' ', '.') : 'YASHAS.C'}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[11px] font-mono text-blue-400/90 tracking-wider">
              {profile?.roleTitle || 'Full-Stack Developer'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Resume Pill Button */}
          <button
            id="navbar-resume-btn"
            onClick={onOpenResume}
            className="bg-white/5 border border-white/10 px-5 py-2 rounded-full text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer shadow-sm"
          >
            <span>Resume</span>
            <span className="text-[10px] opacity-60 font-mono">PDF</span>
          </button>

          {/* Theme Toggle */}
          <button
            id="navbar-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            id="navbar-admin-trigger-btn"
            onClick={onOpenAdmin}
            title={isAuthenticated ? 'Admin Dashboard (Logged In)' : 'Admin Dashboard Login'}
            className={`p-2.5 rounded-full border transition-all relative cursor-pointer ${
              isAuthenticated
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            {isAuthenticated && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#020617] animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-theme-toggle"
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-amber-300'
                : 'bg-slate-100 border-slate-200 text-indigo-600'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-colors ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`lg:hidden border-b overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800 backdrop-blur-xl'
                : 'bg-white/95 border-slate-200 backdrop-blur-xl'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <button
                      key={link.name}
                      id={`mobile-nav-${link.name.toLowerCase()}`}
                      onClick={() => handleNavClick(link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-indigo-950/60 text-cyan-400 border border-indigo-800/40'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          : theme === 'dark'
                            ? 'text-slate-300 hover:bg-slate-900'
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2.5">
                <button
                  id="mobile-resume-btn"
                  onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Full Resume (PDF)</span>
                </button>

                <button
                  id="mobile-admin-btn"
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span>{isAuthenticated ? 'Admin Dashboard (Active)' : 'Admin Dashboard Login'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
