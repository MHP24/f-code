import { FC } from 'react';
import styles from '../styles/dualCard.module.css';
import Image from 'next/image';

interface Props {
  reverse?: boolean;
  title: string;
  description: string;
}


export const DualCard: FC<Props> = ({ title, description, reverse = false }) => {
  return (
    <>
      {
        reverse ?

          (
            <div className={styles.cardReverse}>
              <div className={styles.sideB}>
                <div className={styles.video}></div>
              </div>
              <div className={styles.sideA}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </div>
            </div>
          )

          :

          (
            <div className={styles.card}>
              <div className={styles.sideA}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </div>

              <div className={styles.sideB}>
                <div className={styles.video}>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}
