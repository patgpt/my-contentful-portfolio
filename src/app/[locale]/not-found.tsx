import { headers } from 'next/headers';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { Container } from '@src/components/shared/container';
import initTranslations from '@src/i18n';
import { defaultLocale } from '@src/i18n/config';

export default async function NotFound() {
  const headersList = headers();
  const locale = headersList.get('x-next-i18n-router-locale') || defaultLocale;
  const { t } = await initTranslations({ locale });

  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h1 className="card-title mb-4 text-3xl font-bold">{t('notFound.title')}</h1>
          <p className="mt-4">
            <Trans i18nKey="notFound.description" t={t}>
              <Link className="link link-primary" href="/" />
            </Trans>
          </p>
        </div>
      </div>
    </Container>
  );
}
