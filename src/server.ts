import express, { Request, Response } from "express";
import { AppConnect } from "./config/AppConfig.js";
import { setupRoutes } from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server Started",
    success: true,
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      api: "/api/health",
    },
  });
});

// Setup all routes
setupRoutes(app);

// Start server
AppConnect(app);