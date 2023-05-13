import { HandlerValidation, IExecutionCase } from '@/interfaces';
import { handleJavaScriptValidation, handleTypeScriptValidation } from '../validators';

interface Props {
  functionName: string;
  parameters: string[];
  cases: { case: string }[];
  code: string;
  language: string;
}

type TLanguages = {
  [key: string]: (params: IExecutionCase) => HandlerValidation | Promise<HandlerValidation>;
}

export const handleValidation = (data: Props) => {
  const languages: TLanguages = {
    'javascript': handleJavaScriptValidation,
    'typescript': handleTypeScriptValidation,
    // 'python': handlePythonExecution
  }
  const handlerFn = languages[data.language];
  return (
    handlerFn ?
      handlerFn(data)
      :
      { hasError: true, data: { error: 'Language not supported' } }
  );
}