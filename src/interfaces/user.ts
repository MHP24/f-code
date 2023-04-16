export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  score: number;
  role: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}