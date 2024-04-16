type ErrorLabelProps = {
  error: string | undefined;
};

export const ErrorLabel = ({ error = "" }: ErrorLabelProps) => (
  <p className="text-danger text-xs mt-[3px]">{error}</p>
);
