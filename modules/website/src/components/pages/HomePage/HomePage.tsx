import * as React from "react";
import { Link } from "react-router-dom";
import { Customer } from "@web-app/customer-domain";
import { Button } from "../../atoms";
import { Customers } from "../../molecules";
import { Routes } from "../../../routes";

export interface HomePageProps {}

export interface HomePageState {
  customers: Customer[];
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    // Call API to fetch all customers
    console.log("Fetching data");
    const customers: Customer[] = [
      { id: 1, name: "ABC" },
      { id: 2, name: "PQR" },
    ];
    this.setState({ customers });
  }

  handleDelete = (id: number) => {
    // TODO - Call API to Delete
    console.log("Delete: ", id);
    // On Success of API
    this.setState({
      customers: this.state.customers.filter((customer) => customer.id !== id),
    });
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
