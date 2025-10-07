// controllers/sucursalController.js
import Sucursal from '../models/SucursalModel.js';

/**
 * Storage en memoria (mismo patrón que Cliente)
 * Si en el futuro migras a DB, sustituir estas operaciones por llamadas a la DB.
 */
let sucursales = [];
let nextId = 1;

/**
 * Normaliza / sanitiza datos de entrada para una sucursal
 * - trim de strings
 * - telefono: trim
 * - horario: '' por defecto
 * - activo: true por defecto
 */
function normalizeSucursalPayload(payload) {
  const normalized = {
    nombre: payload.nombre ? String(payload.nombre).trim() : '',
    direccion: payload.direccion ? String(payload.direccion).trim() : '',
    ciudad: payload.ciudad ? String(payload.ciudad).trim() : '',
    telefono: payload.telefono ? String(payload.telefono).trim() : '',
    horario: payload.horario ? String(payload.horario).trim() : '',
    activo: typeof payload.activo === 'boolean' ? payload.activo : true
  };

  // Si telefono contiene espacios innecesarios, los normalizamos (pero permitimos +, -, (), espacios)
  normalized.telefono = normalized.telefono.replace(/\s{2,}/g, ' ').trim();

  // Asegurar horario mínimo (ej: si vino vacio, lo dejamos '')
  if (!normalized.horario) normalized.horario = '';

  return normalized;
}

/**
 * Crear sucursal
 */
export const crearSucursal = async (req, res) => {
  try {
    // Normalizar payload (las rutas ya validan con Joi, esto sólo estandariza)
    const payload = normalizeSucursalPayload(req.body);

    const sucursal = new Sucursal(
      nextId++,
      payload.nombre,
      payload.direccion,
      payload.ciudad,
      payload.telefono,
      payload.horario,
      payload.activo
    );

    sucursales.push(sucursal);

    res.status(201).json({
      success: true,
      message: 'Sucursal creada exitosamente',
      data: sucursal.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear sucursal',
      error: error.message
    });
  }
};

/**
 * Listar sucursales (filtros, paginación)
 */
export const obtenerSucursales = async (req, res) => {
  try {
    const { activo, limite = 10, pagina = 1 } = req.query;

    let resultados = [...sucursales];

    if (activo !== undefined) {
      const esActivo = String(activo) === 'true';
      resultados = resultados.filter(s => s.activo === esActivo);
    }

    const inicio = (Number(pagina) - 1) * Number(limite);
    const fin = inicio + Number(limite);

    const paginadas = resultados.slice(inicio, fin);

    res.json({
      success: true,
      data: paginadas.map(s => s.toJSON()),
      paginacion: {
        pagina: Number(pagina),
        limite: Number(limite),
        total: resultados.length,
        totalPaginas: Math.ceil(resultados.length / Number(limite) || 1)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sucursales',
      error: error.message
    });
  }
};

/**
 * Obtener sucursal por id
 */
export const obtenerSucursalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = sucursales.find(s => s.id === Number(id));

    if (!sucursal) {
      return res.status(404).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    res.json({
      success: true,
      data: sucursal.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sucursal',
      error: error.message
    });
  }
};

/**
 * Actualizar sucursal
 */
export const actualizarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = sucursales.findIndex(s => s.id === Number(id));

    if (idx === -1) {
      return res.status(404).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    // Normalizar payload de actualización (permitimos campos parciales)
    const normalized = normalizeSucursalPayload({
      ...sucursales[idx].toJSON(),
      ...req.body
    });

    // Usar update del modelo para mantener consistencia
    sucursales[idx].update(normalized);

    res.json({
      success: true,
      message: 'Sucursal actualizada exitosamente',
      data: sucursales[idx].toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar sucursal',
      error: error.message
    });
  }
};

/**
 * Eliminar sucursal
 */
export const eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = sucursales.findIndex(s => s.id === Number(id));

    if (idx === -1) {
      return res.status(404).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    sucursales.splice(idx, 1);

    res.json({
      success: true,
      message: 'Sucursal eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar sucursal',
      error: error.message
    });
  }
};

/**
 * Buscar sucursales por texto (q)
 */
export const buscarSucursales = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }

    const query = String(q).toLowerCase().trim();

    const encontrados = sucursales.filter(s => {
      const nombre = (s.nombre || '').toLowerCase();
      const direccion = (s.direccion || '').toLowerCase();
      const ciudad = (s.ciudad || '').toLowerCase();
      const telefono = (s.telefono || '').toLowerCase();
      return (
        nombre.includes(query) ||
        direccion.includes(query) ||
        ciudad.includes(query) ||
        telefono.includes(query)
      );
    });

    res.json({
      success: true,
      data: encontrados.map(s => s.toJSON()),
      total: encontrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar sucursales',
      error: error.message
    });
  }
};
