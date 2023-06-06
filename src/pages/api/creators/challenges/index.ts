import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Challenge } from '@/models';
import { IChallenge } from '@/interfaces';

type Data = {
  error: string
} | { challenges: IChallenge[] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return listChallengesByCreator(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const listChallengesByCreator = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { creatorId = '', page = 1, search = '' } = req.query;
    !creatorId && res.status(400).json({ error: 'Creator ID is required' });

    await db.connect();

    const options = {
      page: Number(page),
      limit: Number(process.env.SEARCH_PER_PAGE),
      select: `_id slug language difficulty`,
    };

    const { docs } = await Challenge.paginate({
      active: true,
      creatorId,
      slug: (!search ? { $exists: true } :
        { $regex: `${search}`.replace(/\s+/g, ' ').replace(/\s+/g, '_') }),
    }, options);

    res.status(200).json({ docs });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}