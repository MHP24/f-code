import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { AdminNavbar } from '../ui';
import styles from './styles/adminLayout.module.css';
import { useSession } from 'next-auth/react';
import { ISession } from '@/interfaces';

interface Props {
  title: string;
  pageDescription: string;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription }) => {

  const session = useSession();
  const data = session.data as ISession | undefined;

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
          <header className={styles.header}>
            <div className={styles.headerStart}>
              <h2 className={styles.pageTitle}>{title}</h2>
            </div>
            <div className={styles.headerEnd}>

              <p className={styles.date}>{new Date().toUTCString().split(' ').slice(0, 4).join(' ')}</p>

              {
                session.data &&
                <div className={styles.profileLink}>
                  <Image
                    src={`${data?.user.picture}`}
                    width={40}
                    height={40}
                    alt={`${data?.user.username}`}
                    className={styles.profilePicture}
                  />
                  {/* <p className={styles.profileUsername}>{`${data?.user.username}`.slice(0, 15)}</p> */}
                </div>
              }


            </div>
          </header>
          <div className={styles.childrenContainer}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}