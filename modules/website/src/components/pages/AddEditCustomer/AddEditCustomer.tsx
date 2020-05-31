import * as React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonTypes } from "../../atoms";
import { Routes } from "../../../routes";
import { CustomerService } from "../../../services";

export interface AddEditCustomerProps {
  location: any;
  history: any;
}

export interface AddEditCustomerState {
  id: number;
  name: string;
}

export class AddEditCustomer extends React.Component<
  AddEditCustomerProps,
  AddEditCustomerState
> {
  constructor(props: AddEditCustomerProps) {
    super(props);
    this.state = {
      id: 0,
      name: "",
    };
  }

  handleSave = () => {
    const { update, save } = CustomerService;
    const fn = this.state.id ? update : save;
    fn(this.state).then(() => this.props.history.push(Routes.HOME));
  };

  componentDidMount() {
    const { state } = this.props.location;
    const customer = (state && state.customer) || {};
    this.setState({ ...customer });
  }

  render() {
    return (
      <div>
        <h5>Manage Customer</h5>
        <div className="form-group">
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <Button type={ButtonTypes.SECONDARY} onClick={this.handleSave}>
          Save
        </Button>
        &nbsp;
        <Link to={Routes.HOME}>
          <Button type={ButtonTypes.LIGHT}>Cancel</Button>
        </Link>
      </div>
    );
  }
}
