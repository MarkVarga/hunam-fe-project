import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/schemas/employeeSchema";
import { useCreateEmployee } from "@/services/hooks/useCreateEmployee";
import type { z } from "zod";
import { FormInputField } from "./FormInputField"; // your generic input component
import { FormSelectField } from "./FormSelectField";
import {
  educationOptions,
  paymentMethodOptions,
  sexOptions,
} from "@/constants/options";
import { Employee } from "@/types/employee";

export type EmployeeSubmissionData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employeeData?: Employee;
}

export const EmployeeForm = ({ employeeData }: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: employeeData
      ? {
          ...employeeData,
          sex: String(employeeData.sex),
          education: String(employeeData.education),
          paymentMethod: String(employeeData.paymentMethod),
          salary: String(employeeData.salary),
        }
      : undefined,
  });

  const { mutate } = useCreateEmployee();

  const onSubmit = (data: EmployeeSubmissionData) => {
    console.log("Submitted:", data);
    mutate(data, { onSuccess: () => console.log("success") });
  };

  const paymentMethod = watch("paymentMethod");

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))}
      className="space-y-8 max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Form</h2>

      {/* 👤 Personal Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
          <FormInputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
          <FormInputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <FormInputField
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone}
          />
          <FormInputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            error={errors.dateOfBirth}
          />
          <FormInputField
            label="Place of Birth"
            name="placeOfBirth"
            register={register}
            error={errors.placeOfBirth}
          />
          <FormInputField
            label="Mother’s First Name"
            name="mothersFirstName"
            register={register}
            error={errors.mothersFirstName}
          />
          <FormInputField
            label="Mother’s Last Name"
            name="mothersLastName"
            register={register}
            error={errors.mothersLastName}
          />
        </div>
        <div className="flex w-full justify-between gap-4 mt-4">
          <FormSelectField
            label="Sex"
            options={sexOptions}
            name="sex"
            register={register}
          />
          <FormSelectField
            label="Education"
            options={educationOptions}
            name="education"
            register={register}
          />
        </div>
      </section>

      {/* 🏠 Address Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Address Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInputField
            label="Country"
            name="country"
            register={register}
            error={errors.country}
          />
          <FormInputField
            label="City"
            name="city"
            register={register}
            error={errors.city}
          />
          <FormInputField
            label="Zip Code"
            name="zipCode"
            register={register}
            error={errors.zipCode}
          />
          <FormInputField
            label="Parcel Number"
            name="parcelNumber"
            register={register}
            error={errors.parcelNumber}
          />
          <FormInputField
            label="Administrative Area"
            name="administrativeArea"
            register={register}
            error={errors.administrativeArea}
          />
          <FormInputField
            label="Administrative Area Type"
            name="administrativeAreaType"
            register={register}
            error={errors.administrativeAreaType}
          />
          <FormInputField
            label="House Number"
            name="houseNumber"
            register={register}
            error={errors.houseNumber}
          />
          <FormInputField
            label="Building"
            name="building"
            register={register}
            error={errors.building}
          />
          <FormInputField
            label="Staircase"
            name="staircase"
            register={register}
            error={errors.staircase}
          />
          <FormInputField
            label="Floor"
            name="floor"
            register={register}
            error={errors.floor}
          />
          <FormInputField
            label="Door"
            name="door"
            register={register}
            error={errors.door}
          />
        </div>
      </section>

      {/* 💳 Payment Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Payment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInputField
            label="Salary (HUF)"
            name="salary"
            type="number"
            register={register}
            error={errors.salary}
          />
          <FormSelectField
            label="Payment method"
            options={paymentMethodOptions}
            name="paymentMethod"
            register={register}
          />

          <FormInputField
            label="Money Dispatch Address"
            name="moneyDispatchAddress"
            register={register}
            error={errors.moneyDispatchAddress}
          />
        </div>
      </section>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};
