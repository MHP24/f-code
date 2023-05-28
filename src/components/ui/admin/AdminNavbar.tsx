import Link from 'next/link';
import styles from '../../styles/admin/adminNavbar.module.css';
import { Logo } from '../Logo';
import { Button } from '../Button';
import Image from 'next/image';

export const AdminNavbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <Logo
          isPrimary
          size={40}
        />
      </div>

      <div className={styles.navBody}>
        <div className={styles.menus}>
          <Link className={styles.menuLink} href={'/'}>Main menu</Link>

          <ul className={styles.options}>
            <li className={styles.option}>
              <Image
                src={'/illustrations/dashboard.svg'}
                width={23}
                height={23}
                alt='dashboard'
              />
              <Link className={styles.optionLink} href={'/admin/dashboard'}>
                Dashboard
              </Link>
            </li>

            <li className={styles.option}>
              <Image
                src={'/illustrations/applications.svg'}
                width={23}
                height={23}
                alt='applications'
              />
              <Link className={styles.optionLink} href={'/admin/applications'}>
                Applications
              </Link>
            </li>

            <li className={styles.option}>
              <Image
                src={'/illustrations/code.svg'}
                width={23}
                height={23}
                alt='requests'
              />
              <Link className={styles.optionLink} href={'/admin/requests'}>
                Requests
              </Link>
            </li>

            <li className={styles.option}>
              <Image
                src={'/illustrations/users.svg'}
                width={23}
                height={23}
                alt='users'
              />
              <Link className={styles.optionLink} href={'/admin/users'}>
                Users
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button
            size={.8}
            text='Logout'
          />
        </div>
      </div>
    </nav>
  );
}
