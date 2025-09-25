import { NextFunction, Request, Response } from "express";

import AppError from "../../../utilities/error/appError";
import { createExchangeJoi, updateExchangeJoi } from "../../../utilities/joi";
import { ExchangeRateService } from "./exchange.model";

export class ExchangeRateController {
  // Crear una nueva tasa de cambio
  static createExchangeRate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //usuario logeado
      const userId = req.user.userId;

      const bodySend = {
        ...req.body,
        userId,
      };

      const { error, value } = createExchangeJoi.validate(bodySend, {
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

      const newExchange = await ExchangeRateService.CreateExChangeRate(value);
      res.status(201).json(newExchange);
    } catch (err) {
      next(err);
    }
  };

  // Obtener la tasa de cambio del usuario (crear si no existe)
  static getExchangeRate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //usuario logeado
      const userId = req.user.userId;
      let exchange = await ExchangeRateService.FindExchangeRate(userId);

      // Si no existe, crear con valor por defecto
      if (!exchange) {
        const body = { userId, currentExchangeRate: 1.66 }; // valor por defecto
        exchange = await ExchangeRateService.CreateExChangeRate(body);
      }

      res.status(200).json(exchange);
    } catch (err) {
      next(err);
    }
  };

  // Actualizar la tasa de cambio existente
  static updateExchangeRate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bodySend = { ...req.body };

      //usuario logeado
      const userId = req.user.userId;

      const { error, value } = updateExchangeJoi.validate(bodySend, {
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

      const updatedExchange = await ExchangeRateService.UpdateExchangeRate(
        userId,
        value
      );
      res.status(200).json(updatedExchange);
    } catch (err) {
      next(err);
    }
  };
}
