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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/menuprincipal");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (errors && errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: Array.isArray(errors) ? errors.join(", ") : errors,
        confirmButtonColor: "#667eea",
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signin({ email, password });

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        confirmButtonColor: "#667eea",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/menuprincipal");
      });
    } catch (error) {
      console.log("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-section">
          <img src={logo} alt="Logo UNAC" className="logo" />
        </div>

        <h1 className="title">Portal de Convenios</h1>
        <p className="subtitle">Universidad Adventista de Colombia</p>

        <div className="welcome">
          <h2>Bienvenido</h2>
          <p>Ingresa con tus credenciales institucionales</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario o Correo Institucional</label>
            <div className="input-container">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="ejemplo@unac.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-container">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="forgot-password-container">
            <a href="#" className="forgot-password" onClick={async (e) => {
              e.preventDefault();

              const { value: email } = await Swal.fire({
                title: 'Recuperar Contraseña',
                html: `
                  <p style="margin-bottom: 1rem; color: #64748b; font-size: 14px;">
                    Ingresa tu correo institucional y te enviaremos tu contraseña
                  </p>
                `,
                input: 'email',
                inputPlaceholder: 'ejemplo@unac.edu.co',
                inputAttributes: {
                  autocapitalize: 'off',
                  autocomplete: 'email'
                },
                showCancelButton: true,
                confirmButtonText: 'Recuperar contraseña',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#7888AA',
                cancelButtonColor: '#94a3b8',
                inputValidator: (value) => {
                  if (!value) {
                    return 'Por favor ingresa tu correo';
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Por favor ingresa un correo válido';
                  }
                }
              });

              if (email) {
                // Aquí deberías hacer la petición a tu backend
                // Por ahora simularemos el proceso
                Swal.fire({
                  title: 'Procesando...',
                  text: 'Enviando correo de recuperación',
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  }
                });

                // Simular petición al backend (reemplaza esto con tu API real)
                setTimeout(async () => {
                  try {
                    // AQUÍ DEBES HACER LA PETICIÓN A TU BACKEND
                    // const response = await fetch('/api/forgot-password', {
                    //   method: 'POST',
                    //   headers: { 'Content-Type': 'application/json' },
                    //   body: JSON.stringify({ email })
                    // });
                    // const data = await response.json();

                    // Simulación de éxito
                    Swal.fire({
                      icon: 'success',
                      title: '¡Correo enviado!',
                      html: `
                        <p style="color: #64748b; margin-bottom: 0.5rem;">
                          Se ha enviado un correo a <strong>${email}</strong>
                        </p>
                        <p style="color: #64748b; font-size: 14px;">
                          Revisa tu bandeja de entrada y sigue las instrucciones para recuperar tu contraseña.
                        </p>
                      `,
                      confirmButtonText: 'Entendido',
                      confirmButtonColor: '#7888AA'
                    });
                  } catch (error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'No se pudo enviar el correo. Por favor intenta nuevamente o contacta a IT.',
                      confirmButtonColor: '#7888AA'
                    });
                  }
                }, 1500);
              }
            }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="help">
          ¿Necesitas ayuda? Contacta al departamento de IT
        </p>
      </div>
    </div>
  );
}

export default Login;