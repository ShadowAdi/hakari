import express, { Request, Response } from "express";
import { db } from "../db/db.js";
import os from "os";

export const healthRouter = express.Router();

interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  service: {
    name: string;
    version: string;
    environment: string;
  };
  system: {
    platform: string;
    arch: string;
    nodeVersion: string;
    memory: {
      total: string;
      free: string;
      used: string;
      usagePercentage: string;
    };
    cpu: {
      cores: number;
      model: string;
      loadAverage: number[];
    };
  };
  database: {
    status: "connected" | "disconnected" | "error";
    responseTime?: number;
    error?: string;
  };
  checks: {
    api: boolean;
    database: boolean;
  };
}

healthRouter.get("/", async (request: Request, response: Response) => {
  const startTime = Date.now();
  
  try {
    // Check database connection
    let dbStatus: "connected" | "disconnected" | "error" = "error";
    let dbResponseTime: number | undefined;
    let dbError: string | undefined;

    try {
      const dbStartTime = Date.now();
      await db.execute("SELECT 1");
      dbResponseTime = Date.now() - dbStartTime;
      dbStatus = "connected";
    } catch (error) {
      dbStatus = "error";
      dbError = error instanceof Error ? error.message : "Unknown database error";
    }

    // Calculate memory usage
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

    // Get CPU information
    const cpus = os.cpus();
    const loadAverage = os.loadavg();

    // Determine overall health status
    let overallStatus: "healthy" | "degraded" | "unhealthy" = "healthy";
    if (dbStatus === "error") {
      overallStatus = "unhealthy";
    } else if (dbStatus === "disconnected" || (dbResponseTime && dbResponseTime > 1000)) {
      overallStatus = "degraded";
    }

    const healthCheckData: HealthCheckResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: {
        name: "hakari",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        memory: {
          total: `${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          free: `${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          used: `${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          usagePercentage: `${memoryUsagePercentage}%`,
        },
        cpu: {
          cores: cpus.length,
          model: cpus[0]?.model || "Unknown",
          loadAverage: loadAverage,
        },
      },
      database: {
        status: dbStatus,
        responseTime: dbResponseTime,
        error: dbError,
      },
      checks: {
        api: true,
        database: dbStatus === "connected",
      },
    };

    const statusCode = overallStatus === "healthy" ? 200 : overallStatus === "degraded" ? 200 : 503;

    return response.status(statusCode).json({
      success: overallStatus === "healthy",
      data: healthCheckData,
      responseTime: `${Date.now() - startTime}ms`,
    });
  } catch (error) {
    return response.status(503).json({
      success: false,
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Health check failed",
      responseTime: `${Date.now() - startTime}ms`,
    });
  }
});

healthRouter.get("/live", (request: Request, response: Response) => {
  return response.status(200).json({
    success: true,
    status: "alive",
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get("/ready", async (request: Request, response: Response) => {
  try {
    await db.execute("SELECT 1");
    return response.status(200).json({
      success: true,
      status: "ready",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return response.status(503).json({
      success: false,
      status: "not ready",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Database connection failed",
    });
  }
});