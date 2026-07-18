/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnalysisDTO } from "../../../interfaces/analysis.interface";
import AppError from "../../../utilities/error/appError";
import AnalysisModel, { AnalysisDocument } from "./analisis.schema";

export class AnalysisService {
  // CREAR ANÁLISIS
  static async addAnalysis(body: AnalysisDTO): Promise<AnalysisDocument> {
    try {
      const newAnalysis = await AnalysisModel.create(body);
      return await newAnalysis.save();
    } catch (error: unknown) {
      throw new AppError(
        "InternalServerError",
        500,
        error,
        "Error interno del servidor.",
        true
      );
    }
  }


}
