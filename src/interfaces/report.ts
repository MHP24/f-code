interface IUserReport {
  _id: string;
  username: string;
  email: string;
  provider: string;
}

export interface IChallengeReport {
  _id: string;
  challengeId: string;
  userId: IUserReport;
  createdAt: string;
  updatedAt: string;
}