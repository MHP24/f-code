import mongoose, { Schema, model, Model } from 'mongoose';
import { IChallengeRequest } from '@/interfaces';

const challengeSchema = new Schema({
  slug: { type: String, required: true },
  language: { type: String, required: true },
  difficulty: { type: Number, required: true },
  instructions: { type: String, required: true },
  functionName: { type: String, required: true },
  parametersCount: { type: Number, required: true },
  parameters: { type: [String], required: true },
  cases: {
    type: [{
      call: String,
      expectedOutput: Schema.Types.Mixed,
    }], required: true
  },
  solution: { type: String, requied: true },
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

export const Challenge: Model<IChallengeRequest> = mongoose.models.Challenge || model('ChallengeRequest', challengeSchema);