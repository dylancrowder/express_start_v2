import { Schema, model, HydratedDocument } from "mongoose";
import { ExchangeRateDTO } from "../../../interfaces/exchange.interface";

export type ExchangeRateDocument = HydratedDocument<ExchangeRateDTO>;

const ExchangeRateSchema = new Schema<ExchangeRateDTO>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currentExchangeRate: {
      type: Number,
      required: true,
      maxlength: 150,
      trim: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ExchangeRateModel = model<ExchangeRateDTO>(
  "ExchangeRateDTO",
  ExchangeRateSchema
);

export default ExchangeRateModel;
