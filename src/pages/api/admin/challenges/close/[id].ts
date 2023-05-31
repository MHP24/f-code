import { handleValidation } from '@/compilers/helpers/validatorHandler';
import { db } from '@/database';
import { IChallengeRequest } from '@/interfaces';
import { ChallengeRequest } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

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
    if (!(typeof approved === 'boolean')) return res.status(400).json({ error: 'Summary invalid' });

    const { id } = req.query;


    const challenge: IChallengeRequest | null = await ChallengeRequest.findById(id);
    if (!challenge || challenge.status > 1) return res.status(404).json({ error: 'Invalid challenge' });

    const { parametersCount, caseSchema, cases: newCases, functionName, parameters, language, code } = challenge;

    const randomCases = Array(3/** caseSchema[0].length*/).fill('').map(_ => {
      return (
        Array(caseSchema[0].length).fill('').map((_, i) => {
          const caseRandom = Math.floor(Math.random() * caseSchema.length);
          return caseSchema[caseRandom][i];
        })
      )
    });

    console.log({ caseID: newCases });

    const cases = [
      ...newCases.map(cse => ({ call: cse.call })),
      ...randomCases.map(element => ({ call: `${functionName}(${element.join(', ')})` }))
    ];

    const { hasError, data } = await handleValidation({
      cases,
      functionName,
      parameters,
      language,
      code: code!
    });

    console.log({ cases });

    console.log({ hasError, data });

    res.status(200).json(data);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}