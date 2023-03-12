//Servidor Apollo -> rutas para graphql
import { ApolloServer } from "apollo-server-express";

import express from "express";
import { StatusResolvers } from "./resolvers/status.resolver";
import { ProductResolver } from "./resolvers/product.resolver";
import { buildSchema } from "type-graphql";

//Dependencias para subscriptions
import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

export const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [StatusResolvers, ProductResolver],
  });

  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql-subs",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  //SetUp Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ req, res }) => ({ req, res }),
    cache: "bounded",
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  return app;
};
