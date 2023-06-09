import { MainLayout } from '@/components/layouts';
import { Button, DualCard, FeatureCard } from '@/components/ui';
import styles from '@/styles/index.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {

  const { push } = useRouter();

  return (
    <MainLayout title={'F-Code Home'} pageDescription={'F-Code Home Page'}>
      <section className={`${styles.hero} animate__animated animate__fadeIn`}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <div className={styles.heroPicture}>
              <video
                className={styles.videoHero}
                src='/videos/1.mp4'
                autoPlay muted
                loop
                width={'100%'}
                height={'100%'}
              >
              </video>
            </div>
            <p className={styles.challengeCount}>{'+12 Challenges'}</p>
          </div>

          <div className={styles.heroRight}>
            <h2 className={styles.heroTitle}>
              Learn and improve your skills <strong className={styles.heroTitleHightlight}>easily</strong>
            </h2>
            <p className={styles.heroParagraph}>
              Using the most
              demanded languages by the industry
            </p>

            <Button
              text={'Get Started'}
              size={1.2}
              w={260}
              fn={() => push('/challenges')}
            />
          </div>
        </div>
      </section>

      <section className={styles.technologies}>
        <div className={styles.cubeContainer}>
          <div className={styles.cube}>
            <div className={styles.top}>
              <Image
                className={styles.cubeImage}
                src={'/illustrations/medal.svg'}
                width={150}
                height={150}
                alt='medal'
              />
            </div>
            <div className={styles.bottom}>
              <Image
                className={styles.cubeImage}
                src={'/illustrations/code.svg'}
                width={150}
                height={150}
                alt='code'
              />
            </div>
            <div className={styles.left}>
              <Image
                className={styles.cubeImage}
                src={'/techs/vscode.svg'}
                width={150}
                height={150}
                alt='vscode'
              />
            </div>
            <div className={styles.right}>
              <Image
                className={styles.cubeImage}
                src={'/techs/typescript.svg'}
                width={150}
                height={150}
                alt='typescript'
              />
            </div>
            <div className={styles.front}>
              <Image
                className={styles.cubeImage}

                src={'/techs/python.svg'}
                width={150}
                height={150}
                alt='python'
              />
            </div>
            <div className={styles.back}>
              <Image
                className={styles.cubeImage}
                src={'/techs/javascript.svg'}
                width={150}
                height={150}
                alt='javascript'
              />
            </div>
          </div>
        </div>

        <div className={styles.technologiesDescription}>
          <h3 className={styles.technologiesTitle}>Everything in one place</h3>
          <p className={styles.technologiesParagraph}>Exercise the most desired skills by the competition, that always are needed.</p>
        </div>
      </section>

      <section className={styles.illustrations}>
        <DualCard
          title={'Focus on what really matters, the code'}
          description={'Practice and evaluate your knowledge automatically, receiving feedback from your solutions.'}
          videoRef={'demo1'}
        />
        <DualCard
          title={'Discover and acquire new skills'}
          description={'We have an awesome repertory, with different types of exercises to measure your capabilities.'}
          videoRef={'demo2'}
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

    </MainLayout >
  )
}
