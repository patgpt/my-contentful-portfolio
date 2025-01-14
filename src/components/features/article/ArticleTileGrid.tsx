import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import React from 'react';

import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  return articles?.length ? (
    <div
      className={twMerge('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}>
      {articles.map((article, index) => (
        <React.Fragment key={article?.slug || index}>
          {article && <ArticleTile article={article} />}
        </React.Fragment>
      ))}
    </div>
  ) : null;
};
