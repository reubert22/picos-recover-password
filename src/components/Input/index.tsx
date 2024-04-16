import { HTMLAttributes } from "react";

type InputProps = {
  type: string;
  id: string;
} & HTMLAttributes<HTMLInputElement>;

export const Input = ({ ...rest }: InputProps) => (
  <input
    className="w-full px-3 py-2 border border-yellowDark rounded focus:outline-none bg-yellowLight text-darker"
    {...rest}
  />
);
