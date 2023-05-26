import { NextPage } from 'next';
import { MainLayout } from '@/components/layouts';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { IProfileData, ISession } from '@/interfaces';
import { fCodeApi } from '@/api';
import styles from '@/styles/profile.module.css';
import { Button, ChallengeProfile, LanguageProgress, LeaderboardCard } from '@/components/ui';
import Image from 'next/image';
import { AuthContext } from '@/context';


const ProfilePage: NextPage = () => {

  const [profileData, setProfileData] = useState<null | IProfileData>();
  const session = useSession();
  const { logoutUser } = useContext(AuthContext);


  useEffect(() => {
    (async () => {
      try {
        if (session.data) {
          const { user } = session.data as ISession;
          const { data } = await fCodeApi.get(`/users/profile/${user._id}`);
          setProfileData(data);

        }
      } catch (error) {
        setProfileData(null)
      }
    })();
  }, [session]);


  return (
    <MainLayout
      pageDescription={`FCode ${profileData?.profile.username}' s profile`}
      title={`FCode | ${profileData?.profile.username}' s profile`}

    >
      {
        profileData &&
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>{`${profileData.profile.username}'s performance`}</h2>
          <section className={styles.section}>
            <div className={styles.profileHeaderContainer}>
              <div className={`${styles.profileItem} ${styles.profileUser}`}>
                <Image
                  className={styles.profilePicture}
                  src={
                    profileData.profile.picture === 'no-picture' ?
                      '/pictures/no-picture.png'
                      : profileData.profile.picture
                  }
                  alt={profileData.profile.username}
                  width={220}
                  height={220}
                />

                <Button
                  size={0.9}
                  text='Sign out'
                  fn={() => logoutUser()}
                  w={150}
                />
              </div>

              <div className={`${styles.profileItem} ${styles.profileProgress}`}>
                {
                  (
                    profileData.profile.technologies
                      .challengeDistribution
                  ).map((tech, i) => {
                    return (
                      <LanguageProgress
                        key={`language-progress-${i}-${tech.language}`}
                        {...tech}
                      />
                    )
                  })
                }
              </div>
            </div>
          </section>

          <hr className={styles.separator} />

          <section className={styles.section}>
            <div className={styles.profileRanking}>
              <LeaderboardCard
                userScore={profileData.profile.ranking.userScore}
                rank={profileData.profile.ranking.rank}
                title={'Ranked stats'}
              />
            </div>
          </section>

          <hr className={styles.separator} />

          {
            profileData.profile.recentActivity &&

            <section className={`${styles.section} ${styles.activitySection}`}>
              <h3 className={styles.title}>Recent Activity</h3>

              <div className={styles.recentChallengesGrid}>
                {
                  profileData.profile.recentActivity.map((challenge, i) => {
                    return <ChallengeProfile
                      key={`recent-challenge-profile-${i}`}
                      {...challenge}
                    />
                  })
                }
              </div>
            </section>
          }
        </div>
      }

    </MainLayout>
  );
}

export default ProfilePage;