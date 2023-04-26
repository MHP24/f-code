
type TLanguages = {
  [key: string]: string;
}


export const buildFunction = (language: string, functionName: string, parameters: string[]): string => {
  const languages: TLanguages = {
    'javascript': `function ${functionName}(${parameters.join(', ')}) {\n\n  return\n\n}`,
    'typescript': `function ${functionName}(${parameters.join(', ')}) {\n\n  return\n\n}`
  }
  return languages[language] ?? 'Your code here...';
}