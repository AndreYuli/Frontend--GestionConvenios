import { useState, useEffect, useRef } from "react";
import "../styles/menuPrincipalAdmin.css";
import logo from "../assets/UNACLOGO.png";
import {
  FiMenu,
  FiX,
  FiHome,
  FiLogOut,
  FiFilePlus,
  FiActivity,
  FiBook,
  FiCpu,
  FiBriefcase,
  FiUsers,
  FiArrowUpCircle, // 🔹 Icono volver arriba
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Convenios() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();
  const conveniosRef = useRef(null);

  // 🔹 Verificar sesión
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 🔹 Mostrar el botón al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Navegación
  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  // 🔹 Scroll suave a convenios
  const handleScrollToConvenios = () => {
    conveniosRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 Scroll arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const convenios = [
    { nombre: "Ciencias de la Salud", icon: <FiActivity />, color: "#667eea" },
    { nombre: "Teología y Religión", icon: <FiBook />, color: "#f093fb" },
    { nombre: "Ingeniería", icon: <FiCpu />, color: "#4facfe" },
    { nombre: "Ciencias Administrativas y Contables", icon: <FiBriefcase />, color: "#43e97b" },
    { nombre: "Ciencias Humanas y de la Educación", icon: <FiUsers />, color: "#fa709a" },
  ];

  return (
    <div className="convenios-container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="UNAC" className="logo" />
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {menuOpen && (
          <div className="menu-hamburguesa">
            <div className="menu-header">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
                className="menu-avatar"
              />
              <h4>{user?.username || user?.email || "Administrador"}</h4>
            </div>

            <ul>
              <li onClick={() => handleNavigate("/menuprincipal")}>
                <FiHome /> Inicio
              </li>
              <li onClick={() => handleNavigate("/agregarconvenio")}>
                <FiFilePlus /> Agregar convenios
              </li>
            </ul>

            <div className="menu-footer">
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
            Conectamos a nuestra comunidad universitaria con las mejores empresas e instituciones
            para crear oportunidades de crecimiento profesional y académico.
          </p>
          <button className="btn-explorar" onClick={handleScrollToConvenios}>
            Explorar convenios
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Convenios */}
      <section className="convenios-section" ref={conveniosRef}>
        <div className="section-header">
          <h3>Facultades con Convenios Activos</h3>
          <p>Explora las oportunidades disponibles en cada facultad</p>
        </div>

        <div className="convenios-grid">
          {convenios.map((convenio, index) => (
            <div
              key={index}
              className="convenio-card"
              style={{ "--card-color": convenio.color }}
            >
              <div className="convenio-icon">{convenio.icon}</div>
              <h4>{convenio.nombre}</h4>
              <button className="btn-ver-mas">Ver convenios</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔝 Botón Volver arriba */}
      <button
        className={`btn-scroll-top ${showScrollTop ? "show" : ""}`}
        onClick={scrollToTop}
        title="Volver arriba"
      >
        <FiArrowUpCircle size={38} />
      </button>
    </div>
  );
}

export default Convenios;
