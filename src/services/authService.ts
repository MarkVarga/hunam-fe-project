import api from "../lib/axios";
import { apiEndpoints } from "../constants/api";

type LoginPayload = {
  username: string;
  password: string;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post(`${apiEndpoints.login}`, payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(`${apiEndpoints.logout}`);
  return response.data;
};
