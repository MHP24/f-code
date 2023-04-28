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


interface ISummaryPropsSimplified {
  results: any[] | undefined;
  cases: any[];
}

export const generateSummarySimplified = (
  { results, cases }: ISummaryPropsSimplified
): IDataOutput<IExecutionSummary> => {
  /*
  Results...
    0 output
    1 outputType
    2 expectedOutput
    3 typeExpectedoOutput
    4 isCorrect 'True' | 'False'
  */
  if (results!.length === cases.length) {
    const summary = cases.map(({ expectedOutput, call }, i) => {
      return {
        caseStructure: call,
        expectedType: results![i].data.output[3],
        outputType: results![i].data.output[1],
        expectedOutput: expectedOutput.replace(/\"/gi, "'"),
        output: results![i].data.output[0].replace(/\"/gi, "'"),
        isCorrect: results![i].data.output[4] === 'True'
      };
    });

    const correctSolves = summary.filter(({ isCorrect }) => isCorrect).length;
    const accuracy = (cases.length / correctSolves * 100) >> 0;

    return {
      hasError: false,
      data: {
        accuracy,
        status: accuracy === 100 ? 'Passed' : 'Failed',
        errors: cases.length - correctSolves,
        cases: summary
      }
    };
  }

  return {
    hasError: true,
    data: { error: 'Invalid challenge or solve, cases are more than your solves' }
  };

}