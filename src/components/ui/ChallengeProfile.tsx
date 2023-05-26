import Image from 'next/image';
import React, { FC } from 'react';
import styles from '../styles/challengeProfile.module.css';
import Link from 'next/link';


interface IDifficulties {
  [key: number]: { class: string };
}

const difficulties: IDifficulties = {
  1: { class: styles.easy },
  2: { class: styles.medium },
  3: { class: styles.hard },
  4: { class: styles.insane },
};


interface Props {
  updatedAt: string;
  challenge: {
    _id: string;
    slug: string;
    language: string;
    difficulty: number;
  };
}

export const ChallengeProfile: FC<Props> = ({ updatedAt, challenge }) => {
  return (
    <Link
      className={styles.challengeProfile}
      href={`/challenges/${challenge.language}/${challenge.slug}`}
      target='_blank'
    >
      <Image
        className={styles.challengeImages}
        src={`/techs/${challenge.language}.svg`}
        width={35}
        height={35}
        alt={challenge.language}

      />

      <p className={styles.challengeData}>{challenge._id}</p>
      <p className={styles.challengeData}>{challenge.slug.replace(/\_+/gi, ' ').replace(/^\w/gi, w => w.toLocaleUpperCase())}</p>
      <div className={`${styles.difficulty} ${difficulties[challenge.difficulty].class}`}></div>
      <p className={`${styles.challengeData} ${styles.date}`}>{`${new Date(updatedAt).toUTCString().split(' ').slice(0, -1).join(' ')}`}</p>
    </Link>
  );
}
