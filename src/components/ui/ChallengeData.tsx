import { FC, useEffect, useState, memo } from 'react';
import { Button, ErrorChallenge, TestLoader, TestPanel } from '.';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/challengeData.module.css';
import { IExecutionState, IExecutionSummary } from '@/interfaces';

interface Props {
  instructions: string;
  solveData: IExecutionState;
}

export const ChallengeData: FC<Props> = memo(({ instructions, solveData }) => {
  const [tab, setTab] = useState(true);
  const { data: { errors, cases } } = solveData as { data: IExecutionSummary };

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
          solveData.isExecuting ?
            <TestLoader />
            :
            tab ?
              <ReactMarkdown
                className={styles.markdownArea}
                remarkPlugins={[remarkGfm]}>
                {instructions}
              </ReactMarkdown>
              :
              (
                solveData && solveData.executed && !solveData.executionFailed ?
                  <TestPanel
                    errors={errors}
                    cases={cases}
                  />
                  :
                  <ErrorChallenge detailError={`${solveData.error}`} />
              )
        }
      </div>
    </div>
  );
})

ChallengeData.displayName = 'ChallengeData';