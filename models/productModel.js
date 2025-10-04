// Modelo de productos (almacenamiento en memoria)
// Provee funciones CRUD simples para uso en el controlador.

const products = [];
let nextId = 1;

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
