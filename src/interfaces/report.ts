interface IUserReport {
  _id: string;
  username: string;
  email: string;
  provider: string;
}

export interface IChallengeReport {
  _id: string;
  challengeId: string;
  code: string;
  userId: IUserReport;
  createdAt: string;
  updatedAt: string;
}