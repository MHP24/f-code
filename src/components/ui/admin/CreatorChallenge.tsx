import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IChallengeRequestSearch } from '@/interfaces';
import styles from '../../styles/admin/creatorChallenge.module.css';

interface IDifficulties {
  [key: number]: { tag: string; class: string };
}

const difficulties: IDifficulties = {
  1: { tag: 'Easy', class: styles.easy },
  2: { tag: 'Medium', class: styles.medium },
  3: { tag: 'Hard', class: styles.hard },
  4: { tag: 'Insane', class: styles.insane },
};

export const CreatorChallenge: FC<IChallengeRequestSearch> = ({ _id, slug, language, difficulty, reason, createdAt }) => {
  return (
    <Link
      href={`/admin/requests/detail/${_id}`}
      className={`${styles.challengeCard} animate__animated animate__fadeIn`}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.challengeTech}
          width={60}
          height={60}
          src={require(`/public/techs/${language}.svg`)}
          alt={`${language} image`}
        />
      </div>

      <div className={styles.challengeData}>
        <p className={styles.challengeName}>{slug.replace(/\_+/gi, ' ').replace(/^\w/gi, w => w.toLocaleUpperCase())}</p>
        <p className={styles.challengeDate}>{`${new Date(createdAt!).toUTCString().split(' ').slice(0, -1).join(' ')}`}</p>
        <ul className={styles.challengeDetails}>
          < li className={`${styles.challengeDetail} ${difficulties[difficulty].class} ${styles.difficultyTag}`}>{`${difficulties[difficulty].tag}`}</li>
          <li className={`${styles.challengeDetail} ${styles.reason} ${reason === 'update' ? styles.update : styles.create}`}>
            {reason.replace(/^\w/, w => w.toUpperCase())}
          </li>
        </ul>
      </div>
    </Link>
  );
}
