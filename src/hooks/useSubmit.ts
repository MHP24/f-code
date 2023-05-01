import { useContext, useState } from 'react';
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

  const submitCode = async (
    _id: string, code: string, creatorId: string,
    userId: string, difficulty: number) => {

    try {
      updateChallengeContext(language);
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
        error: '',
        data
      });

    } catch (error) {
      setExecution({
        ...execution,
        executed: true,
        executionFailed: true,
        error: axios.isAxiosError(error) ?
          `${error.response?.data.error}`
          : 'Unexpected error'
      });
    }
  }

  return {
    submitCode,
    execution
  };
}