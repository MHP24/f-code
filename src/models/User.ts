import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'publisher', 'user'],
      message: '{VALUE}, invalid role',
      default: 'user',
      required: true
    }
  }
}, {
  timestamps: true,
})

export const User: Model<IUser> = mongoose.models.User || model('User', userSchema);