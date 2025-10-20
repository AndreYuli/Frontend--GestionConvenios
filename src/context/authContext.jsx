import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import axios from "../api/axios";
import PropTypes from "prop-types";

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
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res.data; // permitir que el llamador reciba información del login
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setErrors(error.response.data.message);
      } else if (error.message) {
        setErrors(error.message);
      } else {
        setErrors("Error de conexión con el servidor");
      }
      throw error; // propagar para que el componente que llamó lo pueda manejar
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest(); // backend usa cookie para verificar

        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;