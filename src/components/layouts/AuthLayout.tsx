import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Footer } from '../ui';
import styles from './styles/authLayout.module.css';

interface Props {
  title: string;
  pageDescription: string;
  image: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, image }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>

      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={require(`/public/pictures/${image}`)}
              alt={`${title} picture`}
              priority={true}
            />
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
                  src={require('/public/media/gmail.svg')}
                  alt={'GitHub'}
                />
              </div>
            </div>

            <form className={styles.form}>
              {children}


              {
                title === 'Sign in' ?
                <Link className={styles.link} href='/auth/sign_up'>Not registered?&nbsp;&nbsp;Create an account</Link>
                :
                <Link className={styles.link} href='/auth/sign_in'>Already registered?&nbsp;&nbsp;Sign in here</Link>
              }

              <div className={styles.formBtn}>
                <Button
                  text={title}
                  size={1.1}
                  w={250}
                  fn={() => { }}
                />
              </div>

            </form>
          </div>
        </div>
      </main>


      <Footer />
    </>

  );
}
