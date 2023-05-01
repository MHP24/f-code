import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextPage } from 'next/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainLayout } from '@/components/layouts';
import { ChallengesGrid } from '@/components/ui';
import { IChallengeSearch } from '@/interfaces';
import { FormInput } from '@/components/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '@/styles/challenges.module.css';
import { usePagination } from '@/hooks';
interface Inputs {
  search: string;
};

interface Props {
  search: string;
  language: string;
}

const languages = [
  {
    url: 'javascript',
    name: 'JavaScript'
  },
  {
    url: 'typescript',
    name: 'TypeScript'
  },
  {
    url: 'python',
    name: 'Python'
  }
]

const Challenges: NextPage<Props> = ({ search, language }) => {
  const [inputSearch, setInputSearch] = useState<string>(search);
  const { register, handleSubmit } = useForm<Inputs>();
  const { data, hasMore, size, setSize } =
    usePagination<IChallengeSearch>(`/challenges/search?slug=${inputSearch}&language=${language}`);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { search } = data;
    const searchQuery = search
      .trim()
      .replace(/\s+/gi, ' ')
      .replace(/\s/gi, '_')
      .toLocaleLowerCase();

    router.replace(
      `/challenges${!router.query.language
        ? `?search=${searchQuery}`
        : `?language=${router.query.language}` +
        (searchQuery ? `&search=${searchQuery}` : '')}`);

    setInputSearch(searchQuery);
  };

  return (
    <MainLayout
      title={'F-Code Challenges'}
      pageDescription={'Search and start solving some challenge'}
    >
      <header className={styles.heading}>
        <form className={styles.searcher}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            className={styles.inputSearcher}
            placeHolder={'Search...'}
            type={'search'}
            {...register('search', { required: false })}
          />

          <ul className={styles.languagesLink}>
            {
              languages.map(({ url, name }, i) => {
                const queryParams = router.query.search ? `&search=${router.query.search}` : '';
                return (
                  <li className={styles.filter} key={`${url}${i}`}>
                    <Link href={`/challenges?language=${url}${queryParams}`}
                      className={styles.languageLink}
                    >
                      {name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </form>

      </header>


      <section className={styles.challengesContainer}>
        {
          <ChallengesGrid
            challenges={data || []}
            setSize={setSize}
            size={size}
            hasMore={hasMore ?? false}
          />
        }
      </section>
    </MainLayout >
  );
}

export default Challenges;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { search = '', language = '' } = query;
  return {
    props: {
      search,
      language
    }
  }
}
