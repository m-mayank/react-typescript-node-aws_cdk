import * as React from "react";
import { Link } from "react-router-dom";
import { SerializedCustomer } from "@web-app/customer-domain";
import { Button, ButtonTypes } from "../../atoms";
import { Routes } from "../../../routes";

export interface CustomerRowProps {
  customer: SerializedCustomer;
  onDelete: (id: number) => void;
}

export interface CustomerRowState {}

class CustomerRow extends React.Component<CustomerRowProps, CustomerRowState> {
  render() {
    const { customer } = this.props;
    return (
      <tr>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>
          <Link
            to={{
              pathname: Routes.EDIT_CUSTOMER,
              state: {
                customer,
              },
            }}
          >
            <Button type={ButtonTypes.LINK}>Edit</Button>
          </Link>
          <Button
            type={ButtonTypes.LINK}
            onClick={() => this.props.onDelete(customer.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default CustomerRow;
