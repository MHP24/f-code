import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { MainLayout } from '@/components/layouts';
import { IProfileData, ISession } from '@/interfaces';
import { fCodeApi } from '@/api';
import styles from '@/styles/profile.module.css';
import { Button, ChallengeProfile, LanguageProgress, LeaderboardCard } from '@/components/ui';
import { AuthContext } from '@/context';
import { toaster } from '@/utils';

interface IStateProfile {
  isLoading: boolean;
  data: IProfileData | null;
}

const ProfilePage: NextPage = () => {
  const [profileData, setProfileData] = useState<IStateProfile>({
    isLoading: true,
    data: null
  });
  const router = useRouter();
  const { user: userQuery } = router.query;
  const session = useSession();
  const userData = session?.data as ISession;
  const { logoutUser } = useContext(AuthContext);


  useEffect(() => {
    (async () => {
      try {
        if (session.data || userQuery) {
          const userData = session?.data as ISession;
          const { data } = await fCodeApi.get(`/users/profile/${userQuery ?? userData.user._id}`);
          setProfileData(prevProfileData => ({ ...prevProfileData, data, isLoading: false }));
        }
      } catch (error) {
        setProfileData(prevProfileData => ({ ...prevProfileData, data: null, isLoading: false }));
      }

    })();
  }, [session, userQuery]);

  return (
    <MainLayout
      pageDescription={`FCode ${profileData.data?.profile.username || 'Loading...'}' s profile`}
      title={`FCode | ${profileData.data?.profile.username || 'Loading...'}' s profile`}
    >
      {
        !profileData.isLoading && (
          profileData.data ?
            <div className={`${styles.profileContainer} animate__animated animate__fadeIn`}>
              <Toaster
                position='bottom-left'
                reverseOrder={false}
              />
              <h2 className={styles.profileTitle}>{`${profileData.data.profile.username}'s performance`}</h2>
              <section className={styles.section}>
                <div className={styles.profileHeaderContainer}>
                  <div className={`${styles.profileItem} ${styles.profileUser}`}>
                    <Image
                      className={styles.profilePicture}
                      src={profileData.data.profile.picture}
                      alt={profileData.data.profile.username}
                      width={220}
                      height={220}
                    />

                    <button
                      className={styles.shareBtn}
                      onClick={() => {
                        navigator.clipboard.writeText(typeof window !== 'undefined' ?
                          window.location + (!userQuery ? `?user=${userData?.user?._id}` : '') : '');
                        toaster('Profile copied to clipboard', true);
                      }}
                    >
                      <Image
                        src={'/illustrations/share.svg'}
                        alt='share'
                        width={35}
                        height={35}
                      />
                    </button>
                    {
                      ((!userQuery && userData?.user._id) || (userData?.user._id === userQuery)) && (
                        <>
                          {
                            userData.user.role === 'admin' && (
                              <Button
                                size={0.9}
                                text='Dashboard'
                                fn={() => router.push('/admin/dashboard')}
                                w={150}
                              />
                            )
                          }

                          <Button
                            size={0.9}
                            text='Sign out'
                            fn={() => logoutUser()}
                            w={150}
                          />
                        </>
                      )
                    }
                  </div>

                  <div className={`${styles.profileItem} ${styles.profileProgress}`}>
                    {
                      (
                        profileData.data.profile.technologies
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
                    userScore={profileData.data.profile.ranking.userScore}
                    rank={profileData.data.profile.ranking.rank}
                    title={'Ranked stats'}
                  />
                </div>
              </section>

              <hr className={styles.separator} />

              {
                profileData.data.profile.recentActivity &&

                <section className={`${styles.section} ${styles.activitySection}`}>
                  <h3 className={styles.title}>Recent Activity</h3>

                  <div className={styles.recentChallengesGrid}>
                    {
                      profileData.data.profile.recentActivity.map((challenge, i) => {
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
            :
            <div className={styles.noUser}>
              <p className={styles.notFound}>{'404'}</p>
              <p className={styles.noUserText}>{`We couldn't find the user`}</p>
            </div>
        )
      }

    </MainLayout>
  );
}

export default ProfilePage;