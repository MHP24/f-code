import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/leaderboardRow.module.css';

interface Props {
  position: number;
  challenges: number;
  user: {
    _id: string;
    username: string;
    picture: string;
    score: number;
    challengesCreated: number;
  }[];
}

export const LeaderboardRow: FC<Props> = ({ position, challenges, user }) => {
  return (
    <div className={styles.leaderboardRow}>
      <p className={styles.leaderboardCol}>{`#${position}`}</p>
      <div className={`${styles.leaderboardCol} ${styles.leaderboardProfile}`}>
        <Image
          className={styles.leaderboardImage}
          src={`${user[0]?.picture}`}
          width={30}
          height={30}
          alt={user[0]?.username}
        />
        <p className={`${styles.leaderboardCol} ${styles.leaderboardUsername}`}>{user[0]?.username.slice(0, 15)}</p>
      </div>
      <p className={styles.leaderboardCol}>{challenges}</p>
      <p className={styles.leaderboardCol}>{user[0]?.score}</p>
      <p className={`${styles.leaderboardCol} ${styles.leaderboardChallenges}`}>{user[0]?.challengesCreated}</p>
    </div>
  );
}
