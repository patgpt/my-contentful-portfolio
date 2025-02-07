'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@/components/features/article/ArticleAuthor';
import { ArticleLabel } from '@/components/features/article/ArticleLabel';
import { CtfImage } from '@/components/features/contentful';
import { FormatDate } from '@/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk';
import { useTranslations } from 'next-intl';

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
  locale?: string;
}

export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  const t = useTranslations('article');
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription, publishedDate } = useContentfulLiveUpdates(article);

  return (
    <div
      className={twMerge(
        'card bg-base-100 lg:card-side my-8 shadow-xl',
        isReversedLayout ? 'lg:flex-row-reverse' : '',
      )}>
      <figure className="flex-1 basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{
              className: 'w-full h-full object-cover',
              priority: true,
              sizes: undefined,
            }}
            {...article.featuredImage}
          />
        )}
      </figure>

      <div className="card-body relative flex-1 basis-1/2 justify-center">
        <div className="mb-2 flex flex-wrap items-center">
          <ArticleAuthor article={article} />
          {isFeatured && (
            <ArticleLabel
              className={twMerge(
                'ml-auto pl-2 lg:absolute lg:top-8 xl:top-12',
                isReversedLayout ? 'lg:left-6 xl:left-12' : 'lg:right-6 xl:right-12',
              )}>
              {t('featured')}
            </ArticleLabel>
          )}
          <div
            className={twMerge(
              'text-base-content/60 ml-auto hidden pl-2 text-xs',
              isReversedLayout ? 'lg:block' : '',
            )}
            {...inspectorProps({ fieldId: 'publishedDate' })}>
            <FormatDate date={publishedDate} />
          </div>
        </div>
        <h1 {...inspectorProps({ fieldId: 'title' })}>{title}</h1>
        {shortDescription && (
          <p className="mt-2" {...inspectorProps({ fieldId: 'shortDescription' })}>
            {shortDescription}
          </p>
        )}
        <div
          className={twMerge('text-gray600 mt-2 text-xs', isReversedLayout ? 'lg:hidden' : '')}
          {...inspectorProps({ fieldId: 'publishedDate' })}>
          <FormatDate date={publishedDate} />
        </div>
      </div>
    </div>
  );
};
