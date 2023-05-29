import { IUser } from "./user";

export interface ICreatorRequest {
  _id: string;
  subject: string;
  description: string;
  summary?: string;
  approved: boolean;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: IUser;
  staffId?: IUser;
}

export interface ISearchCreatorRequest {
  _id: string;
  subject: string;
  userId: {
    _id: string;
    username: string;
    picture: string;
  },
  createdAt: string;
}