import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { ArticleImage } from '@/components/features/article';
import { ComponentRichImage } from '@/lib/__generated/sdk';
import { cn } from '@/utils/cn';

/**
 * Type representing an embedded entry, which can be a ComponentRichImage.
 */
export type EmbeddedEntryType = ComponentRichImage;

/**
 * Interface for the ContentfulRichText component props.
 */
export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any; // eslint-disable-line @typescript-eslint/no-explicit-any
  proseSize?: ProseSize;
}

type ProseSize = 'prose-sm' | 'prose-lg' | 'prose-xl' | 'prose-2xl' | 'prose-3xl';

/**
 * Component to render an embedded entry.
 * @param entry - The embedded entry to render.
 * @returns The rendered embedded entry component.
 */
export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  if (!entry) return null;
  switch (entry.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

/**
 * Function to generate base options for rendering Contentful rich text.
 * @param links - The links object containing embedded entries.
 * @returns The options for rendering Contentful rich text.
 */
export const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id,
      );

      if (!entry) return null;

      return <EmbeddedEntry {...entry} />;
    },
  },
});

/**
 * Component to render Contentful rich text.
 * @param json - The rich text document to render.
 * @param links - The links object containing embedded entries.
 * @param proseSize - The size of the prose.
 * @returns The rendered rich text component.
 */
export const CtfRichText = ({ json, links, proseSize }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, json });

  return (
    <article className={cn('prose max-w-none', proseSize)}>
      {documentToReactComponents(json, baseOptions)}
    </article>
  );
};
