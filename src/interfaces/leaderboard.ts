export interface ILeaderboard {
  _id: string;
  challenges: number;
  user: {
    _id: string;
    username: string;
    picture: string;
    score: number;
  }[];
}

export interface IRanking {
  userScore: number;
  rank: number;
}

export interface ILeaderboardData {
  userRanking: IRanking | null | undefined;
  leaderboard: ILeaderboard[];
}