import Axios from "axios";
import { SerializedCustomer } from "@web-app/customer-domain";
const axios = Axios.create({});
const url = "/api/customer";

const getAll = () => axios.get(url).then((res) => res.data);

const update = (customer: SerializedCustomer) =>
  axios.put(`${url}/${customer.id}`, customer);

const save = (customer: SerializedCustomer) => axios.post(url, customer);

const remove = (id: number) => axios.delete(`${url}/${id}`);

export const CustomerService = { getAll, update, save, remove };
