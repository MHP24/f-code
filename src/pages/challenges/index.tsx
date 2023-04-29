import { useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import { MainLayout } from '@/components/layouts';
import styles from '@/styles/challenges.module.css';
import { ChallengesGrid } from '@/components/ui';
import { IChallengeSearch } from '@/interfaces';
import { fCodeApi } from '@/api';
import useSWR from 'swr';


const Challenges: NextPage = () => {
  const [showFilter, setShowFilter] = useState<Boolean>(false);
  // const [challenges, setChallenges] = useState<IChallengeSearch[] | null>(null);
  // const [slug, setSlug] = useState('');

  const { data, error, isLoading } = useSWR<IChallengeSearch[]>('/api/challenges',
    async (url) => {
      const { data } = await fCodeApi.get(url);
      return data;
    })

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await fCodeApi.get(`/challenges/search?language=`);
  //       setChallenges(data);
  //     } catch (error) {
  //       setChallenges([]);
  //     }
  //   })();
  // }, []);

  return (
    <MainLayout
      title={'F-Code Challenges'}
      pageDescription={'Search and start resolving some challenge'}
    >
      <header className={styles.heading}>
        <div className={styles.searchBanner}>
        </div>

        <form className={styles.searcher}
        >
          <input
            className={styles.inputSearcher}
            type='text'
            // value={slug}
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
              </ul>
            }

          </div>
        </form>

      </header>

      <section>
        {
          isLoading ?
            <p>Loading.....</p>
            :
            <ChallengesGrid challenges={data || null} />
        }
      </section>
    </MainLayout>
  );
}

export default Challenges;
