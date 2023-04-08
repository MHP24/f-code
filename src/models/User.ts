import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  provider: {
    type: String,
    enum: {
      values: ['F-Code', 'GitHub', 'Gmail'],
      message: '{VALUE}, invalid provider',
      required: true
    }
  },
  picture: { type: String, default: '@', required: true },
  score: { type: Number, default: 0, required: true },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['admin', 'publisher', 'user'],
      message: '{VALUE}, invalid role',
      required: true
    }
  },
  active: { type: Boolean, default: true, required: true }
}, {
  timestamps: true,
});

export const User: Model<IUser> = mongoose.models.User || model('User', userSchema);