import mongoose from "mongoose";
import logger from "../utils/logger.js";

const mongooseConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce"
    );
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error(err, "MongoDB connection error");
    process.exit(1);
  }
};

export default mongooseConnect;
