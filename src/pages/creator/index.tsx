import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { MainLayout } from '@/components/layouts';
import { IChallenge, IChallengeRequest, ISession } from '@/interfaces';
import { ChallengeCreatorGrid, CreatorRequestGrid, FormInput } from '@/components/ui';
import styles from '@/styles/creators.module.css';
import { usePagination } from '@/hooks';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';


interface Inputs {
  search: string;
};

const CreatorPage: NextPage<ISession> = ({ user }) => {

  const [showChallenges, setShowChallenges] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const { register, handleSubmit } = useForm<Inputs>();

  const { data, hasMore, size, setSize, isLoading } =
    usePagination<IChallenge>(`/creators/challenges?creatorId=${user._id}&search=${search}`);

  const requestData =
    usePagination<IChallengeRequest>(`/creators/requests?creatorId=${user._id}`);


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
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              className={`${styles.searcher} ${!showChallenges && styles.searcherDisabled}`}
              placeHolder='Search...'
              {...register('search', { required: false })}
              disabled={!showChallenges}
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
              Requests
            </button>
          </div>
        </header>

        <section>
          {
            showChallenges ?
              <ChallengeCreatorGrid
                challenges={data || []}
                hasMore={hasMore ?? false}
                size={size}
                setSize={setSize}
                isLoading={isLoading}
              />

              :
              <CreatorRequestGrid requestData={requestData} />
          }
        </section>

        <Link
          href={'/creator/submit'}
          target='_blank'
          className={styles.addChallenge}
        >
          <Image
            src={'/illustrations/add.svg'}
            width={40}
            height={40}
            alt='add'
          />
        </Link>
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
        destination: '/creator/apply',
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
