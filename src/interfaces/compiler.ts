export interface IFunctionValidation {
  functionExec: string;
}

export interface ICodeExecution {
  outputs: any[];
}

export interface ISummaryCase {
  expectedOutput: string;
  output: string;
  isCorrect: boolean;
}

export interface IExecutionSummary {
  accuracy: number;
  status: 'Passed' | 'Failed';
  errors: number;
  cases: ISummaryCase[];
}

export interface IExecutionCase {
  functionName: string;
  parameters: string[];
  cases: any[]
  code: string;
}

export interface IDataOutput<T> {
  hasError: boolean;
  data: T | { error: string };
}

export type HandlerOutput =
  | IDataOutput<IFunctionValidation>
  | IDataOutput<ICodeExecution>
  | IDataOutput<IExecutionSummary>;

export type CompilerResponse =
  { error: string } |
  IFunctionValidation
  | ICodeExecution | IExecutionSummary;