import { createContext } from "react";
import { User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
