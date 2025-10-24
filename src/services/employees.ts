import api from "../lib/axios";
import { apiEndpoints } from "../constants/api";
import { AllEmployeeResponse } from "./types/employeeService";

export const getAllEmployees = async (): Promise<AllEmployeeResponse> => {
  const response = await api.get(`${apiEndpoints.allEmployees}`);
  return response.data;
};
