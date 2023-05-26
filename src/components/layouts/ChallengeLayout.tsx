import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { NavbarChallenge } from '../ui';
import styles from './styles/challengeLayout.module.css';

interface Props {
  title: string;
  pageDescription: string;
  difficulty: number;
  isCompleted: boolean;
}

export const ChallengeLayout: FC<PropsWithChildren<Props>> = ({ children, title = 'F-Code', pageDescription, ...rest }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>

      <NavbarChallenge {...{ ...rest, title }} />

      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}
