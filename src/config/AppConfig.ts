import { Express } from "express";
import { logger } from "./Logger.js";
import { PORT } from "./DotenvConfig.js";
import "../db/db.js"

export const AppConnect = (app: Express) => {
  try {
    app.listen(PORT || 8080, () => {
      console.log(
        `Server started at PORT: ${
          PORT || 8080
        } and you can see here http://localhost:${PORT || 8080}`
      );
    });
  } catch (error) {
    logger.error(`Error in Starting the server at PORT: ${PORT || 8080}`);
    console.error(`Error in Starting the server at PORT: ${PORT || 8080}`);
  }
};