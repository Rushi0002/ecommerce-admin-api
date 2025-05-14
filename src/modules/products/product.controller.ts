import { Request, Response } from "express";
import * as productService from "./product.service.js";
import { FilterParams } from "./product.type.js";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filters = req.query as unknown as FilterParams;
    const products = await productService.getAllProducts(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await productService.deleteProduct(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
