import { Schema, model, HydratedDocument } from "mongoose";
import { ProductDTO } from "../../../interfaces/producto.interface";

export type ProductDocument = HydratedDocument<ProductDTO>;

const ProductSchema = new Schema<ProductDTO>(
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

const ProductModel = model<ProductDTO>("ProductDTO", ProductSchema);

export default ProductModel;
