// schemas/sucursalSchema.js
import Joi from 'joi';

export const sucursalSchema = Joi.object({
  nombre: Joi.string().min(2).max(50).required(),
  direccion: Joi.string().min(5).max(200).required(),
  ciudad: Joi.string().min(2).max(100).required(),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20).required(),
  horario: Joi.string().pattern(/^[0-9:\s\-]+$/).min(3).max(100).allow('', null),
  activo: Joi.boolean().default(true)
});

export const sucursalUpdateSchema = Joi.object({
  nombre: Joi.string().min(2).max(50),
  direccion: Joi.string().min(5).max(200),
  ciudad: Joi.string().min(2).max(100),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20),
  horario: Joi.string().pattern(/^[0-9:\s\-]+$/).min(3).max(100).allow('', null),
  activo: Joi.boolean()
});
