import type { NextApiRequest, NextApiResponse } from 'next';
import { dbLeaderboard } from '@/database';
import { ILeaderboardData } from '@/interfaces';

type Data =
  { error: string } |
  ILeaderboardData;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getLeaderboard(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getLeaderboard = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { userId = '' } = req.query as { userId: string };

    res.status(200).json({
      userRanking: userId ? await dbLeaderboard.getRanking(userId) : null,
      leaderboard: await dbLeaderboard.getLeaderboard(50)
    });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  }
}