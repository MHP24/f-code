import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Footer, Navbar } from '../ui';
import styles from './styles/mainLayout.module.css';


interface Props {
  title: string;
  pageDescription: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title = 'F-Code', pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </>
  );
}
