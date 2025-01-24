/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */

import { Asset, PageExperience } from '@/lib/__generated/sdk';
import Image from 'next/image';
import { formatDate } from '@/utils/date';

interface IExperienceCardHeaderProps {
  experience: PageExperience;
}

const ExperienceCardHeader = ({ experience }: IExperienceCardHeaderProps) => (
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
ExperienceCardHeader.displayName = 'ExperienceCardHeader';

export default ExperienceCardHeader;
