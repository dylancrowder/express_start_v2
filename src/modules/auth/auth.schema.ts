import { Schema, model, HydratedDocument } from "mongoose";
import { UserDTO } from "../../interfaces/user.interface";

export type UserDocument = HydratedDocument<UserDTO>;

const UserSchema = new Schema<UserDTO>(
  {
    name: { type: String, required: true, maxlength: 100, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true }, // 🔒 siempre guardado hasheado
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel = model<UserDTO>("User", UserSchema);

export default UserModel;
