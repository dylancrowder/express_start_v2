import { Router } from "express";
import { AnalysisController } from "./analisis.controller";

const router = Router();

// Crear un análisis
router.post("/create", AnalysisController.createAnalysis);

// Obtener todos los análisis
router.get("/", AnalysisController.getAllAnalyses);

// Obtener resumen de análisis
router.get("/summary", AnalysisController.getSummary);

// Obtener un análisis por ID
router.get("/:id", AnalysisController.getAnalysisById);

// Actualizar un análisis
router.put("/:id", AnalysisController.updateAnalysis);

// Eliminar un análisis
router.delete("/:id", AnalysisController.deleteAnalysis);

export default router;
