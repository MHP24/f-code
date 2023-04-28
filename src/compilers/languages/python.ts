import { PythonShell } from 'python-shell';
import { HandlerOutput, ICaseSchema, ICodeExecution, IDataOutput, IExecutionCase, IFunctionValidation } from '@/interfaces';
import { generateSummarySimplified } from '../helpers';

interface IValidateFnProps {
  functionName: string;
  parameters: string[];
  code: string;
}

const validateFunction = async (
  { functionName, parameters, code }: IValidateFnProps
): Promise<IDataOutput<IFunctionValidation>> => {
  try {
    const codeWithoutPrints =
      'import inspect\n' +
      `${code.trim().replace(/^.*print\(.*\).*$/gm, '')}\n\n` +
      `source_code = inspect.getsource(${functionName})\nprint(source_code)`;

    const output: string[] | undefined = await PythonShell
      .runString(codeWithoutPrints, { mode: 'text', timeout: 1000 });

    const isValidFunction = output[0].replace(/\s+/gi, '') ===
      `def${functionName}(${parameters.join(', ')}):`
        .replace(/\s+/gi, '');

    return (
      !output[0] ? { hasError: true, data: { error: `Error getting data for execution` } }
        : {
          hasError: !isValidFunction,
          data: (
            isValidFunction ? { functionExec: `${output.join('\n')}` }
              : { error: 'Do not change function name or parameters' }
          )
        }
    );
  } catch (error) {
    return {
      hasError: true,
      data: {
        error: (`${error}`.trim().split('\n').at(-1) || 'Unexpected error')
      }
    };
  }
}


interface IExecutionParams {
  functionExec: string;
  call: string;
}

const executeCase = async (
  { functionExec, call }: IExecutionParams
): Promise<IDataOutput<ICodeExecution>> => {
  try {
    const output = await PythonShell.runString(
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
  cases: ICaseSchema[];
}

const processExecutions = async ({ functionExec, cases }: IProcessExecution) => {
  try {
    const executionData = cases.map(async (
      { call, expectedOutput }: { call: string, expectedOutput: string }
    ) => {
      const input =
        `print({'output': ${call}})\n` +
        `print(type(${call}))\n` +
        `print(${expectedOutput})\n` +
        `print(type(${expectedOutput}['output']))\n` +
        `print(${expectedOutput}['output'] == ${call})`
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

export const handlePythonExecution = async (
  { functionName, parameters, cases, code }: IExecutionCase
): Promise<HandlerOutput> => {
  try {
    const fnValidation = await validateFunction({ functionName, parameters, code });
    if (fnValidation.hasError) return fnValidation;
    const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };

    const executionData = await processExecutions({ functionExec, cases });
    if (executionData.hasError) return executionData;

    const { data: { outputs: results } } = executionData as { data: ICodeExecution };
    return generateSummarySimplified({ results, cases });
  } catch (error) {
    return { hasError: true, data: { error: `${error}` } };
  }
}