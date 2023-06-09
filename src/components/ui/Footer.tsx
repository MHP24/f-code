import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/footer.module.css';
import { Logo } from '.';


export const Footer = () => {
  return (
    <footer className={styles.footer}>

      <Logo isPrimary={false} size={50} column/>

      <div className={styles.medias}>
        <Link
          className={styles.media}
          href='https://facebook.com'
          target='blank'
        >
          <Image
            className={styles.mediaIcon}
            src={require(`/public/media/facebook.svg`)}
            alt='Facebook'
          />
        </Link>

        <Link
          className={styles.media}
          href='https://twitter.com'
          target='blank'
        >
          <Image
            className={styles.mediaIcon}
            src={require(`/public/media/twitter.svg`)}
            alt='Twitter'
          />
        </Link>

        <Link
          className={styles.media}
          href='https://instagram.com'
          target='blank'
        >
          <Image
            className={styles.mediaIcon}
            src={require(`/public/media/instagram.svg`)}
            alt='Instagram'
          />
        </Link>
      </div>

      <hr className={styles.hr} />
      <p className={styles.copyright}>
        2023 F-Code
      </p>
  </footer>
  );
}
