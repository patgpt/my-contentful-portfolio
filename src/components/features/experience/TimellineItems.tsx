// TimelineItems.tsx
import type { PageExperience } from '@src/lib/__generated/sdk';
import { TimelineItem } from './TimelineItem';

interface TimelineItemsProps {
  experiences: PageExperience[];
}

export const TimelineItems = ({ experiences }: TimelineItemsProps) => (
  <div className="relative mx-auto">
    <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform bg-base-300/20 md:block" />
    {experiences.map((experience, index) => (
      <TimelineItem
        key={experience.slug || index}
        experience={experience}
        isLast={index === experiences.length - 1}
        index={index}
      />
    ))}
  </div>
);
