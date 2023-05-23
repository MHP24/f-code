import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { ChallengeRequest } from '@/models';
import { getSession } from 'next-auth/react';
import { ISession } from '@/interfaces';

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

    const session = await getSession({ req });
    !session && res.status(400).json({ error: 'Unauthorized action' });

    const { type } = req.query;

    if (!type || !['create', 'update'].includes(`${type}`)) {
      return res.status(400).json({ error: 'Invalid type action' });
    }

    const { user } = session as ISession;
    const { technology, parameters, challengeName, parameterCount, ...rest } = req.body;
    const slug = challengeName.replace(/\s+/g, ' ').replace(/\s+/g, '_');

    const hasRequest = await ChallengeRequest.findOne({
      creatorId: user._id,
      reason: type,
      language: technology,
      slug,
      status: 1
    });

    if (hasRequest) {
      return res.status(400).json({ error: 'This request already exists' });
    }

    await new ChallengeRequest({
      ...rest,
      slug,
      language: technology,
      parameters: parameters.replace(/\s+/g, '').split(','),
      parametersCount: Number(parameterCount),
      creatorId: user!._id
    }).save();

    res.status(200).json({ status: 'Request sent successfully' });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error creating your request, try again' });
  } finally {
    await db.disconnect();
  }
}