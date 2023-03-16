import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/challengeCard.module.css';

export const ChallengeCard = () => {
  return (
    <Link
      href={`/challenges/typescript/challenge_name_id`}
      className={styles.challengeCard}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.challengeTech}
          width={90}
          height={90}
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
