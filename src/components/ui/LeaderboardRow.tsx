import { FC } from 'react';
import styles from '../styles/leaderboardRow.module.css';

interface Props {
  position: number;
  challenges: number;
  user: {
    _id: string;
    username: string;
    picture: string;
    score: number;
  }[];
}

export const LeaderboardRow: FC<Props> = ({ position, challenges, user }) => {
  return (
    <div className={styles.leaderboardRow}>
      <p className={styles.leaderboardCol}>{`#${position}`}</p>
      <p className={styles.leaderboardCol}>{user[0]?.username}</p>
      <p className={styles.leaderboardCol}>{challenges}</p>
      <p className={styles.leaderboardCol}>{user[0]?.score}</p>
      <p className={styles.leaderboardCol}>Soon</p>
    </div>
  );
}
