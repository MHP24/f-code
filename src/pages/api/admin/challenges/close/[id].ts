import { db } from '@/database';
import { IChallengeRequest } from '@/interfaces';
import { ChallengeRequest } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csv-parser' ;

type Data = {
  error: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return closeChallengeRequest(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const closeChallengeRequest = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const { approved } = req.body;
    console.log({ approved });
    if (!(typeof approved === 'boolean')) return res.status(400).json({ error: 'Summary invalid' });

    const { id } = req.query;

    console.log({ id });

    const challenge: IChallengeRequest | null = await ChallengeRequest.findById(id);
    if (!challenge || challenge.status > 1) return res.status(404).json({ error: 'Invalid challenge' });

    const { parametersCount, cases, functionName, ...rest } = challenge;

    const newCases = cases.map(({ call }) => {
      const output = call.replace(/\w+\(([^)]+)\)/g, '$1');
      return [output];
    })

    const separatedArray = newCases.map(([element]) => {
      const params = element.split(',').map(param => param.trim().replace(/^['"]|['"]$/g, ''));
      return params;
    });

    separatedArray.forEach(e => console.log(e.length))



    console.log({ separatedArray });

    const opArray = separatedArray.map(element => {
      console.log((`${functionName}(${element.join(', ')})`));
      return (`${functionName}(${element.join(', ')})`);
    })


    // res.status(200).json({ challenge });
    res.status(200).json({ error: 'no' });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}