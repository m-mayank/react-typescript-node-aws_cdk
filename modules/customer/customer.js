const ase = require("aws-serverless-express");
const app = require("./lib/app");
const server = ase.createServer(app.configureApp(), null, []);

exports.handler = (event, context) => ase.proxy(server, event, context);
