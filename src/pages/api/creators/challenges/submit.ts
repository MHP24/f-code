import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { ChallengeRequest } from '@/models';
import { getSession } from 'next-auth/react';

type Data = {
  error: string
} | { status: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return submit(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const submit = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const session: any = await getSession({ req });
    !session && res.status(400).json({ error: 'Unauthorized action' });

    const { technology, parameters, challengeName, parameterCount, ...rest } = req.body;

    await new ChallengeRequest({
      ...rest,
      slug: challengeName.replace(/\s+/g, ' ').replace(/\s+/g, '_'),
      language: technology,
      parameters: parameters.replace(/\s+/g, '').split(','),
      parametersCount: Number(parameterCount),
      creatorId: session?.user!._id
    }).save();

    res.status(200).json({ status: 'Request sent successfully' });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error creating your request, try again' });
  } finally {
    await db.disconnect();
  }
}