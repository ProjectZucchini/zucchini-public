import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { type PrismaClient } from "@prisma/client";

import { typeDefs } from "../generated/typed-defs.js";
import { resolvers } from "../model/resolvers.js";
import { prisma } from "../db.js";

import { isTokenValid } from "./validate-jwt.js";

import { type Server } from "node:http";

export interface GraphQLContext {
  prisma: PrismaClient;
}

export async function getGraphQLMiddleware(httpServer: Server) {
  const server = new ApolloServer<GraphQLContext>({
    schema: makeExecutableSchema({
      typeDefs: [typeDefs],
      resolvers: resolvers,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  return koaMiddleware(server, {
    context: async ({ ctx }) => {
      const { authorization: token } = ctx.request.headers;
      console.log("token", token);
      if (token) {
        const isValid = await isTokenValid(token);
        console.log('isValid', isValid)
      }
      return {
        prisma,
      };
    },
  });
}
