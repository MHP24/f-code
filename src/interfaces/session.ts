export interface ISession {
  user: {
    _id: string;
    username: string;
    email: string;
    picture: string;
    role: string;
  },
  expires?: string;
  accesToken?: string;
}