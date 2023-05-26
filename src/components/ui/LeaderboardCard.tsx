import { IRanking } from '@/interfaces';
import styles from '../styles/leaderboardCard.module.css';
import { FC } from 'react';

interface Props extends IRanking {
  title?: string;
}

export const LeaderboardCard: FC<Props> = ({ userScore, rank, title = 'Your stats' }) => {
  return (
    <div className={styles.leaderboardCard}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        {
          !!userScore && (
            <div className={styles.dataGroup}>
              <p className={`${styles.dataPrimary} ${styles.rank}`}>#{rank}</p>
              <p className={styles.dataSecondary}>Rank</p>
            </div>
          )
        }

        <div className={styles.dataGroup}>
          <p className={`${styles.dataPrimary} ${styles.points}`}>{userScore}</p>
          <p className={styles.dataSecondary}>Points</p>

        </div>
      </div>
    </div>
  );
}
