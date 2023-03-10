import { ChallengeCard } from './ChallengeCard';
import styles from '../styles/challengesGrid.module.css'


export const ChallengesGrid = () => {
  return (
    <div className={styles.challengesGrid}>
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </div>
  );
}
