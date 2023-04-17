import { FC } from 'react';
import Image from 'next/image';
import styles from '../styles/sliderCard.module.css';

interface Props {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const SliderCard: FC<Props> = ({ id, title, description, imageSrc }) => {
  return (
    <div className={styles.sliderItem} key={id}>
      <div className={styles.sliderImageContainer}>
        <Image
          className={styles.sliderImage}
          alt={title}
          src={`/pictures/${imageSrc}`}
          fill
        />
      </div>
      <div className={styles.infoContainer}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.paragraph}>{description}</p>
      </div>
    </div>
  )
}
