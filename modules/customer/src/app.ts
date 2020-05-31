import express from "express";
import { urlencoded, json } from "body-parser";
import { CustomerService } from "./service";
import { eventContext } from "aws-serverless-express/middleware";

const configureApp = () => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(eventContext());

  app.get("/customer", (req, res) => {
    res.send(CustomerService.get());
  });

  app.get("/customer/?:id(\\d+)", (req, res) => {
    let result, statusCode;
    try {
      result = CustomerService.get(Number(req.params.id));
      statusCode = 200;
    } catch {
      statusCode = 404;
      result = { message: "No Record found" };
    }
    res.status(statusCode).send(result);
  });

  app.put("/customer", (req, res) => {
    const { id, name } = req.body || {};
    res.send(CustomerService.save({ id, name }));
  });

  app.post("/customer", (req, res) => {
    const { name } = req.body || {};
    res.send(CustomerService.save({ name }));
  });

  return app;
};

export default configureApp;
