import Joi from 'joi';

export const empleadoSchema = Joi.object({
  nombre: Joi.string().min(2).max(50).required(),
  apellido: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20).required(),
  fechaNacimiento: Joi.date().max('now').required(),
  activo: Joi.boolean().default(true),
  cargo: Joi.string().min(2).max(60).required(),
  departamento: Joi.string().min(2).max(60).required(),
  fechaContratacion: Joi.date().max('now').default(() => new Date(), 'now'),
  salario: Joi.number().min(0).default(0)
});

export const empleadoUpdateSchema = Joi.object({
  nombre: Joi.string().min(2).max(50),
  apellido: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20),
  fechaNacimiento: Joi.date().max('now'),
  activo: Joi.boolean(),
  cargo: Joi.string().min(2).max(60),
  departamento: Joi.string().min(2).max(60),
  fechaContratacion: Joi.date().max('now'),
  salario: Joi.number().min(0)
});
