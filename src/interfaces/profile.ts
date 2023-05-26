import { IRanking } from ".";

export interface IActivity {
  updatedAt: string;
  challenge: {
    _id: string;
    slug: string;
    language: string;
    difficulty: number;
  }
}

export interface IProfileData {
  profile: {
    id: string;
    picture: string;
    username: string;
    technologies: {
      challengesCompleted: number;
      challengeDistribution: {
        language: string;
        percentage: number;
      }[]
    };
    ranking: IRanking;
    recentActivity: {
      updatedAt: string;
      challenge: {
        _id: string;
        slug: string;
        language: string;
        difficulty: number;
      };
    }[];
  }
}