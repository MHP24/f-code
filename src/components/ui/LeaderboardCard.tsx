import styles from '../styles/leaderboardCard.module.css';

export const LeaderboardCard = () => {
  return (
    <div className={styles.leaderboardCard}>
      <h3 className={styles.title}>Your Stats</h3>
      <div className={styles.container}>
        <div className={styles.dataGroup}>
          <p className={`${styles.dataPrimary} ${styles.rank}`}>34</p>
          <p className={styles.dataSecondary}>Rank</p>
        </div>

        <div className={styles.dataGroup}>
          <p className={`${styles.dataPrimary} ${styles.points}`}>2399</p>
          <p className={styles.dataSecondary}>Points</p>

        </div>
      </div>
    </div>
  );
}
