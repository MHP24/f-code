import { ICreatorRequest } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';


const creatorRequest = new Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  approved: { type: Boolean, default: false, required: true },
  closed: { type: Boolean, default: false, required: true },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true,
});

export const CreatorRequest: Model<ICreatorRequest> = mongoose.models.CreatorRequest || model('CreatorRequest', creatorRequest);
