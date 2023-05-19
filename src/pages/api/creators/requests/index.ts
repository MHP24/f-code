import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { ChallengeRequest } from '@/models';
import { PaginateResult } from 'mongoose';
import { IChallengeRequest } from '@/interfaces';

type Data = {
  error: string
} | PaginateResult<IChallengeRequest>;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getRequests(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getRequests = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { creatorId = '', page = 1 } = req.query;
    !creatorId && res.status(400).json({ error: 'Creator ID is required' });
    await db.connect();

    console.log({ creatorId });

    const options = {
      page: Number(page),
      limit: 2,
      select: `_id slug language status reason updatedAt`,
    };

    const history = await ChallengeRequest.paginate({
      creatorId
    }, options);

    res.status(!history.docs.length ? 404 : 200).json(history);
  } catch (error) {
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }

}