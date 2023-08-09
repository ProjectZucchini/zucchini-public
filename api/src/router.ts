import Router from "@koa/router";
import { type Server } from "node:http";
import { getGraphQLMiddleware } from "./middleware/graphql.js";

export async function getRouter(httpServer: Server) {
  const router = new Router();

  router.get("/", (ctx) => {
    ctx.body = "Hello World!";
    ctx.status = 200;
  });
  router.all("/graphql", await getGraphQLMiddleware(httpServer));

  return router;
}
