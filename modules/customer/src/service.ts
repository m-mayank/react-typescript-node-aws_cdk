import { Customer } from "@web-app/customer-domain";
import { CustomerRepository } from "./repository";

const get = (id?: number): Promise<Customer | Customer[] | undefined> =>
  id ? CustomerRepository.getById(id) : CustomerRepository.getAll();

const update = (customer: Customer): Promise<void> => {
  // TODO - Validations
  return CustomerRepository.update(customer);
};

const save = (customer: Customer): Promise<number> => {
  // TODO - Validations
  return CustomerRepository.save(customer);
};

const remove = (id: number): Promise<void> => CustomerRepository.deleteById(id);

export const CustomerService = {
  get,
  update,
  save,
  remove,
};
