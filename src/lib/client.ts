import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';

import { endpoint } from 'codegen';
import { getSdk } from '@/lib/__generated/sdk';

dotenv.config({
  path: '.env',
});

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);
