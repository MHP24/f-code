import mongoose, { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IUserActionReport } from '@/interfaces';

const userReportSchema = new Schema({
  picture: { type: String, required: true },
  username: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true,
});

userReportSchema.plugin(mongoosePaginate);

export const UserReport = (mongoose.models.UserReport || model<IUserActionReport>('UserReport', userReportSchema)) as PaginateModel<IUserActionReport>;