import { Customer, SerializedCustomer } from "@web-app/customer-domain";

let customers: SerializedCustomer[] = [
  { id: 1, name: "ABC" },
  { id: 2, name: "PQR" },
];

const getMaxId = (): number =>
  (customers.reduce((prev, cur) => (prev.id > cur.id ? prev : cur)).id || 0) +
  1;

const getAll = (): Promise<Customer[]> =>
  Promise.resolve(customers.map((customer) => Customer.fromJSON(customer)));

const getById = (id: number): Promise<Customer | undefined> => {
  const customer = customers.find((customer) => customer.id === id);
  return Promise.resolve(customer ? Customer.fromJSON(customer) : customer);
};

const update = (data: Customer): Promise<void> => {
  const isExists: boolean = !!(customers.find(customer => customer.id === data.id));
  let promise;
  if (isExists) {
    customers = [
      ...customers.filter((customer) => customer.id !== data.id),
      data.toJSON(),
    ];
    promise = Promise.resolve();
  } else {
    promise = Promise.reject(new Error("Not found"));
  }
  return promise;
};

const save = (customer: Customer): Promise<number> => {
  const id = getMaxId();
  customers = [...customers, { ...customer.toJSON(), id }];
  return Promise.resolve(id);
};

const deleteById = (id: number): Promise<void> => {
  customers = customers.filter((customer) => customer.id !== id);
  return Promise.resolve();
};

export const CustomerRepository = {
  getAll,
  getById,
  update,
  save,
  deleteById,
};
