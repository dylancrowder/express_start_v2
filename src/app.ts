import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { swaggerDocs } from "./documentation/swagger.config";
import { apiLimiter } from "./utilities/apiLimiter";
import cookieParser from "cookie-parser";

//Middlewares
import errorHandler from "./middlewares/error.middleware";
import errorRoute from "./middlewares/error.route";
import monitor from "./middlewares/monitor.middeware";

// Routes
import authRoutes from "./modules/auth/auth.routes";
import comprasRoutes from "./modules/dashboard/compras/compras.routes";
import { initMongo } from "./db/db_connect";

const app = express();

initMongo().catch((err) => {
  console.error("Error inicializando Mongo:", err);
  process.exit(1);
});

// Configuración de middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//CORS

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

// Rutas específicas
app.use("/auth", authRoutes);
app.use("/compras", comprasRoutes);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//INICIO
app.get("/", (req, res) => {
  res.status(200).send(`EL USUARIO ES ${process.env.NODE_ENV}`);
});

// Manejo de rutas no encontradas
app.use(errorRoute);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
