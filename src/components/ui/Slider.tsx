import { FC, useEffect, useState } from 'react';
import styles from '../styles/slider.module.css';
import { SliderCard } from '.';

interface Props {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface ArrayProps {
  slides: Props[];
}

export const Slider: FC<ArrayProps> = ({ slides }) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide + 1 > slides.length - 1 ? 0 : currentSlide + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);


  return (
    <div className={styles.slider}>
      <SliderCard
        id={slides[currentSlide].id}
        title={slides[currentSlide].title}
        description={slides[currentSlide].description}
        imageSrc={slides[currentSlide].imageSrc} 
      />
      <ul className={styles.dots}>
        {
          Array(slides.length).fill('').map((_, i) => (
            <li
              className={`${styles.dot} ${currentSlide === i && styles.activeDot}`}
              key={`slider-dot-${i}`}
              onClick={() => setCurrentSlide(i)}
            >
            </li>
          ))
        }
      </ul>
    </div>
  );
}
