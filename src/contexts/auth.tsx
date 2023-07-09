import { createContext, useState, PropsWithChildren } from "react";
import { User } from "../shared/interfaces/user.interface";

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  updateUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User | null) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
