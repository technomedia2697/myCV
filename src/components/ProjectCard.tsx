
"use client"

import { motion } from 'framer-motion';
import { ExternalLink, Github, FileBox, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/project-store';
import { ProjectGallery } from './ProjectGallery';

export function ProjectCard({ project }: { project: Project }) {
  const techItems = Array.isArray(project.tech) ? project.tech : (project.tech || '').split(',');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "backOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden border-white/5 flex flex-col group h-full shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow"
    >
      <div className="relative aspect-square sm:aspect-square overflow-hidden">
        <img 
          src={project.image || 'https://picsum.photos/seed/placeholder/800/600'} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-1 bg-white text-black rounded-full hover:scale-110 transition-transform">
              <ExternalLink size={10} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1 bg-white text-black rounded-full hover:scale-110 transition-transform">
              <Github size={10} />
            </a>
          )}
          {project.drive && (
            <a href={project.drive} target="_blank" rel="noopener noreferrer" className="p-1 bg-white text-black rounded-full hover:scale-110 transition-transform">
              <FileBox size={10} />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-1.5 sm:p-2 flex flex-col flex-grow">
        <h3 className="text-xs sm:text-sm font-headline font-bold mb-0.5 line-clamp-1">{project.name}</h3>
        {project.category ? (
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-1.5 py-0.25 text-[6px] sm:text-[7px] font-semibold uppercase tracking-tight mb-0.5 w-fit">
            {project.category}
          </span>
        ) : null}
        {project.tagline && <p className="text-[7px] sm:text-[8px] text-primary mb-0.5 line-clamp-1">{project.tagline}</p>}
        <p className="text-muted-foreground text-[7px] sm:text-[8px] leading-tight mb-1 flex-grow line-clamp-1">
          {project.description}
        </p>

        {techItems.length > 0 && (
          <div className="mb-1">
            <div className="flex flex-wrap gap-0.5">
              {techItems.slice(0, 3).map((t, i) => (
                <motion.span
                  key={`${t}-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-1 py-0.25 bg-white/5 border border-white/10 rounded-full text-[6px] font-bold uppercase tracking-tight text-muted-foreground hover:border-primary/50 transition-colors whitespace-nowrap"
                >
                  {typeof t === 'string' ? t.trim() : t}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {project.screenshots?.length ? (
          <div className="mb-0.5">
            <ProjectGallery screenshots={project.screenshots} projectName={project.name} />
          </div>
        ) : null}

        {project.demo ? (
          <div className="flex items-center gap-1 pt-1 border-t border-white/5 mt-auto">
            <a 
              href={project.demo} 
              target="_blank" rel="noopener noreferrer"
              className="text-[6px] sm:text-[7px] font-bold uppercase tracking-tight text-primary flex items-center gap-0.5 hover:opacity-70 transition-opacity"
            >
              Live <ArrowRight size={8} />
            </a>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
