"use client";

import { User, UserContextType, UserProviderProps } from "@/types/user";
import { createContext, useState } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
