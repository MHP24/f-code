import { getChallenges } from '@/database/challenges';
import { IChallengeSearch } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | IChallengeSearch[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllChallenges(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getAllChallenges = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { language = '', slug = '' } = req.query as { language: string, slug: string };
  const challenges = await getChallenges(language, slug);

  !challenges![0] && res.status(404).json({ error: 'No challenges available for now :(' });
  res.status(200).json(challenges!);
}