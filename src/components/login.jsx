import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import "../styles/login.css";
import logo from "../assets/logo.jpg";

function Login() {
  const navigate = useNavigate();
  const { signin, isAuthenticated, errors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Mostrar errores del contexto
  useEffect(() => {
    if (errors && errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: Array.isArray(errors) ? errors.join(', ') : errors,
        confirmButtonColor: "#667eea",
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signin({ email, password });
      
      // Si llega aquí, el login fue exitoso
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        confirmButtonColor: "#667eea",
      });
    } catch (error) {
      // Los errores se manejan en el contexto y se muestran arriba
      console.log("Error en login:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <img src={logo} alt="Logo UNAC" className="logo" />
        <h1 className="title">Bienvenido</h1>
        <p className="descripcion">
          Accede a tu cuenta para gestionar tus convenios.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Correo o Código Estudiantil</label>
          <input
            type="email"
            className="input"
            placeholder="ejemplo@unac.edu.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Contraseña</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            required
          />

          <button type="submit" className="button">
            Ingresar
          </button>
        </form>

        <p className="register">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
