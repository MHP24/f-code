import { handleValidation } from '@/compilers/helpers/validatorHandler';
import { db } from '@/database';
import { IChallengeRequest } from '@/interfaces';
import { Challenge, ChallengeRequest, User } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string
} | { id: string };

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

    //GET ID FROM SESSION TO SAVE AS STAFFID

    if (!approved) {
      await ChallengeRequest.findByIdAndUpdate(id, { status: 2 });
      return res.status(200).json({ id: `${id}` });
    }

    const {
      caseSchema, cases: newCases, functionName,
      parameters, slug, language, creatorId,
      instructions, difficulty, code, tags
    } = challenge;

    const randomCases = Array(3/** caseSchema[0].length*/).fill('').map(_ => {
      return (
        Array(caseSchema[0].length).fill('').map((_, i) => {
          const caseRandom = Math.floor(Math.random() * caseSchema.length);
          return caseSchema[caseRandom][i];
        })
      )
    });

    const _cases = [
      ...newCases.map(cse => ({ call: cse.call })),
      ...randomCases.map(element => ({ call: `${functionName}(${element.join(', ')})` }))
    ];

    const { hasError, data } = await handleValidation({
      cases: _cases,
      functionName,
      parameters,
      language,
      code: code!
    });

    if (hasError) res.status(400).json({ error: 'Failed generating secret test cases, try again.' });

    const { outputs } = data as { outputs: any[] };

    const cases = _cases.map(({ call }, i) => {
      return {
        call,
        expectedOutput: outputs[i].execution
      }
    });

    const publishCaseSchema = [
      ...caseSchema,
      ...randomCases
    ];

    if (challenge.reason === 'create') {
      const isAlreadyCreated = await Challenge.findOne({ slug, language });
      if (isAlreadyCreated) {
        await ChallengeRequest.findByIdAndUpdate(id, { status: 2 });
        return res.status(400).json({ error: 'This challenge already exists' })
      }

      await new Challenge({
        slug,
        language,
        functionName,
        parameters,
        cases,
        solution: code,
        creatorId: new mongoose.Types.ObjectId(`${creatorId}`),
        instructions,
        difficulty,
        tags,
        caseSchema: publishCaseSchema
      }).save();

      await ChallengeRequest.findByIdAndUpdate(id, { status: 3 });
      await User.updateOne({ _id: creatorId }, { $inc: { challengesCreated: 1 } });
      return res.status(200).json({ id: `${id}` });
    }

    if (challenge.reason === 'update') {
      await Challenge.updateOne({ slug, language }, {
        cases,
        solution: code,
        instructions,
        tags,
        caseSchema: publishCaseSchema
      });
      await ChallengeRequest.findByIdAndUpdate(id, { status: 3 });
      return res.status(200).json({ id: `${id}` });
    }
    res.status(200).json({ id: `${id}` });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}