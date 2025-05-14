import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.type";

// Extend Document to create a Mongoose-specific type
export interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Export the Mongoose model
const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
