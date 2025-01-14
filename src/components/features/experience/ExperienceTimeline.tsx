// ExperienceTimeline.tsx
'use client';

import { TimelineItems } from '@src/components/features/experience/TimellineItems';
import { ExperienceTimelineHeader } from './ExperienceTimelineHeader';
import type { PageExperience } from '@src/lib/__generated/sdk';

interface ExperienceTimelineProps {
  experiences: PageExperience[];
}

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => (
  <div className="px-4 py-8 md:py-16">
    <ExperienceTimelineHeader />
    <TimelineItems experiences={experiences} />
  </div>
);
