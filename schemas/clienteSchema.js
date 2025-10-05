import Joi from 'joi';

export const clienteSchema = Joi.object({
  nombre: Joi.string().min(2).max(50).required(),
  apellido: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20).required(),
  fechaNacimiento: Joi.date().max('now').required(),
  activo: Joi.boolean().default(true)
});

export const clienteUpdateSchema = Joi.object({
  nombre: Joi.string().min(2).max(50),
  apellido: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20),
  fechaNacimiento: Joi.date().max('now'),
  activo: Joi.boolean()
});
