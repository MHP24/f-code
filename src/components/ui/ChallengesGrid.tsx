import { FC, memo } from 'react';
import { IChallengeSearch } from '@/interfaces';
import { ChallengeCard } from './ChallengeCard';
import styles from '../styles/challengesGrid.module.css'

interface Props {
  challenges: IChallengeSearch[] | null;
}

export const ChallengesGrid: FC<Props> = memo(({ challenges }) => {
  console.log('rendered...')

  return (
    !challenges ?
      <p>Loading</p>
      :

      <div className={styles.challengesGrid}>
        {
          challenges.map(challenge => (
            <ChallengeCard
              key={`challenge-${challenge._id}`}
              {...challenge}
            />
          ))
        }
      </div>
  );
});

ChallengesGrid.displayName = 'ChallengesGrid';