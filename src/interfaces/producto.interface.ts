import { Schema } from "mongoose";

export interface ProductDTO {
  userId: Schema.Types.ObjectId;
  name: string;
  costCLP: number;
  priceARS: number;
  quantity: number;
  currentExchangeRate: number;
}
