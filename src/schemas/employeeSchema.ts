import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number().optional(), // optional if you're creating a new employee

  // 👤 Personal Info
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  mothersFirstName: z.string().min(1, "Mother’s first name is required"),
  mothersLastName: z.string().min(1, "Mother’s last name is required"),
  phone: z.string().min(6, "Phone number is too short"),

  sex: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" })
    .transform((val) => Number(val))
    .refine((num) => num >= 0 && num <= 2, {
      message: "Sex must be between 0 and 2",
    })
    .transform((val) => val.toString()),
  education: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" })
    .transform((val) => Number(val))
    .refine((num) => num >= 0 && num <= 10, {
      message: "Education level must be between 0 and 10",
    })
    .transform((val) => val.toString()),
  // 🏠 Address Info
  country: z.string().min(1),
  zipCode: z.string().min(1),
  parcelNumber: z.string().min(1),
  city: z.string().min(1),
  administrativeArea: z.string().min(1),
  administrativeAreaType: z.string().min(1),
  houseNumber: z.string().min(1),
  building: z.string().min(1),
  staircase: z.string().min(1),
  floor: z.string().min(1),
  door: z.string().min(1),

  // 💳 Payment Info
  paymentMethod: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" })
    .transform((val) => Number(val))
    .refine((num) => num >= 1 && num <= 3, {
      message: "Payment method must be between 1 and 3",
    })
    .transform((val) => val.toString()),
  moneyDispatchAddress: z.string().min(1),
  salary: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" })
    .transform((val) => Number(val))
    .refine((num) => num >= 200_000, {
      message: "Salary must be at least 200000 HUF",
    })
    .refine((num) => num <= 500_000, {
      message: "Salary must be at most 500000 HUF",
    })
    .transform((val) => val.toString()),
});
