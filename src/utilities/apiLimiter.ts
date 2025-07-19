import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Demasiadas solicitudes, por favor intente de nuevo más tarde.",
  });
  