import React, { useState } from "react";
import '../styles/menuPrincipal.css';
import logo from "../assets/logo.jpg";
import { FiBriefcase, FiUsers, FiAward, FiMenu, FiX } from "react-icons/fi";

function Convenios() {
  const [menuOpen, setMenuOpen] = useState(false);

  const convenios = [
    {
      nombre: "Ciencias de la Salud",
      icon: "🏥",
      color: "#667eea"
    },
    {
      nombre: "Teología y Religión",
      icon: "📚",
      color: "#f093fb"
    },
    {
      nombre: "Ingeniería",
      icon: "⚙️",
      color: "#4facfe"
    },
    {
      nombre: "Ciencias Administrativas y Contables",
      icon: "💼",
      color: "#43e97b"
    },
    {
      nombre: "Ciencias Humanas y de la Educación",
      icon: "🎓",
      color: "#fa709a"
    }
  ];

  return (
    <div className="convenios-container">
      {/* Header mejorado */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="UNAC" className="logo" />
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Hero section mejorado */}
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
        <div className="hero-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </section>

      {/* Convenios list mejorado */}
      <section className="convenios-section">
        <div className="section-header">
          <h3>Facultades con Convenios Activos</h3>
          <p>Explora las oportunidades disponibles en cada facultad</p>
        </div>

        <div className="convenios-grid">
          {convenios.map((convenio, index) => (
            <div
              key={index}
              className="convenio-card"
              style={{ '--card-color': convenio.color }}
            >
              <div className="convenio-icon">{convenio.icon}</div>
              <h4>{convenio.nombre}</h4>
              <button className="btn-ver-mas">
                Ver convenios
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats mejorado - AHORA DESPUÉS DE CONVENIOS */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiBriefcase />
          </div>
          <div className="stat-content">
            <h3>30+</h3>
            <p>Empresas Aliadas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>500+</h3>
            <p>Estudiantes Beneficiados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>42</h3>
            <p>Años de Experiencia</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>¿Necesitas más información?</h3>
          <p>Nuestro equipo está listo para ayudarte a encontrar el convenio perfecto</p>
          <button className="btn-contact">Contáctanos</button>
        </div>
      </section>
    </div>
  );
}

export default Convenios;