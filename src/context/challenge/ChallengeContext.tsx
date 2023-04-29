import { createContext } from 'react';

interface ContextProps {
  language?: string;
  isNative?: boolean;
  updateChallengeContext: (language: string) => void;
}

export const ChallengeContext = createContext({} as ContextProps);