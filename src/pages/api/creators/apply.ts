import { db } from '@/database';
import { ISession } from '@/interfaces';
import { User } from '@/models';
import { CreatorRequest } from '@/models/CreatorRequest';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data = {
  error: string
} | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return applyForCreator(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const applyForCreator = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getSession({ req });
    !session && res.status(400).json({ error: 'Unauthorized action' });

    const { user: { _id } } = session as ISession;

    await db.connect();

    const { role } = await User.findById(_id).select('role').lean();
    role === 'creator' && res.status(400).json({ error: 'You already are creator, re sign in to see your panel' });

    const { subject, description } = req.body;
    !subject || !description && res.status(400).json({ error: 'All fields are required' });

    const requestPending = await CreatorRequest.findOne({ userId: _id, closed: false });

    if (requestPending) {
      return res.status(400).json({ error: 'You already have a request pending' });
    }

    await new CreatorRequest({
      subject,
      description,
      userId: _id
    }).save();

    res.status(200).json({ message: 'Application received successfully, we will inform you as soon as possible' });

  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}