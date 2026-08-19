import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { 
  Project, Skill, Experience, Education, Achievement, Profile, Message, DashboardStats 
} from '../types';
import { 
  initialProfile, 
  initialProjects, 
  initialSkills, 
  initialExperience, 
  initialEducation, 
  initialAchievements, 
  initialStats 
} from '../data/initialData';

interface PortfolioContextType {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  messages: Message[];
  stats: DashboardStats | null;
  loading: boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  refreshData: () => Promise<void>;
  updateProfileState: (updated: Profile) => void;
  uploadAvatar: (photoUrl: string) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read any saved client-side profile or avatar from localStorage if running on static hosting
  const getInitialProfile = (): Profile => {
    try {
      const saved = localStorage.getItem('devfolio_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return initialProfile;
  };

  const [profile, setProfile] = useState<Profile>(getInitialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experience, setExperience] = useState<Experience[]>(initialExperience);
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState<boolean>(false);

  // Modals & View states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    try {
      const [
        profRes,
        projRes,
        skRes,
        expRes,
        eduRes,
        achRes
      ] = await Promise.all([
        api.getProfile().catch(() => ({ success: false, data: null })),
        api.getProjects().catch(() => ({ success: false, data: [] })),
        api.getSkills().catch(() => ({ success: false, data: [] })),
        api.getExperience().catch(() => ({ success: false, data: [] })),
        api.getEducation().catch(() => ({ success: false, data: [] })),
        api.getAchievements().catch(() => ({ success: false, data: [] }))
      ]);

      if (profRes && profRes.data) {
        setProfile(profRes.data);
      }
      if (projRes && projRes.data && projRes.data.length > 0) {
        setProjects(projRes.data);
      }
      if (skRes && skRes.data && skRes.data.length > 0) {
        setSkills(skRes.data);
      }
      if (expRes && expRes.data && expRes.data.length > 0) {
        setExperience(expRes.data);
      }
      if (eduRes && eduRes.data && eduRes.data.length > 0) {
        setEducation(eduRes.data);
      }
      if (achRes && achRes.data && achRes.data.length > 0) {
        setAchievements(achRes.data);
      }

      // Fetch admin stats if available
      try {
        const statsRes = await api.getDashboardStats();
        if (statsRes && statsRes.data) setStats(statsRes.data);
      } catch (e) {
        // Normal if not admin
      }
    } catch (err) {
      console.warn('Backend unavailable (running in static or offline mode), serving embedded data.');
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProfileState = (updated: Profile) => {
    setProfile(updated);
    try {
      localStorage.setItem('devfolio_profile', JSON.stringify(updated));
    } catch (e) {}
  };

  const uploadAvatar = async (photoUrl: string): Promise<boolean> => {
    try {
      const res = await api.uploadProfilePhoto(photoUrl).catch(() => null);
      if (res && res.success && res.data) {
        setProfile(res.data);
        localStorage.setItem('devfolio_profile', JSON.stringify(res.data));
        return true;
      }
      if (profile && res && res.avatarUrl) {
        const updated = { ...profile, avatarUrl: res.avatarUrl };
        setProfile(updated);
        localStorage.setItem('devfolio_profile', JSON.stringify(updated));
        return true;
      }
      // Fallback local update
      if (profile) {
        const updated = { ...profile, avatarUrl: photoUrl };
        setProfile(updated);
        localStorage.setItem('devfolio_profile', JSON.stringify(updated));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to upload avatar:', err);
      if (profile) {
        const updated = { ...profile, avatarUrl: photoUrl };
        setProfile(updated);
        localStorage.setItem('devfolio_profile', JSON.stringify(updated));
        return true;
      }
      return false;
    }
  };

  return (
    <PortfolioContext.Provider value={{
      profile,
      projects,
      skills,
      experience,
      education,
      achievements,
      messages,
      stats,
      loading,
      selectedProject,
      setSelectedProject,
      isResumeModalOpen,
      setIsResumeModalOpen,
      isAdminOpen,
      setIsAdminOpen,
      refreshData,
      updateProfileState,
      uploadAvatar
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
