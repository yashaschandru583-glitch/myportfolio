import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { inMemoryStore } from '../db.js';

const router = Router();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// POST /api/ai/ask - developer portfolio AI assistant
router.post('/ask', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ success: false, message: 'Question string is required.' });
      return;
    }

    const profile = inMemoryStore.profile;
    const projects = inMemoryStore.projects;
    const skills = inMemoryStore.skills;
    const experience = inMemoryStore.experience;
    const education = inMemoryStore.education;
    const achievements = inMemoryStore.achievements;

    const portfolioContext = `
You are the AI Portfolio Assistant for ${profile.name} (${profile.roleTitle}).
Your job is to answer questions from recruiters, hiring managers, and visitors about ${profile.name}'s background, skills, projects, education, and availability.

Developer Profile:
- Name: ${profile.name}
- Title: ${profile.roleTitle}
- Tagline: ${profile.tagline}
- About: ${profile.aboutIntro}
- Career Objective: ${profile.careerObjective}
- Philosophy: ${profile.philosophy}
- Location: ${profile.location}
- Open to Opportunities: ${profile.availableForOpportunities ? 'YES, actively interviewing for full-time and internship roles' : 'Not currently open'}
- Email: ${profile.email}, Phone: ${profile.phone}

Featured Projects:
${projects.map(p => `- ${p.title} (${p.category}): ${p.shortDescription}. Tech: ${p.technologies.join(', ')}. Problem: ${p.problemStatement}. Solution: ${p.solution}. Results: ${p.results}`).join('\n')}

Technical Skills:
${skills.map(s => `- ${s.name} (${s.category}, ${s.proficiency}% proficiency)`).join('\n')}

Experience:
${experience.map(e => `- ${e.role} at ${e.organization} (${e.startDate} - ${e.endDate}, ${e.type}): ${e.description}`).join('\n')}

Education:
${education.map(ed => `- ${ed.degree} in ${ed.fieldOfStudy} from ${ed.college} (${ed.startYear} - ${ed.endYear}, CGPA: ${ed.cgpaOrPercentage})`).join('\n')}

Achievements & Certifications:
${achievements.map(a => `- ${a.title} by ${a.organization} (${a.date})`).join('\n')}

Guidelines:
- Speak professionally, warmly, and concisely.
- Highlight specific projects and technologies that match the visitor's query.
- Emphasize problem-solving, engineering craftsmanship, and readiness for software development roles.
- Keep answers under 120 words unless requested in detail.
`;

    const ai = getAiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${portfolioContext}\n\nVisitor Question: "${question}"\n\nHelpful Answer:` }] }
        ]
      });

      const answer = response.text || `I'm happy to tell you about ${profile.name}'s work! Feel free to explore the projects section or leave a note via the contact form.`;
      res.json({ success: true, answer });
      return;
    }

    // Smart heuristic fallback if no Gemini API Key is configured
    const qLower = question.toLowerCase();
    let fallbackAnswer = '';

    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('reach') || qLower.includes('phone')) {
      fallbackAnswer = `You can get in touch with ${profile.name} directly via email at ${profile.email} or call ${profile.phone}. You can also use the contact form at the bottom of this page!`;
    } else if (qLower.includes('hire') || qLower.includes('available') || qLower.includes('opportunity') || qLower.includes('job') || qLower.includes('intern')) {
      fallbackAnswer = `${profile.name} is currently **Available for Opportunities**! Open to Software Engineering full-time roles, internships, and high-impact full-stack development positions.`;
    } else if (qLower.includes('street light') || qLower.includes('arduino') || qLower.includes('hardware') || qLower.includes('iot')) {
      const proj = projects.find(p => p.category === 'Arduino') || projects[0];
      fallbackAnswer = `The **${proj.title}** is an automated embedded project built with ${proj.technologies.join(', ')}. It utilizes LDR sensor lux detection and software hysteresis to dynamically switch municipal lighting, saving up to 43% energy!`;
    } else if (qLower.includes('project') || qLower.includes('work') || qLower.includes('portfolio') || qLower.includes('student')) {
      fallbackAnswer = `${profile.name} has built ${projects.length} major projects across Web (MERN stack), Java Swing, C++ concurrency, and Arduino IoT. Top highlights include the Student Management System and Automatic Street Light Controller.`;
    } else if (qLower.includes('skill') || qLower.includes('tech') || qLower.includes('stack') || qLower.includes('react') || qLower.includes('node')) {
      fallbackAnswer = `${profile.name}'s core stack includes **React.js, Node.js, Express.js, MongoDB, Tailwind CSS, TypeScript, Java, and C++**, along with Git, Postman, and embedded Arduino tooling.`;
    } else if (qLower.includes('education') || qLower.includes('college') || qLower.includes('degree') || qLower.includes('gpa') || qLower.includes('university')) {
      const edu = education[0];
      fallbackAnswer = `${profile.name} is pursuing a ${edu.degree} in ${edu.fieldOfStudy} at ${edu.college} (${edu.startYear}-${edu.endYear}) with a strong academic standing of ${edu.cgpaOrPercentage}.`;
    } else {
      fallbackAnswer = `Hi! I'm ${profile.name}'s AI Assistant. ${profile.name} is a ${profile.roleTitle} skilled in modern web development (React, Node, Express, MongoDB), Java, C++, and IoT. Ask me anything about projects, experience, or hiring!`;
    }

    res.json({ success: true, answer: fallbackAnswer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'AI query processing failed', error: error.message });
  }
});

export default router;
