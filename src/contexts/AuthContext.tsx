import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; isAdmin: boolean } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Static users
const users = [
  { email: "admin@example.com", password: "admin123", isAdmin: true },
  { email: "user@example.com", password: "user123", isAdmin: false },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(
    () => {
      const savedUser = localStorage.getItem("authUser");
      return savedUser ? JSON.parse(savedUser) : null;
    }
  );

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({ email: foundUser.email, isAdmin: foundUser.isAdmin });

      localStorage.setItem(
        "authUser",
        JSON.stringify({ email: foundUser.email, isAdmin: foundUser.isAdmin })
      );

      toast.success("Successfully logged in.");

      const previousPath = location.state?.from || '/dashboard';
    navigate(previousPath);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    toast("Logging out..."); 
    
    setTimeout(() => {
        setUser(null);
        localStorage.removeItem("authUser");

        if (location.pathname.startsWith("/dashboard")) {
            navigate("/");
        }
        
        toast.success("Successfully logged out");
    }, 2000); 
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
