import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/logo.module.css';

interface Props {
  isPrimary: boolean;
  size: number;
  column?: boolean;
}

export const Logo: FC<Props> = ({ isPrimary, size, column = false }) => {
  return (
    <div className={`${styles.logoContainer} ${column && styles.logoColumn}`}>

      <Image src={'/logo.svg'} alt='f-code' width={size} height={size} />
      {
        isPrimary ?
          <h1 className={styles.title}>{'FCode'}</h1>
          :
          <h3 className={styles.title}>{'FCode'}</h3>

      }
    </div>
  )
}
