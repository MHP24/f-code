import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '@/database';
import { ISession } from '@/interfaces';
import { User } from '@/models';
import { UserReport } from '@/models/UserReport';

type Data = {
  error: string
} | { userId: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return reportUser(req, res);

    default:
      return res.status(200).json({ error: 'Bad request' });
  }
}

const reportUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const { id } = req.query;

    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'You must sign in to report' });

    const userData = await User.findOne({ _id: id, active: true }).select('picture username').lean();
    if (!userData) return res.status(404).json({ error: 'This user does not exist' });

    const { _id: userId, ...rest } = userData;
    const { user } = session as ISession;

    const hasReportByUser = await UserReport.findOne({ userId, reporterId: user._id, active: true });
    if (hasReportByUser) return res.status(401).json({ error: 'You already have reported this user' });

    await new UserReport({
      userId,
      reporterId: user._id,
      ...rest
    }).save();

    return res.status(200).json({ userId: `${id}` });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}