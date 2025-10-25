import type {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type SelectFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: { label: string; value: string | number }[];
};

export const FormSelectField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  options,
}: SelectFieldProps<T>) => {
  return (
    <div className=" w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        defaultValue=""
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
