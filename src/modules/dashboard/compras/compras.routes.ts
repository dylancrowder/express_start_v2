import { Router } from "express";
import { ComprasController } from "./compras.controller";

const router = Router();

router.post("/create", ComprasController.createProducts);
router.get("/", ComprasController.getAllProducts);
router.get("/summary", ComprasController.getSummary);
router.get("/:id", ComprasController.getProductById);
router.put("/:id", ComprasController.updateProduct);
router.delete("/:id", ComprasController.deleteProduct);

export default router;
