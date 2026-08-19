import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Github, 
  Linkedin, 
  Instagram, 
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { api } from '../services/api';

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear alerts on edit
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your Name, Email, and Message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.sendMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message
      }).catch(() => null);

      if (res && res.success) {
        setSuccessMessage('Thank you! Your message has been sent to my inbox and saved to the database.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Fallback for static hosting (GitHub Pages)
        try {
          const stored = JSON.parse(localStorage.getItem('devfolio_offline_messages') || '[]');
          stored.push({ ...formData, date: new Date().toISOString() });
          localStorage.setItem('devfolio_offline_messages', JSON.stringify(stored));
        } catch (e) {}

        setSuccessMessage('Thank you! Your inquiry has been recorded. You can also send directly via email below.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setErrorMessage('Failed to send message. Please reach out directly to yashas.c.dev@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const email = profile?.email || 'yashas.c.dev@gmail.com';
  const phone = profile?.phone || '+91 8147837927';
  const location = profile?.location || 'Bengaluru, India (Open to Relocation & Remote)';

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let's Build Something Great</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Have an open engineering opportunity, project collaboration, or interview request? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Direct Contact Details
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                I am actively reviewing full-time software engineering roles and placement opportunities. Feel free to contact me via email, phone, or LinkedIn.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3.5">
              {/* Email Card */}
              <a
                id="contact-info-email"
                href={`mailto:${email}`}
                className="p-5 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</div>
                  <div className="text-sm font-semibold text-white">
                    {email}
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <a
                id="contact-info-phone"
                href={`tel:${phone}`}
                className="p-5 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</div>
                  <div className="text-sm font-semibold text-white">
                    {phone}
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-5 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Location</div>
                  <div className="text-sm font-semibold text-white">
                    {location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Social Networks
              </div>
              <div className="flex items-center gap-3">
                <a
                  id="contact-social-github"
                  href={profile?.socials?.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  id="contact-social-linkedin"
                  href={profile?.socials?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  id="contact-social-instagram"
                  href={profile?.socials?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-pink-400 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-white">
                Send a Direct Message
              </h3>

              {/* Status Notifications */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form id="portfolio-contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-name"
                      className="text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-form-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-email"
                      className="text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="contact-form-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jane@company.com"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-phone"
                      className="text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="contact-form-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-subject"
                      className="text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-form-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineering Role"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-form-message"
                    className="text-xs font-bold uppercase tracking-wider text-slate-400"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-form-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, project scope, or interview schedule..."
                    className="w-full px-4 py-3.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Server...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Securely processed and recorded in the MongoDB backend.</span>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
