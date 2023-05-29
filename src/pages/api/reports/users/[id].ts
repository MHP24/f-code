import { db } from '@/database';
import { IUserSolvesReport } from '@/interfaces';
import { Solve, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | IUserSolvesReport[] | [];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return generateUserData(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const generateUserData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const { id } = req.query;

    const userData = await User.findById(id);
    if (!userData) return res.status(404).json({ error: 'This user does not exist' });

    const solves: IUserSolvesReport[] = await Solve.find({ userId: id }).select('-__v').populate('challengeId', {
      _id: 1,
      slug: 1,
      language: 1,
      difficulty: 1,
      creatorId: 1
    });

    res.status(200).json(solves);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}