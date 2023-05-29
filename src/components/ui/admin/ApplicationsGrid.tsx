import { FC, useId } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoResults, ApplicationCard } from '@/components/ui';
import { ISearchCreatorRequest } from '@/interfaces';
import styles from '../../styles/admin/applicationsGrid.module.css';

interface Props {
  data: ISearchCreatorRequest[] | undefined;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const ApplicationsGrid: FC<Props> = ({ data, size, setSize, hasMore, isLoading }) => {
  const targetId = useId();
  return (
    data?.length === 0 && !isLoading ?
      <NoResults />
      :
      (
        <div className={styles.applicationsGrid} id={targetId}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!hasMore}
            loader={<p></p>}
            dataLength={data?.length ?? 0}
            className={styles.scroller}
            scrollableTarget={targetId}
          >

            {
              data?.map(application => {
                return <ApplicationCard key={`application-dashboard-${application._id}`} {...application} />
              })
            }
          </InfiniteScroll>
        </div>
      )
  );
}
