# Contentful Portfolio Template

   A ready-to-use developer portfolio template built with Next.js and Contentful, designed for easy customization and deployment.

   A Developer Portfolio Starter Template powered by Next.js & Contentful. Pre-designed with optimized & adjustable pages, components, and data management.

   ![Portfolio Template](portfolio-template.jpg 'Portfolio Template')

   [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
   [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
   [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
   [![Contentful](https://img.shields.io/badge/Contentful-2478CC?style=for-the-badge&logo=contentful&logoColor=white)](https://www.contentful.com)
   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
   [![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org)
   [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
   [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io)
   [![X (Twitter)](https://img.shields.io/badge/X-AGIManifesto-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/AGIManifesto)

   [![Build Status](https://img.shields.io/github/workflow/status/patgpt/contentful-portfolio-template/CI)](https://github.com/patgpt/contentful-portfolio-template/actions)
   [![Playwright Tests](https://img.shields.io/github/actions/workflow/status/patgpt/my-contentful-portfolio/playwright.yml?label=e2e-tests)](https://github.com/patgpt/my-contentful-portfolio/actions/workflows/playwright.yml)

   ## What is Contentful?

   [Contentful](https://www.contentful.com/) is a content management system (CMS) that provides content infrastructure for digital teams. It offers APIs and a web app to manage and deliver structured content, perfect for modern web applications like this one.

   ## Features

- Composable content through flexible content modeling.
- Localization ready.
- SEO ready.
- Incremental Static Regeneration with Next.js.
- Type-safe GraphQL API with `graphql-codegen`.
- Enhanced Developer Experience with TypeScript.

   ## Getting Started

   1. Clone this repository.
   2. Install dependencies using Bun:

      ```bash
      bun install
      ```

   3. Set up your Contentful space and API keys in the `.env` file.
   4. Run the app locally:

      ```bash
      bun dev
      ```

   The Portfolio Template should be running on `http://localhost:3000`.

   ## Development

- Commit hooks are enforced using [Husky](https://github.com/typicode/husky).
- Type-safe GraphQL API with [graphql-codegen](https://www.the-guild.dev/graphql/codegen).

   ## Deployment

   You can easily deploy this template to Vercel:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpatgpt%2Fcontentful-portfolio-template&env=CONTENTFUL_SPACE_ID,CONTENTFUL_ACCESS_TOKEN,CONTENTFUL_PREVIEW_ACCESS_TOKEN&envDescription=API%20Keys%20needed%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fpatgpt%2Fcontentful-portfolio-template%23environment-variables)

   [Environment variables docs](https://vercel.com/docs/concepts/projects/environment-variables)
   Make sure to set your Contentful environment variables before deploying.

   ## Content Preview

   For previewing content in your live site:

   1. Set a unique value for `process.env.CONTENTFUL_PREVIEW_SECRET`.
   2. Configure the Contentful space to match the preview URL structure.

   ## License

   MIT License, see [LICENSE](./LICENSE).
