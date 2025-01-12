// TimelineItem.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAward, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

import ExperienceCard from '@src/components/features/experience/ExperienceCard';
import type { PageExperience } from '@src/lib/__generated/sdk';
import { formatDate } from '@src/utils/date';

interface TimelineItemProps {
  experience: PageExperience & { type?: string | undefined };
  isLast: boolean;
  index: number;
}

const getTimelineIcon = (type: string | undefined) => {
  const icons = {
    work: FaBriefcase,
    education: FaGraduationCap,
    award: FaAward,
  };
  return icons[type!] || FaBriefcase;
};

export const TimelineItem = ({ experience, isLast, index }: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const Icon = getTimelineIcon(experience?.type);

  return (
    <motion.li
      className="relative mb-16 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}>
      {!isLast && (
        <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform md:block">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-primary/50 to-primary"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
      <div className="mb-4 text-center md:hidden">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-full bg-base-200 px-4 py-1 text-sm text-base-content/70">
          {formatDate(experience?.startDate)} -{' '}
          {experience?.endDate ? formatDate(experience?.endDate) : 'Present'}
        </motion.span>
      </div>
      <div className={`col-span-1 md:${!isEven && 'opacity-0'}`}>
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-end gap-4">
            <ExperienceCard
              experience={experience}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              isEven={isEven}
            />
          </motion.div>
        ) : (
          <div className="hidden items-center justify-end md:flex">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-full bg-base-200 px-4 py-1 text-2xl text-base-content/70">
              {formatDate(experience?.startDate)}
            </motion.span>
          </div>
        )}
      </div>
      <div className="relative z-10 hidden md:block">
        <motion.div
          className="to-primary-focus flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <Icon className="h-6 w-6 text-primary-content" />
        </motion.div>
      </div>
      <div className={`col-span-1 md:${isEven && 'opacity-0'}`}>
        {!isEven ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-start gap-4">
            <ExperienceCard
              experience={experience}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              isEven={isEven}
            />
          </motion.div>
        ) : (
          <div className="hidden items-center justify-start md:flex">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-full bg-base-200 px-4 py-1 text-2xl text-base-content/70">
              {formatDate(experience?.startDate)}
            </motion.span>
          </div>
        )}
      </div>
    </motion.li>
  );
};
