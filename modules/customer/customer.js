import { createServer, proxy } from "aws-serverless-express";
import configureApp from "./lib/app";

const server = createServer(configureApp(), null, []);
export const handler = (event, context) => proxy(server, event, context);
