export interface IChallengeDistribution {
  _id: string;
  distribution: number;
}

export interface ILatestChallenge {
  _id: string;
  slug: string;
  language: string;
  difficulty: number;
  updatedAt?: string;
}

export interface IRecentUser {
  _id: string;
  username: string;
  picture: string;
  provider: string;
  role: string;
}

export interface IDashboard {
  userCount: number;
  challengeCount: number;
  solveCount: number;
  challengeDistribution: IChallengeDistribution[];
  latestChallenges: ILatestChallenge[];
  recentUsers: IRecentUser[];
}