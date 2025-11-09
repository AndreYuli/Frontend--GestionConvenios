import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConvenios, updateConvenio, deleteConvenio } from "../api/convenios";
import "../styles/agregarConvenio.css";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// 🔹 Mapa de IDs a nombres de facultad
const facultadMap = {
  1: "Ciencias de la Salud",
  2: "Teología y Religión",
  3: "Ingeniería",
  4: "Ciencias Administrativas y Contables",
  5: "Ciencias Humanas y de la Educación",
};

function ConveniosPorFacultad() {
  const { idFacultad } = useParams();
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const facultadId = Number(String(idFacultad).trim());
  const nombreFacultad = facultadMap[facultadId] || "Facultad desconocida";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getConvenios();
        const filtrados = res.data.filter((conv) =>
          conv.convenio_facultades.some((f) => f.facultad_id === facultadId)
        );
        setConvenios(filtrados);
      } catch (error) {
        console.error("❌ Error al cargar convenios:", error);
        MySwal.fire("Error", "No se pudo cargar los convenios.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [facultadId]);

  // 🔹 Seleccionar o deseleccionar convenio
  const handleCardClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // 🔹 Eliminar convenio
  const handleDelete = async (conv) => {
    const result = await MySwal.fire({
      title: `Eliminar convenio`,
      text: `¿Estás seguro de eliminar el convenio "${conv.nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteConvenio(conv.id);
        setConvenios((prev) => prev.filter((c) => c.id !== conv.id));
        setSelectedId(null);
        MySwal.fire("Eliminado", "El convenio fue eliminado correctamente.", "success");
      } catch (error) {
        console.error("Error al eliminar:", error);
        MySwal.fire("Error", "No se pudo eliminar el convenio.", "error");
      }
    }
  };

  // 🔹 Editar convenio
  const handleEdit = async (conv) => {
    const { value: formValues } = await MySwal.fire({
      title: `Editar convenio`,
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${(conv.nombre || "")
          .replace(/"/g, "&quot;")}">
        <input id="swal-empresa" class="swal2-input" placeholder="Empresa / Institución" value="${(conv.empresa_institucion || "")
          .replace(/"/g, "&quot;")}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const nombre = document.getElementById("swal-nombre").value.trim();
        const empresa = document.getElementById("swal-empresa").value.trim();
        if (!nombre) MySwal.showValidationMessage("El nombre es obligatorio");
        return { nombre, empresa };
      },
    });

    if (!formValues) return;

    try {
      const payload = {
        nombre: formValues.nombre,
        empresa_institucion: formValues.empresa,
      };
      const res = await updateConvenio(conv.id, payload);
      setConvenios((prev) =>
        prev.map((c) => (c.id === conv.id ? { ...c, ...res.data } : c))
      );
      setSelectedId(null);
      MySwal.fire("Actualizado", "El convenio fue actualizado correctamente.", "success");
    } catch (error) {
      console.error("Error al actualizar:", error);
      MySwal.fire("Error", "No se pudo actualizar el convenio.", "error");
    }
  };

  return (
    <div className="agregar-convenio-container">
      <h2>Convenios de {nombreFacultad}</h2>

      {loading ? (
        <p className="loading-text">Cargando convenios...</p>
      ) : convenios.length > 0 ? (
        <div className="convenio-list">
          {convenios.map((conv) => {
            const isSelected = selectedId === conv.id;
            return (
              <div
                key={conv.id}
                className={`convenio-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleCardClick(conv.id)}
              >
                {/* ✅ CONTENIDO DEL CONVENIO */}
                <div className="card-text">
                  <h3>{conv.nombre}</h3>
                  <p>
                    <strong>Empresa:</strong> {conv.empresa_institucion}
                  </p>
                  <p>
                    <strong>Inicio:</strong>{" "}
                    {conv.fecha_inicio
                      ? new Date(conv.fecha_inicio).toLocaleDateString()
                      : "No definido"}
                  </p>
                  <p>
                    <strong>Fin:</strong>{" "}
                    {conv.fecha_fin
                      ? new Date(conv.fecha_fin).toLocaleDateString()
                      : "No definido"}
                  </p>
                  <p>
                    <strong>Estado:</strong> {conv.estado}
                  </p>
                  <p>
                    <strong>Contacto:</strong>{" "}
                    {conv.contacto_nombre || "No especificado"}
                  </p>
                </div>

                {/* ✅ BOTONES DEBAJO DEL CONTACTO */}
                {isSelected && (
                  <div
                    className="convenio-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn-editar"
                      onClick={() => handleEdit(conv)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleDelete(conv)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay convenios registrados para esta facultad.</p>
      )}

      <button
        className="btn-volver"
        onClick={() => navigate("/menuPrincipalAdmin")}
      >
        <ArrowLeft size={18} style={{ marginRight: "6px" }} />
        Volver al menú principal
      </button>
    </div>
  );
}

export default ConveniosPorFacultad;
