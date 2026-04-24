
"use client"

export interface Venture {
  title: string;
  role: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string;
  image: string;
  demo: string;
  github: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'Web' | 'Mobile' | 'Backend' | 'Cloud';
}

export interface PortfolioData {
  hero: {
    name: string;
    specialty: string;
    bio: string;
    imageUrl?: string;
  };
  about: {
    title: string;
    bio: string;
    ventures: Venture[];
    imageUrl?: string;
  };
  projects: Project[];
  techStack: TechItem[];
  contact: {
    email: string;
    whatsapp: string;
    linkedin: string;
    github: string;
  };
}

export const initialPortfolioData: PortfolioData = {
  hero: {
    name: "Angelo",
    specialty: "Web & Flutter",
    bio: "I build modern websites and powerful mobile applications. Founder of Zone A & Sidra. Driven by code, led by innovation.",
    imageUrl: "/صورتي.jpg"
  },
  about: {
    title: "Driven by Innovation, Led by Passion.",
    bio: "I am a Software Engineer based in Egypt, specializing in crafting premium web experiences and cross-platform mobile applications using Flutter. I focus on creating clean, efficient, and scalable code that solves real-world problems.",
    imageUrl: "/صورتي.jpg",
    ventures: [
      {
        title: "Zone A",
        role: "Founder & CEO",
        description: "An integrated software house and tech academy empowering businesses and developers with cutting-edge solutions."
      },
      {
        title: "Sidra",
        role: "Founder",
        description: "Innovative tech venture focused on driving digital transformation through unique software products."
      }
    ]
  },
  projects: [],
  techStack: [
    { id: '1', name: 'React', category: 'Web' },
    { id: '2', name: 'Flutter', category: 'Mobile' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'Firebase', category: 'Cloud' },
    { id: '5', name: 'Next.js', category: 'Web' },
    { id: '6', name: 'Tailwind CSS', category: 'Web' },
    { id: '7', name: 'TypeScript', category: 'Web' },
    { id: '8', name: 'Express.js', category: 'Backend' },
    { id: '9', name: 'MongoDB', category: 'Backend' },
    { id: '10', name: 'PostgreSQL', category: 'Backend' },
    { id: '11', name: 'GraphQL', category: 'Backend' },
    { id: '12', name: 'Docker', category: 'Cloud' },
    { id: '13', name: 'AWS', category: 'Cloud' },
    { id: '14', name: 'Git & GitHub', category: 'Tools' },
    { id: '15', name: 'Redux', category: 'Web' },
    { id: '16', name: 'Jest', category: 'Web' },
    { id: '17', name: 'Python', category: 'Backend' },
    { id: '18', name: 'Figma', category: 'Design' },
    { id: '19', name: 'REST API', category: 'Backend' },
    { id: '20', name: 'Material UI', category: 'Web' },
    { id: '21', name: 'Webpack', category: 'Web' },
    { id: '22', name: 'VS Code', category: 'Tools' }
  ],
  contact: {
    email: "angluosr@gmail.com",
    whatsapp: "+201127570256",
    linkedin: "https://www.linkedin.com/in/angluos-rezq-4405b221a/",
    github: "@oaama"
  }
};
