import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IChallenge, CompilerResponse } from '@/interfaces';
import { Challenge } from '@/models';
import { handleExecution } from '@/compilers';

export default function handler(req: NextApiRequest, res: NextApiResponse<CompilerResponse>) {
  switch (req.method) {
    case 'POST':
      return handleSolve(req, res)
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const handleSolve = async (req: NextApiRequest, res: NextApiResponse<CompilerResponse>) => {
  try {
    const { challengeId = '' } = req.query as { challengeId: string };
    !challengeId.trim() && res.status(412).json({ error: 'ChallengeId is required' });

    const { code } = req.body;

    await db.connect();
    const challenge: IChallenge | null = await Challenge.findById(challengeId)
      .select('language functionName parameters cases active').lean();
    await db.disconnect();

    !challenge && res.status(404).json({ error: 'Challenge not found' });
    !challenge!.active && res.status(403).json({ error: 'This challenge cannot be solved' });

    const execution = handleExecution({ ...challenge!, code });
    const { hasError, data } = execution;
    res.status(hasError ? 400 : 200).json(data);
  } catch (error) {
    console.error({ error });
    await db.disconnect();
    res.status(400).json({ error: 'Invalid challenge' });
  }
}