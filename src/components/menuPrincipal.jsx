import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa esto
import '../styles/menuPrincipal.css';
import logo from "../assets/logo.jpg";
import { FiMenu, FiX, FiHome, FiUser, FiLogOut } from "react-icons/fi";

function Convenios() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // 👈 Inicializa el navegador

  // 🔹 Función para ir al login
  const handleLogout = () => {
    navigate("/login"); // 👈 Redirige al login
  };

  const convenios = [
    { nombre: "Ciencias de la Salud", icon: "🏥", color: "#667eea" },
    { nombre: "Teología y Religión", icon: "📚", color: "#f093fb" },
    { nombre: "Ingeniería", icon: "⚙️", color: "#4facfe" },
    { nombre: "Ciencias Administrativas y Contables", icon: "💼", color: "#43e97b" },
    { nombre: "Ciencias Humanas y de la Educación", icon: "🎓", color: "#fa709a" }
  ];

  return (
    <div className="convenios-container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="UNAC" className="logo" />
        </div>

        {/* Botón del menú hamburguesa */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menú hamburguesa */}
        {menuOpen && (
          <div className="menu-hamburguesa">
            <div className="menu-header">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
                className="menu-avatar"
              />
              <h4>Alejo💻</h4>
            </div>

            <ul>
              <li><FiHome /> Inicio</li>
            </ul>

            <div className="menu-footer">
              {/* 👇 Aquí agregamos la función */}
              <button className="btn-salir" onClick={handleLogout}>
                <FiLogOut /> Salir
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">✨ Conectando Talentos</span>
          <h2>Convenios Institucionales UNAC</h2>
          <p>
            Conectamos a nuestra comunidad universitaria con las mejores empresas
            e instituciones para crear oportunidades de crecimiento profesional y académico.
          </p>
          <button className="btn-explorar">
            Explorar convenios
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {/* Convenios */}
      <section className="convenios-section">
        <div className="section-header">
          <h3>Facultades con Convenios Activos</h3>
          <p>Explora las oportunidades disponibles en cada facultad</p>
        </div>

        <div className="convenios-grid">
          {convenios.map((convenio, index) => (
            <div key={index} className="convenio-card" style={{ '--card-color': convenio.color }}>
              <div className="convenio-icon">{convenio.icon}</div>
              <h4>{convenio.nombre}</h4>
              <button className="btn-ver-mas">Ver convenios</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Convenios;
