import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/footer.module.css';


export const Footer = () => {
  return (
    <footer className={styles.footer}>

      <h2 className={styles.footerTitle}>{'{ f/code }'}</h2>

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

      <div className={styles.terms}>
        <Link
          className={styles.termLink}
          href={'/terms/terms_of_use'}>
          Terms of use
        </Link>
        <br />
        <Link
          className={styles.termLink}
          href={'/terms/privacy_policy'}>
          Privacy policy
        </Link>
      </div>

      <hr className={styles.hr} />
      <p className={styles.copyright}>
        2023 F-Code
        <br />
        <span>All rights reserved</span>
      </p>


    </footer>
  );
}
