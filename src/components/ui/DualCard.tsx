import { FC } from 'react';
import styles from '../styles/dualCard.module.css';
import Image from 'next/image';

interface Props {
  reverse?: boolean;
  title: string;
  description: string;
  videoRef: string;
}


export const DualCard: FC<Props> = ({ title, description, reverse = false, videoRef }) => {
  return (
    <>
      {
        reverse ?

          (
            <div className={styles.cardReverse}>
              <div className={styles.sideB}>
                <div className={styles.video}>
                  <video
                    className={styles.videoPlayer}
                    src={`/videos/${videoRef}.mp4`}
                    autoPlay muted
                    loop
                    width={'100%'}
                    height={'100%'}
                  >
                  </video>
                </div>
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
                  <video
                    className={styles.videoPlayer}
                    src={`/videos/${videoRef}.mp4`}
                    autoPlay muted
                    loop
                    width={'100%'}
                    height={'100%'}
                  >
                  </video>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}
