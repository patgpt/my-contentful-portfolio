// ExperienceTimelineHeader.tsx
'use client';
import { motion } from 'framer-motion';

export const ExperienceTimelineHeader = () => (
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-12 text-center text-3xl font-bold tracking-tight md:mb-24 md:text-5xl">
    Professional Experience
  </motion.h1>
);
