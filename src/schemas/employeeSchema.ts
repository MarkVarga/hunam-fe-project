import { employeeInputSchema } from "@/schemas/employeeInputSchema";

export const employeeSchema = employeeInputSchema.transform((data) => ({
  ...data,
  sex: Number(data.sex),
  education: Number(data.education),
  paymentMethod: Number(data.paymentMethod),
  salary: Number(data.salary),
}));
