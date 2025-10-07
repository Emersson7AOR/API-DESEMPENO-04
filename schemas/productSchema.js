// Esquema y validadores simples para productos
// No usa dependencias externas; devuelve { valid: boolean, errors: string[] }

/** Esquema JSON simple (informativo) */
export const createProductSchema = {
  type: "object",
  required: ["name", "price"],
  properties: {
    name: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
  },
};

export const updateProductSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
  },
};

export function validateCreateProduct(data) {
  const errors = [];
  if (!data || typeof data !== "object") {
    errors.push("El payload debe ser un objeto");
    return { valid: false, errors };
  }
  if (!data.name || typeof data.name !== "string") {
    errors.push("El campo 'name' es requerido y debe ser una cadena");
  }
  if (data.price === undefined || isNaN(Number(data.price))) {
    errors.push("El campo 'price' es requerido y debe ser numérico");
  } else if (Number(data.price) < 0) {
    errors.push("El campo 'price' debe ser mayor o igual a 0");
  }
  if (data.description !== undefined && typeof data.description !== "string") {
    errors.push("El campo 'description' debe ser una cadena");
  }
  return { valid: errors.length === 0, errors };
}

export function validateUpdateProduct(data) {
  const errors = [];
  if (!data || typeof data !== "object") {
    errors.push("El payload debe ser un objeto");
    return { valid: false, errors };
  }
  if (data.name !== undefined && typeof data.name !== "string") {
    errors.push("Si se proporciona, 'name' debe ser una cadena");
  }
  if (data.price !== undefined) {
    if (isNaN(Number(data.price))) {
      errors.push("Si se proporciona, 'price' debe ser numérico");
    } else if (Number(data.price) < 0) {
      errors.push("Si se proporciona, 'price' debe ser mayor o igual a 0");
    }
  }
  if (data.description !== undefined && typeof data.description !== "string") {
    errors.push("Si se proporciona, 'description' debe ser una cadena");
  }
  return { valid: errors.length === 0, errors };
}
