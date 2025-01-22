import { CtfRichText } from '@/components/features/contentful/CtfRichText';

import type { PageExperience, Asset, PageExperienceJobDescription } from '@/lib/__generated/sdk';
import { formatDate } from '@/utils/date';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa6';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

// Card Header Component
const ExperienceCardHeader = ({ experience }: { experience: PageExperience }) => (
  <div className="flex items-start gap-4">
    {experience?.companyLogo && (
      <div className="relative h-[60px] w-[60px] shrink-0">
        <Image
          src={(experience.companyLogo as Asset).url || ''}
          alt={experience.companyName || 'Company logo'}
          fill
          className="rounded-lg object-contain"
        />
      </div>
    )}
    <div className="flex-1">
      <h2 className="group-hover:text-primary text-xl font-bold transition-colors">
        {experience?.positionTitle}
      </h2>
      <h3 className="text-base-content/80 text-lg">{experience?.companyName}</h3>
      <div className="text-base-content/60 text-sm md:hidden">
        {formatDate(experience?.startDate)} -{' '}
        {experience?.endDate ? formatDate(experience?.endDate) : 'Present'}
      </div>
    </div>
  </div>
);

// Card Body Component
const ExperienceCardBody = ({
  experience,
  isExpanded,
  setIsExpanded,
}: {
  experience: PageExperience;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}) => (
  <motion.div
    className="relative"
    animate={{ height: isExpanded ? 'auto' : '120px' }}
    transition={{ duration: 0.3 }}>
    <div className={`prose-sm text-base-content/80 mt-4 text-sm ${!isExpanded && 'line-clamp-3'}`}>
      <CtfRichText json={(experience.jobDescription as PageExperienceJobDescription).json} />
    </div>
    {!isExpanded && (
      <div className="left-0py-4 from-base-100 absolute bottom-0 h-16 w-full bg-linear-to-t to-transparent" />
    )}
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-primary my-2 text-sm font-medium hover:underline">
      {isExpanded ? '← Show less' : 'Read more →'}
    </button>
  </motion.div>
);

// Card Footer Component
const ExperienceCardFooter = ({ experience }: { experience: PageExperience }) => (
  <div className="border-base-200 mt-4 flex items-center justify-between gap-4 border-t pt-4">
    {experience?.website && (
      <Link
        href={experience.website}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost btn-sm gap-2 transition-all hover:gap-3">
        <FaGlobe /> Website
      </Link>
    )}
    <Link
      href={`/experience/${experience.slug}`}
      className="btn btn-primary btn-sm gap-2 transition-all hover:gap-3">
      Details <span className="text-lg">→</span>
    </Link>
  </div>
);

// Main ExperienceCard Component
const ExperienceCard = ({
  experience,
  isExpanded,
  setIsExpanded,
  isEven,
}: {
  experience: PageExperience;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isEven: boolean;
}) => (
  <motion.div
    className="rounded-box bg-base-100 w-full p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:w-[400px]"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}>
    <ExperienceCardHeader experience={experience} />
    <ExperienceCardBody
      experience={experience}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
    <motion.div className="mt-8 flex flex-wrap gap-2" layout>
      {experience?.skillsUsed?.map(
        skill =>
          skill && (
            <motion.span
              key={skill}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge badge-primary badge-outline whitespace-nowrap">
              {skill}
            </motion.span>
          ),
      )}
    </motion.div>
    <ExperienceCardFooter experience={experience} />
  </motion.div>
);

export default ExperienceCard;
