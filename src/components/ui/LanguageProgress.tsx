import { FC } from 'react';
import styles from '../styles/languageProgress.module.css';
import Image from 'next/image';
interface Props {
  language: string;
  percentage: number;
}

export const LanguageProgress: FC<Props> = ({ language, percentage }) => {
  return (
    <div className={styles.languageProgress}>
      <Image
        src={`techs/${language}.svg`}
        alt={language}
        width={40}
        height={40}
      />

      <div className={styles.progressBar}>
        <div className={`${styles.progressBar} progressBarFilled`}></div>
      </div>

      <style jsx>{`
          .progressBarFilled {
            background-color: var(--c1);
            width: ${percentage ?? 0}%;
          }
        
        
      `}
      </style>


      <p className={styles.percentage}>{`${percentage ?? 0}%`}</p>
    </div>

  );
}
