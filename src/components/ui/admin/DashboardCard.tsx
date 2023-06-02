import { FC } from 'react';
import Image from 'next/image';
import styles from '../../styles/admin/dashboardCard.module.css';

interface Props {
  name: string;
  count: number;
  img: string;
}

export const DashboardCard: FC<Props> = ({ name, count, img }) => {
  return (
    <div className={styles.dashboardCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={`/illustrations/${img}.svg`}
          alt={name}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.dataContainer}>
        <p className={styles.title}>{name}</p>
        <p className={styles.subtitle}>{count}</p>
      </div>
    </div>
  )
}
