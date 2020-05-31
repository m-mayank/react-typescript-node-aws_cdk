import * as React from "react";
import { Link } from "react-router-dom";
import { SerializedCustomer } from "@web-app/customer-domain";
import { Button } from "../../atoms";
import { Customers } from "../../molecules";
import { Routes } from "../../../routes";
import { CustomerService } from "../../../services";

export interface HomePageProps {}

export interface HomePageState {
  customers: SerializedCustomer[];
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    CustomerService.getAll().then((customers: SerializedCustomer[]) =>
      this.setState({
        customers: customers.sort((prev, curr) => prev.id - curr.id),
      })
    );
  }

  handleDelete = (id: number) => {
    CustomerService.remove(id).then(() =>
      this.setState({
        customers: this.state.customers.filter(
          (customer) => customer.id !== id
        ),
      })
    );
  };

  render() {
    return (
      <div>
        <h5>Existing Customers</h5>
        <Customers
          customers={this.state.customers}
          onDelete={this.handleDelete}
        />
        <Link to={Routes.ADD_CUSTOMER}>
          <Button>Add New</Button>
        </Link>
      </div>
    );
  }
}
