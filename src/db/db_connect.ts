/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import logger from "../utilities/pino.logger";
import dotenv from "dotenv";

// Cargar dotenv solo en desarrollo/local
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const MONGO_URI = process.env.DB_URI;
console.log("esta es ka uri", MONGO_URI);

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_URI:", MONGO_URI ? "✔️ Cargada" : "❌ undefined");

if (!MONGO_URI) {
  logger.error("❌ DB_URI is not defined in environment variables.");
  process.exit(1);
}

// Cache para serverless
const cached: {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
} = (global as any).mongoose || { conn: null, promise: null };

(global as any).mongoose = cached;

export const initMongo = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI as string, {
        serverSelectionTimeoutMS: 20000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        bufferCommands: false,
      })
      .then((mongoose) => {
        logger.info("✅ Base de datos conectada correctamente");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;

  mongoose.connection.on("disconnected", () => {
    logger.warn("⚠️ MongoDB disconnected. Reintentando conexión...");
    cached.conn = null;
  });

  return cached.conn;
};
