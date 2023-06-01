import { db } from '@/database';
import { IDashboard, ILatestChallenge } from '@/interfaces';
import { Challenge, Solve, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | IDashboard

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getDashboard(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getDashboard = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const userCount = await User.count();
    const challengeCount = await Challenge.count();
    const solveCount = await Solve.count();

    const challengeDistribution = await Challenge
      .aggregate([
        { $group: { _id: '$language', distribution: { $sum: 1 } } }
      ])

    const latestChallenges = await Challenge
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id slug language difficulty updatedAt');

    const recentUsers = await User
      .find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('picture username provider role');

    res.status(200).json({
      userCount,
      challengeCount,
      solveCount,
      challengeDistribution,
      latestChallenges,
      recentUsers
    });

  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}