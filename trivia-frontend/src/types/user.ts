import { ReactNode } from "react";

type User = {
  id: string;
  email: string;
  role: string;
} | null;

type UserContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export type { User, UserContextType, UserProviderProps };
