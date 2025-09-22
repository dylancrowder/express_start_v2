import { ExchangeRateDTO } from "../../../interfaces/exchange.interface";
import AppError from "../../../utilities/error/appError";
import ExchangeRateModel, { ExchangeRateDocument } from "./exchange.schema";

export class ExchangeRateService {
  static async CreateExChangeRate(
    body: ExchangeRateDTO
  ): Promise<ExchangeRateDocument> {
    try {
      const newExchangeRate = await ExchangeRateModel.create(body);
      return await newExchangeRate.save();
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

  // Buscar o crear automáticamente la tasa de cambio de un userId
  static async FindExchangeRate(userId: string): Promise<ExchangeRateDocument> {
    try {
      let exchange = await ExchangeRateModel.findOne({ userId });

      if (!exchange) {
        // Si no existe, se crea con valor por defecto
        const body: ExchangeRateDTO = {
          userId,
          currentExchangeRate: 1.66,
        };
        exchange = await this.CreateExChangeRate(body);
      }

      return exchange;
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

  static async UpdateExchangeRate(
    userId: string,
    body: Partial<ExchangeRateDTO>
  ): Promise<ExchangeRateDocument> {
    try {
      const updatedExchange = await ExchangeRateModel.findOneAndUpdate(
        { userId },
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!updatedExchange) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Exchange rate no encontrado.",
          true
        );
      }

      return updatedExchange;
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
