import express from "express";
import { ComprasController } from "./compras.controller";

const router = express.Router();

router.post("/create", ComprasController.register);

export default router;
