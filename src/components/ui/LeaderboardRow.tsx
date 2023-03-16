import { FC } from 'react';
import styles from '../styles/leaderboardRow.module.css';

interface Props {
  position: number;
}

export const LeaderboardRow: FC<Props> = ({ position }) => {
  return (
    <div className={styles.leaderboardRow}>
      <p className={styles.leaderboardCol}>{`#${position}`}</p>
      <p className={styles.leaderboardCol}>Miguel Henríquez</p>
      <p className={styles.leaderboardCol}>300</p>
      <p className={styles.leaderboardCol}>2500</p>
      <p className={styles.leaderboardCol}>150</p>
    </div>
  );
}
