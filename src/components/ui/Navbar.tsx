import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import { Button, Logo } from './';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ISession } from '@/interfaces';

export const Navbar: FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigateRoute = () => router.push('/auth/sign_in');
  const toggleMenu = () => setIsOpen(!isOpen);

  const session = useSession();
  const data = session.data as ISession | undefined;

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
            session.data ?
              <Link href={'/profile'} className={styles.profileLink}>
                <Image
                  src={`${data?.user.picture === 'no-picture' ? '/pictures/no-picture.png' : data?.user.picture}`}
                  width={27}
                  height={27}
                  alt={`${data?.user.username}`}
                  className={styles.profilePicture}
                />

                <p className={styles.profileUsername}>{`${data?.user.username}`.slice(0, 15)}</p>
              </Link>
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
