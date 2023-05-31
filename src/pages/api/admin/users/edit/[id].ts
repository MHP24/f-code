import { db } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | { _id: string; };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return editUser(req, res);

    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const editUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id = '' } = req.query;
    const { role, status } = req.body;

    if (!(['user', 'creator', 'admin'].includes(role)) || (typeof status) !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request' });
    }

    if (!`${id}`.trim()) return res.status(400).json({ error: 'User ID is required' });

    await db.connect();
    const updateResult = await User.findByIdAndUpdate(id, { role, active: status });
    if (!updateResult) return res.status(404).json({ error: 'This user does not exist' });

    res.status(200).json({ _id: updateResult._id });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error ' });
  } finally {
    await db.disconnect();
  }
}