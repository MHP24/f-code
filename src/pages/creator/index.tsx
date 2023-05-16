import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { MainLayout } from '@/components/layouts';
import { IChallenge, ISession } from '@/interfaces';
import { ChallengeCreatorGrid, FormInput } from '@/components/ui';
import styles from '@/styles/creators.module.css';
import { usePagination } from '@/hooks';
import { useForm } from 'react-hook-form';


interface Inputs {
  search: string;
};


const CreatorPage: NextPage<ISession> = ({ user }) => {

  const [showChallenges, setShowChallenges] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const { register, handleSubmit } = useForm<Inputs>();

  const { data, hasMore, size, setSize, isLoading } =
    usePagination<IChallenge>(`/creators/challenges?creatorId=${user._id}&search=${search}`);

  const onSubmit = (data: Inputs) => {
    const { search } = data;
    setSearch(search);
  }

  return (
    <MainLayout
      pageDescription='Creator panel'
      title='Creator'
    >
      <section className={styles.creatorContainer}>
        <header className={styles.header}>
          <h2 className={styles.title}>{`Here's your challenges ${user.username}!`}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              className={styles.searcher}
              placeHolder='Search...'
              {...register('search', { required: false })}
            />
          </form>

          <div className={styles.menu}>
            <button
              className={`${styles.menuOption} ${showChallenges && styles.currentOption}`}
              onClick={() => setShowChallenges(true)}
            >
              Challenges
            </button>
            <button
              className={`${styles.menuOption} ${!showChallenges && styles.currentOption}`}
              onClick={() => setShowChallenges(false)}
            >
              History
            </button>
          </div>
        </header>

        <section>
          <ChallengeCreatorGrid
            challenges={data || []}
            hasMore={hasMore ?? false}
            size={size}
            setSize={setSize}
            isLoading={isLoading}
          />
        </section>
      </section>
    </MainLayout>
  );
}


export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign_in',
        permanent: false
      }
    };
  }

  const { user } = session as ISession;

  if (user.role !== 'creator') {
    return {
      redirect: {
        destination: '/creator/request',
        permanent: false
      }
    }
  }

  return {
    props: {
      user
    }
  }
}

export default CreatorPage;
