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

  // OBTENER TODOS LOS ANÁLISIS
  static async getAllAnalyses(): Promise<AnalysisDocument[]> {
    return AnalysisModel.find();
  }

  // OBTENER POR ID
  static async getAnalysisById(id: string): Promise<AnalysisDocument | null> {
    return AnalysisModel.findById(id);
  }

  // ACTUALIZAR ANÁLISIS
  static async updateAnalysis(
    id: string,
    body: AnalysisDTO
  ): Promise<AnalysisDocument | null> {
    return AnalysisModel.findByIdAndUpdate(id, body, { new: true });
  }

  // ELIMINAR ANÁLISIS
  static async deleteAnalysis(id: string): Promise<AnalysisDocument | null> {
    return AnalysisModel.findByIdAndDelete(id);
  }

  // RESUMEN DE ANÁLISIS
  static async getSummary(): Promise<{
    totalAnalyses: number;
    totalResults: number;
    numericResultsCount: number;
  }> {
    const analyses = await AnalysisModel.find();

    const totalAnalyses = analyses.length;
    const totalResults = analyses.reduce((acc, a) => acc + a.results.length, 0);
    const numericResultsCount = analyses.reduce(
      (acc, a) =>
        acc +
        a.results.filter((r: { value: any }) => typeof r.value === "number")
          .length,
      0
    );

    return { totalAnalyses, totalResults, numericResultsCount };
  }
}
