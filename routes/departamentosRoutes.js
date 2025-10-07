import express from 'express';
import {
  crearDepartamento,
  obtenerDepartamentos,
  obtenerDepartamentoPorId,
  actualizarDepartamento,
  eliminarDepartamento,
  buscarDepartamentos
} from '../controllers/departamentoController.js';
import { departamentoSchema, departamentoUpdateSchema } from '../schemas/departamentoSchema.js';

const router = express.Router();

// ✅ Middleware de validación para creación
const validateDepartamento = (req, res, next) => {
  const { error } = departamentoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de departamento inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

// ✅ Middleware de validación para actualización
const validateDepartamentoUpdate = (req, res, next) => {
  const { error } = departamentoUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de actualización de departamento inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

// ✅ Rutas del módulo Departamento
router.post('/', validateDepartamento, crearDepartamento);
router.get('/', obtenerDepartamentos);
router.get('/buscar', buscarDepartamentos);
router.get('/:id', obtenerDepartamentoPorId);
router.put('/:id', validateDepartamentoUpdate, actualizarDepartamento);
router.delete('/:id', eliminarDepartamento);

export default router;
