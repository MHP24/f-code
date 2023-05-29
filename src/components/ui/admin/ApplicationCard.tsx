import { FC } from 'react';
import Image from 'next/image';
import { ISearchCreatorRequest } from '@/interfaces';
import styles from '../../styles/admin/applicationCard.module.css';
import Link from 'next/link';

export const ApplicationCard: FC<ISearchCreatorRequest> = ({ _id, subject, createdAt, userId: { username, picture } }) => {
  return (
    <Link className={`${styles.card} animate__animated animate__fadeIn`} href={`/admin/applications/detail/${_id}`}>
      <div className={styles.userData}>
        <Image
          className={styles.userPicture}
          src={picture}
          alt={username}
          width={25}
          height={25}
        />

        <p className={styles.data}>{username.slice(0, 15)}</p>
      </div>
      <p className={styles.data}>{`#${_id}`}</p>
      <p className={styles.data}>{subject.slice(0, 10)}</p>
      <p className={styles.data}>{`${new Date(createdAt).toUTCString().split(' ').slice(0, -1).join(' ')}`}</p>

    </Link>
  );
}
