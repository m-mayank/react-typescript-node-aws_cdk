import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/atoms";
import { HomePage, AddEditCustomer } from "./components/pages";
import { Routes } from "./routes";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  return (
    <div className="container">
      <Header />
      <br />
      <Switch>
        <Route path={Routes.HOME} component={HomePage} exact />
        <Route path={Routes.ADD_CUSTOMER} component={AddEditCustomer} />
        <Route path={Routes.EDIT_CUSTOMER} component={AddEditCustomer} exact />
      </Switch>
    </div>
  );
};

export default App;
