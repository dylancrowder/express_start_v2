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
import { roleMiddleware } from "./middlewares/rolesMiddleware";
// Routes
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

//CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

// Configuración de middlewares
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"], // podés agregar los necesarios
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // sin 'unsafe-inline'
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"], // permite imágenes inline
      objectSrc: ["'none'"], // bloquea Flash y otros objetos
      connectSrc: ["'self'", "https://api.example.com"], // permite conexiones a tu API
      frameAncestors: ["'none'"], // bloquea el uso de iframes
    },
  })
);

// Configuración de middlewares
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json({ limit: "300kb" }));
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(monitor);

// Rutas específicas
app.use("/auth", authRoutes);
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejo de rutas no encontradas
app.use(errorRoute);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
