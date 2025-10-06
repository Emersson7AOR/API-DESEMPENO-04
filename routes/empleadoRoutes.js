import express from 'express';
import {
  crearEmpleado,
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado,
  buscarEmpleados
} from '../controllers/empleadoController.js';
import { empleadoSchema, empleadoUpdateSchema } from '../schemas/empleadoSchema.js';

const router = express.Router();

const validateEmpleado = (req, res, next) => {
  const { error } = empleadoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de empleado inválidos',
      errors: error.details.map(d => d.message),
    });
  }
  next();
};

const validateEmpleadoUpdate = (req, res, next) => {
  const { error } = empleadoUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de actualización inválidos',
      errors: error.details.map(d => d.message),
    });
  }
  next();
};

router.post('/', validateEmpleado, crearEmpleado);
router.get('/', obtenerEmpleados);
router.get('/buscar', buscarEmpleados);
router.get('/:id', obtenerEmpleadoPorId);
router.put('/:id', validateEmpleadoUpdate, actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

export default router;
