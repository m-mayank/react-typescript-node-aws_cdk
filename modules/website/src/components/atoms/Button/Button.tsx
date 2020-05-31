import * as React from "react";

export enum ButtonTypes {
  "PRIMARY" = "primary",
  "SECONDARY" = "secondary",
  "LINK" = "link",
  "LIGHT" = "light",
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  onClick?: () => void;
}

export const Button: React.SFC<ButtonProps> = ({
  children,
  type = ButtonTypes.PRIMARY,
  onClick = () => {},
}) => {
  const className = `btn btn-${type}`;
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};
