import type { PageExperience } from '@/lib/__generated/sdk';
import TimelineItem from '@/components/features/experience/TimelineItem';
import PageTitle from '@/components/features/PageTitle';

interface IExperienceTimelineProps {
  experiences: PageExperience[];
}

const ExperienceTimeline = ({ experiences }: IExperienceTimelineProps) => (
  <div className="px-4 py-8 md:py-16">
    <PageTitle titleText="Professional Experience" />
    <div className="relative mx-auto">
      <div className="bg-base-300/20 absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform md:block" />
      {experiences.map((experience, index) => (
        <TimelineItem
          key={experience.slug || index}
          experience={experience}
          isLast={index === experiences.length - 1}
          index={index}
        />
      ))}
    </div>
  </div>
);

ExperienceTimeline.displayName = 'ExperienceTimeline';
export default ExperienceTimeline;
