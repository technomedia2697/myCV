'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import AdminLogin from '@/components/AdminLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Trash2, Plus, Edit2, Upload as UploadIcon, CheckCircle2,
  // Frontend
  Zap, Code2, Layout, Palette,
  // Backend
  Server, Database, Cloud, Package,
  // DevOps
  Container, Boxes, GitBranch, Workflow,
  // Mobile
  Smartphone, Tablets,
  // Testing & Tools
  Bug, Wrench, Terminal, Gem, Leaf,
  // Languages
  Brackets, BarChart3
} from 'lucide-react';

interface Venture {
  _id?: string;
  title: string;
  role: string;
  description: string;
}

interface TechItem {
  _id?: string;
  name: string;
  category: 'Web' | 'Mobile' | 'Backend' | 'Cloud';
}

interface Project {
  _id?: string;
  name: string;
  description: string;
  tech: string[];
  image: string;
  demo?: string;
  github?: string;
  drive?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Contact {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
}

interface PortfolioData {
  _id?: string;
  hero: { name: string; specialty: string; bio: string };
  about: { title: string; bio: string; imageUrl: string; ventures: Venture[] };
  techStack: TechItem[];
  contact: Contact;
  createdAt?: string;
  updatedAt?: string;
}

const CATEGORIES: ('Web' | 'Mobile' | 'Backend' | 'Cloud')[] = ['Web', 'Mobile', 'Backend', 'Cloud'];

const getTechIcon = (name: string): React.ReactNode => {
  const normalizedName = name.toLowerCase().trim();
  
  const iconMap: { [key: string]: { component: React.ReactNode; color: string; label: string } } = {
    // Frontend - React
    'react': { component: <Zap size={20} className="text-[#61dafb]" />, color: 'from-blue-400 to-cyan-400', label: 'React' },
    'vue': { component: <Code2 size={20} className="text-[#42b883]" />, color: 'from-green-400 to-emerald-400', label: 'Vue' },
    'angular': { component: <Layout size={20} className="text-[#dd0031]" />, color: 'from-red-400 to-pink-400', label: 'Angular' },
    'svelte': { component: <Zap size={20} className="text-[#ff3e00]" />, color: 'from-orange-400 to-red-400', label: 'Svelte' },
    'next.js': { component: <Code2 size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'Next.js' },
    'nextjs': { component: <Code2 size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'Next.js' },
    'nuxt': { component: <Zap size={20} className="text-[#00dc82]" />, color: 'from-green-400 to-emerald-400', label: 'Nuxt' },
    
    // Languages
    'typescript': { component: <Brackets size={20} className="text-[#3178c6]" />, color: 'from-blue-500 to-blue-600', label: 'TypeScript' },
    'javascript': { component: <Zap size={20} className="text-[#f7df1e]" />, color: 'from-yellow-400 to-yellow-500', label: 'JavaScript' },
    'python': { component: <Terminal size={20} className="text-[#3776ab]" />, color: 'from-blue-400 to-blue-600', label: 'Python' },
    'java': { component: <Brackets size={20} className="text-[#007396]" />, color: 'from-blue-500 to-blue-700', label: 'Java' },
    'c': { component: <Code2 size={20} className="text-[#a8b9cc]" />, color: 'from-blue-300 to-blue-500', label: 'C' },
    'c++': { component: <Code2 size={20} className="text-[#00599c]" />, color: 'from-blue-400 to-blue-600', label: 'C++' },
    'cpp': { component: <Code2 size={20} className="text-[#00599c]" />, color: 'from-blue-400 to-blue-600', label: 'C++' },
    'csharp': { component: <Code2 size={20} className="text-[#239120]" />, color: 'from-green-500 to-green-700', label: 'C#' },
    'c#': { component: <Code2 size={20} className="text-[#239120]" />, color: 'from-green-500 to-green-700', label: 'C#' },
    'php': { component: <Terminal size={20} className="text-[#777bb4]" />, color: 'from-purple-400 to-purple-600', label: 'PHP' },
    'go': { component: <Zap size={20} className="text-[#00add8]" />, color: 'from-cyan-400 to-cyan-600', label: 'Go' },
    'golang': { component: <Zap size={20} className="text-[#00add8]" />, color: 'from-cyan-400 to-cyan-600', label: 'Go' },
    'rust': { component: <Terminal size={20} className="text-[#ce422b]" />, color: 'from-orange-400 to-red-600', label: 'Rust' },
    'ruby': { component: <Gem size={20} className="text-[#cc342d]" />, color: 'from-red-400 to-red-600', label: 'Ruby' },
    'kotlin': { component: <Code2 size={20} className="text-[#7f52ff]" />, color: 'from-purple-400 to-purple-600', label: 'Kotlin' },
    'swift': { component: <Code2 size={20} className="text-[#fa7343]" />, color: 'from-orange-400 to-orange-600', label: 'Swift' },
    'perl': { component: <Terminal size={20} className="text-[#0073a7]" />, color: 'from-blue-400 to-blue-600', label: 'Perl' },
    'scala': { component: <Code2 size={20} className="text-[#dc322f]" />, color: 'from-red-400 to-red-600', label: 'Scala' },
    'elixir': { component: <Terminal size={20} className="text-[#6e4494]" />, color: 'from-purple-400 to-purple-600', label: 'Elixir' },
    
    // Frameworks & Libraries
    'express': { component: <Server size={20} className="text-gray-700 dark:text-white" />, color: 'from-gray-600 to-gray-800', label: 'Express' },
    'expressjs': { component: <Server size={20} className="text-gray-700 dark:text-white" />, color: 'from-gray-600 to-gray-800', label: 'Express' },
    'django': { component: <Server size={20} className="text-[#0c3c26]" />, color: 'from-green-700 to-green-900', label: 'Django' },
    'flask': { component: <Package size={20} className="text-gray-600" />, color: 'from-gray-500 to-gray-700', label: 'Flask' },
    'fastapi': { component: <Zap size={20} className="text-[#009688]" />, color: 'from-teal-400 to-teal-600', label: 'FastAPI' },
    'spring': { component: <Leaf size={20} className="text-[#6db33f]" />, color: 'from-green-400 to-green-600', label: 'Spring' },
    'springboot': { component: <Leaf size={20} className="text-[#6db33f]" />, color: 'from-green-400 to-green-600', label: 'Spring Boot' },
    'laravel': { component: <Server size={20} className="text-[#ff2d20]" />, color: 'from-red-400 to-red-600', label: 'Laravel' },
    'rails': { component: <Server size={20} className="text-[#cc0000]" />, color: 'from-red-400 to-red-600', label: 'Rails' },
    'node.js': { component: <Package size={20} className="text-[#68a063]" />, color: 'from-green-400 to-green-600', label: 'Node.js' },
    'nodejs': { component: <Package size={20} className="text-[#68a063]" />, color: 'from-green-400 to-green-600', label: 'Node.js' },
    '.net': { component: <Code2 size={20} className="text-[#512bd4]" />, color: 'from-purple-500 to-purple-700', label: '.NET' },
    'dotnet': { component: <Code2 size={20} className="text-[#512bd4]" />, color: 'from-purple-500 to-purple-700', label: '.NET' },
    
    // Databases
    'mongodb': { component: <Database size={20} className="text-[#13aa52]" />, color: 'from-green-400 to-green-600', label: 'MongoDB' },
    'postgresql': { component: <Database size={20} className="text-[#336791]" />, color: 'from-blue-500 to-blue-700', label: 'PostgreSQL' },
    'postgres': { component: <Database size={20} className="text-[#336791]" />, color: 'from-blue-500 to-blue-700', label: 'PostgreSQL' },
    'mysql': { component: <Database size={20} className="text-[#00758f]" />, color: 'from-cyan-400 to-cyan-600', label: 'MySQL' },
    'firebase': { component: <Database size={20} className="text-[#ffa000]" />, color: 'from-yellow-400 to-orange-600', label: 'Firebase' },
    'redis': { component: <Database size={20} className="text-[#dc382d]" />, color: 'from-red-400 to-red-600', label: 'Redis' },
    'elasticsearch': { component: <Database size={20} className="text-[#005571]" />, color: 'from-blue-500 to-blue-700', label: 'Elasticsearch' },
    'dynamodb': { component: <Database size={20} className="text-[#ff9900]" />, color: 'from-orange-400 to-orange-600', label: 'DynamoDB' },
    'sqlite': { component: <Database size={20} className="text-[#003b57]" />, color: 'from-blue-500 to-blue-700', label: 'SQLite' },
    
    // DevOps & Cloud
    'docker': { component: <Container size={20} className="text-[#2496ed]" />, color: 'from-blue-400 to-blue-600', label: 'Docker' },
    'kubernetes': { component: <Boxes size={20} className="text-[#326ce5]" />, color: 'from-blue-400 to-blue-600', label: 'Kubernetes' },
    'k8s': { component: <Boxes size={20} className="text-[#326ce5]" />, color: 'from-blue-400 to-blue-600', label: 'Kubernetes' },
    'aws': { component: <Cloud size={20} className="text-[#ff9900]" />, color: 'from-orange-400 to-orange-600', label: 'AWS' },
    'azure': { component: <Cloud size={20} className="text-[#0078d4]" />, color: 'from-blue-400 to-blue-600', label: 'Azure' },
    'gcp': { component: <Cloud size={20} className="text-[#4285f4]" />, color: 'from-blue-400 to-blue-600', label: 'GCP' },
    'google cloud': { component: <Cloud size={20} className="text-[#4285f4]" />, color: 'from-blue-400 to-blue-600', label: 'Google Cloud' },
    'heroku': { component: <Cloud size={20} className="text-[#430098]" />, color: 'from-purple-500 to-purple-700', label: 'Heroku' },
    'vercel': { component: <Cloud size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'Vercel' },
    'netlify': { component: <Cloud size={20} className="text-[#00ad9f]" />, color: 'from-teal-400 to-teal-600', label: 'Netlify' },
    'jenkins': { component: <Workflow size={20} className="text-[#d33835]" />, color: 'from-red-400 to-red-600', label: 'Jenkins' },
    'github actions': { component: <Workflow size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'GitHub Actions' },
    'gitlab ci': { component: <Workflow size={20} className="text-[#fc6d26]" />, color: 'from-orange-400 to-orange-600', label: 'GitLab CI' },
    'circleci': { component: <Workflow size={20} className="text-[#343434]" />, color: 'from-gray-700 to-black', label: 'CircleCI' },
    
    // Mobile
    'react native': { component: <Smartphone size={20} className="text-[#61dafb]" />, color: 'from-blue-400 to-cyan-400', label: 'React Native' },
    'flutter': { component: <Smartphone size={20} className="text-[#02569b]" />, color: 'from-blue-400 to-blue-600', label: 'Flutter' },
    'ionic': { component: <Smartphone size={20} className="text-[#3880ff]" />, color: 'from-blue-400 to-blue-600', label: 'Ionic' },
    'android': { component: <Smartphone size={20} className="text-[#3ddc84]" />, color: 'from-green-400 to-green-600', label: 'Android' },
    'ios': { component: <Smartphone size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'iOS' },
    'xamarin': { component: <Smartphone size={20} className="text-[#3498db]" />, color: 'from-blue-400 to-blue-600', label: 'Xamarin' },
    
    // Testing
    'jest': { component: <Bug size={20} className="text-[#c1282a]" />, color: 'from-red-400 to-red-600', label: 'Jest' },
    'cypress': { component: <Bug size={20} className="text-[#69d3a5]" />, color: 'from-green-400 to-green-600', label: 'Cypress' },
    'selenium': { component: <Bug size={20} className="text-[#green]" />, color: 'from-green-400 to-green-600', label: 'Selenium' },
    'pytest': { component: <Bug size={20} className="text-[#3776ab]" />, color: 'from-blue-400 to-blue-600', label: 'PyTest' },
    'mocha': { component: <Bug size={20} className="text-[#8d4004]" />, color: 'from-yellow-700 to-orange-700', label: 'Mocha' },
    'junit': { component: <Bug size={20} className="text-[#25a95f]" />, color: 'from-green-400 to-green-600', label: 'JUnit' },
    
    // Tools & Utilities
    'git': { component: <GitBranch size={20} className="text-[#f1502f]" />, color: 'from-orange-400 to-red-600', label: 'Git' },
    'github': { component: <GitBranch size={20} className="text-gray-800 dark:text-white" />, color: 'from-gray-700 to-black', label: 'GitHub' },
    'gitlab': { component: <GitBranch size={20} className="text-[#fc6d26]" />, color: 'from-orange-400 to-orange-600', label: 'GitLab' },
    'webpack': { component: <Wrench size={20} className="text-[#1c78c0]" />, color: 'from-blue-400 to-blue-600', label: 'Webpack' },
    'vite': { component: <Zap size={20} className="text-[#646cff]" />, color: 'from-purple-400 to-purple-600', label: 'Vite' },
    'npm': { component: <Package size={20} className="text-[#cb3837]" />, color: 'from-red-400 to-red-600', label: 'npm' },
    'yarn': { component: <Package size={20} className="text-[#2c8ebb]" />, color: 'from-blue-400 to-blue-600', label: 'Yarn' },
    'pnpm': { component: <Package size={20} className="text-[#f69220]" />, color: 'from-orange-400 to-orange-600', label: 'pnpm' },
    'graphql': { component: <Zap size={20} className="text-[#e10098]" />, color: 'from-pink-400 to-pink-600', label: 'GraphQL' },
    'rest': { component: <Code2 size={20} className="text-[#009688]" />, color: 'from-teal-400 to-teal-600', label: 'REST' },
    'api': { component: <Zap size={20} className="text-[#ffb347]" />, color: 'from-yellow-400 to-orange-600', label: 'API' },
    'terminal': { component: <Terminal size={20} className="text-green-500" />, color: 'from-green-400 to-green-600', label: 'Terminal' },
  };
  
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName].component;
  }
  
  // Partial matching
  for (const [key, value] of Object.entries(iconMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value.component;
    }
  }
  
  // Default icon
  return <Wrench size={20} className="text-gray-500" />;
};

export default function DashAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    hero: { name: '', specialty: '', bio: '' },
    about: { title: '', bio: '', imageUrl: '', ventures: [] },
    techStack: [],
    contact: { email: '', whatsapp: '', linkedin: '', github: '' },
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTech, setNewTech] = useState('');
  const [newTechCategory, setNewTechCategory] = useState<'Web' | 'Mobile' | 'Backend' | 'Cloud'>('Web');
  const [newVenture, setNewVenture] = useState<Venture>({ title: '', role: '', description: '' });
  const [techSuggestions, setTechSuggestions] = useState<string[]>([]);
  const [showTechSuggestions, setShowTechSuggestions] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedSaveRef = useRef<NodeJS.Timeout | null>(null);

  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const profileImageUploadRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    setAuthenticated(isAuth);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadPortfolioData();
      loadProjects();
    }
  }, [authenticated]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (debouncedSaveRef.current) clearTimeout(debouncedSaveRef.current);
    };
  }, []);

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const result = await response.json();
      if (result.success) setPortfolioData(result.data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) setProjects(result.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const savePortfolioData = async (data: PortfolioData) => {
    setSaveStatus('saving');
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || 'dev-token';
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      
      // Parse response
      let result;
      try {
        result = await response.json();
      } catch (parseErr) {
        setSaveStatus('error');
        setSaveMessage(`✗ Server error (invalid response)`);
        console.error('Response Parse Error:', response.status, response.statusText);
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
          setSaveMessage('');
        }, 4000);
        return;
      }
      
      // Handle non-OK response
      if (!response.ok) {
        setSaveStatus('error');
        const errorMsg = result?.error || `HTTP ${response.status}`;
        setSaveMessage(`✗ ${errorMsg}`);
        console.error('HTTP Error:', response.status, result);
        
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
          setSaveMessage('');
        }, 4000);
        return;
      }
      
      // Handle API error response
      if (!result.success) {
        setSaveStatus('error');
        const errorMsg = result.error || 'Failed to save';
        setSaveMessage(`✗ ${errorMsg}`);
        console.error('Save error:', result.error, result);
        
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
          setSaveMessage('');
        }, 4000);
        return;
      }
      
      // Success!
      setPortfolioData(result.data);
      setSaveStatus('success');
      setSaveMessage('✓ Saved successfully');
      
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
        setSaveMessage('');
      }, 2000);
    } catch (error: any) {
      setSaveStatus('error');
      const errorMsg = error?.message || 'Connection error';
      setSaveMessage(`✗ ${errorMsg}`);
      console.error('Error saving portfolio:', error);
      
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
        setSaveMessage('');
      }, 4000);
    }
  };

  const debouncedSave = (data: PortfolioData) => {
    if (debouncedSaveRef.current) clearTimeout(debouncedSaveRef.current);
    debouncedSaveRef.current = setTimeout(() => {
      savePortfolioData(data);
    }, 800); // Wait 800ms before saving
  };

  const updateHero = (key: string, value: string) => {
    const newData = { ...portfolioData, hero: { ...portfolioData.hero, [key]: value } };
    setPortfolioData(newData);
    debouncedSave(newData);
  };

  const updateAbout = (key: string, value: string | Venture[]) => {
    const newData = { ...portfolioData, about: { ...portfolioData.about, [key]: value } };
    setPortfolioData(newData);
    debouncedSave(newData);
  };

  const updateContact = (key: string, value: string) => {
    const newData = { ...portfolioData, contact: { ...portfolioData.contact, [key]: value } };
    setPortfolioData(newData);
    debouncedSave(newData);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newData = { ...portfolioData, about: { ...portfolioData.about, imageUrl: base64 } };
      setPortfolioData(newData);
      savePortfolioData(newData); // Immediate save for images
    };
    reader.readAsDataURL(file);
  };

  const handleAddVenture = () => {
    if (newVenture.title && newVenture.role && newVenture.description) {
      const updatedVentures = [...portfolioData.about.ventures, newVenture];
      updateAbout('ventures', updatedVentures);
      setNewVenture({ title: '', role: '', description: '' });
    }
  };

  const handleUpdateVenture = (index: number, key: string, value: string) => {
    const updatedVentures = [...portfolioData.about.ventures];
    updatedVentures[index] = { ...updatedVentures[index], [key]: value };
    updateAbout('ventures', updatedVentures);
  };

  const handleDeleteVenture = (index: number) => {
    const updatedVentures = portfolioData.about.ventures.filter((_, i) => i !== index);
    updateAbout('ventures', updatedVentures);
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      const newData = { ...portfolioData, techStack: [...portfolioData.techStack, { name: newTech, category: newTechCategory }] };
      setPortfolioData(newData);
      savePortfolioData(newData); // Immediate save for tech stack
      setNewTech('');
      setShowTechSuggestions(false);
    }
  };

  const handleTechInputChange = (value: string) => {
    setNewTech(value);
    
    if (value.trim().length === 0) {
      setShowTechSuggestions(false);
      return;
    }

    const normalizedInput = value.toLowerCase();
    const allTechs = [
      'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt',
      'TypeScript', 'JavaScript', 'JSX', 'TSX', 'HTML', 'CSS', 'Sass', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
      'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring', 'PHP', 'Laravel', 'Go', 'Rust', 'Ruby', 'Rails', 'C#', '.NET', 'Kotlin', 'Swift', 'C', 'C++', 'Perl', 'Scala', 'Elixir', 'Haskell',
      'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra', 'SQLite', 'Oracle',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Heroku', 'Vercel', 'Netlify', 'Jenkins', 'GitHub Actions', 'CircleCI', 'Travis CI',
      'React Native', 'Flutter', 'Ionic', 'Android', 'iOS', 'Xamarin',
      'Jest', 'Mocha', 'Cypress', 'Selenium', 'PyTest', 'JUnit', 'TestNG', 'RSpec',
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Webpack', 'Vite', 'Rollup', 'Parcel', 'Babel', 'ESLint', 'Prettier', 'Gulp', 'Grunt',
      'GraphQL', 'REST', 'API', 'Microservices', 'Serverless', 'Lambda', 'gRPC', 'WebSocket',
      'Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas',
      'Webpack', 'TypeScript Compiler', 'Gradle', 'Maven', 'npm', 'yarn', 'pnpm', 'pip', 'poetry',
    ];

    const filtered = allTechs.filter(tech => 
      tech.toLowerCase().includes(normalizedInput) || 
      normalizedInput.includes(tech.toLowerCase())
    );

    setTechSuggestions(filtered.slice(0, 8)); // Show max 8 suggestions
    setShowTechSuggestions(filtered.length > 0);
  };

  const handleSelectTechSuggestion = (tech: string) => {
    setNewTech(tech);
    setShowTechSuggestions(false);
  };

  const handleRemoveTech = (index: number) => {
    const newData = { ...portfolioData, techStack: portfolioData.techStack.filter((_, i) => i !== index) };
    setPortfolioData(newData);
    savePortfolioData(newData); // Immediate save for tech stack
  };

  const handleSaveProject = async (project: Project) => {
    if (!project.name || !project.description || !project.image) {
      alert('Please fill all required fields');
      return;
    }
    try {
      const token = localStorage.getItem('admin_token') || 'dev-token';
      const url = editingProject?._id ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = editingProject?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(project),
      });

      const result = await response.json();
      if (result.success) {
        if (editingProject?._id) {
          setProjects(projects.map((p) => (p._id === editingProject._id ? result.data : p)));
        } else {
          setProjects([result.data, ...projects]);
        }
        setShowProjectModal(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('admin_token') || 'dev-token';
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setProjects(projects.filter((p) => p._id !== projectId));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!authenticated) return <AdminLogin />;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute top-32 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(214, 88, 248, 0.15), transparent 70%)"
          }}
          animate={{
            y: [0, 40, 0],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15), transparent 70%)"
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <main className="flex-1 container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 max-w-7xl relative z-10">
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-2 md:mb-3 font-headline">Portfolio Manager</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-sm md:text-base text-muted-foreground flex items-center gap-2">
              {saveStatus === 'saving' ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="inline-block">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </motion.div>
                  <span className="text-green-500">{saveMessage}</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span className="text-red-500">{saveMessage}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <span>All changes saved</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-white/5 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 bg-card/30 border border-white/5 p-2.5 md:p-4 rounded-2xl mb-8 md:mb-10 h-auto">
              {['Hero', 'About', 'Projects', 'Tech', 'Contact'].map((tab, i) => (
                <motion.div 
                  key={tab}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TabsTrigger 
                    value={tab.toLowerCase()} 
                    className="w-full text-xs sm:text-sm md:text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 hover:bg-card/50 transition-all rounded-xl py-3 md:py-4 px-2 md:px-4"
                  >
                    {tab}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            <TabsContent value="hero" className="space-y-5 sm:space-y-6 md:space-y-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <InputField label="Full Name" value={portfolioData.hero.name} onChange={(e) => updateHero('name', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <InputField label="Specialty" value={portfolioData.hero.specialty} onChange={(e) => updateHero('specialty', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <TextareaField label="Bio" value={portfolioData.hero.bio} onChange={(e) => updateHero('bio', e.target.value)} />
              </motion.div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6 sm:space-y-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <InputField label="About Title" value={portfolioData.about.title} onChange={(e) => updateAbout('title', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <TextareaField label="About Bio" value={portfolioData.about.bio} onChange={(e) => updateAbout('bio', e.target.value)} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className="block text-sm font-semibold text-foreground mb-4">Profile Image</label>
                <input type="file" ref={profileImageUploadRef} onChange={handleProfileImageUpload} accept="image/*" className="hidden" />
                <Button 
                  onClick={() => profileImageUploadRef.current?.click()} 
                  className="bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-sm sm:text-base py-2.5"
                >
                  <UploadIcon className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                {portfolioData.about.imageUrl && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg hover:scale-105 transition-transform"
                  >
                    <img src={portfolioData.about.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
                className="border-t border-white/5 pt-8"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gradient mb-6 md:mb-8">Featured Ventures</h3>
                <div className="space-y-4">
                  {portfolioData.about.ventures.map((venture, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass p-5 md:p-6 rounded-2xl border-white/5 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-foreground text-base md:text-lg">Venture {index + 1}</h4>
                        <Button 
                          onClick={() => handleDeleteVenture(index)} 
                          size="sm" 
                          variant="destructive" 
                          className="rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <Input 
                          value={venture.title} 
                          onChange={(e) => handleUpdateVenture(index, 'title', e.target.value)} 
                          placeholder="Title" 
                          className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                        />
                        <Input 
                          value={venture.role} 
                          onChange={(e) => handleUpdateVenture(index, 'role', e.target.value)} 
                          placeholder="Role" 
                          className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                        />
                        <Textarea 
                          value={venture.description} 
                          onChange={(e) => handleUpdateVenture(index, 'description', e.target.value)} 
                          placeholder="Description" 
                          rows={3} 
                          className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-5 md:p-6 rounded-2xl bg-card/30 border-2 border-dashed border-white/10 hover:border-primary/30 transition-colors space-y-3"
                >
                  <h4 className="font-semibold text-foreground text-base md:text-lg">Add Venture</h4>
                  <Input 
                    value={newVenture.title} 
                    onChange={(e) => setNewVenture({ ...newVenture, title: e.target.value })} 
                    placeholder="Title" 
                    className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                  />
                  <Input 
                    value={newVenture.role} 
                    onChange={(e) => setNewVenture({ ...newVenture, role: e.target.value })} 
                    placeholder="Role" 
                    className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                  />
                  <Textarea 
                    value={newVenture.description} 
                    onChange={(e) => setNewVenture({ ...newVenture, description: e.target.value })} 
                    placeholder="Description" 
                    rows={3} 
                    className="bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                  />
                  <Button 
                    onClick={handleAddVenture} 
                    className="bg-gradient-to-r from-primary to-accent text-white rounded-lg w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-sm md:text-base font-semibold"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Venture
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-5 sm:space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Button 
                  onClick={() => { setEditingProject(null); setShowProjectModal(true); }} 
                  className="bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-sm md:text-base py-2.5"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </motion.div>
              {projects.length > 0 ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl overflow-hidden glass border-white/5">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent"><TableHead className="text-muted-foreground text-xs md:text-sm font-semibold">Name</TableHead><TableHead className="text-muted-foreground text-xs md:text-sm font-semibold hidden md:table-cell">Tech</TableHead><TableHead className="text-muted-foreground text-xs md:text-sm font-semibold">Actions</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((p, idx) => (
                        <motion.tr 
                          key={p._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-white/5 hover:bg-card/30 transition-colors"
                        >
                          <TableCell className="text-foreground text-xs md:text-sm font-medium truncate">{p.name}</TableCell>
                          <TableCell className="text-muted-foreground text-xs md:text-sm hidden md:table-cell">{p.tech.slice(0, 2).join(', ')}</TableCell>
                          <TableCell className="space-x-1 sm:space-x-2">
                            <Button 
                              onClick={() => { setEditingProject(p); setShowProjectModal(true); }} 
                              size="sm" 
                              className="bg-card/50 border border-white/10 hover:bg-card/80 text-foreground rounded-lg text-xs py-1.5"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleDeleteProject(p._id!)} 
                              size="sm" 
                              variant="destructive" 
                              className="rounded-lg text-xs py-1.5"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              ) : (
                <div className="text-center py-16 text-muted-foreground text-sm">No projects yet</div>
              )}

              <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
                <DialogContent className="glass border-white/5 text-foreground rounded-2xl max-h-[90vh] overflow-y-auto w-full md:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg md:text-xl font-bold text-gradient">{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
                  </DialogHeader>
                  <ProjectForm project={editingProject || { name: '', description: '', tech: [], image: '' }} onSave={handleSaveProject} imageUploadRef={imageUploadRef} />
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="tech" className="space-y-5 sm:space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="p-4 md:p-5 rounded-2xl bg-card/30 border-2 border-dashed border-white/10 hover:border-primary/30 transition-colors flex flex-col sm:flex-row gap-2 sm:gap-3 relative"
              >
                <div className="flex-1 relative">
                  <Input 
                    value={newTech} 
                    onChange={(e) => handleTechInputChange(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTech()} 
                    onFocus={() => newTech.trim().length > 0 && setShowTechSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowTechSuggestions(false), 200)}
                    placeholder="Tech name (e.g., React, Python, Docker...)" 
                    className="w-full bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary"
                  />
                  
                  {/* Autocomplete Suggestions */}
                  {showTechSuggestions && techSuggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-white/10 rounded-lg shadow-lg overflow-hidden"
                    >
                      {techSuggestions.map((tech, idx) => (
                        <motion.button
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleSelectTechSuggestion(tech)}
                          className="w-full text-left px-4 py-3 hover:bg-card/80 transition-colors flex items-center gap-2 border-b border-white/5 last:border-b-0 group"
                        >
                          <div className="flex-shrink-0">{getTechIcon(tech)}</div>
                          <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">{tech}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <Select value={newTechCategory} onValueChange={(val: any) => setNewTechCategory(val)}>
                  <SelectTrigger className="sm:w-44 bg-card/50 border-white/10 hover:border-white/20 text-foreground rounded-lg text-sm focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10 text-foreground"><div className="p-1">{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</div></SelectContent>
                </Select>
                <Button 
                  onClick={handleAddTech} 
                  className="bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-sm md:text-base py-2.5"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </motion.div>

              {portfolioData.techStack.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <h3 className="font-bold text-lg md:text-xl text-gradient mb-5">Technologies</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {CATEGORIES.map((cat) => (
                      <motion.div 
                        key={cat}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">{cat}</h4>
                        <div className="space-y-2">
                          {portfolioData.techStack.filter((t) => t.category === cat).map((t, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-lg glass border-white/5 hover:border-primary/30 group transition-all"
                            >
                              <span className="text-foreground text-sm font-medium">{getTechIcon(t.name)} {t.name}</span>
                              <Button 
                                onClick={() => handleRemoveTech(portfolioData.techStack.indexOf(t))} 
                                size="sm" 
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 text-destructive transition-all rounded-lg"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="contact" className="space-y-5 sm:space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <InputField label="Email" type="email" value={portfolioData.contact.email} onChange={(e) => updateContact('email', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <InputField label="WhatsApp" value={portfolioData.contact.whatsapp} onChange={(e) => updateContact('whatsapp', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <InputField label="LinkedIn" value={portfolioData.contact.linkedin} onChange={(e) => updateContact('linkedin', e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <InputField label="GitHub" value={portfolioData.contact.github} onChange={(e) => updateContact('github', e.target.value)} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

function InputField({ label, type = 'text', value, onChange }: { label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
      <label className="block text-sm font-semibold text-foreground mb-3">{label}</label>
      <Input 
        type={type} 
        value={value} 
        onChange={onChange} 
        className="w-full bg-card/50 border-white/10 hover:border-white/20 text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
      />
    </motion.div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
      <label className="block text-sm font-semibold text-foreground mb-3">{label}</label>
      <Textarea 
        value={value} 
        onChange={onChange} 
        rows={5} 
        className="w-full bg-card/50 border-white/10 hover:border-white/20 text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
      />
    </motion.div>
  );
}

function ProjectForm({ project, onSave, imageUploadRef }: { project: Project; onSave: (p: Project) => void; imageUploadRef: React.RefObject<HTMLInputElement | null> }) {
  const [formData, setFormData] = useState<Project>(project);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5 md:space-y-6 mt-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <InputField label="Project Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <TextareaField label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <InputField label="Technologies" value={formData.tech?.join(', ') || ''} onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map((t) => t.trim()) })} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <InputField label="Demo URL" value={formData.demo || ''} onChange={(e) => setFormData({ ...formData, demo: e.target.value })} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <InputField label="GitHub URL" value={formData.github || ''} onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <InputField label="Drive URL" value={formData.drive || ''} onChange={(e) => setFormData({ ...formData, drive: e.target.value })} />
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <label className="block text-sm font-semibold text-foreground mb-3">Image</label>
        <input type="file" ref={imageUploadRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
        <Button 
          onClick={() => imageUploadRef.current?.click()} 
          className="glass border-white/10 hover:border-white/20 text-foreground hover:bg-card/50 rounded-lg w-full transition-all text-sm md:text-base py-2.5"
        >
          <UploadIcon className="mr-2 h-4 w-4" /> {formData.image ? 'Change' : 'Upload'} Image
        </Button>
        {formData.image && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/30"
          >
            <img src={formData.image} alt="Project" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <Button 
          onClick={() => onSave(formData)} 
          className="bg-gradient-to-r from-primary to-accent text-white rounded-lg w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all font-semibold text-sm md:text-base py-2.5"
        >
          Save Project
        </Button>
      </motion.div>
    </div>
  );
}
