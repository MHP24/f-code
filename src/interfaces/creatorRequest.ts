export interface ICreatorRequest {
  _id: string;
  subject: string;
  description: string;
  approved: boolean;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}