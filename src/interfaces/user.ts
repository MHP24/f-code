export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  score: number;
  challengesCreated: number;
  role: string;
  active: boolean;
  provider: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserActionReport {
  _id: string;
  picture: string;
  username: string;
  userId: string;
  reporterId: string;
  active: boolean;
  staffId?: string;
  createdAt: string;
}