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
      return register(req, res);
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { username = '', email = '', password = '' } = req.body;

    if (!username.match(regExValidators.charactersAndNumbersOnly)) res.status(400).json({ error: 'Invalid username' });
    if (!email.match(regExValidators.email)) res.status(400).json({ error: 'Invalid email' });
    if (!password.match(regExValidators.securePassword)) res.status(400).json({ error: 'Weak password' });

    await db.connect();

    console.log({ username, email, password });
    const user: IUser | null = await User.findOne({ $and: [{ email: `${email}@fcode` }, { username }, { provider: 'f-code' }] });
    console.log({ user });
    if (!user) {
      const newUser = new User({ username, email: `${email}@fcode`, password: bcrypt.hashSync(password) });
      newUser.save({ validateBeforeSave: true });

      const { _id, role } = newUser;

      return res.status(201).json({
        user: {
          _id,
          username,
          role
        }
      });
    }

    res.status(400).json({ error: 'This user already exists' });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error, try again' });
  } finally {
    await db.disconnect();
  }
}