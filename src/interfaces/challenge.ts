
export interface ICaseSchema {
  parameters: any[];
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