import { FC, useState } from 'react';
import Image from 'next/image';
import arrowUp from '/public/illustrations/arrow-up.svg';
import arrowDown from '/public/illustrations/arrow-down.svg';
import styles from '../styles/testDropdown.module.css';

interface Props {
  passed: boolean;
}

export const TestDropdown: FC<Props> = ({ passed }) => {
  const [showContent, setshowContent] = useState<boolean>(false);

  return (
    <div className={styles.testDropdown}>
      <div className={styles.header}
        onClick={() => setshowContent(!showContent)}
        role='button'
      >
        <div className={passed ? styles.successCircle : styles.failedCircle}></div>
        <p className={passed ? styles.successTitle : styles.failedTitle}>{`Test #1`}</p>
        {/* <p className={styles.dropIndicator}>{`*`}</p> */}
        {
          showContent ?
            <Image className={styles.arrowSuccess} src={arrowUp} alt={'arrow-up'} />
            :
            <Image className={styles.arrowSuccess} src={arrowDown} alt={'arrow-down'} />
        }
      </div>
      {
        showContent && (
          <div className={styles.body}>
            <p className={styles.code}>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum neque, dolores
              inventore magni alias voluptatum amet veniam
              dicta laboriosam reiciendis!
            </p>
          </div>
        )
      }
    </div>
  );
}
