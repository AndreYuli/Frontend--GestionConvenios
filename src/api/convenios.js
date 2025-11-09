import axios from "./axios";

// ✅ Obtener todos los convenios
export const getConvenios = () => axios.get("/convenios");

// ✅ Obtener un convenio por ID
export const getConvenioById = (id) => axios.get(`/convenios/${id}`);

// ✅ Crear un nuevo convenio
export const createConvenio = (data) => axios.post("/convenios", data);

// ✅ Actualizar un convenio
export const updateConvenio = (id, data) => axios.put(`/convenios/${id}`, data);

// ✅ Eliminar un convenio
export const deleteConvenio = (id) => axios.delete(`/convenios/${id}`);
