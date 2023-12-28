import { createContext, useState, PropsWithChildren, useEffect } from "react";
import { User } from "../shared/interfaces/user.interface";

interface UserContextData {
  isAuthenticated: boolean;
  user: User | null;
  updateUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User | null) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ isAuthenticated: !!user, user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
