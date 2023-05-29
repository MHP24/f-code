import type { NextApiRequest, NextApiResponse } from 'next';
import { regExValidators } from '@/utils';
import { dbApplications } from '@/database';
import { PaginateResult } from 'mongoose';
import { ISearchCreatorRequest } from '@/interfaces';

type Data = {
  error: string
} | PaginateResult<ISearchCreatorRequest> | [];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchApplications(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const searchApplications = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { query = '', page = '' } = req.query;
    const pageValidated = `${page}`.match(regExValidators.numbersOnly) ? Number(page) : 1;
    const applications = await dbApplications.getApplicationns(`${query}`, pageValidated);

    applications.length === 0 && res.status(404).json({ error: 'No applications available for now :(' });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error' });
  }
}