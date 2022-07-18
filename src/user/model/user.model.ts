import mongoose, { Document, Schema } from "mongoose";

interface MongoResult {
  _doc: any;
}

export interface UserDto extends Document, MongoResult {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
}

export interface UserDtoUpd extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  readonly email: string;
}

export const User: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserRepository = mongoose.model<UserDto>("User", User);

export default UserRepository;
