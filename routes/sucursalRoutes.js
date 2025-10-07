// routes/sucursalRoutes.js
import express from 'express';
import {
  crearSucursal,
  obtenerSucursales,
  obtenerSucursalPorId,
  actualizarSucursal,
  eliminarSucursal,
  buscarSucursales
} from '../controllers/sucursalController.js';
import { sucursalSchema, sucursalUpdateSchema } from '../schemas/sucursalSchema.js';

const router = express.Router();

const validateSucursal = (req, res, next) => {
  const { error } = sucursalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de sucursal inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateSucursalUpdate = (req, res, next) => {
  const { error } = sucursalUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de actualización inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

router.post('/', validateSucursal, crearSucursal);
router.get('/', obtenerSucursales);
router.get('/buscar', buscarSucursales);
router.get('/:id', obtenerSucursalPorId);
router.put('/:id', validateSucursalUpdate, actualizarSucursal);
router.delete('/:id', eliminarSucursal);

export default router;
