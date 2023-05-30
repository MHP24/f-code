import { FC, useId } from 'react';
import { IChallengeRequestSearch } from '@/interfaces';
import { CreatorChallenge, NoResults } from '@/components/ui';
import styles from '../../styles/admin/creatorChallengeGrid.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  data: IChallengeRequestSearch[] | undefined;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const CreatorChallengeGrid: FC<Props> = ({ data, size, setSize, hasMore, isLoading }) => {
  const targetId = useId();
  return (
    (!data || data?.length === 0) && !isLoading ?
      <NoResults />
      :
      (
        <div className={styles.challengesGrid} id={targetId}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!hasMore}
            loader={<p></p>}
            dataLength={data?.length ?? 0}
            className={styles.scroller}
            scrollableTarget={targetId}
          >
            {
              data?.map((challenge, i) => {
                return (
                  <CreatorChallenge
                    key={`challenge-${i}-dashboard-${challenge._id}`}
                    {...challenge}
                  />
                )
              })
            }
          </InfiniteScroll>
        </div>
      )
  );
}
