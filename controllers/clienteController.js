import Cliente from '../models/ClienteModel.js';

let clientes = [];
let nextId = 1;

export const crearCliente = async (req, res) => {
  try {
    const clienteData = req.body;
    const cliente = new Cliente(
      nextId++,
      clienteData.nombre,
      clienteData.apellido,
      clienteData.email,
      clienteData.telefono,
      clienteData.fechaNacimiento,
      clienteData.activo
    );
    
    clientes.push(cliente);
    
    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: cliente.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear cliente',
      error: error.message
    });
  }
};

export const obtenerClientes = async (req, res) => {
  try {
    const { activo, limite = 10, pagina = 1 } = req.query;
    
    let clientesFiltrados = [...clientes];
    
    if (activo !== undefined) {
      const esActivo = activo === 'true';
      clientesFiltrados = clientesFiltrados.filter(c => c.activo === esActivo);
    }
    
    const inicio = (pagina - 1) * limite;
    const fin = inicio + parseInt(limite);
    const clientesPaginados = clientesFiltrados.slice(inicio, fin);
    
    res.json({
      success: true,
      data: clientesPaginados.map(c => c.toJSON()),
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total: clientesFiltrados.length,
        totalPaginas: Math.ceil(clientesFiltrados.length / limite)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener clientes',
      error: error.message
    });
  }
};

export const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = clientes.find(c => c.id === parseInt(id));
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: cliente.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cliente',
      error: error.message
    });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(id));
    
    if (clienteIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    const cliente = clientes[clienteIndex];
    cliente.update(req.body);
    
    res.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: cliente.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar cliente',
      error: error.message
    });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(id));
    
    if (clienteIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    
    clientes.splice(clienteIndex, 1);
    
    res.json({
      success: true,
      message: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cliente',
      error: error.message
    });
  }
};

export const buscarClientes = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }
    
    const clientesEncontrados = clientes.filter(cliente => {
      const nombreCompleto = cliente.getNombreCompleto().toLowerCase();
      const email = cliente.email.toLowerCase();
      const telefono = cliente.telefono;
      
      return nombreCompleto.includes(q.toLowerCase()) ||
             email.includes(q.toLowerCase()) ||
             telefono.includes(q);
    });
    
    res.json({
      success: true,
      data: clientesEncontrados.map(c => c.toJSON()),
      total: clientesEncontrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar clientes',
      error: error.message
    });
  }
};
