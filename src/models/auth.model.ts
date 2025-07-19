import bcrypt from "bcryptjs";
import User from "../db/schema/auth.schema";

export class AuthModel {
  static async register(email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      return await newUser.save();
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
      return null;
    }
  }

  static async findByEmail(email: string) {
    return await User.findOne({ email });
  }
}
