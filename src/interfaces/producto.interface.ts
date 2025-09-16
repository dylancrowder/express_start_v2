import { Schema } from "mongoose";

export interface Product {
  userId: Schema.Types.ObjectId;
  name: string;
  costCLP: number;
  priceARS: number;
  quantity: number;
}
