import { NextFunction, Request, Response } from "express";

import { AnalysisService } from "./analisis.model";
import { createAnalysisJoi } from "../../../utilities/joi";
import AppError from "../../../utilities/error/appError";
import cloudinary from "../../../utilities/clouinary";
import { Readable } from "node:stream";
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





  static test = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await cloudinary.api.ping();

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };



  //endpoitn  de carga
  static uploadPdf = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          ok: false,
          message: "No se envió ningún archivo.",
        });
        return;
      }

      const file = req.file;
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "pdfs",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        Readable.from(file.buffer).pipe(stream);
      });

      res.status(200).json({
        ok: true,
        url: result.secure_url,
        publicId: result.public_id,
        originalName: file.originalname,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        ok: false,
        message: "Error al subir el PDF.",
      });
    }
  };


}
