import express from "express";
import {
  listProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";

const router = express.Router();

// Rutas CRUD para productos
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
