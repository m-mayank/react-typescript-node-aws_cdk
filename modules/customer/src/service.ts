import { Customer } from "@web-app/customer-domain";
import { CustomerRepository } from "./repository";

const get = (id?: number): Customer | Customer[] =>
  id ? CustomerRepository.getById(id) : CustomerRepository.getAll();

const update = (customer: Customer) => {
  // TODO - Validations
  CustomerRepository.update(customer);
};

const save = (customer: any) => {
  // TODO - Validations
  CustomerRepository.save(customer);
};

const remove = (id: number) => CustomerRepository.deleteById(id);

export const CustomerService = {
  get,
  update,
  save,
  remove,
};
