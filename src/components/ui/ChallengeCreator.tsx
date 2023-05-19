import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/challengeCreator.module.css';

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
  _id: string;
  slug: string;
  language: string;
  difficulty: number;
}

export const ChallengeCreator: FC<Props> = ({ _id, slug, language, difficulty }) => {
  return (
    <div className={`${styles.challenge} animate__animated animate__fadeIn`}>
      <div className={styles.challengeData}>
        <Image
          width={45}
          height={45}
          alt={language}
          src={`/techs/${language}.svg`}
        />
        <p className={styles.dataContent}>{`#${_id}`}</p>
        <p className={styles.dataContent}>{slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toLocaleUpperCase())}</p>
        <div className={`${styles.difficulty} ${difficulties[difficulty].class}`}></div>
      </div>
      <div className={styles.challengeOptions}>
        <Link href={`/challenges/${language}/${slug}`} target='_blank' className={styles.option}>
          <Image
            width={25}
            height={25}
            alt='visit'
            src={'/illustrations/plane.svg'}
          />
        </Link>

        <Link href={'/challenges'} className={styles.option}>
          <Image
            width={25}
            height={25}
            alt='edit'
            src={'/illustrations/edit.svg'}
          />
        </Link>

        <button className={styles.option} >
          <Image
            width={25}
            height={25}
            alt='download'
            src={'/illustrations/download.svg'}
          />
        </button>
      </div>
    </div >
  );
}
