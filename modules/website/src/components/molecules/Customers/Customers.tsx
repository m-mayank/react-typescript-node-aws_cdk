import * as React from "react";
import { Customer } from "@web-app/customer-domain";
import CustomerRow from "./CustomerRow";
import CustomerHeader from "./CustomerHeader";

export interface CustomersProps {
  customers: Customer[];
  onDelete: (id: number) => void;
}

export interface CustomersState {}

export class Customers extends React.Component<CustomersProps, CustomersState> {
  constructor(props: CustomersProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <table className="table">
        <CustomerHeader />
        <tbody>
          {this.props.customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onDelete={this.props.onDelete}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
