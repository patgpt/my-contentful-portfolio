/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */

import type { PageExperience } from '@/lib/__generated/sdk';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils/date';

interface ITimeDisplayProps {
  isEven: boolean;
  experience: PageExperience;
}

const TimeDisplay = ({ isEven, experience }: ITimeDisplayProps) => (
  <div className={`col-span-1 md:${!isEven && 'opacity-0'}`}>
    {isEven ? (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden items-center justify-end md:flex">
        <motion.span className="bg-base-200 text-base-content/70 rounded-full px-4 py-1 text-2xl">
          {formatDate(experience.startDate)}
        </motion.span>
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden items-center justify-start md:flex">
        <motion.span className="bg-base-200 text-base-content/70 rounded-full px-4 py-1 text-2xl">
          {formatDate(experience.startDate)}
        </motion.span>
      </motion.div>
    )}
  </div>
);
TimeDisplay.displayName = 'TimeDisplay';
export default TimeDisplay;
