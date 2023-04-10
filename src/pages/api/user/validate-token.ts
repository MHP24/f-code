import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';

type Data =
  { error: string } |
  { token: string, user: { _id: string, username: string, role: string } };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      checkToken(req, res);
      break;
    default:
      res.status(400).json({ error: 'Bad request' })
      break;
  }
}

const checkToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { token = '' } = req.cookies;
    const userId = await jwt.verifyToken(token);
    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();

    if (!user) return res.status(400).json({ error: 'User does not exist' });
    const { _id, username, role } = user;
    res.status(200).json({
      token: jwt.signToken(_id, username),
      user: {
        _id,
        username,
        role
      }
    });
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }

}