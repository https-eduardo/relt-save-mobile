import { createContext, useState, PropsWithChildren } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  user: any | null;
  updateUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<object | null>({
    given_name: "Eduardo",
    picture:
      "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png",
  });

  function updateUser(user: any) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
