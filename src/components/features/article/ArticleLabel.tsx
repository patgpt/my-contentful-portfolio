import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ArticleLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const ArticleLabel = ({ children = '', className, ...props }: ArticleLabelProps) => {
  return (
    <div
      className={twMerge(
        'bg-accent inline-block rounded-full px-3 py-1 text-sm font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
