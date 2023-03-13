import { GetServerSideProps, NextPage } from 'next';
import Editor from '@monaco-editor/react';
import { MainLayout } from '@/components/layouts';
import styles from '../../../styles/challenge.module.css';
import { ChallengeData } from '@/components/ui';
import { useState } from 'react';

interface Props {
  language: string;
  challenge: string;
}

const Challenge: NextPage<Props> = ({ language, challenge }) => {
  return (
    <MainLayout
      title={challenge}
      pageDescription={`${language} - Challenge ${challenge}`}
    >
      <div className={styles.challengePanel}>
        <Editor
          className={styles.editor}
          height={'calc(90vh - 1em)'}
          defaultLanguage='javascript'
          theme={'vs-dark'}
          options={{
            fontSize: 18,
            lineHeight: 1.4,
            fontLigatures: true,
            lineNumbers: 'off'
          }}
        />

        <ChallengeData />

      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { language = '', challenge = '' } = params as { language: string, challenge: string };

  if (!language || !challenge) {
    return {
      redirect: {
        permanent: true,
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
