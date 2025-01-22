'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { CtfImage } from '@/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk';

interface ArticleAuthorProps {
  article: PageBlogPostFieldsFragment;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: author?.sys.id });

  return (
    <div className="flex items-center">
      <div className="avatar mr-2" {...inspectorProps({ fieldId: 'avatar' })}>
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
              className: 'rounded-full border border-primary',
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span
        className="text-base-content/60 text-xs leading-none"
        {...inspectorProps({ fieldId: 'name' })}>
        {author?.name}
      </span>
    </div>
  );
};
