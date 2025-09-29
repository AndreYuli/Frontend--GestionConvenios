import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/login.css";
import logo from "../assets/logo.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: data.message,
          confirmButtonColor: "#667eea",
        });
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
          confirmButtonColor: "#667eea",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Servidor no disponible",
        text: "Verifica que el backend esté corriendo ",
        confirmButtonColor: "#667eea",
      });
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
