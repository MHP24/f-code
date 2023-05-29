import { db } from '@/database';
import { ISession } from '@/interfaces';
import { User } from '@/models';
import { CreatorRequest } from '@/models/CreatorRequest';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data = {
  error: string
} | { updated: boolean };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return closeApplication(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const closeApplication = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {

    const session = await getSession({ req });
    if (!session) return res.status(400).json({ error: 'Unauthorized action' });

    const { user } = session as ISession;

    await db.connect();

    const userRole = await User.findById(user._id).select('-_id role').lean();
    if (userRole?.role !== 'admin') return res.status(400).json({ error: 'Unauthorized action' });

    const { userId, summary, approved } = req.body;
    if (!userId || !summary || (typeof approved !== 'boolean')) return res.status(400).json({ error: 'Bad request' });

    const { id } = req.query;

    const result = await CreatorRequest.findOneAndUpdate({ _id: id, closed: false }, {
      closed: true,
      summary,
      approved,
      staffId: new mongoose.Types.ObjectId(user._id)
    });

    if (approved && Boolean(result)) {
      await User.updateOne({ _id: userId }, { role: 'creator' });
    }

    res.status(Boolean(result) ? 200 : 400).json({ updated: Boolean(result) });
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}