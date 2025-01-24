/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */
'use client';
import type { PageExperience } from '@/lib/__generated/sdk';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CardSection from '@/components/features/experience/CardSection';
import { FaBriefcase } from 'react-icons/fa6';
import TimeDisplay from '@/components/features/experience/TimeDisplay';

interface ITimeLineItemProps {
  experience: PageExperience;
  isLast: boolean;
  index: number;
}

const TimelineItem = ({ experience, isLast, index }: ITimeLineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.li
      className="relative mb-16 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}>
      {!isLast && (
        <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform md:block">
          <motion.div
            className="from-primary/50 to-primary h-full w-full bg-linear-to-b"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
      {isEven ? (
        <>
          <CardSection
            experience={experience}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isEven={isEven}
          />
          <div className="relative z-10 hidden md:block">
            <motion.div
              className="to-primary-focus from-primary flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <FaBriefcase className="text-primary-content h-6 w-6" />
            </motion.div>
          </div>
          <TimeDisplay isEven={isEven} experience={experience} />
        </>
      ) : (
        <>
          <TimeDisplay isEven={isEven} experience={experience} />
          <div className="relative z-10 hidden md:block">
            <motion.div
              className="to-primary-focus from-primary flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <FaBriefcase className="text-primary-content h-6 w-6" />
            </motion.div>
          </div>
          <CardSection
            experience={experience}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isEven={isEven}
          />
        </>
      )}
    </motion.li>
  );
};

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
