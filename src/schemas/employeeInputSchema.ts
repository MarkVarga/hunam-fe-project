import { z } from "zod";

export const employeeInputSchema = z.object({
  id: z.number().optional(), // optional if you're creating a new employee

  // 👤 Personal Info
  email: z.string().min(1, "Invalid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  mothersFirstName: z.string().min(1, "Mother’s first name is required"),
  mothersLastName: z.string().min(1, "Mother’s last name is required"),
  phone: z.string().min(6, "Phone number is too short"),

  sex: z.string(),
  education: z.string(),
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
  paymentMethod: z.string(),
  moneyDispatchAddress: z.string().min(1),

  salary: z.string(),
});
