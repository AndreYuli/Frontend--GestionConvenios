import { useState } from "react";
import "../styles/register.css";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas no coinciden",
        text: "Por favor, asegúrate de que ambas contraseñas sean iguales",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: data.message,
          confirmButtonColor: "#667eea",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
          confirmButtonColor: "#667eea",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Servidor no disponible",
        text: "Verifica que el backend esté corriendo",
        confirmButtonColor: "#667eea",
      });
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
          required
        />

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
