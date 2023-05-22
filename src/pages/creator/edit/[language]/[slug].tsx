import { db } from '@/database';
import { ISession } from '@/interfaces';
import { Challenge } from '@/models';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';


interface Props {
  _id: string;
  slug: string;
  tags: string[];
  instructions: string;
  code?: string;
  cases: {
    call: string;
    expectedOutput: any;
  };
}

const Slug: NextPage<Props> = (challengeProps) => {

  console.log({ challengeProps });

  return (
    <div>Slug edit page</div>
  );
}

export default Slug;


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  try {
    const session = await getSession({ req });
    const { language, slug } = params as { language: string, slug: string };

    if (!session || !language || !slug) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const { user } = session as ISession;

    await db.connect();
    const challenge = await Challenge
    .findOne({ creatorId: user._id, language, slug })
    .select('_id slug tags instructions code cases')
    .lean();


    if (!challenge) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {
        
      }
    }
  } catch (error) {
    console.error({ error });
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } finally {
    await db.disconnect();
  }
}