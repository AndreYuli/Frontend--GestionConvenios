import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConvenios } from "../api/convenios";
import "../styles/agregarConvenio.css";
import { ArrowLeft } from "lucide-react";

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
  const navigate = useNavigate();

  // 🔍 Forzar el id a número limpio
  const facultadId = Number(String(idFacultad).trim());
  const nombreFacultad = facultadMap[facultadId] || "Facultad desconocida";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getConvenios();

        // 🔹 Filtrar convenios según la facultad del parámetro
        const filtrados = res.data.filter((conv) =>
          conv.convenio_facultades.some(
            (f) => f.facultad_id === facultadId
          )
        );

        setConvenios(filtrados);
      } catch (error) {
        console.error("❌ Error al cargar convenios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [facultadId]);

  return (
    <div className="agregar-convenio-container">
      {/* ✅ Título corregido y garantizado */}
      <h2>Convenios de {nombreFacultad}</h2>

      {loading ? (
        <p className="loading-text">Cargando convenios...</p>
      ) : convenios.length > 0 ? (
        <div className="convenio-list">
          {convenios.map((conv) => (
            <div key={conv.id} className="convenio-card">
              <h3>{conv.nombre}</h3>
              <p><strong>Empresa:</strong> {conv.empresa_institucion}</p>
              <p><strong>Inicio:</strong> {new Date(conv.fecha_inicio).toLocaleDateString()}</p>
              <p><strong>Fin:</strong> {new Date(conv.fecha_fin).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {conv.estado}</p>
              <p><strong>Contacto:</strong> {conv.contacto_nombre || "No especificado"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay convenios registrados para esta facultad.</p>
      )}

      <button className="btn-volver" onClick={() => navigate("/menuPrincipalAdmin")}>
        <ArrowLeft size={18} style={{ marginRight: "6px" }} />
        Volver al menú principal
      </button>
    </div>
  );
}

export default ConveniosPorFacultad;
