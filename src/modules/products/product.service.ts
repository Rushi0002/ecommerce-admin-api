import Product from "./product.model.js"; // Mongoose Product model
import { FilterParams, IProduct } from "./product.type.js"; // Product TypeScript types

// Create a new product
export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  try {
    const product = new Product(productData); // Create new product instance
    await product.save(); // Save the product to the database
    return product; // Return the created product
  } catch (error) {
    throw new Error("Error creating product: " + error);
  }
};

// Get all products

export const getAllProducts = async (
  query: FilterParams
): Promise<IProduct[]> => {
  const filters: Record<string, any> = {};

  if (query.category) filters.category = query.category;
  if (query.inStock) filters.inStock = query.inStock === "true";
  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
  }
  if (query.search) {
    filters.name = { $regex: query.search, $options: "i" }; // fuzzy search
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1> = {};
  if (query.sortBy && query.orderBy) {
    sort[query.sortBy] = query.orderBy === "asc" ? 1 : -1;
  }
  console.log("filters -->", filters);
  return Product.find(filters).skip(skip).limit(limit).sort(sort);
};

// Get a single product by ID
export const getProductById = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId); // Find product by ID
    return product; // Return the found product or null if not found
  } catch (error) {
    throw new Error("Error fetching product: " + error);
  }
};

// Update product by ID
export const updateProduct = async (
  productId: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    }); // Update the product
    return product; // Return the updated product
  } catch (error) {
    throw new Error("Error updating product: " + error);
  }
};

// Delete product by ID
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await Product.findByIdAndDelete(productId); // Delete the product by ID
  } catch (error) {
    throw new Error("Error deleting product: " + error);
  }
};
