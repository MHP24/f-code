import mongoose, { Schema, model, Model } from 'mongoose';
import { ISolve } from '@/interfaces';

const solveSchema = new Schema({
  code: { type: String, required: true },
  challengeId: {
    type: String,
    ref: 'Challenge',
    required: true,
  },
  creatorId: {
    type: String,
    ref: 'User',
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Solve: Model<ISolve> = mongoose.models.Solve || model('Solve', solveSchema);