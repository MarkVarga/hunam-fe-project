import { Employee } from "../../types/employee";

export type AllEmployeeResponse = {
  data: Employee[];
  total: number;
};
