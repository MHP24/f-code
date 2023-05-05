import { FC } from 'react';
import Link from 'next/link';
import { LeaderboardCard, LeaderboardRow } from '.';
import styles from '../styles/leaderboard.module.css';
import { ILeaderboardData } from '@/interfaces';


export const Leaderboard: FC<ILeaderboardData> = ({ userRanking, leaderboard }) => {

  return (
    <section className={`${styles.leaderboard} animate__animated animate__fadeIn`}>
      {
        userRanking ? (
          <LeaderboardCard
            {...userRanking}
          />
        ) :

          <div className={styles.noAccountContainer}>
            <h2 className={styles.noAccountTitle}>Be part of the competition creating your account now!</h2>
            <Link className={styles.noAccountLink} href={'/auth/sign_in'}>Start here</Link>
          </div>
      }

      {
        !leaderboard.length ?
          <p className={styles.leaderboardNoHeader}>No one has points yet!</p>
          :
          <div className={styles.leaderboardHeader}>
            <p className={styles.leaderboardCol}>Position</p>
            <p className={styles.leaderboardCol}>Name</p>
            <p className={styles.leaderboardCol}>Challenges</p>
            <p className={styles.leaderboardCol}>Points</p>
            <p className={styles.leaderboardCol}>Created</p>
          </div>
      }

      {
        leaderboard.map(({ challenges, user }, i) => (
          <LeaderboardRow
            key={`leaderboard-position-${i + 1}`}
            position={i + 1}
            challenges={challenges}
            user={user}
          />
        ))
      }
    </section>
  );
}
