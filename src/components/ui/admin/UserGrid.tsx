import { FC, useId } from 'react';
import { UserCard } from '.';
import { IUser } from '@/interfaces';
import { NoResults } from '..';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../../styles/admin/usersGrid.module.css';

interface Props {
  data?: IUser[];
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const UserGrid: FC<Props> = ({ data, setSize, size, hasMore, isLoading }) => {
  const targetId = useId();
  return (
    data?.length === 0 && !isLoading ?
      <NoResults />
      :
      (
        <div className={styles.usersGrid} id={targetId}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!hasMore}
            loader={<p></p>}
            dataLength={data?.length ?? 0}
            className={styles.scroller}
            scrollableTarget={targetId}
          >

            {
              data?.map(user => {
                return <UserCard key={`user-dashboard-${user._id}`} {...user} />
              })
            }
          </InfiniteScroll>
        </div>
      )
  );
}
