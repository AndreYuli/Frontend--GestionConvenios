import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      // Manejo seguro de errores de CORS, red y validación
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Si es un array de errores de validación de Zod
        if (Array.isArray(errorData) || Array.isArray(errorData.details)) {
          const validationErrors = Array.isArray(errorData) ? errorData : errorData.details;
          setErrors(validationErrors);
        } 
        // Si tiene un mensaje específico
        else if (errorData.message) {
          setErrors(errorData.message);
        }
        // Si tiene error string directo
        else if (errorData.error) {
          setErrors(errorData.error);
        }
        else {
          setErrors("Error en el servidor");
        }
      } else if (error.message) {
        setErrors(error.message);
      } else {
        setErrors("Error de conexión con el servidor. Verifica que el backend esté corriendo y CORS configurado.");
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // Manejo seguro de errores de CORS o red
      if (error.response?.data?.message) {
        setErrors(error.response.data.message);
      } else if (error.message) {
        setErrors(error.message);
      } else {
        setErrors("Error de conexión con el servidor. Verifica que el backend esté corriendo y CORS configurado.");
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;