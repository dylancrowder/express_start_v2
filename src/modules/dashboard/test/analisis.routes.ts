import { Router } from "express";
import { AnalysisController } from "./analisis.controller";
import { upload } from "../../../middlewares/upload";

const router = Router();

// Crear un análisis
router.post("/create", AnalysisController.createAnalysis);
router.get("/", AnalysisController.test);
router.post(
    "/upload-pdf",
    upload.single("pdf"),
    AnalysisController.uploadPdf
);

export default router;
