import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ArticleLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const ArticleLabel = ({ children = '', className, ...props }: ArticleLabelProps) => {
  return (
    <div className={twMerge('badge badge-accent', className)} {...props}>
      {children}
    </div>
  );
};
