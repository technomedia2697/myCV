
"use client"

import initialData from '@/data/projects.json';

export interface Screenshot {
  image: string;
  caption: string;
  captionEn?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  descriptionEn?: string;
  tech: string[] | string;
  image: string;
  demo?: string;
  github?: string;
  drive?: string;
  category?: string;
  status?: string;
  screenshots?: Screenshot[];
}

const STORAGE_KEY = 'apex_portfolio_projects';
const VERSION_KEY = 'apex_portfolio_projects_version';
const MODIFIED_FLAG_KEY = 'apex_portfolio_projects_local_modified';

const getCurrentSourceVersion = () => {
  try {
    return JSON.stringify(initialData.projects);
  } catch {
    return String(initialData.projects.length);
  }
};

const markAsModified = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MODIFIED_FLAG_KEY, 'true');
};

const isLocallyModified = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MODIFIED_FLAG_KEY) === 'true';
};

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return initialData.projects;

  const currentVersion = getCurrentSourceVersion();
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored || !storedVersion) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.projects));
    localStorage.setItem(VERSION_KEY, currentVersion);
    localStorage.removeItem(MODIFIED_FLAG_KEY);
    return initialData.projects;
  }

  if (storedVersion !== currentVersion) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.projects));
    localStorage.setItem(VERSION_KEY, currentVersion);
    localStorage.removeItem(MODIFIED_FLAG_KEY);
    return initialData.projects;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.projects));
    localStorage.setItem(VERSION_KEY, currentVersion);
    localStorage.removeItem(MODIFIED_FLAG_KEY);
    return initialData.projects;
  }
};

export const saveProjects = (projects: Project[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  markAsModified();
};

export const addProject = (project: Omit<Project, 'id'>) => {
  const projects = getProjects();
  const newProject = { ...project, id: Date.now().toString() };
  const updated = [...projects, newProject];
  saveProjects(updated);
  return newProject;
};

export const deleteProject = (id: string) => {
  const projects = getProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
};

export const updateProject = (project: Project) => {
  const projects = getProjects();
  const updated = projects.map(p => p.id === project.id ? project : p);
  saveProjects(updated);
};
