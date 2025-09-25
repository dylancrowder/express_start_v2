import { ProductDTO } from "../../../interfaces/producto.interface";
import AppError from "../../../utilities/error/appError";
import ProductModel, { ProductDocument } from "./inventary.schema";

export class ComprasModel {
  // CREAR PRODUCTO
  static async addProduct(body: ProductDTO): Promise<ProductDocument> {
    try {
      const newProduct = await ProductModel.create(body);
      return await newProduct.save();
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

  // OBTENER TODOS
  static async getAllProducts(): Promise<ProductDocument[]> {
    return ProductModel.find();
  }

  // OBTENER POR ID
  static async getProductById(id: string): Promise<ProductDocument | null> {
    return ProductModel.findById(id);
  }

  // ACTUALIZAR
  static async updateProduct(
    id: string,
    body: ProductDTO
  ): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndUpdate(id, body, { new: true });
  }

  // ELIMINAR
  static async deleteProduct(id: string): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndDelete(id);
  }

  // RESUMEN (totales de inversión/ganancia)
  static async getSummary(): Promise<{
    totalCLP: number;
    totalARS: number;
    totalRevenueARS: number;
    totalProfit: number;
  }> {
    const products = await ProductModel.find();

    const CONVERSION_RATE = 1.53;

    const totalCLP = products.reduce(
      (acc, p) => acc + p.costCLP * p.quantity,
      0
    );
    const totalARS = totalCLP * CONVERSION_RATE;
    const totalRevenueARS = products.reduce(
      (acc, p) => acc + p.priceARS * p.quantity,
      0
    );
    const totalProfit = totalRevenueARS - totalARS;

    return { totalCLP, totalARS, totalRevenueARS, totalProfit };
  }
}
