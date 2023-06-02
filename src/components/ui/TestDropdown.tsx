import { FC, useContext, useState } from 'react';
import styles from '../styles/testDropdown.module.css';
import { ChallengeContext } from '@/context';

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
  const { isNative } = useContext(ChallengeContext);

  return (
    <div className={styles.testDropdown}>
      <div className={`${styles.header} ${caseNumber < 5 && !showContent ? passed ? styles.headerSuccess : styles.headerFailed : ''}`}
        onClick={() => caseNumber < 5 && setshowContent(!showContent)}
        role='button'
      >
        <div className={passed ? styles.successCircle : styles.failedCircle}></div>
        <p className={passed ? styles.successTitle : styles.failedTitle}>{`Test #${caseNumber}`}</p>
        {
          caseNumber < 5 ?
            showContent ?
              <p className={`${styles.arrow} ${passed ? styles.arrowSuccess : styles.arrowFailed}`}>{'︿'}</p>
              :
              <p className={`${styles.arrow} ${passed ? styles.arrowSuccess : styles.arrowFailed}`}>{'﹀'}</p>
            :
            <p>{'🔒'}</p>
        }
      </div>
      {
        showContent && caseNumber < 5 && (
          <div className={styles.body}>
            <code className={styles.code}>
              <p>Test: {caseStructure}</p>
              <p>Returns: &nbsp;{expectedType}</p>

              <div>
                <p>Expected:</p>
                {
                  isNative ?
                    <p className={`${styles.successDetail} ${styles.detail}`}>{JSON.stringify(expectedOutput)}</p>
                    :
                    <p className={`${styles.successDetail} ${styles.detail}`}>{expectedOutput ?? 'undefined'}</p>
                }
              </div>

              <div>
                <p>Actual:</p>
                {
                  isNative ?
                    <p className={`${passed ? styles.successDetail : styles.failedDetail} ${styles.detail}`}>{JSON.stringify(output ?? 'undefined')}</p>
                    :
                    <p className={`${passed ? styles.successDetail : styles.failedDetail} ${styles.detail}`}>{output ?? 'undefined'}</p>
                }
              </div>

            </code>
          </div>
        )
      }
    </div>
  );
}
