/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import logger from "../utilities/pino.logger";
import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const MONGO_URI = process.env.DB_URI;

if (!MONGO_URI) {
  logger.error("DB_URI is not defined in environment variables.");
  process.exit(1);
}

// Cache para serverless
const cached: {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
} = (global as any).mongoose || { conn: null, promise: null };
(global as any).mongoose = cached;

export const initMongo = async () => {
  if (cached.conn) return cached.conn; // reutiliza conexión si ya existe

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        serverSelectionTimeoutMS: 20000,
        socketTimeoutMS: 45000,
      })
      .then((mongoose) => {
        logger.info("Base de datos conectada correctamente");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
