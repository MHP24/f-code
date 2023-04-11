import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/authLayout.module.css';
import { MainLayout } from './MainLayout';

interface Props {
  title: string;
  pageDescription: string;
  image: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, image }) => {
  return (
    <>
      <MainLayout
        pageDescription={pageDescription}
        title={title}
      >
        <main className={styles.main}>
          <div className={styles.authContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.imageSignIn}>

              </div>
            </div>

            <div className={styles.formContainer}>
              <h2 className={styles.authTitle}>{`${title} to F-Code`}</h2>

              <div className={styles.providers}>
                <div className={styles.provider}>
                  <Image
                    className={styles.providerImage}
                    src={require('/public/media/github.svg')}
                    alt={'GitHub'}
                  />
                </div>
                <div className={styles.provider}>
                  <Image
                    className={styles.providerImage}
                    src={require('/public/media/google-logo.png')}
                    alt={'GitHub'}
                  />
                </div>
              </div>

              {children}

              {
                title === 'Sign in' ?
                  <Link className={styles.link} href='/auth/sign_up'>Not registered?&nbsp;&nbsp;Create an account</Link>
                  :
                  <Link className={styles.link} href='/auth/sign_in'>Already registered?&nbsp;&nbsp;Sign in here</Link>
              }
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
