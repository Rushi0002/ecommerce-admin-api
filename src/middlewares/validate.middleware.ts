import { Request, Response, NextFunction } from "express";
import logger from "utils/logger";
import { ZodError, ZodSchema, z } from "zod";

// Route param ID validation
const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
});

// Query param pagination validation
const queryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .refine((val) => !val || /^[1-9]\d*$/.test(val), {
      message: "Page must be a positive integer",
    }),
  limit: z
    .string()
    .optional()
    .refine((val) => !val || /^[1-9]\d*$/.test(val), {
      message: "Limit must be a positive integer",
    }),
});

interface ValidationOptions {
  validateParamsId?: boolean;
  validateQueryPagination?: boolean;
  querySchema?: ZodSchema; // Optional schema for complex filters
}

/**
 * Middleware for validating body, route param `id`, and pagination query params
 */
const validate = (schema?: ZodSchema | {}, options?: ValidationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate route param `:id` if requested
      if (options?.validateParamsId) {
        idParamSchema.parse(req.params);
      }

      // Validate pagination query params if requested
      if (options?.validateQueryPagination) {
        queryParamSchema.parse(req.query);
      }

      if (options?.querySchema) {
        options.querySchema.parse(req.query);
      }

      // Validate request body if schema provided
      if (schema && "parse" in schema && typeof schema.parse === "function") {
        (schema as ZodSchema).parse(req.body);
      }

      next();
    } catch (err) {
      logger.error(err, "Internal Server Error");
      if (err instanceof ZodError) {
        res.status(400).json({
          message: "Validation Error",
          errors: err.errors,
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
};

export default validate;
