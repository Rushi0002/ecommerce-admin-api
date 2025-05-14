import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware: Enables CORS to allow requests from different origins (frontend/backend communication)
app.use(cors());

// Middleware: Parses incoming JSON payloads (body of POST/PUT requests)
app.use(express.json());

// Mount all API routes under the "/api" base path
app.use("/api", routes);

// Export the app instance for use in server.ts (entry point)
export default app;
