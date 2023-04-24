import { IExecutionSummary } from '@/interfaces';

export interface IExecutionState {
  executed: boolean;
  isExecuting: boolean;
  executionFailed: boolean;
  error: string | null;
  data: IExecutionSummary | object;
}