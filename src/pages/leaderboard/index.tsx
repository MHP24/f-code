import { MainLayout } from '@/components/layouts';
import { Leaderboard } from '@/components/ui';

const LeaderboardPage = () => {
  return (
    <MainLayout
      pageDescription={'Top code challengers in F-Code'}
      title={'Leaderboard'}
    >
      <Leaderboard />

    </MainLayout>
  );
}

export default LeaderboardPage;