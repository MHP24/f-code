import mongoose, { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '@/interfaces';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, default: '/pictures/no-picture.png', required: true },
  score: { type: Number, default: 0, required: true },
  challengesCreated: { type: Number, default: 0, required: true },
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

userSchema.plugin(mongoosePaginate);

export const User = (mongoose.models.User || model<IUser>('User', userSchema)) as PaginateModel<IUser>;