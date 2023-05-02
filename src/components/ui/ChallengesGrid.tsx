import { FC, memo } from 'react';
import { IChallengeSearch } from '@/interfaces';
import { ChallengeCard } from './ChallengeCard';
import styles from '../styles/challengesGrid.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  challenges: IChallengeSearch[];
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore: boolean;
}

export const ChallengesGrid: FC<Props> = memo(({ challenges, setSize, size, hasMore }) => {
  return (
    challenges.length === 0 ?
      <p>No results</p>
      :

      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!hasMore}
        loader={<p></p>}
        dataLength={challenges?.length ?? 0}
        className={styles.challengesGrid}
      >

        {
          challenges?.map(challenge => (
            <ChallengeCard
              key={`challenge-${challenge._id}`}
              {...challenge}
            />
          ))
        }
      </InfiniteScroll>
  );
});

ChallengesGrid.displayName = 'ChallengesGrid';