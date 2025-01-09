'use client';
import { motion } from 'framer-motion';

import { TimelineItem } from './TimelineItem';

interface ExperienceTimelineProps {
  experiences: any[];
}

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="px-4 py-8 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center text-3xl font-bold tracking-tight md:mb-24 md:text-5xl"
      >
        Professional Experience
      </motion.h1>
      <div className="relative mx-auto">
        <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform bg-base-300/20 md:block" />
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.slug || index}
            experience={experience}
            isLast={index === experiences.length - 1}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
