import express from "express";
import {
  listProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../schemas/productSchema.js";

const router = express.Router();

// middlewares de validación
const validateProduct = (req, res, next) => {
  const { valid, errors } = validateCreateProduct(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Datos de producto inválidos",
      errors,
    });
  }
  next();
};

const validateProductUpdate = (req, res, next) => {
  const { valid, errors } = validateUpdateProduct(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Datos de actualización inválidos",
      errors,
    });
  }
  next();
};

// Rutas CRUD para productos
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", validateProduct, createProductHandler);
router.put("/:id", validateProductUpdate, updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
