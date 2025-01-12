import {makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServer} from 'apollo-server';
import {mergeTypeDefs} from "@graphql-tools/merge";
import {loadFilesSync} from "@graphql-tools/load-files";
import {resolvers} from "./resolvers/resolvers";
import {prisma} from "./db/prismaClient";

const typesArray = loadFilesSync('./src/schema/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);
const schema = makeExecutableSchema({typeDefs, resolvers});

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({prisma}),
});

server.listen({ port: PORT }).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});