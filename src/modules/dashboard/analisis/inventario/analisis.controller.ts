import { NextFunction, Request, Response } from "express";

import { AnalysisService } from "./analisis.model";
import AppError from "../../../../utilities/error/appError";
import { createAnalysisJoi } from "../../../../utilities/joi";

export class AnalysisController {
  // CREAR ANÁLISIS
  static createAnalysis = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error, value } = createAnalysisJoi.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      if (error) {
        throw new AppError(
          "ValidationError",
          400,
          error,
          "Datos inválidos. Por favor, revisa los campos del análisis.",
          true
        );
      }

      // 👇 simulando userId (lo ideal sería sacarlo del auth)
      const userId = "68c0540439042912f6fd5ee4";

      const bodySend = {
        ...value,
        userId,
      };

      const newAnalysis = await AnalysisService.addAnalysis(bodySend);
      res.status(201).json(newAnalysis);
    } catch (err) {
      next(err);
    }
  };

  // OBTENER TODOS LOS ANÁLISIS
  static getAllAnalyses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const analyses = await AnalysisService.getAllAnalyses();
      res.status(200).json(analyses);
    } catch (err) {
      next(err);
    }
  };

  // OBTENER ANÁLISIS POR ID
  static getAnalysisById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const analysis = await AnalysisService.getAnalysisById(id);

      if (!analysis) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Análisis no encontrado",
          true
        );
      }

      res.status(200).json(analysis);
    } catch (err) {
      next(err);
    }
  };

  // ACTUALIZAR ANÁLISIS
  static updateAnalysis = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const { error, value } = createAnalysisJoi.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      if (error) {
        throw new AppError(
          "ValidationError",
          400,
          error,
          "Datos inválidos. Por favor, revisa los campos del análisis.",
          true
        );
      }

      const updatedAnalysis = await AnalysisService.updateAnalysis(id, value);

      if (!updatedAnalysis) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Análisis no encontrado",
          true
        );
      }

      res.status(200).json(updatedAnalysis);
    } catch (err) {
      next(err);
    }
  };

  // ELIMINAR ANÁLISIS
  static deleteAnalysis = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await AnalysisService.deleteAnalysis(id);

      if (!deleted) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Análisis no encontrado",
          true
        );
      }

      res.status(200).json({ message: "Análisis eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  };

  // RESUMEN DE ANÁLISIS
  static getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const summary = await AnalysisService.getSummary();
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  };
}
