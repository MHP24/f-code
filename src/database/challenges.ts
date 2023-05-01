import { db } from '@/database';
import { IChallengeSearch } from '@/interfaces';
import { PaginateResult } from 'mongoose';
import { Challenge } from '@/models';

export const getChallenges = async (language: string, slug: string, page: number): Promise<PaginateResult<IChallengeSearch> | []> => {
  try {
    await db.connect();
    const options = {
      page,
      limit: 2,
      select: `
        _id slug language difficulty tags
        ${slug && language && 'creatorId instructions functionName cases parameters'}
      `,
    };
    const challenges = await Challenge.paginate({
      active: true,
      language: (!language ? { $exists: true } : language),
      slug: (!slug ? { $exists: true } : { $regex: slug }),
    }, options);

    return challenges;
  } catch (error) {
    return [];
  } finally {
    await db.disconnect();
  }
}