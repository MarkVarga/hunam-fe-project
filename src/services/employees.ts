import api from "@/lib/axios";
import { apiEndpoints } from "@/constants/api";
import { AllEmployeeResponse } from "@/services/types/employeeService";
import { EmployeeSubmissionData } from "@/components/EmployeeForm";
import { Employee } from "@/types/employee";

export const getAllEmployees = async (): Promise<AllEmployeeResponse> => {
  const response = await api.get(`${apiEndpoints.allEmployees}`);
  return response.data;
};

export const createEmployee = async (payload: EmployeeSubmissionData) => {
  const response = await api.post(`${apiEndpoints.createEmployee}`, payload);
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await api.get(`${apiEndpoints.getEmployeeById}/${id}`);
  return response.data;
};
