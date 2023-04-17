import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/authLayout.module.css';
import { MainLayout } from './MainLayout';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { slides } from '../../static/authSlider.json';
import { Slider } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  image: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, image }) => {

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    (async () => {
      const _providers = await getProviders();
      setProviders(_providers);
    })()
  }, []);


  return (
    <>
      <MainLayout
        pageDescription={pageDescription}
        title={title}
      >
        <main className={styles.main}>
          <div className={styles.authContainer}>
            <div className={styles.contentContainer}>
              <Slider slides={slides} />
            </div>

            <div className={styles.formContainer}>
              <h2 className={styles.authTitle}>{`${title} to F-Code`}</h2>

              <div className={styles.providers}>
                {
                  providers &&
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
          </div>
        </main>
      </MainLayout>
    </>
  );
}
