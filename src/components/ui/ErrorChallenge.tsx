import { FC } from 'react';
import styles from '../styles/errorChallenge.module.css';
import Image from 'next/image';

interface Props {
  detailError: string;
}

export const ErrorChallenge: FC<Props> = ({ detailError }) => {
  return (
    <div className={styles.errorContainer}>
      <Image
        className={styles.image}
        src={'/illustrations/sad.svg'}
        width={200}
        height={200}
        alt='error-sad-illustration'
      />
      <p className={styles.error}>{detailError}</p>
    </div>
  );
}
