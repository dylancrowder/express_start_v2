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
import comprasRoutes from "./modules/dashboard/compras/compras.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

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
//CORS

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://express-start-v2-iihfdbjjh-dylancrowders-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(cors(corsOptions));
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
  res.status(200).send("Welcome to the API!");
});

// Manejo de rutas no encontradas
app.use(errorRoute);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
