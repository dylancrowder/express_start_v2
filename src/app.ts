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
import inventarioRoutes from "./modules/dashboard/inventary/inventary.routes";
/* import analysisRoutes from "./modules/dashboard/analisis/analisis.routes"; */
import exchangeRate from "./modules/dashboard/exchange/exchange.routes";
import { initMongo } from "./db/db_connect";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Inicializar MongoDB
initMongo().catch((err) => {
  console.error("Error inicializando Mongo:", err);
  process.exit(1);
});

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
app.use("/auth", authRoutes);
app.use("/inventory", authMiddleware, inventarioRoutes);
app.use("/exchange-rate", authMiddleware, exchangeRate);
/* app.use("/analisis", analysisRoutes); */

// documentacion
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas no encontradas
app.use(errorRoute);

// Manejo de errores
app.use(errorHandler);

export default app;
