import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '@/database';
import { User, Challenge } from '@/models';

type Data =
  { message: string } |
  { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET' && process.env.NODE_ENV !== 'production') {
    await db.connect();
    await User.deleteMany();
    await Challenge.deleteMany();
    await User.insertMany(seedData.users);
    await Challenge.insertMany(seedData.challenges);
    await db.disconnect();
    return res.status(200).json({ message: 'Seed executed successfully' });
  }

  res.status(401).json({ error: 'Unauthorized action' });
}