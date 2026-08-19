import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderPlus, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  User, 
  BarChart3, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Eye, 
  ExternalLink, 
  Shield, 
  Lock, 
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  Camera,
  Upload,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { api } from '../services/api';
import { Project, Skill, Experience, Education, Achievement, Message } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const { token, isAuthenticated, login, logout, loading: authLoading } = useAuth();
  const { 
    profile, 
    projects, 
    skills, 
    experience, 
    education, 
    achievements, 
    stats,
    uploadAvatar,
    refreshData 
  } = usePortfolio();

  const adminFileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);

  // Admin Auth Form State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'experience' | 'education' | 'achievements' | 'messages' | 'profile'>('overview');

  // Contact Messages State
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Modal / Editing Item State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingExperience, setEditingExperience] = useState<Partial<Experience> | null>(null);
  const [editingEducation, setEditingEducation] = useState<Partial<Education> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
  const [profileForm, setProfileForm] = useState<any>(profile || {});

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // Sync profile form when profile updates
  useEffect(() => {
    if (profile) setProfileForm(profile);
  }, [profile]);

  // Fetch messages if authenticated and on messages tab or overview
  useEffect(() => {
    if (isAuthenticated && token) {
      loadMessages();
    }
  }, [isAuthenticated, token]);

  const loadMessages = async () => {
    if (!token) return;
    try {
      setLoadingMessages(true);
      const res = await api.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await login(username, password);
      if (!res.success) {
        setLoginError(res.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- CRUD Handlers ---

  // Project CRUD
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject) return;
    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        showNotification('success', 'Project updated successfully');
      } else {
        await api.createProject(editingProject);
        showNotification('success', 'Project created successfully');
      }
      setEditingProject(null);
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showNotification('success', 'Project deleted');
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete project');
    }
  };

  // Skill CRUD
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingSkill) return;
    try {
      if (editingSkill.id) {
        await api.updateSkill(editingSkill.id, editingSkill);
        showNotification('success', 'Skill updated successfully');
      } else {
        await api.createSkill(editingSkill);
        showNotification('success', 'Skill created successfully');
      }
      setEditingSkill(null);
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!token || !confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      showNotification('success', 'Skill removed');
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete skill');
    }
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await api.updateProfile(profileForm);
      showNotification('success', 'Portfolio Profile updated successfully');
      refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update profile');
    }
  };

  const handleAdminPhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'File size exceeds 5MB limit');
      return;
    }

    setIsUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        const success = await uploadAvatar(base64);
        setIsUploadingAvatar(false);
        if (success) {
          setProfileForm((prev: any) => ({ ...prev, avatarUrl: base64 }));
          showNotification('success', 'Profile photo updated & saved successfully!');
        } else {
          showNotification('error', 'Failed to save profile photo');
        }
      }
    };
    reader.onerror = () => {
      setIsUploadingAvatar(false);
      showNotification('error', 'Error reading image file');
    };
    reader.readAsDataURL(file);
  };

  const handleAdminPresetSelect = async (url: string) => {
    setIsUploadingAvatar(true);
    const success = await uploadAvatar(url);
    setIsUploadingAvatar(false);
    if (success) {
      setProfileForm((prev: any) => ({ ...prev, avatarUrl: url }));
      showNotification('success', 'Profile photo updated to preset');
    } else {
      showNotification('error', 'Failed to update preset photo');
    }
  };

  // Message Delete
  const handleDeleteMessage = async (id: string) => {
    if (!token || !confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      showNotification('success', 'Message deleted');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete message');
    }
  };

  // Mark Message Read
  const handleMarkMessageRead = async (id: string) => {
    if (!token) return;
    try {
      await api.markMessageRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      id="admin-dashboard-wrapper"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        id="admin-dashboard-container"
        className={`relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Title Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base">Portfolio Admin CMS</h2>
              <span className="text-[10px] font-mono text-cyan-400">Database & Content Management System</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                id="admin-logout-btn"
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}

            <button
              id="admin-close-btn"
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                theme === 'dark' ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global In-Dashboard Notification */}
        {notification && (
          <div className={`px-6 py-2 text-xs font-semibold flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-emerald-950/90 text-emerald-300' : 'bg-red-950/90 text-red-300'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notification.text}</span>
          </div>
        )}

        {/* Main Content Area */}
        {!isAuthenticated ? (
          /* Login View */
          <div className="p-8 sm:p-16 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold">Admin Portal Login</h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Sign in to manage projects, technical competencies, timeline history, and inquiries.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Username</label>
                <input
                  type="text"
                  id="admin-login-username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                <input
                  type="password"
                  id="admin-login-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                id="admin-login-submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg cursor-pointer transition-all"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>

              <div className="text-[11px] text-center text-slate-500 font-mono">
                Default credentials: <span className="text-cyan-400">admin</span> / <span className="text-cyan-400">admin123</span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className={`w-full md:w-56 p-4 border-r flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0 ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: FolderPlus, count: projects.length },
                { id: 'skills', label: 'Skills', icon: Code, count: skills.length },
                { id: 'experience', label: 'Experience', icon: Briefcase, count: experience.length },
                { id: 'education', label: 'Education', icon: GraduationCap, count: education.length },
                { id: 'achievements', label: 'Certificates', icon: Award, count: achievements.length },
                { id: 'messages', label: 'Messages', icon: Mail, count: messages.filter(m => !m.isRead).length },
                { id: 'profile', label: 'Profile Bio', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`admin-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-sm'
                        : theme === 'dark'
                          ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {typeof tab.count === 'number' && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Tab Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Portfolio Metric Insights</h3>
                      <p className="text-xs text-slate-400">Real-time state and database sync statistics.</p>
                    </div>
                    <button
                      onClick={refreshData}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs text-slate-400">Total Projects</div>
                      <div className="text-2xl font-bold text-indigo-400 mt-1">{projects.length}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs text-slate-400">Skills Tracked</div>
                      <div className="text-2xl font-bold text-cyan-400 mt-1">{skills.length}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs text-slate-400">Inquiries Received</div>
                      <div className="text-2xl font-bold text-emerald-400 mt-1">{messages.length}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs text-slate-400">Site Page Views</div>
                      <div className="text-2xl font-bold text-amber-400 mt-1">{stats?.pageViews || 1420}</div>
                    </div>
                  </div>

                  {/* Recent Contact Messages Preview */}
                  <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span>Recent Contact Messages</span>
                      </h4>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-xs text-cyan-400 hover:underline font-semibold"
                      >
                        View All
                      </button>
                    </div>

                    {messages.length > 0 ? (
                      <div className="space-y-2">
                        {messages.slice(0, 3).map((m) => (
                          <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-slate-200">{m.name}</span>
                              <span className="text-slate-400 ml-2 font-mono">({m.email})</span>
                              <div className="text-slate-400 mt-0.5 line-clamp-1">{m.message}</div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(m.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No messages received yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Project Management</h3>
                      <p className="text-xs text-slate-400">Add, edit, or remove showcase engineering projects.</p>
                    </div>
                    <button
                      id="admin-add-project-btn"
                      onClick={() => setEditingProject({
                        title: '',
                        shortDescription: '',
                        category: 'Web',
                        technologies: ['React', 'Node.js'],
                        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                        githubUrl: 'https://github.com',
                        liveDemoUrl: 'https://demo.com',
                        featured: true,
                        problemStatement: '',
                        solution: '',
                        features: ['High-Performance Responsive UI']
                      })}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Project Items List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <img src={proj.image} alt={proj.title} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-cyan-300 border border-indigo-800">
                                {proj.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.shortDescription}</p>
                            <div className="text-[10px] text-slate-500 font-mono mt-2">
                              Stack: {proj.technologies.slice(0, 3).join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal for Creating / Editing Project */}
                  {editingProject && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h4 className="text-base font-bold text-white">
                            {editingProject.id ? 'Edit Project' : 'Add New Project'}
                          </h4>
                          <button onClick={() => setEditingProject(null)} className="p-1 rounded text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleSaveProject} className="space-y-3">
                          <div>
                            <label className="font-bold text-slate-400">Project Title</label>
                            <input
                              type="text"
                              required
                              value={editingProject.title || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-400">Category</label>
                              <select
                                value={editingProject.category || 'Web'}
                                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                              >
                                <option value="Web">Web</option>
                                <option value="Java">Java</option>
                                <option value="C/C++">C/C++</option>
                                <option value="Arduino">Arduino</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="font-bold text-slate-400">Featured On Homepage</label>
                              <select
                                value={editingProject.featured ? 'true' : 'false'}
                                onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.value === 'true' })}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                              >
                                <option value="true">Yes (Featured)</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-400">Image URL</label>
                            <input
                              type="text"
                              required
                              value={editingProject.image || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-400">Short Description</label>
                            <textarea
                              rows={2}
                              required
                              value={editingProject.shortDescription || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-400">Technologies (comma separated)</label>
                            <input
                              type="text"
                              value={editingProject.technologies?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject,
                                technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                              })}
                              placeholder="React, Node.js, Express, MongoDB"
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-400">GitHub Link</label>
                              <input
                                type="text"
                                value={editingProject.githubUrl || ''}
                                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                              />
                            </div>
                            <div>
                              <label className="font-bold text-slate-400">Live Demo Link</label>
                              <input
                                type="text"
                                value={editingProject.liveDemoUrl || ''}
                                onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => setEditingProject(null)}
                              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                            >
                              Save Project
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Skills Management</h3>
                      <p className="text-xs text-slate-400">Update technical skills and proficiency levels.</p>
                    </div>
                    <button
                      onClick={() => setEditingSkill({
                        name: '',
                        category: 'Frontend',
                        proficiency: 85
                      })}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 text-white cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-xs">{skill.name}</div>
                          <div className="text-[10px] text-cyan-400 font-mono">{skill.category} — {skill.proficiency}%</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-1.5 rounded bg-slate-800 text-slate-300"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1.5 rounded bg-red-950 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingSkill && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 text-xs">
                        <h4 className="text-base font-bold text-white">
                          {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
                        </h4>
                        <form onSubmit={handleSaveSkill} className="space-y-3">
                          <div>
                            <label className="font-bold text-slate-400">Skill Name</label>
                            <input
                              type="text"
                              required
                              value={editingSkill.name || ''}
                              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-400">Category</label>
                            <select
                              value={editingSkill.category || 'Frontend'}
                              onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                            >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Database">Database</option>
                              <option value="Programming">Programming</option>
                              <option value="Tools">Tools</option>
                            </select>
                          </div>
                          <div>
                            <label className="font-bold text-slate-400">Proficiency: {editingSkill.proficiency || 80}%</label>
                            <input
                              type="range"
                              min={10}
                              max={100}
                              value={editingSkill.proficiency || 80}
                              onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                              className="w-full mt-2"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => setEditingSkill(null)}
                              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                            >
                              Save Skill
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PROFILE BIO & SOCIALS */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Portfolio Profile & Branding</h3>
                    <p className="text-xs text-slate-400">Configure photo, name, titles, career objective, philosophy, and social accounts.</p>
                  </div>

                  {/* Profile Photo Upload Section */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Camera className="w-4 h-4 text-cyan-400" />
                        <span>Profile Photo / Avatar</span>
                      </div>
                      <span className="text-[11px] text-slate-400">PNG, JPG, WebP (Max 5MB)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Avatar preview */}
                      <div className="md:col-span-3 flex flex-col items-center gap-2">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl relative group">
                          <img
                            src={profileForm.avatarUrl || profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover"
                          />
                          {isUploadingAvatar && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Current Photo</span>
                      </div>

                      {/* Dropzone & file trigger */}
                      <div className="md:col-span-9 space-y-3">
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDraggingPhoto(true);
                          }}
                          onDragLeave={() => setIsDraggingPhoto(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingPhoto(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              handleAdminPhotoFile(e.dataTransfer.files[0]);
                            }
                          }}
                          onClick={() => adminFileInputRef.current?.click()}
                          className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex items-center justify-center gap-3 ${
                            isDraggingPhoto
                              ? 'border-cyan-400 bg-cyan-500/10'
                              : 'border-slate-700 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-950'
                          }`}
                        >
                          <Upload className="w-5 h-5 text-cyan-400 shrink-0" />
                          <div className="text-left">
                            <div className="text-xs font-semibold text-white">
                              Click to browse or drag & drop new profile photo
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Instant Base64 encoding & database persistence
                            </div>
                          </div>
                        </div>

                        {/* Hidden Input */}
                        <input
                          type="file"
                          ref={adminFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleAdminPhotoFile(e.target.files[0]);
                            }
                          }}
                        />

                        {/* Presets & URL */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
                          {[
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
                          ].map((url, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleAdminPresetSelect(url)}
                              className="w-7 h-7 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-400 transition-all cursor-pointer"
                            >
                              <img src={url} alt={`Preset ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-400">Primary Role Title</label>
                        <input
                          type="text"
                          required
                          value={profileForm.roleTitle || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, roleTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          value={profileForm.phone || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-400">Location</label>
                        <input
                          type="text"
                          value={profileForm.location || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-400">Short Intro Summary</label>
                      <textarea
                        rows={2}
                        value={profileForm.aboutIntro || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutIntro: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-400">Career Objective</label>
                      <textarea
                        rows={2}
                        value={profileForm.careerObjective || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, careerObjective: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-400">Development Philosophy</label>
                      <textarea
                        rows={2}
                        value={profileForm.philosophy || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, philosophy: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-slate-400">GitHub Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.github || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, github: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-400">LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials?.linkedin || ''}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, linkedin: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-400">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-sm shadow-md cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Portfolio Profile</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Inquiries & Contact Leads</h3>
                      <p className="text-xs text-slate-400">Messages sent through the portfolio contact form.</p>
                    </div>
                    <button
                      onClick={loadMessages}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {messages.length > 0 ? (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            m.isRead
                              ? 'bg-slate-950/60 border-slate-900'
                              : 'bg-slate-900/90 border-cyan-500/30 shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{m.name}</span>
                              <span className="text-xs font-mono text-cyan-400">({m.email})</span>
                              {m.phone && <span className="text-xs text-slate-400 font-mono">| {m.phone}</span>}
                            </div>
                            <span className="text-[11px] font-mono text-slate-500">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                          </div>

                          {m.subject && (
                            <div className="text-xs font-semibold text-indigo-300 mb-1">
                              Subject: {m.subject}
                            </div>
                          )}

                          <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {m.message}
                          </p>

                          <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end gap-2 text-xs">
                            {!m.isRead && (
                              <button
                                onClick={() => handleMarkMessageRead(m.id)}
                                className="px-3 py-1 rounded-lg bg-indigo-950 text-cyan-300 border border-indigo-800 flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark as Read</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="px-3 py-1 rounded-lg bg-red-950 text-red-400 border border-red-900/40 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-500 text-xs">
                      No inquiries received yet.
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs fallback */}
              {['experience', 'education', 'achievements'].includes(activeTab) && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold capitalize">{activeTab} CMS</h3>
                  <p className="text-xs text-slate-400">Manage your verified {activeTab} records directly.</p>
                  <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
                    <p className="text-xs text-slate-300">
                      All records are dynamically served from the database and can be modified or extended via the backend API.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
