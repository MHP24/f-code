import type { NextApiRequest, NextApiResponse } from 'next';
import { dbChallenges } from '@/database';
import { IChallengeRequestSearch } from '@/interfaces';
import { regExValidators } from '@/utils';
import { PaginateResult } from 'mongoose';

type Data = {
  error: string
} | PaginateResult<IChallengeRequestSearch> | null;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchChallengeRequests(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const searchChallengeRequests = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { language = '', slug = '', page = 1 } = req.query;

    const pageValidated = `${page}`.match(regExValidators.numbersOnly) ? Number(page) : 1;

    const challenges = await dbChallenges.getChallengeRequests(`${language}`, `${slug}`, pageValidated);

    if (!challenges) return res.status(404).json({ error: 'Not found' });
    res.status(challenges.docs.length === 0 ? 404 : 200).json(challenges);
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  }
}


