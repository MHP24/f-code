import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/testDropdown.module.css';
import arrowUp from '/public/illustrations/arrow-up.svg';
import arrowDown from '/public/illustrations/arrow-down.svg';

export const TestDropdown = () => {
  const [showContent, setshowContent] = useState<boolean>(false);

  return (
    <div className={styles.testDropdown}>
      <div className={styles.header}
        onClick={() => setshowContent(!showContent)}
        role='button'
      >
        <div className={styles.circle}></div>
        <p className={styles.testTitle}>{`Test #1`}</p>
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
