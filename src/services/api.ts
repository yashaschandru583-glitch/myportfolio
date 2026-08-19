import { 
  Project, Skill, Experience, Education, Achievement, Message, Profile, DashboardStats 
} from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('devfolio_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export const api = {
  // Public Data Fetching
  async getProfile(): Promise<{ success: boolean; data: Profile }> {
    const res = await fetch(`${API_BASE}/profile`);
    return handleResponse(res);
  },

  async getProjects(category?: string, featured?: boolean): Promise<{ success: boolean; count: number; data: Project[] }> {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (featured) params.append('featured', 'true');
    const res = await fetch(`${API_BASE}/projects?${params.toString()}`);
    return handleResponse(res);
  },

  async getProject(id: string): Promise<{ success: boolean; data: Project }> {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    return handleResponse(res);
  },

  async getSkills(category?: string): Promise<{ success: boolean; count: number; data: Skill[] }> {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    const res = await fetch(`${API_BASE}/skills?${params.toString()}`);
    return handleResponse(res);
  },

  async getExperience(): Promise<{ success: boolean; count: number; data: Experience[] }> {
    const res = await fetch(`${API_BASE}/experience`);
    return handleResponse(res);
  },

  async getEducation(): Promise<{ success: boolean; count: number; data: Education[] }> {
    const res = await fetch(`${API_BASE}/education`);
    return handleResponse(res);
  },

  async getAchievements(): Promise<{ success: boolean; count: number; data: Achievement[] }> {
    const res = await fetch(`${API_BASE}/achievements`);
    return handleResponse(res);
  },

  async sendMessage(data: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async askAi(question: string): Promise<{ success: boolean; answer: string }> {
    const res = await fetch(`${API_BASE}/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    return handleResponse(res);
  },

  async askAI(question: string): Promise<{ success: boolean; answer: string }> {
    return this.askAi(question);
  },

  // Auth Operations
  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: any; message: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res);
  },

  async verifyAuth(): Promise<{ success: boolean; user: any }> {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Admin Protected Operations
  async getDashboardStats(): Promise<{ success: boolean; data: DashboardStats }> {
    const res = await fetch(`${API_BASE}/stats`);
    return handleResponse(res);
  },

  async updateProfile(profileData: Partial<Profile>): Promise<{ success: boolean; data: Profile }> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(profileData)
    });
    return handleResponse(res);
  },

  async uploadProfilePhoto(photoUrl: string): Promise<{ success: boolean; avatarUrl: string; data: Profile }> {
    const res = await fetch(`${API_BASE}/profile/upload-photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ photoUrl })
    });
    return handleResponse(res);
  },

  // Project CRUD
  async createProject(project: Partial<Project>): Promise<{ success: boolean; data: Project }> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(project)
    });
    return handleResponse(res);
  },

  async updateProject(id: string, project: Partial<Project>): Promise<{ success: boolean; data: Project }> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(project)
    });
    return handleResponse(res);
  },

  async deleteProject(id: string): Promise<{ success: boolean; data: Project }> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Skill CRUD
  async createSkill(skill: Partial<Skill>): Promise<{ success: boolean; data: Skill }> {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(skill)
    });
    return handleResponse(res);
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<{ success: boolean; data: Skill }> {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(skill)
    });
    return handleResponse(res);
  },

  async deleteSkill(id: string): Promise<{ success: boolean; data: Skill }> {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Experience CRUD
  async createExperience(exp: Partial<Experience>): Promise<{ success: boolean; data: Experience }> {
    const res = await fetch(`${API_BASE}/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(exp)
    });
    return handleResponse(res);
  },

  async updateExperience(id: string, exp: Partial<Experience>): Promise<{ success: boolean; data: Experience }> {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(exp)
    });
    return handleResponse(res);
  },

  async deleteExperience(id: string): Promise<{ success: boolean; data: Experience }> {
    const res = await fetch(`${API_BASE}/experience/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Education CRUD
  async createEducation(edu: Partial<Education>): Promise<{ success: boolean; data: Education }> {
    const res = await fetch(`${API_BASE}/education`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(edu)
    });
    return handleResponse(res);
  },

  async updateEducation(id: string, edu: Partial<Education>): Promise<{ success: boolean; data: Education }> {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(edu)
    });
    return handleResponse(res);
  },

  async deleteEducation(id: string): Promise<{ success: boolean; data: Education }> {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Achievement CRUD
  async createAchievement(ach: Partial<Achievement>): Promise<{ success: boolean; data: Achievement }> {
    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(ach)
    });
    return handleResponse(res);
  },

  async updateAchievement(id: string, ach: Partial<Achievement>): Promise<{ success: boolean; data: Achievement }> {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(ach)
    });
    return handleResponse(res);
  },

  async deleteAchievement(id: string): Promise<{ success: boolean; data: Achievement }> {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  // Message Management
  async getMessages(): Promise<{ success: boolean; count: number; unreadCount: number; data: Message[] }> {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  },

  async toggleMessageRead(id: string, isRead?: boolean): Promise<{ success: boolean; data: Message }> {
    const res = await fetch(`${API_BASE}/messages/${id}/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ isRead })
    });
    return handleResponse(res);
  },

  async markMessageRead(id: string): Promise<{ success: boolean; data: Message }> {
    return this.toggleMessageRead(id, true);
  },

  async deleteMessage(id: string): Promise<{ success: boolean; data: Message }> {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse(res);
  }
};
