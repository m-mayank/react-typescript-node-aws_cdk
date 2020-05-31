import * as React from "react";

export interface HeaderProps {}

export const Header: React.SFC<HeaderProps> = () => {
  return (
    <div className="text-center">
      <h3>Welcome to Customer Application</h3>
    </div>
  );
};
