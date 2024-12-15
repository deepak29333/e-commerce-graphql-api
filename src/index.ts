import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers/resolvers';
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import express from 'express';

const prisma = new PrismaClient();

const typesArray = loadFilesSync('./**/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

const server = new ApolloServer({
  schema,
  context: () => ({ prisma })
});

export default async function handler(req: express.Request, res: express.Response) {
  await server.start();
  const apolloHandler = server.createHandler({ path: '/api/graphql' });
  return apolloHandler(req, res);
}

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}