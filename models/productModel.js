// Modelo de productos (almacenamiento en memoria)
// Provee funciones CRUD simples para uso en el controlador.

import { datosProductos } from "../scripts/datosProductos.js";

const products = [];
let nextId = 1;

// Inicializar con datos de ejemplo si existen
if (Array.isArray(datosProductos) && datosProductos.length > 0) {
  for (const item of datosProductos) {
    const product = {
      id: String(item.id ?? nextId++),
      name: item.name ?? "",
      price: Number(item.price ?? 0),
      description: item.description ?? "",
      // campos adicionales que pueden ser útiles pero no obligatorios
      stock: item.stock ?? 0,
      activo: item.activo ?? true,
      fechaCreacion: item.fechaCreacion ?? item.createdAt ?? null,
      fechaActualizacion: item.fechaActualizacion ?? item.updatedAt ?? null,
    };
    products.push(product);
  }
  // ajustar nextId al mayor + 1
  const maxId = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  nextId = maxId + 1;
}

/**
 * Devuelve todos los productos
 * @returns {Array}
 */
export function getAll() {
  return products;
}

/**
 * Busca un producto por id
 * @param {string|number} id
 * @returns {object|null}
 */
export function getById(id) {
  const key = String(id);
  return products.find((p) => String(p.id) === key) || null;
}

/**
 * Crea un nuevo producto
 * @param {{name:string, price:number, description?:string}} data
 * @returns {object} producto creado
 */
export function createProduct(data) {
  const product = {
    id: String(nextId++),
    name: data?.name ?? "",
    price: Number(data?.price ?? 0),
    description: data?.description ?? "",
    stock: data?.stock ?? 0,
    activo: data?.activo ?? true,
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
  };
  products.push(product);
  return product;
}

/**
 * Actualiza un producto por id
 * @param {string|number} id
 * @param {{name?:string, price?:number, description?:string}} data
 * @returns {object|null} producto actualizado o null si no existe
 */
export function updateProduct(id, data) {
  const product = getById(id);
  if (!product) return null;
  if (data?.name !== undefined) product.name = data.name;
  if (data?.price !== undefined) product.price = Number(data.price);
  if (data?.description !== undefined) product.description = data.description;
  if (data?.stock !== undefined) product.stock = Number(data.stock);
  if (data?.activo !== undefined) product.activo = data.activo;
  product.fechaActualizacion = new Date().toISOString();
  return product;
}

/**
 * Elimina un producto por id
 * @param {string|number} id
 * @returns {boolean} true si fue eliminado, false si no existe
 */
export function deleteProduct(id) {
  const key = String(id);
  const idx = products.findIndex((p) => String(p.id) === key);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}
