import { handleJavaScriptExecution } from '@/compilers';
import { HandlerOutput, ICaseSchema, IExecutionCase } from '@/interfaces';

interface Props {
  _id: string;
  language: string;
  functionName: string;
  parameters: string[];
  cases: ICaseSchema[],
  active: boolean;
  code: string;
}

type TLanguages = {
  [key: string]: (params: IExecutionCase) => HandlerOutput;
}

export const handleExecution = (data: Props) => {
  const languages: TLanguages = {
    'javascript': handleJavaScriptExecution
  }
  const handlerFn = languages[data.language];
  return (
    handlerFn ?
      handlerFn(data)
      :
      { hasError: true, data: { error: 'Language not supported' } }
  );
}