import Link from 'next/link';
import styles from '../../styles/admin/adminNavbar.module.css';
import { Logo } from '../Logo';
import { Button } from '../Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { AuthContext } from '@/context';

const OPTIONS = [
  { image: 'dashboard', route: 'dashboard' },
  { image: 'users', route: 'users' },
  { image: 'applications', route: 'applications' },
  { image: 'code', route: 'requests' },
  { image: 'medal', route: 'challenges' },
]

interface Props {
  isOpening?: boolean;
}

export const AdminNavbar: FC<Props> = ({ isOpening = true }) => {

  const router = useRouter();
  const currentRouteName = router.pathname.split('/').at(2);
  const { logoutUser } = useContext(AuthContext);

  return (
    <nav className={`${styles.nav} animate__animated ${isOpening ? 'animate__fadeInLeft' : 'animate__fadeOutLeft'}`}>
      <div className={styles.navHeader}>
        <Logo
          isPrimary
          column
          size={40}
        />
      </div>

      <div className={styles.navBody}>
        <div className={styles.menus}>
          <Link className={styles.menuLink} href={'/'}>Main menu</Link>

          <ul className={styles.options}>
            {
              OPTIONS.map(({ image, route }, i) => {
                return (
                  <li className={`${styles.option} ${route === currentRouteName && styles.currentOption}`} key={`dashboard-route-${i}-${route}`}>
                    <Image
                      src={`/illustrations/${image}.svg`}
                      width={23}
                      height={23}
                      alt={route}
                    />
                    <Link className={styles.optionLink} href={`/admin/${route}`}>
                      {route.replace(/^\w/, w => w.toLocaleUpperCase())}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className={styles.actions}>
          <Button
            size={.85}
            text='Sign out'
            variant
            fn={() => logoutUser()}
          />
        </div>
      </div>
    </nav>
  );
}
