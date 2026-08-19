import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { 
  Project, Skill, Experience, Education, Achievement, Profile, Message, DashboardStats 
} from '../types';

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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals & View states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
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

      if (profRes.data) setProfile(profRes.data);
      if (projRes.data) setProjects(projRes.data);
      if (skRes.data) setSkills(skRes.data);
      if (expRes.data) setExperience(expRes.data);
      if (eduRes.data) setEducation(eduRes.data);
      if (achRes.data) setAchievements(achRes.data);

      // Fetch admin stats if available
      try {
        const statsRes = await api.getDashboardStats();
        if (statsRes.data) setStats(statsRes.data);
      } catch (e) {
        // Normal if not admin
      }
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProfileState = (updated: Profile) => {
    setProfile(updated);
  };

  const uploadAvatar = async (photoUrl: string): Promise<boolean> => {
    try {
      const res = await api.uploadProfilePhoto(photoUrl);
      if (res.success && res.data) {
        setProfile(res.data);
        return true;
      }
      // If endpoint returned avatarUrl
      if (profile && res.avatarUrl) {
        setProfile({ ...profile, avatarUrl: res.avatarUrl });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to upload avatar:', err);
      // Fallback local update
      if (profile) {
        setProfile({ ...profile, avatarUrl: photoUrl });
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
