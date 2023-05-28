import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { AdminNavbar } from '../ui';
import styles from './styles/adminLayout.module.css';

interface Props {
  title: string;
  pageDescription: string;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{`FCode Admin | ${title}`}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>

      <div className={styles.layoutBody}>
        <AdminNavbar />

        <main className={styles.main}>
          <div className={styles.childrenContainer}>
            <h2 className={styles.pageTitle}>{title}</h2>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
