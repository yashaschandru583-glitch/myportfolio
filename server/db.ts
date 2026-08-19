import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { 
  IProject, ISkill, IExperience, IEducation, IAchievement, IMessage, IProfile, IUser 
} from './types.js';

// Default Admin credentials for quick preview/placements
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminpassword123';

// Seed Initial Data
const initialProfile: IProfile = {
  name: 'YASHAS C',
  tagline: 'Passionate Full-Stack Developer & Problem Solver',
  roleTitle: 'Full-Stack Developer',
  rolesList: [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'Open Source Contributor',
    'IoT & Hardware Enthusiast'
  ],
  aboutIntro: 'I build modern, scalable, and user-friendly web applications and embedded solutions that turn complex ideas into elegant, real-world software products.',
  careerObjective: 'Aspiring software engineer eager to leverage strong foundations in full-stack web development, algorithms, and distributed systems to build high-impact digital experiences in high-growth engineering teams.',
  interests: [
    'Full-Stack Web Architecture',
    'Embedded IoT Systems',
    'Cloud Computing & DevOps',
    'Algorithm Optimization',
    'Open-Source Collaboration'
  ],
  philosophy: 'Clean code is not just written for machines to execute; it is crafted for humans to understand, maintain, and scale with confidence.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  resumeUrl: '#resume-viewer',
  resumeFileName: 'Yashas_C_Software_Engineer_Resume.pdf',
  email: 'yashas.c.dev@gmail.com',
  phone: '+91 8147837927',
  location: 'Bengaluru, India (Open to Relocation & Remote)',
  availableForOpportunities: true,
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    email: 'mailto:yashas.c.dev@gmail.com'
  },
  stats: {
    projectsCompleted: 16,
    technologiesLearned: 22,
    certificationsEarned: 7,
    yearsExperience: '3+'
  }
};

const initialProjects: IProject[] = [
  {
    id: 'proj-1',
    title: 'Automatic Street Light Controller',
    category: 'Arduino',
    shortDescription: 'Smart energy-saving street lighting automation with LDR ambient sensor integration and relay control.',
    image: '/images/street_light_project.jpg',
    technologies: ['Arduino Uno', 'LDR Sensor', 'C++', 'Relay Module', 'Embedded C', 'Proteus'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://tinkercad.com',
    problemStatement: 'Conventional municipal street lights consume immense electrical power when left continuously on during daylight hours or periods of zero foot traffic, resulting in high grid costs and carbon emissions.',
    solution: 'Engineered an automated Arduino-based microcontroller system utilizing Light Dependent Resistors (LDR) to dynamically detect dusk/dawn lux thresholds, triggering high-current relay circuits with hysteresis debounce protection.',
    features: [
      'Photocell lux sensing with dynamic calibration threshold',
      'Software debounce to prevent false triggering from car headlights',
      'Dual power management with battery backup failover',
      'Serial telemetry monitor for real-time illuminance reporting',
      'Overcurrent protection relay driver circuit'
    ],
    challenges: 'Preventing flickering and rapid switching during twilight transitions when light levels hover right at threshold borders. Solved using algorithmic Schmitt trigger software hysteresis.',
    results: 'Demonstrated up to 43% simulated energy savings compared to timer-only lighting systems, winning the University Engineering Hardware Showcase.',
    featured: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Student Management System',
    category: 'Web',
    shortDescription: 'Full-stack institutional portal with role-based access control, grade tracking, and real-time attendance analytics.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Auth'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.example.com/sms',
    problemStatement: 'Educational institutions struggle with fragmented spreadsheets for student enrollment, GPA computation, attendance records, and faculty notices, causing data desynchronization.',
    solution: 'Designed a unified single-page MERN web application with granular Role-Based Access Control (Admin, Faculty, Student), automated semester GPA calculators, and CSV export engines.',
    features: [
      'Granular RBAC with secure JSON Web Token authentication',
      'Interactive student profile directory with fuzzy search & filters',
      'Automated transcript generation with weighted GPA computation',
      'Attendance tracker with visual percentage heatmaps',
      'Notice board broadcast system with email notifications'
    ],
    challenges: 'Structuring MongoDB indexing and aggregation pipelines to support sub-50ms queries when generating consolidated semester transcripts across thousands of student records.',
    results: 'Adopted in university department pilot supporting 1,200+ students and 45 faculty members with 99.9% uptime.',
    featured: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Java Multi-Function Calculator',
    category: 'Java',
    shortDescription: 'Comprehensive desktop scientific calculator with custom mathematical expression evaluator and matrix operations.',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Java', 'Java Swing', 'AWT', 'OOP', 'JUnit', 'Shunting-yard Algorithm'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://github.com',
    problemStatement: 'Many basic calculators fail to handle complex nested parentheses, trigonometry angles in radians/degrees, or algebraic order of operations without manual stepwise entry.',
    solution: 'Built a Java GUI application leveraging Dijkstra’s Shunting-yard algorithm and Reverse Polish Notation (RPN) stack evaluation for parsing complex mathematical expressions.',
    features: [
      'Scientific computation engine (Trig, Logarithms, Exponentials)',
      'Arbitrary precision arithmetic using BigDecimal',
      'Matrix addition, multiplication, and determinant solver',
      'Persistent calculation history log with export capability',
      'Custom themeable Swing UI with keyboard shortcut listeners'
    ],
    challenges: 'Implementing robust lexical analysis for unary negative operators and mismatched parenthesis validation without throwing unhandled runtime exceptions.',
    results: 'Achieved 100% test coverage across 80+ mathematical edge cases using JUnit test suites.',
    featured: true,
    order: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-4',
    title: 'Personal Portfolio & CMS Platform',
    category: 'Web',
    shortDescription: 'Production-ready full-stack portfolio with dark/light themes, dynamic project CMS, and resume management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React 19', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'REST API'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://devfolio-pro.demo.app',
    problemStatement: 'Developers need a showcase that demonstrates both frontend polish and full-stack engineering proficiency with real backend data persistence instead of static hard-coded text.',
    solution: 'Constructed an end-to-end full-stack web application featuring smooth micro-animations, filterable project galleries, dynamic API endpoints, and a secure admin CMS dashboard.',
    features: [
      'Dynamic project filtering across Web, Java, C++, and Arduino',
      'Dedicated Admin Dashboard with JWT authentication & CRUD operations',
      'Interactive Resume viewer with instant printable PDF download',
      'Contact message persistence with email verification & status tracking',
      'Dark and Light theme switching with system preference detection'
    ],
    challenges: 'Balancing rich interactive animations with optimal web vitals and fast server response times across all mobile and desktop viewports.',
    results: '100% Lighthouse accessibility score and fluid 60fps frame rate transitions across modern browsers.',
    featured: true,
    order: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-5',
    title: 'High-Performance C++ File Compressor',
    category: 'C/C++',
    shortDescription: 'Multi-threaded lossless file compression utility utilizing Huffman coding and min-heap trees in C++20.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    technologies: ['C++', 'C++20', 'POSIX Threads', 'Huffman Coding', 'Bitwise I/O', 'GDB / Valgrind'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://github.com',
    problemStatement: 'Compressing large text and binary archives efficiently requires optimal CPU cache locality and custom bitwise stream serialization.',
    solution: 'Engineered a concurrent CLI compression utility in modern C++ that constructs canonical Huffman trees and parallelizes chunk encoding across hardware CPU cores.',
    features: [
      'Lossless Huffman frequency table generation and tree traversal',
      'Custom BitReader and BitWriter bit-level streaming primitives',
      'POSIX thread worker pool for parallel block compression',
      'Integrity checksum verification with CRC32',
      'Zero-copy memory mapped files using mmap'
    ],
    challenges: 'Handling thread synchronization and ensuring bit-stream boundary alignment when stitching independently compressed chunks into a single unified binary file.',
    results: 'Achieved 42-60% size reduction on standard test corpora with 3.4x faster compression speeds using 4 worker threads.',
    featured: false,
    order: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-6',
    title: 'Smart Home IoT Sensor Gateway',
    category: 'Arduino',
    shortDescription: 'ESP32/Arduino distributed sensor gateway streaming telemetry via MQTT to cloud time-series dashboards.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['ESP32', 'Arduino IDE', 'C++', 'MQTT', 'DHT22 Sensor', 'FreeRTOS'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://github.com',
    problemStatement: 'Home automation devices frequently drop offline due to unreliable Wi-Fi connectivity and high power draw on battery-operated sensors.',
    solution: 'Constructed an ultra-low-power ESP32 sensor node utilizing deep sleep modes, FreeRTOS tasks, and lightweight MQTT broker publishing with QoS guarantees.',
    features: [
      'Deep sleep cycling consuming less than 15uA during standby',
      'Temperature, humidity, and air quality telemetry capture',
      'Local SPIFFS buffer storage during network connectivity dropouts',
      'Over-the-Air (OTA) firmware upgrade capability',
      'MQTT publishing to cloud dashboard with 1s refresh latency'
    ],
    challenges: 'Minimizing active radio transmit duration to prolong single 18650 Li-ion cell lifespan beyond 9 months.',
    results: 'Continuous field deployment testing demonstrated 280+ days of battery operation on a single charge.',
    featured: false,
    order: 6,
    createdAt: new Date().toISOString()
  }
];

const initialSkills: ISkill[] = [
  // Frontend
  { id: 'sk-1', name: 'HTML5 / Semantic Web', category: 'Frontend', proficiency: 95, iconName: 'Layout', order: 1 },
  { id: 'sk-2', name: 'CSS3 / Modern Layouts', category: 'Frontend', proficiency: 92, iconName: 'Palette', order: 2 },
  { id: 'sk-3', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 94, iconName: 'Code', order: 3 },
  { id: 'sk-4', name: 'React.js', category: 'Frontend', proficiency: 92, iconName: 'Atom', order: 4 },
  { id: 'sk-5', name: 'Tailwind CSS', category: 'Frontend', proficiency: 96, iconName: 'Sparkles', order: 5 },
  { id: 'sk-6', name: 'TypeScript', category: 'Frontend', proficiency: 88, iconName: 'FileCode', order: 6 },
  
  // Backend
  { id: 'sk-7', name: 'Node.js', category: 'Backend', proficiency: 90, iconName: 'Server', order: 7 },
  { id: 'sk-8', name: 'Express.js', category: 'Backend', proficiency: 92, iconName: 'Cpu', order: 8 },
  { id: 'sk-9', name: 'RESTful API Design', category: 'Backend', proficiency: 94, iconName: 'Network', order: 9 },
  { id: 'sk-10', name: 'JWT & Web Security', category: 'Backend', proficiency: 86, iconName: 'ShieldCheck', order: 10 },
  
  // Database
  { id: 'sk-11', name: 'MongoDB & Mongoose', category: 'Database', proficiency: 90, iconName: 'Database', order: 11 },
  { id: 'sk-12', name: 'MySQL', category: 'Database', proficiency: 85, iconName: 'Layers', order: 12 },
  { id: 'sk-13', name: 'PostgreSQL', category: 'Database', proficiency: 82, iconName: 'Database', order: 13 },
  
  // Programming
  { id: 'sk-14', name: 'C', category: 'Programming', proficiency: 86, iconName: 'Terminal', order: 14 },
  { id: 'sk-15', name: 'C++', category: 'Programming', proficiency: 88, iconName: 'Binary', order: 15 },
  { id: 'sk-16', name: 'Java & OOP', category: 'Programming', proficiency: 90, iconName: 'Coffee', order: 16 },
  { id: 'sk-17', name: 'Python', category: 'Programming', proficiency: 84, iconName: 'Braces', order: 17 },
  
  // Tools
  { id: 'sk-18', name: 'Git & Version Control', category: 'Tools', proficiency: 92, iconName: 'GitBranch', order: 18 },
  { id: 'sk-19', name: 'GitHub & CI/CD', category: 'Tools', proficiency: 90, iconName: 'GitCommit', order: 19 },
  { id: 'sk-20', name: 'VS Code & DevTools', category: 'Tools', proficiency: 96, iconName: 'CodeSquare', order: 20 },
  { id: 'sk-21', name: 'Postman & API Testing', category: 'Tools', proficiency: 88, iconName: 'Send', order: 21 },
  { id: 'sk-22', name: 'Arduino IDE & Embedded', category: 'Tools', proficiency: 85, iconName: 'CircuitBoard', order: 22 }
];

const initialExperience: IExperience[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Software Engineering Intern',
    organization: 'NovaTech Digital Solutions',
    type: 'Internship',
    location: 'San Jose, CA (Hybrid)',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    current: false,
    description: 'Contributed to the core engineering team building customer analytics dashboards and high-throughput REST APIs.',
    achievements: [
      'Developed 8+ responsive React components with Tailwind CSS reducing page load time by 28%',
      'Optimized Express.js backend endpoints with MongoDB aggregation pipelines for 50,000+ daily events',
      'Wrote comprehensive unit and integration tests achieving 88% test coverage across core routes',
      'Collaborated in Agile sprints with daily standups, code reviews, and Git pull request workflows'
    ],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Git'],
    order: 1
  },
  {
    id: 'exp-2',
    role: 'Technical Lead & Open Source Mentor',
    organization: 'University Developer Club',
    type: 'College Activities',
    location: 'State University Campus',
    startDate: 'Aug 2023',
    endDate: 'Present',
    current: true,
    description: 'Mentoring 150+ student developers in modern web development, algorithms, and collaborative software engineering.',
    achievements: [
      'Organized 6 hands-on workshops on MERN stack, Git version control, and cloud deployments',
      'Led the development team creating the official annual tech festival web portal (4,000+ active users)',
      'Conducted mock technical interviews and resume review clinics for junior peers preparing for campus placements'
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'Git', 'Public Speaking', 'Mentorship'],
    order: 2
  },
  {
    id: 'exp-3',
    role: 'Freelance Web Developer',
    organization: 'Self-Employed / Client Projects',
    type: 'Freelance',
    location: 'Remote',
    startDate: 'Jan 2023',
    endDate: 'Present',
    current: true,
    description: 'Designed and deployed bespoke web applications, landing pages, and business management portals for small businesses.',
    achievements: [
      'Delivered 5+ full-stack client web applications with 100% on-time milestone completion',
      'Configured custom domain DNS, SSL certificates, SEO optimization, and analytics tracking',
      'Integrated Stripe payment gateways, automated email notifications, and customer inquiry funnels'
    ],
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Render'],
    order: 3
  }
];

const initialEducation: IEducation[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science and Engineering',
    college: 'Apex Institute of Engineering & Technology',
    university: 'State Technical University',
    startYear: '2021',
    endYear: '2025',
    cgpaOrPercentage: '8.9 / 10.0 CGPA',
    relevantCoursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java/C++)',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Web Technologies & Cloud Computing',
      'Software Engineering & Testing'
    ],
    order: 1
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Education (12th Grade)',
    fieldOfStudy: 'Physics, Chemistry, Mathematics & Computer Science',
    college: 'St. Xavier Senior Secondary School',
    university: 'Central Board of Secondary Education',
    startYear: '2019',
    endYear: '2021',
    cgpaOrPercentage: '94.2%',
    relevantCoursework: [
      'Advanced Mathematics & Calculus',
      'Physics & Electronics',
      'Computer Science (C++ & Python)',
      'English Communication'
    ],
    order: 2
  }
];

const initialAchievements: IAchievement[] = [
  {
    id: 'ach-1',
    title: 'AWS Certified Cloud Practitioner',
    organization: 'Amazon Web Services (AWS)',
    type: 'Certification',
    date: 'March 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    verificationUrl: 'https://aws.amazon.com/verification',
    description: 'Demonstrated overall understanding of AWS Cloud concepts, security, architecture, pricing, and support services.',
    order: 1
  },
  {
    id: 'ach-2',
    title: '1st Place Winner - State Hackathon 2024',
    organization: 'State Innovation & Tech Council',
    type: 'Hackathon',
    date: 'February 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    verificationUrl: 'https://hackathon.example.com/winners',
    description: 'Built an AI-driven disaster alert & relief routing web platform within 36 hours competing against 80+ collegiate teams.',
    order: 2
  },
  {
    id: 'ach-3',
    title: 'Meta Front-End Developer Professional Certificate',
    organization: 'Meta / Coursera',
    type: 'Certification',
    date: 'November 2023',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    verificationUrl: 'https://coursera.org/verify/meta-frontend',
    description: 'Mastered React, state management, UX/UI principles, accessibility, version control, and test-driven development.',
    order: 3
  },
  {
    id: 'ach-4',
    title: '5-Star Gold Badge in Problem Solving & Java',
    organization: 'HackerRank',
    type: 'Technical Achievement',
    date: 'August 2023',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    verificationUrl: 'https://hackerrank.com',
    description: 'Solved 250+ algorithmic coding challenges across arrays, dynamic programming, trees, and graph theory with top percentile score.',
    order: 4
  }
];

const initialMessages: IMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techcorp.io',
    phone: '+1 (555) 892-1144',
    subject: 'Full-Stack Developer Opportunity @ TechCorp',
    message: 'Hi Alex! I reviewed your portfolio and was very impressed by your Student Management System and Arduino project. We have an open Software Engineer role on our team and would love to chat!',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'msg-2',
    name: 'Prof. David Vance',
    email: 'dvance@university.edu',
    phone: '',
    subject: 'Guest Speaker Invitation - Web Dev Workshop',
    message: 'Dear Alex, your recent workshop on modern MERN stack received outstanding student feedback. Would you be open to giving a keynote talk during our upcoming Tech Symposium?',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

// In-Memory Data Store (Provides 100% resilient fallback and instant responsiveness)
class DataStore {
  public profile: IProfile = { ...initialProfile };
  public projects: IProject[] = [...initialProjects];
  public skills: ISkill[] = [...initialSkills];
  public experience: IExperience[] = [...initialExperience];
  public education: IEducation[] = [...initialEducation];
  public achievements: IAchievement[] = [...initialAchievements];
  public messages: IMessage[] = [...initialMessages];
  public users: IUser[] = [];

  constructor() {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, salt);
    this.users.push({
      id: 'usr-admin-1',
      username: DEFAULT_ADMIN_USERNAME,
      email: 'admin@devfolio.io',
      passwordHash,
      role: 'admin',
      createdAt: new Date().toISOString()
    });
  }
}

export const inMemoryStore = new DataStore();

// MongoDB Mongoose Connection Manager
let isMongoConnected = false;

export async function initDatabase() {
  const uri = process.env.MONGODB_URI;
  if (uri && !uri.includes('<username>') && (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))) {
    try {
      console.log('Connecting to MongoDB Atlas / Database...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      });
      isMongoConnected = true;
      console.log(' Successfully connected to MongoDB via Mongoose!');
    } catch (err: any) {
      console.warn('⚠️ MongoDB connection attempt failed, falling back gracefully to persistent in-memory store:', err.message);
      isMongoConnected = false;
    }
  } else {
    console.log('ℹ️ Running with embedded in-memory data store (MongoDB URI not configured or using default template).');
    isMongoConnected = false;
  }
}

export function getDatabaseStatus() {
  return {
    connectedToMongo: isMongoConnected,
    mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'High-Performance Embedded Store',
    projectsCount: inMemoryStore.projects.length,
    skillsCount: inMemoryStore.skills.length,
    messagesCount: inMemoryStore.messages.length
  };
}
