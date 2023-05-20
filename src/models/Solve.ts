import mongoose, { Schema, model, Model } from 'mongoose';
import { ISolve } from '@/interfaces';

const solveSchema = new Schema({
  code: { type: String, required: true },
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Solve: Model<ISolve> = mongoose.models.Solve || model('Solve', solveSchema);