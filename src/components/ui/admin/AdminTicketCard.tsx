import { FC } from 'react'
import Image from 'next/image';
import { IUserActionReport } from '@/interfaces'
import styles from '../../styles/admin/adminTicketCard.module.css';

export const AdminTicketCard: FC<IUserActionReport> = ({ _id, username, picture, createdAt, userId, reporterId }) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardData}>{`#${_id}`}</p>
      <div className={styles.cardGroup}>
        <Image
          className={styles.cardImage}
          src={picture}
          alt={username.slice(0, 4)}
          width={40}
          height={40}
        />
        <p className={`${styles.cardData} ${styles.username}`}>{username}</p>
      </div>
      <p className={styles.cardData}>{userId}</p>
      <p className={styles.cardData}>{createdAt}</p>

      <div className={styles.cardActions}>
        <button className={styles.action}>
          <p className={`${styles.actionText} ${styles.actionTextNo}`}>{'✘'}</p>
        </button>

        <button className={styles.action}>
          <p className={`${styles.actionText} ${styles.actionTextYes}`}>{'✔'}</p>
        </button>
      </div>

      <p className={styles.cardData}>{`By: #${reporterId}`}</p>
    </div>
  )
}
