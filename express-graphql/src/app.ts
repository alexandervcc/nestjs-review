//Servidor -> rutas para graphql
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { StatusResolvers } from "./resolvers/status";
import { buildSchema } from "type-graphql";

export const startServer = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [StatusResolvers],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  return app;
};
