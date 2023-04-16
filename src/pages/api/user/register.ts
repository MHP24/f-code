import type { NextApiRequest, NextApiResponse } from 'next';
import { regExValidators } from '@/utils';
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '@/interfaces';
import bcrypt from 'bcryptjs';

type Data =
  { error: string } |
  {
    user: {
      _id: string;
      username: string;
      role: string;
    }
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      register(req, res);
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { username = '', email = '', password = '' } = req.body;

    if (!username.match(regExValidators.charactersAndNumbersOnly)) return res.status(400).json({ error: 'Invalid username' });
    if (!email.match(regExValidators.email)) return res.status(400).json({ error: 'Invalid email' });
    if (!password.match(regExValidators.securePassword)) return res.status(400).json({ error: 'Weak password' });

    await db.connect();
    const user: IUser | null = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      const newUser = new User({ username, email, password: bcrypt.hashSync(password) });
      newUser.save({ validateBeforeSave: true });
      await db.disconnect();

      const { _id, role } = newUser;

      return res.status(201).json({
        user: {
          _id,
          username,
          role
        }
      });
    }

    await db.disconnect();
    res.status(400).json({ error: 'This user already exists' });
  } catch (error) {
    await db.disconnect();
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error, try again' });
  }
}