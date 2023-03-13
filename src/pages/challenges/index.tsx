import { useState } from 'react';
import { NextPage } from 'next/types';
import { MainLayout } from '@/components/layouts';
import styles from '@/styles/challenges.module.css';
import { ChallengesGrid } from '@/components/ui';

const Challenges: NextPage = () => {
  const [showFilter, setShowFilter] = useState<Boolean>(false);

  return (
    <MainLayout
      title={'F-Code Challenges'}
      pageDescription={'Search and start resolving some challenge'}
    >
      <header className={styles.heading}>
        <div className={styles.searchBanner}>
        </div>

        <div className={styles.searcher}>
          <input
            className={styles.inputSearcher}
            type='text'
            placeholder='Search...' />
          <div className={styles.filter}>
            <button
              className={styles.filterBtn}
              onClick={() => setShowFilter(!showFilter)}
            >
              {'Filter'}
            </button>
            {
              showFilter &&
              <ul className={styles.filters}>
                <li className={styles.filterItem}>JavaScript</li>
                <li className={styles.filterItem}>Python</li>
                <li className={styles.filterItem}>TypeScript</li>
                <li className={styles.filterItem}>Html+Css</li>
              </ul>
            }

          </div>
        </div>

      </header>

      <section>
        <ChallengesGrid/>

      </section>
    </MainLayout>
  );
}

export default Challenges;
