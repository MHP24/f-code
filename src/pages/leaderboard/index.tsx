import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fCodeApi } from '@/api';
import { MainLayout } from '@/components/layouts';
import { Leaderboard } from '@/components/ui';
import { ILeaderboardData } from '@/interfaces';


const LeaderboardPage = () => {
  const { data: sessionData }: any = useSession();
  const [leaderboard, setLeaderboard] = useState<ILeaderboardData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fCodeApi.get<ILeaderboardData>(`/leaderboard?userId=${sessionData?.user._id ?? ''}`);
        setLeaderboard(data);
      } catch (error) {
        setLeaderboard(null);
      }
    })();
  }, [sessionData]);

  return (
    <MainLayout
      pageDescription={'Top code challengers in F-Code'}
      title={'FCode - Leaderboard'}
    >
      {
        leaderboard && leaderboard.leaderboard
        && (
          <Leaderboard
            {...leaderboard}
          />
        )
      }

    </MainLayout>
  );
}


export default LeaderboardPage;