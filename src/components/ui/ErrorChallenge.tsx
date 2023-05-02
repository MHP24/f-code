import { FC } from 'react';
import styles from '../styles/errorChallenge.module.css';

interface Props {
  detailError: string;
}

export const ErrorChallenge: FC<Props> = ({ detailError }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorIllustration}>{'✘'}</p>
      <p className={styles.error}>{detailError}</p>
    </div>
  );
}
