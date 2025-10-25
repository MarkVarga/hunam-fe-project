import api from "@/lib/axios";
import { apiEndpoints } from "@/constants/api";
import { AllEmployeeResponse } from "@/services/types/employeeService";
import { EmployeeFormData } from "@/components/EmployeeForm";

export const getAllEmployees = async (): Promise<AllEmployeeResponse> => {
  const response = await api.get(`${apiEndpoints.allEmployees}`);
  return response.data;
};

export const createEmployee = async (payload: EmployeeFormData) => {
  const response = await api.post(`${apiEndpoints.createEmployee}`, payload);
  return response.data;
};
