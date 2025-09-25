import { NextFunction, Request, Response } from "express";
import { createProductJoi } from "../../../utilities/joi";
import AppError from "../../../utilities/error/appError";
import { ComprasModel } from "./inventary.model";

export class ComprasController {
  // CREAR PRODUCTO
  static createProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error, value } = createProductJoi.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      if (error) {
        throw new AppError(
          "ValidationError",
          400,
          error,
          "Datos inválidos. Por favor, revisa los campos del producto.",
          true
        );
      }

      // 👇 simulando userId (esto lo ideal sería sacarlo de auth en el futuro)
      const userId = "68c0540439042912f6fd5ee4";

      const bodySend = {
        ...value,
        userId,
      };

      const newProduct = await ComprasModel.addProduct(bodySend);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  };

  // OBTENER TODOS LOS PRODUCTOS
  static getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const products = await ComprasModel.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };

  // OBTENER PRODUCTO POR ID
  static getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await ComprasModel.getProductById(id);

      if (!product) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Producto no encontrado",
          true
        );
      }

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  // ACTUALIZAR PRODUCTO
  static updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const { error, value } = createProductJoi.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      if (error) {
        throw new AppError(
          "ValidationError",
          400,
          error,
          "Datos inválidos. Por favor, revisa los campos del producto.",
          true
        );
      }

      const updatedProduct = await ComprasModel.updateProduct(id, value);

      if (!updatedProduct) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Producto no encontrado",
          true
        );
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  };

  // ELIMINAR PRODUCTO
  static deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await ComprasModel.deleteProduct(id);

      if (!deleted) {
        throw new AppError(
          "NotFound",
          404,
          null,
          "Producto no encontrado",
          true
        );
      }

      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  };

  // RESUMEN DE PRODUCTOS (opcional)
  static getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const summary = await ComprasModel.getSummary();
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  };
}
