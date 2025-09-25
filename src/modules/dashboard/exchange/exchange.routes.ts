import { Router } from "express";
import { ExchangeRateController } from "./exchange.controller";

const router = Router();

// Crear un análisis
router.post("/create", ExchangeRateController.createExchangeRate);

// Editar un análisis
router.put("/update", ExchangeRateController.updateExchangeRate);

// Obtener el análisis del usuario
router.get("/", ExchangeRateController.getExchangeRate);

export default router;
