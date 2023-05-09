import { db } from '@/database';
import { Solve, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string;
} | { message: string; };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return submitChallenge(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const submitChallenge = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { code, userId, creatorId, difficulty } = req.body;
    const { challengeId } = req.query;

    !code || !userId || !creatorId
      || !challengeId && res.status(400).json({ error: 'Bad request' });

    await db.connect();
    const submission = await Solve.find({ challengeId, userId });

    if (submission[0]) {
      await Solve.updateOne({ challengeId }, { code });
      return res.status(200).json({ message: 'Success' });
    }

    await new Solve({ code, challengeId, /*creatorId,*/ userId }).save();
    await User.updateOne({ _id: userId }, { $inc: { score: Number(difficulty) * 100 } });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}