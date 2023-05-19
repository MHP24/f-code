import mongoose, { PaginateModel, Schema, model } from 'mongoose';
import { IChallengeRequest } from '@/interfaces';
import mongoosePaginate from 'mongoose-paginate-v2';

const challengeRequest = new Schema({
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
  code: { type: String, required: true },
  tags: { type: [String], required: true },
  status: { type: Number, default: 1, required: true },
  reason: { type: String, required: true },
  creatorId: {
    type: String,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

challengeRequest.plugin(mongoosePaginate);

export const ChallengeRequest = (mongoose.models.ChallengeRequest || model<IChallengeRequest>('ChallengeRequest', challengeRequest)) as PaginateModel<IChallengeRequest>;
