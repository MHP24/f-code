import { MainLayout } from '@/components/layouts';
import { Button, DualCard, FeatureCard } from '@/components/ui';
import styles from '@/styles/index.module.css';

export default function Home() {
  return (
    <MainLayout title={'F-Code Home'} pageDescription={'F-Code Home Page'}>
      <section className={styles.hero}>
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
      </section>

      {/* <section className={styles.technologies}>
      </section> */}

      <section className={styles.illustrations}>
        <DualCard
          title={'Focus on what really matters, the code'}
          description={'Practice and evaluate your knowledge automatically, receiving feedback from your solutions.'}

        />
        <DualCard
          title={'Discover and acquire new skills'}
          description={'We have an awesome repertory, with different types of exercises to measure your capabilities.'}
        />
      </section>


      <section className={styles.features}>
        <FeatureCard
          image={'simple.svg'}
          title={'Simple'}
          paragraph={'Easy to use, understand, access\
          and receive feedback from your solution.'}
        />
        <FeatureCard
          image={'quick.svg'}
          title={'Quick'}
          paragraph={'Search, join and start solving\
          challenges of your interest.'}
        />
        <FeatureCard
          image={'credible.svg'}
          title={'Credible'}
          paragraph={'All challenges are verificated,\
          guaranteeing the challenge can be solved.'}
        />
      </section>


      <section className={styles.explore}>
        <h2 className={styles.exploreTitle}>Explore and <strong>learn yourself</strong></h2>
        <div className={styles.exploreVideo}>
        </div>
      </section>

    </MainLayout>
  )
}
