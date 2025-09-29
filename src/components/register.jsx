import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import "../styles/register.css";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const { signup, isAuthenticated, errors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Mostrar errores del contexto con mejor formato
  useEffect(() => {
    if (errors && errors.length > 0) {
      let errorMessage = "";
      
      if (typeof errors === "string") {
        errorMessage = errors;
      } else if (Array.isArray(errors)) {
        errorMessage = errors.map(err => {
          if (typeof err === "object" && err.message) {
            return err.message;
          }
          return err;
        }).join('\n');
      }
      
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        html: errorMessage.replace(/\n/g, '<br>'),
        confirmButtonColor: "#667eea",
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del lado del cliente
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas no coinciden",
        text: "Por favor, asegúrate de que ambas contraseñas sean iguales",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 8 caracteres",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    // Validar complejidad de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña no válida",
        html: "La contraseña debe contener al menos:<br>• 1 letra minúscula<br>• 1 letra mayúscula<br>• 1 número",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    try {
      await signup({ email, password, confirmPassword });
      
      // Si llega aquí, el registro fue exitoso
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Te has registrado correctamente y has iniciado sesión",
        confirmButtonColor: "#667eea",
      });
    } catch (error) {
      // Los errores se manejan en el contexto y se muestran arriba
      console.log("Error en registro:", error);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo UNAC" className="logo" />
      <h1 className="title">Regístrate</h1>
      <p className="descripcion">Completa los campos para gestionar tus convenios.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">Correo o Código Estudiantil</label>
        <input
          type="email"
          className="input"
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
          placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
          required
        />
        <small style={{color: '#666', fontSize: '0.8rem', marginTop: '4px', display: 'block'}}>
          Debe contener: mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número
        </small>

        <label className="label">Confirmar Contraseña</label>
        <input
          type="password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="button">
          Registrarse
        </button>
      </form>

      <p className="register">
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Register;
