import { getTranslations } from 'next-intl/server';
import { Container } from '@src/components/shared/container';
import { Link } from '@src/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h1 className="card-title mb-4 text-3xl font-bold">{t('title')}</h1>
          <p className="mt-4">
            <Link className="link link-primary" href="/">
              {t('description')}
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
