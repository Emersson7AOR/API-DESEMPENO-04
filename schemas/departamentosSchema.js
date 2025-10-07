import Joi from 'joi';

export const departamentoSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  descripcion: Joi.string().max(255).optional(),
  codigo: Joi.string().alphanum().min(2).max(10).required(),
  ubicacion: Joi.string().max(100).optional(),
  telefonoContacto: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20).optional(),
  activo: Joi.boolean().default(true)
});

export const departamentoUpdateSchema = Joi.object({
  nombre: Joi.string().min(2).max(100),
  descripcion: Joi.string().max(255),
  codigo: Joi.string().alphanum().min(2).max(10),
  ubicacion: Joi.string().max(100),
  telefonoContacto: Joi.string().pattern(/^[0-9+\-\s()]+$/).min(8).max(20),
  activo: Joi.boolean()
});
