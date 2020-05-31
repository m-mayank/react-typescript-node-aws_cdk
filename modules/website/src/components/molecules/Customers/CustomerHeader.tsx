import * as React from "react";

export interface CustomerHeaderProps {}

const CustomerHeader: React.SFC<CustomerHeaderProps> = () => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default CustomerHeader;
