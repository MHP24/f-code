import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserProfile } from '@/database/profile';
import { IProfileData } from '@/interfaces/profile';

type Data = {
  error: string
} | IProfileData;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProfile(req, res);
    default:
      res.status(400).json({ error: 'Bad request' });
  }
}

const getProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    const profile = await getUserProfile(`${id}`);

    res.status(profile ? 200 : 404).json(!profile ? {
      error: 'This user does not exists'
    } : profile);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error ' });
  }
}