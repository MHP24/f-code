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
  solution: string;
  tags: string[];
  active: boolean;
  creatorId: string;
}

export interface IChallengeRequest extends IChallenge {
  parametersCount: number;
  solution: string;
  reason: 'create' | 'update';
  status: number;
  updatedAt: string;
}

export interface IChallengeSearch {
  _id: string;
  creatorId?: string;
  slug: string;
  language: string;
  difficulty: number;
  tags: string[];
}

export interface IChallengeContext {
  language?: string;
  isNative?: boolean;
}

export interface IChallengeRequestSearch {
  _id?: string;
  slug: string;
  language: string;
  difficulty: number;
  reason: 'create' | 'update';
  createdAt: string;
}