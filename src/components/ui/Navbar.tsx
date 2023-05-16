import { FC, useContext, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import { Button, Logo } from './';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';
import Image from 'next/image';

export const Navbar: FC = () => {

  const { isLoggedIn, logoutUser } = useContext(AuthContext);
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
          w={250}
          fn={toggleMenu}
        />
      </div>
      <nav className={`${styles.nav} ${!isOpen && styles.hideMenu}`}>
        <div className={styles.navContainer}>
          <Link className={styles.navLink} href={'/'}>
            <Logo isPrimary size={50} />
          </Link>

          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href={'/challenges'}>Challenges</Link>
            </li>

            <li className={styles.navItem}>
              <Link className={styles.navLink} href={'/leaderboard'}>Leaderboard</Link>
            </li>

            <li className={styles.navItem}>
              <Link className={styles.navLink} href={'/creator'}>Creator</Link>
            </li>
          </ul>
        </div>

        <div className={styles.buttonContainer}>
          {
            isLoggedIn ?
              <Button
                text={'Logout'}
                size={.9}
                w={250}
                fn={logoutUser}
              />
              :
              <Button
                text={'Join'}
                size={.9}
                w={250}
                fn={navigateRoute}
              />

          }
        </div>

      </nav>
    </>
  );
}
