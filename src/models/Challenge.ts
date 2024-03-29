import mongoose, { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
      call: String,
      expectedOutput: Schema.Types.Mixed,
    }], required: true
  },
  caseSchema: { type: Schema.Types.Mixed, required: true },
  solution: { type: String, required: true },
  tags: { type: [String], required: true },
  active: { type: Boolean, default: true, required: true },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

challengeSchema.plugin(mongoosePaginate);

export const Challenge = (mongoose.models.Challenge || model<IChallenge>('Challenge', challengeSchema)) as PaginateModel<IChallenge>;