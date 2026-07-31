import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string | number;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-1 ring-border bg-background text-foreground placeholder:text-muted-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        defaultValue={defaultValue}
        {...inputProps}
      />
      {error?.message && <p className="text-xs text-danger">{error.message.toString()}</p>}
    </div>
  );
};

export default InputField;
