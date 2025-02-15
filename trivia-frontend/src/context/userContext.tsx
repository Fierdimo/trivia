import { User, UserContextType, UserProviderProps } from "@/types/user";
import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
