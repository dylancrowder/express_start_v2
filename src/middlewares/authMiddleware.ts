/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extiende los tipos de Express para que `req.user` sea reconocido
declare module "express" {
  export interface Request {
    user?: any;
  }
}

/**
 * Middleware de autenticación con Bearer token
 * Usa `Authorization: Bearer <token>` en los headers
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Verifica que exista header y tenga formato Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
    return; // solo termina la ejecución, no retorna res
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica token con JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Guarda payload del usuario en req.user
    req.user = decoded;

    // Continua con la siguiente función/middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" + error });
    return; // termina ejecución
  }
};
