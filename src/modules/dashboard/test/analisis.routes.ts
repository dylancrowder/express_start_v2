import { Router } from "express";
import { AnalysisController } from "./analisis.controller";

const router = Router();

// Crear un análisis
router.post("/create", AnalysisController.createAnalysis);
router.get("/", AnalysisController.test);


export default router;
