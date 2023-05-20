import { db } from '@/database';
import { IChallengeReport } from '@/interfaces';
import { Solve } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | IChallengeReport[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return generateChallengeData(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const generateChallengeData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const { id = '' } = req.query;

    if (!id) return res.status(400).json({ error: 'Challenge ID is required' });

    const challengeData: IChallengeReport[] = await Solve
      .find({ challengeId: id })
      .select('-__v -code')
      .populate({
        path: 'userId',
        select: '_id email username provider',
      });

    res.status(200).json(challengeData);
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}