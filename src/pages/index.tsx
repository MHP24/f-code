import { MainLayout } from '@/components/layouts';
import { Button } from '@/components/ui';
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <MainLayout title={'F-Code Home'} pageDescription={'F-Code Home Page'}>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <div className={styles.heroPicture}></div>
            <h3 className={styles.challengeCount}>{'+50 Challenges'}</h3>
          </div>

          <div className={styles.heroRight}>
            <h2 className={styles.heroTitle}>
              Learn and improve your skills <strong>easily</strong>
            </h2>
            <p className={styles.heroParagraph}>
              Using the most
              demanded languages by the industry
            </p>

            <Button
              text={'Get Started'}
              size={1.2}
              w={260}
              fn={() => { }}
            />
          </div>
        </div>
      </div>

    </MainLayout>
  )
}
