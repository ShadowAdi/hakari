import { Express } from "express";
import { healthRouter } from "./health.route.js";

export const setupRoutes = (app: Express) => {
    app.use(healthRouter)
}