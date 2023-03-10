import { GetServerSideProps, NextPage } from 'next';

interface Props {
  language: string;
  challenge: string;
}

const Challenge: NextPage<Props> = ({ language, challenge }) => {
  return (
    <section>
      <div> language {language}</div>
      <div> challengeId {challenge}</div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { language = '', challenge = '' } = params as { language: string, challenge: string };

  if (!language || !challenge) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      language,
      challenge
    }
  }
}

export default Challenge;
