import { ICaseSchema } from '@/interfaces';

export interface IChallengeRequest {
  _id?: string;
  slug: string;
  language: string;
  difficulty: number;
  instructions: string;
  functionName: string;
  parametersCount: string;
  parameters: string[];
  cases: ICaseSchema[];
  code: string;
  tags: string[];
  status: number;
  reason: 'create' | 'update';
  creatorId: string;
}