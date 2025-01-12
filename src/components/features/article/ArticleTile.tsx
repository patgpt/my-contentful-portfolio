'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import { Link } from '@src/i18n/routing';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link className="flex h-full flex-col no-underline" href={`blog/${slug}`}>
      <div className={twMerge('card h-full bg-base-100 shadow-xl', className)}>
        {featuredImage && (
          <figure {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'w-full aspect-[16/10] object-cover' }}
              {...featuredImage}
            />
          </figure>
        )}
        <div className="card-body flex flex-col justify-between">
          {title && (
            <h2 className="card-title line-clamp-2" {...inspectorProps({ fieldId: 'title' })}>
              {title}
            </h2>
          )}

          <div className="card-actions mt-4 items-center justify-between">
            <ArticleAuthor article={article} />
            <div
              className="text-xs text-base-content/60"
              {...inspectorProps({ fieldId: 'publishedDate' })}>
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
