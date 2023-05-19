import { VM } from 'vm2';
import { HandlerValidation, ICodeExecution, IDataOutput, IFunctionValidation } from '@/interfaces';
import { validateJavaScriptFunction } from '../languages/javascript';

interface IValidationParams {
  functionExec: string;
  cases: any[];
}

export const validateJavaScriptCode = (
  { functionExec, cases }: IValidationParams
): IDataOutput<ICodeExecution> => {
  try {
    const vm = new VM({ timeout: 1000 });
    const outputs = cases.map(({ call }) => {
      return ({
        execution: vm.run(`
          ${functionExec}
          ${call}
        `),
      });
    });
    return { hasError: false, data: { outputs } }
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

export const handleJavaScriptValidation = (
  { functionName, parameters, cases, code }: IValidation
): HandlerValidation => {
  const fnValidation = validateJavaScriptFunction({ functionName, parameters, code });
  if (fnValidation.hasError) return fnValidation;

  const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };
  const executionData = validateJavaScriptCode({ functionExec, cases });
  return executionData;
}