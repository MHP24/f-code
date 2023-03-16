import { LeaderboardCard, LeaderboardRow } from '.';
import styles from '../styles/leaderboard.module.css';
export const Leaderboard = () => {
  return (
    <section className={styles.leaderboard}>
      <LeaderboardCard />
      <div className={styles.leaderboardHeader}>
        <p className={styles.leaderboardCol}>Position</p>
        <p className={styles.leaderboardCol}>Name</p>
        <p className={styles.leaderboardCol}>Challenges</p>
        <p className={styles.leaderboardCol}>Points</p>
        <p className={styles.leaderboardCol}>Created</p>
      </div>
      {
        Array(50).fill('').map((_, i) => (
          <LeaderboardRow
            key={`leaderboard-position-${i + 1}`}
            position={i + 1} />
        ))
      }
    </section>
  );
}
