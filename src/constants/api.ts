const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiEndpoints = {
  login: `${BASE_URL}/api/auth/login`,
  logout: `${BASE_URL}/api/auth/logout`,
  allEmployees: `${BASE_URL}/api/employees`,
  createEmployee: `${BASE_URL}/api/employees`,
  getEmployeeById: `${BASE_URL}/api/employees`,
};
