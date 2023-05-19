import { transpileModule, ScriptTarget, ModuleKind } from 'typescript';
import { generateSummary, validateJavaScriptFunction, executeJavaScriptCode } from '..';
import {
  HandlerOutput, ICodeExecution,
  IExecutionCase, IFunctionValidation
} from '@/interfaces';

export const transpileCode = (code: string) => {
  return transpileModule(code, {
    compilerOptions: {
      target: ScriptTarget.ES2016,
      module: ModuleKind.CommonJS
    }
  }).outputText;
}

export const handleTypeScriptExecution = (
  { functionName, parameters, cases, code }: IExecutionCase
): HandlerOutput => {
  const fnValidation = validateJavaScriptFunction({ functionName, parameters, code: transpileCode(code) });
  if (fnValidation.hasError) return fnValidation;

  const { data: { functionExec } } = fnValidation as { data: IFunctionValidation };
  const executionData = executeJavaScriptCode({ functionExec, cases });
  if (executionData.hasError) return executionData;

  const { data } = executionData as { data: ICodeExecution };
  return generateSummary({ results: data, outputs: cases });
}