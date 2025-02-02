import {makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';
import {prisma} from './db/prismaClient';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import {resolver} from './resolvers/resolver';

const typesArray = loadFilesSync('./src/graphql/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);
const schema = makeExecutableSchema({typeDefs, resolvers: resolver});

const PORT = Number(process.env.PORT || 4000);

const app = new Koa();
const router = new Router();

router.get('/health', async (ctx) => {
  ctx.status = 200;
  ctx.body = 'Project is running';
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const server = new ApolloServer({
  schema,
  introspection: true,
});

(async () => {
  const {url} = await startStandaloneServer(server, {
    context: async () => ({prisma}),
    listen: {port: PORT},
  });

  console.log(`🚀 Server ready at ${url}`);
})();

app.listen(3000, () => {
  console.log('Koa server running on port 3000');
});