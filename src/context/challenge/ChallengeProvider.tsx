import { FC, PropsWithChildren, useReducer } from 'react';
import { ChallengeContext, challengeReducer } from '.';
import { IChallengeContext } from '@/interfaces';

const INITIAL_STATE: IChallengeContext = {
  language: undefined,
  isNative: undefined
}

export const ChallengeProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(challengeReducer, INITIAL_STATE);

  const updateChallengeContext = (language: string) => {
    const isNative = ['javascript', 'typescript'].includes(language);
    dispatch({ type: '[Challenge] - Update', payload: { language, isNative } });
  }

  return (
    <ChallengeContext.Provider
      value={{
        ...state,
        updateChallengeContext
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
