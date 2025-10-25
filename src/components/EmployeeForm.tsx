import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../schemas/employeeSchema";
import { useCreateEmployee } from "../services/hooks/useCreateEmployee";
import type { z } from "zod";
import { FormInputField } from "./FormInputField"; // your generic input component

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const { mutate } = useCreateEmployee();

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Submitted:", data);
    mutate(
      {
        ...data,
      },
      { onSuccess: () => console.log("success") },
    );
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
          <FormInputField<EmployeeFormData>
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
          <FormInputField<EmployeeFormData>
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
          <FormInputField<EmployeeFormData>
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <FormInputField<EmployeeFormData>
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone}
          />
          <FormInputField<EmployeeFormData>
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            error={errors.dateOfBirth}
          />
          <FormInputField<EmployeeFormData>
            label="Place of Birth"
            name="placeOfBirth"
            register={register}
            error={errors.placeOfBirth}
          />
          <FormInputField<EmployeeFormData>
            label="Mother’s First Name"
            name="mothersFirstName"
            register={register}
            error={errors.mothersFirstName}
          />
          <FormInputField<EmployeeFormData>
            label="Mother’s Last Name"
            name="mothersLastName"
            register={register}
            error={errors.mothersLastName}
          />
        </div>
        <select {...register("sex")} className="...">
          <option value="">Select</option>
          <option value={0}>Male</option>
          <option value={1}>Female</option>
          <option value={2}>Other</option>
        </select>
        <select {...register("education")} className="...">
          <option value="">Select</option>
          <option value={1}>Primary</option>
          <option value={2}>Secondary</option>
          <option value={3}>Vocational</option>
          <option value={4}>Bachelor’s</option>
          <option value={5}>Master’s</option>
          <option value={6}>Doctorate</option>
        </select>{" "}
      </section>

      {/* 🏠 Address Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Address Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInputField<EmployeeFormData>
            label="Country"
            name="country"
            register={register}
            error={errors.country}
          />
          <FormInputField<EmployeeFormData>
            label="City"
            name="city"
            register={register}
            error={errors.city}
          />
          <FormInputField<EmployeeFormData>
            label="Zip Code"
            name="zipCode"
            register={register}
            error={errors.zipCode}
          />
          <FormInputField<EmployeeFormData>
            label="Parcel Number"
            name="parcelNumber"
            register={register}
            error={errors.parcelNumber}
          />
          <FormInputField<EmployeeFormData>
            label="Administrative Area"
            name="administrativeArea"
            register={register}
            error={errors.administrativeArea}
          />
          <FormInputField<EmployeeFormData>
            label="Administrative Area Type"
            name="administrativeAreaType"
            register={register}
            error={errors.administrativeAreaType}
          />
          <FormInputField<EmployeeFormData>
            label="House Number"
            name="houseNumber"
            register={register}
            error={errors.houseNumber}
          />
          <FormInputField<EmployeeFormData>
            label="Building"
            name="building"
            register={register}
            error={errors.building}
          />
          <FormInputField<EmployeeFormData>
            label="Staircase"
            name="staircase"
            register={register}
            error={errors.staircase}
          />
          <FormInputField<EmployeeFormData>
            label="Floor"
            name="floor"
            register={register}
            error={errors.floor}
          />
          <FormInputField<EmployeeFormData>
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
          <FormInputField<EmployeeFormData>
            label="Salary (HUF)"
            name="salary"
            type="number"
            register={register}
            error={errors.salary}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              {...register("paymentMethod")}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="">Select</option>
              <option value={1}>Cash</option>
              <option value={2}>Bank Transfer</option>
              <option value={3}>PayPal</option>
            </select>
          </div>

          <FormInputField<EmployeeFormData>
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
