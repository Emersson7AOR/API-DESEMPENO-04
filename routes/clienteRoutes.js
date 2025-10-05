import express from 'express';
import {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  buscarClientes
} from '../controllers/clienteController.js';
import { clienteSchema, clienteUpdateSchema } from '../schemas/clienteSchema.js';

const router = express.Router();

const validateCliente = (req, res, next) => {
  const { error } = clienteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de cliente inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateClienteUpdate = (req, res, next) => {
  const { error } = clienteUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de actualización inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

router.post('/', validateCliente, crearCliente);
router.get('/', obtenerClientes);
router.get('/buscar', buscarClientes);
router.get('/:id', obtenerClientePorId);
router.put('/:id', validateClienteUpdate, actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;
