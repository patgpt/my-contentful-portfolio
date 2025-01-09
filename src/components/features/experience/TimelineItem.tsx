import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaGlobe, FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';

import { CtfRichText } from '@src/components/features/contentful';
import { formatDate } from '@src/utils/date';

interface TimelineItemProps {
  experience: any;
  isLast: boolean;
  index: number;
  key: number;
}

const ExperienceCard = ({ experience, isExpanded, setIsExpanded, isEven }: any) => (
  <motion.div
    className="w-full rounded-box bg-base-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:w-[400px]"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
  >
    {/* Experience header with logo */}
    <div className="flex items-start gap-4">
      {experience?.companyLogo?.url && (
        <div className="relative h-[60px] w-[60px] flex-shrink-0">
          <Image
            src={experience.companyLogo.url}
            alt={experience.companyName || ''}
            fill
            className="rounded-lg object-contain"
          />
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-xl font-bold transition-colors group-hover:text-primary">
          {experience?.positionTitle}
        </h2>
        <h3 className="text-lg text-base-content/80">{experience?.companyName}</h3>
        <div className="text-sm text-base-content/60 md:hidden">
          {formatDate(experience?.startDate)} -{' '}
          {experience?.endDate ? formatDate(experience?.endDate) : 'Present'}
        </div>
      </div>
    </div>

    {/* Description with animation */}
    <motion.div
      className="relative"
      animate={{ height: isExpanded ? 'auto' : '120px' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`prose mt-4 text-base-content/80 ${!isExpanded && 'line-clamp-3'}`}>
        <CtfRichText json={experience?.jobDescription?.json} />
      </div>
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-base-100 to-transparent" />
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-sm font-medium text-primary hover:underline"
      >
        {isExpanded ? '← Show less' : 'Read more →'}
      </button>
    </motion.div>

    {/* Skills tags */}
    <motion.div className="mt-4 flex flex-wrap gap-2" layout>
      {experience?.skillsUsed?.map((skill: string) => (
        <motion.span
          key={skill}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="badge badge-primary badge-outline whitespace-nowrap"
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>

    {/* Action buttons */}
    <div className="mt-4 flex items-center justify-between gap-4 border-t border-base-200 pt-4">
      {experience?.website && (
        <Link
          href={experience?.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm gap-2 transition-all hover:gap-3"
        >
          <FaGlobe /> Website
        </Link>
      )}
      <Link
        href={`/experience/${experience?.slug}`}
        className="btn btn-primary btn-sm gap-2 transition-all hover:gap-3"
      >
        Details <span className="text-lg">→</span>
      </Link>
    </div>
  </motion.div>
);

const getTimelineIcon = (type = 'work') => {
  switch (type) {
    case 'education':
      return FaGraduationCap;
    case 'award':
      return FaAward;
    default:
      return FaBriefcase;
  }
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
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Timeline connector - hidden on mobile */}
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

      {/* Mobile date label */}
      <div className="mb-4 text-center md:hidden">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-full bg-base-200 px-4 py-1 text-sm text-base-content/70"
        >
          {formatDate(experience?.startDate)} -{' '}
          {experience?.endDate ? formatDate(experience?.endDate) : 'Present'}
        </motion.span>
      </div>

      {/* Left side content */}
      <div className={`col-span-1 md:${!isEven && 'opacity-0'}`}>
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-end gap-4"
          >
            <ExperienceCard {...{ experience, isExpanded, setIsExpanded, isEven }} />
          </motion.div>
        ) : (
          <div className="hidden items-center justify-end md:flex">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-full bg-base-200 px-4 py-1 text-sm text-base-content/70"
            >
              {formatDate(experience?.startDate)}
            </motion.span>
          </div>
        )}
      </div>

      {/* Timeline dot - centered on mobile */}
      <div className="relative z-10 hidden md:block">
        <motion.div
          className="to-primary-focus flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-6 w-6 text-primary-content" />
        </motion.div>
      </div>

      {/* Right side content */}
      <div className={`col-span-1 md:${isEven && 'opacity-0'}`}>
        {!isEven ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-start gap-4"
          >
            <ExperienceCard {...{ experience, isExpanded, setIsExpanded, isEven }} />
          </motion.div>
        ) : (
          <div className="hidden items-center justify-start md:flex">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-full bg-base-200 px-4 py-1 text-sm text-base-content/70"
            >
              {formatDate(experience?.startDate)}
            </motion.span>
          </div>
        )}
      </div>
    </motion.li>
  );
};
