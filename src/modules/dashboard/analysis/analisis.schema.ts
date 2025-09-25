import { Schema, model, HydratedDocument } from "mongoose";
import { AnalysisDTO } from "../../../interfaces/analysis.interface";

export type AnalysisDocument = HydratedDocument<AnalysisDTO>;

const AnalysisSchema = new Schema<AnalysisDTO>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, maxlength: 150, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true },
    results: [
      {
        parameter: { type: String, required: true, trim: true },
        value: { type: Schema.Types.Mixed, required: true },
        unit: { type: String, trim: true },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const AnalysisModel = model<AnalysisDTO>("AnalysisDTO", AnalysisSchema);

export default AnalysisModel;
