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

export interface IUserSolvesReport {
  _id: string;
  code: string;
  challengeId: {
    _id: string;
    slug: string;
    language: string;
    difficulty: number,
    creatorId: string;
  },
  userId: string;
  createdAt: string;
  updatedAt: string;
}