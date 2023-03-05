import Image from 'next/image';
import { FC } from 'react';
import styles from '../styles/featureCard.module.css';

interface Props {
  image: string;
  title: string;
  paragraph: string;
}


export const FeatureCard: FC<Props> = ({ image, title, paragraph }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <Image
          className={styles.icon}
          src={require(`/public/illustrations/${image}`)}
          width={150}
          height={150}
          alt={'simple'}
        />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.paragraph}>{paragraph}</p>
    </div>
  );
}
