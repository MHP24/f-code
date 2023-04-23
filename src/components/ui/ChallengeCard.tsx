import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IChallengeSearch } from '@/interfaces';
import styles from '../styles/challengeCard.module.css';

export const ChallengeCard: FC<IChallengeSearch> = ({ slug, language, tags, difficulty }) => {
  return (
    <Link
      href={`/challenges/${language}/${slug}`}
      className={styles.challengeCard}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.challengeTech}
          width={90}
          height={90}
          src={require(`/public/techs/${language}.svg`)}
          alt={`${language} image`}
        />
      </div>

      <div className={styles.challengeData}>
        <p className={styles.challengeName}>{slug.replace(/\_+/gi, ' ').replace(/^\w/gi, w => w.toLocaleUpperCase())}</p>
        <ul className={styles.challengeTags}>
          <li className={styles.challengeTag}>{tags[0]}</li>
          <li className={styles.challengeTag}>{tags[1]}</li>
          <li className={`${styles.challengeTag} ${styles.challengeDifficulty}`}>{difficulty}</li>
        </ul>
      </div>
    </Link>
  );
}
