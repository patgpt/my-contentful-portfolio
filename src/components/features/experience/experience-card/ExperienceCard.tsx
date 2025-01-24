/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */

import { PageExperience } from '@/lib/__generated/sdk';
import { motion } from 'framer-motion';

import ExperienceCardHeader from '@/components/features/experience/experience-card/ExperienceCardHeader';
import ExperienceCardBody from '@/components/features/experience/experience-card/ExperienceCardBody';
import ExperienceCardFooter from '@/components/features/experience/experience-card/ExperienceCardFooter';

const ExperienceCard = ({
  experience,
  isExpanded,
  setIsExpanded,
}: {
  experience: PageExperience;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) => (
  <motion.div
    className="rounded-box bg-base-100 w-full p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:w-[400px]"
    whileHover={{ y: -5 }}>
    <ExperienceCardHeader experience={experience} />

    <ExperienceCardBody
      experience={experience}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
    <ExperienceCardFooter experience={experience} />
  </motion.div>
);

ExperienceCard.displayName = 'ExperienceCard';
export default ExperienceCard;
