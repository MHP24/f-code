import { FC, useState } from 'react';
import Image from 'next/image';
import arrowUp from '/public/illustrations/arrow-up.svg';
import arrowDown from '/public/illustrations/arrow-down.svg';
import styles from '../styles/testDropdown.module.css';

interface Props {
  caseNumber: number;
  caseStructure: string;
  expectedOutput: string;
  expectedType: string;
  output: string;
  passed: boolean;
}

export const TestDropdown: FC<Props> = ({
  caseNumber, passed, expectedOutput,
  expectedType, caseStructure, output
}) => {
  const [showContent, setshowContent] = useState<boolean>(false);

  return (
    <div className={styles.testDropdown}>
      <div className={`${styles.header} ${passed ? styles.headerSuccess : styles.headerFailed}`}
        onClick={() => setshowContent(!showContent)}
        role='button'
      >
        <div className={passed ? styles.successCircle : styles.failedCircle}></div>
        <p className={passed ? styles.successTitle : styles.failedTitle}>{`Test #${caseNumber}`}</p>
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
            <code className={styles.code}>
              <p>Test: {caseStructure}</p>
              <p>Returns: &nbsp;{expectedType}</p>

              <div>
                <p>Expected:</p>
                <p className={`${styles.successDetail} ${styles.detail}`}>{JSON.stringify(expectedOutput)}</p>
              </div>

              <div>
                <p>Actual:</p>
                <p className={`${passed ? styles.successDetail : styles.failedDetail} ${styles.detail}`}>{JSON.stringify(output)}</p>
              </div>

            </code>
          </div>
        )
      }
    </div>
  );
}
