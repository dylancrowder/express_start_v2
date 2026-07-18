import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./documentation/swagger.config";
import { apiLimiter } from "./utilities/apiLimiter";

declare module "express-serve-static-core" {
  interface Request {
    user?: Record<string, unknown>;
  }
}

// Middlewares
import errorHandler from "./middlewares/error.middleware";
import errorRoute from "./middlewares/error.route";
import monitor from "./middlewares/monitor.middeware";

// Routes
import authRoutes from "./modules/auth/auth.routes";

 import test from "./modules/dashboard/test/analisis.routes"; 

import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Middlewares de seguridad y performance
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: ["https://app-gestion-kohl.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(compression());
app.use(bodyParser.json({ limit: "300kb" }));
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(monitor);

// Rutas
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Ruta protegida accesible!", user: req.user });
});
app.get("/", (req, res) => {
  res.json({ message: "hola!!" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/auth", authRoutes);

 app.use("/test", test); 

// documentacion
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas no encontradas
app.use(errorRoute);

// Manejo de errores
app.use(errorHandler);

export default app;
