import { Request, Response, NextFunction } from "express";
import logger from "../utilities/pino.logger";

function errorRoute(req: Request, res: Response, next: NextFunction) {
  logger.info(`No se encontró la ruta ${req.originalUrl}`);

  res.status(404).json({
    error: "Página no encontrada",
    message: `No se encontró la ruta ${req.originalUrl}`,
  });
  next();
}

export default errorRoute;
