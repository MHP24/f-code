import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '@/interfaces';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, default: 'no-picture', required: true },
  score: { type: Number, default: 0, required: true },
  provider: { type: String, default: 'f-code' },
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