import {makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServer} from 'apollo-server';
import {mergeTypeDefs} from "@graphql-tools/merge";
import {loadFilesSync} from "@graphql-tools/load-files";
import {resolvers} from "./resolvers/resolvers";
import {prisma} from "./db/prismaClient";
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const typesArray = loadFilesSync('./src/graphql/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);
const schema = makeExecutableSchema({typeDefs, resolvers});

const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = new Router();

router.get('/health', async (ctx) => {
  ctx.status = 200;
  ctx.body = 'Project is running';
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({prisma}),
  introspection: true,
});

// server.listen({ port: PORT }).then(({url}) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}graphql.json`);
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});

