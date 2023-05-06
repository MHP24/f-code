import { VM } from 'vm2';
import { generateSummary } from '../helpers';
import {
  HandlerOutput,
  ICodeExecution, IDataOutput,
  IExecutionCase, IFunctionValidation
} from '@/interfaces';

interface IValidateFnProps {
  functionName: string;
  parameters: string[];
  code: string;
}

export const validateFunction = (
  { functionName, parameters, code }: IValidateFnProps
): IDataOutput<IFunctionValidation> => {
  try {
    const vm = new VM({ timeout: 1000 });
    const output = vm.run(`
      (function(){
        return ${functionName}
      })()
      ${code}
    `);

    const isValidStructure = `${output}`.split('\n')[0]
      .replace(/\s+/gi, '')
      .startsWith(`function${functionName}(${parameters
        .join(', ').replace(/\s+/gi, '')}){`);

    return (
      {
        hasError: !isValidStructure,
        data: (isValidStructure ?
          { functionExec: `${output}` }
          : { error: 'Do not change function name or parameters' }
        )
      }
    );
  } catch (error) {
    return { hasError: true, data: { error: `${error}` } };
  }
}

interface IExecutionParams {
  functionExec: string;
  functionName: string;
  cases: any[];
}
//TODO: REMOVE FUNCTIONNAME
export const executeJavaScriptCode = (
  { functionExec, functionName, cases }: IExecutionParams
): IDataOutput<ICodeExecution> => {
  try {
    const vm = new VM({ timeout: 1000 });
    const outputs = cases.map(({ call }) => {
      return ({
        execution: vm.run(`
          ${functionExec}
          ${call}
        `),
        caseStructure: `${call}`
      });
    });
    return { hasError: false, data: { outputs } }
  } catch (error) {
    return { hasError: true, data: { error: `${error}` } };
  }
}

export const handleJavaScriptExecution = (
  { functionName, parameters, cases, code }: IExecutionCase
): HandlerOutput => {
  const fnValidation = validateFunction({ functionName, parameters, code });
  if (fnValidation.hasError) return fnValidation;

  const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };
  const executionData = executeJavaScriptCode({ functionExec, functionName, cases });
  if (executionData.hasError) return executionData;

  const { data } = executionData as { data: ICodeExecution };
  return generateSummary({ results: data, outputs: cases });
}