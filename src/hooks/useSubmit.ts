import { useContext, useEffect, useState } from 'react';
import { IExecutionState } from '@/interfaces';
import { ChallengeContext } from '@/context';
import { fCodeApi } from '@/api';
import axios from 'axios';

export const useSubmit = (language: string) => {

  const initialState = {
    executed: false,
    isExecuting: false,
    executionFailed: false,
    error: '',
    data: {}
  };

  const [execution, setExecution] = useState<IExecutionState>(initialState);
  const { updateChallengeContext } = useContext(ChallengeContext);

  let submitTimeout: NodeJS.Timeout | null = null;

  const submitCode = async (
    _id: string, code: string, creatorId: string,
    userId: string, difficulty: number) => {

    updateChallengeContext(language);
    setExecution({ ...execution, isExecuting: true });

    submitTimeout = setTimeout(async () => {
      try {
        const { data } = await fCodeApi.post(`/challenges/solve?challengeId=${_id}`, { code });

        if (data.accuracy === 100) {
          await fCodeApi.post(`/challenges/submit?challengeId=${_id}`, {
            code,
            creatorId,
            userId,
            difficulty
          });
        }

        setExecution({
          ...execution,
          executed: true,
          executionFailed: false,
          isExecuting: false,
          error: '',
          data
        });
      } catch (error) {
        setExecution({
          ...execution,
          executed: true,
          isExecuting: false,
          executionFailed: true,
          error: axios.isAxiosError(error) ?
            `${error.response?.data.error}`
            : 'Unexpected error'
        });
      }
    }, 5000);
  }

  useEffect(() => {
    return () => {
      submitTimeout && clearTimeout(submitTimeout);
    };
  }, [submitTimeout]);

  return {
    submitCode,
    execution
  };
}