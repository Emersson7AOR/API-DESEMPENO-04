import {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

/**
 * Devuelve la lista de productos
 */
export function listProducts(req, res) {
  const items = getAll();
  res.json(items);
}

/**
 * Devuelve un producto por id
 */
export function getProduct(req, res) {
  const { id } = req.params;
  const product = getById(id);
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
}

/**
 * Crea un nuevo producto
 */
export function createProductHandler(req, res) {
  const { name, price, description } = req.body ?? {};

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "El campo 'name' es requerido y debe ser una cadena" });
  }
  if (price === undefined || isNaN(Number(price))) {
    return res
      .status(400)
      .json({ error: "El campo 'price' es requerido y debe ser numérico" });
  }

  const product = createProduct({ name, price: Number(price), description });
  return res.status(201).json(product);
}

/**
 * Actualiza un producto por id
 */
export function updateProductHandler(req, res) {
  const { id } = req.params;
  const { name, price, description } = req.body ?? {};

  // validación mínima: si price está presente, debe ser numérico
  if (price !== undefined && isNaN(Number(price))) {
    return res
      .status(400)
      .json({ error: "Si se proporciona 'price' debe ser numérico" });
  }

  const updated = updateProduct(id, {
    name,
    price: price !== undefined ? Number(price) : undefined,
    description,
  });
  if (!updated)
    return res.status(404).json({ error: "Producto no encontrado" });
  return res.json(updated);
}

/**
 * Elimina un producto por id
 */
export function deleteProductHandler(req, res) {
  const { id } = req.params;
  const ok = deleteProduct(id);
  if (!ok) return res.status(404).json({ error: "Producto no encontrado" });
  return res.status(204).send();
}
