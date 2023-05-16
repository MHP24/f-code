import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Challenge } from '@/models';
import { handleValidation } from '@/compilers';
import { IFunctionValidation, ICodeExecution } from '@/interfaces';

type Data = IFunctionValidation |
  ICodeExecution |
{ error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return handleSubmit(req, res);
    default:
      res.status(400).json({ error: 'Bad request' });
  }
}

const handleSubmit = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { challengeName = '', technology = '', ...rest } = req.body;

    !challengeName || !technology
      && res.status(400).json({ error: 'Invalid challenge name or technology' });

    await db.connect();

    const challenge = await Challenge.findOne({
      slug: challengeName.replace(/\s+/g, ' ').replace(/\s/g, '_').toLowerCase(),
      language: technology.toLowerCase()
    });

    challenge && res.status(400).json({ error: 'This challenge already exists' });
    const { functionName, parameterCount, parameters, cases, code } = rest;

    !functionName || !parameterCount || !parameters || !cases || !code
      && res.status(400).json({ error: 'Missing fields' });

    const parametersFormatted = parameters.replace(/\s+/, '').split(',');

    (parametersFormatted.length !== Number(parameterCount)
      || parametersFormatted.some((p: string) => p.length === 0))
      && res.status(400).json({ error: 'Invalid parameters' });

    const { hasError, data } = await handleValidation({
      ...rest,
      parameters: parametersFormatted,
      language: technology
    });

    res.status(hasError ? 400 : 200).json(data);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error ' });
  } finally {
    await db.disconnect();
  }
}