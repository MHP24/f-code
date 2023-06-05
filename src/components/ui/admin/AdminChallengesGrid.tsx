import { FC } from 'react';
import { IChallengeSearch } from '@/interfaces';
import { ChallengeCreator, NoResults } from '@/components/ui';
import styles from '../../../styles/admin/challenges.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  data: IChallengeSearch[] | undefined;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const AdminChallengesGrid: FC<Props> = ({ data, setSize, size, hasMore, isLoading }) => {
  return (
    data?.length === 0 && !isLoading ?
      <NoResults />
      :
      (
        <div className={styles.challengesGrid}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!hasMore}
            loader={<p></p>}
            dataLength={data?.length ?? 0}
            className={styles.scroller}
          >

            {
              data?.map((challenge, i) => {
                return <ChallengeCreator
                  key={`challenge-admin-dashboard-reports-${i}`}
                  {...challenge}
                  isEditable={false}
                />
              })
            }
          </InfiniteScroll>
        </div>
      )
  );
}
