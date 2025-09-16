import { Schema, model, HydratedDocument } from "mongoose";
import { Product } from "../../../interfaces/producto.interface";

export type ProductDocument = HydratedDocument<Product>;

const ProductSchema = new Schema<Product>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, maxlength: 100, trim: true },
    costCLP: { type: Number, required: true, min: 1 },
    priceARS: { type: Number, required: true, min: 1 },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProductModel = model<Product>("Product", ProductSchema);

export default ProductModel;
