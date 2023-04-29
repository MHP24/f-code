import { IChallengeContext } from '@/interfaces';

export type IChallengeActions = { type: '[Challenge] - Update', payload: { language: string, isNative: boolean } };

export const challengeReducer = (state: IChallengeContext, action: IChallengeActions) => {
  switch (action.type) {
    case '[Challenge] - Update':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}