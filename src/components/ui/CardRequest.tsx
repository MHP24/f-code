import { FC } from 'react';
import Image from 'next/image';
import { IChallengeRequest } from '@/interfaces';
import styles from '../styles/cardRequest.module.css';

interface IStatus {
  [key: number]: { class: string, label: string };
}

const difficulties: IStatus = {
  1: { class: styles.pending, label: 'Pending' },
  2: { class: styles.denied, label: 'Denied' },
  3: { class: styles.approved, label: 'Approved' },
};

export const CardRequest: FC<IChallengeRequest> = ({ _id, language, status, updatedAt }) => {
  return (
    <div className={`${styles.card} animate__animated animate__fadeIn`}>
      <Image
        src={`/techs/${language}.svg`}
        height={45}
        width={45}
        alt={language}
      />

      <p className={styles.cardData}>{`#${_id}`}</p>
      <p className={`${styles.cardData} ${styles.status} ${difficulties[status].class}`}>{difficulties[status].label}</p>
      <p className={`${styles.cardData} ${styles.date}`}>{`${new Date(updatedAt).toUTCString().split(' ').slice(0, -1).join(' ')}`}</p>
    </div>
  );
}
