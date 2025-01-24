import PageTitle from '@/components/features/PageTitle';
import { Link } from '@/i18n/routing';
import { client, previewClient } from '@/lib/client';
import { draftMode } from 'next/headers';

const ServicesPage = async ({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) => {
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const { locale } = await params;
  const data = await gqlClient.pageServiceCollection({ locale: locale });
  const pageCollection = data.pageServiceCollection;
  return (
    <div className="container mx-auto h-screen p-12">
      <PageTitle titleText="Services" />
      {pageCollection?.items.map(page => (
        <Link
          key={page.slug}
          href={`/services/${page.slug}`}
          className="text-primary-500 my-4 block text-lg font-semibold">
          {page.pageTitle}
        </Link>
      ))}
    </div>
  );
};

export default ServicesPage;
