import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import { Button } from './';
import { useRouter } from 'next/router';

export const Navbar: FC = () => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigateRoute = () => router.push('/auth/sign_in');
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={styles.menuBtn}>
        <Button
          text={'Menu'}
          size={1}
          w={30}
          fn={toggleMenu}
        />
      </div>
      <nav className={`${styles.nav} ${!isOpen && styles.hideMenu}`}>
        <div className={styles.navContainer}>
          <Link className={styles.navLink} href={'/'}>
            <h1 className={styles.navTitle}>{'{ f/code }'}</h1>
          </Link>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href={'/'}>Home</Link>
            </li>

            <li className={styles.navItem}>
              <Link className={styles.navLink} href={'/challenges'}>Challenges</Link>
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
          size={.9}
          fn={navigateRoute}
        />
      </nav>
    </>
  );
}
