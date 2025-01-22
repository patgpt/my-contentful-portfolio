'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@/components/features/article/ArticleAuthor';
import { CtfImage } from '@/components/features/contentful';
import { FormatDate } from '@/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const locale = useLocale();
  return (
    <Link locale={locale} className="flex h-full flex-col no-underline" href={`/blog/${slug}`}>
      <div className={twMerge('card bg-base-100 h-full shadow-xl', className)}>
        {featuredImage && (
          <figure {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'w-full aspect-16/10 object-cover' }}
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
              className="text-base-content/60 text-xs"
              {...inspectorProps({ fieldId: 'publishedDate' })}>
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
