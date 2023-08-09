import http from "node:http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { getRouter } from "./router.js";

const PORT = 8080;

const app = new Koa();
const httpServer = http.createServer(app.callback());

const router = await getRouter(httpServer);

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

await new Promise((resolve: any) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
