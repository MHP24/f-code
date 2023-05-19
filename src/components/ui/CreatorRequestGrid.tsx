import { FC } from 'react';
import { IChallengeRequest } from '@/interfaces';
import { CardRequest, NoResults } from '.';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/creatorRequestGrid.module.css';

interface Props {
  requestData: {
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
    hasMore: boolean | undefined;
    isLoading: boolean;
    data: IChallengeRequest[] | undefined;
  }
}

export const CreatorRequestGrid: FC<Props> = ({ requestData }) => {

  const { data: requests, size, setSize, hasMore, isLoading } = requestData;

  return (
    requests?.length === 0 && !isLoading ?
      <NoResults />
      :

      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!hasMore}
        loader={<p></p>}
        dataLength={requests?.length ?? 0}
        className={styles.requestGrid}
      >

{
        requests?.map(request => {
          return <CardRequest {...request} key={`${request._id}`} />
        })
      }
      </InfiniteScroll>
  );
}
