import { FC, useEffect, useState } from 'react';
import { Button, ErrorChallenge, Loader, TestPanel } from '.';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/challengeData.module.css';

interface Props {
  instructions: string;
  solveData: any;
}

export const ChallengeData: FC<Props> = ({ instructions, solveData }) => {
  const [tab, setTab] = useState(true);

  useEffect(() => {
    solveData.executed && setTab(false);
  }, [solveData]);

  return (
    <div className={styles.challengeData}>
      <div className={styles.actions}>
        <Button
          fn={() => setTab(true)}
          text={'Instructions'}
          variant={tab}
          size={1}
          w={250}
        />
        <Button
          fn={() => setTab(false)}
          text={'Results'}
          size={1}
          w={250}
          variant={!tab}
          disabled={!solveData.executed}
        />
      </div>

      <div>
        {
          !true ?
            <Loader />
            :
            tab ?
              <ReactMarkdown
                className={styles.markdownArea}
                remarkPlugins={[remarkGfm]}>
                {instructions}
              </ReactMarkdown>
              :
              (
                solveData.executed && !solveData.executionFailed ?
                  <TestPanel
                    errors={solveData.data.errors}
                    cases={solveData.data.cases}
                  />
                  :
                  <ErrorChallenge detailError={solveData.data.error} />
              )
        }
      </div>
    </div>
  );
}