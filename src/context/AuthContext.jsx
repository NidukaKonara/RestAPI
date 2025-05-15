import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      setUser(user);
      setToken(token);
      navigate("/"); // Redirect to homepage or dashboard
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      const { user } = res.data;
      setUser(user);
      navigate("/login"); // Optionally, redirect to login after registration
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
