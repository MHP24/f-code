
export interface ICaseSchema {
  call: string;
  expectedOutput: any;
}

export interface IChallenge {
  _id: string;
  slug: string;
  language: string;
  difficulty: number;
  instructions: string;
  functionName: string;
  parameters: string[];
  cases: ICaseSchema[];
  tags: string[];
  active: boolean;
  creatorId: string;
}

export interface IChallengeRequest extends IChallenge {
  parametersCount: number;
  solution: string;
}

export interface IChallengeSearch {
  _id: string;
  slug: string;
  language: string;
  difficulty: number;
  tags: string[];
}