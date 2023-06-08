import { transpileCode, validateJavaScriptFunction } from '../languages';
import { validateJavaScriptCode } from '.';
import { HandlerValidation, IFunctionValidation } from '@/interfaces';

interface IValidation {
  functionName: string;
  parameters: string[];
  cases: { call: string }[];
  code: string;
}

export const handleTypeScriptValidation = (
  { functionName, parameters, cases, code }: IValidation
): HandlerValidation => {
  const fnValidation = validateJavaScriptFunction({ functionName, parameters, code: transpileCode(code) });
  if (fnValidation.hasError) return fnValidation;
  const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };
  const executionData = validateJavaScriptCode({ functionExec, cases });
  return executionData;
}