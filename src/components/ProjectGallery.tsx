"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Screenshot } from '@/lib/project-store';

interface ProjectGalleryProps {
  screenshots: Screenshot[];
  projectName: string;
}

export function ProjectGallery({ screenshots, projectName }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!screenshots || screenshots.length === 0) return null;

  const currentImage = screenshots[selectedIndex];
  const hasMultiple = screenshots.length > 1;

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <>
      {/* Thumbnail Gallery */}
      <div className="space-y-2 sm:space-y-3">
        <div 
          className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <img 
            src={currentImage.image} 
            alt={currentImage.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {hasMultiple && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                اضغط للتوسيع
              </div>
            </div>
          )}
          {hasMultiple && (
            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 sm:py-1 rounded text-white text-[10px] sm:text-xs font-semibold">
              {selectedIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="text-[10px] sm:text-xs text-muted-foreground/80 line-clamp-2">
            • {currentImage.caption}
          </p>
        )}

        {/* Thumbnail Navigation */}
        {hasMultiple && (
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
            {screenshots.map((screenshot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden transition-all ${
                  idx === selectedIndex 
                    ? 'ring-2 ring-primary opacity-100' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={screenshot.image} 
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            autoFocus
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-10"
              >
                <X size={32} />
              </button>

              {/* Main Image */}
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedIndex}
                    src={currentImage.image}
                    alt={currentImage.caption}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {hasMultiple && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Image Info */}
              <div className="text-white text-center mt-4 space-y-2">
                {currentImage.caption && (
                  <p className="text-sm">{currentImage.caption}</p>
                )}
                {hasMultiple && (
                  <p className="text-xs text-muted-foreground">
                    {selectedIndex + 1} من {screenshots.length}
                  </p>
                )}
              </div>

              {/* Thumbnail Strip */}
              {hasMultiple && (
                <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2">
                  {screenshots.map((screenshot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all ${
                        idx === selectedIndex 
                          ? 'ring-2 ring-primary opacity-100' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={screenshot.image} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
