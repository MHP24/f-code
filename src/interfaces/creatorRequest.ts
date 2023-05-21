export interface ICreatorRequest {
  _id: string;
  subject: string;
  description: string;
  summary?: string;
  approved: boolean;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}