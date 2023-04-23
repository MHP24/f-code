import mongoose, { Schema, model, Model } from 'mongoose';
import { IChallenge } from '@/interfaces';

const challengeSchema = new Schema({
  slug: { type: String, required: true },
  language: { type: String, required: true },
  difficulty: { type: Number, required: true },
  instructions: { type: String, required: true },
  functionName: { type: String, required: true },
  parameters: { type: [String], required: true },
  cases: {
    type: [{
      parameters: [Schema.Types.Mixed],
      expectedOutput: Schema.Types.Mixed,
    }], required: true
  },
  tags: { type: [String], required: true },
  active: { type: Boolean, default: true, required: true },
  creatorId: {
    type: String,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Challenge: Model<IChallenge> = mongoose.models.Challenge || model('Challenge', challengeSchema);