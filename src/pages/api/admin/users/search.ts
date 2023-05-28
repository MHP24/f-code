import type { NextApiRequest, NextApiResponse } from 'next';
import { db, dbUsers } from '@/database';
import { IUser } from '@/interfaces';
import { PaginateResult } from 'mongoose';

type Data = {
  error: string
} | PaginateResult<IUser> | [];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchUsers(req, res);
    default:
      return res.status(200).json({ error: 'Bad request' });
  }
}

const searchUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const { query = '', page = 1 } = req.query;
    const users = await dbUsers.getUsers(`${query}`, Number(page));

    res.status(200).json(users);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error ' });
  } finally {
    await db.disconnect();
  }
}