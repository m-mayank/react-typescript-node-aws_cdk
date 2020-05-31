import express from "express";
import { urlencoded, json } from "body-parser";
import { CustomerService } from "./service";
import { eventContext } from "aws-serverless-express/middleware";
import { Customer } from "@web-app/customer-domain";

const successOp = { message: "Opertion done successfully" };

const configureApp = () => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(eventContext());

  app.get("/customer", (req, res, next) => {
    CustomerService.get()
      .then((result) => res.send(result))
      .catch((error) => next(error));
  });

  app.post("/customer", (req, res, next) => {
    const customer = Customer.fromJSON(req.body || {});
    CustomerService.save(customer)
      .then(() => res.send(successOp))
      .catch((error) => next(error));
  });

  app.get("/customer/:id(\\d+)", (req, res, next) => {
    CustomerService.get(Number(req.params.id))
      .then((result) => res.status(result ? 200 : 404).send(result))
      .catch((error) => next(error));
  });

  app.put("/customer/:id(\\d+)", (req, res, next) => {
    const id = Number(req.params.id);
    const customer = Customer.fromJSON({
      ...(req.body || {}),
      ...{ id },
    });
    CustomerService.update(customer)
      .then(() => res.send(successOp))
      .catch((error) => next(error));
  });

  app.delete("/customer/:id(\\d+)", (req, res, next) => {
    CustomerService.remove(Number(req.params.id))
      .then(() => res.send(successOp))
      .catch((error) => next(error));
  });

  return app;
};

export default configureApp;
