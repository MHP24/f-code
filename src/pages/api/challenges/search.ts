import type { NextApiRequest, NextApiResponse } from 'next';
import { PaginateResult } from 'mongoose';
import { getChallenges } from '@/database/challenges';
import { IChallengeSearch } from '@/interfaces';
import { regExValidators } from '@/utils';

type Data = {
  error: string
} | PaginateResult<IChallengeSearch> | [];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllChallenges(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getAllChallenges = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { language = '', slug = '', page = '' } = req.query as { language: string, slug: string, page: string };
    const pageValidated = page.match(regExValidators.numbersOnly) ? Number(page) : 1;

    const challenges = await getChallenges(language, slug, pageValidated);
    challenges.length === 0 && res.status(404).json({ error: 'No challenges available for now :(' });
    res.status(200).json(challenges!);
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error' });
  }
}