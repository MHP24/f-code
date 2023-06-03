import { fCodeApi } from '@/api';
import Image from 'next/image';
import { AdminLayout } from '@/components/layouts';
import { ChallengeCreator, DashboardCard } from '@/components/ui';
import { IDashboard, ISession } from '@/interfaces';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from '@/styles/admin/dashboard.module.css';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';



const fetcher = async (url: string) => {
  const { data } = await fCodeApi.get(url);
  return data;
};


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DashboardPage = () => {
  const { data, isLoading } = useSWR<IDashboard>('/admin/dashboard', fetcher);

  const session = useSession();
  const userData = session.data as ISession | null;

  return (
    <AdminLayout
      title='Dashboard'
      pageDescription='Dashboard FCode home page'
    >
      {
        !isLoading && data &&
        <div className={styles.rootDashboard}>

          <section className={styles.dashboardData}>
            <h2 className={styles.greet}>{`Welcome ${userData?.user.username}!`}</h2>
            <p className={styles.greetMsg}>Here is the latest FCode activity</p>

            <div className={styles.counters}>
              <DashboardCard
                count={data.userCount}
                name='Users'
                img='users'

              />

              <DashboardCard
                count={data.challengeCount}
                name='Challenges published'
                img='code'
              />

              <DashboardCard
                count={data.solveCount}
                name='Total solves'
                img='instructions'
              />
            </div>
          </section>

          <section className={`${styles.dashboardData} ${styles.dashboardCentral}`}>
            <div className={styles.dashboardGraph}>
              <Bar
                data={{
                  labels: data.challengeDistribution.map(label => `${label._id}`.replace(/^\w/, w => w.toUpperCase())),
                  datasets: [
                    {
                      label: 'Quantity',
                      data: data.challengeDistribution.map(val => val.distribution),
                      borderColor: 'rgba(7, 247, 211, 0.61)',
                      backgroundColor: 'rgba(7, 247, 211, 0.42)',
                      barPercentage: 0.5,
                      borderWidth: 3,
                      borderRadius: 3,
                    },
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Challenges available per programming language',
                      color: '#FFF',
                      font: {
                        size: 20
                      }
                    },
                  },
                  maintainAspectRatio: false,
                }}

              />
            </div>

            <div className={styles.container}>
              <ul className={styles.recentUsers}>
                {
                  data.recentUsers.map((user, i) => {
                    return (
                      <li key={`dashboard-user-${i}-${user._id}`} className={styles.user}>
                        <div className={styles.userCardSide}>
                          <Image
                            className={styles.userPicture}
                            src={user.picture}
                            alt={user.username}
                            width={30}
                            height={30}
                          />
                          <div className={styles.userDataContainer}>
                            <p className={styles.userData}>{user.username.slice(0, 15)}</p>
                            <p className={`${styles.userData} ${styles.userDataRole}`}>{user.role}</p>
                          </div>
                        </div>

                        <div className={styles.provider}                        >
                          <Image
                            src={`/media/${user.provider}.svg`}
                            width={20}
                            height={20}
                            alt={user.provider}
                          />
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </section>


          <section className={styles.dashboardData}>
            <h3 className={styles.title}>Latest Challenges</h3>
            <ul className={styles.recentChallenges}>
              {
                (data.latestChallenges).map((challenge, i) => {
                  return (
                    <ChallengeCreator
                      key={`dashboard-challenge-latest-${i}-${challenge._id}`}
                      {...challenge}
                      isEditable={false}
                    />
                  )
                })
              }
            </ul>
          </section>
        </div>
      }
    </AdminLayout >
  )
}

export default DashboardPage;
