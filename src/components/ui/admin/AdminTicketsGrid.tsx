import { IUserActionReport } from '@/interfaces';
import { FC } from 'react';
import { AdminTicketCard, NoResults } from '@/components/ui';
import styles from '../../styles/admin/adminTicketsGrid.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  data: IUserActionReport[] | undefined;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any[] | undefined>;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const AdminTicketsGrid: FC<Props> = ({ data, size, setSize, hasMore, isLoading }) => {
  return (
    (!data || data?.length === 0) && !isLoading ?
      <NoResults />
      :
      (
        <div className={styles.ticketsGrid}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!hasMore}
            loader={<p></p>}
            dataLength={data?.length ?? 0}
            className={styles.scroller}
          >
            {
              data?.map((report, i) => {
                return <AdminTicketCard key={`user-report-${report._id}-i-dashboard`} {...report} />
              })
            }
          </InfiniteScroll>
        </div>
      )
  );
}
