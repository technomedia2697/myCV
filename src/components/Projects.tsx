
"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjects, Project } from '@/lib/project-store';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = getProjects();
        setProjects(data);
      } catch (error) {
        console.warn('Failed loading offline projects', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const visibleProjects = projects;

  return (
    <section id="projects" className="relative py-12 sm:py-16 scroll-mt-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute top-1/3 -left-64 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(214, 88, 248, 0.25), transparent 70%)"
        }}
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -bottom-40 right-0 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2), transparent 70%)"
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-3"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold mb-1.5 sm:mb-2 tracking-tight">
              Selected <span className="text-gradient">Creations</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-xs sm:text-sm">
              A collection of digital experiences built across web and mobile platforms.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[180px] sm:h-[220px] rounded-lg" />
            ))}
          </div>
        ) : visibleProjects && visibleProjects.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm sm:text-base">No projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
