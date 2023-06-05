import type { NextApiRequest, NextApiResponse } from 'next';
import { dbUsers } from '@/database';
import { regExValidators } from '@/utils';
import { IUserActionReport } from '@/interfaces';
import { PaginateResult } from 'mongoose';

type Data = {
  error: string
} | PaginateResult<IUserActionReport> | null;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getReports(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const getReports = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {

    const { query = '', page = 1 } = req.query;
    const pageValidated = `${page}`.match(regExValidators.numbersOnly) ? Number(page) : Number(page);

    const users = await dbUsers.getUsersReported(`${query}`, pageValidated);

    return res.status(!users ? 404 : 200).json(!users ? { error: 'Not found' } : users);
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  }
}