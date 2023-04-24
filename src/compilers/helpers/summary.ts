import { ICodeExecution } from "@/interfaces";
import { IExecutionSummary, IDataOutput } from '@/interfaces';

interface ISummaryProps {
  results: ICodeExecution;
  outputs: any[];

}

export const generateSummary = (
  { results, outputs }: ISummaryProps
): IDataOutput<IExecutionSummary> => {
  const { outputs: solveOutputs } = results;

  if (results.outputs!.length === outputs.length) {
    const cases = outputs.map(({ expectedOutput }, i) => {
      return {
        caseStructure: solveOutputs![i].caseStructure,
        expectedType: typeof expectedOutput,
        outputType: typeof solveOutputs![i].execution,
        expectedOutput,
        output: solveOutputs![i].execution,
        isCorrect: (
          `${expectedOutput}` === `${solveOutputs![i].execution}` /* Array, objects cases (!== ref) */
          && typeof expectedOutput === typeof solveOutputs![i].execution)
      };
    });

    const correctSolves = cases.filter(({ isCorrect }) => isCorrect).length;
    const accuracy = (cases.length / correctSolves * 100) >> 0;

    return {
      hasError: false,
      data: {
        accuracy,
        status: accuracy === 100 ? 'Passed' : 'Failed',
        errors: cases.length - correctSolves,
        cases
      }
    };
  }

  return {
    hasError: true,
    data: { error: 'Invalid challenge or solve, cases are more than your solves' }
  };
}