/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */

import { PageExperience } from '@/lib/__generated/sdk';
import ExperienceCard from '@/components/features/experience/experience-card/ExperienceCard';
import { motion } from 'framer-motion';

interface ICardSection {
  experience: PageExperience;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isEven: boolean;
}

const CardSection = ({ experience, isExpanded, setIsExpanded, isEven }: ICardSection) => (
  <motion.div
    className={`col-span-1 md:${isEven && 'opacity-0'} justify-$ {isEven ? 'end' : 'start'} flex items-center gap-4`}
    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}>
    <ExperienceCard experience={experience} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
  </motion.div>
);

CardSection.displayName = 'CardSection';
export default CardSection;
