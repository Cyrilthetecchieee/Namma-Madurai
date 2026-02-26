import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "citizen" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  selectRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("namma_madurai_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("namma_madurai_user", JSON.stringify(userData));
  };

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call - In production, use Firebase Auth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      avatar: email.substring(0, 2).toUpperCase(),
      role: null, // Will be set during role selection
    };
    
    saveUser(userData);
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulate Google Sign-In - In production, use Firebase Auth with Google provider
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: crypto.randomUUID(),
      name: "Demo User",
      email: "demo@nammamadurai.in",
      avatar: "DU",
      role: null,
    };
    
    saveUser(userData);
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call - In production, use Firebase Auth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: crypto.randomUUID(),
      name,
      email,
      avatar: name.substring(0, 2).toUpperCase(),
      role: null,
    };
    
    saveUser(userData);
    setIsLoading(false);
  };

  const selectRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      saveUser(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("namma_madurai_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        selectRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
