import { FC, useState } from 'react';
import { EditorReward, Modal, TestDropdown } from '.';
import styles from '../styles/testPanel.module.css';
import { ISummaryCase } from '@/interfaces';

interface Props {
  errors: number;
  cases: ISummaryCase[];
}

export const TestPanel: FC<Props> = ({ errors, cases }) => {

  return (
    <div className={`${styles.testPanel} animate__animated animate__fadeIn`}>
      {
        errors > 0 ?
          <h2 className={`${styles.title} ${styles.failedTitle}`}>{`✘ ${errors} test${errors > 1 ? 's' : ''} didn't pass`}</h2>
          :
          <h2 className={`${styles.title} ${styles.successTitle}`}>{`✔ All test passed!`}</h2>
      }

      <ul>
        {
          cases &&
          cases.map(({ isCorrect, ...restProps }: ISummaryCase, i) => (
            <TestDropdown
              key={i}
              caseNumber={i + 1}
              passed={isCorrect}
              {...restProps}
            />
          ))
        }
      </ul>
    </div>
  );
}
