import { PythonShell } from 'python-shell';
import { validatePythonFunction } from '../languages/python';
import {
  IDataOutput, ICodeExecution,
  IFunctionValidation, HandlerValidation
} from '@/interfaces';

interface IExecutionParams {
  functionExec: string;
  call: string;
}

const executeCase = async (
  { functionExec, call }: IExecutionParams
): Promise<IDataOutput<ICodeExecution>> => {
  try {
    const output = await PythonShell.runString(
      `from pprint import pprint\n` +
      `${functionExec}` +
      `\n${call}`,
      { mode: 'text', timeout: 1000 });
    return {
      hasError: !output[0],
      data: !output[0] ? { error: 'Your code contains errors' } : { output },
    };

  } catch (error) {
    return {
      hasError: true,
      data: { error: (`${error}`.trim().split('\n').at(-1) || 'Unexpected error') }
    };
  }
};

interface IProcessExecution {
  functionExec: string;
  cases: { call: string }[];
}

const processExecutions = async ({ functionExec, cases }: IProcessExecution) => {
  try {
    const executionData = cases.map(async (
      { call }: { call: string }
    ) => {
      const input =
        `pprint(${call})\n`
      return (
        await executeCase({ functionExec, call: input })
      );
    });
    const outputs = await Promise.all(executionData);
    const executionsFailed = outputs.filter(execution => execution.hasError);
    return (
      !executionsFailed[0] ?
        {
          hasError: false,
          data: { outputs }
        } : executionsFailed[0]
    );
  } catch (error) {
    return { hasError: true, data: { error: `${error}` } };
  }
}

interface IValidation {
  functionName: string;
  parameters: string[];
  cases: { call: string }[];
  code: string;
}

export const handlePythonValidation = async (
  { functionName, parameters, cases, code }: IValidation
): Promise<HandlerValidation> => {
  const fnValidation = await validatePythonFunction({ functionName, parameters, code });
  if (fnValidation.hasError) return fnValidation;

  const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };
  const executionData = await processExecutions({ functionExec, cases });

  const { data: { outputs } } = executionData as { data: ICodeExecution };

  return {
    hasError: false,
    data: {
      outputs: outputs!.map(({ data }) => {
        return { execution: data.output[0] };
      })
    }
  };
}