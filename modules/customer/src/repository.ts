import { Customer } from "@web-app/customer-domain";

let customers: Customer[] = [
  { id: 1, name: "ABC" },
  { id: 2, name: "PQR" },
];

const getMaxId = (): number =>
  (customers.reduce((prev, cur) => (prev.id > cur.id ? prev : cur)).id || 0) +
  1;

const getAll = (): Customer[] => customers;

const getById = (id: number): Customer => {
  const result = customers.find((customer) => customer.id === id);
  if (result) {
    return result;
  } else {
    throw new Error();
  }
};

const update = (customer: Customer): void => {
  customers = [
    ...customers.filter((customer) => customer.id !== customer.id),
    customer,
  ];
};

const save = (customer: Customer): number => {
  const id = getMaxId();
  customers = [...customers, { ...customer, id }];
  return id;
};

const deleteById = (id: number): void => {
  customers = customers.filter((customer) => customer.id !== id);
};

export const CustomerRepository = {
  getAll,
  getById,
  update,
  save,
  deleteById,
};
