/*
 * Copyright (c) 2025.
 * Patrick Kelly.
 */

import { Link } from '@i18n/routing';
import { FaGlobe } from 'react-icons/fa6';
import { PageExperience } from '@/lib/__generated/sdk';

interface ExperienceCardFooterProps {
  experience: PageExperience;
}

const ExperienceCardFooter = ({ experience }: ExperienceCardFooterProps) => (
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

ExperienceCardFooter.displayName = 'ExperienceCardFooter';
export default ExperienceCardFooter;
