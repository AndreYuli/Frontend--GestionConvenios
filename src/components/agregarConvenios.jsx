import React, { useState } from "react";
import "../styles/agregarConvenio.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FilePlus, ArrowLeft, XCircle } from "lucide-react";
import { createConvenio } from "../api/convenios"; // 🧩 conexión con backend

function AgregarConvenio() {
  const navigate = useNavigate();

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

  // Mapeo entre nombre y ID real en la base de datos
  const facultadMap = {
    "Ciencias de la Salud": 1,
    "Teología y Religión": 2,
    "Ingeniería": 3,
    "Ciencias Administrativas y Contables": 4,
    "Ciencias Humanas y de la Educación": 5,
  };

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

  const handleAgregar = async () => {
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

    try {
      // 🧠 Datos que enviaremos al backend
      const data = {
        id,
        nombre,
        descripcion: "Convenio registrado desde frontend",
        empresa_institucion: "UNAC Medellín",
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        estado,
        tipo_convenio: "Institucional",
        beneficios: "Prácticas, becas, investigación",
        requisitos: "Firma de compromiso",
        contacto_nombre: "Administrador UNAC",
        contacto_email: "admin@unac.edu.co",
        contacto_telefono: "3001234567",
        usuario_creador_id: 1,
        facultades_ids: [facultadMap[facultad]], // 👈 Traduce el nombre de facultad a su ID real
      };

      const res = await createConvenio(data);
      console.log("✅ Convenio creado:", res.data);

      Swal.fire({
        icon: "success",
        title: "Convenio creado con éxito",
        text: "El convenio se ha agregado correctamente.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Listo",
      }).then(() => {
        navigate("/menuprincipalAdmin");
      });

    } catch (error) {
      console.error("❌ Error al crear el convenio:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear el convenio",
        text: "Ocurrió un problema al enviar los datos al servidor.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleVolver = () => {
    navigate("/menuprincipalAdmin");
  };

  return (
    <div className="agregar-convenio-container">
      <h2>
        <FilePlus size={24} style={{ marginRight: "6px" }} />
        Agregar Convenio
      </h2>
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

        <div className="form-row">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Vista previa" className="preview-imagen" />
            <button className="btn-quitar-imagen" onClick={handleRemoveImage}>
              <XCircle size={16} style={{ marginRight: "6px" }} />
              Quitar imagen
            </button>
          </div>
        )}

        <button className="btn-agregar" onClick={handleAgregar}>
          <FilePlus size={18} style={{ marginRight: "6px" }} />
          Agregar Convenio
        </button>

        <button className="btn-volver" onClick={handleVolver}>
          <ArrowLeft size={18} style={{ marginRight: "6px" }} />
          Volver al menú principal
        </button>
      </div>
    </div>
  );
}

export default AgregarConvenio;
