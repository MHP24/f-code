import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import { Button } from './';
import { useRouter } from 'next/router';

export const Navbar: FC = () => {

  const router = useRouter();
  const navigateRoute = () => router.push('/auth/login');

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link className={styles.navLink} href={'/'}>
          <h1 className={styles.navTitle}>F-Code</h1>
        </Link>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href={'/'}>Home</Link>
          </li>

          <li className={styles.navItem}>
            <Link className={styles.navLink} href={'/'}>Challenges</Link>
          </li>

          <li className={styles.navItem}>
            <Link className={styles.navLink} href={'/'}>Leaderboard</Link>
          </li>

          <li className={styles.navItem}>
            <Link className={styles.navLink} href={'/'}>Creator</Link>
          </li>
        </ul>
      </div>
      <Button
        text={'Join'}
        size={1}
        fn={navigateRoute}
      />
    </nav>
  );
}
