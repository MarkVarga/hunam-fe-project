import { Education, PaymentMethod, Sex } from "@/types/employee";

export const sexOptions = Object.entries(Sex)
  .filter(([key, value]) => typeof value === "number")
  .map(([key, value]) => ({
    label: key,
    value,
  }));

export const educationOptions = Object.entries(Education)
  .filter(([key, value]) => typeof value === "number")
  .map(([key, value]) => ({
    label: key,
    value,
  }));

export const paymentMethodOptions = Object.entries(PaymentMethod)
  .filter(([key, value]) => typeof value === "number")
  .map(([key, value]) => ({
    label: key,
    value,
  }));
