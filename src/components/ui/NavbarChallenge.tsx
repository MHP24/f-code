import { FC, useContext, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbarChallenge.module.css';
import { Button, Logo } from './';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';
import { ISession } from '@/interfaces';

interface IDifficulties {
  [key: number]: { tag: string; class: string };
}
const difficulties: IDifficulties = {
  1: { tag: 'Easy', class: styles.easy },
  2: { tag: 'Medium', class: styles.medium },
  3: { tag: 'Hard', class: styles.hard },
  4: { tag: 'Insane', class: styles.insane },
};


interface Props {
  difficulty: number;
  isCompleted: boolean;
  title: string;
}

export const NavbarChallenge: FC<Props> = ({ difficulty, isCompleted, title }) => {

  const { isLoggedIn, logoutUser } = useContext(AuthContext);
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


          <div className={styles.challengeDataContainer}>

            <div className={styles.challenge}>
              <h2 className={styles.challengeName}><strong>Challenge: </strong>&nbsp;&nbsp;{title}</h2>
            </div>

            <ul className={styles.challengeData}>
              <li className={`${styles.challengeDataItem} ${styles.challengeDifficulty} ${difficulties[difficulty].class}`}>{difficulties[difficulty].tag}</li>
              <li className={`${styles.challengeDataItem} ${styles.challengePoints}`}>{`${difficulty * 100} Points`}</li>
              <li className={`${styles.challengeDataItem} ${isCompleted ? styles.completed : styles.pending}`}> {isCompleted ? '✔ Completed' : '✘ Pending'}</li>
            </ul>
          </div>


        </div>

        <div className={styles.buttonContainer}>
          {
            session.data ?
              <Link href={'/profile'} className={styles.profileLink}>
                <Image
                  src={`${data?.user.picture}`}
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
