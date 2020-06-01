import request from "supertest";
import { configureApp } from "../src/app";
import { CustomerRepository } from "../src/repository";
import { Customer } from "@web-app/customer-domain";

const app = configureApp();

describe("API Test", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET All customer", async () => {
    jest
      .spyOn(CustomerRepository, "getAll")
      .mockReturnValue(Promise.resolve([new Customer(1, "sq")]));
    const response = await request(app).get("/api/customer");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "sq" }]);
  });
});
