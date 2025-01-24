import { motion } from 'framer-motion';
import { CtfRichText } from '@/components/features/contentful';
import { PageExperience, PageExperienceJobDescription } from '@/lib/__generated/sdk';
import { cn } from '@/utils/cn';

interface IExperienceCardBodyProps {
  experience: PageExperience;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const ExperienceCardBody = ({
  experience,
  isExpanded,
  setIsExpanded,
}: IExperienceCardBodyProps) => (
  <motion.div
    className="relative"
    animate={{ height: isExpanded ? 'auto' : '160px' }}
    transition={{ duration: 0.3 }}>
    <div
      className={cn(
        'prose-sm text-base-content/80 my-4 text-sm',
        !isExpanded && 'line-clamp-2 overflow-ellipsis',
      )}>
      <CtfRichText json={(experience.jobDescription as PageExperienceJobDescription).json} />
    </div>
    {!isExpanded && (
      <div className="from-base-100 pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-linear-to-t to-transparent py-4" />
    )}
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="btn btn-outline text-primary z-50 p-4">
      {isExpanded ? '← Show less' : 'Read more →'}
    </button>
  </motion.div>
);

ExperienceCardBody.displayName = 'ExperienceCardBody';
export default ExperienceCardBody;
