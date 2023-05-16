import { ChallengeCreator, NoResults } from '.';
import { FC } from 'react';
import styles from '../styles/challengeCreatorGrid.module.css';
import { IChallenge } from '@/interfaces';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore: boolean;
  isLoading: boolean;
  challenges: IChallenge[];
}

export const ChallengeCreatorGrid: FC<Props> = ({ challenges, setSize, size, hasMore, isLoading }) => {
  return (
    challenges.length === 0 && !isLoading ?
      <NoResults />
      :

      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!hasMore}
        loader={<p></p>}
        dataLength={challenges?.length ?? 0}
        className={styles.challengeCreatorGrid}
      >

        {
          challenges?.map((challenge) => {
            return <ChallengeCreator key={`creator-challenge-${challenge._id}`} {...challenge} />
          })
        }
      </InfiniteScroll>
  )
}
