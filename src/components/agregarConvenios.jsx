import React, { useState } from "react";
import "../styles/agregarConvenio.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 👈 Importar SweetAlert2

function AgregarConvenio() {
  const navigate = useNavigate();

  const [convenios, setConvenios] = useState([]);
  const [nuevoConvenio, setNuevoConvenio] = useState({
    id: "",
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
    facultad: "",
    imagen: null,
  });

  const [preview, setPreview] = useState(null);

  const facultades = [
    "Ciencias de la Salud",
    "Teología y Religión",
    "Ingeniería",
    "Ciencias Administrativas y Contables",
    "Ciencias Humanas y de la Educación",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoConvenio({ ...nuevoConvenio, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoConvenio({ ...nuevoConvenio, imagen: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setNuevoConvenio({ ...nuevoConvenio, imagen: null });
    setPreview(null);
  };

  // 🔹 Agregar convenio con validaciones y alerta
  const handleAgregar = () => {
    const { id, nombre, fechaInicio, fechaFin, estado, facultad } = nuevoConvenio;

    if (!id || !nombre || !fechaInicio || !fechaFin || !estado || !facultad) {
      Swal.fire({
        icon: "error",
        title: "Faltan campos por completar",
        text: "Por favor llena todos los campos antes de continuar.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setConvenios([...convenios, nuevoConvenio]);
    setNuevoConvenio({
      id: "",
      nombre: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "",
      facultad: "",
      imagen: null,
    });
    setPreview(null);

    // 🔹 Mostrar alerta de éxito y redirigir al menú
    Swal.fire({
      icon: "success",
      title: "¡Convenio creado con éxito!",
      text: "El convenio se ha agregado correctamente.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Listo",
    }).then(() => {
      navigate("/menuprincipalAdmin"); // 👈 Redirige al menú principal del admin
    });
  };

  const handleVolver = () => {
    navigate("/menuprincipalAdmin");
  };

  return (
    <div className="agregar-convenio-container">
      <h2>📝 Agregar Convenio</h2>
      <p>Registra la información del nuevo convenio institucional</p>

      <div className="formulario-convenio">
        <div className="form-row">
          <input
            type="text"
            name="id"
            placeholder="ID del convenio"
            value={nuevoConvenio.id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del convenio"
            value={nuevoConvenio.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <select name="facultad" value={nuevoConvenio.facultad} onChange={handleChange}>
            <option value="">Selecciona Facultad</option>
            {facultades.map((fac, i) => (
              <option key={i} value={fac}>{fac}</option>
            ))}
          </select>

          <select name="estado" value={nuevoConvenio.estado} onChange={handleChange}>
            <option value="">Selecciona estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* 🔹 Fechas con etiquetas */}
        <div className="form-row">
          <div className="fecha-group">
            <label>Fecha de inicio:</label>
            <input
              type="date"
              name="fechaInicio"
              value={nuevoConvenio.fechaInicio}
              onChange={handleChange}
            />
          </div>

          <div className="fecha-group">
            <label>Fecha de fin:</label>
            <input
              type="date"
              name="fechaFin"
              value={nuevoConvenio.fechaFin}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Subir imagen */}
        <div className="form-row">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Vista previa */}
        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Vista previa" className="preview-imagen" />
            <button className="btn-quitar-imagen" onClick={handleRemoveImage}>
              ❌ Quitar imagen
            </button>
          </div>
        )}

        <button className="btn-agregar" onClick={handleAgregar}>
          ➕ Agregar Convenio
        </button>

        <button className="btn-volver" onClick={handleVolver}>
          ← Volver al menú principal
        </button>
      </div>
    </div>
  );
}

export default AgregarConvenio;
