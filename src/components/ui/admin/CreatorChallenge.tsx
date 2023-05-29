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
    <tr className={`${styles.card} animate__animated animate__fadeIn`}>
      <td>
        <div className={styles.techImg}>

          <Image
            src={`/techs/${language}.svg`}
            width={25}
            height={25}
            alt={language}
          />
        </div>
      </td>
      <td className={`${styles.cardData} ${styles.cardId}`}>{`#${_id}`}</td>
      <td className={`${styles.cardData} ${styles.cardName}`}>
        {slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase())}
      </td>
      <td className={`${styles.cardData}`}>
        <p className={`${difficulties[difficulty].class} ${styles.difficulty}`}>{
          difficulties[difficulty].tag}
        </p>
      </td>
      <td className={`${styles.cardData}`}>
        <p className={` ${styles.reason} ${reason === 'update' ?
          styles.update : styles.create}`}>
          {reason.replace(/^\w/, w => w.toUpperCase())}
        </p>
      </td>
      <td className={styles.cardData}>
        {`${new Date(createdAt).toUTCString().split(' ').slice(0, -1).join(' ')}`}
      </td>
      <td className={styles.cardData}>
        <Link
          href={`/admin/requests/detail/${_id}`}
          className={styles.action}
        >
          <Image
            src={'/illustrations/plane.svg'}
            width={25}
            height={25}
            alt='check'
          />

        </Link></td>
    </tr>
  );
}
