import api from "axios";
import { apiEndpoints, BASE_URL } from "../constants/api";

type LoginPayload = {
  username: string;
  password: string;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post(`${BASE_URL}/${apiEndpoints.login}`, payload);
  return response.data;
};
