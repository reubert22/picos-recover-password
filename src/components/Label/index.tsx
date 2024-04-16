import { HTMLAttributes } from "react";

type LabelProps = {
  title: string;
} & HTMLAttributes<HTMLLabelElement>;

export const Label = ({ title, ...rest }: LabelProps) => (
  <label
    className="block text-yellowLight text-md leading-2 font-bold mb-2"
    {...rest}
  >
    {title}
  </label>
);
