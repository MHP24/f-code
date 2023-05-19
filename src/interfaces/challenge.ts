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
  reason: 'Create' | 'Update';
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