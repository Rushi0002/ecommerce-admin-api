import { Router } from "express";
import validate from "middlewares/validate.middleware.js";
import {
  createProductSchema,
  productQuerySchema,
  updateProductSchema,
} from "./product.validation.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

const router = Router();

// Get all products
router.get(
  "/",
  validate(
    {},
    { validateQueryPagination: true, querySchema: productQuerySchema }
  ),
  getAllProducts
);

// Get product by ID
router.get("/:id", validate({}, { validateParamsId: true }), getProductById);

// Create a product
router.post("/", validate(createProductSchema), createProduct);

// Update product by ID
router.put(
  "/:id",
  validate(updateProductSchema, { validateParamsId: true }),
  updateProduct
);

// Delete product by ID
router.delete("/:id", validate({}, { validateParamsId: true }), deleteProduct);

export default router;
