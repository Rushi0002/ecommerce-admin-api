import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().optional().default(0),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().optional(),
});

export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.string().regex(/^\d+$/, "Must be a number").optional(),
  maxPrice: z.string().regex(/^\d+$/, "Must be a number").optional(),
  inStock: z.enum(["true", "false"]).optional(),
  sortBy: z.enum(["price", "name", "createdAt"]).optional(),
  orderBy: z.enum(["asc", "desc"]).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
});
