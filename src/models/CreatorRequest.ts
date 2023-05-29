import { ICreatorRequest } from '@/interfaces';
import mongoose, { Schema, model, Model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const creatorRequest = new Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: false },
  approved: { type: Boolean, default: false, required: true },
  closed: { type: Boolean, default: false, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
}, {
  timestamps: true,
});

creatorRequest.plugin(mongoosePaginate);

export const CreatorRequest = (mongoose.models.CreatorRequest || model<ICreatorRequest>('CreatorRequest', creatorRequest)) as PaginateModel<ICreatorRequest>;