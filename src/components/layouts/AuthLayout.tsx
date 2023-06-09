import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/authLayout.module.css';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { Navbar } from '../ui';
import Head from 'next/head';

interface Props {
  title: string;
  pageDescription: string;
  image: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, image }) => {

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    (async () => {
      setProviders(await getProviders());
    })()
  }, []);


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.authContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.contentImageContainer}>
              <video
                className={styles.video}
                src='/videos/2.mp4'
                autoPlay muted
                loop
                width={'100%'}
                height={'100%'}
              >
              </video>
            </div>
          </div>

          <div className={styles.formContainer}>
            {
              providers &&
              <div className={styles.form}>
                <h2 className={styles.authTitle}>{`${title} to FCode`}</h2>

                <div className={styles.providers}>
                  {
                    Object.values(providers).map(({ id, name }: ClientSafeProvider) => {
                      if (id !== 'credentials') {
                        return (
                          <button className={styles.provider} key={id} onClick={() => signIn(id)}>
                            <Image
                              className={styles.providerImage}
                              src={require(`/public/media/${id}.svg`)}
                              alt={name}
                              width={52}
                              height={49}
                            />
                          </button>
                        );
                      }
                    })

                  }
                </div>

                {children}

                {
                  title === 'Sign in' ?
                    <Link className={styles.link} href='/auth/sign_up'>Not registered?&nbsp;&nbsp;Create an account</Link>
                    :
                    <Link className={styles.link} href='/auth/sign_in'>Already registered?&nbsp;&nbsp;Sign in here</Link>
                }
              </div>
            }

          </div>
        </div>
      </main>
    </div>
  );
}
