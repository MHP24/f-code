import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/challengeCard.module.css';

export const ChallengeCard = () => {
  return (
    <Link
      href={`/challenges/javascript/213`}
      className={styles.challengeCard}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.challengeTech}
          src={require('/public/techs/typescript.svg')}
          alt={'JavaScript'}
        />
      </div>

      <div className={styles.challengeData}>
        <p className={styles.challengeName}>Lorem ipsum dolor sit amet</p>
        <ul className={styles.challengeTags}>
          <li className={styles.challengeTag}>Recursion</li>
          <li className={styles.challengeTag}>Regex</li>
          <li className={`${styles.challengeTag} ${styles.challengeDifficulty}`}>Hard</li>
        </ul>
      </div>
    </Link>
  );
}
