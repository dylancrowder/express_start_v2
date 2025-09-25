import mongoose from "mongoose";

export interface AnalysisDTO {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  date: Date;
  results: {
    parameter: string;
    value: number | string;
    unit?: string;
  }[];
}
