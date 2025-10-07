import Departamento from '../models/DepartamentoModel.js';

let departamentos = [];
let nextId = 1;

// ✅ Crear Departamento
export const crearDepartamento = async (req, res) => {
  try {
    const data = req.body;
    const departamento = new Departamento(
      nextId++,
      data.nombre,
      data.descripcion,
      data.codigo,
      data.ubicacion,
      data.telefonoContacto,
      data.activo
    );

    departamentos.push(departamento);

    res.status(201).json({
      success: true,
      message: 'Departamento creado exitosamente',
      data: departamento.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear departamento',
      error: error.message
    });
  }
};

// ✅ Obtener todos los departamentos (con paginación y filtro)
export const obtenerDepartamentos = async (req, res) => {
  try {
    const { activo, limite = 10, pagina = 1 } = req.query;

    let filtrados = [...departamentos];

    if (activo !== undefined) {
      const esActivo = activo === 'true';
      filtrados = filtrados.filter(d => d.activo === esActivo);
    }

    const inicio = (pagina - 1) * limite;
    const fin = inicio + parseInt(limite);
    const paginados = filtrados.slice(inicio, fin);

    res.json({
      success: true,
      data: paginados.map(d => d.toJSON()),
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total: filtrados.length,
        totalPaginas: Math.ceil(filtrados.length / limite)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener departamentos',
      error: error.message
    });
  }
};

// ✅ Obtener departamento por ID
export const obtenerDepartamentoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = departamentos.find(d => d.id === parseInt(id));

    if (!departamento) {
      return res.status(404).json({
        success: false,
        message: 'Departamento no encontrado'
      });
    }

    res.json({
      success: true,
      data: departamento.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener departamento',
      error: error.message
    });
  }
};

// ✅ Actualizar departamento
export const actualizarDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const index = departamentos.findIndex(d => d.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Departamento no encontrado'
      });
    }

    const departamento = departamentos[index];
    departamento.update(req.body);

    res.json({
      success: true,
      message: 'Departamento actualizado exitosamente',
      data: departamento.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar departamento',
      error: error.message
    });
  }
};

// ✅ Eliminar departamento
export const eliminarDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const index = departamentos.findIndex(d => d.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Departamento no encontrado'
      });
    }

    departamentos.splice(index, 1);

    res.json({
      success: true,
      message: 'Departamento eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar departamento',
      error: error.message
    });
  }
};

// ✅ Buscar departamentos (por nombre, código o ubicación)
export const buscarDepartamentos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }

    const encontrados = departamentos.filter(d => {
      const nombre = d.nombre.toLowerCase();
      const codigo = d.codigo.toLowerCase();
      const ubicacion = d.ubicacion ? d.ubicacion.toLowerCase() : '';

      return (
        nombre.includes(q.toLowerCase()) ||
        codigo.includes(q.toLowerCase()) ||
        ubicacion.includes(q.toLowerCase())
      );
    });

    res.json({
      success: true,
      data: encontrados.map(d => d.toJSON()),
      total: encontrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar departamentos',
      error: error.message
    });
  }
};
