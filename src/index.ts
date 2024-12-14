import {PrismaClient} from '@prisma/client';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServer} from 'apollo-server';
import {resolvers} from './resolvers/resolvers';
import {mergeTypeDefs} from "@graphql-tools/merge";
import {loadFilesSync} from "@graphql-tools/load-files";

const prisma = new PrismaClient();

const typesArray = loadFilesSync('./**/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);
const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({prisma}),
});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
