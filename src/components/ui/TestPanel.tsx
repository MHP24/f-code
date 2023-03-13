import { FC } from 'react';
import { TestDropdown } from '.';
import styles from '../styles/testPanel.module.css';
interface Props {
  failed: boolean;
}

export const TestPanel: FC<Props> = ({ failed }) => {
  return (
    <div className={styles.testPanel}>

      {
        failed ?
          <h2 className={styles.failedTitle}>{`Failed: 1 test didn't pass`}</h2>
          :
          <h2 className={styles.successTitle}>{`Success: All test passed!`}</h2>

      }


      <TestDropdown />
      <TestDropdown />
      <TestDropdown />
      <TestDropdown />
      <TestDropdown />
      <TestDropdown />
    </div>
  );
}
