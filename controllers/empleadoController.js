import Empleado from '../models/EmpleadoModel.js';
import { datosEmpleados } from '../data/datosEmpleados.js';

// Estado en memoria (similar a clientes)
let empleados = (datosEmpleados ?? []).map(Empleado.fromObject);
let nextId = empleados.length ? Math.max(...empleados.map(e => e.id)) + 1 : 1;

export const crearEmpleado = async (req, res) => {
  try {
    const data = req.body;

    // Evitar email duplicado
    const emailExiste = empleados.some(e => e.email.toLowerCase() === data.email.toLowerCase());
    if (emailExiste) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const empleado = new Empleado(
      nextId++,
      data.nombre,
      data.apellido,
      data.email,
      data.telefono,
      data.fechaNacimiento,
      data.activo,
      data.cargo,
      data.departamento,
      data.fechaContratacion,
      data.salario
    );

    empleados.push(empleado);

    res.status(201).json({
      success: true,
      message: 'Empleado creado exitosamente',
      data: empleado.toJSON()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear empleado', error: error.message });
  }
};

export const obtenerEmpleados = async (req, res) => {
  try {
    const { activo, departamento, cargo, limite = 10, pagina = 1 } = req.query;

    let filtrados = [...empleados];

    if (activo !== undefined) {
      const esActivo = activo === 'true';
      filtrados = filtrados.filter(e => e.activo === esActivo);
    }
    if (departamento) {
      filtrados = filtrados.filter(e => (e.departamento || '').toLowerCase().includes(departamento.toLowerCase()));
    }
    if (cargo) {
      filtrados = filtrados.filter(e => (e.cargo || '').toLowerCase().includes(cargo.toLowerCase()));
    }

    const inicio = (pagina - 1) * limite;
    const fin = inicio + parseInt(limite);
    const paginados = filtrados.slice(inicio, fin);

    res.json({
      success: true,
      data: paginados.map(e => e.toJSON()),
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total: filtrados.length,
        totalPaginas: Math.ceil(filtrados.length / limite)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener empleados', error: error.message });
  }
};

export const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = empleados.find(e => e.id === parseInt(id));

    if (!empleado) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }

    res.json({ success: true, data: empleado.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener empleado', error: error.message });
  }
};

export const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = empleados.findIndex(e => e.id === parseInt(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }

    // Si quiere cambiar email, validar duplicado
    if (req.body?.email) {
      const dup = empleados.some(e => e.email.toLowerCase() === req.body.email.toLowerCase() && e.id !== parseInt(id));
      if (dup) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado por otro empleado' });
      }
    }

    const empleado = empleados[idx];
    empleado.update(req.body);

    res.json({
      success: true,
      message: 'Empleado actualizado exitosamente',
      data: empleado.toJSON()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar empleado', error: error.message });
  }
};

export const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = empleados.findIndex(e => e.id === parseInt(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }

    empleados.splice(idx, 1);

    res.json({ success: true, message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar empleado', error: error.message });
  }
};

export const buscarEmpleados = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Parámetro de búsqueda requerido' });
    }

    const term = q.toLowerCase();
    const encontrados = empleados.filter((e) => {
      const nombreCompleto = e.getNombreCompleto().toLowerCase();
      return (
        nombreCompleto.includes(term) ||
        (e.email || '').toLowerCase().includes(term) ||
        (e.telefono || '').includes(q) ||
        (e.cargo || '').toLowerCase().includes(term) ||
        (e.departamento || '').toLowerCase().includes(term)
      );
    });

    res.json({
      success: true,
      data: encontrados.map(e => e.toJSON()),
      total: encontrados.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al buscar empleados', error: error.message });
  }
};
