import api from "../lib/axios";
import { apiEndpoints } from "../constants/api";

export const getAllEmployees = async () => {
  const response = await api.get(`${apiEndpoints.allEmployees}`);
  return response.data;
};
