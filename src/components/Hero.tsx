import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Database,
  Cpu,
  ArrowDown,
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  Check,
  Loader2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const { profile, uploadAvatar } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const roles = profile?.rolesList && profile.rolesList.length > 0
    ? profile.rolesList
    : ['Full-Stack Developer', 'MERN Stack Engineer', 'Open Source Contributor', 'Problem Solver'];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for developer titles
  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const typingSpeed = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentFullRole.substring(0, prev.length - 1)
            : currentFullRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = profile?.name || 'YASHAS C';
  const intro = profile?.aboutIntro || 'I build modern, scalable, and user-friendly web applications that turn ideas into real-world solutions.';

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB.');
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Result = e.target?.result as string;
      if (base64Result) {
        const success = await uploadAvatar(base64Result);
        setIsUploadingPhoto(false);
        if (success) {
          setIsPhotoModalOpen(false);
          setUploadSuccessToast(true);
          setTimeout(() => setUploadSuccessToast(false), 3500);
        }
      }
    };
    reader.onerror = () => {
      setIsUploadingPhoto(false);
      alert('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    setIsUploadingPhoto(true);
    const success = await uploadAvatar(photoUrlInput.trim());
    setIsUploadingPhoto(false);
    if (success) {
      setPhotoUrlInput('');
      setIsPhotoModalOpen(false);
      setUploadSuccessToast(true);
      setTimeout(() => setUploadSuccessToast(false), 3500);
    }
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#020617]"
    >
      {/* Background Animated Gradient Mesh Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none animate-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none animate-glow" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Intro text & CTAs */}
          <motion.div 
            id="hero-content-left"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Status Badge */}
            <div 
              id="hero-availability-badge"
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Available for opportunities</span>
            </div>

            {/* Headline */}
            <div className="space-y-3 w-full">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-white">
                Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Next Generation</span> of Web Apps.
              </h1>

              {/* Dynamic Typewriter Title */}
              <div className="h-10 sm:h-12 flex items-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono tracking-tight text-slate-300">
                  <span>I am {name} — </span>
                  <span className="text-blue-400 font-bold">{displayText}</span>
                  <span className="inline-block w-0.5 h-6 ml-1 bg-emerald-400 animate-pulse align-middle" />
                </h2>
              </div>
            </div>

            {/* Professional Summary Paragraph */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                id="hero-view-work-btn"
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5 text-sm"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-me-btn"
                onClick={() => scrollToSection('contact')}
                className="bg-slate-800/50 hover:bg-slate-800 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResume}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Immersive Key Metrics Strip */}
            <div className="pt-6 border-t border-white/5 flex gap-10 sm:gap-14 w-full">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {profile?.stats?.yearsExperience || '04+'}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Years Exp</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {profile?.stats?.projectsCompleted || '25'}+
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Projects Done</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {profile?.stats?.certificationsEarned || '12'}+
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Certifications</div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Connect:
              </span>

              <div className="flex items-center gap-2">
                <a
                  id="hero-social-github"
                  href={profile?.socials?.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  id="hero-social-linkedin"
                  href={profile?.socials?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:bg-white/10 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  id="hero-social-instagram"
                  href={profile?.socials?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  id="hero-social-email"
                  href={profile?.socials?.email || 'mailto:alex.morgan.dev@gmail.com'}
                  aria-label="Send Email"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Immersive Glass Card with Avatar & Tech Visualizer */}
          <motion.div
            id="hero-visual-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Top Featured Interactive Glass Card */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-7 relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/15 blur-3xl pointer-events-none" />
              
              <div className="relative flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Senior Architecture
                  </span>
                  <span className="bg-slate-900/80 px-3 py-1 rounded-lg text-xs font-mono border border-white/10 text-emerald-400">
                    2025 ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {/* Interactive Profile Photo Container with Upload Trigger */}
                  <div className="relative group/avatar shrink-0">
                    <div 
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl cursor-pointer relative transition-transform group-hover/avatar:scale-105"
                      title="Click to change or upload profile photo"
                    >
                      <img
                        src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-0.5 backdrop-blur-[2px]">
                        <Camera className="w-5 h-5 text-emerald-400" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Change</span>
                      </div>
                    </div>

                    {/* Quick Camera Action Badge */}
                    <button
                      type="button"
                      onClick={() => setIsPhotoModalOpen(true)}
                      aria-label="Upload Profile Photo"
                      className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md border-2 border-[#020617] cursor-pointer transition-transform hover:scale-110"
                      title="Upload Profile Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{name}</h3>
                      <button
                        type="button"
                        onClick={() => setIsPhotoModalOpen(true)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                      >
                        Upload Photo
                      </button>
                    </div>
                    <p className="text-slate-400 text-xs font-mono mt-0.5">{profile?.roleTitle || 'Full-Stack Software Engineer'}</p>
                    <p className="text-slate-500 text-[11px] font-mono mt-0.5">{profile?.location || 'Bengaluru, India'}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mb-5">
                  Specializing in scalable distributed systems, high-throughput React state engines, and production full-stack pipelines.
                </p>
                
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/10 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* System Activity Chart / Pulse Bars */}
                <div className="h-28 bg-gradient-to-t from-slate-950 to-slate-900/80 rounded-2xl border border-white/5 overflow-hidden p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>PERFORMANCE INDEX</span>
                    <span className="text-emerald-400">99.8% OPTIMAL</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16 w-full">
                    <div className="w-full bg-blue-500/40 h-[35%] rounded-t-md"></div>
                    <div className="w-full bg-blue-500/60 h-[65%] rounded-t-md"></div>
                    <div className="w-full bg-emerald-500/60 h-[50%] rounded-t-md"></div>
                    <div className="w-full bg-blue-500/80 h-[90%] rounded-t-md"></div>
                    <div className="w-full bg-emerald-500/50 h-[40%] rounded-t-md"></div>
                    <div className="w-full bg-blue-500/70 h-[75%] rounded-t-md"></div>
                    <div className="w-full bg-emerald-500/80 h-[85%] rounded-t-md"></div>
                    <div className="w-full bg-blue-500/50 h-[60%] rounded-t-md"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Split Expertise Blocks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                <div className="text-emerald-400 text-lg font-bold mb-0.5">Backend & API</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Core Stack</div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between"><span>Node/Express</span><span className="text-emerald-400">95%</span></div>
                  <div className="flex justify-between"><span>MongoDB/SQL</span><span className="text-emerald-400">90%</span></div>
                  <div className="flex justify-between"><span>REST & GraphQL</span><span className="text-emerald-400">88%</span></div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                <div className="text-blue-400 text-lg font-bold mb-0.5">Frontend & UI</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Modern Web</div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between"><span>React 19 & Vite</span><span className="text-blue-400">96%</span></div>
                  <div className="flex justify-between"><span>TypeScript</span><span className="text-blue-400">92%</span></div>
                  <div className="flex justify-between"><span>Tailwind CSS</span><span className="text-blue-400">95%</span></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll down to About section"
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer group"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-blue-400">Explore Architecture</span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform text-blue-400" />
          </button>
        </div>
      </div>

      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* Success Notification Toast */}
      <AnimatePresence>
        {uploadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs sm:text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Profile photo updated successfully across your portfolio!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Profile Photo Modal Dialog */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div
            id="photo-upload-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => !isUploadingPhoto && setIsPhotoModalOpen(false)}
          >
            <motion.div
              id="photo-upload-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-[#020617]/95 p-6 sm:p-8 text-white shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Upload Profile Photo</h3>
                    <p className="text-xs text-slate-400">Personalize your developer portfolio avatar</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  disabled={isUploadingPhoto}
                  aria-label="Close photo modal"
                  className="p-1.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileSelect(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-blue-400 bg-blue-500/10'
                    : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Drag & Drop your photo here, or <span className="text-blue-400 underline">Browse</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports PNG, JPG, JPEG, WebP, SVG (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Current Preview vs Selected */}
              <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/15 shrink-0">
                  <img
                    src={profile?.avatarUrl || presetAvatars[0]}
                    alt="Current avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">Active Avatar</div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[260px]">
                    {profile?.avatarUrl?.startsWith('data:') ? 'Custom Uploaded Base64 Image' : (profile?.avatarUrl || 'Default Avatar')}
                  </div>
                </div>
              </div>

              {/* URL Input Form */}
              <form onSubmit={handleUrlSubmit} className="space-y-3 mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Or Paste an Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isUploadingPhoto || !photoUrlInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold disabled:opacity-50 transition-all cursor-pointer shadow-md"
                  >
                    Save URL
                  </button>
                </div>
              </form>

              {/* Preset Avatar Selection */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Or Select a Preset Developer Avatar
                </span>
                <div className="flex items-center gap-3">
                  {presetAvatars.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => uploadAvatar(presetUrl)}
                      className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white/10 hover:border-blue-400 transition-all hover:scale-105 cursor-pointer"
                    >
                      <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploading indicator */}
              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <span className="text-xs font-mono text-slate-300">Processing & saving profile photo...</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
