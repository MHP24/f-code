import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt, regExValidators } from '@/utils';
import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

type Data =
  { error: string } |
  {
    token: string,
    user: {
      _id: string,
      username: string,
      role: string
    }
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      login(req, res);
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '' } = req.body;

    if (!email.match(regExValidators.email)) return res.status(400).json({ error: 'Invalid email' });
    if (!password.match(regExValidators.securePassword)) return res.status(400).json({ error: 'Weak password' });

    await db.connect();
    const user = await User.findOne({ email }).select('_id username role password').lean();
    if (!user) return res.status(400).json({ error: 'This user does not exist' });
    if (!bcrypt.compareSync(password, user.password!)) return res.status(400).json({ error: 'Wrong password' });
    await db.disconnect();

    const { _id, username, role } = user;
    const token = jwt.signToken(_id, username);

    res.status(200).json({
      token,
      user: {
        _id,
        username,
        role
      }
    });
  } catch (error) {
    await db.disconnect();
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error, try again' });
  }
}